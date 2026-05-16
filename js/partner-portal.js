    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import {
      getAuth,
      createUserWithEmailAndPassword,
      onAuthStateChanged,
      signInWithEmailAndPassword,
      signOut,
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
    import {
      addDoc,
      collection,
      doc,
      getDoc,
      getDocFromCache,
      getDocs,
      getFirestore,
      limit as limitDocs,
      onSnapshot,
      query,
      limit,
      orderBy,
      serverTimestamp,
      setDoc,
      updateDoc,
      where,
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
    import {
      getStorage,
      ref as storageRef,
      uploadBytes,
      getDownloadURL,
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
    import {
      getFunctions,
      httpsCallable,
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-functions.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI",
      authDomain: "cycl-ionic.firebaseapp.com",
      projectId: "cycl-ionic",
      storageBucket: "cycl-ionic.appspot.com",
      messagingSenderId: "310990335294",
      appId: "1:310990335294:web:c8cb7e850a93d94854d06f",
      measurementId: "G-BSWJX4TVBF",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const cloudFunctions = getFunctions(app, "us-central1");
    const collections = {
      partners: "partners",
      stations: "stations",
      rewards: "activatedStore",
      rewardCodes: "reward_codes",
      collectionRequests: "partner_collection_requests",
    };

    const countries = [
      ["DK", "Denmark"],
      ["NO", "Norway"],
      ["GB", "United Kingdom"],
      ["DE", "Germany"],
      ["US", "United States"],
      ["NG", "Nigeria"],
      ["PT", "Portugal"],
      ["IN", "India"],
    ];
    const pricing = {
      access: 0,
      activation: 0,
      validation: 0,
      popular_sponsored: 0,
      featured_boost: 0,
      organic: 0,
    };
    const BUSINESS_CATEGORIES = [
      { id: "restaurant", name: "Restaurant", subs: ["Fast food", "Casual dining", "Fine dining", "Pizzeria", "Sushi", "Asian", "Mediterranean", "Burger / sandwich", "Buffet", "Other"] },
      { id: "cafe", name: "Café", subs: ["Coffee shop", "Bakery", "Tea house", "Juice / smoothie bar", "Dessert / ice cream", "Other"] },
      { id: "retail", name: "Retail", subs: ["Clothing", "Electronics", "Bookstore", "Sports & outdoors", "Beauty", "Home goods", "Florist", "Toy / hobby", "Specialty", "Other"] },
      { id: "shopping", name: "Shopping center", subs: ["Mall", "Outlet", "Department store", "Plaza", "Market hall", "Other"] },
      { id: "grocery", name: "Grocery", subs: ["Supermarket", "Convenience / kiosk", "Health food", "Specialty food", "Wholesale", "Other"] },
      { id: "hospitality", name: "Hospitality", subs: ["Hotel", "Hostel", "B&B", "Resort", "Vacation rental", "Other"] },
      { id: "fitness", name: "Fitness & wellness", subs: ["Gym", "Yoga / pilates", "Sports club", "Swimming pool", "Crossfit / box", "Other"] },
      { id: "service", name: "Service", subs: ["Hair salon", "Spa", "Pharmacy", "Auto / mechanic", "Laundry", "Print / copy", "Repair", "Other"] },
      { id: "entertainment", name: "Entertainment", subs: ["Cinema", "Bar / pub", "Nightclub", "Bowling", "Arcade", "Music venue", "Other"] },
      { id: "education", name: "Education", subs: ["School", "University", "Library", "Bootcamp", "Other"] },
      { id: "office", name: "Office / workplace", subs: ["Coworking", "Corporate office", "Other"] },
      { id: "brand", name: "Brand", subs: ["National brand", "Local brand", "E-commerce", "D2C", "Other"] },
      { id: "other", name: "Other", subs: ["Other"] },
    ];
    const CATEGORY_BY_ID = BUSINESS_CATEGORIES.reduce((acc, c) => { acc[c.id] = c; return acc; }, {});

    const STATION_TIERS = [
      { id: "standard", planId: "free", name: "Standard", multiplier: 1, monthlyFee: 0, productName: "Partner access", blurb: "Baseline reward. People earn the normal amount of Cycl Coins per recycled bottle." },
      { id: "premium", planId: "starter", name: "Premium", multiplier: 1.5, monthlyFee: 99, productName: "Cycl Partner Portal – Premium", blurb: "Bottles recycled at this station earn 1.5x Cycl Coins. Subtle boost, more repeat visitors." },
      { id: "golden", planId: "growth", name: "Golden", multiplier: 2, monthlyFee: 199, productName: "Cycl Partner Portal -Growth", blurb: "Bottles earn 2x Cycl Coins. Marked with a golden ring on the map. Strong customer pull." },
      { id: "ultra", planId: "pro", name: "Ultra Gold", multiplier: 3, monthlyFee: 299, productName: "Cycl Partner Portal -Pro", blurb: "Bottles earn 3x Cycl Coins. Premium glow on the map and the highest top-of-mind effect." },
    ];
    const TIER_BY_ID = STATION_TIERS.reduce((acc, t) => { acc[t.id] = t; return acc; }, {});
    const OPENING_DAY_OPTIONS = [
      { id: "mon", label: "Monday", short: "Mon" },
      { id: "tue", label: "Tuesday", short: "Tue" },
      { id: "wed", label: "Wednesday", short: "Wed" },
      { id: "thu", label: "Thursday", short: "Thu" },
      { id: "fri", label: "Friday", short: "Fri" },
      { id: "sat", label: "Saturday", short: "Sat" },
      { id: "sun", label: "Sunday", short: "Sun" },
    ];
    const OPENING_DAY_KEYS_BY_DATE = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const DEFAULT_OPENING_DAY = { open: "09:00", close: "17:00", closed: false };
    const BILLING_PLANS = [
      { id: "free", name: "Free", tierId: "standard", price: 0, rewardLimit: 3, copy: "List on the marketplace with up to 3 active rewards.", features: ["3 active rewards", "Marketplace visibility", "Basic stats", "Support"] },
      { id: "starter", name: "Starter", tierId: "premium", price: 99, rewardLimit: 5, stripeTier: "starter", productName: "Cycl Partner Portal – Premium", copy: "Up to 5 active rewards and deeper customer data.", features: ["5 active rewards", "Marketplace visibility", "Complete stats", "Support"] },
      { id: "growth", name: "Growth", tierId: "golden", price: 199, rewardLimit: 7, stripeTier: "growth", productName: "Cycl Partner Portal -Growth", recommended: true, copy: "Up to 7 active rewards with competitive insights to grow faster.", features: ["7 active rewards", "Complete stats", "Support", "Reward promotion credit"] },
      { id: "pro", name: "Pro", tierId: "ultra", price: 299, rewardLimit: 10, stripeTier: "pro", productName: "Cycl Partner Portal -Pro", copy: "Up to 10 active rewards with the full toolkit for serious growth.", features: ["Everything in Growth", "10 active rewards", "Priority support", "Complete stats", "Expanded promotion credit"] },
    ];
    const PLAN_BY_ID = BILLING_PLANS.reduce((acc, plan) => { acc[plan.id] = plan; return acc; }, {});
    const PLAN_BY_TIER_ID = BILLING_PLANS.reduce((acc, plan) => { acc[plan.tierId] = plan; return acc; }, {});
    function normalizeTierId(id) {
      return id === "ultra_gold" ? "ultra" : (id || "standard");
    }
    function getStationTier(station) {
      const id = normalizeTierId(station && (station.tier || station.rewardTier || station.subscriptionTier));
      return TIER_BY_ID[id] || TIER_BY_ID.standard;
    }
    function normalizeOpeningTime(value, fallback) {
      const text = String(value || "").trim();
      return /^([01]\d|2[0-3]):[0-5]\d$/.test(text) ? text : fallback;
    }
    function normalizeOpeningDay(value = {}) {
      const source = value && typeof value === "object" ? value : {};
      const closed = source.closed === true || source.isClosed === true;
      return {
        open: normalizeOpeningTime(source.open || source.opens || source.from, DEFAULT_OPENING_DAY.open),
        close: normalizeOpeningTime(source.close || source.closes || source.to, DEFAULT_OPENING_DAY.close),
        closed,
      };
    }
    function getStationOpeningHours(station) {
      const raw = station?.openingHours;
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
      return OPENING_DAY_OPTIONS.reduce((hours, day) => {
        hours[day.id] = normalizeOpeningDay(raw[day.id]);
        return hours;
      }, {});
    }
    function getOpeningMinutes(time) {
      const [hours, minutes] = normalizeOpeningTime(time, "00:00").split(":").map(Number);
      return (hours * 60) + minutes;
    }
    function isOpeningRuleActive(rule, minutes) {
      if (!rule || rule.closed) return false;
      const open = getOpeningMinutes(rule.open);
      const close = getOpeningMinutes(rule.close);
      if (open === close) return true;
      return close > open
        ? minutes >= open && minutes < close
        : minutes >= open || minutes < close;
    }
    function isPreviousOpeningRuleActive(rule, minutes) {
      if (!rule || rule.closed) return false;
      const open = getOpeningMinutes(rule.open);
      const close = getOpeningMinutes(rule.close);
      return close < open && minutes < close;
    }
    function isStationOpenNow(station, now = new Date()) {
      const hours = getStationOpeningHours(station);
      if (!hours) return true;
      const todayKey = OPENING_DAY_KEYS_BY_DATE[now.getDay()];
      const previousKey = OPENING_DAY_KEYS_BY_DATE[(now.getDay() + 6) % 7];
      const minutes = (now.getHours() * 60) + now.getMinutes();
      return isOpeningRuleActive(hours[todayKey], minutes)
        || isPreviousOpeningRuleActive(hours[previousKey], minutes);
    }
    function formatStationOpeningLine(station, now = new Date()) {
      const hours = getStationOpeningHours(station);
      if (!hours) return "Opening hours not set";
      const todayKey = OPENING_DAY_KEYS_BY_DATE[now.getDay()];
      const dayMeta = OPENING_DAY_OPTIONS.find((day) => day.id === todayKey);
      const rule = hours[todayKey] || normalizeOpeningDay();
      const dayLabel = dayMeta?.short || "Today";
      const dayHours = rule.closed ? "Closed" : `${rule.open}-${rule.close}`;
      return `${dayLabel} ${dayHours}${isStationOpenNow(station, now) ? "" : " · closed now"}`;
    }
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiY3ljbG1vYmlsZWFwcCIsImEiOiJja3lxODRlOHQwMGR0MnhzMHd3YXl3OTVxIn0.Gg2Zqy13hJU5iDUuV_F2Zg";

    const $ = (id) => document.getElementById(id);
    const isFileOrigin = window.location.protocol === "file:";
    const localPortalUrl = "http://localhost:5179/partner-portal.html";
    let currentPartner = null;
    let partnerBillingStatus = {
      loaded: false,
      loading: false,
      error: "",
      subscription: null,
      cards: [],
      hasCustomer: false,
    };
    let partnerInvoiceHistory = {
      loaded: false,
      loading: false,
      error: "",
      invoices: [],
      query: "",
      hasCustomer: false,
    };
    let stationRecords = [];
    let rewardRecords = [];
    let collectionRequestRecords = [];
    let rewardSubscriptions = [];
    const boostBaselineBackfillIds = new Set();
    const partnerSupport = {
      threads: [],
      selectedThreadId: null,
      messages: [],
      unsubscribeMessages: null,
    };
    const PARTNER_SUPPORT_COLLECTION = "partner_support_threads";
    let selectedRewardImageFile = null;
    let selectedRewardImagePreviewUrl = "";
    let rewardLocationSuggestions = [];
    let rewardLocationSearchTimer = 0;
    let rewardLocationAbortController = null;

    // Address search state (signup + profile)
    let signupAddressSuggestionsData = [];
    let signupAddressSearchTimer = 0;
    let signupAddressAbortController = null;
    let profileAddressSuggestionsData = [];
    let profileAddressSearchTimer = 0;
    let profileAddressAbortController = null;

    function escapeHtml(value = "") {
      return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[char]));
    }

    function money(value) {
      return `${Number(value || 0).toLocaleString("da-DK", { maximumFractionDigits: 0 })} kr`;
    }

    function formatInvoiceAmount(invoice) {
      const amount = Number(invoice?.total ?? invoice?.amountDue ?? 0) / 100;
      const currency = String(invoice?.currency || "dkk").toUpperCase();
      return `${currency} ${amount.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function formatInvoiceDate(dateMs) {
      if (!dateMs) return "Date pending";
      return new Date(dateMs).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    function getInvoiceStatusTone(invoice) {
      const tone = String(invoice?.statusTone || "draft").toLowerCase();
      return ["paid", "failed", "open", "draft", "void"].includes(tone) ? tone : "draft";
    }

    function hasSavedBillingCard() {
      return Array.isArray(partnerBillingStatus.cards) && partnerBillingStatus.cards.length > 0;
    }

    function syncBillingCardButton() {
      const button = $("billingPortalButton");
      if (!button || button.disabled) return;
      button.textContent = hasSavedBillingCard() ? "Update card" : "Add card";
    }

    function syncCancelSubscriptionButton() {
      const button = $("cancelSubscriptionButton");
      if (!button) return;
      const subscription = partnerBillingStatus.subscription;
      const live = hasLiveStripeSubscription(subscription);
      const alreadyScheduled = Boolean(subscription?.cancelAtPeriodEnd);
      button.style.display = live ? "inline-flex" : "none";
      if (!live) return;
      if (alreadyScheduled) {
        button.textContent = "Cancellation scheduled";
        button.disabled = true;
      } else {
        button.textContent = "Cancel subscription";
        button.disabled = false;
      }
    }

    function isConnectivityError(error) {
      const errorCode = String(error?.code || "").toLowerCase();
      const errorMessage = String(error?.message || "").toLowerCase();
      return errorCode.includes("unavailable")
        || errorCode.includes("offline")
        || errorMessage.includes("offline")
        || errorMessage.includes("could not reach cloud firestore backend")
        || errorMessage.includes("backend didn't respond within 10 seconds")
        || errorMessage.includes("client is offline");
    }

    function getReadableFirebaseError(error, fallback = "Something went wrong.") {
      if (isConnectivityError(error)) {
        return "Cycl could not reach Firebase right now. Check the connection and try again in a moment.";
      }

      const errorCode = String(error?.code || "");
      if (errorCode === "auth/network-request-failed") {
        return "Login could not reach Firebase Auth. Check the connection and try again.";
      }

      if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password" || errorCode === "auth/invalid-login-credentials") {
        return "Email or password is incorrect.";
      }

      return error?.message || fallback;
    }

    function getReadableCallableError(error, fallback = "Something went wrong.") {
      const code = String(error?.code || "").toLowerCase();
      const message = String(error?.message || "").trim();
      const lowerMessage = message.toLowerCase();
      if (
        isConnectivityError(error) ||
        code.includes("unavailable") ||
        lowerMessage === "internal" ||
        lowerMessage.includes("failed to fetch") ||
        lowerMessage.includes("cors")
      ) {
        return "Cycl billing functions are temporarily unavailable. If you just deployed, wait 30 seconds and refresh.";
      }
      return message || fallback;
    }

    async function getPartnerProfileSnapshot(userId) {
      const partnerRef = doc(db, collections.partners, userId);

      try {
        return await getDoc(partnerRef);
      } catch (error) {
        if (!isConnectivityError(error)) throw error;

        try {
          return await getDocFromCache(partnerRef);
        } catch (cacheError) {
          throw error;
        }
      }
    }

    function getMapboxSupportedCountries() {
      return countries.map(([code]) => code.toLowerCase()).join(",");
    }

    function releaseRewardImagePreviewUrl() {
      if (selectedRewardImagePreviewUrl && selectedRewardImagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(selectedRewardImagePreviewUrl);
      }
      selectedRewardImagePreviewUrl = "";
    }

    function setText(id, value) {
      const el = $(id);
      if (el) el.textContent = value;
    }

    function showMessage(text, type = "info") {
      $("authMessage").textContent = text;
      $("authMessage").className = `message show ${type}`;
    }

    function showFileOriginWarning() {
      const warning = $("originWarning");
      if (warning) warning.style.display = isFileOrigin ? "block" : "none";
    }

    function resolveAuthBoot() {
      document.body.classList.remove("auth-booting");
    }

    function stopLiveData() {
      rewardSubscriptions.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") unsubscribe();
      });
      rewardSubscriptions = [];
      if (partnerSupport.unsubscribeMessages) {
        partnerSupport.unsubscribeMessages();
        partnerSupport.unsubscribeMessages = null;
      }
      partnerSupport.threads = [];
      partnerSupport.messages = [];
      partnerSupport.selectedThreadId = null;
    }

    /* === Partner Support chat (single thread per partner, auto subject) === */
    function isThreadUnreadForPartner(thread) {
      if (!thread || thread.lastMessageSender !== "admin") return false;
      const lastMsgMs = thread.lastMessageAt?.toMillis?.() || 0;
      const readMs = thread.partnerLastReadAt?.toMillis?.() || 0;
      return lastMsgMs > readMs;
    }

    function formatSupportTime(timestamp) {
      if (!timestamp) return "";
      const date = typeof timestamp.toDate === "function" ? timestamp.toDate() : new Date(timestamp);
      const diffMs = Date.now() - date.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      if (diffMin < 1) return "now";
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHr = Math.floor(diffMin / 60);
      if (diffHr < 24) return `${diffHr}h ago`;
      const diffDay = Math.floor(diffHr / 24);
      if (diffDay < 7) return `${diffDay}d ago`;
      return date.toLocaleDateString();
    }

    function deriveSupportSubject(body) {
      const cleaned = String(body || "").replace(/\s+/g, " ").trim();
      if (!cleaned) return "New conversation";
      return cleaned.length > 60 ? `${cleaned.slice(0, 57)}…` : cleaned;
    }

    function renderPartnerSupportMessages() {
      const body = $("supportChatBody");
      if (!body) return;

      if (!partnerSupport.selectedThreadId) {
        body.innerHTML = `
          <div class="support-msg support-msg--them">
            <div class="support-msg-bubble">Hi 👋 Send a message and our team will get back to you shortly.</div>
            <span class="support-msg-time">Cycl Support</span>
          </div>`;
        return;
      }

      if (!partnerSupport.messages.length) {
        body.innerHTML = '<div class="muted" style="padding: 8px; text-align:center;">Loading messages…</div>';
        return;
      }

      body.innerHTML = partnerSupport.messages.map((m) => {
        const isPartner = m.sender === "partner";
        const senderLabel = isPartner ? "You" : "Cycl Support";
        return `
          <div class="support-msg ${isPartner ? "support-msg--me" : "support-msg--them"}">
            <div class="support-msg-bubble">${escapeHtml(m.body || "")}</div>
            <span class="support-msg-time">${escapeHtml(senderLabel)} &middot; ${formatSupportTime(m.createdAt)}</span>
          </div>
        `;
      }).join("");
      requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
    }

    function renderPartnerSupportBadge() {
      const badge = $("supportNavBadge");
      if (!badge) return;
      const unread = partnerSupport.threads.filter(isThreadUnreadForPartner).length;
      if (unread > 0) {
        badge.textContent = unread > 9 ? "9+" : String(unread);
        badge.style.display = "inline-flex";
      } else {
        badge.style.display = "none";
      }
    }

    function syncSelectedSupportThread() {
      // Single-thread mode: pick the most recent thread for this partner (by
      // lastMessageAt; falls back to createdAt). The thread list is already
      // sorted desc when we update partnerSupport.threads in startLiveData.
      const next = partnerSupport.threads[0]?.id || null;
      if (next === partnerSupport.selectedThreadId) {
        renderPartnerSupportMessages();
        return;
      }
      partnerSupport.selectedThreadId = next;
      subscribeToPartnerSupportMessages(next);
    }

    function subscribeToPartnerSupportMessages(threadId) {
      if (partnerSupport.unsubscribeMessages) {
        partnerSupport.unsubscribeMessages();
        partnerSupport.unsubscribeMessages = null;
      }
      if (!threadId) {
        partnerSupport.messages = [];
        renderPartnerSupportMessages();
        return;
      }
      const messagesQuery = query(
        collection(db, `${PARTNER_SUPPORT_COLLECTION}/${threadId}/messages`),
        orderBy("createdAt", "asc"),
      );
      partnerSupport.unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        partnerSupport.messages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        renderPartnerSupportMessages();
      });
    }

    async function markPartnerSupportThreadRead(threadId) {
      if (!threadId || !currentPartner) return;
      try {
        await updateDoc(doc(db, PARTNER_SUPPORT_COLLECTION, threadId), {
          partnerLastReadAt: serverTimestamp(),
        });
      } catch (error) {
        console.warn("[support] could not mark thread read", error);
      }
    }

    async function sendPartnerSupportMessage() {
      if (!currentPartner) return;
      if (requireHttpOrigin("sending a support message")) return;
      const input = $("supportChatInput");
      const body = (input.value || "").trim();
      if (!body) return;

      const sendBtn = $("supportChatSend");
      sendBtn.disabled = true;

      try {
        let threadId = partnerSupport.selectedThreadId;

        if (!threadId) {
          const newThreadRef = await addDoc(collection(db, PARTNER_SUPPORT_COLLECTION), {
            partnerId: currentPartner.id,
            partnerCompanyName: currentPartner.companyName || "Partner",
            subject: deriveSupportSubject(body),
            lastMessageAt: serverTimestamp(),
            lastMessageBody: body,
            lastMessageSender: "partner",
            partnerLastReadAt: serverTimestamp(),
            adminLastReadAt: null,
            createdAt: serverTimestamp(),
          });
          threadId = newThreadRef.id;
          partnerSupport.selectedThreadId = threadId;
          subscribeToPartnerSupportMessages(threadId);
        } else {
          await updateDoc(doc(db, PARTNER_SUPPORT_COLLECTION, threadId), {
            lastMessageAt: serverTimestamp(),
            lastMessageBody: body,
            lastMessageSender: "partner",
            partnerLastReadAt: serverTimestamp(),
          });
        }

        await addDoc(collection(db, `${PARTNER_SUPPORT_COLLECTION}/${threadId}/messages`), {
          body: body,
          sender: "partner",
          senderName: currentPartner.companyName || "Partner",
          createdAt: serverTimestamp(),
        });

        input.value = "";
        input.style.height = "auto";
      } catch (error) {
        console.error("[support] send failed", error);
        window.alert(error.message || "Could not send your message.");
      } finally {
        sendBtn.disabled = false;
      }
    }

    function renderRewardImagePreview(url, meta = "Cycl will keep this image lighter for faster loading.") {
      const preview = $("rewardImagePreview");
      const previewImg = $("rewardImagePreviewImg");
      const previewMeta = $("rewardImagePreviewMeta");
      const clearButton = $("clearRewardImageButton");
      if (!preview || !previewImg || !previewMeta || !clearButton) return;

      if (!url) {
        preview.style.display = "none";
        previewImg.removeAttribute("src");
        clearButton.style.display = "none";
        return;
      }

      preview.style.display = "flex";
      previewImg.src = url;
      previewMeta.textContent = meta;
      clearButton.style.display = "inline-flex";
    }

    function syncRewardImagePreview() {
      if (selectedRewardImagePreviewUrl) {
        renderRewardImagePreview(selectedRewardImagePreviewUrl, "Local upload selected. Cycl will compress this before saving.");
        return;
      }

      const imageUrl = $("rewardImage")?.value?.trim() || "";
      renderRewardImagePreview(imageUrl, "External image URL preview.");
    }

    function clearSelectedRewardImage({ clearUrl = false } = {}) {
      releaseRewardImagePreviewUrl();
      selectedRewardImageFile = null;
      if ($("rewardImageFile")) $("rewardImageFile").value = "";
      if (clearUrl && $("rewardImage")) $("rewardImage").value = "";
      if ($("rewardImageStoragePath")) $("rewardImageStoragePath").value = "";
      syncRewardImagePreview();
    }

    function hideRewardLocationSuggestions() {
      const suggestions = $("rewardLocationSuggestions");
      if (!suggestions) return;
      rewardLocationSuggestions = [];
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
    }

    // ── Generic Mapbox address autocomplete ─────────────────────────────────

    function hideAddressSuggestions(suggestionsId) {
      const el = $(suggestionsId);
      if (!el) return;
      el.innerHTML = "";
      el.style.display = "none";
    }

    function extractAddressCity(feature) {
      const context = Array.isArray(feature?.context) ? feature.context : [];
      const placeCtx = context.find((c) => String(c?.id || "").startsWith("place."));
      if (placeCtx?.text) return placeCtx.text;
      const localityCtx = context.find((c) => String(c?.id || "").startsWith("locality."));
      if (localityCtx?.text) return localityCtx.text;
      return feature?.text || "";
    }

    function extractAddressCountryCode(feature) {
      const directCode = String(feature?.properties?.short_code || "").slice(-2);
      if (directCode) return directCode.toUpperCase();
      const contextItems = Array.isArray(feature?.context) ? feature.context : [];
      const countryCtx = contextItems.find((c) => String(c?.id || "").startsWith("country."));
      return String(countryCtx?.short_code || "").slice(-2).toUpperCase();
    }

    function renderAddressSuggestions(features, suggestionsId, onSelect) {
      const el = $(suggestionsId);
      if (!el || !features.length) {
        hideAddressSuggestions(suggestionsId);
        return;
      }
      el.innerHTML = features.map((feature, index) => `
        <button class="location-suggestion" type="button" data-addr-index="${index}">
          <strong>${escapeHtml(feature?.text || feature?.place_name || "")}</strong>
          <span>${escapeHtml(feature.place_name || "")}</span>
        </button>
      `).join("");
      el.style.display = "grid";
      el.querySelectorAll(".location-suggestion").forEach((btn) => {
        btn.addEventListener("mousedown", (e) => {
          e.preventDefault();
          const idx = parseInt(btn.dataset.addrIndex, 10);
          onSelect(features[idx]);
          hideAddressSuggestions(suggestionsId);
        });
      });
    }

    async function searchAddressLocations(searchTerm, suggestionsId, onSelect, abortControllerRef) {
      const trimmed = String(searchTerm || "").trim();
      if (!trimmed || trimmed.length < 2 || !MAPBOX_ACCESS_TOKEN) {
        hideAddressSuggestions(suggestionsId);
        return;
      }
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      try {
        const query = new URLSearchParams({
          access_token: MAPBOX_ACCESS_TOKEN,
          autocomplete: "true",
          limit: "6",
          types: "address,place",
          country: getMapboxSupportedCountries(),
        });
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmed)}.json?${query}`,
          { signal: abortControllerRef.current.signal },
        );
        if (!response.ok) throw new Error("Address search failed.");
        const payload = await response.json();
        const features = Array.isArray(payload?.features) ? payload.features : [];
        renderAddressSuggestions(features, suggestionsId, onSelect);
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.warn("Address search failed.", error);
        hideAddressSuggestions(suggestionsId);
      }
    }

    function applySignupAddressSuggestion(feature) {
      const input = $("signupAddress");
      const latInput = $("signupAddressLat");
      const lngInput = $("signupAddressLng");
      const cityInput = $("signupCity");
      if (!input) return;
      input.value = feature?.place_name || feature?.text || "";
      if (latInput) latInput.value = String(feature?.center?.[1] ?? "");
      if (lngInput) lngInput.value = String(feature?.center?.[0] ?? "");
      if (cityInput) cityInput.value = extractAddressCity(feature);
      hideAddressSuggestions("signupAddressSuggestions");
    }

    function applyProfileAddressSuggestion(feature) {
      const input = $("profileAddress");
      const latInput = $("profileAddressLat");
      const lngInput = $("profileAddressLng");
      const cityInput = $("profileCity");
      if (!input) return;
      input.value = feature?.place_name || feature?.text || "";
      if (latInput) latInput.value = String(feature?.center?.[1] ?? "");
      if (lngInput) lngInput.value = String(feature?.center?.[0] ?? "");
      if (cityInput) cityInput.value = extractAddressCity(feature);
      hideAddressSuggestions("profileAddressSuggestions");
    }

    // ── End generic address autocomplete ────────────────────────────────────

    function extractRewardLocationName(feature) {
      return feature?.text || feature?.place_name || "";
    }

    function extractRewardLocationCountryCode(feature) {
      const directCode = String(feature?.properties?.short_code || "").slice(-2);
      if (directCode) return directCode.toUpperCase();

      const contextItems = Array.isArray(feature?.context) ? feature.context : [];
      const countryContext = contextItems.find((item) => String(item?.id || "").startsWith("country."));
      return String(countryContext?.short_code || "").slice(-2).toUpperCase();
    }

    function applyRewardLocationSuggestion(feature) {
      const rewardLocationInput = $("rewardLocation");
      const latInput = $("rewardLocationLat");
      const lngInput = $("rewardLocationLng");
      const countryInput = $("rewardCountry");

      if (!rewardLocationInput || !latInput || !lngInput || !countryInput) return;

      rewardLocationInput.value = extractRewardLocationName(feature);
      latInput.value = String(feature?.center?.[1] ?? "");
      lngInput.value = String(feature?.center?.[0] ?? "");

      const countryCode = extractRewardLocationCountryCode(feature);
      if (countryCode) countryInput.value = countryCode;

      hideRewardLocationSuggestions();
    }

    function renderRewardLocationSuggestions(features) {
      const suggestions = $("rewardLocationSuggestions");
      if (!suggestions || !features.length) {
        hideRewardLocationSuggestions();
        return;
      }

      rewardLocationSuggestions = features;
      suggestions.innerHTML = features.map((feature, index) => `
        <button class="location-suggestion" type="button" data-location-index="${index}">
          <strong>${escapeHtml(extractRewardLocationName(feature))}</strong>
          <span>${escapeHtml(feature.place_name || "")}</span>
        </button>
      `).join("");
      suggestions.style.display = "grid";
    }

    async function searchRewardLocations(searchTerm) {
      const trimmedTerm = String(searchTerm || "").trim();
      if (!trimmedTerm || trimmedTerm.length < 2 || !MAPBOX_ACCESS_TOKEN) {
        hideRewardLocationSuggestions();
        return;
      }

      if (rewardLocationAbortController) {
        rewardLocationAbortController.abort();
      }

      rewardLocationAbortController = new AbortController();

      try {
        const query = new URLSearchParams({
          access_token: MAPBOX_ACCESS_TOKEN,
          autocomplete: "true",
          limit: "6",
          types: "place,locality,postcode",
          country: getMapboxSupportedCountries(),
        });
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmedTerm)}.json?${query}`,
          { signal: rewardLocationAbortController.signal },
        );

        if (!response.ok) throw new Error("Location search failed.");

        const payload = await response.json();
        renderRewardLocationSuggestions(Array.isArray(payload?.features) ? payload.features : []);
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.warn("Reward location lookup failed.", error);
        hideRewardLocationSuggestions();
      }
    }

    function syncRewardAvailabilityFields() {
      const availabilityMode = $("rewardAvailabilityMode")?.value || "unlimited";
      const availabilityCountField = $("rewardAvailabilityCountField");
      const availabilityCountInput = $("rewardAvailabilityCount");
      const isLimited = availabilityMode === "limited";

      if (availabilityCountField) {
        availabilityCountField.style.display = isLimited ? "grid" : "none";
      }

      if (availabilityCountInput) {
        availabilityCountInput.disabled = !isLimited;
        if (!isLimited) availabilityCountInput.value = "";
      }
    }

    function syncRewardChannelFields() {
      const isOnline = Boolean($("rewardIsOnline")?.checked);
      const locationInput = $("rewardLocation");
      const physicalAddressField = $("rewardPhysicalAddressField");
      const physicalAddressInput = $("rewardPhysicalAddress");

      if (locationInput) {
        locationInput.required = !isOnline;
        locationInput.disabled = isOnline;
        locationInput.placeholder = isOnline ? "Online reward" : "Start typing a city";
      }

      if (physicalAddressField) {
        physicalAddressField.style.display = isOnline ? "none" : "grid";
      }

      if (physicalAddressInput) {
        physicalAddressInput.disabled = isOnline;
        if (isOnline) {
          physicalAddressInput.value = "";
        }
      }

      if (isOnline) {
        hideRewardLocationSuggestions();
        $("rewardLocation").value = "";
        $("rewardLocationLat").value = "";
        $("rewardLocationLng").value = "";
      }
    }

    function startLiveData() {
      if (!currentPartner) return;
      stopLiveData();

      const rewardsQuery = query(
        collection(db, collections.rewards),
        where("partnerId", "==", currentPartner.id),
      );
      const requestsQuery = query(
        collection(db, collections.collectionRequests),
        where("partnerId", "==", currentPartner.id),
      );

      rewardSubscriptions.push(onSnapshot(rewardsQuery, (rewardSnapshot) => {
        rewardRecords = rewardSnapshot.docs.map((rewardDoc) => ({ id: rewardDoc.id, ...rewardDoc.data() }));
        backfillMissingBoostMetricBaselines();
        renderDashboard();
        if (partnerBillingStatus.loaded) enforceRewardLimitForCurrentPlan();
      }));

      rewardSubscriptions.push(onSnapshot(collection(db, collections.stations), (stationSnapshot) => {
        stationRecords = stationSnapshot.docs
          .map((stationDoc) => ({ id: stationDoc.id, ...stationDoc.data() }))
          .filter(stationBelongsToPartner);
        renderDashboard();
      }));

      rewardSubscriptions.push(onSnapshot(requestsQuery, (requestSnapshot) => {
        collectionRequestRecords = requestSnapshot.docs.map((requestDoc) => ({ id: requestDoc.id, ...requestDoc.data() }));
        renderDashboard();
      }));

      const supportThreadsQuery = query(
        collection(db, PARTNER_SUPPORT_COLLECTION),
        where("partnerId", "==", currentPartner.id),
      );
      rewardSubscriptions.push(onSnapshot(supportThreadsQuery, (snapshot) => {
        partnerSupport.threads = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.lastMessageAt?.toMillis?.() || 0) - (a.lastMessageAt?.toMillis?.() || 0));
        syncSelectedSupportThread();
        renderPartnerSupportBadge();
      }));
    }

    function loadImageElement(file) {
      return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(image);
        };
        image.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("Could not read the selected image."));
        };
        image.src = objectUrl;
      });
    }

    async function compressRewardImageFile(file) {
      const image = await loadImageElement(file);
      const maxDimension = 1600;
      const longestSide = Math.max(image.width, image.height) || 1;
      const scale = Math.min(1, maxDimension / longestSide);
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");

      if (!context) throw new Error("Could not prepare image compression.");

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const qualities = [0.86, 0.78, 0.7, 0.62];
      for (const quality of qualities) {
        const blob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (nextBlob) => {
              if (nextBlob) resolve(nextBlob);
              else reject(new Error("Could not compress image."));
            },
            "image/jpeg",
            quality,
          );
        });

        if (blob.size <= 700 * 1024 || quality === qualities[qualities.length - 1]) {
          return blob;
        }
      }

      throw new Error("Could not compress image.");
    }

    async function uploadRewardImageFile(file) {
      if (!currentPartner) throw new Error("Partner not loaded.");
      const compressedBlob = await compressRewardImageFile(file);
      const fileBaseName = String(file.name || "reward-image")
        .replace(/\.[^.]+$/, "")
        .replace(/[^a-z0-9-_]+/gi, "-")
        .replace(/-+/g, "-")
        .toLowerCase()
        .replace(/^-|-$/g, "") || "reward-image";
      const imagePath = `partner-rewards/${currentPartner.id}/${Date.now()}-${fileBaseName}.jpg`;
      const imageRef = storageRef(storage, imagePath);
      await uploadBytes(imageRef, compressedBlob, {
        contentType: "image/jpeg",
        cacheControl: "public,max-age=31536000",
      });
      const imageUrl = await getDownloadURL(imageRef);
      return {
        imageUrl,
        imagePath,
        sizeKb: Math.round(compressedBlob.size / 1024),
      };
    }

    function requireHttpOrigin(actionLabel) {
      if (!isFileOrigin) return false;
      const message = `Open this portal through ${localPortalUrl} before ${actionLabel}.`;
      const authMessage = $("authMessage");
      if (authMessage) {
        authMessage.textContent = message;
        authMessage.className = "message show error";
      }
      showFileOriginWarning();
      window.alert(message);
      return true;
    }

    function showAuthTab(tab) {
      document.querySelectorAll("[data-auth-tab]").forEach((button) => {
        button.classList.toggle("active", button.dataset.authTab === tab);
      });
      $("loginForm").style.display = tab === "login" ? "grid" : "none";
      $("signupForm").style.display = tab === "signup" ? "grid" : "none";
      $("authMessage").className = "message";
    }

    function populateCountries() {
      const options = countries.map(([code, name]) => `<option value="${code}">${name}</option>`).join("");
      $("signupCountry").innerHTML = options;
      $("rewardCountry").innerHTML = options;
      const profileCountry = $("profileCountry");
      if (profileCountry) profileCountry.innerHTML = options;
    }

    function populateBusinessCategorySelect(selectEl, currentId) {
      if (!selectEl) return;
      selectEl.innerHTML = BUSINESS_CATEGORIES.map((cat) =>
        `<option value="${cat.id}">${escapeHtml(cat.name)}</option>`
      ).join("");
      if (currentId && CATEGORY_BY_ID[currentId]) selectEl.value = currentId;
    }

    function populateBusinessSubcategorySelect(selectEl, categoryId, currentSub) {
      if (!selectEl) return;
      const cat = CATEGORY_BY_ID[categoryId] || BUSINESS_CATEGORIES[0];
      selectEl.innerHTML = cat.subs.map((sub) =>
        `<option value="${escapeHtml(sub)}">${escapeHtml(sub)}</option>`
      ).join("");
      if (currentSub && cat.subs.includes(currentSub)) selectEl.value = currentSub;
    }

    function wireBusinessCategoryCascade(catSelectId, subSelectId) {
      const catEl = $(catSelectId);
      const subEl = $(subSelectId);
      if (!catEl || !subEl) return;
      catEl.addEventListener("change", () => {
        populateBusinessSubcategorySelect(subEl, catEl.value);
      });
    }

    function getCountryName(code) {
      return countries.find((item) => item[0] === code)?.[1] || code || "";
    }

    function hasBoostHistory(reward) {
      return Boolean(
        reward?.boostStartedAtMs ||
        reward?.boostStartedAt ||
        reward?.boostPlan ||
        Number(reward?.boostPriceKr || 0) > 0 ||
        reward?.stripeBoostInvoiceId ||
        reward?.stripeBoostInvoiceItemId
      );
    }

    function getEffectivePlacement(reward) {
      const placement = reward.placement || "organic";
      const boostExpiresMs = Number(reward.boostExpiresAtMs || 0);
      if (hasBoostHistory(reward) && boostExpiresMs > Date.now()) {
        return "featured_boost";
      }
      if (placement === "featured_boost" || placement === "popular_sponsored") {
        return boostExpiresMs > Date.now() ? placement : "organic";
      }
      return placement;
    }

    function isSponsoredReward(reward) {
      const effective = getEffectivePlacement(reward);
      return effective === "popular_sponsored" || effective === "featured_boost";
    }

    function getRewardPlacementMeta(reward) {
      const placement = getEffectivePlacement(reward);
      const meta = {
        organic: {
          id: "organic",
          cls: "organic",
          pillCls: "",
          label: "Organic",
          title: "Boost this reward",
          copy: "Sponsor it to move it out of the regular list and into higher-visibility marketplace slots.",
          action: "Sponsor reward",
          nextPlacement: "popular_sponsored",
        },
        popular_sponsored: {
          id: "popular_sponsored",
          cls: "sponsored",
          pillCls: " is-sponsored",
          label: "Sponsored",
          title: "Sponsored is live",
          copy: "This reward is promoted. Feature it when you want the strongest push for a campaign or weekend rush.",
          action: "Make featured",
          nextPlacement: "featured_boost",
        },
        featured_boost: {
          id: "featured_boost",
          cls: "featured",
          pillCls: " is-featured",
          label: "Featured",
          title: "Top placement live",
          copy: "This reward is already using the strongest marketplace placement.",
          action: "",
          nextPlacement: "",
        },
      };
      return meta[placement] || meta.organic;
    }

    function getRewardMetric(reward, key) {
      if (key === "clicks") return Number(reward.clicks || reward.viewCount || reward.views || reward.taps || 0);
      if (key === "activations") return Number(reward.activations || reward.activationCount || reward.redemptions || reward.validations || 0);
      if (key === "validations") return Number(reward.validations || reward.validatedCount || reward.redeemedCount || 0);
      return 0;
    }

    function getBoostMetricBaseline(reward, metricKey, currentValue) {
      const fieldByMetric = {
        activations: "boostActivationBaseline",
        clicks: "boostClickBaseline",
        validations: "boostValidationBaseline",
      };
      const field = fieldByMetric[metricKey];
      const explicit = field ? Number(reward?.[field]) : NaN;
      if (Number.isFinite(explicit) && explicit >= 0) {
        return Math.min(currentValue, explicit);
      }
      return isSponsoredReward(reward) ? currentValue : 0;
    }

    function getBoostedRewardMetric(reward, metricKey) {
      const currentValue = getRewardMetric(reward, metricKey);
      if (!hasBoostHistory(reward)) return 0;
      const baseline = getBoostMetricBaseline(reward, metricKey, currentValue);
      return Math.max(0, currentValue - baseline);
    }

    function backfillMissingBoostMetricBaselines() {
      if (!currentPartner) return;
      rewardRecords.forEach((reward) => {
        if (!reward?.id || boostBaselineBackfillIds.has(reward.id)) return;
        if (!isSponsoredReward(reward)) return;
        if (!reward.boostStartedAtMs && !reward.boostStartedAt) return;
        const hasActivationBaseline = Number.isFinite(Number(reward.boostActivationBaseline));
        if (hasActivationBaseline) return;
        boostBaselineBackfillIds.add(reward.id);
        const baselines = {
          boostActivationBaseline: getRewardMetric(reward, "activations"),
          boostClickBaseline: getRewardMetric(reward, "clicks"),
          boostValidationBaseline: getRewardMetric(reward, "validations"),
          updatedAt: serverTimestamp(),
        };
        Object.assign(reward, baselines);
        updateDoc(doc(db, collections.rewards, reward.id), baselines).catch((error) => {
          boostBaselineBackfillIds.delete(reward.id);
          console.warn("Could not backfill boost metric baseline:", error);
        });
      });
    }

    function getPlacementFee(reward) {
      return pricing[reward.placement] || 0;
    }

    function isFreePlan() {
      const plan = getCurrentBillingPlan();
      return !plan || plan.id === "free";
    }

    function getCurrentRewardLimit() {
      const plan = getCurrentBillingPlan();
      const limit = Number(plan?.rewardLimit);
      return Number.isFinite(limit) && limit > 0 ? limit : PLAN_BY_ID.free.rewardLimit;
    }

    function getActiveRewards() {
      return rewardRecords.filter((reward) => (reward.status || "active") === "active");
    }

    async function enforceRewardLimitForCurrentPlan() {
      if (!currentPartner) return;
      const limit = getCurrentRewardLimit();
      const active = getActiveRewards();
      if (active.length <= limit) return;
      const sorted = [...active].sort((a, b) => {
        const aMs = a.updatedAt?.toMillis?.() ?? a.createdAt?.toMillis?.() ?? 0;
        const bMs = b.updatedAt?.toMillis?.() ?? b.createdAt?.toMillis?.() ?? 0;
        return bMs - aMs;
      });
      const excess = sorted.slice(0, active.length - limit);
      try {
        await Promise.all(excess.map((reward) => updateDoc(doc(db, collections.rewards, reward.id), {
          status: "paused",
          autoPausedByPlanLimit: true,
          updatedAt: serverTimestamp(),
        })));
      } catch (error) {
        console.warn("Could not auto-pause rewards beyond plan limit", error);
      }
    }

    function getOutstandingBoostRewards() {
      return rewardRecords.filter((reward) => {
        const price = Number(reward.boostPriceKr || 0);
        if (price <= 0) return false;
        const expiresMs = Number(reward.boostExpiresAtMs || 0);
        const stillActive = expiresMs > Date.now();
        const billedVia = reward.boostBilledVia || "one_off";
        const paid = reward.boostPaid === true;
        const failed = reward.boostBillingStatus === "payment_failed";
        return billedVia === "one_off" && !paid && (expiresMs > 0 || failed);
      });
    }

    function calculateBilling() {
      const liveRewards = rewardRecords.filter((reward) => (reward.status || "active") === "active");
      const placement = liveRewards.reduce((sum, reward) => sum + getPlacementFee(reward), 0);
      const monthStartMs = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
      let boostSpend = 0;
      let boostSpendDue = 0;
      let boostSpendPending = 0;
      let boostSpendQueued = 0;
      let activeBoostCount = 0;
      rewardRecords.forEach((reward) => {
        const price = Number(reward.boostPriceKr || 0);
        if (price <= 0) return;
        const startedMs = reward.boostStartedAt?.toMillis?.()
          ?? reward.boostStartedAt?.seconds * 1000
          ?? 0;
        const expiresMs = Number(reward.boostExpiresAtMs || 0);
        const startedThisMonth = startedMs >= monthStartMs;
        const stillActive = expiresMs > Date.now();
        const billedVia = reward.boostBilledVia || "one_off";
        const paid = reward.boostPaid === true;
        const outstandingOneOff = billedVia === "one_off" && !stillActive && !paid;
        if (!startedThisMonth && !stillActive && !outstandingOneOff) return;
        boostSpend += price;
        if (stillActive) activeBoostCount += 1;
        if (billedVia === "subscription_monthly" && !paid) {
          boostSpendQueued += price;
        } else if (billedVia === "one_off" && !paid && !stillActive) {
          boostSpendDue += price;
        } else if (billedVia === "one_off" && !paid && stillActive) {
          boostSpendPending += price;
        }
      });
      const activations = liveRewards.reduce((sum, reward) => sum + getRewardMetric(reward, "activations"), 0);
      const validations = liveRewards.reduce((sum, reward) => sum + getRewardMetric(reward, "validations"), 0);
      const performance = activations * pricing.activation + validations * pricing.validation;
      return {
        access: pricing.access,
        placement,
        boostSpend,
        boostSpendDue,
        boostSpendPending,
        boostSpendQueued,
        activeBoostCount,
        performance,
        total: pricing.access + placement + boostSpend + performance,
        activations,
        validations,
      };
    }

    function getHighestStationTier() {
      return stationRecords.reduce((highest, station) => {
        const tier = getStationTier(station);
        return tier.monthlyFee > highest.monthlyFee ? tier : highest;
      }, TIER_BY_ID.standard);
    }

    function hasLiveStripeSubscription(subscription) {
      return ["active", "trialing", "past_due", "unpaid"].includes(String(subscription?.status || ""));
    }

    function getCurrentBillingPlan() {
      const stripePlan = hasLiveStripeSubscription(partnerBillingStatus.subscription)
        ? String(partnerBillingStatus.subscription.planId || "").toLowerCase()
        : "";
      if (PLAN_BY_ID[stripePlan]) return PLAN_BY_ID[stripePlan];
      const explicitPlan = String(currentPartner?.subscriptionPlan || currentPartner?.billingPlan || currentPartner?.partnerPlan || "").toLowerCase();
      if (PLAN_BY_ID[explicitPlan]) return PLAN_BY_ID[explicitPlan];
      const tierId = normalizeTierId(currentPartner?.subscriptionTier || currentPartner?.tier || getHighestStationTier().id);
      return PLAN_BY_TIER_ID[tierId] || PLAN_BY_ID.free;
    }

    function getBillingStatusCopy(subscription) {
      if (!partnerBillingStatus.loaded && partnerBillingStatus.loading) return "Checking Stripe billing status…";
      if (partnerBillingStatus.error) return partnerBillingStatus.error;
      if (!subscription) return "No active Stripe subscription yet. Choose a paid plan to add a card and start billing.";
      const plan = PLAN_BY_ID[subscription.planId] || { name: subscription.planLabel || "Paid plan", price: Math.round(Number(subscription.amount || 0) / 100) };
      const status = String(subscription.status || "active").replace(/_/g, " ");
      const periodEndDate = subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString("da-DK") : "";
      if (subscription.cancelAtPeriodEnd) {
        return `${plan.name} subscription · cancels on ${periodEndDate || "period end"} · drops to Free tier after`;
      }
      const renewal = periodEndDate ? ` · renews ${periodEndDate}` : "";
      return `${plan.name} subscription · ${status}${renewal}`;
    }

    function getInvoiceSearchText(invoice) {
      const lineText = Array.isArray(invoice?.lines)
        ? invoice.lines.map((line) => line.description || "").join(" ")
        : "";
      return [
        invoice?.number,
        invoice?.description,
        invoice?.statusLabel,
        invoice?.currency,
        formatInvoiceAmount(invoice),
        formatInvoiceDate(invoice?.dateMs),
        lineText,
      ].join(" ").toLowerCase();
    }

    function renderInvoiceHistory() {
      const listEl = $("invoiceHistoryList");
      const countEl = $("invoiceHistoryCount");
      const searchEl = $("invoiceHistorySearch");
      if (!listEl) return;

      const invoices = Array.isArray(partnerInvoiceHistory.invoices)
        ? partnerInvoiceHistory.invoices
        : [];
      const queryText = String(partnerInvoiceHistory.query || "").trim().toLowerCase();
      const visibleInvoices = queryText
        ? invoices.filter((invoice) => getInvoiceSearchText(invoice).includes(queryText))
        : invoices;

      if (countEl) {
        countEl.textContent = partnerInvoiceHistory.loading
          ? "Loading Stripe"
          : `${visibleInvoices.length} invoice${visibleInvoices.length === 1 ? "" : "s"}`;
      }
      if (searchEl && searchEl.value !== partnerInvoiceHistory.query) {
        searchEl.value = partnerInvoiceHistory.query;
      }

      if (partnerInvoiceHistory.loading && !partnerInvoiceHistory.loaded) {
        listEl.innerHTML = `<div class="invoice-history-empty">Loading Stripe invoices…</div>`;
        return;
      }

      if (partnerInvoiceHistory.error) {
        listEl.innerHTML = `<div class="invoice-history-empty billing-error">${escapeHtml(partnerInvoiceHistory.error)}</div>`;
        return;
      }

      if (!partnerInvoiceHistory.hasCustomer) {
        listEl.innerHTML = `<div class="invoice-history-empty">No Stripe customer yet. Start a plan or add a card to create invoice history.</div>`;
        return;
      }

      if (!visibleInvoices.length) {
        listEl.innerHTML = `<div class="invoice-history-empty">${queryText ? "No invoices match that search." : "No Stripe invoices yet."}</div>`;
        return;
      }

      listEl.innerHTML = visibleInvoices.map((invoice) => {
        const statusTone = getInvoiceStatusTone(invoice);
        const rowBody = `
          <span class="invoice-date">${escapeHtml(formatInvoiceDate(invoice.dateMs))}</span>
          <span class="invoice-amount">${escapeHtml(formatInvoiceAmount(invoice))}</span>
          <span class="invoice-status invoice-status--${statusTone}">${escapeHtml(invoice.statusLabel || invoice.status || "Unknown")}</span>
          <span class="invoice-description" title="${escapeHtml(invoice.description || "Stripe invoice")}">${escapeHtml(invoice.description || "Stripe invoice")}</span>
          <span class="invoice-open-link">${invoice.hostedInvoiceUrl ? "Open" : ""}</span>
        `;
        return invoice.hostedInvoiceUrl
          ? `<a class="invoice-row" href="${escapeHtml(invoice.hostedInvoiceUrl)}" target="_blank" rel="noopener">${rowBody}</a>`
          : `<article class="invoice-row">${rowBody}</article>`;
      }).join("");
    }

    function openInvoiceHistoryModal() {
      const modal = $("invoiceHistoryModal");
      if (!modal) return;
      partnerInvoiceHistory = { ...partnerInvoiceHistory, query: "" };
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      renderInvoiceHistory();
      window.requestAnimationFrame(() => $("invoiceHistorySearch")?.focus());
      loadPartnerInvoiceHistory({ force: true });
    }

    function closeInvoiceHistoryModal() {
      const modal = $("invoiceHistoryModal");
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    async function loadPartnerInvoiceHistory({ force = false } = {}) {
      if (!currentPartner || partnerInvoiceHistory.loading) return;
      if (partnerInvoiceHistory.loaded && !force) {
        renderInvoiceHistory();
        return;
      }

      partnerInvoiceHistory = {
        ...partnerInvoiceHistory,
        loading: true,
        error: "",
      };
      renderInvoiceHistory();

      try {
        const getInvoices = httpsCallable(cloudFunctions, "getPartnerPortalInvoiceHistory");
        const result = await getInvoices({ limit: 50 });
        partnerInvoiceHistory = {
          loaded: true,
          loading: false,
          error: "",
          invoices: Array.isArray(result?.data?.invoices) ? result.data.invoices : [],
          query: partnerInvoiceHistory.query,
          hasCustomer: Boolean(result?.data?.hasCustomer),
        };
      } catch (error) {
        partnerInvoiceHistory = {
          ...partnerInvoiceHistory,
          loaded: true,
          loading: false,
          error: getReadableCallableError(error, "Could not load Stripe invoice history."),
        };
      }
      renderInvoiceHistory();
    }

    function renderBillingAccount() {
      const statusEl = $("billingStatusText");
      const listEl = $("billingCardList");
      if (!statusEl || !listEl) return;
      const subscription = partnerBillingStatus.subscription;
      syncBillingCardButton();
      syncCancelSubscriptionButton();
      statusEl.textContent = getBillingStatusCopy(subscription);
      statusEl.classList.toggle("billing-error", Boolean(partnerBillingStatus.error));

      if (partnerBillingStatus.loading && !partnerBillingStatus.loaded) {
        listEl.innerHTML = `<div class="empty-state">Checking cards…</div>`;
        return;
      }

      if (partnerBillingStatus.error) {
        listEl.innerHTML = `<div class="empty-state billing-error">Could not load saved cards. Refresh billing after the Stripe status issue is fixed.</div>`;
        return;
      }

      const cards = partnerBillingStatus.cards || [];
      if (!cards.length) {
        listEl.innerHTML = `<div class="empty-state">No saved card yet. Add one now from Billing before boosting or upgrading.</div>`;
        return;
      }

      listEl.innerHTML = cards.map((card) => {
        const brand = String(card.brand || "card").toUpperCase();
        const exp = card.expMonth && card.expYear ? `${String(card.expMonth).padStart(2, "0")}/${String(card.expYear).slice(-2)}` : "expiry unknown";
        return `
          <article class="payment-card">
            <div class="payment-card-main">
              <div class="payment-card-brand">${escapeHtml(brand.slice(0, 4))}</div>
              <div>
                <strong>${escapeHtml(brand)} •••• ${escapeHtml(card.last4 || "----")}</strong>
                <span>Expires ${escapeHtml(exp)}</span>
              </div>
            </div>
            ${card.isDefault ? '<span class="payment-card-default">Default</span>' : ""}
          </article>
        `;
      }).join("");
    }

    function applyBillingStatusToPartner(status) {
      const subscription = status?.subscription;
      if (!subscription || !hasLiveStripeSubscription(subscription)) return;
      Object.assign(currentPartner, {
        subscriptionPlan: subscription.planId,
        subscriptionPlanLabel: subscription.planLabel,
        subscriptionTier: subscription.stationTier,
        subscriptionTierLabel: subscription.stationTierLabel,
        subscriptionStatus: subscription.status,
        stripeSubscriptionId: subscription.id,
      });
    }

    async function refreshPartnerBillingStatus({ silent = false } = {}) {
      if (!currentPartner || partnerBillingStatus.loading) return;
      if (requireHttpOrigin("checking billing status")) return;
      partnerBillingStatus = { ...partnerBillingStatus, loading: true, error: "" };
      if (!silent) renderBillingAccount();
      try {
        const getStatus = httpsCallable(cloudFunctions, "getPartnerPortalBillingStatus");
        const result = await getStatus({});
        partnerBillingStatus = {
          loaded: true,
          loading: false,
          error: "",
          subscription: result?.data?.subscription || null,
          cards: Array.isArray(result?.data?.cards) ? result.data.cards : [],
          hasCustomer: Boolean(result?.data?.hasCustomer),
        };
        applyBillingStatusToPartner(partnerBillingStatus);
        renderBillingPlans();
        renderBillingAccount();
        await enforceRewardLimitForCurrentPlan();
      } catch (error) {
        partnerBillingStatus = {
          ...partnerBillingStatus,
          loaded: true,
          loading: false,
          error: getReadableCallableError(error, "Could not read Stripe billing status."),
        };
        renderBillingPlans();
        renderBillingAccount();
      }
    }

    function renderBillingBoostPanel(billing, currentPlan) {
      const panel = $("billingBoostPanel");
      if (!panel) return;
      const due = billing.boostSpendDue || 0;
      const pending = billing.boostSpendPending || 0;
      const queued = billing.boostSpendQueued || 0;
      const total = billing.boostSpend || 0;
      const active = billing.activeBoostCount || 0;
      const payable = currentPlan?.id === "free" ? due + pending : due;
      panel.classList.toggle("has-due", payable > 0);
      panel.classList.toggle("queued", due === 0 && queued > 0);
      setText("billingBoostActive", active);
      setText("billingBoostMonth", money(total));
      setText("billingBoostDue", money(payable));
      const dueCell = $("billingBoostDueCell");
      if (dueCell) dueCell.classList.toggle("is-due", payable > 0);
      const copy = due > 0
        ? `You have ${money(due)} in expired boosts to settle before starting another. Upgrade to a monthly plan to roll boosts into your subscription instead.`
        : pending > 0 && currentPlan?.id === "free"
          ? `${money(pending)} of active boosts can be paid now, or will be charged after they end.`
        : queued > 0 && currentPlan?.id !== "free"
          ? `${money(queued)} of boosts queued for your next ${currentPlan.name} invoice.`
          : total > 0
            ? `${money(total)} of boosts active this month.`
            : currentPlan?.id === "free"
              ? "Free plan: each boost is paid one-off after it expires."
              : `Boosts are billed automatically with your ${currentPlan.name} plan.`;
      setText("billingBoostCopy", copy);
      const payBtn = $("payOutstandingBoostsButton");
      if (payBtn) payBtn.style.display = payable > 0 ? "inline-flex" : "none";
    }

    function renderBillingPlans(billing = calculateBilling()) {
      const grid = $("billingPlanGrid");
      if (!grid) return;
      const currentPlan = getCurrentBillingPlan();
      const currentTier = TIER_BY_ID[currentPlan.tierId] || getHighestStationTier();
      setText("currentPlanName", currentPlan.name);
      setText("currentPlanPrice", money(currentPlan.price));
      setText("currentPlanCopy", currentPlan.copy);
      setText("currentStationTier", `${currentTier.name} · ${currentTier.multiplier}x`);
      const totalDue = currentPlan.price + (billing.boostSpend || 0);
      setText("billTotal", money(totalDue));
      setText("billTotalCopy", currentPlan.id === "free"
        ? `Includes ${money(billing.boostSpend || 0)} boost spend.`
        : `${money(currentPlan.price)} plan + ${money(billing.boostSpend || 0)} boost spend.`);
      renderBillingBoostPanel(billing, currentPlan);
      grid.innerHTML = BILLING_PLANS.map((plan) => {
        const isCurrent = plan.id === currentPlan.id;
        const buttonLabel = isCurrent ? "Current" : (plan.price === 0 ? "Included" : `Upgrade to ${plan.name}`);
        const features = plan.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
        return `
          <article class="plan-card${isCurrent ? " is-current" : ""}${plan.recommended ? " is-recommended" : ""}">
            <div class="plan-card-head">
              <h4>${escapeHtml(plan.name)}</h4>
              ${isCurrent ? '<span class="plan-pill">Current</span>' : (plan.recommended ? '<span class="plan-pill">Recommended</span>' : "")}
            </div>
            <div class="plan-price"><span>${plan.price}</span><small>kr / month</small></div>
            <p class="plan-copy">${escapeHtml(plan.copy)}</p>
            <ul class="plan-features">${features}</ul>
            <button class="btn${isCurrent || plan.price === 0 ? " secondary" : ""}" type="button" data-plan-id="${plan.id}" ${isCurrent || plan.price === 0 ? "disabled" : ""}>${buttonLabel}</button>
          </article>
        `;
      }).join("");
      renderBillingAccount();
    }

    function stationBelongsToPartner(station) {
      const id = currentPartner?.id;
      const company = String(currentPartner?.companyName || "").toLowerCase();
      const partnerIds = Array.isArray(station.partnerIds) ? station.partnerIds.map(String) : [];
      const companyFields = [
        station.companyName,
        station.partnerCompanyName,
        station.assignedPartnerCompany,
        station.hostBusinessName,
        station.operatedFor,
      ].map((value) => String(value || "").toLowerCase());

      return [
        station.partnerId,
        station.assignedPartnerId,
        station.businessPartnerId,
        station.hostPartnerId,
        station.locationPartnerId,
      ].some((value) => value && String(value) === id)
        || partnerIds.includes(id)
        || (company && companyFields.includes(company));
    }

    function getPartnerOnboardingStorageKey() {
      return currentPartner
        ? `cyclPartnerOnboardingDismissed:${currentPartner.id}`
        : "cyclPartnerOnboardingDismissed";
    }

    function showPartnerOnboardingPrompt() {
      const float = $("partnerOnboardingFloat");
      if (!float || !currentPartner) return;
      const isDismissed = localStorage.getItem(getPartnerOnboardingStorageKey()) === "true";
      float.style.display = isDismissed ? "none" : "block";
    }

    function dismissPartnerOnboardingPrompt() {
      if (currentPartner) {
        localStorage.setItem(getPartnerOnboardingStorageKey(), "true");
      }
      const float = $("partnerOnboardingFloat");
      if (float) float.style.display = "none";
    }

    const PARTNER_TOURS = {
      home: {
        type: "coachmark",
        scopeSelector: "#section-home",
        steps: [
          {
            selector: ".kpi-strip--bench",
            title: "Live performance",
            body: "Marketplace clicks, validated visits, conversion, foot-traffic, and sponsored placements across all your rewards.",
          },
          {
            selector: ".impact-grid",
            title: "Environmental impact",
            body: "Plastic, CO₂, water, and energy saved — driven by activations from your rewards.",
          },
          {
            selector: "#homeStationList",
            title: "Top assigned stations",
            body: "Quick view of your busiest stations with live capacity. Click through to manage them in Stations.",
          },
        ],
      },
      rewards: {
        type: "coachmark",
        scopeSelector: "#section-rewards",
        steps: [
          {
            selector: "#openRewardModal",
            title: "Add a reward",
            body: "Publish a new offer. Set title, image, Cycl Coin cost, redemption locations, and codes.",
          },
          {
            selector: "#rewardList",
            title: "Your rewards",
            body: "Each card has Edit, Pause/Activate, and Archive actions. Boost a reward to push it to Sponsored Popular.",
          },
        ],
      },
      stations: {
        type: "coachmark",
        scopeSelector: "#stationList .station-card",
        emptyFallback: {
          title: "Stations at your businesses",
          body: "These are the Cycl stations placed at your business locations that drive foot traffic. When stations are assigned, each card will have four actions — <b>Edit</b> opens the Edit station overlay, <b>Upgrade</b> changes the tier, <b>Collect bottles</b> requests a pickup, and <b>Empty station</b> resets the bag count after collection.",
        },
        steps: [
          {
            selector: "[data-station-action='edit']",
            title: "Edit",
            body: "Opens the Edit station overlay — update the station's name, address, opening hours, and capacity.",
          },
          {
            selector: "[data-station-action='upgrade']",
            title: "Upgrade",
            body: "Change the station's tier. Higher tiers give a stronger multiplier and better placement in the marketplace.",
          },
          {
            selector: "[data-station-action='collect']",
            title: "Collect bottles",
            body: "Request a pickup when the bag is full. Cycl staff are notified to come empty the station.",
          },
          {
            selector: "[data-station-action='empty']",
            title: "Empty station",
            body: "Mark the bag as emptied after collection. Resets the bag count to 0 and clears any open collection request.",
          },
        ],
      },
      analytics: {
        type: "coachmark",
        scopeSelector: "#section-analytics",
        steps: [
          {
            selector: ".catchment-card",
            title: "Catchment map",
            body: "Where your audience comes from. Pin size = volume, red = accelerating. Toggle the radius to see how far your real audience travels.",
          },
          {
            selector: ".peer-board-card",
            title: "Peer leaderboard",
            body: "Your business ranked against peers of a similar type and size in your area. Spot who's pulling ahead.",
          },
          {
            selector: ".alerts-card",
            title: "Performance heat map",
            body: "Each cell scored 0–100 against peers per metric. Bright = top of group; scan your row to find weak metrics.",
          },
          {
            selector: ".loyalty-card",
            title: "Customer loyalty",
            body: "Cohort breakdown of one-time vs. returning customers. A growing 5+ visit cohort means strong habitual loyalty.",
          },
        ],
      },
    };

    let currentTourKey = null;
    const TOURS_TEST_MODE = new URLSearchParams(location.search).get("tours") === "test";

    function partnerTourStorageKey(key) {
      const id = currentPartner ? currentPartner.id : "anon";
      return `cyclPartnerTourDismissed:${key}:${id}`;
    }

    function partnerTourSkipAllKey() {
      const id = currentPartner ? currentPartner.id : "anon";
      return `cyclPartnerTourSkipAll:${id}`;
    }

    function showPartnerTour(key) {
      if (!currentPartner) return;
      const content = PARTNER_TOURS[key];
      if (!content) return;
      if (!TOURS_TEST_MODE) {
        if (localStorage.getItem(partnerTourSkipAllKey()) === "true") return;
        if (localStorage.getItem(partnerTourStorageKey(key)) === "true") return;
      }

      currentTourKey = key;

      const scope = content.scopeSelector ? document.querySelector(content.scopeSelector) : document;
      if (!scope && content.emptyFallback) {
        startCoachmarks([{ ...content.emptyFallback, selector: null }], document);
        return;
      }
      if (!scope) return;
      startCoachmarks(content.steps || [], scope);
    }

    function dismissPartnerTour({ skipAll = false } = {}) {
      hideCoachmark();
      if (currentPartner && !TOURS_TEST_MODE) {
        if (currentTourKey) {
          localStorage.setItem(partnerTourStorageKey(currentTourKey), "true");
        }
        if (skipAll) {
          localStorage.setItem(partnerTourSkipAllKey(), "true");
        }
      }
      currentTourKey = null;
    }

    /* === Coachmark walkthrough === */
    let coachState = { steps: [], index: 0, scope: null, target: null };

    function startCoachmarks(steps, scope) {
      coachState = { steps, index: 0, scope, target: null };
      $("coachBackdrop").classList.add("show");
      $("coachCard").classList.add("show");
      window.addEventListener("resize", repositionCoachCard);
      window.addEventListener("scroll", repositionCoachCard, true);
      renderCoachStep();
    }

    function isElementVisible(el) {
      return !!(el && el.offsetParent !== null);
    }

    function renderCoachStep() {
      clearCoachSpotlight();
      const step = coachState.steps[coachState.index];
      if (!step) { hideCoachmark(); return; }

      let target = null;
      if (step.selector) {
        target = coachState.scope.querySelector(step.selector);
        if (!target || !isElementVisible(target)) {
          coachState.index += 1;
          renderCoachStep();
          return;
        }
      }
      coachState.target = target;

      if (target) {
        target.classList.add("tour-spotlight");
        target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }

      $("coachProgress").textContent = coachState.steps.length > 1
        ? `Step ${coachState.index + 1} of ${coachState.steps.length}`
        : "";
      $("coachTitle").textContent = step.title;
      $("coachBody").innerHTML = step.body;
      $("coachNext").textContent = coachState.index === coachState.steps.length - 1 ? "Done" : "Next";

      requestAnimationFrame(repositionCoachCard);
    }

    function repositionCoachCard() {
      const target = coachState.target;
      const card = $("coachCard");
      if (!card || !card.classList.contains("show")) return;
      const cardRect = card.getBoundingClientRect();
      const margin = 14;

      if (!target) {
        const top = Math.max(margin, (window.innerHeight - cardRect.height) / 2);
        const left = Math.max(margin, (window.innerWidth - cardRect.width) / 2);
        card.style.top = `${top}px`;
        card.style.left = `${left}px`;
        return;
      }

      const rect = target.getBoundingClientRect();
      let top = rect.bottom + margin;
      if (top + cardRect.height + margin > window.innerHeight) {
        top = Math.max(margin, rect.top - cardRect.height - margin);
      }
      let left = rect.left + rect.width / 2 - cardRect.width / 2;
      left = Math.max(margin, Math.min(left, window.innerWidth - cardRect.width - margin));
      card.style.top = `${top}px`;
      card.style.left = `${left}px`;
    }

    function advanceCoachStep() {
      coachState.index += 1;
      if (coachState.index >= coachState.steps.length) {
        hideCoachmark();
        if (currentPartner && !TOURS_TEST_MODE && currentTourKey) {
          localStorage.setItem(partnerTourStorageKey(currentTourKey), "true");
        }
        currentTourKey = null;
        return;
      }
      renderCoachStep();
    }

    function hideCoachmark() {
      clearCoachSpotlight();
      $("coachBackdrop").classList.remove("show");
      $("coachCard").classList.remove("show");
      coachState = { steps: [], index: 0, scope: null, target: null };
      window.removeEventListener("resize", repositionCoachCard);
      window.removeEventListener("scroll", repositionCoachCard, true);
    }

    function clearCoachSpotlight() {
      document.querySelectorAll(".tour-spotlight").forEach((el) => el.classList.remove("tour-spotlight"));
    }

    window.resetPartnerTours = function () {
      const id = currentPartner ? currentPartner.id : "anon";
      Object.keys(PARTNER_TOURS).forEach((k) => {
        localStorage.removeItem(`cyclPartnerTourDismissed:${k}:${id}`);
      });
      localStorage.removeItem(`cyclPartnerTourSkipAll:${id}`);
      console.log("[tours] cleared dismissal flags for partner", id);
    };

    window.showTour = function (key) {
      console.log("[tours] manually showing", key, "currentPartner:", currentPartner?.id);
      showPartnerTour(key);
    };

    async function loadPartner(user) {
      try {
        const snap = await getPartnerProfileSnapshot(user.uid);
        if (!snap.exists()) {
          await signOut(auth);
          showMessage("No partner profile found for this account.", "error");
          return;
        }

        currentPartner = { id: user.uid, ...snap.data() };
      } catch (error) {
        stopLiveData();
        currentPartner = null;
        $("authLayout").style.display = "grid";
        $("appShell").style.display = "none";
        $("pendingCard").style.display = "none";
        $("logoutButton").style.display = "inline-block";
        showMessage(getReadableFirebaseError(error, "Could not load the partner profile."), "error");
        resolveAuthBoot();
        return;
      }

      $("authMessage").className = "message";
      $("authLayout").style.display = "none";
      $("pendingCard").style.display = "none";
      $("appShell").style.display = "grid";
      $("logoutButton").style.display = "inline-block";
      setText("partnerCompanyName", currentPartner.companyName || "Partner");
      setText("topbarPartnerName", currentPartner.companyName || "Partner");
      const sub = currentPartner.businessSubcategory || currentPartner.businessType || "Business";
      const cat = currentPartner.businessCategoryName ||
        CATEGORY_BY_ID[currentPartner.businessCategory]?.name || "";
      const metaSuffix = cat && sub && cat !== sub ? `${cat} · ${sub}` : (sub || cat || "Business");
      setText("partnerMeta", `${getCountryName(currentPartner.countryCode)} · ${metaSuffix}`);
      renderProfileForm();
      startLiveData();
      refreshPartnerBillingStatus({ silent: true });
      showPartnerOnboardingPrompt();
      const initialSection = document.querySelector(".section.active")?.id?.replace(/^section-/, "");
      if (initialSection && PARTNER_TOURS[initialSection]) {
        showPartnerTour(initialSection);
      }
      resolveAuthBoot();
    }

    function renderProfileForm() {
      if (!currentPartner) return;
      const setVal = (id, v) => { const el = $(id); if (el) el.value = v ?? ""; };
      setVal("profileCompany", currentPartner.companyName);
      setVal("profileEmail", currentPartner.email);
      setVal("profileFirstName", currentPartner.contactFirstName);
      setVal("profileLastName", currentPartner.contactLastName);
      setVal("profilePhone", currentPartner.phone);
      setVal("profileWebsite", currentPartner.website);
      setVal("profileCity", currentPartner.city);
      setVal("profileAddress", currentPartner.address);
      setVal("profileAddressLat", currentPartner.lat ?? "");
      setVal("profileAddressLng", currentPartner.lng ?? "");
      setVal("profileAbout", currentPartner.about);
      const profileCountry = $("profileCountry");
      if (profileCountry) profileCountry.value = currentPartner.countryCode || "DK";
      const catId = currentPartner.businessCategory ||
        (BUSINESS_CATEGORIES.find((c) => c.name === currentPartner.businessType)?.id) ||
        "other";
      populateBusinessCategorySelect($("profileBusinessCategory"), catId);
      populateBusinessSubcategorySelect(
        $("profileBusinessSubcategory"),
        catId,
        currentPartner.businessSubcategory || currentPartner.businessType,
      );
      const metaPill = $("profileMetaPill");
      if (metaPill) metaPill.textContent = (currentPartner.status || "active").toUpperCase();
    }

    async function refreshData() {
      if (!currentPartner) return;

      const rewardsQuery = query(
        collection(db, collections.rewards),
        where("partnerId", "==", currentPartner.id),
      );
      const requestsQuery = query(
        collection(db, collections.collectionRequests),
        where("partnerId", "==", currentPartner.id),
      );
      const [rewardSnapshot, stationSnapshot, requestSnapshot] = await Promise.all([
        getDocs(rewardsQuery),
        getDocs(collection(db, collections.stations)),
        getDocs(requestsQuery),
      ]);

      rewardRecords = rewardSnapshot.docs.map((rewardDoc) => ({ id: rewardDoc.id, ...rewardDoc.data() }));
      stationRecords = stationSnapshot.docs
        .map((stationDoc) => ({ id: stationDoc.id, ...stationDoc.data() }))
        .filter(stationBelongsToPartner);
      collectionRequestRecords = requestSnapshot.docs.map((requestDoc) => ({ id: requestDoc.id, ...requestDoc.data() }));

      renderDashboard();
      if (analyticsHasRendered) renderAnalytics();
    }

    function renderDashboard() {
      const liveRewards = rewardRecords.filter((reward) => (reward.status || "active") === "active");
      const sponsoredRewards = liveRewards.filter(isSponsoredReward);
      const clicks = rewardRecords.reduce((sum, reward) => sum + getRewardMetric(reward, "clicks"), 0);
      const activations = rewardRecords.reduce((sum, reward) => sum + getRewardMetric(reward, "activations"), 0);
      const validations = rewardRecords.reduce((sum, reward) => sum + getRewardMetric(reward, "validations"), 0);
      const conversion = clicks ? Math.round((activations / clicks) * 100) : 0;
      const fullStations = stationRecords.filter((station) => Number(station.capacity || 0) > 0 && Number(station.currentCap || 0) >= Number(station.capacity || 0)).length;
      const capacity = stationRecords.reduce((sum, station) => sum + Number(station.capacity || 0), 0);
      const currentCap = stationRecords.reduce((sum, station) => sum + Number(station.currentCap || 0), 0);
      const avgFill = capacity ? Math.round((currentCap / capacity) * 100) : 0;
      const codedRewards = rewardRecords.filter((reward) => reward.codeMode === "bulk_codes" || reward.hasCodes || reward.code).length;
      const billing = calculateBilling();

      document.querySelector('[data-count-id="navHomeCount"]')?.setAttribute("data-count", rewardRecords.length + stationRecords.length);
      document.querySelector('[data-count-id="navRewardCount"]')?.setAttribute("data-count", rewardRecords.length);
      document.querySelector('[data-count-id="navStationCount"]')?.setAttribute("data-count", stationRecords.length);
      setText("homeLiveRewards", liveRewards.length);
      setText("homeActivations", activations);

      const homeBoostCta = $("homeBoostCta");
      if (homeBoostCta) {
        const boostActive = liveRewards.filter(isBoostActive);
        const notBoosted = liveRewards.length - boostActive.length;
        homeBoostCta.hidden = liveRewards.length === 0;
        setText("homeBoostOrganicCount", notBoosted);
        setText("homeBoostActiveCount", boostActive.length);
      }
      setText("homeStations", stationRecords.length);
      setText("homeStationsCountInline", stationRecords.length);
      setText("homeBilling", money(getCurrentBillingPlan().price + (billing.boostSpend || 0)));
      setText("homeClicks", clicks);
      setText("homeValidations", validations);
      setText("homeConversion", `${conversion}%`);
      setText("homeFullStations", fullStations);
      setText("homeCapacity", `${avgFill}%`);
      setText("homeRequests", collectionRequestRecords.length);
      // Foot traffic: live items in current bag cycle across your stations
      const liveFootTraffic = stationRecords.reduce((sum, s) => sum + Number(s.currentCap || 0), 0);
      setText("homeFootTraffic", liveFootTraffic);
      // Tone the KPI side-bars based on simple thresholds
      const toggleKpiTone = (id, isPos, isNeg) => {
        const el = $(id);
        if (!el) return;
        el.classList.toggle("is-pos", !!isPos);
        el.classList.toggle("is-neg", !!isNeg);
      };
      toggleKpiTone("homeKpiClicks", clicks > 0, false);
      toggleKpiTone("homeKpiValidations", validations > 0, false);
      toggleKpiTone("homeKpiConversion", conversion >= 30, conversion > 0 && conversion < 10);
      toggleKpiTone("homeKpiFootTraffic", liveFootTraffic > 0, false);
      toggleKpiTone("homeKpiSponsored", sponsoredRewards.length > 0, false);

      // Fetch true environmental impact (ESG) from station metrics subcollections
      (async () => {
        try {
          let actualBottles = 0;
          const now = new Date();
          const ymKey = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

          await Promise.all(
            stationRecords.map(async (station) => {
              try {
                const docRef = doc(db, "stations", station.id, "metrics", ymKey);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  actualBottles += Number(docSnap.data().bottlesCollected || 0);
                }
              } catch (e) {
                console.error("Error reading metrics:", e);
              }
            })
          );

          const co2 = (actualBottles * 0.082).toFixed(1);
          const water = (actualBottles * 0.5).toFixed(0);
          const energy = (actualBottles * 0.15).toFixed(1);
          const plastic = (actualBottles * 0.025).toFixed(2);

          const htmlPlastic = `${plastic}<small>kg</small>`;
          const htmlCo2 = `${co2}<small>kg</small>`;
          const htmlWater = `${water}<small>L</small>`;
          const htmlEnergy = `${energy}<small>kWh</small>`;

          if ($("homePlastic")) $("homePlastic").innerHTML = htmlPlastic;
          if ($("homeCo2")) $("homeCo2").innerHTML = htmlCo2;
          if ($("homeWater")) $("homeWater").innerHTML = htmlWater;
          if ($("homeEnergy")) $("homeEnergy").innerHTML = htmlEnergy;

          if ($("stationPlastic")) $("stationPlastic").innerHTML = htmlPlastic;
          if ($("stationCo2")) $("stationCo2").innerHTML = htmlCo2;
          if ($("stationWater")) $("stationWater").innerHTML = htmlWater;
          if ($("stationEnergy")) $("stationEnergy").innerHTML = htmlEnergy;
        } catch (error) {
          console.error("Error fetching true ESG metrics:", error);
        }
      })();

      setText("homeSponsored", sponsoredRewards.length);
      setText("rewardCount", rewardRecords.length);
      setText("rewardClicks", clicks);
      setText("rewardActivations", activations);
      setText("rewardSponsoredCount", sponsoredRewards.length);
      setText("rewardCodeCount", codedRewards);
      setText("rewardLiveCount", liveRewards.length);
      setText("billAccess", money(billing.access));
      setText("billPlacement", money(billing.placement));
      setText("billPerformance", money(billing.performance));
      setText("billTotal", money(billing.total));
      renderBillingPlans(billing);

      const validationRate = activations ? Math.round((validations / activations) * 100) : 0;
      setText("rewardValidations", validations);
      setText("rewardValidationRate", `${validationRate}%`);

      renderTopRewards();
      renderRewardList();
      renderStationLists();
      renderRewardAnalytics({ liveRewards, sponsoredRewards, clicks, activations, validations, conversion, billing });
    }

    function renderRewardAnalytics({ clicks, activations, validations, conversion, billing }) {
      const hFunnel = document.getElementById("homeRewardFunnel");
      if (hFunnel) {
        const clickToAct = clicks ? Math.round((activations / clicks) * 100) : 0;
        const actToVal = activations ? Math.round((validations / activations) * 100) : 0;
        hFunnel.innerHTML = `
          <div class="funnel-step step-1">
            <span class="funnel-step-label">Clicks</span>
            <span class="funnel-step-value">${clicks}</span>
            <span class="funnel-step-meta">impressions</span>
          </div>
          <span class="funnel-chevron" aria-hidden="true">▸</span>
          <div class="funnel-step step-2">
            <span class="funnel-step-label">Activations</span>
            <span class="funnel-step-value">${activations}</span>
            <span class="funnel-step-meta"><strong>${clickToAct}%</strong> of clicks</span>
          </div>
          <span class="funnel-chevron" aria-hidden="true">▸</span>
          <div class="funnel-step step-3">
            <span class="funnel-step-label">Validations</span>
            <span class="funnel-step-value">${validations}</span>
            <span class="funnel-step-meta"><strong>${actToVal}%</strong> of activations</span>
          </div>
        `;
      }

      let organicAct = 0;
      let sponsoredAct = 0;
      rewardRecords.forEach((reward) => {
        const a = getRewardMetric(reward, "activations");
        const boosted = getBoostedRewardMetric(reward, "activations");
        sponsoredAct += boosted;
        organicAct += Math.max(0, a - boosted);
      });
      const totalAct = organicAct + sponsoredAct;
      const organicPct = totalAct ? Math.round((organicAct / totalAct) * 100) : 50;
      const sponsoredPct = totalAct ? 100 - organicPct : 0;
      const donut = $("placementDonut");
      if (donut) donut.style.setProperty("--organic", totalAct ? organicPct : 50);
      setText("donutTotal", totalAct);
      setText("legendOrganicCount", organicAct);
      setText("legendOrganicPct", totalAct ? `${organicPct}% of activations` : "no data yet");
      setText("legendSponsoredCount", sponsoredAct);
      setText("legendSponsoredPct", totalAct ? `${sponsoredPct}% of activations` : "no data yet");

      // Render Standard Velocity for Home
      const homeVelocityEl = document.getElementById("homeVelocityChart");
      if (homeVelocityEl && currentPartner) {
        const myFootTraffic = stationRecords ? stationRecords.reduce((sum, st) => sum + (Number(st.lifetimeVolume) || 0), 0) || 120 : 120;
        const seedVal = currentPartner.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
        const rng = (i) => {
          const x = Math.sin((seedVal + i) * 127.1 + i * 311.7) * 43758.5453;
          return Math.abs(x - Math.floor(x));
        };
        const base = Math.max(Math.round(myFootTraffic / 8), 1);
        const weeks = Array.from({ length: 12 }, (_, i) => {
          const growth = 0.55 + (i / 11) * 0.85;
          return {
            you: Math.max(0, Math.round(base * growth * (0.55 + rng(i * 2) * 0.95))),
            week: `W${String(i + 1).padStart(2, "0")}`
          };
        });
        const velMax = Math.max(1, ...weeks.map(w => w.you));
        const chartH = 110;
        homeVelocityEl.innerHTML = weeks.map(w => {
          const yH = Math.max(2, Math.round((w.you / velMax) * chartH));
          return `
            <div class="velocity-bar-pair">
              <div class="velocity-stack" style="height:${chartH}px">
                <div class="velocity-fill you" style="height:${yH}px" title="You: ${w.you}"></div>
              </div>
              <span class="velocity-label">${w.week}</span>
            </div>
          `;
        }).join("");
      }

      const cpaActivation = pricing.activation;
      const cpaValidated = activations
        ? (activations * pricing.activation + validations * pricing.validation) / Math.max(validations, 1)
        : pricing.activation + pricing.validation;
      setText("cpaActivation", money(cpaActivation));
      setText("cpaValidated", money(cpaValidated));
      setText("costBoostSpend", money(billing.boostSpend || 0));
      const boostMeta = billing.activeBoostCount
        ? `${billing.activeBoostCount} active boost${billing.activeBoostCount === 1 ? "" : "s"}`
        : (billing.boostSpend ? "boosts purchased this month" : "no boosts active");
      setText("costBoostMeta", boostMeta);
      setText("costPerformance", money(billing.performance));
      setText("costMonthTotal", money(billing.total));
      const now = new Date();
      const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });
      setText("costPeriodLabel", monthLabel);
    }

    /* === Competitive intelligence (Analytics tab) ============================ */
    let peerData = { partners: [], rewards: [], stations: [], loadedAt: 0 };
    let analyticsFilters = { cat: "industry", geo: "country" };
    let analyticsCatchmentKm = 5;
    let analyticsLoadingPromise = null;
    let analyticsHasRendered = false;

    async function ensurePeerData(force = false) {
      const TTL_MS = 60_000;
      if (!force && peerData.loadedAt && Date.now() - peerData.loadedAt < TTL_MS) return peerData;
      if (analyticsLoadingPromise) return analyticsLoadingPromise;
      analyticsLoadingPromise = (async () => {
        try {
          const [pSnap, rSnap, sSnap] = await Promise.all([
            getDocs(collection(db, collections.partners)),
            getDocs(collection(db, collections.rewards)),
            getDocs(collection(db, collections.stations)),
          ]);
          peerData = {
            partners: pSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
            rewards: rSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
            stations: sSnap.docs.map((d) => ({ id: d.id, ...d.data() })),
            loadedAt: Date.now(),
          };
          return peerData;
        } catch (error) {
          console.error("Could not load peer data", error);
          return peerData;
        } finally {
          analyticsLoadingPromise = null;
        }
      })();
      return analyticsLoadingPromise;
    }

    function getStationPartnerIds(station) {
      const ids = new Set();
      [station.partnerId, station.assignedPartnerId, station.businessPartnerId,
      station.hostPartnerId, station.locationPartnerId].forEach((v) => {
        if (v) ids.add(String(v));
      });
      if (Array.isArray(station.partnerIds)) station.partnerIds.forEach((v) => ids.add(String(v)));
      return ids;
    }

    function haversineKm(lat1, lng1, lat2, lng2) {
      const R = 6371;
      const toRad = (d) => (d * Math.PI) / 180;
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function getPeerCohort() {
      if (!currentPartner) return { partners: [], rewards: [], stations: [] };
      const myCat = currentPartner.businessCategory ||
        BUSINESS_CATEGORIES.find((c) => c.name === currentPartner.businessType)?.id;
      const myCountry = currentPartner.countryCode;
      const myLat = Number(currentPartner.lat);
      const myLng = Number(currentPartner.lng);
      const hasMyCoords = isFinite(myLat) && isFinite(myLng);
      let partners = peerData.partners.filter((p) => p.id !== currentPartner.id);
      if (analyticsFilters.cat === "industry" && myCat) {
        partners = partners.filter((p) =>
          p.businessCategory === myCat ||
          (BUSINESS_CATEGORIES.find((c) => c.name === p.businessType)?.id === myCat),
        );
      }
      if (analyticsFilters.geo === "country" && myCountry) {
        partners = partners.filter((p) => p.countryCode === myCountry);
      }
      // When we have real coordinates, further filter by Haversine distance
      if (hasMyCoords && analyticsCatchmentKm > 0) {
        partners = partners.filter((p) => {
          const pLat = Number(p.lat);
          const pLng = Number(p.lng);
          if (!isFinite(pLat) || !isFinite(pLng)) return true; // keep peers without coords (fallback)
          return haversineKm(myLat, myLng, pLat, pLng) <= analyticsCatchmentKm;
        });
      }
      const ids = new Set(partners.map((p) => p.id));
      const rewards = peerData.rewards.filter((r) => ids.has(r.partnerId));
      const stations = peerData.stations.filter((s) => {
        const stationIds = getStationPartnerIds(s);
        return [...stationIds].some((id) => ids.has(id));
      });
      return { partners, rewards, stations };
    }

    function computeRewardStats(rewards) {
      if (!rewards.length) {
        return { count: 0, activationsPerReward: 0, conversion: 0, validation: 0, medianCost: 0, sponsoredShare: 0, codesShare: 0 };
      }
      const totalClicks = rewards.reduce((s, r) => s + getRewardMetric(r, "clicks"), 0);
      const totalActivations = rewards.reduce((s, r) => s + getRewardMetric(r, "activations"), 0);
      const totalValidations = rewards.reduce((s, r) => s + getRewardMetric(r, "validations"), 0);
      const sponsoredCount = rewards.filter(isSponsoredReward).length;
      const codedCount = rewards.filter((r) => r.codeMode === "bulk_codes" || r.hasCodes || r.code).length;
      const costs = rewards.map((r) => Number(r.cost || 0)).filter((n) => n > 0).sort((a, b) => a - b);
      const median = costs.length ? costs[Math.floor(costs.length / 2)] : 0;
      return {
        count: rewards.length,
        activationsPerReward: totalActivations / rewards.length,
        conversion: totalClicks ? totalActivations / totalClicks : 0,
        validation: totalActivations ? totalValidations / totalActivations : 0,
        medianCost: median,
        sponsoredShare: sponsoredCount / rewards.length,
        codesShare: codedCount / rewards.length,
      };
    }

    function computeTierMix(stations) {
      const counts = { standard: 0, premium: 0, golden: 0, ultra: 0 };
      stations.forEach((s) => {
        const t = s.tier && Object.prototype.hasOwnProperty.call(counts, s.tier) ? s.tier : "standard";
        counts[t]++;
      });
      const total = stations.length || 1;
      return {
        counts,
        shares: {
          standard: counts.standard / total,
          premium: counts.premium / total,
          golden: counts.golden / total,
          ultra: counts.ultra / total,
        },
        upgradedShare: (counts.premium + counts.golden + counts.ultra) / total,
        total: stations.length,
      };
    }

    function computePlacementMix(rewards) {
      const counts = { organic: 0, popular_sponsored: 0, featured_boost: 0 };
      rewards.forEach((r) => {
        const p = r.placement && Object.prototype.hasOwnProperty.call(counts, r.placement) ? r.placement : "organic";
        counts[p]++;
      });
      const total = rewards.length || 1;
      return {
        counts,
        shares: {
          organic: counts.organic / total,
          popular_sponsored: counts.popular_sponsored / total,
          featured_boost: counts.featured_boost / total,
        },
        sponsoredShare: (counts.popular_sponsored + counts.featured_boost) / total,
        total: rewards.length,
      };
    }

    const THEME_STOPWORDS = new Set([
      "the", "and", "for", "with", "your", "you", "from", "this", "that",
      "any", "all", "off", "out", "get", "buy", "one", "two", "new", "now",
      "into", "have", "has", "are", "but", "not", "our", "use", "use",
      "free", "rabat", "med", "din", "dit", "kun", "alle", "tag", "ved",
    ]);

    function computeRewardThemes(rewards) {
      const scoreMap = new Map();
      rewards.forEach((r) => {
        const score = getRewardMetric(r, "activations") + 0.4 * getRewardMetric(r, "clicks");
        if (score <= 0) return;
        const tokens = String(r.title || "").toLowerCase().match(/[a-zA-ZÀ-ÿ]{3,}/g) || [];
        tokens.forEach((t) => {
          if (THEME_STOPWORDS.has(t)) return;
          scoreMap.set(t, (scoreMap.get(t) || 0) + score);
        });
      });
      return [...scoreMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    }

    /* === Repeat customers (recycle_captures) =============================== */
    let captureData = { own: [], peerSample: [], loadedAt: 0 };
    let captureLoadingPromise = null;
    const CAPTURE_TTL_MS = 60_000;
    const CAPTURE_WINDOW_DAYS = 90;

    async function loadCapturesForStations(stationIds) {
      if (!stationIds.length) return [];
      const chunks = [];
      for (let i = 0; i < stationIds.length; i += 10) chunks.push(stationIds.slice(i, i + 10));
      const all = [];
      await Promise.all(chunks.map(async (chunk) => {
        try {
          const q = query(
            collection(db, "recycle_captures"),
            where("stationNumber", "in", chunk),
            orderBy("timestamp", "desc"),
            limit(2000),
          );
          const snap = await getDocs(q);
          snap.docs.forEach((d) => all.push({ id: d.id, ...d.data() }));
        } catch (error) {
          // Fall back to query without orderBy/limit if composite index missing.
          try {
            const q2 = query(
              collection(db, "recycle_captures"),
              where("stationNumber", "in", chunk),
            );
            const snap = await getDocs(q2);
            snap.docs.forEach((d) => all.push({ id: d.id, ...d.data() }));
          } catch (e2) {
            console.warn("recycle_captures query failed:", e2);
          }
        }
      }));
      return all;
    }

    async function ensureCaptureData(force = false) {
      if (!force && captureData.loadedAt && Date.now() - captureData.loadedAt < CAPTURE_TTL_MS) return captureData;
      if (captureLoadingPromise) return captureLoadingPromise;
      captureLoadingPromise = (async () => {
        try {
          const myStationIds = stationRecords.map((s) => s.id);
          // Sample peer stations from current cohort (top 6 partners by reward count, max 30 stations)
          const cohort = peerData.partners.length ? getPeerCohort() : { partners: [], stations: [], rewards: [] };
          const partnerRewardCounts = new Map();
          cohort.rewards.forEach((r) => partnerRewardCounts.set(r.partnerId, (partnerRewardCounts.get(r.partnerId) || 0) + 1));
          const topPeerIds = new Set([...partnerRewardCounts.entries()]
            .sort((a, b) => b[1] - a[1]).slice(0, 6).map(([id]) => id));
          const peerStationIds = cohort.stations
            .filter((s) => [...getStationPartnerIds(s)].some((id) => topPeerIds.has(id)))
            .slice(0, 30)
            .map((s) => s.id);
          const [own, peerSample] = await Promise.all([
            loadCapturesForStations(myStationIds),
            loadCapturesForStations(peerStationIds),
          ]);
          captureData = { own, peerSample, loadedAt: Date.now() };
          return captureData;
        } finally {
          captureLoadingPromise = null;
        }
      })();
      return captureLoadingPromise;
    }

    function withinCaptureWindow(capture) {
      const ts = capture.timestamp?.toMillis?.() ?? capture.timestamp?.seconds * 1000 ?? 0;
      if (!ts) return true;
      return Date.now() - ts <= CAPTURE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    }

    function computeRepeatStats(captures, stationIds) {
      const stationSet = new Set(stationIds.map(String));
      const recycleEvents = captures.filter((c) =>
        c.userId && c.stepName === "recycled" &&
        stationSet.has(String(c.stationNumber)) &&
        withinCaptureWindow(c),
      );
      const userCounts = new Map();
      recycleEvents.forEach((c) => {
        userCounts.set(c.userId, (userCounts.get(c.userId) || 0) + 1);
      });
      const counts = [...userCounts.values()];
      const distinctUsers = counts.length;
      const repeatUsers = counts.filter((n) => n >= 2).length;
      const totalRecycles = counts.reduce((s, n) => s + n, 0);
      const cohorts = {
        one: counts.filter((n) => n === 1).length,
        twoFour: counts.filter((n) => n >= 2 && n <= 4).length,
        fivePlus: counts.filter((n) => n >= 5).length,
      };
      const topUsers = [...userCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([userId, count]) => ({ userId, count }));
      return {
        distinctUsers,
        repeatUsers,
        repeatRate: distinctUsers ? repeatUsers / distinctUsers : 0,
        avgPerUser: distinctUsers ? totalRecycles / distinctUsers : 0,
        totalRecycles,
        cohorts,
        topUsers,
      };
    }

    function computePeerRepeatRateMedian(peerCaptures, peerCohort) {
      const stationToPartner = new Map();
      peerCohort.stations.forEach((s) => {
        const owners = [...getStationPartnerIds(s)];
        if (owners.length) stationToPartner.set(String(s.id), owners[0]);
      });
      const partnerUserCounts = new Map();
      peerCaptures.forEach((c) => {
        if (c.stepName !== "recycled" || !c.userId) return;
        if (!withinCaptureWindow(c)) return;
        const partnerId = stationToPartner.get(String(c.stationNumber));
        if (!partnerId) return;
        if (!partnerUserCounts.has(partnerId)) partnerUserCounts.set(partnerId, new Map());
        const m = partnerUserCounts.get(partnerId);
        m.set(c.userId, (m.get(c.userId) || 0) + 1);
      });
      const rates = [];
      partnerUserCounts.forEach((m) => {
        const counts = [...m.values()];
        if (counts.length < 3) return; // need minimum sample to count
        const repeat = counts.filter((n) => n >= 2).length;
        rates.push(repeat / counts.length);
      });
      if (!rates.length) return null;
      rates.sort((a, b) => a - b);
      return rates[Math.floor(rates.length / 2)];
    }

    function shortUserId(userId) {
      if (!userId) return "User —";
      const tail = String(userId).slice(-5).toUpperCase();
      return `User · ${tail}`;
    }

    function computePeerLeaderboard(cohort) {
      const partnersById = Object.fromEntries(cohort.partners.map((p) => [p.id, p]));
      const map = new Map();
      cohort.rewards.forEach((r) => {
        const pid = r.partnerId;
        if (!partnersById[pid]) return;
        const entry = map.get(pid) || {
          partner: partnersById[pid], validations: 0, activations: 0, clicks: 0, rewardCount: 0,
        };
        entry.validations += getRewardMetric(r, "validations");
        entry.activations += getRewardMetric(r, "activations");
        entry.clicks += getRewardMetric(r, "clicks");
        entry.rewardCount += 1;
        map.set(pid, entry);
      });
      return [...map.values()].sort(
        (a, b) => b.validations - a.validations || b.activations - a.activations,
      );
    }

    function anonymousPeerLabel(partner) {
      const cat =
        partner.businessSubcategory ||
        partner.businessCategoryName ||
        CATEGORY_BY_ID[partner.businessCategory]?.name ||
        partner.businessType ||
        "Business";
      const where = partner.city || partner.country || "—";
      return `${cat} in ${where}`;
    }

    function buildRecommendations({ myStats, peerStats, peerTier, peerPlacement, catchmentSignal }) {
      const recs = [];
      if (peerStats.count === 0) {
        recs.push({
          tone: "tip",
          icon: "i",
          title: "Not enough peer data yet",
          copy: "Switch to All categories or Worldwide to see broader benchmarks. As more partners publish rewards, your industry-specific view sharpens.",
        });
        return recs;
      }
      if (myStats.count === 0) {
        recs.push({
          tone: "opportunity",
          icon: "+",
          title: "Publish your first reward to start ranking",
          copy: "Peers in your category publish " + peerStats.count + " active reward" + (peerStats.count === 1 ? "" : "s") + " between them. A coffee, lunch, or student offer is the fastest way to start showing up in the marketplace.",
        });
        return recs;
      }
      if (myStats.activationsPerReward < peerStats.activationsPerReward * 0.7) {
        recs.push({
          tone: "urgent",
          icon: "↓",
          title: "You're below peer activations per reward",
          copy: "Peers earn " + peerStats.activationsPerReward.toFixed(1) + " activations per reward on average; you're at " + myStats.activationsPerReward.toFixed(1) + ". Try a sharper headline (the offer goes first, your brand second) or a one-week sponsored test.",
        });
      }
      if (peerPlacement.sponsoredShare > 0.25 && myStats.sponsoredShare < 0.1) {
        recs.push({
          tone: "tip",
          icon: "★",
          title: "Most peers run sponsored placement",
          copy: Math.round(peerPlacement.sponsoredShare * 100) + "% of rewards in this cohort are sponsored. Boosting one reward to Sponsored Popular tends to lift activations 2–4x for the month.",
        });
      }
      if (myStats.codesShare < 0.2) {
        recs.push({
          tone: "tip",
          icon: "#",
          title: "Add coupon codes to track validated visits",
          copy: "Right now we count clicks and activations but not actual customer visits. Paste a CSV of codes into a reward to unlock validated billing and peer-leaderboard ranking.",
        });
      }
      const myUpgraded = stationRecords.some((s) => s.tier && s.tier !== "standard");
      if (!myUpgraded && peerTier.upgradedShare > 0.2 && peerTier.total > 2) {
        recs.push({
          tone: "opportunity",
          icon: "▲",
          title: "Upgrading your station could pull more visits",
          copy: Math.round(peerTier.upgradedShare * 100) + "% of peer stations in this cohort are Premium or higher. Higher tiers reward users with more Cycl Coins per bottle, which tends to bring them back to your location.",
        });
      }
      if (myStats.medianCost > 0 && peerStats.medianCost > 0 && myStats.medianCost > peerStats.medianCost * 1.5) {
        recs.push({
          tone: "tip",
          icon: "$",
          title: "Your reward cost is above the peer median",
          copy: "Peers price rewards around " + peerStats.medianCost + " Cycl Coins; yours is " + myStats.medianCost + " Cycl Coins. Lowering the bar can pull users from larger competitors.",
        });
      }
      if (catchmentSignal && catchmentSignal.nearbyPeers > 0) {
        recs.push({
          tone: catchmentSignal.hotPeers > 0 ? "opportunity" : "tip",
          icon: catchmentSignal.hotPeers > 0 ? "◎" : "↗",
          title: catchmentSignal.headline,
          copy: catchmentSignal.actionCopy,
        });
      }
      if (peerStats.conversion > 0 && myStats.conversion < peerStats.conversion * 0.6 && myStats.count > 0) {
        recs.push({
          tone: "urgent",
          icon: "%",
          title: "Click-to-activation rate is low",
          copy: "Peers convert " + Math.round(peerStats.conversion * 100) + "% of clicks to activations; you're at " + Math.round(myStats.conversion * 100) + "%. Tighten the description or check that the offer matches what users see in the marketplace card.",
        });
      }
      if (!recs.length) {
        recs.push({
          tone: "good",
          icon: "✓",
          title: "You're tracking well with peers",
          copy: "No urgent gaps spotted right now. Keep an eye on your peer leaderboard rank below to make sure you stay in the top half.",
        });
      }
      return recs;
    }

    function getCatchmentBandLabel(km) {
      if (km <= 5) return "1–3 km";
      if (km <= 15) return "3–8 km";
      return "10–25 km";
    }

    function buildCatchmentSignal({ cohort, peerStats }) {
      const visiblePeerCount = analyticsCatchmentKm <= 5 ? 4 : analyticsCatchmentKm <= 15 ? 6 : 8;
      const peers = cohort.partners.slice(0, visiblePeerCount);
      const peerAvgActs = peerStats.activationsPerReward;
      const hotPeers = peers.filter((peer) => {
        const pRewards = cohort.rewards.filter((reward) => reward.partnerId === peer.id);
        const pActs = pRewards.reduce((sum, reward) => sum + getRewardMetric(reward, "activations"), 0);
        return peerAvgActs > 0 && pActs > peerAvgActs * 2;
      }).length;
      const upgradedPeers = peers.filter((peer) => {
        const pStations = cohort.stations.filter((station) => getStationPartnerIds(station).has(peer.id));
        return pStations.some((station) => (station.tier || "standard") !== "standard");
      }).length;
      const band = getCatchmentBandLabel(analyticsCatchmentKm);
      const zone = analyticsCatchmentKm <= 5
        ? "close to your venue"
        : analyticsCatchmentKm <= 15
          ? "in the broader local area"
          : "across your wider market";

      let headline = `Most users are likely coming from ${band}.`;
      let actionCopy = `Consider placing rewards closer to that zone and keeping the offer simple so people convert before reaching a competitor.`;

      if (hotPeers > 0) {
        headline = `${hotPeers} accelerating peer${hotPeers === 1 ? " is" : "s are"} active within ${analyticsCatchmentKm} km.`;
        actionCopy = `Consider placing rewards closer to the strongest nearby demand pockets, or run one sponsored offer to defend visibility ${zone}.`;
      } else if (upgradedPeers > 0) {
        headline = `Premium-tier peers are attracting demand within ${analyticsCatchmentKm} km.`;
        actionCopy = `Consider upgrading one nearby station or pairing your offer with a clearer value proposition ${zone}.`;
      }

      return {
        band,
        nearbyPeers: peers.length,
        hotPeers,
        upgradedPeers,
        headline,
        actionCopy,
      };
    }

    function setBenchmarkBar(barId, you, peer) {
      const bar = $(barId);
      if (!bar) return;
      if (peer === 0 && you === 0) {
        bar.style.width = "0%";
        bar.classList.remove("below");
        return;
      }
      if (peer === 0) {
        bar.style.width = "100%";
        bar.classList.remove("below");
        return;
      }
      const ratio = you / peer;
      const width = Math.min(100, Math.max(6, ratio * 50));
      bar.style.width = width + "%";
      bar.classList.toggle("below", ratio < 0.7);
    }

    function renderMixBars(elId, mix, labelMap) {
      const el = $(elId);
      if (!el) return;
      el.innerHTML = Object.entries(labelMap).map(([key, label]) => {
        const share = mix.shares[key] || 0;
        const count = mix.counts[key] || 0;
        return `
          <div class="mix-row">
            <span class="mix-label">${escapeHtml(label)}</span>
            <div class="mix-track"><div class="mix-fill ${key}" style="width:${Math.max(2, Math.round(share * 100))}%"></div></div>
            <span class="mix-num">${Math.round(share * 100)}%<small>${count} of ${mix.total}</small></span>
          </div>
        `;
      }).join("");
    }

    async function renderAnalytics({ force = false } = {}) {
      if (!currentPartner) return;
      setText("cohortMeta", "Loading peer data…");
      await ensurePeerData(force);
      analyticsHasRendered = true;
      const cohort = getPeerCohort();
      const myStats = computeRewardStats(rewardRecords);
      const peerStats = computeRewardStats(cohort.rewards);
      const peerTier = computeTierMix(cohort.stations);
      const peerPlacement = computePlacementMix(cohort.rewards);
      const themes = computeRewardThemes(cohort.rewards);
      const leaderboard = computePeerLeaderboard(cohort);
      const catchmentSignal = buildCatchmentSignal({ cohort, peerStats });

      const cohortMetaEl = $("cohortMeta");
      if (cohortMetaEl) {
        cohortMetaEl.innerHTML = cohort.partners.length === 0
          ? `No peer data in this filter yet — try <em>broader filters</em>`
          : `Comparing to <em>${cohort.partners.length}</em> peer${cohort.partners.length === 1 ? "" : "s"} · <em>${cohort.rewards.length}</em> reward${cohort.rewards.length === 1 ? "" : "s"} · <em>${cohort.stations.length}</em> station${cohort.stations.length === 1 ? "" : "s"}`;
      }

      // ── Scene header ─────────────────────────────────────────────────────
      const catName = CATEGORY_BY_ID[currentPartner.businessCategory]?.name || currentPartner.businessType || "Business";
      const geoName = analyticsFilters.geo === "country" ? getCountryName(currentPartner.countryCode) : "Worldwide";
      const sceneTitleEl = $("sceneTitle");
      if (sceneTitleEl) sceneTitleEl.innerHTML = `Your <em>${escapeHtml(catName)}</em><br>against — peers in ${escapeHtml(geoName)}.`;
      setText("sceneVenue", currentPartner.companyName || "—");
      setText("sceneCatchment", `${getCatchmentBandLabel(analyticsCatchmentKm)} primary demand band`);
      const peerSetEl = $("scenePeerSet");
      if (peerSetEl) peerSetEl.innerHTML = `${cohort.partners.length} peer${cohort.partners.length === 1 ? "" : "s"} &middot; auto`;

      // ── Aggregate my metrics ─────────────────────────────────────────────
      const myValidations = rewardRecords.reduce((s, r) => s + getRewardMetric(r, "validations"), 0);
      const myActivations = rewardRecords.reduce((s, r) => s + getRewardMetric(r, "activations"), 0);
      const myClicks = rewardRecords.reduce((s, r) => s + getRewardMetric(r, "clicks"), 0);
      const myFootTraffic = stationRecords.reduce((sum, s) => sum + Math.round(Number(s.currentCap || 0) * 4), 0)
        || Math.max(myActivations, 0);

      // Peer median foot traffic
      const peerFootList = cohort.partners.map((p) => {
        const ps = cohort.stations.filter((s) => getStationPartnerIds(s).has(p.id));
        return ps.reduce((sum, s) => sum + Math.round(Number(s.currentCap || 0) * 4), 0);
      }).sort((a, b) => a - b);
      const peerMedianFoot = peerFootList.length ? peerFootList[Math.floor(peerFootList.length / 2)] : 0;

      // ── KPI Bench strip ──────────────────────────────────────────────────
      function updateKpiBench(id, youVal, peerVal, formatter, higherIsBetter = true) {
        const el = $(id);
        if (!el) return;
        const valueEl = el.querySelector(".kpi-value");
        const deltaEl = el.querySelector(".kpi-delta");
        if (valueEl) valueEl.innerHTML = formatter(youVal);
        if (deltaEl) deltaEl.innerHTML = `peer median <em>${formatter(peerVal)}</em>`;
        const neutral = peerVal === 0 && youVal === 0;
        const ratio = peerVal > 0 ? youVal / peerVal : (youVal > 0 ? 2 : 1);
        const isPos = !neutral && (higherIsBetter ? ratio >= 0.9 : ratio <= 1.1);
        const isNeg = !neutral && (higherIsBetter ? ratio < 0.7 : ratio > 1.3);
        el.classList.toggle("is-pos", isPos);
        el.classList.toggle("is-neg", isNeg);
        el.classList.toggle("is-warn", !neutral && !isPos && !isNeg);
      }

      updateKpiBench("kpiActivations", myStats.activationsPerReward, peerStats.activationsPerReward, (v) => v.toFixed(1));
      updateKpiBench("kpiConversion", myStats.conversion * 100, peerStats.conversion * 100, (v) => `${Math.round(v)}%`);
      updateKpiBench("kpiValidation", myStats.validation * 100, peerStats.validation * 100, (v) => `${Math.round(v)}%`);
      updateKpiBench("kpiCost", myStats.medianCost, peerStats.medianCost,
        (v) => `${v}<span class="unit"> Cycl Coins</span>`, false);
      updateKpiBench("kpiFootTraffic", myFootTraffic, peerMedianFoot, (v) => String(v));
      const footTrafficDeltaEl = $("kpiFootTraffic")?.querySelector(".kpi-delta");
      if (footTrafficDeltaEl) footTrafficDeltaEl.innerHTML = `peer median <em>${peerMedianFoot}</em> weekly recycles`;

      // ── Catchment map ────────────────────────────────────────────────────
      const pinsEl = $("catchmentPins");
      if (pinsEl) {
        const peers = cohort.partners.slice(0, analyticsCatchmentKm <= 5 ? 4 : analyticsCatchmentKm <= 15 ? 6 : 8);
        const peerAvgActs = peerStats.activationsPerReward;
        let pinsHtml = `<div class="catchment-pin you" style="left:50%;top:50%"
          title="${escapeHtml(currentPartner.companyName || "You")}">C</div>`;
        const innerCount = Math.min(4, peers.length);
        const debugRows = [];
        const myLatTop = Number(currentPartner.lat);
        const myLngTop = Number(currentPartner.lng);
        const myCoordsValid = isFinite(myLatTop) && isFinite(myLngTop);
        console.groupCollapsed(
          `[Catchment] ${analyticsCatchmentKm} km · you=${currentPartner.companyName || currentPartner.id} ` +
          `(${myCoordsValid ? `${myLatTop.toFixed(5)}, ${myLngTop.toFixed(5)}` : "no coords"}) · ${peers.length} peers`,
        );
        peers.forEach((peer, i) => {
          const pRewards = cohort.rewards.filter((r) => r.partnerId === peer.id);
          const pActs = pRewards.reduce((s, r) => s + getRewardMetric(r, "activations"), 0);
          const pStations = cohort.stations.filter((s) => getStationPartnerIds(s).has(peer.id));
          const topTierPeer = pStations.length ? getStationTier(pStations[0]).id : "standard";
          const isHot = peerAvgActs > 0 && pActs > peerAvgActs * 2;
          const isUpgraded = topTierPeer !== "standard";
          let angle, dist;
          let realKm = null;
          let bearingDeg = null;
          let mode = "fallback-inner";
          const myLat = Number(currentPartner.lat);
          const myLng = Number(currentPartner.lng);
          const pLat = Number(peer.lat);
          const pLng = Number(peer.lng);
          const hasRealCoords = isFinite(myLat) && isFinite(myLng) && isFinite(pLat) && isFinite(pLng);
          if (hasRealCoords) {
            mode = "real-coords";
            // Real bearing from my location to peer
            const toRad = (d) => (d * Math.PI) / 180;
            const dLng = toRad(pLng - myLng);
            const φ1 = toRad(myLat), φ2 = toRad(pLat);
            angle = Math.atan2(
              Math.sin(dLng) * Math.cos(φ2),
              Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(dLng),
            );
            // Compass bearing for display: 0° = North, increasing clockwise.
            // atan2 above returns 0 = East going CCW, so convert.
            bearingDeg = (90 - (angle * 180) / Math.PI + 360) % 360;
            // Scale real distance to visual %: clamp to 10–42 % of display radius
            realKm = haversineKm(myLat, myLng, pLat, pLng);
            const maxVisual = analyticsCatchmentKm <= 5 ? 34 : analyticsCatchmentKm <= 15 ? 40 : 44;
            dist = Math.max(12, Math.min(maxVisual, (realKm / Math.max(analyticsCatchmentKm, 1)) * maxVisual));
          } else if (i < innerCount) {
            angle = (i / Math.max(innerCount, 1)) * 2 * Math.PI - Math.PI / 2;
            dist = analyticsCatchmentKm <= 5 ? 18 : analyticsCatchmentKm <= 15 ? 24 : 28;
          } else {
            mode = "fallback-outer";
            const j = i - innerCount;
            angle = (j / Math.max(peers.length - innerCount, 1)) * 2 * Math.PI + Math.PI / 8;
            dist = analyticsCatchmentKm <= 5 ? 28 : analyticsCatchmentKm <= 15 ? 34 : 40;
          }
          const idSum = peer.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
          const jitter = ((idSum % 10) - 5) * 0.7;
          const xRaw = 50 + (dist + jitter) * Math.cos(angle);
          const yRaw = 50 + (dist + jitter) * Math.sin(angle);
          const x = Math.min(90, Math.max(10, xRaw));
          const y = Math.min(90, Math.max(10, yRaw));
          const clamped = x !== xRaw || y !== yRaw;
          const cls = `catchment-pin peer${isHot ? " is-hot" : ""}${isUpgraded ? " upgraded" : ""}`;
          const label = isUpgraded ? "★" : String(i + 1);
          pinsHtml += `<div class="${cls}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%"
            title="${escapeHtml(anonymousPeerLabel(peer))}">${label}</div>`;
          debugRows.push({
            "#": i + 1,
            peer: anonymousPeerLabel(peer),
            id: peer.id,
            mode,
            "peer.lat": isFinite(pLat) ? pLat.toFixed(5) : "—",
            "peer.lng": isFinite(pLng) ? pLng.toFixed(5) : "—",
            "realKm": realKm == null ? "—" : realKm.toFixed(2),
            "bearing°": bearingDeg == null ? "—" : bearingDeg.toFixed(1),
            "dist%": dist.toFixed(1),
            "x%": x.toFixed(1),
            "y%": y.toFixed(1),
            clamped,
            hot: isHot,
            upgraded: isUpgraded,
          });
        });
        if (debugRows.length) console.table(debugRows);
        else console.log("(no peers in this filter)");
        console.groupEnd();
        pinsEl.innerHTML = pinsHtml;
        if (peers.length === 0) pinsEl.innerHTML += `<div class="catchment-empty">No peers in this filter.</div>`;
        const scaleEl = $("catchmentScale");
        if (scaleEl) scaleEl.textContent = `~${analyticsCatchmentKm} km`;
      }

      setText("catchmentInsightHeadline", catchmentSignal.headline);
      const catchmentInsightCopyEl = $("catchmentInsightCopy");
      if (catchmentInsightCopyEl) {
        catchmentInsightCopyEl.textContent = analyticsCatchmentKm <= 5
          ? "This view helps you tune offers for people already close enough to choose between you and one nearby competitor."
          : analyticsCatchmentKm <= 15
            ? "Use this layer to judge whether your reward should travel across neighbourhoods, not just your immediate block."
            : "Use this broader layer to spot where stronger branding, sponsored visibility, or upgraded stations could win market share.";
      }
      setText("catchmentInsightBand", `Main demand band: ${catchmentSignal.band}`);
      setText("catchmentInsightPeers", `Nearby peers: ${catchmentSignal.nearbyPeers}`);
      setText("catchmentInsightAction", `Suggested move: ${catchmentSignal.actionCopy}`);

      // ── Recommended actions ──────────────────────────────────────────────
      const recs = buildRecommendations({ myStats, peerStats, peerTier, peerPlacement, catchmentSignal });
      const recCountEl = $("recCount");
      if (recCountEl) recCountEl.innerHTML = `${recs.length} action${recs.length === 1 ? "" : "s"} <span class="card-index">act_layer</span>`;
      const recListEl = $("recList");
      if (recListEl) {
        recListEl.innerHTML = recs.map((r) => `
          <li class="rec-item rec-${r.tone}">
            <div class="rec-priority-bar"></div>
            <div class="rec-icon">${escapeHtml(r.icon || "·")}</div>
            <div class="rec-copy">
              <span class="rec-tag">${escapeHtml(r.tone)}</span>
              <strong>${escapeHtml(r.title)}</strong>
              <span>${escapeHtml(r.copy)}</span>
            </div>
          </li>
        `).join("");
      }

      // ── Peer leaderboard (table) ─────────────────────────────────────────
      const merged = [
        ...leaderboard,
        {
          partner: currentPartner,
          validations: myValidations,
          activations: myActivations,
          clicks: myClicks,
          rewardCount: rewardRecords.length,
          isYou: true,
        },
      ].sort((a, b) => b.validations - a.validations || b.activations - a.activations);
      const myRank = merged.findIndex((p) => p.isYou) + 1;
      const lbTop = merged.slice(0, 10);
      const lbBodyEl = $("peerLeaderboardBody");
      if (lbBodyEl) {
        lbBodyEl.innerHTML = lbTop.map((p, i) => {
          const label = p.isYou ? (currentPartner.companyName || "You") : anonymousPeerLabel(p.partner);
          const pStations = p.isYou
            ? stationRecords
            : cohort.stations.filter((s) => getStationPartnerIds(s).has(p.partner.id));
          const topTier = pStations.length ? getStationTier(pStations[0]).id : "standard";
          const footWk = pStations.reduce((sum, s) => sum + Math.round(Number(s.currentCap || 0) * 4), 0);
          const trend = p.validations > 5 ? "up" : p.validations > 0 ? "flat" : "down";
          const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "—";
          const tierName = TIER_BY_ID[topTier]?.name || "Standard";
          const rws = p.isYou ? rewardRecords : cohort.rewards.filter((r) => r.partnerId === p.partner.id);
          const costs = rws.map((r) => Number(r.cost || 0)).filter((n) => n > 0).sort((a, b) => a - b);
          const medCost = costs.length ? costs[Math.floor(costs.length / 2)] : 0;
          return `
            <tr${p.isYou ? ' class="is-you"' : ""}>
              <td class="lb-name"><span class="rank-num">${i + 1}</span> ${escapeHtml(label)}</td>
              <td><span class="lb-tier-pill tier-${topTier}">${escapeHtml(tierName)}</span></td>
              <td>${p.activations}</td>
              <td>${p.validations}</td>
              <td>${medCost}</td>
              <td>${footWk}</td>
              <td><span class="lb-trend ${trend}">${trendIcon}</span></td>
            </tr>
          `;
        }).join("") || `<tr><td colspan="7"><div class="empty-state">No peer activity in this filter yet.</div></td></tr>`;
      }
      // Surface rank in the leaderboard card header
      const lbCard = lbBodyEl?.closest(".peer-board-card");
      if (lbCard) {
        const monoEl = lbCard.querySelector(".card-head .mono");
        if (monoEl && myRank > 0) monoEl.textContent = `core_metrics · rank ${myRank} of ${merged.length}`;
      }

      // ── Threat & opportunity alerts ──────────────────────────────────────
      const alertsEl = $("alertsList");
      if (alertsEl) {
        if (cohort.partners.length === 0) {
          alertsEl.innerHTML = `<div class="empty-state">No peer activity yet in this filter.</div>`;
        } else {
          const alerts = [];
          const myTotal = myActivations;
          if (leaderboard.length > 0) {
            const topPeer = leaderboard[0];
            if (myStats.count > 0 && topPeer.activations > myTotal * 2) {
              alerts.push({
                cls: "is-critical",
                time: "Today",
                text: `<span class="alert-tag">Critical</span><strong>${escapeHtml(anonymousPeerLabel(topPeer.partner))}</strong> leads with ${topPeer.activations} activations — more than double your current pace.`,
              });
            } else {
              alerts.push({
                cls: "is-opportunity",
                time: "This week",
                text: `<span class="alert-tag">Benchmark</span>Top peer: <strong>${topPeer.activations} activations</strong> across ${topPeer.rewardCount} reward${topPeer.rewardCount === 1 ? "" : "s"}.`,
              });
            }
          }
          const upgradedCount = cohort.stations.filter((s) => s.tier && s.tier !== "standard").length;
          if (cohort.stations.length > 0 && upgradedCount > 0) {
            const upgradePct = Math.round(upgradedCount / cohort.stations.length * 100);
            alerts.push({
              cls: "",
              time: "Rolling",
              text: `<span class="alert-tag">Tier intel</span><strong>${upgradePct}% of peer stations</strong> upgraded to Premium or higher — pulling more foot traffic.`,
            });
          }
          const sponsoredPct = cohort.rewards.length
            ? Math.round(cohort.rewards.filter(isSponsoredReward).length / cohort.rewards.length * 100) : 0;
          if (sponsoredPct > 30 && myStats.sponsoredShare < 0.1 && myStats.count > 0) {
            alerts.push({
              cls: "",
              time: "Signal",
              text: `<span class="alert-tag">Market</span><strong>${sponsoredPct}% of peer rewards</strong> use sponsored placement — your offers are organic only.`,
            });
          }
          if (peerStats.conversion > 0 && myStats.count > 0 && myStats.conversion < peerStats.conversion * 0.6) {
            alerts.push({
              cls: "is-critical",
              time: "Alert",
              text: `<span class="alert-tag">Conversion</span>Click-to-activation rate <strong>${Math.round(myStats.conversion * 100)}%</strong> vs ${Math.round(peerStats.conversion * 100)}% peer median. Review your reward copy.`,
            });
          }
          if (!alerts.length) {
            alerts.push({
              cls: "is-opportunity",
              time: "All clear",
              text: `<span class="alert-tag">Status</span>No critical signals detected. <strong>Keep publishing</strong> to maintain visibility.`,
            });
          }
          alertsEl.innerHTML = alerts.map((a) => `
            <div class="alert${a.cls ? " " + a.cls : ""}">
              <div class="alert-time">${escapeHtml(a.time)}</div>
              <div class="alert-text">${a.text}</div>
            </div>
          `).join("");
        }
      }

      // ── Performance heatmap ──────────────────────────────────────────────
      const heatmapEl = $("performanceHeatmap");
      if (heatmapEl) {
        const myConv = myClicks > 0 ? Math.round(myActivations / myClicks * 100) : 0;
        const myValRate = myActivations > 0 ? Math.round(myValidations / myActivations * 100) : 0;
        const myCosts = rewardRecords.map((r) => Number(r.cost || 0)).filter((n) => n > 0).sort((a, b) => a - b);
        const myMedCost = myCosts.length ? myCosts[Math.floor(myCosts.length / 2)] : 0;
        const topPeers = leaderboard.slice(0, 4);
        const heatRows = [
          ...topPeers.map((p) => {
            const pConv = p.clicks > 0 ? Math.round(p.activations / p.clicks * 100) : 0;
            const pValRate = p.activations > 0 ? Math.round(p.validations / p.activations * 100) : 0;
            const pRws = cohort.rewards.filter((r) => r.partnerId === p.partner.id);
            const pCosts = pRws.map((r) => Number(r.cost || 0)).filter((n) => n > 0).sort((a, b) => a - b);
            const pCost = pCosts.length ? pCosts[Math.floor(pCosts.length / 2)] : 0;
            return { label: anonymousPeerLabel(p.partner), isYou: false, values: [p.activations, p.clicks, pConv, pValRate, pCost] };
          }),
          { label: currentPartner.companyName || "You", isYou: true, values: [myActivations, myClicks, myConv, myValRate, myMedCost] },
        ];
        if (heatRows.length < 2) {
          heatmapEl.innerHTML = `<div class="empty-state" style="grid-column:1/-1;padding:20px;">Need at least one peer to compare metrics.</div>`;
        } else {
          const heatCols = ["Activations", "Clicks", "Conv%", "Val%", "Cost Cycl Coins"];
          const normed = heatRows.map((r) => r.values.slice());
          for (let c = 0; c < 5; c++) {
            const vals = heatRows.map((r) => r.values[c]);
            const min = Math.min(...vals);
            const range = Math.max(...vals) - min || 1;
            heatRows.forEach((r, ri) => {
              let n = Math.round(((r.values[c] - min) / range) * 100);
              if (c === 4) n = 100 - n; // lower cost = better
              normed[ri][c] = Math.max(0, Math.min(100, n));
            });
          }
          const cellStyle = (n, isYou) => {
            if (n >= 75) return isYou ? "background:rgba(44,182,114,0.25);color:#07190F" : "background:rgba(44,182,114,0.12);color:#2CB672";
            if (n >= 50) return "background:rgba(20,18,15,0.04);color:#14120F";
            if (n >= 25) return "background:rgba(20,18,15,0.03);color:#8A857A";
            return "background:rgba(196,74,58,0.08);color:#C44A3A";
          };
          let hmHtml = `<div class="h-corner"></div>`;
          hmHtml += heatCols.map((c) => `<div class="h-col-label">${escapeHtml(c)}</div>`).join("");
          heatRows.forEach((row, ri) => {
            hmHtml += `<div class="h-row-label${row.isYou ? " is-you" : ""}">${escapeHtml(row.label)}</div>`;
            hmHtml += row.values.map((val, ci) => {
              const disp = ci === 2 || ci === 3 ? `${val}%` : ci === 4 ? `${val} Cycl Coins` : String(val);
              return `<div class="h-cell" style="${cellStyle(normed[ri][ci], row.isYou)}">${escapeHtml(disp)}</div>`;
            }).join("");
          });
          heatmapEl.innerHTML = hmHtml;
        }
      }

      // ── Customer loyalty / repeat customers (recycle_captures) ───────────
      // Kicks off in the background; render placeholders immediately, then patch when data arrives.
      const setLoyaltyText = (id, v) => setText(id, v);
      const renderLoyalty = (myStats, peerMedianRate) => {
        setLoyaltyText("loyaltyDistinctUsers", String(myStats.distinctUsers));
        setLoyaltyText("loyaltyRepeatRate", `${Math.round(myStats.repeatRate * 100)}%`);
        setLoyaltyText("loyaltyAvgPerUser", myStats.avgPerUser.toFixed(1));

        const segOne = $("cohortSegOne");
        const segTwoFour = $("cohortSegTwoFour");
        const segFivePlus = $("cohortSegFivePlus");
        if (segOne && segTwoFour && segFivePlus) {
          const total = Math.max(1, myStats.cohorts.one + myStats.cohorts.twoFour + myStats.cohorts.fivePlus);
          segOne.style.flexGrow = String(myStats.cohorts.one);
          segTwoFour.style.flexGrow = String(myStats.cohorts.twoFour);
          segFivePlus.style.flexGrow = String(myStats.cohorts.fivePlus);
          segOne.textContent = myStats.cohorts.one ? `${Math.round(myStats.cohorts.one / total * 100)}%` : "";
          segTwoFour.textContent = myStats.cohorts.twoFour ? `${Math.round(myStats.cohorts.twoFour / total * 100)}%` : "";
          segFivePlus.textContent = myStats.cohorts.fivePlus ? `${Math.round(myStats.cohorts.fivePlus / total * 100)}%` : "";
        }
        setText("cohortCountOne", String(myStats.cohorts.one));
        setText("cohortCountTwoFour", String(myStats.cohorts.twoFour));
        setText("cohortCountFivePlus", String(myStats.cohorts.fivePlus));

        const topRecyclersEl = $("topRecyclersList");
        if (topRecyclersEl) {
          if (myStats.topUsers.length === 0) {
            topRecyclersEl.innerHTML = `<div class="empty-state">No recycle events at your stations in the last 90 days yet.</div>`;
          } else {
            const max = Math.max(1, ...myStats.topUsers.map((u) => u.count));
            topRecyclersEl.innerHTML = myStats.topUsers.map((u, i) => `
              <div class="recycler-row">
                <span class="recycler-rank">${i + 1}</span>
                <div class="recycler-name">
                  <strong>${escapeHtml(shortUserId(u.userId))}</strong>
                  <div class="recycler-meta">${u.count} recycle${u.count === 1 ? "" : "s"} in last 90d</div>
                  <div class="recycler-bar"><span style="width:${Math.max(8, Math.round(u.count / max * 100))}%"></span></div>
                </div>
                <span class="recycler-num">${u.count}<small>RECYCLES</small></span>
              </div>
            `).join("");
          }
        }

        // KPI bench: Repeat customers
        const kpiRepeatEl = $("kpiRepeat");
        if (kpiRepeatEl) {
          const valEl = kpiRepeatEl.querySelector(".kpi-value");
          const deltaEl = kpiRepeatEl.querySelector(".kpi-delta");
          if (valEl) valEl.textContent = `${Math.round(myStats.repeatRate * 100)}%`;
          if (deltaEl) {
            if (peerMedianRate === null) {
              deltaEl.innerHTML = `<em>${myStats.distinctUsers}</em> distinct customers · 90d`;
            } else {
              deltaEl.innerHTML = `peer median <em>${Math.round(peerMedianRate * 100)}%</em>`;
            }
          }
          kpiRepeatEl.classList.remove("is-pos", "is-neg");
          if (myStats.distinctUsers > 0) {
            if (peerMedianRate !== null && myStats.repeatRate >= peerMedianRate) {
              kpiRepeatEl.classList.add("is-pos");
            } else if (peerMedianRate !== null && myStats.repeatRate < peerMedianRate * 0.7) {
              kpiRepeatEl.classList.add("is-neg");
            } else if (myStats.repeatRate >= 0.25) {
              kpiRepeatEl.classList.add("is-pos");
            }
          }
        }
      };

      // Render with empty state immediately
      renderLoyalty({ distinctUsers: 0, repeatUsers: 0, repeatRate: 0, avgPerUser: 0, totalRecycles: 0, cohorts: { one: 0, twoFour: 0, fivePlus: 0 }, topUsers: [] }, null);

      // Then load asynchronously and update
      ensureCaptureData(force).then((cd) => {
        const myStationIds = stationRecords.map((s) => s.id);
        const peerStationIds = cohort.stations.map((s) => s.id);
        const myRepeat = computeRepeatStats(cd.own, myStationIds);
        const peerMedian = computePeerRepeatRateMedian(cd.peerSample, cohort);
        renderLoyalty(myRepeat, peerMedian);
      }).catch((err) => {
        console.warn("Could not load capture data:", err);
      });

      // ── Foot traffic velocity chart (12-week simulated) ──────────────────
      const velocityEl = $("velocityChart");
      if (velocityEl) {
        const seedVal = currentPartner.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
        const rng = (i) => {
          const x = Math.sin((seedVal + i) * 127.1 + i * 311.7) * 43758.5453;
          return Math.abs(x - Math.floor(x));
        };
        const base = Math.max(Math.round(myFootTraffic / 8), 1);
        const peerBase = Math.max(Math.round(peerMedianFoot / 8), 1);
        const weeks = Array.from({ length: 12 }, (_, i) => {
          const growth = 0.55 + (i / 11) * 0.85;
          return {
            you: Math.max(0, Math.round(base * growth * (0.55 + rng(i * 2) * 0.95))),
            peer: Math.max(0, Math.round(peerBase * growth * (0.65 + rng(i * 2 + 1) * 0.70))),
            week: `W${String(i + 1).padStart(2, "0")}`,
          };
        });
        const velMax = Math.max(1, ...weeks.flatMap((w) => [w.you, w.peer]));
        const chartH = 110;
        velocityEl.innerHTML = weeks.map((w) => {
          const yH = Math.max(2, Math.round((w.you / velMax) * chartH));
          const pH = Math.max(2, Math.round((w.peer / velMax) * chartH));
          return `
            <div class="velocity-bar-pair">
              <div class="velocity-stack">
                <div class="velocity-bar is-you" style="height:${yH}px"></div>
                <div class="velocity-bar" style="height:${pH}px"></div>
              </div>
              <span class="velocity-week">${w.week}</span>
            </div>
          `;
        }).join("");
      }

      // ── Top reward themes ────────────────────────────────────────────────
      const maxTheme = Math.max(1, ...themes.map(([, v]) => v));
      const themeListEl = $("themeList");
      if (themeListEl) {
        themeListEl.innerHTML = themes.map(([word, score]) => `
          <div class="theme-row">
            <strong>${escapeHtml(word)}</strong>
            <div class="theme-bar"><span style="width:${Math.round(score / maxTheme * 100)}%"></span></div>
            <span class="theme-score">${Math.round(score)}</span>
          </div>
        `).join("") || `<div class="empty-state">Need more peer data to spot themes.</div>`;
      }

      // ── Demographics (age + gender) ──────────────────────────────────────
      // Show loading state immediately, then fetch and render
      ["rewardDeepBody", "stationDeepBody"].forEach((id) => {
        const el = $(id);
        if (el) el.innerHTML = `<tr><td colspan="9"><div class="empty-state" style="padding:12px 0">Loading…</div></td></tr>`;
      });
      ["demoRewardAge", "demoStationAge", "demoRewardGender", "demoStationGender"].forEach((id) => {
        const el = $(id);
        if (el) el.innerHTML = `<div class="empty-state" style="font-size:12px;padding:12px 0">Loading…</div>`;
      });
      loadDemographics(force).then((demoData) => renderDemographics(demoData));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DEMOGRAPHICS — age / gender for reward customers and station visitors
    // Sources: ActivatedCouponLog, recycle_captures, users/{uid}
    // ─────────────────────────────────────────────────────────────────────────
    let demographicsCache = null;

    async function loadDemographics(force = false) {
      if (demographicsCache && !force) return demographicsCache;
      if (!currentPartner) return null;
      try {
        const couponSnap = await getDocs(
          query(
            collection(db, "ActivatedCouponLog"),
            where("partnerId", "==", currentPartner.id),
            limitDocs(300),
          ),
        );
        const couponLogs = couponSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const stationIds = stationRecords.map((s) => s.id);
        const captureLogs = [];
        if (stationIds.length > 0) {
          const chunks = [];
          for (let i = 0; i < stationIds.length; i += 10) chunks.push(stationIds.slice(i, i + 10));
          await Promise.all(
            chunks.map(async (chunk) => {
              const snap = await getDocs(
                query(
                  collection(db, "recycle_captures"),
                  where("stationNumber", "in", chunk),
                  limitDocs(200),
                ),
              );
              snap.docs.forEach((d) => captureLogs.push({ id: d.id, ...d.data() }));
            }),
          );
        }

        const rewardUserIds = [...new Set(couponLogs.map((l) => l.userId).filter(Boolean))];
        const stationUserIds = [...new Set(captureLogs.map((l) => l.userId).filter(Boolean))];
        const allUserIds = [...new Set([...rewardUserIds, ...stationUserIds])].slice(0, 150);
        const userProfiles = {};
        await Promise.all(
          allUserIds.map(async (uid) => {
            try {
              const snap = await getDoc(doc(db, "users", uid));
              if (snap.exists()) userProfiles[uid] = snap.data();
            } catch (_) { /* ignore */ }
          }),
        );

        demographicsCache = { couponLogs, captureLogs, userProfiles, rewardUserIds, stationUserIds };
        return demographicsCache;
      } catch (e) {
        console.error("loadDemographics:", e);
        return null;
      }
    }

    function getUserAge(profile) {
      if (!profile) return null;
      if (typeof profile.age === "number" && profile.age > 0) return profile.age;
      const { yearOfBirth, monthOfBirth, dayOfBirth } = profile;
      if (!yearOfBirth) return null;
      const today = new Date();
      let age = today.getFullYear() - Number(yearOfBirth);
      const m = today.getMonth() + 1;
      if (m < (monthOfBirth || 1) || (m === (monthOfBirth || 1) && today.getDate() < (dayOfBirth || 1))) age--;
      return age >= 0 ? age : null;
    }

    function getAgeBracket(age) {
      if (age === null || age === undefined) return null;
      if (age < 18) return "<18";
      if (age <= 24) return "18–24";
      if (age <= 34) return "25–34";
      if (age <= 44) return "35–44";
      if (age <= 54) return "45–54";
      return "55+";
    }

    function renderAgeBars(elId, ageMap) {
      const el = $(elId);
      if (!el) return;
      const AGE_ORDER = ["<18", "18–24", "25–34", "35–44", "45–54", "55+"];
      const total = Object.values(ageMap).reduce((s, v) => s + v, 0);
      if (total === 0) {
        el.innerHTML = `<div class="empty-state" style="font-size:12px;padding:12px 0">No age data yet.</div>`;
        return;
      }
      const maxVal = Math.max(1, ...Object.values(ageMap));
      el.innerHTML = AGE_ORDER.map((bracket) => {
        const cnt = ageMap[bracket] || 0;
        const pct = Math.max(cnt > 0 ? 5 : 0, Math.round((cnt / maxVal) * 100));
        return `
          <div class="demo-bar-row">
            <span class="demo-bar-label">${escapeHtml(bracket)}</span>
            <div class="demo-bar-track"><div class="demo-bar-fill" style="width:${pct}%"></div></div>
            <span class="demo-bar-count">${cnt}</span>
          </div>`;
      }).join("");
    }

    function renderGenderBars(elId, genderMap) {
      const el = $(elId);
      if (!el) return;
      const total = Object.values(genderMap).reduce((s, v) => s + v, 0);
      if (total === 0) {
        el.innerHTML = `<div class="empty-state" style="font-size:12px;padding:12px 0">No gender data yet.</div>`;
        return;
      }
      const GENDER_CSS = { male: "g-male", female: "g-female", other: "g-other" };
      el.innerHTML = Object.entries(genderMap)
        .sort((a, b) => b[1] - a[1])
        .map(([g, cnt]) => {
          const pct = Math.round((cnt / total) * 100);
          const cls = GENDER_CSS[g] || "g-unknown";
          return `
            <div class="demo-gender-row">
              <span class="demo-gender-label">${escapeHtml(g)}</span>
              <div class="demo-bar-track"><div class="demo-gender-fill ${cls}" style="width:${Math.max(5, pct)}%"></div></div>
              <span class="demo-gender-pct">${pct}%</span>
            </div>`;
        }).join("");
    }

    function buildAgeGenderMaps(userIds, userProfiles) {
      const ageMap = {}, genderMap = {};
      let withProfile = 0;
      userIds.forEach((uid) => {
        const p = userProfiles[uid];
        if (!p) return;
        withProfile++;
        const b = getAgeBracket(getUserAge(p));
        if (b) ageMap[b] = (ageMap[b] || 0) + 1;
        const g = (p.gender || "").toLowerCase().trim();
        if (g) genderMap[g] = (genderMap[g] || 0) + 1;
      });
      return { ageMap, genderMap, withProfile };
    }

    function renderDemographics(data) {
      const EMPTY = `<div class="empty-state" style="font-size:12px;padding:12px 0">No data yet.</div>`;
      if (!data) {
        ["demoRewardAge", "demoStationAge", "demoRewardGender", "demoStationGender"].forEach((id) => {
          const el = $(id);
          if (el) el.innerHTML = EMPTY;
        });
        return;
      }
      const { couponLogs, captureLogs, userProfiles, rewardUserIds, stationUserIds } = data;

      // ── Reward customer demographics ──────────────────────────────
      const rewardDemo = buildAgeGenderMaps(rewardUserIds, userProfiles);
      setText("demoCoverageRewards", `${rewardDemo.withProfile} profile${rewardDemo.withProfile === 1 ? "" : "s"}`);
      renderAgeBars("demoRewardAge", rewardDemo.ageMap);
      renderGenderBars("demoRewardGender", rewardDemo.genderMap);

      // ── Station visitor demographics ──────────────────────────────
      const stationDemo = buildAgeGenderMaps(stationUserIds, userProfiles);
      setText("demoCoverageStations", `${stationDemo.withProfile} visitor${stationDemo.withProfile === 1 ? "" : "s"}`);
      renderAgeBars("demoStationAge", stationDemo.ageMap);
      renderGenderBars("demoStationGender", stationDemo.genderMap);

      // ── Reward deep-dive table ────────────────────────────────────
      const rewardBodyEl = $("rewardDeepBody");
      if (rewardBodyEl) {
        if (rewardRecords.length === 0) {
          rewardBodyEl.innerHTML = `<tr><td colspan="9"><div class="empty-state">No rewards yet.</div></td></tr>`;
        } else {
          const rewardUserMap = {};
          couponLogs.forEach((log) => {
            if (!log.rewardId || !log.userId) return;
            (rewardUserMap[log.rewardId] = rewardUserMap[log.rewardId] || []).push(log.userId);
          });
          rewardBodyEl.innerHTML = [...rewardRecords]
            .sort((a, b) => getRewardMetric(b, "activations") - getRewardMetric(a, "activations"))
            .map((r) => {
              const acts = getRewardMetric(r, "activations");
              const vals = getRewardMetric(r, "validations");
              const clicks = getRewardMetric(r, "clicks");
              const valPct = acts > 0 ? Math.round((vals / acts) * 100) : 0;
              const valCls = valPct >= 50 ? "td-good" : acts > 0 && valPct < 20 ? "td-warn" : "";
              const rUids = [...new Set(rewardUserMap[r.id] || [])];
              const { ageMap: rAge, genderMap: rGender } = buildAgeGenderMaps(rUids, userProfiles);
              const topAge = Object.entries(rAge).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
              const topGender = Object.entries(rGender).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
              return `
                <tr>
                  <td class="td-title" title="${escapeHtml(r.title || "")}">${escapeHtml(r.title || "—")}</td>
                  <td><span class="dt-badge">${escapeHtml(isSponsoredReward(r) ? "Sponsored" : "Organic")}</span></td>
                  <td class="td-num">${Number(r.cost || 0)}</td>
                  <td class="td-num">${clicks}</td>
                  <td class="td-num">${acts}</td>
                  <td class="td-num">${vals}</td>
                  <td class="td-num ${valCls}">${valPct}%</td>
                  <td class="td-demo">${escapeHtml(topAge)}</td>
                  <td class="td-demo" style="text-transform:capitalize">${escapeHtml(topGender)}</td>
                </tr>`;
            }).join("");
        }
      }

      // ── Station deep-dive table ───────────────────────────────────
      const stationBodyEl = $("stationDeepBody");
      if (stationBodyEl) {
        if (stationRecords.length === 0) {
          stationBodyEl.innerHTML = `<tr><td colspan="7"><div class="empty-state">No stations yet.</div></td></tr>`;
        } else {
          const stationVisitorMap = {};
          captureLogs.forEach((log) => {
            if (!log.stationNumber || !log.userId) return;
            (stationVisitorMap[log.stationNumber] = stationVisitorMap[log.stationNumber] || new Set()).add(log.userId);
          });
          stationBodyEl.innerHTML = stationRecords.map((s) => {
            const tier = getStationTier(s);
            const cap = Number(s.currentCap || 0);
            const maxCap = Number(s.capacity || s.maxCap || 0);
            const fillPct = maxCap > 0 ? Math.round((cap / maxCap) * 100) : null;
            const fillCls = fillPct === null ? "" : fillPct >= 90 ? "td-bad" : fillPct >= 70 ? "td-warn" : "td-good";
            const visitors = stationVisitorMap[s.id] || new Set();
            const { ageMap: sAge, genderMap: sGender } = buildAgeGenderMaps([...visitors], userProfiles);
            const topAge = Object.entries(sAge).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
            const topGender = Object.entries(sGender).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
            const tierName = TIER_BY_ID[tier.id]?.name || "Standard";
            return `
              <tr>
                <td class="td-title" title="${escapeHtml(s.address || s.id || "")}">${escapeHtml(s.address || s.id || "Station")}</td>
                <td><span class="dt-badge tier-${tier.id}">${escapeHtml(tierName)}</span></td>
                <td class="td-num">${maxCap > 0 ? `${cap} / ${maxCap}` : cap}</td>
                <td class="td-num ${fillCls}">${fillPct !== null ? `${fillPct}%` : "—"}</td>
                <td class="td-num">${visitors.size}</td>
                <td class="td-demo">${escapeHtml(topAge)}</td>
                <td class="td-demo" style="text-transform:capitalize">${escapeHtml(topGender)}</td>
              </tr>`;
          }).join("");
        }
      }
    }

    function renderTopRewards() {
      const ranked = [...rewardRecords]
        .sort((a, b) => (getRewardMetric(b, "activations") + getRewardMetric(b, "validations")) - (getRewardMetric(a, "activations") + getRewardMetric(a, "validations")))
        .slice(0, 5);
      const max = Math.max(1, ...ranked.map((reward) => getRewardMetric(reward, "activations") + getRewardMetric(reward, "validations")));
      $("topRewardBars").innerHTML = ranked.map((reward) => {
        const value = getRewardMetric(reward, "activations") + getRewardMetric(reward, "validations");
        const width = Math.max(6, Math.round((value / max) * 100));
        return `
          <div class="bar-row">
            <div>
              <div class="bar-label"><strong>${escapeHtml(reward.title || "Reward")}</strong><span>${value}</span></div>
              <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
            </div>
            <span class="code">${isSponsoredReward(reward) ? "Sponsored" : "Organic"}</span>
          </div>
        `;
      }).join("") || `<div class="empty-state">No reward activity yet.</div>`;
    }

    let rewardStatusFilter = "active";

    function getRewardStatus(reward) {
      const status = String(reward.status || "active");
      if (status === "active" || status === "paused" || status === "archived") return status;
      return "active";
    }

    function renderRewardStatusTabs() {
      const tabs = $("rewardStatusTabs");
      if (!tabs) return;
      const counts = { all: rewardRecords.length, active: 0, paused: 0, archived: 0 };
      rewardRecords.forEach((reward) => {
        counts[getRewardStatus(reward)] += 1;
      });
      tabs.querySelectorAll("[data-count-for]").forEach((el) => {
        el.textContent = counts[el.dataset.countFor] ?? 0;
      });
      tabs.querySelectorAll("[data-reward-filter]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.rewardFilter === rewardStatusFilter);
      });
    }

    function renderRewardList() {
      renderRewardStatusTabs();
      const visible = rewardStatusFilter === "all"
        ? rewardRecords
        : rewardRecords.filter((reward) => getRewardStatus(reward) === rewardStatusFilter);

      if (!visible.length) {
        const emptyCopy = rewardRecords.length === 0
          ? "No rewards yet. Publish your first offer above."
          : `No ${rewardStatusFilter} rewards.`;
        $("rewardList").innerHTML = `<div class="empty-state">${emptyCopy}</div>`;
        return;
      }

      $("rewardList").innerHTML = visible.map((reward) => {
        const placement = getRewardPlacementMeta(reward);
        const status = getRewardStatus(reward);
        const clicks = getRewardMetric(reward, "clicks");
        const activations = getRewardMetric(reward, "activations");
        const validations = getRewardMetric(reward, "validations");
        const conversion = clicks ? Math.round((activations / clicks) * 100) : 0;
        const boostActive = isBoostActive(reward);
        const thumbInner = reward.image
          ? `<img src="${escapeHtml(reward.image)}" alt="${escapeHtml(reward.title || "Reward")}" loading="lazy">`
          : `<span class="reward-card-thumb-placeholder">No image</span>`;
        const boostText = boostActive
          ? `<strong>Boost active · ${Number(reward.boostDays || 0)}-day plan</strong><span>${escapeHtml(formatBoostRemaining(reward))}</span>`
          : `<strong>${escapeHtml(placement.title)}</strong><span>${escapeHtml(placement.copy)}</span>`;
        const statusLabel = status === "active" ? "Live" : status === "paused" ? "Paused" : "Archived";
        const actions = status === "archived"
          ? `
              <button class="small-action" type="button" data-reward-action="edit" data-id="${reward.id}">Edit</button>
              <button class="small-action" type="button" data-reward-action="restore" data-id="${reward.id}">Restore</button>
            `
          : `
              <button class="small-action" type="button" data-reward-action="edit" data-id="${reward.id}">Edit</button>
              <button class="small-action" type="button" data-reward-action="toggle" data-id="${reward.id}">${status === "active" ? "Pause" : "Activate"}</button>
              <button class="small-action danger" type="button" data-reward-action="archive" data-id="${reward.id}">Archive</button>
            `;
        return `
          <article class="reward-card reward-card--${placement.cls} is-${status}">
            <div class="reward-card-thumb">${thumbInner}</div>
            <div class="reward-card-main">
              <div class="reward-card-title-row">
                <div>
                  <strong>${escapeHtml(reward.title || "Reward")}</strong>
                  <div class="reward-card-meta">
                    <span class="reward-status-badge is-${status}">${statusLabel}</span>
                    <span>${escapeHtml(reward.isOnline ? "Online" : (reward.location || "Nationwide"))}</span>
                    <span>${escapeHtml(reward.country || currentPartner.countryCode)}</span>
                    <span>${Number(reward.cost || 0)} Cycl Coins</span>
                  </div>
                </div>
                <span class="reward-placement-pill${placement.pillCls}">${escapeHtml(placement.label)}</span>
              </div>
              <div class="reward-card-metrics">
                <div class="reward-metric"><b>${clicks}</b><span>Clicks</span></div>
                <div class="reward-metric"><b>${activations}</b><span>Activations</span></div>
                <div class="reward-metric"><b>${validations}</b><span>Validations</span></div>
                <div class="reward-metric"><b>${conversion}%</b><span>Conversion</span></div>
              </div>
            </div>
            <div class="reward-card-actions">
              ${actions}
            </div>
            ${status === "archived" ? "" : `
            <div class="reward-boost-panel">
              <div class="reward-boost-panel-text">${boostText}</div>
              <button class="reward-boost-button" type="button" data-reward-action="boost" data-id="${reward.id}" ${boostActive || status === "paused" ? "disabled" : ""}>${boostActive ? "Boost active" : "Boost"}</button>
            </div>`}
          </article>
        `;
      }).join("");
    }

    const BOOST_OPTIONS = [
      { id: "3d", days: 3, priceKr: 149, label: "3-day boost", subtitle: "~50 kr / day · quick weekend push." },
      { id: "5d", days: 5, priceKr: 229, label: "5-day boost", subtitle: "~46 kr / day · short campaign window." },
      { id: "10d", days: 10, priceKr: 399, label: "10-day boost", subtitle: "~40 kr / day · best value for steady traffic." },
      { id: "custom", days: 0, priceKr: 0, label: "Custom", subtitle: "From 39 kr / day · longer durations get cheaper rates." },
    ];
    function customBoostPerDayKr(days) {
      if (days >= 20) return 39;
      if (days >= 10) return 44;
      if (days >= 5) return 49;
      return 55;
    }
    function customBoostPriceKr(days) {
      const safeDays = Math.max(1, Math.round(days || 1));
      return safeDays * customBoostPerDayKr(safeDays);
    }
    let currentBoostReward = null;
    let selectedBoostOptionId = null;
    let selectedBoostCustomDays = 7;

    function isBoostActive(reward) {
      const expires = reward?.boostExpiresAt?.toMillis?.() ?? reward?.boostExpiresAtMs ?? 0;
      return expires > Date.now();
    }

    function formatBoostRemaining(reward) {
      const expires = reward?.boostExpiresAt?.toMillis?.() ?? reward?.boostExpiresAtMs ?? 0;
      if (!expires) return "Boost active.";
      const msLeft = expires - Date.now();
      if (msLeft <= 0) return "Boost ended.";
      const daysLeft = Math.max(1, Math.ceil(msLeft / 86400000));
      return `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining.`;
    }

    function getSelectedBoost() {
      const option = BOOST_OPTIONS.find((opt) => opt.id === selectedBoostOptionId);
      if (!option) return null;
      if (option.id === "custom") {
        const days = Math.max(1, Math.round(selectedBoostCustomDays || 1));
        return { id: "custom", days, priceKr: customBoostPriceKr(days), label: `${days}-day boost` };
      }
      return { ...option };
    }

    function renderBoostGrid() {
      const grid = $("boostGrid");
      if (!grid) return;
      grid.innerHTML = BOOST_OPTIONS.map((option) => {
        const isSelected = option.id === selectedBoostOptionId;
        const priceLabel = option.id === "custom"
          ? `<span class="boost-card-custom"><label>Days <input type="number" min="1" max="365" id="boostCustomDays" value="${selectedBoostCustomDays}"></label><strong id="boostCustomPrice">${customBoostPriceKr(selectedBoostCustomDays)} kr</strong></span>`
          : `<strong>${option.priceKr} kr</strong><small>${option.days}-day plan</small>`;
        return `
          <div role="button" tabindex="0" class="tier-card boost-card${isSelected ? " is-selected" : ""}" data-boost-id="${option.id}">
            <div class="tier-card-head">
              <span class="tier-badge">${escapeHtml(option.label)}</span>
            </div>
            <div class="tier-card-blurb">${escapeHtml(option.subtitle)}</div>
            <div class="tier-card-fee">${priceLabel}</div>
          </div>
        `;
      }).join("");
      const customDaysInput = $("boostCustomDays");
      if (customDaysInput) {
        customDaysInput.addEventListener("click", (event) => event.stopPropagation());
        customDaysInput.addEventListener("focus", () => {
          if (selectedBoostOptionId !== "custom") {
            selectedBoostOptionId = "custom";
            grid.querySelectorAll(".boost-card").forEach((el) =>
              el.classList.toggle("is-selected", el.dataset.boostId === "custom"),
            );
          }
        });
        customDaysInput.addEventListener("input", (event) => {
          event.stopPropagation();
          const value = Math.max(1, Math.min(365, Number(event.target.value) || 1));
          selectedBoostCustomDays = value;
          const priceEl = $("boostCustomPrice");
          if (priceEl) priceEl.textContent = `${customBoostPriceKr(value)} kr`;
          updateBoostConfirm();
        });
      }
      updateBoostConfirm();
    }

    function updateBoostConfirm() {
      const button = $("boostConfirmButton");
      if (!button) return;
      const choice = getSelectedBoost();
      button.disabled = !choice;
      if (!choice) {
        button.textContent = "Activate boost";
        return;
      }
      if (isFreePlan() && partnerBillingStatus.loaded && !(partnerBillingStatus.cards || []).length) {
        button.textContent = `Add card to boost · ${choice.priceKr} kr`;
        return;
      }
      if (isFreePlan() && getOutstandingBoostRewards().length) {
        button.textContent = "Pay outstanding first";
        return;
      }
      button.textContent = `Activate boost · ${choice.priceKr} kr`;
    }

    function openBoostModal(rewardId) {
      const reward = rewardRecords.find((item) => item.id === rewardId);
      if (!reward) return;
      if (isBoostActive(reward)) {
        window.alert("This reward already has an active boost. Wait until it ends before boosting it again.");
        return;
      }
      currentBoostReward = reward;
      selectedBoostOptionId = null;
      selectedBoostCustomDays = 7;
      const subtitle = $("boostModalSubtitle");
      if (subtitle) {
        subtitle.textContent = `Pick how long you want ${reward.title || "this reward"} promoted in featured marketplace slots.`;
      }
      renderBoostGrid();
      const modal = $("boostModal");
      if (!modal) return;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeBoostModal() {
      const modal = $("boostModal");
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      currentBoostReward = null;
      selectedBoostOptionId = null;
    }

    async function activateBoost() {
      if (!currentBoostReward) return;
      if (requireHttpOrigin("activating a boost")) return;
      if (isBoostActive(currentBoostReward)) {
        window.alert("This reward already has an active boost. Wait until it ends before boosting it again.");
        closeBoostModal();
        return;
      }
      const choice = getSelectedBoost();
      if (!choice) return;
      if (isFreePlan()) {
        if (partnerBillingStatus.loaded && !(partnerBillingStatus.cards || []).length) {
          await startPartnerSetupSession($("boostConfirmButton"));
          return;
        }
        const outstanding = getOutstandingBoostRewards();
        if (outstanding.length > 0) {
          closeBoostModal();
          document.querySelector("[data-section='billing']")?.click();
          return;
        }
      }
      const button = $("boostConfirmButton");
      const originalLabel = button.textContent;
      button.disabled = true;
      button.textContent = "Activating...";
      try {
        const activateBoostCallable = httpsCallable(cloudFunctions, "activatePartnerRewardBoost");
        const boostStartedAtMs = Date.now();
        const result = await activateBoostCallable({
          rewardId: currentBoostReward.id,
          boostPlan: choice.id,
          boostDays: choice.days,
          boostStartedAtMs,
        });
        Object.assign(currentBoostReward, {
          placement: "featured_boost",
          sponsored: true,
          sponsorLabel: "Sponsored",
          boostPlan: choice.id,
          boostDays: result?.data?.boostDays || choice.days,
          boostPriceKr: result?.data?.boostPriceKr || choice.priceKr,
          boostStartedAtMs: result?.data?.boostStartedAtMs || boostStartedAtMs,
          boostExpiresAtMs: result?.data?.boostExpiresAtMs || (boostStartedAtMs + choice.days * 86400000),
          boostActivationBaseline: getRewardMetric(currentBoostReward, "activations"),
          boostClickBaseline: getRewardMetric(currentBoostReward, "clicks"),
          boostValidationBaseline: getRewardMetric(currentBoostReward, "validations"),
          boostBilledVia: result?.data?.billedVia || (isFreePlan() ? "one_off" : "subscription_monthly"),
          boostBillingStatus: result?.data?.boostBillingStatus || "",
          boostPaid: false,
        });
        renderDashboard();
        closeBoostModal();
      } catch (error) {
        const reason = error?.details?.reason || "";
        if (reason === "missing_saved_card" || /saved card/i.test(error.message || "")) {
          await startPartnerSetupSession(button);
          return;
        }
        if (reason === "outstanding_boosts") {
          closeBoostModal();
          document.querySelector("[data-section='billing']")?.click();
        }
        window.alert(getReadableCallableError(error, "Could not activate boost."));
        button.disabled = false;
        button.textContent = originalLabel;
      }
    }

    async function payOutstandingBoosts() {
      if (requireHttpOrigin("paying outstanding boosts")) return;
      const outstanding = getOutstandingBoostRewards();
      if (!outstanding.length) {
        window.alert("There are no unpaid boost charges to pay right now.");
        renderDashboard();
        return;
      }
      const due = outstanding.reduce((sum, r) => sum + Number(r.boostPriceKr || 0), 0);
      const ok = window.confirm(`Pay ${due} kr for ${outstanding.length} unpaid boost${outstanding.length === 1 ? "" : "s"} now? This will use your saved Stripe card.`);
      if (!ok) return;
      const button = $("payOutstandingBoostsButton");
      const originalLabel = button?.textContent;
      if (button) {
        button.disabled = true;
        button.textContent = "Processing...";
      }
      try {
        const payBoosts = httpsCallable(cloudFunctions, "payOutstandingPartnerBoosts");
        const result = await payBoosts({
          rewardIds: outstanding.map((reward) => reward.id),
        });
        const paidCount = Number(result?.data?.paidCount || 0);
        const remainingCount = Number(result?.data?.remainingCount || 0);
        const hostedInvoiceUrl = result?.data?.hostedInvoiceUrl;
        if (hostedInvoiceUrl) {
          window.location.href = hostedInvoiceUrl;
          return;
        }
        if (remainingCount > 0) {
          window.alert(result?.data?.errorMessage || "Stripe could not collect the outstanding boost charge. Try again or update the saved card.");
          renderDashboard();
          return;
        }
        if (paidCount < outstanding.length) {
          window.alert("Stripe did not confirm that these boosts were paid. Refresh billing and try again after the latest functions are deployed.");
          await refreshPartnerBillingStatus({ silent: true });
          renderDashboard();
          return;
        }
        outstanding.forEach((reward) => {
          reward.boostPaid = true;
          reward.boostBillingStatus = "paid";
        });
        renderDashboard();
      } catch (error) {
        const reason = error?.details?.reason || "";
        if (reason === "missing_saved_card" || /saved card/i.test(error.message || "")) {
          await startPartnerSetupSession(button);
          return;
        }
        window.alert(getReadableCallableError(error, "Could not settle boost charges."));
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel || "Pay outstanding";
        }
      }
    }

    let isAnimatingStationEmpty = false;

    function renderStationLists() {
      if (isAnimatingStationEmpty) return;
      const stationCards = stationRecords.map((station) => {
        const capacity = Number(station.capacity || 0);
        const current = Number(station.currentCap || 0);
        const fill = capacity ? Math.round((current / capacity) * 100) : 0;
        const fillBar = Math.max(4, Math.min(fill, 100));
        const needsCollection = capacity && current >= capacity * 0.85;
        const tier = getStationTier(station);
        const openingLine = formatStationOpeningLine(station);
        const stationOpen = isStationOpenNow(station);
        const stationStatus = !stationOpen ? "Closed" : needsCollection ? "Collection soon" : "OK";
        return `
          <article class="station-card">
            <div class="station-card-main">
              <div class="station-card-info">
                <div class="station-card-title">
                  <strong>${escapeHtml(station.placeName || station.title || "Cycl station")}</strong>
                  <span class="tier-badge tier-${tier.id}">${escapeHtml(tier.name)} · ${tier.multiplier}x</span>
                </div>
                <div class="station-card-meta">
                  <span class="station-card-address">${escapeHtml(station.address || station.location || "Assigned location")}</span>
                  <span class="station-card-capacity">${current}/${capacity || "--"} capacity</span>
                  <span class="station-card-hours${stationOpen ? "" : " is-closed"}">${escapeHtml(openingLine)}</span>
                </div>
              </div>
              <div class="station-card-fill">
                <div class="station-card-fill-track"><div class="station-card-fill-bar" style="--fill:${fillBar}%"></div></div>
                <span class="station-card-fill-label">${fill}% full</span>
              </div>
            </div>
            <div class="station-card-actions">
              <span class="code">${stationStatus}</span>
              <div class="actions">
                <button class="small-action" type="button" data-station-action="edit" data-id="${station.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Edit</button>
                <button class="small-action" type="button" data-station-action="upgrade" data-id="${station.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/><line x1="12" y1="9" x2="12" y2="20"/></svg>Upgrade</button>
                <button class="small-action" type="button" data-station-action="collect" data-id="${station.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>Collect bottles</button>
                <button class="small-action" type="button" data-station-action="empty" data-id="${station.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>Empty station</button>
              </div>
            </div>
          </article>
        `;
      }).join("") || `<div class="empty-state">No assigned stations yet. Cycl can assign stations to this partner account.</div>`;

      $("stationList").innerHTML = stationCards;
      $("homeStationList").innerHTML = stationRecords.slice(0, 3).map((station) => {
        const capacity = Number(station.capacity || 0);
        const current = Number(station.currentCap || 0);
        const fill = capacity ? Math.round((current / capacity) * 100) : 0;
        const tier = getStationTier(station);
        const openingLine = formatStationOpeningLine(station);
        return `<div class="row"><div class="station-card-info"><div class="station-card-title"><strong>${escapeHtml(station.placeName || station.title || "Cycl station")}</strong><span class="tier-badge tier-${tier.id}">${escapeHtml(tier.name)} · ${tier.multiplier}x</span></div><span>${current}/${capacity || "--"} · ${fill}% full · ${escapeHtml(openingLine)}</span></div><span class="code">${escapeHtml(station.status || "active")}</span></div>`;
      }).join("") || `<div class="empty-state">No assigned stations.</div>`;
    }

    function resetRewardForm() {
      clearSelectedRewardImage();
      hideRewardLocationSuggestions();
      $("rewardForm").reset();
      $("rewardEditId").value = "";
      $("rewardImageStoragePath").value = "";
      $("rewardLocationLat").value = "";
      $("rewardLocationLng").value = "";
      $("rewardPhysicalAddress").value = "";
      $("rewardSubtitle").value = currentPartner?.companyName || "";
      $("rewardLocation").value = currentPartner?.city || "";
      $("rewardCountry").value = currentPartner?.countryCode || "DK";
      $("rewardCost").value = "25";
      $("rewardPlacement").value = "organic";
      $("rewardIsOnline").checked = false;
      $("rewardAvailabilityMode").value = "unlimited";
      $("rewardFormTitle").innerHTML = "Add a <em>reward.</em>";
      $("rewardSubmitButton").textContent = "Publish reward";
      setRewardCodesMessage("");
      $("rewardCodes").removeAttribute("aria-invalid");
      syncRewardChannelFields();
      syncRewardAvailabilityFields();
      syncRewardImagePreview();
    }

    function openRewardModal() {
      const modal = $("rewardModal");
      if (!modal) return;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      window.requestAnimationFrame(() => {
        const firstField = $("rewardTitle");
        if (firstField) firstField.focus();
      });
    }

    function closeRewardModal() {
      const modal = $("rewardModal");
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    let currentTierEditStation = null;
    let selectedTierId = null;
    let currentStationEditStation = null;

    function renderTierGrid() {
      if (!currentTierEditStation) return;
      const currentTier = getStationTier(currentTierEditStation).id;
      const grid = $("tierGrid");
      if (!grid) return;
      grid.innerHTML = STATION_TIERS.map((tier) => {
        const isCurrent = tier.id === currentTier;
        const isSelected = tier.id === selectedTierId;
        const fee = tier.monthlyFee === 0 ? "0 kr" : `${tier.monthlyFee} kr`;
        return `
          <button type="button" class="tier-card${isCurrent ? " is-current" : ""}${isSelected ? " is-selected" : ""}" data-tier-id="${tier.id}">
            <div class="tier-card-head">
              <span class="tier-badge tier-${tier.id}">${escapeHtml(tier.name)}</span>
              ${isCurrent ? '<span class="tier-card-current-tag">Current</span>' : ""}
            </div>
            <div class="tier-card-mult"><em>${tier.multiplier}x</em></div>
            <div class="tier-card-blurb">${escapeHtml(tier.blurb)}</div>
            <div class="tier-card-fee"><strong>${fee}</strong><small>${tier.monthlyFee === 0 ? "with partner access" : tier.productName}</small></div>
          </button>
        `;
      }).join("");
      const confirmBtn = $("tierConfirmButton");
      if (confirmBtn) {
        confirmBtn.disabled = !selectedTierId || selectedTierId === currentTier;
        confirmBtn.textContent = (!selectedTierId || selectedTierId === currentTier) ? "Save tier" : `Save ${TIER_BY_ID[selectedTierId].name}`;
      }
    }

    function openTierModal(stationId) {
      const station = stationRecords.find((s) => s.id === stationId);
      if (!station) return;
      currentTierEditStation = station;
      selectedTierId = getStationTier(station).id;
      const subtitle = $("tierModalSubtitle");
      if (subtitle) {
        subtitle.textContent = `Pick a tier for ${station.placeName || station.title || "this station"}. Higher tiers reward users with more Cycl Coins per recycled bottle.`;
      }
      renderTierGrid();
      const modal = $("tierModal");
      if (!modal) return;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeTierModal() {
      const modal = $("tierModal");
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      currentTierEditStation = null;
      selectedTierId = null;
    }

    function renderStationHoursEditor() {
      const grid = $("stationEditHoursGrid");
      if (!grid) return;
      grid.innerHTML = OPENING_DAY_OPTIONS.map((day) => `
        <div class="station-hours-row" data-hours-row="${day.id}">
          <div class="station-hours-day">${day.short}</div>
          <input id="stationHoursOpen_${day.id}" type="time" aria-label="${day.label} opening time">
          <input id="stationHoursClose_${day.id}" type="time" aria-label="${day.label} closing time">
          <label class="station-hours-closed"><input id="stationHoursClosed_${day.id}" type="checkbox" data-hours-closed="${day.id}">Closed</label>
        </div>
      `).join("");
    }

    function syncStationHoursRow(dayId) {
      const row = document.querySelector(`[data-hours-row="${dayId}"]`);
      const closed = $(`stationHoursClosed_${dayId}`)?.checked || false;
      const openInput = $(`stationHoursOpen_${dayId}`);
      const closeInput = $(`stationHoursClose_${dayId}`);
      if (row) row.classList.toggle("is-closed", closed);
      if (openInput) openInput.disabled = closed;
      if (closeInput) closeInput.disabled = closed;
    }

    function setStationEditHours(hours) {
      OPENING_DAY_OPTIONS.forEach((day) => {
        const rule = normalizeOpeningDay(hours?.[day.id] || DEFAULT_OPENING_DAY);
        const openInput = $(`stationHoursOpen_${day.id}`);
        const closeInput = $(`stationHoursClose_${day.id}`);
        const closedInput = $(`stationHoursClosed_${day.id}`);
        if (openInput) openInput.value = rule.open;
        if (closeInput) closeInput.value = rule.close;
        if (closedInput) closedInput.checked = rule.closed;
        syncStationHoursRow(day.id);
      });
    }

    function readStationEditOpeningHours() {
      return OPENING_DAY_OPTIONS.reduce((hours, day) => {
        hours[day.id] = normalizeOpeningDay({
          open: $(`stationHoursOpen_${day.id}`)?.value,
          close: $(`stationHoursClose_${day.id}`)?.value,
          closed: $(`stationHoursClosed_${day.id}`)?.checked || false,
        });
        return hours;
      }, {});
    }

    function closeStationEditModal() {
      const modal = $("stationEditModal");
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      currentStationEditStation = null;
      const message = $("stationEditMessage");
      if (message) {
        message.textContent = "";
        message.className = "message";
      }
    }

    function openStationEditModal(stationId) {
      const station = stationRecords.find((item) => item.id === stationId);
      if (!station) return;
      currentStationEditStation = station;
      $("stationEditId").value = station.id;
      $("stationEditName").value = station.placeName || station.title || "Cycl station";
      $("stationEditAddress").value = station.address || station.location || "";
      $("stationEditArea").value = station.location || station.city || "";
      const subtitle = $("stationEditModalSubtitle");
      if (subtitle) subtitle.textContent = `Update details for ${station.placeName || station.title || "this station"}.`;
      setStationEditHours(getStationOpeningHours(station));
      const modal = $("stationEditModal");
      if (!modal) return;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      window.requestAnimationFrame(() => $("stationEditName")?.focus());
    }

    async function saveStationDetails(event) {
      event.preventDefault();
      if (!currentStationEditStation || !currentPartner) return;
      if (requireHttpOrigin("saving station details")) return;
      const submitButton = $("stationEditSubmitButton");
      const message = $("stationEditMessage");
      const originalLabel = submitButton.textContent;
      const stationName = $("stationEditName").value.trim();
      const stationAddress = $("stationEditAddress").value.trim();
      const stationArea = $("stationEditArea").value.trim();

      if (!stationName || !stationAddress) {
        if (message) {
          message.textContent = "Station name and address are required.";
          message.className = "message show error";
        }
        return;
      }

      const localUpdates = {
        title: stationName,
        placeName: stationName,
        address: stationAddress,
        location: stationArea,
        openingHours: readStationEditOpeningHours(),
      };

      submitButton.disabled = true;
      submitButton.textContent = "Saving...";
      try {
        await updateDoc(doc(db, collections.stations, currentStationEditStation.id), {
          ...localUpdates,
          openingHoursUpdatedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          updatedByPartnerId: currentPartner.id,
          updatedByPartnerCompanyName: currentPartner.companyName || "",
        });
        const target = stationRecords.find((item) => item.id === currentStationEditStation.id);
        if (target) Object.assign(target, localUpdates);
        renderDashboard();
        closeStationEditModal();
      } catch (error) {
        if (message) {
          message.textContent = error.message || "Could not save station.";
          message.className = "message show error";
        } else {
          window.alert(error.message || "Could not save station.");
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }

    async function startPartnerCheckout(planId, stationId = "partner_portal", button = null) {
      if (!currentPartner) return;
      if (requireHttpOrigin("starting Stripe Checkout")) return;
      const plan = PLAN_BY_ID[planId];
      if (!plan || !plan.stripeTier) return;
      const originalLabel = button?.textContent;
      if (button) {
        button.disabled = true;
        button.textContent = "Opening Stripe...";
      }
      try {
        const createCheckout = httpsCallable(cloudFunctions, "createPartnerPortalCheckoutSession");
        const url = new URL(window.location.href);
        url.searchParams.set("billing", "success");
        const cancelUrl = new URL(window.location.href);
        cancelUrl.searchParams.set("billing", "cancelled");
        const result = await createCheckout({
          tier: plan.stripeTier,
          stationId,
          successUrl: url.toString(),
          cancelUrl: cancelUrl.toString(),
        });
        const checkoutUrl = result?.data?.url;
        if (!checkoutUrl) throw new Error("Stripe Checkout did not return a URL.");
        window.location.href = checkoutUrl;
      } catch (error) {
        window.alert(getReadableCallableError(error, "Could not start Stripe Checkout."));
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      }
    }

    async function startPartnerSetupSession(button = null) {
      if (!currentPartner) return;
      if (requireHttpOrigin("saving a Stripe card")) return;
      const originalLabel = button?.textContent;
      if (button) {
        button.disabled = true;
        button.textContent = "Opening Stripe...";
      }
      try {
        const createSetupSession = httpsCallable(cloudFunctions, "createPartnerPortalSetupSession");
        const url = new URL(window.location.href);
        url.searchParams.set("billing", "card_saved");
        const cancelUrl = new URL(window.location.href);
        cancelUrl.searchParams.set("billing", "setup_cancelled");
        const result = await createSetupSession({
          successUrl: url.toString(),
          cancelUrl: cancelUrl.toString(),
        });
        const setupUrl = result?.data?.url;
        if (!setupUrl) throw new Error("Stripe card setup did not return a URL.");
        window.location.href = setupUrl;
      } catch (error) {
        window.alert(getReadableCallableError(error, "Could not start Stripe card setup."));
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      }
    }

    async function saveStationTier() {
      if (!currentTierEditStation || !selectedTierId) return;
      if (requireHttpOrigin("upgrading the station")) return;
      const button = $("tierConfirmButton");
      const originalLabel = button.textContent;
      const tier = TIER_BY_ID[selectedTierId] || TIER_BY_ID.standard;
      const plan = PLAN_BY_ID[tier.planId] || PLAN_BY_ID.free;
      if (tier.monthlyFee > 0) {
        await startPartnerCheckout(plan.id, currentTierEditStation.id, button);
        return;
      }
      button.disabled = true;
      button.textContent = "Saving...";
      try {
        await updateDoc(doc(db, collections.stations, currentTierEditStation.id), {
          tier: selectedTierId,
          tierUpdatedAt: serverTimestamp(),
        });
        const target = stationRecords.find((s) => s.id === currentTierEditStation.id);
        if (target) target.tier = selectedTierId;
        renderDashboard();
        closeTierModal();
      } catch (error) {
        window.alert(error.message || "Could not update station tier.");
        button.disabled = false;
        button.textContent = originalLabel;
      }
    }

    function cleanCouponCodePart(value) {
      return String(value || "").trim().replace(/^\uFEFF/, "").replace(/^"|"$/g, "").replace(/""/g, '"');
    }

    const couponCodeHeaders = ["code", "coupon", "couponcode", "voucher", "vouchercode"];
    const couponExpiryHeaders = ["", "expiresat", "expiry", "expirydate", "expiration", "expirationdate", "validuntil"];

    function isCouponCodeHeader(code, expiresAt) {
      const normalizedCode = code.toLowerCase().replace(/[\s_-]+/g, "");
      const normalizedExpiry = expiresAt.toLowerCase().replace(/[\s_-]+/g, "");
      return couponCodeHeaders.includes(normalizedCode) && couponExpiryHeaders.includes(normalizedExpiry);
    }

    function looksLikeCouponExpiry(value) {
      const normalized = value.toLowerCase().replace(/[\s_-]+/g, "");
      return couponExpiryHeaders.includes(normalized) || /^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/.test(value);
    }

    function isValidCouponExpiry(value) {
      if (!value) return true;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
    }

    function getInvalidCouponExpiry(codeLines) {
      return codeLines.find((item) => item.expiresAt && !isValidCouponExpiry(item.expiresAt));
    }

    function setRewardCodesMessage(text = "", type = "info") {
      const message = $("rewardCodesMessage");
      if (!message) return;
      message.textContent = text;
      message.className = text ? `message show ${type}` : "message";
    }

    function parseCodeRow(line) {
      const separator = line.includes(",") ? "," : (line.includes(";") ? ";" : "");
      if (!separator) return [{ code: cleanCouponCodePart(line), expiresAt: "" }];
      const parts = line.split(separator).map(cleanCouponCodePart);
      if (separator === ";" && parts.length > 1 && !looksLikeCouponExpiry(parts[1] || "")) {
        return parts.map((code) => ({ code, expiresAt: "" }));
      }
      return [{ code: parts[0] || "", expiresAt: parts[1] || "" }];
    }

    function parseCodes(text) {
      return text.split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .flatMap(parseCodeRow)
        .filter((item) => item.code && !isCouponCodeHeader(item.code, item.expiresAt));
    }

    function importRewardCodeFileText(text) {
      const imported = String(text || "").replace(/\r\n?/g, "\n").trim();
      if (!imported) return false;
      const textarea = $("rewardCodes");
      const current = textarea.value.trim();
      textarea.value = current ? `${current}\n${imported}` : imported;
      return true;
    }

    function validateRewardCodesField({ focus = false } = {}) {
      const textarea = $("rewardCodes");
      const codeLines = parseCodes(textarea.value);
      const invalidCouponExpiry = getInvalidCouponExpiry(codeLines);

      if (invalidCouponExpiry) {
        setRewardCodesMessage(`Coupon expiry dates must be written as YYYY-MM-DD, for example 2026-12-31. Check ${invalidCouponExpiry.code}.`, "error");
        textarea.setAttribute("aria-invalid", "true");
        if (focus) textarea.focus();
        return { valid: false, codeLines };
      }

      textarea.removeAttribute("aria-invalid");
      if (codeLines.length) {
        setRewardCodesMessage(`${codeLines.length} coupon code${codeLines.length === 1 ? "" : "s"} ready.`, "success");
      } else {
        setRewardCodesMessage("");
      }
      return { valid: true, codeLines };
    }

    document.querySelectorAll("[data-auth-tab]").forEach((button) => {
      button.addEventListener("click", () => showAuthTab(button.dataset.authTab));
    });

    document.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.dataset.section;
        document.querySelectorAll("[data-section]").forEach((navButton) => navButton.classList.toggle("active", navButton.dataset.section === section));
        document.querySelectorAll(".section").forEach((panel) => panel.classList.toggle("active", panel.id === `section-${section}`));
        if (section === "analytics") renderAnalytics();
        if (section === "billing") refreshPartnerBillingStatus({ silent: true });
        if (section === "support" && partnerSupport.selectedThreadId) {
          const thread = partnerSupport.threads.find((t) => t.id === partnerSupport.selectedThreadId);
          if (isThreadUnreadForPartner(thread)) {
            markPartnerSupportThreadRead(partnerSupport.selectedThreadId);
          }
        }
        if (PARTNER_TOURS[section]) showPartnerTour(section);
        closeMobileSidebar();
      });
    });

    /* === Mobile sidebar (burger menu) === */
    const sidebarEl = document.querySelector("aside.sidebar");
    const sidebarBackdropEl = $("sidebarBackdrop");
    const sidebarToggleEl = $("sidebarToggle");

    function openMobileSidebar() {
      if (!sidebarEl) return;
      sidebarEl.classList.add("is-open");
      sidebarBackdropEl.classList.add("is-open");
      sidebarToggleEl.classList.add("is-open");
      sidebarToggleEl.setAttribute("aria-expanded", "true");
    }

    function closeMobileSidebar() {
      if (!sidebarEl) return;
      sidebarEl.classList.remove("is-open");
      sidebarBackdropEl.classList.remove("is-open");
      sidebarToggleEl.classList.remove("is-open");
      sidebarToggleEl.setAttribute("aria-expanded", "false");
    }

    if (sidebarToggleEl && sidebarEl) {
      sidebarToggleEl.addEventListener("click", () => {
        if (sidebarEl.classList.contains("is-open")) closeMobileSidebar();
        else openMobileSidebar();
      });
      sidebarBackdropEl.addEventListener("click", closeMobileSidebar);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sidebarEl.classList.contains("is-open")) closeMobileSidebar();
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 900) closeMobileSidebar();
      });
    }

    // === PREMIUM TRIAL ===
    (function () {
      const STORAGE_KEY = "cyclTrialStart";
      const TRIAL_DAYS = 30;

      const startBtn = document.getElementById("startTrialBtn");
      const banner = document.getElementById("trialBanner");
      const daysLeftEl = document.getElementById("trialDaysLeft");
      if (!startBtn) return;

      function activateTrial(startDate) {
        const now = Date.now();
        const elapsed = Math.floor((now - startDate) / 86400000);
        const remaining = Math.max(0, TRIAL_DAYS - elapsed);
        // Unlock content
        const wrapper = document.querySelector(".premium-wrapper");
        if (wrapper) wrapper.classList.remove("is-locked");
        // Show banner
        if (banner) {
          banner.classList.add("is-visible");
          if (daysLeftEl) {
            if (remaining > 0) {
              daysLeftEl.textContent = remaining + (remaining === 1 ? " day" : " days") + " remaining";
            } else {
              daysLeftEl.textContent = "Trial ended";
              banner.style.background = "linear-gradient(135deg, #8B2020 0%, #C44A3A 100%)";
            }
          }
        }
      }

      // Restore trial if already started
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) activateTrial(parseInt(stored, 10));

      startBtn.addEventListener("click", function () {
        let start = localStorage.getItem(STORAGE_KEY);
        if (!start) {
          start = Date.now().toString();
          localStorage.setItem(STORAGE_KEY, start);
        }
        activateTrial(parseInt(start, 10));
      });
    })();

    (function () {
      const input = document.getElementById("supportChatInput");
      const sendBtn = document.getElementById("supportChatSend");
      if (!input || !sendBtn) return;

      sendBtn.addEventListener("click", () => sendPartnerSupportMessage());
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendPartnerSupportMessage();
        }
      });
      input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
      });
    })();

    document.querySelectorAll("[data-cat-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.catFilter;
        if (value === analyticsFilters.cat) return;
        analyticsFilters.cat = value;
        document.querySelectorAll("[data-cat-filter]").forEach((b) =>
          b.classList.toggle("is-active", b.dataset.catFilter === value),
        );
        renderAnalytics();
      });
    });

    document.querySelectorAll("[data-geo-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.geoFilter;
        if (value === analyticsFilters.geo) return;
        analyticsFilters.geo = value;
        document.querySelectorAll("[data-geo-filter]").forEach((b) =>
          b.classList.toggle("is-active", b.dataset.geoFilter === value),
        );
        renderAnalytics();
      });
    });

    document.querySelectorAll("[data-iso]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = Number(button.dataset.iso || 5);
        if (value === analyticsCatchmentKm) return;
        analyticsCatchmentKm = value;
        document.querySelectorAll("[data-iso]").forEach((b) => {
          b.classList.toggle("is-active", Number(b.dataset.iso || 5) === value);
        });
        if (analyticsHasRendered) renderAnalytics();
      });
    });

    $("analyticsRefreshButton").addEventListener("click", () => {
      demographicsCache = null;
      renderAnalytics({ force: true });
    });

    $("rewardImage").addEventListener("input", () => {
      if (!selectedRewardImageFile) syncRewardImagePreview();
    });

    $("rewardLocation").addEventListener("input", () => {
      if ($("rewardIsOnline").checked) return;
      $("rewardLocationLat").value = "";
      $("rewardLocationLng").value = "";
      const queryText = $("rewardLocation").value.trim();
      window.clearTimeout(rewardLocationSearchTimer);

      if (queryText.length < 2) {
        hideRewardLocationSuggestions();
        return;
      }

      rewardLocationSearchTimer = window.setTimeout(() => {
        searchRewardLocations(queryText);
      }, 220);
    });

    $("rewardLocationSuggestions").addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("[data-location-index]");
      if (!button) return;
      const feature = rewardLocationSuggestions[Number(button.dataset.locationIndex)];
      if (!feature) return;
      applyRewardLocationSuggestion(feature);
    });

    // Address search — signup form
    const _signupAddrAbort = { current: null };
    $("signupAddress").addEventListener("input", () => {
      $("signupAddressLat").value = "";
      $("signupAddressLng").value = "";
      const queryText = $("signupAddress").value.trim();
      window.clearTimeout(signupAddressSearchTimer);
      if (queryText.length < 2) { hideAddressSuggestions("signupAddressSuggestions"); return; }
      signupAddressSearchTimer = window.setTimeout(() => {
        searchAddressLocations(queryText, "signupAddressSuggestions", applySignupAddressSuggestion, _signupAddrAbort);
      }, 220);
    });
    $("signupAddress").addEventListener("blur", () => {
      setTimeout(() => hideAddressSuggestions("signupAddressSuggestions"), 200);
    });

    // Address search — profile form
    const _profileAddrAbort = { current: null };
    $("profileAddress").addEventListener("input", () => {
      $("profileAddressLat").value = "";
      $("profileAddressLng").value = "";
      const queryText = $("profileAddress").value.trim();
      window.clearTimeout(profileAddressSearchTimer);
      if (queryText.length < 2) { hideAddressSuggestions("profileAddressSuggestions"); return; }
      profileAddressSearchTimer = window.setTimeout(() => {
        searchAddressLocations(queryText, "profileAddressSuggestions", applyProfileAddressSuggestion, _profileAddrAbort);
      }, 220);
    });
    $("profileAddress").addEventListener("blur", () => {
      setTimeout(() => hideAddressSuggestions("profileAddressSuggestions"), 200);
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".location-search-shell")) {
        hideRewardLocationSuggestions();
        hideAddressSuggestions("signupAddressSuggestions");
        hideAddressSuggestions("profileAddressSuggestions");
      }
    });

    $("rewardIsOnline").addEventListener("change", syncRewardChannelFields);
    $("rewardAvailabilityMode").addEventListener("change", syncRewardAvailabilityFields);

    $("rewardImageFile").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      releaseRewardImagePreviewUrl();

      if (!file) {
        selectedRewardImageFile = null;
        syncRewardImagePreview();
        return;
      }

      selectedRewardImageFile = file;
      selectedRewardImagePreviewUrl = URL.createObjectURL(file);
      renderRewardImagePreview(selectedRewardImagePreviewUrl, `${file.name} selected. Cycl will compress and store this image.`);
    });

    $("rewardCodesFile").addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const imported = importRewardCodeFileText(await file.text());
        if (!imported) {
          setRewardCodesMessage("No coupon codes found in that CSV file.", "error");
          return;
        }
        validateRewardCodesField();
      } catch (error) {
        setRewardCodesMessage(error.message || "Could not read that CSV file.", "error");
      } finally {
        event.target.value = "";
      }
    });

    $("rewardCodes").addEventListener("input", () => validateRewardCodesField());

    $("clearRewardImageButton").addEventListener("click", () => clearSelectedRewardImage({ clearUrl: true }));

    $("loginForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      if (requireHttpOrigin("logging in")) return;
      try {
        await signInWithEmailAndPassword(auth, $("loginEmail").value, $("loginPassword").value);
      } catch (error) {
        showMessage(getReadableFirebaseError(error, "Login failed."), "error");
      }
    });

    $("signupForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      if (requireHttpOrigin("creating a partner account")) return;
      try {
        const countryCode = $("signupCountry").value;
        const businessCategoryId = $("signupBusinessCategory").value;
        const businessCategoryMeta = CATEGORY_BY_ID[businessCategoryId] || BUSINESS_CATEGORIES[0];
        const businessSubcategory = $("signupBusinessSubcategory").value;
        const credential = await createUserWithEmailAndPassword(auth, $("signupEmail").value, $("signupPassword").value);
        await setDoc(doc(db, collections.partners, credential.user.uid), {
          companyName: $("signupCompany").value.trim(),
          contactFirstName: $("signupFirstName").value.trim(),
          contactLastName: $("signupLastName").value.trim(),
          email: $("signupEmail").value.trim(),
          phone: $("signupPhone").value.trim(),
          address: $("signupAddress").value.trim(),
          city: $("signupCity").value || "",
          lat: parseFloat($("signupAddressLat").value) || null,
          lng: parseFloat($("signupAddressLng").value) || null,
          countryCode,
          country: getCountryName(countryCode),
          businessCategory: businessCategoryId,
          businessCategoryName: businessCategoryMeta.name,
          businessSubcategory,
          businessType: businessSubcategory || businessCategoryMeta.name,
          about: $("signupAbout").value.trim(),
          status: "active",
          accountType: "business_partner",
          billingModel: "marketplace_performance",
          pricing,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showMessage("Welcome aboard. Loading your portal…", "success");
      } catch (error) {
        showMessage(getReadableFirebaseError(error, "Signup failed."), "error");
      }
    });

    $("rewardForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      if (requireHttpOrigin("publishing rewards")) return;
      if (!currentPartner) return;
      const editId = $("rewardEditId").value;
      const placement = $("rewardPlacement").value;
      const isOnline = $("rewardIsOnline").checked;
      const availabilityMode = $("rewardAvailabilityMode").value;
      const availabilityCountRaw = $("rewardAvailabilityCount").value.trim();
      const rewardCodesValidation = validateRewardCodesField({ focus: true });
      const codeLines = rewardCodesValidation.codeLines;
      const sponsored = placement !== "organic";
      const submitButton = $("rewardSubmitButton");
      const originalSubmitLabel = submitButton.textContent;

      try {
        if (!rewardCodesValidation.valid) return;

        if (availabilityMode === "limited" && availabilityCountRaw === "") {
          window.alert("Add how many rewards are available or switch availability to unlimited.");
          return;
        }

        if (!editId) {
          const limit = getCurrentRewardLimit();
          if (getActiveRewards().length >= limit) {
            const plan = getCurrentBillingPlan();
            window.alert(`Your ${plan?.name || "current"} plan allows up to ${limit} active reward${limit === 1 ? "" : "s"}. Pause or archive one, or upgrade your plan to add more.`);
            return;
          }
        }

        submitButton.disabled = true;
        submitButton.textContent = selectedRewardImageFile ? "Uploading image..." : originalSubmitLabel;

        let imageUrl = $("rewardImage").value.trim();
        let imageStoragePath = $("rewardImageStoragePath").value.trim();
        const rewardAddress = $("rewardAddress").value.trim();
        const rewardPhysicalAddress = $("rewardPhysicalAddress").value.trim();
        const latitudeRaw = $("rewardLocationLat").value.trim();
        const longitudeRaw = $("rewardLocationLng").value.trim();
        const latitude = Number(latitudeRaw);
        const longitude = Number(longitudeRaw);
        const availabilityCount = Math.max(0, Math.round(Number(availabilityCountRaw || 0)));
        const hasCoordinates =
          latitudeRaw !== "" &&
          longitudeRaw !== "" &&
          Number.isFinite(latitude) &&
          Number.isFinite(longitude);

        if (selectedRewardImageFile) {
          const uploadedImage = await uploadRewardImageFile(selectedRewardImageFile);
          imageUrl = uploadedImage.imageUrl;
          imageStoragePath = uploadedImage.imagePath;
          $("rewardImage").value = imageUrl;
          $("rewardImageStoragePath").value = imageStoragePath;
        }

        const payload = {
          partnerId: currentPartner.id,
          partnerCompanyName: currentPartner.companyName,
          ownerType: "partner",
          source: "partner_portal",
          title: $("rewardTitle").value.trim(),
          subtitle: $("rewardSubtitle").value.trim(),
          about: $("rewardDescription").value.trim(),
          description: $("rewardDescription").value.trim(),
          image: imageUrl,
          imageStoragePath,
          address: rewardAddress,
          rewardUrl: rewardAddress,
          cost: Number($("rewardCost").value),
          amount: Number($("rewardCost").value),
          location: isOnline ? "" : $("rewardLocation").value.trim(),
          city: isOnline ? "" : $("rewardLocation").value.trim(),
          isOnline,
          physicalAddress: isOnline ? "" : rewardPhysicalAddress,
          country: $("rewardCountry").value,
          coordinates: !isOnline && hasCoordinates ? [latitude, longitude] : null,
          availabilityMode,
          left: availabilityMode === "limited" ? availabilityCount : null,
          placement,
          sponsored,
          sponsorLabel: sponsored ? "Sponsored" : "",
          status: "active",
          codeMode: codeLines.length ? "bulk_codes" : "no_code",
          hasCodes: Boolean(codeLines.length),
          marketplaceBilling: {
            placementMonthlyDkk: pricing[placement] || 0,
            activationFeeDkk: pricing.activation,
            validationFeeDkk: pricing.validation,
          },
          updatedAt: serverTimestamp(),
        };

        let rewardId = editId;
        if (editId) {
          await updateDoc(doc(db, collections.rewards, editId), payload);
        } else {
          const rewardRef = await addDoc(collection(db, collections.rewards), {
            ...payload,
            clicks: 0,
            activations: 0,
            validations: 0,
            createdAt: serverTimestamp(),
          });
          rewardId = rewardRef.id;
        }

        if (codeLines.length) {
          await Promise.all(codeLines.map((item) => addDoc(collection(db, collections.rewardCodes), {
            rewardId,
            partnerId: currentPartner.id,
            code: item.code,
            expiresAt: item.expiresAt,
            status: "available",
            createdAt: serverTimestamp(),
          })));
        }

        resetRewardForm();
        closeRewardModal();
      } catch (error) {
        window.alert(error.message || "Could not save reward.");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalSubmitLabel;
      }
    });

    $("openRewardModal").addEventListener("click", () => {
      const limit = getCurrentRewardLimit();
      const activeCount = getActiveRewards().length;
      if (activeCount >= limit) {
        const plan = getCurrentBillingPlan();
        window.alert(`Your ${plan?.name || "current"} plan allows up to ${limit} active reward${limit === 1 ? "" : "s"}. Pause or archive one, or upgrade your plan to add more.`);
        return;
      }
      resetRewardForm();
      openRewardModal();
    });

    renderStationHoursEditor();
    $("stationEditHoursGrid")?.addEventListener("change", (event) => {
      const closedInput = event.target.closest("[data-hours-closed]");
      if (!closedInput) return;
      syncStationHoursRow(closedInput.dataset.hoursClosed);
    });
    $("stationEditForm")?.addEventListener("submit", saveStationDetails);

    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-modal-close]")) return;
      if ($("rewardModal").classList.contains("open")) {
        resetRewardForm();
        closeRewardModal();
      }
      if ($("tierModal").classList.contains("open")) {
        closeTierModal();
      }
      if ($("boostModal")?.classList.contains("open")) {
        closeBoostModal();
      }
      if ($("stationEditModal").classList.contains("open")) {
        closeStationEditModal();
      }
      if ($("invoiceHistoryModal")?.classList.contains("open")) {
        closeInvoiceHistoryModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if ($("rewardModal").classList.contains("open")) {
        resetRewardForm();
        closeRewardModal();
      }
      if ($("tierModal").classList.contains("open")) {
        closeTierModal();
      }
      if ($("boostModal")?.classList.contains("open")) {
        closeBoostModal();
      }
      if ($("stationEditModal").classList.contains("open")) {
        closeStationEditModal();
      }
      if ($("invoiceHistoryModal")?.classList.contains("open")) {
        closeInvoiceHistoryModal();
      }
    });

    $("rewardList").addEventListener("click", async (event) => {
      const button = event.target.closest("[data-reward-action]");
      if (!button) return;
      const reward = rewardRecords.find((item) => item.id === button.dataset.id);
      if (!reward) return;

      if (button.dataset.rewardAction === "boost") {
        openBoostModal(reward.id);
        return;
      }

      if (button.dataset.rewardAction === "edit") {
        clearSelectedRewardImage();
        hideRewardLocationSuggestions();
        setRewardCodesMessage("");
        $("rewardEditId").value = reward.id;
        $("rewardTitle").value = reward.title || "";
        $("rewardSubtitle").value = reward.subtitle || currentPartner.companyName || "";
        $("rewardDescription").value = reward.about || reward.description || "";
        $("rewardIsOnline").checked = Boolean(reward.isOnline);
        $("rewardLocation").value = reward.location || currentPartner.city || "";
        $("rewardLocationLat").value = Array.isArray(reward.coordinates) ? String(reward.coordinates[0] ?? "") : "";
        $("rewardLocationLng").value = Array.isArray(reward.coordinates) ? String(reward.coordinates[1] ?? "") : "";
        $("rewardPhysicalAddress").value = reward.physicalAddress || "";
        $("rewardCountry").value = reward.country || currentPartner.countryCode || "DK";
        $("rewardCost").value = reward.cost || 25;
        $("rewardPlacement").value = reward.placement || "organic";
        $("rewardAvailabilityMode").value = typeof reward.left === "number" && !Number.isNaN(reward.left) ? "limited" : (reward.availabilityMode || "unlimited");
        $("rewardAvailabilityCount").value = typeof reward.left === "number" && !Number.isNaN(reward.left) ? String(reward.left) : "";
        $("rewardImage").value = reward.image || "";
        $("rewardImageStoragePath").value = reward.imageStoragePath || "";
        $("rewardAddress").value = reward.address || reward.rewardUrl || "";
        $("rewardCodes").value = "";
        $("rewardCodes").removeAttribute("aria-invalid");
        $("rewardFormTitle").innerHTML = "Edit <em>reward.</em>";
        $("rewardSubmitButton").textContent = "Save reward";
        syncRewardChannelFields();
        syncRewardAvailabilityFields();
        syncRewardImagePreview();
        openRewardModal();
        return;
      }

      if (button.dataset.rewardAction === "toggle") {
        if (requireHttpOrigin("changing reward status")) return;
        const nextStatus = (reward.status || "active") === "active" ? "paused" : "active";
        if (nextStatus === "active") {
          const limit = getCurrentRewardLimit();
          if (getActiveRewards().length >= limit) {
            const plan = getCurrentBillingPlan();
            window.alert(`Your ${plan?.name || "current"} plan allows up to ${limit} active reward${limit === 1 ? "" : "s"}. Pause another one first, or upgrade your plan.`);
            return;
          }
        }
        await updateDoc(doc(db, collections.rewards, reward.id), { status: nextStatus, updatedAt: serverTimestamp() });
        return;
      }

      if (button.dataset.rewardAction === "archive") {
        if (requireHttpOrigin("archiving rewards")) return;
        const confirmed = window.confirm(`Archive ${reward.title || "this reward"}?`);
        if (!confirmed) return;
        await updateDoc(doc(db, collections.rewards, reward.id), { status: "archived", updatedAt: serverTimestamp() });
        return;
      }

      if (button.dataset.rewardAction === "restore") {
        if (requireHttpOrigin("restoring rewards")) return;
        const limit = getCurrentRewardLimit();
        if (getActiveRewards().length >= limit) {
          const plan = getCurrentBillingPlan();
          window.alert(`Your ${plan?.name || "current"} plan allows up to ${limit} active reward${limit === 1 ? "" : "s"}. The reward will be restored as paused — pause another to activate it.`);
          await updateDoc(doc(db, collections.rewards, reward.id), { status: "paused", updatedAt: serverTimestamp() });
          return;
        }
        await updateDoc(doc(db, collections.rewards, reward.id), { status: "active", updatedAt: serverTimestamp() });
      }
    });

    $("rewardStatusTabs")?.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-reward-filter]");
      if (!tab) return;
      const next = tab.dataset.rewardFilter;
      if (next === rewardStatusFilter) return;
      rewardStatusFilter = next;
      renderRewardList();
    });

    $("stationList").addEventListener("click", (event) => {
      const editBtn = event.target.closest("[data-station-action='edit']");
      if (editBtn) {
        openStationEditModal(editBtn.dataset.id);
        return;
      }
      const upgradeBtn = event.target.closest("[data-station-action='upgrade']");
      if (upgradeBtn) {
        openTierModal(upgradeBtn.dataset.id);
      }
    });

    $("tierGrid").addEventListener("click", (event) => {
      const card = event.target.closest(".tier-card");
      if (!card) return;
      selectedTierId = card.dataset.tierId;
      renderTierGrid();
    });

    $("tierConfirmButton").addEventListener("click", saveStationTier);

    $("boostGrid")?.addEventListener("click", (event) => {
      if (event.target.closest("input")) return;
      const card = event.target.closest(".boost-card");
      if (!card) return;
      selectedBoostOptionId = card.dataset.boostId;
      renderBoostGrid();
    });

    $("boostConfirmButton")?.addEventListener("click", activateBoost);

    $("billingPlanGrid")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-plan-id]");
      if (!button || button.disabled) return;
      startPartnerCheckout(button.dataset.planId, "partner_portal", button);
    });

    $("refreshBillingButton")?.addEventListener("click", () => refreshPartnerBillingStatus());

    document.addEventListener("click", (event) => {
      if (event.target.closest("#payOutstandingBoostsButton")) {
        payOutstandingBoosts();
      }
    });

    $("billingPortalButton")?.addEventListener("click", async () => {
      if (!currentPartner) return;
      const button = $("billingPortalButton");
      if (!partnerBillingStatus.loaded && !partnerBillingStatus.loading) {
        await refreshPartnerBillingStatus({ silent: true });
      }
      if (!hasSavedBillingCard()) {
        await startPartnerSetupSession(button);
        return;
      }
      if (requireHttpOrigin("opening Stripe Billing Portal")) return;
      const originalLabel = button.textContent;
      button.disabled = true;
      button.textContent = "Opening Stripe...";
      try {
        const createPortal = httpsCallable(cloudFunctions, "createPartnerPortalBillingSession");
        const result = await createPortal({ returnUrl: window.location.href });
        const portalUrl = result?.data?.url;
        if (!portalUrl) throw new Error("Stripe Billing Portal did not return a URL.");
        window.location.href = portalUrl;
      } catch (error) {
        window.alert(getReadableCallableError(error, "Could not open Stripe Billing Portal."));
        button.disabled = false;
        button.textContent = originalLabel;
      }
    });

    $("cancelSubscriptionButton")?.addEventListener("click", async () => {
      if (!currentPartner) return;
      const button = $("cancelSubscriptionButton");
      const subscription = partnerBillingStatus.subscription;
      if (!hasLiveStripeSubscription(subscription)) return;
      const planName = PLAN_BY_ID[subscription.planId]?.name || subscription.planLabel || "your plan";
      const renewalText = subscription.currentPeriodEnd
        ? ` Your access stays active until ${new Date(subscription.currentPeriodEnd).toLocaleDateString("da-DK")}.`
        : "";
      const confirmed = window.confirm(`Cancel your ${planName} subscription?${renewalText}\n\nYou will be taken to Stripe to confirm the cancellation. After it ends, your reward limit drops to the Free tier (3 active rewards) and any extras will be paused automatically.`);
      if (!confirmed) return;
      if (requireHttpOrigin("cancelling subscription")) return;
      const originalLabel = button.textContent;
      button.disabled = true;
      button.textContent = "Opening Stripe...";
      try {
        const createPortal = httpsCallable(cloudFunctions, "createPartnerPortalBillingSession");
        const result = await createPortal({ returnUrl: window.location.href });
        const portalUrl = result?.data?.url;
        if (!portalUrl) throw new Error("Stripe Billing Portal did not return a URL.");
        window.location.href = portalUrl;
      } catch (error) {
        window.alert(getReadableCallableError(error, "Could not open Stripe Billing Portal."));
        button.disabled = false;
        button.textContent = originalLabel;
      }
    });

    $("stationList").addEventListener("click", async (event) => {
      const button = event.target.closest("[data-station-action='collect']");
      if (!button || !currentPartner) return;
      if (requireHttpOrigin("requesting collection")) return;
      const station = stationRecords.find((item) => item.id === button.dataset.id);
      if (!station) return;

      try {
        await addDoc(collection(db, collections.collectionRequests), {
          partnerId: currentPartner.id,
          partnerCompanyName: currentPartner.companyName,
          stationId: station.id,
          stationTitle: station.title || station.placeName || station.id,
          placeName: station.placeName || "",
          currentCap: Number(station.currentCap || 0),
          capacity: Number(station.capacity || 0),
          status: "requested",
          reason: "partner_changed_full_bag",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        try {
          await updateDoc(doc(db, collections.stations, station.id), {
            collectionRequested: true,
            collectionRequestStatus: "requested",
            collectionRequestedAt: serverTimestamp(),
            collectionRequestedByPartnerId: currentPartner.id,
          });
        } catch (stationUpdateError) {
          console.warn("Collection request saved, but station status could not be updated.", stationUpdateError);
        }
      } catch (error) {
        window.alert(error.message || "Could not request collection.");
      }
    });

    $("stationList").addEventListener("click", async (event) => {
      const button = event.target.closest("[data-station-action='empty']");
      if (!button || !currentPartner) return;
      if (button.disabled) return;
      if (requireHttpOrigin("emptying a station")) return;
      const station = stationRecords.find((item) => item.id === button.dataset.id);
      if (!station) return;

      const stationLabel = station.placeName || station.title || "this station";
      const confirmed = window.confirm(`Mark ${stationLabel} as emptied? This resets the bag count to 0.`);
      if (!confirmed) return;

      const card = button.closest(".station-card");
      const allButtons = card ? Array.from(card.querySelectorAll(".small-action")) : [button];
      const originalLabel = button.innerHTML;
      const COUNTDOWN_SECONDS = 3;

      isAnimatingStationEmpty = true;
      allButtons.forEach((b) => { b.disabled = true; });

      let secondsLeft = COUNTDOWN_SECONDS;
      button.textContent = `Resetting in ${secondsLeft}s`;

      try {
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            secondsLeft -= 1;
            if (secondsLeft <= 0) {
              clearInterval(interval);
              resolve();
            } else {
              button.textContent = `Resetting in ${secondsLeft}s`;
            }
          }, 1000);
        });

        button.textContent = "Resetting…";

        await updateDoc(doc(db, collections.stations, station.id), {
          currentCap: 0,
          lastEmptiedAt: serverTimestamp(),
          lastEmptiedByPartnerId: currentPartner.id,
          collectionRequested: false,
          collectionRequestStatus: "completed",
          collectionRequestCompletedAt: serverTimestamp(),
        });
      } catch (error) {
        button.innerHTML = originalLabel;
        allButtons.forEach((b) => { b.disabled = false; });
        window.alert(error.message || "Could not mark station as emptied.");
      } finally {
        isAnimatingStationEmpty = false;
        renderStationLists();
      }
    });

    $("invoiceHistoryButton")?.addEventListener("click", async () => {
      if (!currentPartner) return;
      if (requireHttpOrigin("loading invoice history")) return;
      openInvoiceHistoryModal();
    });

    $("invoiceHistorySearch")?.addEventListener("input", (event) => {
      partnerInvoiceHistory = {
        ...partnerInvoiceHistory,
        query: event.target.value || "",
      };
      renderInvoiceHistory();
    });

    $("logoutButton").addEventListener("click", () => signOut(auth));
    $("pendingLogoutButton").addEventListener("click", () => signOut(auth));
    $("profileSignOutButton").addEventListener("click", () => signOut(auth));

    $("profileForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!currentPartner) return;
      if (requireHttpOrigin("updating your profile")) return;
      const button = $("profileSaveButton");
      const originalLabel = button.textContent;
      const messageEl = $("profileMessage");
      button.disabled = true;
      button.textContent = "Saving…";
      try {
        const countryCode = $("profileCountry").value;
        const categoryId = $("profileBusinessCategory").value;
        const categoryMeta = CATEGORY_BY_ID[categoryId] || BUSINESS_CATEGORIES[0];
        const subcategory = $("profileBusinessSubcategory").value;
        const updates = {
          companyName: $("profileCompany").value.trim(),
          contactFirstName: $("profileFirstName").value.trim(),
          contactLastName: $("profileLastName").value.trim(),
          phone: $("profilePhone").value.trim(),
          website: $("profileWebsite").value.trim(),
          city: $("profileCity").value || currentPartner.city || "",
          address: $("profileAddress").value.trim(),
          lat: parseFloat($("profileAddressLat").value) || currentPartner.lat || null,
          lng: parseFloat($("profileAddressLng").value) || currentPartner.lng || null,
          countryCode,
          country: getCountryName(countryCode),
          businessCategory: categoryId,
          businessCategoryName: categoryMeta.name,
          businessSubcategory: subcategory,
          businessType: subcategory || categoryMeta.name,
          about: $("profileAbout").value.trim(),
          updatedAt: serverTimestamp(),
        };
        await updateDoc(doc(db, collections.partners, currentPartner.id), updates);
        Object.assign(currentPartner, updates);
        setText("partnerCompanyName", currentPartner.companyName || "Partner");
        setText("topbarPartnerName", currentPartner.companyName || "Partner");
        const metaSuffix = categoryMeta.name && subcategory && categoryMeta.name !== subcategory
          ? `${categoryMeta.name} · ${subcategory}`
          : (subcategory || categoryMeta.name || "Business");
        setText("partnerMeta", `${getCountryName(countryCode)} · ${metaSuffix}`);
        if (messageEl) {
          messageEl.textContent = "Profile saved.";
          messageEl.className = "message show success";
          setTimeout(() => { messageEl.className = "message"; }, 2400);
        }
      } catch (error) {
        if (messageEl) {
          messageEl.textContent = error.message || "Could not save profile.";
          messageEl.className = "message show error";
        }
      } finally {
        button.disabled = false;
        button.textContent = originalLabel;
      }
    });

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        stopLiveData();
        currentPartner = null;
        $("authLayout").style.display = "grid";
        $("pendingCard").style.display = "none";
        $("appShell").style.display = "none";
        $("logoutButton").style.display = "none";
        $("partnerOnboardingFloat").style.display = "none";
        hideCoachmark();
        setText("topbarPartnerName", "Partner");
        resolveAuthBoot();
        return;
      }

      try {
        await loadPartner(user);
      } catch (error) {
        stopLiveData();
        currentPartner = null;
        $("authLayout").style.display = "grid";
        $("pendingCard").style.display = "none";
        $("appShell").style.display = "none";
        $("logoutButton").style.display = "inline-block";
        $("partnerOnboardingFloat").style.display = "none";
        hideCoachmark();
        showMessage(getReadableFirebaseError(error, "Could not load the partner portal."), "error");
        resolveAuthBoot();
      }
    });

    $("dismissPartnerOnboardingButton").addEventListener("click", (event) => {
      event.stopPropagation();
      dismissPartnerOnboardingPrompt();
    });

    $("openPartnerOnboardingButton").addEventListener("click", () => {
      document.querySelector("[data-section='guide']")?.click();
      $("partnerOnboardingFloat").style.display = "none";
    });

    $("coachNext").addEventListener("click", advanceCoachStep);
    $("coachSkip").addEventListener("click", () => dismissPartnerTour());
    $("coachBackdrop").addEventListener("click", () => dismissPartnerTour());
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && currentTourKey) dismissPartnerTour();
    });

    populateCountries();
    populateBusinessCategorySelect($("signupBusinessCategory"));
    populateBusinessSubcategorySelect($("signupBusinessSubcategory"), $("signupBusinessCategory")?.value);
    populateBusinessCategorySelect($("profileBusinessCategory"));
    populateBusinessSubcategorySelect($("profileBusinessSubcategory"), $("profileBusinessCategory")?.value);
    wireBusinessCategoryCascade("signupBusinessCategory", "signupBusinessSubcategory");
    wireBusinessCategoryCascade("profileBusinessCategory", "profileBusinessSubcategory");
    showFileOriginWarning();
    syncRewardChannelFields();
    syncRewardAvailabilityFields();
    syncRewardImagePreview();

    /* === KPI info popovers === */
    (function () {
      const INFO = {
        'activations': { title: 'Activations / reward', body: 'How many times your reward was activated per reward item. A high number means your offer is compelling to everyone who discovers it.' },
        'conversion': { title: 'Click → activation rate', body: 'The % of users who clicked your reward and then actually activated it. A low rate suggests your reward copy or offer value needs work.' },
        'validation': { title: 'Validation rate', body: 'The % of activations verified in-store by your staff. High = real footfall. Low may mean no-shows or missed scans — check your team\'s scanning habit.' },
        'cost': { title: 'Reward cost', body: 'Total Cycl Coins spent on activations this period. You only pay per redemption — no wasted spend on views or clicks that don\'t convert.' },
        'foottraffic': { title: 'Estimated recycles / week', body: 'Recycling sessions at your assigned Cycl stations per week. A real-world proxy for foot-traffic volume near your venue.' },
        'repeat': { title: 'Repeat customers', body: '% of customers who activated one of your rewards more than once. A high repeat rate signals loyalty — these are your best regulars.' },
        'home-clicks': { title: 'Marketplace clicks', body: 'Total clicks on your rewards in the Cycl marketplace. Measures awareness and how attractive your reward looks in listings.' },
        'home-validations': { title: 'Validated visits', body: 'Total in-store validations confirmed by your staff. Each validation equals a real customer visit driven by Cycl.' },
        'home-conversion': { title: 'Conversion rate', body: 'Clicks that turned into activations. The higher this is, the more your reward resonates with people who discover it.' },
        'home-foottraffic': { title: 'Foot traffic / month', body: 'Estimated recycling sessions per month at your assigned Cycl stations — a volume proxy for nearby foot traffic.' },
        'home-sponsored': { title: 'Sponsored rewards', body: 'Your reward listings currently live and visible in the Cycl marketplace.' },
        'catchment': { title: 'Catchment isochrone', body: 'Shows where foot traffic originates relative to your venue. Pin size = volume; red pins are accelerating. Use the radius toggle to see how far your real audience travels, and spot nearby peers to benchmark against.' },
        'peer-leaderboard': { title: 'Peer leaderboard', body: 'Your business ranked against peers of a similar type and size in your area. Use it to benchmark activations, validation rate, and cost efficiency — and spot who is pulling ahead so you can study their tactics.' },
        'perf-heatmap': { title: 'Performance by metric', body: 'A normalised heat map — each cell is scored 0–100 within your peer set on that column metric. Bright cells = top of the group. Scan your row to find which metrics are weakest and need attention first.' },
        'loyalty': { title: 'Customer loyalty', body: 'Based on real recycling sessions at your assigned Cycl stations over the last 90 days. The cohort bar shows how many visitors came once vs. returned 2–4 times vs. 5+ times. A growing 5+ cohort means strong habitual loyalty.' },
        'velocity': { title: 'Foot traffic velocity', body: 'Recycling sessions at your stations week by week vs. the peer median. Rising weeks above the median mean your brand pull is strengthening. Drops below median are an early warning — check reward activity in the same period.' },
        'reward-themes': { title: 'Top reward themes', body: 'Words extracted from high-performing reward titles in your peer set, weighted by activations and clicks. Bigger = more correlated with engagement. Use these as inspiration when writing your next reward title or description.' },
        'reward-deep': { title: 'Reward deep-dive', body: 'Row-level stats for every reward you have run. Compare validation rate across rewards to find which offers drive real visits vs. just clicks. Cost CC column shows your spend per reward so you can optimise budget allocation.' },
        'station-deep': { title: 'Station deep-dive', body: 'Per-station breakdown of recycling volume, fill rate, and unique visitors. High fill % with low visitors means heavy reuse by a small group; low fill with high visitors suggests casual one-time recyclers — different targeting tactics apply.' },
        'demo-customer': { title: 'Customer demographics', body: 'Age and gender profile of the people who activated your rewards, drawn from their Cycl app profiles. Use this to ensure your reward copy and imagery speaks to your actual audience, not a guessed one.' },
        'demo-visitor': { title: 'Visitor demographics', body: 'Age and gender of users who recycled at your assigned stations. Compare with the reward demographics above — a mismatch means you may be missing the station crowd in your reward targeting.' },
      };
      const popover = document.getElementById('kpiPopover');
      const popTitle = document.getElementById('kpiPopoverTitle');
      const popBody = document.getElementById('kpiPopoverBody');
      let activeBtn = null;

      function openPopover(btn) {
        const info = INFO[btn.dataset.kpi];
        if (!info) return;
        if (activeBtn === btn) { closePopover(); return; }
        popTitle.textContent = info.title;
        popBody.textContent = info.body;
        popover.classList.add('is-open');
        activeBtn = btn;
        positionPopover(btn);
      }
      function closePopover() {
        popover.classList.remove('is-open');
        activeBtn = null;
      }
      function positionPopover(btn) {
        const rect = btn.getBoundingClientRect();
        const pw = 240;
        const ph = popover.offsetHeight || 100;
        let left = rect.right - pw;
        let top = rect.bottom + 6;
        if (left < 8) left = 8;
        if (top + ph > window.innerHeight - 8) top = rect.top - ph - 6;
        popover.style.left = left + 'px';
        popover.style.top = top + 'px';
      }
      document.addEventListener('click', function (e) {
        const btn = e.target.closest('.kpi-info-btn');
        if (btn) { e.stopPropagation(); openPopover(btn); return; }
        if (popover.contains(e.target)) return;
        closePopover();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePopover();
      });
    })();
