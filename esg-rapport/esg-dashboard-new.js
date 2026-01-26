// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  onSnapshot,
  doc,
  where,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ESG Dashboard JavaScript with Download Functionality
class ESGDashboard {
  constructor() {
    this.stations = [];
    this.currentData = {};
    this.currentPeriod = "month";
    this.customDateRange = null;
    this.searchPerformed = false;
    this.charts = {};
    this.db = null;
    this._unsubs = [];
    this._last7DaysKeys = [];
    this.pdfImageCache = new Map();
    this.lastSearchedCompany = this.loadLastSearchedCompany();

    // Initialize Firebase connection
    this.initializeApp();

    // Bind search input event
    this.bindEvents();

    // Render quick access on page load
    this.renderQuickAccess();

    // Check for welcome screen preference
    this.checkWelcomePreference();

    // Note: Date picker functionality is now handled in the HTML file
  }

  checkWelcomePreference() {
    const skipWelcome = localStorage.getItem("skipWelcomeScreen");
    const lastCompany = this.lastSearchedCompany?.placeName;

    if (skipWelcome === "true" && lastCompany) {
      console.log("Auto-loading dashboard for:", lastCompany);

      // Hide welcome screen immediately
      const welcomeScreen = document.querySelector(".welcome-screen");
      if (welcomeScreen) welcomeScreen.style.display = "none";

      // Show dashboard elements
      const header = document.getElementById("mainHeader");
      const searchContainer = document.getElementById("searchContainer");
      const periodSelector = document.getElementById("periodSelector");
      const dashboardContent = document.getElementById("dashboardContent");

      if (header) header.classList.add("show");
      if (searchContainer) searchContainer.style.display = "block";
      if (periodSelector) periodSelector.style.display = "block";
      if (dashboardContent) dashboardContent.classList.add("show");

      // Trigger search
      this.searchStations(lastCompany);

      // Show the reset button
      const resetBtn = document.getElementById("resetWelcomeBtn");
      if (resetBtn) resetBtn.style.display = "inline-flex";
    }
  }

  resetWelcomePreference() {
    localStorage.removeItem("skipWelcomeScreen");
    alert("Preference reset. You will see the welcome screen next time.");
    const resetBtn = document.getElementById("resetWelcomeBtn");
    if (resetBtn) resetBtn.style.display = "none";
  }

  bindEvents() {
    // Handle enter key in search inputs
    document.addEventListener("keypress", (e) => {
      if (
        e.key === "Enter" &&
        (e.target.id === "searchInput" || e.target.id === "searchInput2")
      ) {
        this.searchStations();
      }
    });

    // Sync search inputs
    const searchInput1 = document.getElementById("searchInput");
    const searchInput2 = document.getElementById("searchInput2");

    searchInput1?.addEventListener("input", (e) => {
      if (searchInput2) searchInput2.value = e.target.value;
    });

    searchInput2?.addEventListener("input", (e) => {
      if (searchInput1) searchInput1.value = e.target.value;
    });

    // Reset welcome preference button - using delegation for robustness
    document.addEventListener("click", (e) => {
      const resetBtn = e.target.closest("#resetWelcomeBtn");
      if (resetBtn) {
        e.preventDefault();
        console.log("Reset button clicked");
        this.resetWelcomePreference();
      }
    });
  }

  async initializeApp() {
    try {
      // Firebase configuration (same as your main app)
      const firebaseConfig = {
        apiKey: "AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI",
        authDomain: "cycl-ionic.firebaseapp.com",
        projectId: "cycl-ionic",
        storageBucket: "cycl-ionic.appspot.com",
        messagingSenderId: "310990335294",
        appId: "1:310990335294:web:c8cb7e850a93d94854d06f",
        measurementId: "G-BSWJX4TVBF",
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
      console.log("ESG Dashboard connected to Firebase");
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  } // Convert bottle data to environmental metrics
  calculateEnvironmentalImpact(bottles) {
    return {
      co2Saved: (bottles * 0.082).toFixed(1), // kg CO2 per bottle
      waterSaved: (bottles * 0.5).toFixed(0), // liters water per bottle
      energySaved: (bottles * 0.15).toFixed(1), // kWh energy per bottle
      plasticDiverted: (bottles * 0.025).toFixed(2), // kg plastic per bottle
    };
  }

  // Fetch real user data from Firebase for community impact calculations
  async fetchUserData() {
    try {
      if (!this.db) {
        console.warn("Database not initialized");
        return { totalUsers: 0, activeUsers: 0 };
      }

      // Query the users collection
      const usersQuery = query(collection(this.db, "users"));
      const querySnapshot = await getDocs(usersQuery);

      let totalUsers = 0;
      let activeUsers = 0;
      let repeatUsers = 0;
      let oneTimeUsers = 0;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (!userData) return;

        totalUsers++;

        // Loyalty Logic: Repeat vs One-time
        // User requested: UserRecycleCount > 2 means repeat user
        const rawCount =
          userData.UserRecycleCount ||
          userData.recycleCount ||
          userData.lifetimeBottles ||
          0;
        const count = Number(rawCount);

        // Debug logging for first few users
        if (totalUsers <= 5) {
          console.log(
            `User ${doc.id}: count=${count} (from ${rawCount})`,
            userData,
          );
        }

        if (count > 0) {
          if (count > 2) repeatUsers++;
          else oneTimeUsers++;
        }

        // Count as active user if they've recycled in the last 30 days
        const lastRecycleDate =
          userData.lastRecycleDate?.toDate?.() ||
          new Date(userData.lastRecycleDate || 0);
        if (lastRecycleDate > thirtyDaysAgo) {
          activeUsers++;
        }
      });

      console.log(
        `Users: ${totalUsers} total, ${activeUsers} active, ${repeatUsers} repeat`,
      );
      return { totalUsers, activeUsers, repeatUsers, oneTimeUsers };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { totalUsers: 0, activeUsers: 0 };
    }
  }

  // Calculate business value metrics for corporate reporting
  calculateBusinessValue(bottles) {
    const environmentalImpact = this.calculateEnvironmentalImpact(bottles);

    // Use cached user data if available, otherwise fall back to estimation
    const userImpact = this.cachedUserData || {
      totalUsers: Math.ceil(bottles / 50),
      activeUsers: Math.ceil(bottles / 100),
    };

    return {
      // Environmental metrics (existing)
      ...environmentalImpact,

      // Economic Value Metrics
      wasteManagementSavings: (bottles * 0.12).toFixed(0), // USD saved per bottle in waste management
      materialValue: (bottles * 0.08).toFixed(0), // USD value of recycled materials
      carbonCreditValue: (
        (parseFloat(environmentalImpact.co2Saved) / 1000) *
        25
      ).toFixed(2), // USD at $25 per tonne CO2

      // Corporate Sustainability Metrics
      circularEconomyContribution: (bottles * 0.025).toFixed(2), // kg of circular materials
      sdgProgress: this.calculateSDGProgress(bottles), // UN SDG alignment
      esgScore: this.calculateESGScore(bottles), // ESG performance score

      // Compliance & Reporting
      eprCompliance: parseFloat(environmentalImpact.plasticDiverted).toFixed(2), // Align EPR (kg) to plastic diverted
      ghgReduction: (parseFloat(environmentalImpact.co2Saved) * 1000).toFixed(
        0,
      ), // grams CO2eq

      // Updated Community Impact Metrics - Based on Real Users
      communityImpact: userImpact.totalUsers, // Total registered users
      activeUserImpact: userImpact.activeUsers, // Users active in last 30 days
      userEngagementRate:
        userImpact.totalUsers > 0
          ? Math.round((userImpact.activeUsers / userImpact.totalUsers) * 100)
          : 0,

      // Brand Value Metrics
      brandEngagement: userImpact.activeUsers * 3, // Estimated touchpoints per active user

      // Operational Efficiency
      collectionEfficiency: this.calculateCollectionEfficiency(),
      costPerBottle: 0.15, // USD operational cost per bottle
      roi: this.calculateROI(bottles),
    };
  }

  // Calculate UN SDG progress indicators
  calculateSDGProgress(bottles) {
    return {
      sdg6_cleanWater: (bottles * 0.5).toFixed(1), // liters protected
      sdg7_cleanEnergy: (bottles * 0.15).toFixed(1), // kWh renewable equivalent
      sdg11_sustainableCities: (bottles * 0.025).toFixed(2), // kg waste diverted
      sdg12_responsibleConsumption: bottles, // units of circular consumption
      sdg13_climateAction: (bottles * 0.082).toFixed(1), // kg CO2 reduction
      sdg14_lifeBelow_water: Math.ceil(bottles / 10), // estimated marine items prevented
      sdg15_lifeOnLand: Math.ceil(bottles / 20), // estimated terrestrial pollution prevented
    };
  }

  // Calculate ESG score (0-100)
  calculateESGScore(bottles) {
    const baseScore = Math.min(70, (bottles / 1000) * 50); // Environmental base
    const socialScore = Math.min(15, (bottles / 500) * 10); // Social impact
    const governanceScore = 15; // Governance (transparency, reporting)
    return Math.round(baseScore + socialScore + governanceScore);
  }

  // Calculate collection efficiency
  calculateCollectionEfficiency() {
    if (!this.stations.length) return 0;
    const totalCapacity = this.stations.reduce(
      (sum, s) => sum + (s.capacity || 0),
      0,
    );
    const totalUsed = this.stations.reduce(
      (sum, s) => sum + (s.currentCap || 0),
      0,
    );
    return totalCapacity > 0
      ? Math.round((totalUsed / totalCapacity) * 100)
      : 0;
  }

  // Calculate ROI for businesses
  calculateROI(bottles) {
    const benefits = bottles * 0.2; // USD benefits (cost savings + brand value)
    const costs = bottles * 0.15; // USD operational costs
    return costs > 0 ? Math.round(((benefits - costs) / costs) * 100) : 0;
  }

  // Build 12-month time series from persisted metrics
  buildTimeSeriesFromMetrics(metricsByMonth) {
    const data = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1),
      );
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
        2,
        "0",
      )}`;
      const bottles = Number(metricsByMonth[key] || 0);
      data.push({
        monthKey: key,
        month: d.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        bottles,
        ...this.calculateEnvironmentalImpact(bottles),
      });
    }
    return data;
  }

  // Build time series for custom date range
  buildCustomTimeSeriesFromMetrics(metricsByMonth, customDateRange) {
    if (
      !customDateRange ||
      !customDateRange.fromMonth ||
      !customDateRange.toMonth
    ) {
      return this.buildTimeSeriesFromMetrics(metricsByMonth);
    }

    const data = [];
    const fromDate = new Date(customDateRange.fromMonth + "-01");
    const toDate = new Date(customDateRange.toMonth + "-01");

    // Generate all months in the custom range
    const current = new Date(fromDate);
    while (current <= toDate) {
      const key = `${current.getUTCFullYear()}-${String(
        current.getUTCMonth() + 1,
      ).padStart(2, "0")}`;
      const bottles = Number(metricsByMonth[key] || 0);

      data.push({
        monthKey: key,
        month: current.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        bottles,
        ...this.calculateEnvironmentalImpact(bottles),
      });

      // Move to next month
      current.setUTCMonth(current.getUTCMonth() + 1);
    }

    return data;
  }

  // Build custom weekly data for date range filtering
  buildCustomWeeklyData() {
    if (
      !this.customDateRange ||
      !this.customDateRange.fromMonth ||
      !this.customDateRange.toMonth
    ) {
      // Default behavior - last 7 days
      return this.buildDefaultWeeklyData();
    }

    const fromDate = new Date(this.customDateRange.fromMonth + "-01");
    const toDate = new Date(this.customDateRange.toMonth + "-01");
    toDate.setMonth(toDate.getMonth() + 1, 0); // Last day of toMonth

    // Generate daily keys within the custom range
    const dailyKeys = [];
    const current = new Date(fromDate);

    while (current <= toDate) {
      const key = `${current.getFullYear()}-${String(
        current.getMonth() + 1,
      ).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
      dailyKeys.push(key);
      current.setDate(current.getDate() + 1);
    }

    // If range is too large, take last 30 days for performance
    const displayKeys =
      dailyKeys.length > 30 ? dailyKeys.slice(-30) : dailyKeys;

    const labels = displayKeys.map((k) => {
      const [y, m, d] = k.split("-").map((v) => parseInt(v, 10));
      const date = new Date(Date.UTC(y, m - 1, d));
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });

    const weeklyData = displayKeys.map((k) =>
      this.stations.reduce(
        (sum, s) => sum + Number((s.dailyByDate || {})[k] || 0),
        0,
      ),
    );

    return { labels, data: weeklyData };
  }

  // Build default weekly data (last 7 days)
  buildDefaultWeeklyData() {
    const keys = (() => {
      const tmp = [];
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - i,
          ),
        );
        tmp.push(
          `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
            2,
            "0",
          )}-${String(d.getUTCDate()).padStart(2, "0")}`,
        );
      }
      return tmp;
    })();

    const labels = keys.map((k) => {
      const [y, m, d] = k.split("-").map((v) => parseInt(v, 10));
      const date = new Date(Date.UTC(y, m - 1, d));
      return date.toLocaleDateString("en-US", { weekday: "short" });
    });

    const weeklyData = keys.map((k) =>
      this.stations.reduce(
        (sum, s) => sum + Number((s.dailyByDate || {})[k] || 0),
        0,
      ),
    );

    return { labels, data: weeklyData };
  }

  // Filter stations data for custom period
  getFilteredStationsForPeriod() {
    if (!this.customDateRange || this.currentPeriod !== "custom") {
      // Return all stations for non-custom periods
      return this.stations;
    }

    // For custom periods, we could filter stations based on activity in that period
    // For now, we'll return all stations but could enhance this to show only
    // stations that had activity in the selected period
    return this.stations;
  }

  // Calculate custom impact data for the selected period
  getCustomPeriodImpact() {
    if (!this.customDateRange || this.currentPeriod !== "custom") {
      return this.currentData.impact;
    }

    // Calculate impact based on bottles in the custom period
    const customTotals = this.calculateCustomPeriodTotals();
    return this.calculateEnvironmentalImpact(customTotals);
  }

  // Fetch real station data from Firestore
  async fetchStationsData(companyName) {
    try {
      if (!this.db) {
        throw new Error("Firebase not initialized");
      }

      // Query the stations collection
      const stationsQuery = query(collection(this.db, "stations"));
      const querySnapshot = await getDocs(stationsQuery);

      const allStations = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const station = {
          stationNumber: doc.id,
          placeName: data.placeName || "",
          companyName: data.companyName || "",
          address: data.address || "",
          latitude: data.coordinates?.[0] || 0,
          longitude: data.coordinates?.[1] || 0,
          capacity: data.capacity || 0,
          currentCap: data.currentCap || 0,
        };
        allStations.push(station);
      });

      // Filter stations by company name (case insensitive)
      const filteredStations = allStations.filter(
        (station) =>
          station.companyName
            .toLowerCase()
            .includes(companyName.toLowerCase()) ||
          station.placeName.toLowerCase().includes(companyName.toLowerCase()) ||
          station.address.toLowerCase().includes(companyName.toLowerCase()),
      );

      console.log(
        `Found ${filteredStations.length} stations for company "${companyName}"`,
      );
      return filteredStations;
    } catch (error) {
      console.error("Error fetching stations from Firestore:", error);
      // No mock fallback: ensure only real data is shown
      return [];
    }
  }

  // No mock data helper; dashboard uses only Firestore data

  async searchStations(query) {
    const searchInput1 = document.getElementById("searchInput");
    const searchInput2 = document.getElementById("searchInput2");
    let searchTerm = query || searchInput1?.value || searchInput2?.value || "";

    // Trim whitespace to ensure accurate matching
    searchTerm = searchTerm.trim();

    if (!searchTerm) {
      alert("Please enter a company name to search");
      return;
    }

    // Save as last searched company
    this.saveLastSearchedCompany(searchTerm);

    // Check remember me preference
    const rememberMe = document.getElementById("rememberMeCheckbox");
    if (rememberMe && rememberMe.checked) {
      localStorage.setItem("skipWelcomeScreen", "true");
      // Show reset button in header
      const resetBtn = document.getElementById("resetWelcomeBtn");
      if (resetBtn) resetBtn.style.display = "inline-flex";
    }

    // Show loading state
    this.showLoading();

    try {
      // Clear any existing realtime listeners before a new search
      this.clearRealtimeListeners();

      // Fetch both stations and user data in parallel
      const [stations, userData] = await Promise.all([
        this.fetchStationsData(searchTerm),
        this.fetchUserData(),
      ]);

      if (stations.length === 0) {
        this.showNoResults();
        return;
      }

      this.stations = stations;
      this.cachedUserData = userData; // Cache user data for calculations

      await this.loadAggregatesForStations();
      await this.loadDailyAggregatesForStations();
      this.calculateAggregatedData();

      // Update header title with the searched company name
      const headerTitle = document.getElementById("headerTitle");
      if (headerTitle) {
        headerTitle.textContent = `${searchTerm} ESG Impact Report`;
      }

      this.showDashboard();
      this.renderDashboard();

      // After initial render, attach realtime listeners so UI auto-updates
      this.setupRealtimeListeners();
    } catch (error) {
      console.error("Error fetching stations:", error);
      this.showError();
    }
  }

  calculateAggregatedData() {
    // Current period totals are based on persisted metrics, not live caps
    let totalBottles = 0;
    const now = new Date();
    const ymKey = `${now.getUTCFullYear()}-${String(
      now.getUTCMonth() + 1,
    ).padStart(2, "0")}`;
    const yearPrefix = `${now.getUTCFullYear()}-`;

    if (this.currentPeriod === "month") {
      totalBottles = this.stations.reduce(
        (sum, s) => sum + Number((s.metricsByMonth || {})[ymKey] || 0),
        0,
      );
    } else if (this.currentPeriod === "year") {
      totalBottles = this.stations.reduce((sum, s) => {
        const m = s.metricsByMonth || {};
        return (
          sum +
          Object.entries(m).reduce(
            (acc, [k, v]) =>
              k.startsWith(yearPrefix) ? acc + Number(v || 0) : acc,
            0,
          )
        );
      }, 0);
    } else if (this.currentPeriod === "custom" && this.customDateRange) {
      // Custom date range filtering based on fromMonth/toMonth
      totalBottles = this.calculateCustomPeriodTotals();
    } else {
      // total = all-time sum across all months
      totalBottles = this.stations.reduce((sum, s) => {
        const m = s.metricsByMonth || {};
        return sum + Object.values(m).reduce((a, v) => a + Number(v || 0), 0);
      }, 0);
    }
    const impact = this.calculateEnvironmentalImpact(totalBottles);

    // Build historical data for trend (from metrics)
    const mergedMetrics = {};
    this.stations.forEach((s) => {
      const m = s.metricsByMonth || {};
      Object.entries(m).forEach(([k, v]) => {
        mergedMetrics[k] = (mergedMetrics[k] || 0) + Number(v || 0);
      });
    });

    // Always show 12-month trend for consistency and "prettier" charts
    const timeSeriesData = this.buildTimeSeriesFromMetrics(mergedMetrics);

    this.currentData = {
      totalBottles,
      stationsCount: this.stations.length,
      impact,
      timeSeriesData,
      avgEfficiency: (
        (this.stations.reduce(
          (sum, station) => sum + station.currentCap / station.capacity,
          0,
        ) /
          this.stations.length) *
        100
      ).toFixed(1),
    };
  }

  // Calculate totals for custom date range
  calculateCustomPeriodTotals() {
    if (!this.customDateRange) {
      console.log("No custom date range set");
      return 0;
    }

    console.log("Calculating custom period totals for:", this.customDateRange);
    const { fromMonth, toMonth, fromYear, toYear } = this.customDateRange;

    // If we have fromMonth/toMonth format (YYYY-MM)
    if (fromMonth && toMonth) {
      console.log("Using YYYY-MM format:", fromMonth, "to", toMonth);
      const total = this.stations.reduce((sum, station) => {
        const metrics = station.metricsByMonth || {};
        let stationTotal = 0;

        // Iterate through all months in the range
        const fromDate = new Date(fromMonth + "-01");
        const toDate = new Date(toMonth + "-01");

        Object.entries(metrics).forEach(([monthKey, bottles]) => {
          const keyDate = new Date(monthKey + "-01");
          if (keyDate >= fromDate && keyDate <= toDate) {
            stationTotal += Number(bottles || 0);
            console.log(
              `Station ${station.stationNumber}: ${monthKey} = ${bottles} bottles`,
            );
          }
        });

        return sum + stationTotal;
      }, 0);

      console.log("Custom period total bottles:", total);
      return total;
    }

    // Legacy format support (fromYear/toYear, fromMonth/toMonth as numbers)
    if (fromYear && toYear && fromMonth && toMonth) {
      return this.stations.reduce((sum, station) => {
        const metrics = station.metricsByMonth || {};
        let stationTotal = 0;

        // Generate month keys for the range
        const startDate = new Date(fromYear, fromMonth - 1);
        const endDate = new Date(toYear, toMonth - 1);

        Object.entries(metrics).forEach(([monthKey, bottles]) => {
          const [year, month] = monthKey.split("-").map((n) => parseInt(n));
          const keyDate = new Date(year, month - 1);

          if (keyDate >= startDate && keyDate <= endDate) {
            stationTotal += Number(bottles || 0);
          }
        });

        return sum + stationTotal;
      }, 0);
    }

    // Fallback: return 0 if date range format is not recognized
    console.warn(
      "Custom date range format not recognized:",
      this.customDateRange,
    );
    return 0;
  }

  showLoading() {
    document.getElementById("loadingState").style.display = "block";
    document.getElementById("dashboardContent").classList.remove("show");
    document.getElementById("noResults").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";

    // Hide welcome screen and show main layout
    if (!this.searchPerformed) {
      document.getElementById("welcomeScreen").style.display = "none";
      document.getElementById("mainHeader").classList.add("show");
      document.getElementById("searchContainer").style.display = "block";
      this.searchPerformed = true;
    }
  }

  showDashboard() {
    document.getElementById("loadingState").style.display = "none";
    document.getElementById("dashboardContent").classList.add("show");
    document.getElementById("noResults").style.display = "none";
    document.getElementById("errorMessage").style.display = "none";

    // Show download buttons
    document.getElementById("downloadButtons").classList.add("show");
    document.getElementById("downloadButtons2").classList.add("show");

    // Show period selector
    const periodSelector = document.getElementById("periodSelector");
    if (periodSelector) {
      periodSelector.style.display = "block";
    }
  }

  showNoResults() {
    document.getElementById("loadingState").style.display = "none";
    document.getElementById("dashboardContent").classList.remove("show");
    document.getElementById("noResults").style.display = "block";
    document.getElementById("errorMessage").style.display = "none";

    // Hide download buttons
    document.getElementById("downloadButtons").classList.remove("show");
    document.getElementById("downloadButtons2").classList.remove("show");
  }

  showError() {
    document.getElementById("loadingState").style.display = "none";
    document.getElementById("dashboardContent").classList.remove("show");
    document.getElementById("noResults").style.display = "none";
    document.getElementById("errorMessage").style.display = "block";

    // Hide download buttons
    document.getElementById("downloadButtons").classList.remove("show");
    document.getElementById("downloadButtons2").classList.remove("show");
  }

  renderDashboard() {
    this.updateStats();
    this.renderCharts();
    this.renderStationsList();
  }

  updateStats() {
    const { totalBottles, stationsCount, impact, avgEfficiency } =
      this.currentData;

    // Calculate business value metrics
    const businessValue = this.calculateBusinessValue(totalBottles);

    // Update existing metrics
    document.getElementById("totalBottles").textContent =
      totalBottles.toLocaleString();
    document.getElementById("co2Saved").textContent = impact.co2Saved + " kg";
    document.getElementById("waterSaved").textContent =
      impact.waterSaved + " L";
    document.getElementById("energySaved").textContent =
      impact.energySaved + " kWh";
    document.getElementById("stationsCount").textContent = stationsCount;
    document.getElementById("avgEfficiency").textContent = `${avgEfficiency}%`;

    // Update business metrics
    document.getElementById("costSavings").textContent =
      `$${businessValue.wasteManagementSavings}`;
    document.getElementById("carbonCreditValue").textContent =
      `$${businessValue.carbonCreditValue}`;
    document.getElementById("esgScore").textContent =
      `${businessValue.esgScore}/100`;
    document.getElementById("roiValue").textContent = `${businessValue.roi}%`;
    document.getElementById("communityImpact").textContent =
      businessValue.communityImpact.toLocaleString();
    document.getElementById("eprCompliance").textContent =
      `${businessValue.eprCompliance} kg`;

    // Update subtexts based on current period
    const periodText =
      this.currentPeriod === "month"
        ? "This month"
        : this.currentPeriod === "year"
          ? "This year"
          : "All time";

    document.getElementById("bottlesSubtext").textContent = periodText;
    document.getElementById("co2Subtext").textContent = "Environmental impact";
    document.getElementById("waterSubtext").textContent =
      "Resource conservation";
    document.getElementById("energySubtext").textContent =
      "Renewable equivalent";
    document.getElementById("stationsSubtext").textContent = "In searched area";
    document.getElementById("efficiencySubtext").textContent =
      "Station utilization";
  }

  renderCharts() {
    try {
      this.renderMonthlyChart();
      this.renderImpactChart();
      this.renderStationChart();
      this.renderWeeklyChart();
      this.renderUsagePatternsCharts();
      // this.renderLoyaltyChart();
      // Business-focused charts
      this.renderSDGChart();
      this.renderBusinessValueChart();
    } catch (e) {
      console.warn("Error rendering charts:", e);
    }
  }

  renderLoyaltyChart() {
    const ctx = document.getElementById("loyaltyChart")?.getContext("2d");
    if (!ctx) return;

    if (this.charts.loyalty) {
      this.charts.loyalty.destroy();
    }

    const { repeatUsers = 0, oneTimeUsers = 0 } = this.cachedUserData || {};
    // Calculate percentages for labels
    const total = repeatUsers + oneTimeUsers;
    const repeatPct = total > 0 ? Math.round((repeatUsers / total) * 100) : 0;
    const oneTimePct = total > 0 ? Math.round((oneTimeUsers / total) * 100) : 0;

    this.charts.loyalty = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          `Repeat Users (${repeatPct}%)`,
          `One-Time Users (${oneTimePct}%)`,
        ],
        datasets: [
          {
            data: [repeatUsers, oneTimeUsers],
            backgroundColor: ["#10b981", "#94a3b8"], // Green for loyal, gray for one-time
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.label.split(" (")[0]}: ${context.raw}`;
              },
            },
          },
        },
      },
    });
  }

  renderUsagePatternsCharts() {
    // 1. Aggregate data across all stations
    const totalHourlyUsage = new Array(24).fill(0);
    const totalDailyUsage = new Array(7).fill(0);

    this.stations.forEach((station) => {
      if (station.usageByHour) {
        station.usageByHour.forEach(
          (count, i) => (totalHourlyUsage[i] += count),
        );
      }
      if (station.usageByDay) {
        station.usageByDay.forEach((count, i) => (totalDailyUsage[i] += count));
      }
    });

    // 2. Render Hourly Chart
    const ctxHourly = document
      .getElementById("hourlyUsageChart")
      ?.getContext("2d");
    if (ctxHourly) {
      if (this.charts.hourlyUsage) {
        this.charts.hourlyUsage.destroy();
      }

      this.charts.hourlyUsage = new Chart(ctxHourly, {
        type: "line",
        data: {
          labels: Array.from({ length: 24 }, (_, i) => {
            const ampm = i >= 12 ? "PM" : "AM";
            const hour = i % 12 || 12;
            return `${hour} ${ampm}`;
          }),
          datasets: [
            {
              label: "Activity by Hour",
              data: totalHourlyUsage,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.raw} interactions`;
                },
              },
            },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: "Count" } },
            x: { grid: { display: false } },
          },
        },
      });
    }

    // 3. Render Daily Chart
    const ctxDaily = document
      .getElementById("dailyUsageChart")
      ?.getContext("2d");
    if (ctxDaily) {
      if (this.charts.dailyUsage) {
        this.charts.dailyUsage.destroy();
      }

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      this.charts.dailyUsage = new Chart(ctxDaily, {
        type: "bar",
        data: {
          labels: days,
          datasets: [
            {
              label: "Activity by Day",
              data: totalDailyUsage,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(199, 199, 199, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(199, 199, 199, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
            x: { grid: { display: false } },
          },
        },
      });
    }
  }

  renderMonthlyChart() {
    const ctx = document.getElementById("monthlyChart").getContext("2d");

    if (this.charts.monthly) {
      this.charts.monthly.destroy();
    }

    const timeSeriesData = this.currentData.timeSeriesData;

    this.charts.monthly = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeSeriesData.map((d) => d.month),
        datasets: [
          {
            label: "Bottles Recycled",
            data: timeSeriesData.map((d) => d.bottles),
            borderColor: "#667eea",
            backgroundColor: "rgba(102, 126, 234, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString();
              },
            },
          },
        },
      },
    });
  }

  renderImpactChart() {
    const ctx = document.getElementById("impactChart").getContext("2d");

    if (this.charts.impact) {
      this.charts.impact.destroy();
    }

    // Use custom period impact data if in custom mode
    const impact =
      this.currentPeriod === "custom" && this.customDateRange
        ? this.getCustomPeriodImpact()
        : this.currentData.impact;

    this.charts.impact = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "CO₂ Saved (kg)",
          "Water Saved (L)",
          "Energy Saved (kWh)",
          "Plastic Diverted (kg)",
        ],
        datasets: [
          {
            data: [
              parseFloat(impact.co2Saved),
              parseFloat(impact.waterSaved) / 10, // Scale down for visualization
              parseFloat(impact.energySaved),
              parseFloat(impact.plasticDiverted) * 10, // Scale up for visualization
            ],
            backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  renderStationChart() {
    const ctx = document.getElementById("stationChart").getContext("2d");

    if (this.charts.station) {
      this.charts.station.destroy();
    }

    // Use filtered stations for custom periods
    const stationsToDisplay = this.getFilteredStationsForPeriod();

    this.charts.station = new Chart(ctx, {
      type: "bar",
      data: {
        labels: stationsToDisplay.map((s) => s.stationNumber),
        datasets: [
          {
            label: "Current Bottles",
            data: stationsToDisplay.map((s) => s.currentCap),
            backgroundColor: "#667eea",
          },
          {
            label: "Capacity",
            data: stationsToDisplay.map((s) => s.capacity),
            backgroundColor: "rgba(102, 126, 234, 0.3)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderWeeklyChart() {
    const ctx = document.getElementById("weeklyChart").getContext("2d");

    if (this.charts.weekly) {
      this.charts.weekly.destroy();
    }

    // Always show last 7 days for consistency
    const weeklyDataset = this.buildDefaultWeeklyData();

    this.charts.weekly = new Chart(ctx, {
      type: "bar",
      data: {
        labels: weeklyDataset.labels,
        datasets: [
          {
            label: "Daily Collections",
            data: weeklyDataset.data,
            backgroundColor: "#4CAF50",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString();
              },
            },
          },
        },
      },
    });
  }

  // Load last 7 days of daily aggregates for each station
  async loadDailyAggregatesForStations() {
    if (!this.db || !this.stations.length) return;
    // Build last 7 UTC date keys
    const keys = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i),
      );
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
        2,
        "0",
      )}-${String(d.getUTCDate()).padStart(2, "0")}`;
      keys.push(key);
    }
    this._last7DaysKeys = keys;

    // Fetch daily docs for the last 7 days
    await Promise.all(
      this.stations.map(async (s) => {
        try {
          const dailyCol = collection(
            this.db,
            "stations",
            s.stationNumber,
            "daily",
          );
          const snap = await getDocs(dailyCol);
          const map = {};
          const timestamps = [];

          snap.forEach((doc) => {
            const d = doc.data() || {};
            map[doc.id] = Number(d.bottlesCollected || 0);
            if (d.updatedAt) {
              timestamps.push(d.updatedAt);
            }
          });
          s.dailyByDate = map;

          // Process timestamps for usage patterns
          const usageByHour = new Array(24).fill(0);
          const usageByDay = new Array(7).fill(0); // 0 = Sunday

          timestamps.forEach((ts) => {
            let date;
            if (ts && typeof ts.toDate === "function") {
              date = ts.toDate();
            } else if (ts instanceof Date) {
              date = ts;
            } else if (typeof ts === "string" || typeof ts === "number") {
              date = new Date(ts);
            }

            if (date && !isNaN(date.getTime())) {
              const hour = date.getHours();
              const day = date.getDay();
              usageByHour[hour]++;
              usageByDay[day]++;
            }
          });
          s.usageByHour = usageByHour;
          s.usageByDay = usageByDay;
        } catch (e) {
          console.warn(
            "Failed loading daily aggregates for station",
            s.stationNumber,
            e,
          );
          s.dailyByDate = {};
          s.usageByHour = new Array(24).fill(0);
          s.usageByDay = new Array(7).fill(0);
        }
      }),
    );
  }

  renderStationsList() {
    const container = document.getElementById("stationsList");
    container.innerHTML = "";

    this.stations.forEach((station) => {
      const efficiency = (
        (station.currentCap / station.capacity) *
        100
      ).toFixed(1);
      const impact = this.calculateEnvironmentalImpact(station.currentCap);

      // Usage patterns logic
      let patternsHtml = "";
      if (station.usageByHour && station.usageByDay) {
        const maxHour = Math.max(...station.usageByHour);
        const maxDay = Math.max(...station.usageByDay);

        if (maxHour > 0 || maxDay > 0) {
          const peakHourIndex = station.usageByHour.indexOf(maxHour);
          // Format as 12-hour time
          const ampm = peakHourIndex >= 12 ? "PM" : "AM";
          const hour12 = peakHourIndex % 12 || 12;
          const peakHourStr = `${hour12} ${ampm}`;

          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const peakDayIndex = station.usageByDay.indexOf(maxDay);
          const peakDayStr = days[peakDayIndex];

          patternsHtml = `
                    <div style="margin-top: 6px; font-size: 0.8rem; color: #64748b; display: flex; gap: 12px; align-items: center;">
                        <span title="Peak usage time of day"><i class="material-icons" style="font-size: 14px; vertical-align: text-bottom; margin-right: 2px;">access_time</i> Peak: <strong>${peakHourStr}</strong></span>
                        <span title="Busiest day of week"><i class="material-icons" style="font-size: 14px; vertical-align: text-bottom; margin-right: 2px;">calendar_today</i> <strong>${peakDayStr}</strong></span>
                    </div>`;
        }
      }

      const stationElement = document.createElement("div");
      stationElement.className = "station-item";
      stationElement.innerHTML = `
                <div>
                    <div class="station-name">${station.stationNumber} - ${station.placeName}</div>
                    <div class="station-address">${station.address}</div>
                    <div class="station-address">CO₂ Saved: ${impact.co2Saved}kg | Water Saved: ${impact.waterSaved}L</div>
                    ${patternsHtml}
                </div>
                <div class="station-capacity">
                    <div class="capacity-value">${station.currentCap}/${station.capacity}</div>
                    <div class="capacity-label">${efficiency}% Full</div>
                </div>
            `;
      container.appendChild(stationElement);
    });
  }

  setPeriod(period) {
    this.currentPeriod = period;
    this.customDateRange = null; // Clear custom date range

    // Update active button
    document.querySelectorAll(".period-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");

    // Recalculate data based on period (from persisted metrics)
    this.calculateAggregatedData();
    this.updateStats();

    // Update charts to reflect the period change
    this.renderCharts();

    console.log(
      "Period set to:",
      period,
      "timeSeriesData length:",
      this.currentData.timeSeriesData.length,
    );
  }

  setCustomPeriod(dateRange) {
    console.log("Dashboard setCustomPeriod called with:", dateRange);
    this.customDateRange = dateRange;
    this.currentPeriod = "custom";

    // Recalculate data based on custom period
    this.calculateAggregatedData();
    this.updateStats();

    // Update the charts with custom period data
    this.renderCharts();

    console.log(
      "Custom period applied, timeSeriesData length:",
      this.currentData.timeSeriesData.length,
    );
  }

  // Realtime listeners: stations currentCap and monthly metrics subcollection
  setupRealtimeListeners() {
    if (!this.db || !Array.isArray(this.stations)) return;

    // Safety: clear old listeners
    this.clearRealtimeListeners();

    this.stations.forEach((s) => {
      try {
        // Listen to station doc for live currentCap/fields updates
        const stationRef = doc(this.db, "stations", s.stationNumber);
        const unsubStation = onSnapshot(
          stationRef,
          (snap) => {
            if (snap.exists()) {
              const d = snap.data() || {};
              s.currentCap = Number(d.currentCap || 0);
              s.capacity = Number(d.capacity || s.capacity || 0);
              // Update visuals impacted by station fields
              // Avg efficiency and station charts/list depend on these
              this.calculateAggregatedData();
              this.updateStats();
              this.renderStationChart();
              this.renderStationsList();
            }
          },
          (err) => console.warn("Station listener error", s.stationNumber, err),
        );
        this._unsubs.push(unsubStation);

        // Listen to metrics subcollection for this station (monthly docs)
        const metricsCol = collection(
          this.db,
          "stations",
          s.stationNumber,
          "metrics",
        );
        const unsubMetrics = onSnapshot(
          metricsCol,
          (snap) => {
            const map = {};
            snap.forEach((docSnap) => {
              const d = docSnap.data() || {};
              map[docSnap.id] = Number(d.bottlesCollected || 0);
            });
            s.metricsByMonth = map;
            // Metrics power totals and time-series/charts
            this.calculateAggregatedData();
            this.updateStats();
            this.renderMonthlyChart();
            this.renderImpactChart();
          },
          (err) => console.warn("Metrics listener error", s.stationNumber, err),
        );
        this._unsubs.push(unsubMetrics);

        // Listen to daily subcollection for this station
        const dailyCol = collection(
          this.db,
          "stations",
          s.stationNumber,
          "daily",
        );
        const unsubDaily = onSnapshot(
          dailyCol,
          (snap) => {
            const map = {};
            snap.forEach((docSnap) => {
              const d = docSnap.data() || {};
              map[docSnap.id] = Number(d.bottlesCollected || 0);
            });
            s.dailyByDate = map;
            this.renderWeeklyChart();
          },
          (err) => console.warn("Daily listener error", s.stationNumber, err),
        );
        this._unsubs.push(unsubDaily);
      } catch (e) {
        console.warn("Failed to attach listeners for", s.stationNumber, e);
      }
    });
  }

  clearRealtimeListeners() {
    if (Array.isArray(this._unsubs)) {
      this._unsubs.forEach((u) => {
        try {
          if (typeof u === "function") u();
        } catch (_) {}
      });
    }
    this._unsubs = [];
  }

  // Load monthly aggregates for each station:
  // reads stations/{id}/metrics/{YYYY-MM} docs and attaches as metricsByMonth
  async loadAggregatesForStations() {
    if (!this.db || !this.stations.length) return;
    await Promise.all(
      this.stations.map(async (s) => {
        try {
          const metricsCol = collection(
            this.db,
            "stations",
            s.stationNumber,
            "metrics",
          );
          const snap = await getDocs(metricsCol);
          const map = {};
          snap.forEach((doc) => {
            const d = doc.data() || {};
            map[doc.id] = Number(d.bottlesCollected || 0);
          });
          s.metricsByMonth = map;
        } catch (e) {
          console.warn(
            "Failed loading metrics for station",
            s.stationNumber,
            e,
          );
          s.metricsByMonth = {};
        }
      }),
    );
  }

  // Download functionality
  downloadCSV() {
    if (!this.currentData || this.stations.length === 0) {
      alert("No data available to download");
      return;
    }

    const csvData = this.generateCSVData();
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `cycl-complete-esg-business-report-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  generateCSVData() {
    const headers = [
      // Station Details
      "Station Number",
      "Place Name",
      "Address",
      "Current Bottles",
      "Capacity",
      "Efficiency %",

      // Environmental Impact
      "CO2 Saved (kg)",
      "Water Saved (L)",
      "Energy Saved (kWh)",
      "Plastic Diverted (kg)",

      // Business Value Metrics
      "Waste Management Savings ($)",
      "Material Value ($)",
      "Carbon Credit Value ($)",
      "ESG Score",
      "ROI (%)",

      // User-Based Community Impact
      "Total Users Impacted",
      "EPR Compliance (kg)",

      // SDG Progress Metrics
      "SDG 6: Clean Water (L)",
      "SDG 7: Clean Energy (kWh)",
      "SDG 11: Sustainable Cities (kg)",
      "SDG 12: Responsible Consumption (units)",
      "SDG 13: Climate Action (kg CO2)",
      "SDG 14: Life Below Water (items)",
      "SDG 15: Life on Land (items)",

      // Strategic Business Metrics
      "Brand Engagement (touchpoints)",
      "Investment ROI (%)",
      "Scalability Score",
      "Risk Mitigation Score",
    ];

    const rows = this.stations.map((station) => {
      const efficiency = (
        (station.currentCap / station.capacity) *
        100
      ).toFixed(1);
      const impact = this.calculateEnvironmentalImpact(station.currentCap);
      const businessValue = this.calculateBusinessValue(station.currentCap);

      return [
        // Station Details
        station.stationNumber,
        station.placeName,
        station.address,
        station.currentCap,
        station.capacity,
        efficiency,

        // Environmental Impact
        impact.co2Saved,
        impact.waterSaved,
        impact.energySaved,
        impact.plasticDiverted,

        // Business Value Metrics
        businessValue.wasteManagementSavings,
        businessValue.materialValue,
        businessValue.carbonCreditValue,
        businessValue.esgScore,
        businessValue.roi,

        // User-Based Community Impact
        businessValue.communityImpact, // Total users
        businessValue.eprCompliance,

        // SDG Progress Metrics
        businessValue.sdgProgress.sdg6_cleanWater,
        businessValue.sdgProgress.sdg7_cleanEnergy,
        businessValue.sdgProgress.sdg11_sustainableCities,
        businessValue.sdgProgress.sdg12_responsibleConsumption,
        businessValue.sdgProgress.sdg13_climateAction,
        businessValue.sdgProgress.sdg14_lifeBelow_water,
        businessValue.sdgProgress.sdg15_lifeOnLand,

        // Strategic Business Metrics
        businessValue.brandEngagement,
        businessValue.roi, // Investment ROI (same as main ROI)
        businessValue.esgScore, // Scalability score (based on ESG performance)
        Math.min(100, businessValue.esgScore + 20), // Risk mitigation score
      ];
    });

    // Add summary row with totals
    const totalBottles = this.currentData.totalBottles;
    const totalImpact = this.currentData.impact;
    const totalBusinessValue = this.calculateBusinessValue(totalBottles);

    rows.push([
      // Station Details
      "TOTAL SUMMARY",
      "",
      "",
      totalBottles,
      "",
      this.currentData.avgEfficiency,

      // Environmental Impact
      totalImpact.co2Saved,
      totalImpact.waterSaved,
      totalImpact.energySaved,
      totalImpact.plasticDiverted,

      // Business Value Metrics
      totalBusinessValue.wasteManagementSavings,
      totalBusinessValue.materialValue,
      totalBusinessValue.carbonCreditValue,
      totalBusinessValue.esgScore,
      totalBusinessValue.roi,

      // User-Based Community Impact
      totalBusinessValue.communityImpact, // Total users
      totalBusinessValue.eprCompliance,

      // SDG Progress Metrics
      totalBusinessValue.sdgProgress.sdg6_cleanWater,
      totalBusinessValue.sdgProgress.sdg7_cleanEnergy,
      totalBusinessValue.sdgProgress.sdg11_sustainableCities,
      totalBusinessValue.sdgProgress.sdg12_responsibleConsumption,
      totalBusinessValue.sdgProgress.sdg13_climateAction,
      totalBusinessValue.sdgProgress.sdg14_lifeBelow_water,
      totalBusinessValue.sdgProgress.sdg15_lifeOnLand,

      // Strategic Business Metrics
      totalBusinessValue.brandEngagement,
      totalBusinessValue.roi, // Investment ROI
      totalBusinessValue.esgScore, // Scalability score
      Math.min(100, totalBusinessValue.esgScore + 20), // Risk mitigation score
    ]);

    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  }

  async downloadPDF() {
    if (!this.currentData || this.stations.length === 0) {
      alert("No data available to download");
      return;
    }

    const { jsPDF } = window.jspdf;
    // Start in Portrait for Cover
    const doc = new jsPDF("p", "mm", "a4");

    // Circular Gradient Colors Only
    const colors = {
      primary: "#c0c7be", // Light green-gray
      secondary: "#5c7257", // Medium green
      accent: "#2f472c", // Dark green
      dark: "#1f371c", // Darkest green
      white: "#ffffff",
      lightGreen: "#c0c7be", // Same as primary
      gold: "#2f472c", // Use accent color
      textDark: "#1f371c", // Darkest green
      textLight: "#5c7257", // Medium green
      surface: "#ffffff", // White surface
      shadow: "#1f371c20", // Dark green shadow
    };

    let width = doc.internal.pageSize.getWidth();
    let height = doc.internal.pageSize.getHeight();

    // --- ENVIRONMENTAL DECORATION THEMES ---
    const drawDecorativeElement = (type, x, y, w, h) => {
      doc.saveGraphicsState();

      // 1. Base Background & Clipping
      doc.rect(x, y, w, h);
      doc.clip();

      // Soft background for all
      doc.setFillColor(colors.primary);
      doc.rect(x, y, w, h, "F");

      // 2. Theme-specific patterns
      switch (type) {
        case "nature": // Leaf/Organic Pattern
          doc.setFillColor(colors.secondary);
          for (let i = 0; i < 15; i++) {
            const lx = x + Math.random() * w;
            const ly = y + Math.random() * h;
            const size = 5 + Math.random() * 10;
            // Simple leaf shape (ellipse rotated)
            doc.circle(lx, ly, size, "F");
          }
          // Add some accent leaves
          doc.setFillColor(colors.accent);
          for (let i = 0; i < 8; i++) {
            const lx = x + Math.random() * w;
            const ly = y + Math.random() * h;
            doc.circle(lx, ly, 4, "F");
          }
          break;

        case "business": // Environmental Landscape
          // Sun
          doc.setFillColor(colors.gold);
          doc.circle(x + w * 0.85, y + h * 0.25, 8, "F");

          // Rolling Hills (Abstract)
          doc.setFillColor(colors.secondary);
          doc.ellipse(x + w * 0.2, y + h, w * 0.4, h * 0.7, "F");
          doc.ellipse(x + w * 0.7, y + h, w * 0.5, h * 0.6, "F");

          doc.setFillColor(colors.accent);
          doc.ellipse(x + w * 0.5, y + h + 5, w * 0.6, h * 0.5, "F");

          // Small Trees
          doc.setFillColor(colors.dark);
          doc.triangle(
            x + w * 0.2,
            y + h * 0.5,
            x + w * 0.23,
            y + h * 0.3,
            x + w * 0.26,
            y + h * 0.5,
            "F",
          );
          doc.triangle(
            x + w * 0.75,
            y + h * 0.6,
            x + w * 0.78,
            y + h * 0.4,
            x + w * 0.81,
            y + h * 0.6,
            "F",
          );
          break;

        case "stations": // Forest/Trees
          // Draw abstract trees
          doc.setFillColor(colors.dark); // Trunks
          for (let i = 0; i < 8; i++) {
            const tx = x + (w / 8) * i + 5;
            const th = 10 + Math.random() * 15;
            doc.rect(tx, y + h - th, 2, th, "F");
            // Foliage
            doc.setFillColor(colors.secondary);
            doc.circle(tx + 1, y + h - th, 8, "F");
          }
          break;

        case "sdg": // Circular Economy / Rings
          doc.setDrawColor(colors.secondary);
          doc.setLineWidth(1);
          for (let i = 0; i < 5; i++) {
            doc.circle(x + w / 2, y + h / 2, (i + 1) * 8, "S");
          }
          break;

        case "toc": // Growth / Upward
        default:
          doc.setFillColor(colors.secondary);
          for (let i = 0; i < 10; i++) {
            const barH = h * 0.3 + Math.random() * (h * 0.5);
            doc.rect(x + (w / 10) * i, y + h - barH, w / 12, barH, "F");
          }
          break;
      }

      // 3. Subtle Overlay for cohesion
      doc.setFillColor(colors.white);
      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.rect(x, y, w, h, "F");

      doc.restoreGraphicsState();
    };

    // --- ENHANCED COVER PAGE (Portrait) ---
    const companyName =
      document.getElementById("searchInput").value ||
      document.getElementById("searchInput2").value ||
      "Cycl";
    const year = new Date().getFullYear();
    const periodText =
      this.currentPeriod === "month"
        ? "Current Month"
        : this.currentPeriod === "year"
          ? "Current Year"
          : this.currentPeriod === "custom"
            ? "Custom Period"
            : "All Time";

    // 1. Background - Clean White
    doc.setFillColor(colors.white);
    doc.rect(0, 0, width, height, "F");

    // 2. Hero Section - Modern Split Layout
    // Top dark section (approx 45% height)
    doc.setFillColor(colors.dark);
    doc.rect(0, 0, width, height * 0.45, "F");

    // Geometric Accent Strip
    doc.setFillColor(colors.accent);
    doc.rect(0, height * 0.45, width * 0.7, 8, "F");

    doc.setFillColor(colors.secondary);
    doc.rect(width * 0.7, height * 0.45, width * 0.3, 8, "F");

    // 3. Typography - Hero
    doc.setTextColor(colors.white);
    doc.setFontSize(80);
    doc.setFont("helvetica", "bold");
    doc.text("ESG", 25, height * 0.25);

    doc.setTextColor(colors.primary); // Light green-gray
    doc.setFontSize(32);
    doc.setFont("helvetica", "normal");
    doc.text("IMPACT REPORT", 25, height * 0.25 + 16);

    // 4. Company & Details Section (White area)
    const contentStart = height * 0.58;

    // "PREPARED FOR" Label
    doc.setTextColor(colors.secondary);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("PREPARED FOR", 25, contentStart);

    // Company Name
    doc.setTextColor(colors.dark);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text(companyName.toUpperCase(), 25, contentStart + 15);

    // Divider Line
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(0.5);
    doc.line(25, contentStart + 25, width - 25, contentStart + 25);

    // Year & Period Grid
    // Year Column
    doc.setTextColor(colors.secondary);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("YEAR", 25, contentStart + 45);

    doc.setTextColor(colors.accent);
    doc.setFontSize(24);
    doc.text(String(year), 25, contentStart + 58);

    // Period Column
    doc.setTextColor(colors.secondary);
    doc.setFontSize(10);
    doc.text("REPORTING PERIOD", 90, contentStart + 45);

    doc.setTextColor(colors.accent);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(periodText, 90, contentStart + 58);

    // 5. Bottom Branding - Minimalist
    doc.setFillColor(colors.dark);
    doc.circle(width - 30, height - 30, 10, "F");
    doc.setTextColor(colors.white);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("CYCL", width - 30, height - 28, { align: "center" }); // --- ENHANCED HEADER/FOOTER for Landscape ---
    const addHeader = (title) => {
      // Clean modern header with subtle elevation
      doc.setFillColor(colors.white);
      doc.rect(0, 0, width, 32, "F");

      // Subtle shadow
      doc.setFillColor(colors.shadow);
      doc.rect(0, 31, width, 1, "F");

      // Accent line
      doc.setFillColor(colors.accent);
      doc.rect(0, 0, width, 3, "F");

      // Modern typography
      doc.setTextColor(colors.primary);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 20, 22);

      // Company info with modern styling
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.textLight);
      doc.text(`${companyName} • ${year}`, width - 20, 22, { align: "right" });
    };

    const addFooter = (pageNumber) => {
      // Minimal modern footer
      doc.setFillColor(colors.surface);
      doc.rect(0, height - 18, width, 18, "F");

      // Subtle top border
      doc.setFillColor(colors.shadow);
      doc.rect(0, height - 18, width, 1, "F");

      // Modern page numbering
      doc.setTextColor(colors.textLight);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`${pageNumber}`, width / 2, height - 8, {
        align: "center",
      });

      // Clean branding
      doc.setFontSize(8);
      doc.setTextColor(colors.textLight);
      doc.text("CYCL ESG Platform", width - 20, height - 8, {
        align: "right",
      });

      // Small accent dot
      doc.setFillColor(colors.accent);
      doc.circle(20, height - 9, 1.5, "F");
    };

    let pageNum = 1;

    // --- PAGE 2: ELEGANT TOC (Landscape) ---
    doc.addPage("a4", "l");
    width = doc.internal.pageSize.getWidth();
    height = doc.internal.pageSize.getHeight();
    pageNum++;
    const tocPageNum = pageNum;

    // Modern background
    doc.setFillColor(colors.lightGreen);
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.rect(0, 0, width, height, "F");
    doc.setGState(new doc.GState({ opacity: 1 }));

    // Large decorative visual on right
    drawDecorativeElement("toc", width * 0.58, 30, width * 0.4, height - 45);

    // --- PAGE 3: EXECUTIVE SUMMARY (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const execSummaryPageNum = pageNum;
    addHeader("Executive Summary");

    // Layout: Left (25%), Middle (35%), Right (40%)
    const col1X = 15;
    const col1W = (width - 30) * 0.25;
    const col2X = col1X + col1W + 10;
    const col2W = (width - 30) * 0.35;
    const col3X = col2X + col2W + 10;
    const col3W = (width - 30) * 0.4 - 20;

    // Col 1: Overview
    doc.setTextColor(colors.textDark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Overview", col1X, 40);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const summaryText = `This report provides a comprehensive analysis of the environmental, social, and governance (ESG) performance for ${companyName}. The data reflects the commitment to sustainability and responsible business practices during the period of ${periodText}.`;
    const splitSummary = doc.splitTextToSize(summaryText, col1W);
    doc.text(splitSummary, col1X, 50);

    const textHeight = doc.getTextDimensions(splitSummary).h;
    // Enhanced nature visualization
    drawDecorativeElement("nature", col1X, 50 + textHeight + 10, col1W, 65);

    // Col 2: Env Metrics
    doc.setTextColor(colors.textDark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Environmental Impact", col2X, 40);

    const impactData = this.currentData.impact || {};
    const co2Kg = parseFloat(impactData.co2Saved) || 0;
    const plasticKg = parseFloat(impactData.plasticDiverted) || 0;
    const waterL = parseFloat(impactData.waterSaved) || 0;
    const energyKwh = parseFloat(impactData.energySaved) || 0;

    const metrics = [
      {
        label: "Bottles Recycled",
        value: (this.currentData.totalBottles || 0).toLocaleString(),
        unit: "units",
      },
      { label: "CO2 Saved", value: co2Kg.toLocaleString(), unit: "kg" },
      { label: "Water Saved", value: waterL.toLocaleString(), unit: "L" },
      { label: "Energy Saved", value: energyKwh.toLocaleString(), unit: "kWh" },
      {
        label: "Plastic Diverted",
        value: plasticKg.toLocaleString(),
        unit: "kg",
      },
    ];

    let yPos = 50;
    metrics.forEach((metric, idx) => {
      const cardHeight = 22; // Reduced height to fit page better

      // 1. Card Background (White with subtle shadow)
      doc.setFillColor(colors.shadow);
      doc.roundedRect(col2X + 1, yPos + 1, col2W, cardHeight, 1, 1, "F"); // Shadow
      doc.setFillColor(colors.white);
      doc.roundedRect(col2X, yPos, col2W, cardHeight, 1, 1, "F"); // Main Card

      // 2. Green Accent Bar (Aligned left strip)
      doc.setFillColor(colors.secondary);
      // Draw rounded rect for left edge
      doc.roundedRect(col2X, yPos, 5, cardHeight, 1, 1, "F");
      // Square off the right side of the accent bar so it connects cleanly to white
      doc.rect(col2X + 2, yPos, 3, cardHeight, "F");

      // 3. Text Content (Vertically Centered)
      // Label
      doc.setTextColor(colors.textLight);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(metric.label, col2X + 12, yPos + 8);

      // Value
      doc.setTextColor(colors.dark);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${metric.value} ${metric.unit}`, col2X + 12, yPos + 17);

      yPos += 27; // Reduced spacing to keep within page bounds
    }); // Col 3: Business Impact
    doc.setTextColor(colors.textDark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Business Impact", col3X, 40);

    const totalBusinessValue = this.calculateBusinessValue(
      this.currentData.totalBottles || 0,
    );
    const businessMetrics = [
      {
        label: "Cost Savings",
        value:
          "$" +
          (
            parseFloat(totalBusinessValue.wasteManagementSavings) +
            parseFloat(totalBusinessValue.materialValue)
          ).toLocaleString(),
      },
      {
        label: "Carbon Credit Value",
        value: "$" + totalBusinessValue.carbonCreditValue,
      },
      { label: "ROI", value: totalBusinessValue.roi + "%" },
      { label: "ESG Score", value: totalBusinessValue.esgScore + "/100" },
    ];

    yPos = 50;
    businessMetrics.forEach((metric, idx) => {
      // Premium business metric cards
      doc.setFillColor(colors.secondary);
      doc.setGState(new doc.GState({ opacity: 0.08 }));
      doc.roundedRect(col3X, yPos, col3W, 28, 4, 4, "F");
      doc.setGState(new doc.GState({ opacity: 1 }));

      doc.setFillColor(colors.white);
      doc.roundedRect(col3X + 2, yPos + 2, col3W - 4, 24, 3, 3, "F");

      // Gold accent for value
      doc.setFillColor(colors.gold);
      doc.setGState(new doc.GState({ opacity: 0.15 }));
      doc.circle(col3X + col3W - 15, yPos + 14, 12, "F");
      doc.setGState(new doc.GState({ opacity: 1 }));

      doc.setTextColor(colors.textLight);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(metric.label, col3X + 6, yPos + 10);

      doc.setTextColor(colors.dark);
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text(metric.value, col3X + 6, yPos + 22);

      yPos += 32;
    });

    // --- PAGE 3: INTRODUCTION & STRATEGY (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const introPageNum = pageNum;
    addHeader("Introduction & Environmental Strategy");

    // Layout: Left Column (Introduction) - 45%, Right Column (Strategy) - 50%
    const introCol1X = 15;
    const introCol1W = (width - 40) * 0.45;
    const introCol2X = introCol1X + introCol1W + 10;
    const introCol2W = (width - 40) * 0.5;

    // Introduction Section
    doc.setTextColor(colors.dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("About Us", introCol1X, 45);

    doc.setTextColor(colors.textDark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const introText = `${companyName}, in partnership with Cycl, provides a smart mobile application platform that empowers users to recycle their PET bottles and cans conveniently using their smartphones. By leveraging technology, we bridge the gap between consumers and recycling infrastructure, making sustainability accessible, rewarding, and transparent.

Our mission is to revolutionize the recycling experience by providing real-time data, gamified rewards, and seamless integration with smart recycling stations. This report highlights the tangible environmental impact generated through our platform, demonstrating our commitment to a circular economy.`;

    const splitIntro = doc.splitTextToSize(introText, introCol1W);
    doc.text(splitIntro, introCol1X, 55);

    // Environmental Strategy Section
    doc.setTextColor(colors.dark);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Environmental Strategy", introCol2X, 45);

    const strategyItems = [
      {
        title: "Circular Economy Integration",
        desc: "We aim to close the loop on waste by ensuring high-quality materials are returned to the production cycle, reducing reliance on virgin plastics.",
      },
      {
        title: "Carbon Footprint Reduction",
        desc: "Through optimized logistics and increased recycling rates, we actively work to lower the carbon emissions associated with waste management and material production.",
      },
      {
        title: "Community Engagement",
        desc: "We believe that sustainable change starts with the individual. Our strategy focuses on educating and incentivizing users to adopt long-term eco-friendly habits.",
      },
    ];

    let stratY = 55;
    strategyItems.forEach((item) => {
      doc.setTextColor(colors.secondary);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(item.title, introCol2X, stratY);

      doc.setTextColor(colors.textLight);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitDesc = doc.splitTextToSize(item.desc, introCol2W);
      doc.text(splitDesc, introCol2X, stratY + 6);

      stratY += doc.getTextDimensions(splitDesc).h + 15;
    });

    // Decorative Element at bottom
    drawDecorativeElement("nature", 15, height - 50, width - 30, 30);
    addFooter(pageNum);

    // --- PAGE 4: ESG AREAS & ANALYSIS (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const esgAreasPageNum = pageNum;
    addHeader("ESG Areas & Analysis");

    // Layout: 3 Columns for E, S, G
    const areaColW = (width - 40) / 3;
    const areaGap = 10;

    const esgAreas = [
      {
        title: "Environmental",
        color: colors.secondary,
        factors: [
          "Resource Efficiency: Maximizing recovery of PET and Aluminum.",
          "Climate Action: Direct CO2 savings of " +
            (parseFloat(impactData.co2Saved) || 0).toLocaleString() +
            " kg.",
          "Waste Diversion: Enabling a deposit return scheme ('pant') similar to advanced recycling systems, ensuring materials are efficiently recovered.",
        ],
      },
      {
        title: "Social",
        color: colors.accent,
        factors: [
          "Community Impact: Engaging users in sustainable practices.",
          "Health & Safety: Promoting clean environments by reducing litter.",
          "Accessibility: Making recycling easy and accessible via mobile tech.",
        ],
      },
      {
        title: "Governance",
        color: colors.dark,
        factors: [
          "Transparency: Real-time data reporting and audit trails.",
          "Compliance: Adhering to local and international waste regulations.",
          "Ethics: Promoting fair and responsible recycling incentives.",
        ],
      },
    ];

    let areaX = 15;
    esgAreas.forEach((area) => {
      // Header Card
      doc.setFillColor(area.color);
      doc.roundedRect(areaX, 40, areaColW, 12, 2, 2, "F");

      doc.setTextColor(colors.white);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(area.title, areaX + areaColW / 2, 48, { align: "center" });

      // Content Box
      doc.setDrawColor(area.color);
      doc.setLineWidth(0.5);
      doc.roundedRect(areaX, 55, areaColW, 60, 2, 2, "S");

      let factorY = 65;
      area.factors.forEach((factor) => {
        doc.setTextColor(colors.textDark);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");

        // Bullet point
        doc.setFillColor(area.color);
        doc.circle(areaX + 5, factorY - 1, 1.5, "F");

        const splitFactor = doc.splitTextToSize(factor, areaColW - 15);
        doc.text(splitFactor, areaX + 10, factorY);

        factorY += doc.getTextDimensions(splitFactor).h + 8;
      });

      areaX += areaColW + areaGap;
    });

    // Risks & Opportunities Section (Bottom Half)
    const riskY = 125;
    doc.setTextColor(colors.dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Risks & Opportunities", 15, riskY);

    // Split layout for Risks / Opportunities
    const riskColW = (width - 40) / 2;

    // Risks
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, riskY + 5, riskColW, 40, 2, 2, "F");
    doc.setTextColor(colors.dark);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Key Risks", 20, riskY + 15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      "• Regulatory changes in waste management policies.",
      20,
      riskY + 25,
    );
    doc.text(
      "• Fluctuations in recycled material market prices.",
      20,
      riskY + 32,
    );
    doc.text("• Operational risks in station maintenance.", 20, riskY + 39);

    // Opportunities
    doc.setFillColor(colors.lightGreen);
    doc.setGState(new doc.GState({ opacity: 0.3 }));
    doc.roundedRect(15 + riskColW + 10, riskY + 5, riskColW, 40, 2, 2, "F");
    doc.setGState(new doc.GState({ opacity: 1 }));

    doc.setTextColor(colors.secondary);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Strategic Opportunities", 20 + riskColW + 10, riskY + 15);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      "• Expansion into new geographic markets.",
      20 + riskColW + 10,
      riskY + 25,
    );
    doc.text(
      "• Partnerships with local municipalities and brands.",
      20 + riskColW + 10,
      riskY + 32,
    );
    doc.text(
      "• Enhanced data analytics services for partners.",
      20 + riskColW + 10,
      riskY + 39,
    );

    addFooter(pageNum);

    // --- PAGE 5: PLANS & PROGRESS (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const plansPageNum = pageNum;
    addHeader("Plans & Progress");

    // Vision & Goals
    doc.setTextColor(colors.dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Strategic Vision", 15, 45);

    const visionY = 60;
    const visionItems = [
      {
        title: "Carbon Reduction",
        desc: "Achieving a 30% reduction in carbon footprint, aligning with global sustainability targets and supporting the transition to a low-carbon economy.",
      },
      {
        title: "Plastic Recovery",
        desc: "Increasing material recovery rates to support the UN's Sustainable Development Goals (SDGs) for responsible consumption and production.",
      },
      {
        title: "Circular Economy",
        desc: "Establishing a fully closed-loop system for PET bottles and aluminum cans, ensuring resources are kept in use for as long as possible.",
      },
    ];

    let vY = visionY;
    visionItems.forEach((item) => {
      doc.setFillColor(colors.secondary);
      doc.circle(20, vY - 2, 2, "F");

      doc.setTextColor(colors.dark);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(item.title, 28, vY);

      doc.setTextColor(colors.textDark);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitDesc = doc.splitTextToSize(item.desc, width - 50);
      doc.text(splitDesc, 28, vY + 6);

      vY += doc.getTextDimensions(splitDesc).h + 15;
    });

    addFooter(pageNum);

    // --- PAGE 6: VISUAL ANALYTICS (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const visualAnalyticsPageNum = pageNum;
    addHeader("Visual Analytics");

    const chartItems = [
      { id: "monthlyChart", title: "Monthly Trends" },
      { id: "impactChart", title: "Environmental Impact" },
      { id: "sdgChart", title: "UN SDG Progress" },
      { id: "businessValueChart", title: "Business Value Created" },
    ];

    const chartW = (width - 40) / 2;
    const chartH = (height - 60) / 2;

    chartItems.forEach((item, index) => {
      const canvas = document.getElementById(item.id);
      if (!canvas) return;

      const col = index % 2;
      const row = Math.floor(index / 2);

      const x = 15 + col * (chartW + 10);
      const y = 35 + row * (chartH + 5);

      doc.setTextColor(colors.textDark);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(item.title, x, y);

      try {
        const imgData = canvas.toDataURL("image/png", 1.0);
        let imgW = chartW;
        let imgH = (canvas.height / canvas.width) * imgW;

        if (imgH > chartH - 10) {
          const scale = (chartH - 10) / imgH;
          imgH = chartH - 10;
          imgW = imgW * scale;
        }

        doc.addImage(imgData, "PNG", x, y + 5, imgW, imgH);
      } catch (e) {
        doc.text("(Chart unavailable)", x, y + 10);
      }
    });
    addFooter(pageNum);

    // --- PAGE 7: USAGE PATTERNS ANALYSIS (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const usagePatternsPageNum = pageNum;
    addHeader("Usage Patterns Analysis");

    // 1. Calculate Peaks
    let peakHourText = "N/A";
    let peakDayText = "N/A";

    const totalHourlyUsage = new Array(24).fill(0);
    const totalDailyUsageStats = new Array(7).fill(0); // Renamed to avoid collision

    this.stations.forEach((station) => {
      if (station.usageByHour) {
        station.usageByHour.forEach(
          (count, i) => (totalHourlyUsage[i] += count),
        );
      }
      if (station.usageByDay) {
        station.usageByDay.forEach(
          (count, i) => (totalDailyUsageStats[i] += count),
        );
      }
    });

    // Find max hour
    let maxHVal = -1;
    let maxHIdx = -1;
    totalHourlyUsage.forEach((val, i) => {
      if (val > maxHVal) {
        maxHVal = val;
        maxHIdx = i;
      }
    });

    if (maxHIdx !== -1) {
      const ampm = maxHIdx >= 12 ? "PM" : "AM";
      const hour = maxHIdx % 12 || 12;
      peakHourText = `${hour} ${ampm}`;
    }

    // Find max day
    let maxDVal = -1;
    let maxDIdx = -1;
    totalDailyUsageStats.forEach((val, i) => {
      if (val > maxDVal) {
        maxDVal = val;
        maxDIdx = i;
      }
    });

    const daysStats = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (maxDIdx !== -1) {
      peakDayText = daysStats[maxDIdx];
    }

    // Peak Description
    doc.setFontSize(12);
    doc.setTextColor(colors.textDark);
    doc.setFont("helvetica", "normal");
    const usageText = `Based on the analysis of user interactions, the stations had ${peakHourText} as the most used hour. Peak usage was observed on ${peakDayText}s.`;
    doc.text(usageText, 15, 38);

    // Add Charts
    const usageChartItems = [
      {
        id: "hourlyUsageChart",
        chartKey: "hourlyUsage",
        title: "Hourly Activity Patterns",
      },
      {
        id: "dailyUsageChart",
        chartKey: "dailyUsage",
        title: "Daily Usage Trends",
      },
    ];

    const uChartW = (width - 40) / 2;
    const uChartH = height - 60;

    usageChartItems.forEach((item, index) => {
      const x = 15 + index * (uChartW + 10);
      const y = 45;

      doc.setTextColor(colors.textDark);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(item.title, x, y);

      let imgData = null;
      // Try from chart instance
      if (this.charts && this.charts[item.chartKey]) {
        try {
          imgData = this.charts[item.chartKey].toBase64Image();
        } catch (e) {
          console.warn("Chart export failed", e);
        }
      }

      // Fallback to canvas
      if (!imgData) {
        const canvas = document.getElementById(item.id);
        if (canvas) {
          try {
            imgData = canvas.toDataURL("image/png", 1.0);
          } catch (e) {}
        }
      }

      if (imgData) {
        try {
          doc.addImage(imgData, "PNG", x, y + 5, uChartW, uChartH * 0.6); // Fixed aspect for PDF
        } catch (e) {
          doc.text("(Chart unavailable)", x, y + 10);
        }
      } else {
        doc.text("(Chart not available)", x, y + 10);
      }
    });

    addFooter(pageNum);

    // --- PAGE 5: STATION DETAILS (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;
    const stationDetailsPageNum = pageNum;
    addHeader("Station Performance Details");

    let listX = width * 0.25 + 20;
    let listW = width * 0.75 - 30;
    let cardW = (listW - 10) / 2;
    const cardHeight = 46; // Increased height for extra details
    const cardGap = 10;

    drawDecorativeElement("stations", 15, 35, width * 0.25, height - 50);

    let rowY = 35;
    let columnIndex = 0;

    this.stations.forEach((station) => {
      if (rowY + cardHeight > height - 20) {
        addFooter(pageNum);
        doc.addPage("a4", "l");
        pageNum++;
        addHeader("Station Performance Details (Cont.)");
        width = doc.internal.pageSize.getWidth();
        height = doc.internal.pageSize.getHeight();
        drawDecorativeElement("stations", 15, 35, width * 0.25, height - 50);
        listX = width * 0.25 + 20;
        listW = width * 0.75 - 30;
        cardW = (listW - 10) / 2;
        rowY = 35;
        columnIndex = 0;
      }

      const cardX = listX + columnIndex * (cardW + 10);

      const efficiency = (
        (station.currentCap / station.capacity) *
        100
      ).toFixed(1);
      const impact = this.calculateEnvironmentalImpact(station.currentCap);

      doc.setFillColor(colors.white);
      doc.setDrawColor(colors.primary);
      doc.roundedRect(cardX, rowY, cardW, cardHeight, 2, 2, "FD");

      doc.setTextColor(colors.dark);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(
        `${station.stationNumber} - ${station.placeName}`,
        cardX + 5,
        rowY + 8,
      );

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`Address: ${station.address}`, cardX + 5, rowY + 16);
      doc.text(
        `Status: ${efficiency}% Full (${station.currentCap}/${station.capacity})`,
        cardX + 5,
        rowY + 24,
      );
      doc.text(`Collected: ${station.currentCap} units`, cardX + 5, rowY + 32);

      doc.setTextColor(colors.secondary);
      doc.text(
        `CO2: ${impact.co2Saved}kg | Water: ${impact.waterSaved}L`,
        cardX + 5,
        rowY + 40,
      );

      if (columnIndex === 1) {
        columnIndex = 0;
        rowY += cardHeight + cardGap + 8; // Increased gap for extra line
      } else {
        columnIndex = 1;
      }
    });
    addFooter(pageNum);

    // --- PAGE X: THANK YOU (Landscape) ---
    doc.addPage("a4", "l");
    pageNum++;

    // Decorative Background
    doc.setFillColor(colors.lightGreen);
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.rect(0, 0, width, height, "F");
    doc.setGState(new doc.GState({ opacity: 1 }));

    drawDecorativeElement("nature", 0, height * 0.6, width, height * 0.4);

    // Centered Content
    const thankYouY = height / 2 - 20;

    doc.setTextColor(colors.primary);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Thank You", width / 2, thankYouY, { align: "center" });

    doc.setTextColor(colors.dark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Together, we are building a cleaner, smarter future.",
      width / 2,
      thankYouY + 15,
      { align: "center" },
    );

    doc.setFontSize(10);
    doc.setTextColor(colors.textLight);
    doc.text("Generated by CYCL ESG Platform", width / 2, height - 20, {
      align: "center",
    });

    // --- RENDER TOC CONTENT ---
    doc.setPage(tocPageNum);
    addHeader("Table of Contents");

    const tocItems = [
      { title: "Executive Summary", page: execSummaryPageNum },
      { title: "Introduction & Strategy", page: introPageNum },
      { title: "ESG Areas & Analysis", page: esgAreasPageNum },
      { title: "Plans & Progress", page: plansPageNum },
      { title: "Visual Analytics", page: visualAnalyticsPageNum },
      { title: "Usage Patterns Analysis", page: usagePatternsPageNum },
      { title: "Station Performance Details", page: stationDetailsPageNum },
    ];

    let tocY = 50;
    tocItems.forEach((item) => {
      doc.setTextColor(colors.textDark);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(item.title, 20, tocY);

      const titleWidth = doc.getTextWidth(item.title);
      const pageNumWidth = doc.getTextWidth(String(item.page));
      const dotStart = 20 + titleWidth + 5;
      const dotEnd = width * 0.6 - 20 - pageNumWidth - 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      let currentX = dotStart;
      while (currentX < dotEnd) {
        doc.text(".", currentX, tocY);
        currentX += 3;
      }

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(String(item.page), width * 0.6 - 20, tocY, { align: "right" });

      tocY += 25;
    });

    addFooter(tocPageNum);

    // Save
    const filename = `cycl-esg-report-${periodText.replace(/\s+/g, "-")}.pdf`;
    doc.save(filename);
  }

  loadLastSearchedCompany() {
    try {
      const stored = localStorage.getItem("lastSearchedCompany");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn("Could not load last searched company from localStorage");
      return null;
    }
  }

  saveLastSearchedCompany(searchTerm) {
    const term = searchTerm.trim();
    if (!term) return;

    const companyData = {
      placeName: term,
      searchedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("lastSearchedCompany", JSON.stringify(companyData));
      this.lastSearchedCompany = companyData;
      this.renderQuickAccess();
    } catch (error) {
      console.warn("Could not save last searched company to localStorage");
    }
  }

  renderQuickAccess() {
    const card = document.getElementById("quickAccessCard");
    const welcomeScreen = document.querySelector(".welcome-screen");

    if (!card || !welcomeScreen) return;

    if (!this.lastSearchedCompany) {
      card.style.display = "none";
      return;
    }

    const { placeName } = this.lastSearchedCompany;

    // Get company illustration based on company name
    const companyIllustration = this.getCompanyIllustration(placeName);

    // Make the whole card clickable
    card.onclick = () => window.dashboard.quickSearch(placeName);

    card.innerHTML = `
      <div class="quick-access-card-image">
        <div class="quick-access-card-icon">
          ${companyIllustration}
        </div>
      </div>
      <div class="quick-access-card-content">
        <div class="quick-access-card-header">
          <div class="quick-access-card-info">
            <h3 class="quick-access-card-title">${placeName}</h3>
            <p class="quick-access-card-subtitle">Recent Search</p>
          </div>
        </div>
      </div>
    `;

    card.style.display = "flex"; // Changed to flex to match CSS
  }

  getCompanyIllustration(companyName) {
    const name = companyName.toLowerCase();

    // Professional SVG illustrations based on company type/industry
    const illustrations = {
      // Retail & Consumer Brands
      ikea: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="60" height="50" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <rect x="25" y="35" width="15" height="20" rx="2" fill="#ffffff"/>
        <rect x="45" y="35" width="10" height="20" rx="2" fill="#ffffff"/>
        <rect x="60" y="35" width="15" height="20" rx="2" fill="#ffffff"/>
        <rect x="30" y="60" width="40" height="3" fill="#22c55e"/>
        <path d="M35 20 L50 10 L65 20" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>`,

      maersk: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 L80 70 L75 50 L25 50 Z" fill="#4ade80"/>
        <rect x="30" y="40" width="40" height="20" rx="2" fill="#22c55e"/>
        <rect x="45" y="25" width="10" height="15" fill="#16a34a"/>
        <circle cx="30" cy="60" r="3" fill="#ffffff"/>
        <circle cx="70" cy="60" r="3" fill="#ffffff"/>
        <path d="M15 75 Q50 65 85 75" stroke="#06b6d4" stroke-width="3" fill="none"/>
      </svg>`,

      medical: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="#4ade80" stroke="#22c55e" stroke-width="3"/>
        <rect x="45" y="35" width="10" height="30" rx="2" fill="#ffffff"/>
        <rect x="35" y="45" width="30" height="10" rx="2" fill="#ffffff"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="5,5"/>
      </svg>`,

      tech: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="25" width="60" height="40" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <rect x="25" y="30" width="50" height="25" rx="2" fill="#ffffff"/>
        <rect x="35" y="70" width="30" height="8" rx="4" fill="#22c55e"/>
        <circle cx="35" cy="40" r="2" fill="#22c55e"/>
        <circle cx="45" cy="40" r="2" fill="#22c55e"/>
        <circle cx="55" cy="40" r="2" fill="#22c55e"/>
      </svg>`,

      finance: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="35" width="70" height="45" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <rect x="25" y="25" width="50" height="8" rx="4" fill="#22c55e"/>
        <rect x="30" y="45" width="8" height="3" fill="#ffffff"/>
        <rect x="42" y="45" width="8" height="3" fill="#ffffff"/>
        <rect x="54" y="45" width="8" height="3" fill="#ffffff"/>
        <rect x="66" y="45" width="8" height="3" fill="#ffffff"/>
        <path d="M25 55 L75 55" stroke="#ffffff" stroke-width="2"/>
      </svg>`,

      energy: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 20 L35 45 L50 45 L40 80 L60 55 L45 55 L55 20 Z" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="8,4"/>
      </svg>`,

      transport: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="40" width="60" height="25" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <rect x="25" y="35" width="15" height="15" rx="2" fill="#22c55e"/>
        <circle cx="35" cy="70" r="6" fill="#22c55e"/>
        <circle cx="65" cy="70" r="6" fill="#22c55e"/>
        <circle cx="35" cy="70" r="3" fill="#ffffff"/>
        <circle cx="65" cy="70" r="3" fill="#ffffff"/>
        <rect x="45" y="45" width="8" height="8" fill="#ffffff"/>
        <rect x="58" y="45" width="8" height="8" fill="#ffffff"/>
      </svg>`,

      food: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="#4ade80" stroke="#22c55e" stroke-width="3"/>
        <path d="M40 45 Q50 35 60 45 Q50 55 40 45" fill="#ffffff"/>
        <circle cx="45" cy="48" r="2" fill="#22c55e"/>
        <circle cx="55" cy="48" r="2" fill="#22c55e"/>
        <path d="M45 58 Q50 62 55 58" stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>`,

      education: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 50 L50 30 L80 50 L50 70 Z" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <rect x="46" y="25" width="8" height="45" fill="#22c55e"/>
        <circle cx="50" cy="25" r="4" fill="#ffffff"/>
        <path d="M25 55 L75 55" stroke="#22c55e" stroke-width="3"/>
      </svg>`,

      // Default business illustration
      default: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="50" height="60" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2"/>
        <rect x="30" y="30" width="8" height="8" fill="#ffffff"/>
        <rect x="42" y="30" width="8" height="8" fill="#ffffff"/>
        <rect x="54" y="30" width="8" height="8" fill="#ffffff"/>
        <rect x="30" y="42" width="8" height="8" fill="#ffffff"/>
        <rect x="42" y="42" width="8" height="8" fill="#ffffff"/>
        <rect x="54" y="42" width="8" height="8" fill="#ffffff"/>
        <rect x="30" y="54" width="8" height="8" fill="#ffffff"/>
        <rect x="42" y="54" width="8" height="8" fill="#ffffff"/>
        <rect x="54" y="54" width="8" height="8" fill="#ffffff"/>
        <rect x="40" y="68" width="20" height="12" fill="#22c55e"/>
      </svg>`,
    };

    // Match company names to appropriate illustrations
    if (name.includes("ikea")) return illustrations.ikea;
    if (name.includes("maersk")) return illustrations.maersk;
    if (
      name.includes("novo nordisk") ||
      name.includes("hospital") ||
      name.includes("medical") ||
      name.includes("health")
    )
      return illustrations.medical;
    if (
      name.includes("coca cola") ||
      name.includes("coca-cola") ||
      name.includes("starbucks") ||
      name.includes("mcdonalds") ||
      name.includes("mcdonald's") ||
      name.includes("restaurant") ||
      name.includes("food")
    )
      return illustrations.food;
    if (
      name.includes("apple") ||
      name.includes("google") ||
      name.includes("microsoft") ||
      name.includes("tech") ||
      name.includes("software")
    )
      return illustrations.tech;
    if (
      name.includes("tesla") ||
      name.includes("energy") ||
      name.includes("power") ||
      name.includes("electric")
    )
      return illustrations.energy;
    if (
      name.includes("amazon") ||
      name.includes("transport") ||
      name.includes("logistics") ||
      name.includes("delivery")
    )
      return illustrations.transport;
    if (
      name.includes("bank") ||
      name.includes("financial") ||
      name.includes("finance")
    )
      return illustrations.finance;
    if (
      name.includes("university") ||
      name.includes("school") ||
      name.includes("education")
    )
      return illustrations.education;

    // Default business building illustration
    return illustrations.default;
  }

  quickSearch(placeName) {
    const searchInput1 = document.getElementById("searchInput");
    const searchInput2 = document.getElementById("searchInput2");

    if (searchInput1) searchInput1.value = placeName;
    if (searchInput2) searchInput2.value = placeName;

    this.searchStations();
  }

  // Business-focused chart for UN SDG progress
  renderSDGChart() {
    const ctx = document.getElementById("sdgChart").getContext("2d");

    // Increase container height to fit long labels better
    try {
      ctx.canvas.parentElement.style.height = "360px";
    } catch (_) {}

    if (this.charts.sdg) {
      this.charts.sdg.destroy();
    }

    const { totalBottles } = this.currentData;
    const businessValue = this.calculateBusinessValue(totalBottles);
    const sdgData = businessValue.sdgProgress;

    this.charts.sdg = new Chart(ctx, {
      type: "radar",
      data: {
        // Use multi-line labels to avoid clipping
        labels: [
          ["SDG 6:", "Clean Water"],
          ["SDG 7:", "Clean Energy"],
          ["SDG 11:", "Sustainable", "Cities"],
          ["SDG 12:", "Responsible", "Consumption"],
          ["SDG 13:", "Climate Action"],
          ["SDG 14:", "Life Below", "Water"],
          ["SDG 15:", "Life on", "Land"],
        ],
        datasets: [
          {
            label: "SDG Impact Score",
            data: [
              Math.min(100, parseFloat(sdgData.sdg6_cleanWater) * 10),
              Math.min(100, parseFloat(sdgData.sdg7_cleanEnergy) * 10),
              Math.min(100, parseFloat(sdgData.sdg11_sustainableCities) * 50),
              Math.min(100, sdgData.sdg12_responsibleConsumption / 100),
              Math.min(100, parseFloat(sdgData.sdg13_climateAction) * 10),
              Math.min(100, sdgData.sdg14_lifeBelow_water * 2),
              Math.min(100, sdgData.sdg15_lifeOnLand * 2),
            ],
            backgroundColor: "rgba(25, 118, 210, 0.2)",
            borderColor: "#1976d2",
            borderWidth: 2,
            pointBackgroundColor: "#1976d2",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#1976d2",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: 10 },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            pointLabels: {
              font: { size: 11 },
              padding: 10,
            },
            ticks: {
              stepSize: 20,
              // Show as score, not percent
            },
          },
        },
      },
    });
  }

  // Business value chart showing economic benefits
  renderBusinessValueChart() {
    const ctx = document.getElementById("businessValueChart").getContext("2d");

    if (this.charts.businessValue) {
      this.charts.businessValue.destroy();
    }

    const { totalBottles } = this.currentData;
    const businessValue = this.calculateBusinessValue(totalBottles);

    this.charts.businessValue = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Cost Savings",
          "Carbon Credit Value",
          "Material Value",
          "Brand Value",
        ],
        datasets: [
          {
            data: [
              parseFloat(businessValue.wasteManagementSavings),
              parseFloat(businessValue.carbonCreditValue),
              parseFloat(businessValue.materialValue),
              parseFloat(businessValue.wasteManagementSavings) * 0.5, // Estimated brand value
            ],
            backgroundColor: ["#4caf50", "#2e7d32", "#1976d2", "#ff6f00"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ": $" + context.parsed.toLocaleString();
              },
            },
          },
        },
      },
    });
  }
}

// Global functions for HTML onclick events
// Dashboard instance
let dashboard;

// Queue for functions called before dashboard is ready
const preInitQueue = [];

// Helper function to execute or queue function calls
function executeOrQueue(funcName, args) {
  if (window.dashboard && window.dashboard[funcName]) {
    window.dashboard[funcName](...args);
  } else {
    console.warn(`Dashboard not ready, queueing ${funcName} call`);
    preInitQueue.push({ funcName, args });
  }
}

// Process queued function calls
function processQueue() {
  while (preInitQueue.length > 0) {
    const { funcName, args } = preInitQueue.shift();
    if (window.dashboard && window.dashboard[funcName]) {
      window.dashboard[funcName](...args);
    }
  }
}

function searchStations() {
  executeOrQueue("searchStations", []);
}

function setPeriod(period) {
  executeOrQueue("setPeriod", [period]);
}

function setQuickPeriod(period) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let fromMonth, fromYear, toMonth, toYear, periodText;

  switch (period) {
    case "month":
      fromMonth = toMonth = currentMonth;
      fromYear = toYear = currentYear;
      periodText = `This Month (${getMonthName(currentMonth)} ${currentYear})`;
      break;
    case "quarter":
      const quarterStart = Math.floor((currentMonth - 1) / 3) * 3 + 1;
      fromMonth = quarterStart;
      toMonth = quarterStart + 2;
      fromYear = toYear = currentYear;
      periodText = `This Quarter (${getMonthName(fromMonth)} - ${getMonthName(
        toMonth,
      )} ${currentYear})`;
      break;
    case "year":
      fromMonth = 1;
      toMonth = 12;
      fromYear = toYear = currentYear;
      periodText = `This Year (${currentYear})`;
      break;
    case "total":
      fromMonth = 1;
      fromYear = 2020;
      toMonth = 12;
      toYear = currentYear;
      periodText = "All Time (2020 - Present)";
      break;
  }

  // Update the form inputs
  document.getElementById("fromMonth").value = fromMonth;
  document.getElementById("fromYear").value = fromYear;
  document.getElementById("toMonth").value = toMonth;
  document.getElementById("toYear").value = toYear;

  // Update current period display
  document.getElementById("currentPeriodText").textContent = periodText;

  // Update active button
  document
    .querySelectorAll(".period-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Apply the filter
  applyDateFilter();
}

function applyDateFilter() {
  const fromMonth = parseInt(document.getElementById("fromMonth").value);
  const fromYear = parseInt(document.getElementById("fromYear").value);
  const toMonth = parseInt(document.getElementById("toMonth").value);
  const toYear = parseInt(document.getElementById("toYear").value);

  // Validate date range
  const fromDate = new Date(fromYear, fromMonth - 1);
  const toDate = new Date(toYear, toMonth - 1);

  if (fromDate > toDate) {
    alert(
      "From date cannot be later than To date. Please check your selection.",
    );
    return;
  }

  // Update the current period display
  const periodText = `${getMonthName(fromMonth)} ${fromYear} - ${getMonthName(
    toMonth,
  )} ${toYear}`;
  document.getElementById("currentPeriodText").textContent = periodText;

  // Set custom period for data filtering
  if (window.dashboard && window.dashboard.setCustomPeriod) {
    window.dashboard.setCustomPeriod({
      fromMonth,
      fromYear,
      toMonth,
      toYear,
    });
  } else {
    console.warn("Dashboard not ready, queueing setCustomPeriod call");
    preInitQueue.push({
      funcName: "setCustomPeriod",
      args: [
        {
          fromMonth,
          fromYear,
          toMonth,
          toYear,
        },
      ],
    });
  }

  // Clear active states from quick period buttons since this is a custom range
  if (fromMonth !== toMonth || fromYear !== toYear) {
    document
      .querySelectorAll(".period-btn")
      .forEach((btn) => btn.classList.remove("active"));
  }
}

function getMonthName(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
}

function quickSearch(placeName) {
  executeOrQueue("quickSearch", [placeName]);
}

function downloadCSV() {
  executeOrQueue("downloadCSV", []);
}

function downloadPDF() {
  executeOrQueue("downloadPDF", []);
}

// Make functions globally available
window.searchStations = searchStations;
window.setPeriod = setPeriod;
window.setQuickPeriod = setQuickPeriod;
window.applyDateFilter = applyDateFilter;
window.downloadCSV = downloadCSV;
window.downloadPDF = downloadPDF;
window.quickSearch = quickSearch;

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.dashboard = new ESGDashboard();

  // Process any queued function calls
  setTimeout(() => {
    processQueue();
  }, 100); // Small delay to ensure dashboard is fully initialized
});
