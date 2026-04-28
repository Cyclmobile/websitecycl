const { useState, useEffect, useRef } = React;

const APP_STORE_URL = "https://apps.apple.com/us/app/cycl/id1661695563";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mobile.cycl";

function getAppDownloadUrl() {
  const ua = navigator.userAgent || navigator.vendor || "";
  return /iPad|iPhone|iPod|Macintosh/.test(ua) ? APP_STORE_URL : PLAY_STORE_URL;
}

function formatFullCount(value) {
  return Number.isFinite(value) ? value.toLocaleString() : "Loading...";
}

function formatCompactCount(value) {
  if (!Number.isFinite(value)) return "Loading";
  if (value >= 1000000)
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return value.toLocaleString();
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Counter({ target, suffix = "" }) {
  const [n, setN] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!Number.isFinite(target)) {
      setN(null);
      return;
    }
    let started = false;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const dur = 2400;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.floor(target * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setN(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {n === null ? "Loading..." : `${n.toLocaleString()}${suffix}`}
    </span>
  );
}

function Bars() {
  const [vals, setVals] = useState(Array(12).fill(0));
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const targets = [22, 35, 28, 48, 52, 65, 72, 68, 84, 92, 88, 96];
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setVals(targets), 100);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="bars" ref={ref}>
      {vals.map((v, i) => (
        <div
          key={i}
          className={v < 40 ? "dim" : ""}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  );
}

function App() {
  useReveal();
  const [navMode, setNavMode] = useState("over-dark");
  const [scrolled, setScrolled] = useState(false);
  const [tweaks, setTweaks] = useState(false);
  const [accent, setAccent] = useState("lime");
  const [hero, setHero] = useState(0);
  const [recycledCount, setRecycledCount] = useState(null);

  const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/ {
    accent: "lime",
    hero: 0,
  }; /*EDITMODE-END*/

  useEffect(() => {
    setAccent(TWEAK_DEFAULS.accent);
    setHero(TWEAK_DEFAULS.hero);
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaks(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaks(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let intervalId;
    const counterUrl =
      "https://firestore.googleapis.com/v1/projects/cycl-ionic/databases/(default)/documents/totalRecords/recycled?key=AIzaSyDpkOhaK9xqJoynNcq22EVSE44y5DebCSI";

    async function loadRecycledCount() {
      try {
        const response = await fetch(counterUrl);
        if (!response.ok)
          throw new Error(`Counter request failed: ${response.status}`);
        const data = await response.json();
        const nextCount = Number(
          data?.fields?.count?.integerValue || data?.fields?.count?.doubleValue,
        );
        if (!cancelled && Number.isFinite(nextCount))
          setRecycledCount(nextCount);
      } catch (error) {
        console.error("Error loading recycled count:", error);
      }
    }

    loadRecycledCount();
    intervalId = window.setInterval(loadRecycledCount, 60000);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const map = {
      lime: { a: "#74C044", b: "#2CB672" },
      forest: { a: "#4DAA3A", b: "#0F6B3E" },
      spring: { a: "#A8E063", b: "#56AB2F" },
    };
    const c = map[accent] || map.lime;
    document.documentElement.style.setProperty("--lime", c.a);
    document.documentElement.style.setProperty("--lime-2", c.b);
    document.documentElement.style.setProperty("--lime-deep", c.b);
    document.documentElement.style.setProperty(
      "--lime-grad",
      `linear-gradient(160deg, ${c.a} 0%, ${c.b} 100%)`,
    );
  }, [accent]);

  useEffect(() => {
    const check = () => {
      const y = window.scrollY + 40;
      const darks = document.querySelectorAll(
        ".section-dark, .hero, .station-section, .ops-section, .cta-section, footer",
      );
      let over = "over-light";
      darks.forEach((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        const bot = top + r.height;
        if (y >= top && y < bot) over = "over-dark";
      });
      setNavMode(over);
      setScrolled(window.scrollY > 40);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const heroLines = [
    [
      "A new loop",
      "for every",
      <>
        bottle <em>&amp; can.</em>
      </>,
    ],
    [
      "Cycl",
      "stations, but",
      <>
        <em>smarter.</em>
      </>,
    ],
    [
      "Recycling,",
      "ready for the",
      <>
        <em>real world.</em>
      </>,
    ],
  ];
  const appDownloadUrl = getAppDownloadUrl();

  return (
    <>
      <nav className={"top " + navMode + (scrolled ? " scrolled" : "")}>
        <a href="index.html" className="brand">
          <span className="brand-mark">
            <img src="assets/cycl-logo.png" alt="" />
          </span>
          <span className="brand-word">Cycl</span>
        </a>
        <div className="nav-mid">
          <a href="#system">System</a>
          <a href="#for-business">Business</a>
          <a href="operator.html">Business Platform</a>
          <a href="#impact">Impact</a>
        </div>
        <div className="nav-right">
          <a
            href={appDownloadUrl}
            target="_blank"
            rel="noopener"
            className="nav-pill"
          >
            <span>Get the app</span>
          </a>
        </div>
      </nav>

      <section className="hero section-dark">
        <div className="hero-grid">
          <div className="hero-meta mono">
            <div>
              <span className="dot" />
              Live · {formatFullCount(recycledCount)} units returned
            </div>
            <div>Est. 2022 · Verified return network</div>
          </div>
          <h1 className="hero-title">
            {heroLines[hero].map((l, i) => (
              <span className="line" key={i}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <div className="hero-bottom">
            <p className="hero-lede reveal d2">
              Cycl turns ordinary return points into smart Cycl stations. Scan,
              return, earn, and help capture part of the 300 billion bottles
              that fall outside the world's recycling systems every year.
            </p>
            <div className="hero-ctas reveal d3">
              <a
                className="btn btn-primary"
                href={appDownloadUrl}
                target="_blank"
                rel="noopener"
              >
                <span>Download the app</span>
                <span className="arr" />
              </a>
              <a className="btn btn-ghost" href="operator.html">
                <span>For operators</span>
                <span className="arr" />
              </a>
            </div>
            <div className="hero-stats reveal d4">
              <div className="hero-stat">
                <div className="n">{formatCompactCount(recycledCount)}</div>
                <div className="l">Returned</div>
              </div>
              <div className="hero-stat">
                <div className="n">300B</div>
                <div className="l">Missed / yr</div>
              </div>
              <div className="hero-stat">
                <div className="n">100%</div>
                <div className="l">Green ops</div>
              </div>
            </div>
          </div>
        </div>
        <div className="ticker">
          <div className="ticker-track">
            <span>No electronics in the collector</span>
            <span>AI powered recognition</span>
            <span>Free to start</span>
            <span>Business-ready insights</span>
            <span>Operator platform</span>
            <span>Built for any city</span>
            <span>Partner first rewards</span>
          </div>
          <div className="ticker-track" aria-hidden>
            <span>No electronics in the collector</span>
            <span>AI powered recognition</span>
            <span>Free to start</span>
            <span>Business-ready insights</span>
            <span>Operator platform</span>
            <span>Built for any city</span>
            <span>Partner first rewards</span>
          </div>
        </div>
      </section>

      <section className="counter-section" id="impact">
        <div className="counter-band">
          <div className="counter-num reveal">
            <Counter target={recycledCount} />
            {Number.isFinite(recycledCount) && <span className="tick">.</span>}
          </div>
          <div style={{ width: 1, height: 140, background: "var(--rule)" }} />
          <div className="counter-side reveal d1">
            <div className="eyebrow">
              <span className="num">00</span> Running total
            </div>
            <p>
              Cans and bottles returned through the Cycl network since launch,
              counted live from Cycl stations in libraries, schools and city
              centres.
            </p>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="frame">
          <div className="manifesto-grid">
            <div>
              <div className="eyebrow reveal">
                <span className="num">01</span> The loop
              </div>
              <h2 className="reveal d1">
                Closing the loop on bottle &amp; can deposits,{" "}
                <em>one scan at a time.</em>
              </h2>
            </div>
            <div>
              <p className="reveal d1">
                Many places want to contribute to recycling but do not have a
                solution that fits their space, daily flow, or customer
                experience. That leaves billions of bottles and cans outside
                convenient return habits every year.
              </p>
              <p className="reveal d2">
                Cycl is built for those places: a Cycl station, a phone, and AI
                that does the heavy lifting in the cloud. Place a Cycl station
                anywhere a return point belongs. Users scan. Partners fund
                rewards. The loop closes.
              </p>
              <div className="stats">
                <div className="reveal d3">
                  <div className="n">
                    <em>300B+</em>
                  </div>
                  <div className="l">
                    Bottles outside recycling systems every year
                  </div>
                </div>
                <div className="reveal d4">
                  <div className="n">
                    <em>~3×</em>
                  </div>
                  <div className="l">
                    More flexible for places that want to join recycling
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{ background: "var(--paper)", paddingTop: 0 }}
        id="system"
      >
        <div className="frame">
          <div className="flow reveal">
            <div className="flow-head">
              <h3>How a return happens</h3>
              <div className="mono">02, The system</div>
            </div>
            <div className="flow-steps">
              {[
                {
                  n: "01 / SCAN",
                  t: "Open Cycl",
                  d: "Point your camera at the bottle. The app recognises the deposit type instantly",
                  ico: (
                    <>
                      <circle cx="12" cy="12" r="4" />
                      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                    </>
                  ),
                },
                {
                  n: "02 / DROP",
                  t: "Drop it in",
                  d: "Any Cycl station will do. No electronics inside, just a label and a location in our network.",
                  ico: (
                    <>
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
                    </>
                  ),
                },
                {
                  n: "03 / EARN",
                  t: "Earn rewards",
                  d: "Your return becomes Cycl coins, which you can use to get discounts from participating partners.",
                  ico: (
                    <>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10M9 10h6M9 14h6" />
                    </>
                  ),
                  accent: true,
                },
                {
                  n: "04 / LOOP",
                  t: "Close the loop",
                  d: "And just like that, the loop is complete. You returned your bottle, earned your rewards, and helped make recycling happen.",
                  ico: (
                    <>
                      <path d="M21 12a9 9 0 1 1-3-6.7" />
                      <polyline points="21 4 21 9 16 9" />
                    </>
                  ),
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className={"flow-step" + (s.accent ? " accent" : "")}
                >
                  <div className="n">{s.n}</div>
                  <div className="ico">
                    <svg
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {s.ico}
                    </svg>
                  </div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="frame">
          <div className="pillars-head">
            <div>
              <div className="eyebrow reveal">
                <span className="num">03</span> What's different
              </div>
              <h2 className="reveal d1">
                Three reasons Cycl can fit places that want to contribute to
                recycling.
              </h2>
            </div>
            <p className="reveal d2">
              The Cycl platform was built from the app outwards, so more
              businesses and public places can become return points without
              adding complexity.
            </p>
          </div>
          <div className="pillars-list">
            {[
              {
                n: "/01",
                h: "Easy to fit into real places",
                p: "Cycl works in stores, venues, libraries, and local hubs that want to support recycling without rebuilding their space around the return point.",
                m: "Flexible setup",
              },
              {
                n: "/02",
                h: "Free to start, easy to upgrade",
                p: "Cycl is free to get started with. Upgrade only if you want more features, such as deeper customer insight, more analytics, or other advanced business tools.",
                m: "Optional upgrades",
              },
              {
                n: "/03",
                h: "Data you can actually use",
                p: "Every return produces live customer and location data, helping businesses understand behavior, improve rewards, and make better decisions from the dashboard.",
                m: "Business insight",
              },
            ].map((p, i) => (
              <div className="pillar reveal" key={i}>
                <div className="idx mono">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
                <div className="meta">{p.m}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="station-section section-dark" id="for-business">
        <div className="frame">
          <div className="station-grid">
            <div className="station-left">
              <div className="eyebrow reveal">
                <span className="num">04</span> For business
              </div>
              <h2 className="reveal d1">
                Be the local business that helps recycle{" "}
                <em>100% of bottles and cans.</em>
              </h2>
              <p className="reveal d2">
                Cycl turns recycling into a customer behavior and traffic tool.
                Add your own reward, show up right before customers are about to
                spend, and bring them back with insight on returning customers
                instead of guesswork.
              </p>
              <ul className="reveal d3">
                <li>
                  Start free and upgrade when you need deeper data insight
                </li>
                <li>
                  Add your own reward and choose how many Cycl coins users need
                  to redeem it
                </li>
                <li>
                  See how recycling turns into repeat visits and local traffic
                </li>
                <li>
                  Competitive intelligence and business performance tools in one
                  place
                </li>
              </ul>
              <div style={{ marginTop: 40 }} className="reveal d4">
                <a href="operator.html#apply" className="btn btn-primary">
                  <span>Start with Cycl</span>
                  <span className="arr" />
                </a>
              </div>
            </div>
            <div className="station-viz photo reveal d2">
              <img
                src="image/mallcycl.png"
                alt="Cycl app user returning a bottle at a smart station in a public mall"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="partners-band" id="partners">
        <div className="partners-inner">
          <h4 className="serif reveal">
            Trusted by forward thinking organisations.
          </h4>
          <div className="partners-logos reveal d1">
            <div className="plogo">Médecins Sans Frontières</div>
            <div className="plogo">Kolding Bibliotekerne</div>
            <div className="plogo">+ 14 municipalities</div>
          </div>
        </div>
      </div>

      <section className="esg-section">
        <div className="frame">
          <div className="esg-grid">
            <div className="esg-left">
              <div className="eyebrow reveal">
                <span className="num">05</span> Analytics
              </div>
              <h2 className="reveal d1">
                Turn every return into <em>customer insight.</em>
              </h2>
              <p className="reveal d2">
                Cycl analytics shows what recycling does for your business:
                returning customers, reward performance, traffic timing, and the
                insight you need before investing more in campaigns or offers.
              </p>
              <div className="esg-metrics">
                <div className="reveal d2">
                  <div className="n">Live</div>
                  <div className="l">Returning customer insight</div>
                </div>
                <div className="reveal d3">
                  <div className="n">24/7</div>
                  <div className="l">Traffic and return monitoring</div>
                </div>
                <div className="reveal d3">
                  <div className="n">Reward</div>
                  <div className="l">Offer and Cycl coin performance</div>
                </div>
                <div className="reveal d4">
                  <div className="n">Local</div>
                  <div className="l">Competitive intelligence by location</div>
                </div>
              </div>
            </div>
            <div className="esg-chart reveal d2">
              <div className="esg-chart-top">
                <h4>Customer returns by month</h4>
                <div className="mono">↗ +184% YoY</div>
              </div>
              <Bars />
              <div className="esg-chart-foot">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ops-section section-dark" id="operators">
        <div className="frame">
          <div className="ops-head">
            <div className="eyebrow reveal">
              <span className="num">06</span> Business platform
            </div>
            <h2 className="reveal d1">
              Turn recycling into <em>customer traffic.</em>
            </h2>
            <p className="reveal d2">
              Cycl gives businesses the tools to turn every bottle and can
              return into better performance: more visits, smarter rewards,
              stronger local visibility, and clear insight into what brings
              customers back.
            </p>
          </div>
          <div className="ops-cards">
            {[
              {
                n: "BZ / 01",
                t: "Start free",
                d: "Get started without operational overhead, then upgrade only when you need more insight, more rewards, or more locations.",
              },
              {
                n: "BZ / 02",
                t: "Lead customers in",
                d: "Add your own reward, choose how many Cycl coins users need to redeem it, and show up at the exact moment customers are ready to spend.",
              },
              {
                n: "BZ / 03",
                t: "See what works",
                d: "Track returning customers, location performance, reward usage, and traffic patterns from one dashboard.",
              },
              {
                n: "BZ / 04",
                t: "Compete smarter",
                d: "Use local analytics and competitive intelligence to improve offers, timing, and in-store performance.",
              },
            ].map((c, i) => (
              <div className="ops-card reveal" key={i}>
                <div className="n">{c.n}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
          <div className="ops-list">
            {[
              "Business platform with app + AI return recognition",
              "Real time analytics for traffic and returning customers",
              "Rewards engine with custom Cycl coin levels",
              "Competitive intelligence and local performance tracking",
              "Ready to deploy return points for stores and venues",
              "Tools to improve repeat visits and in-store conversion",
            ].map((b, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: b }} />
            ))}
          </div>
        </div>
      </section>

      <div className="cta-section section-dark">
        <div
          className="eyebrow reveal"
          style={{ justifyContent: "center", color: "rgba(242,237,227,0.5)" }}
        >
          <span className="num" style={{ color: "var(--lime)" }}>
            07
          </span>{" "}
          Start
        </div>
        <h2 className="reveal d1">
          Bring customers back <em>through recycling.</em>
        </h2>
        <div className="row reveal d2">
          <a className="btn btn-primary" href="operator.html">
            <span>See business tools</span>
            <span className="arr" />
          </a>
          <a
            className="btn btn-ghost"
            href="operator.html#apply"
            style={{
              color: "var(--paper)",
              borderColor: "rgba(242,237,227,0.25)",
            }}
          >
            <span>Talk to us</span>
            <span className="arr" />
          </a>
        </div>
      </div>

      <footer className="section-dark">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="index.html" className="brand">
              <span
                className="brand-mark"
                style={{ width: 36, height: 36, borderRadius: 10 }}
              >
                <img src="assets/cycl-logo.png" alt="" />
              </span>
              <span className="brand-word">Cycl</span>
            </a>
            <p>
              A new loop for every bottle &amp; can. Built for any city,
              deployed wherever a return point belongs.
            </p>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <ul>
              <li>
                <a href={appDownloadUrl} target="_blank" rel="noopener">
                  Consumer app
                </a>
              </li>
              <li>
                <a href="#for-business">For business</a>
              </li>
              <li>
                <a href="operator.html">Business platform</a>
              </li>
              <li>
                <a
                  href="/esg-rapport/esg-dashboard-modern.html"
                  target="_blank"
                  rel="noopener"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li>
                <a href="aboutUs.html">About</a>
              </li>
              <li>
                <a href="#partners">Partners</a>
              </li>
              <li>
                <a href="press.html">Press</a>
              </li>
              <li>
                <a href="career.html">Careers</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <ul>
              <li>
                <a href="mailto:team@cyclmobileapp.com">
                  team@cyclmobileapp.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/cycl-app/?viewAsMember=true"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cycl.app/"
                  target="_blank"
                  rel="noopener"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 Cycl ApS · CVR 45873129</span>
          <span>A new loop ✦</span>
        </div>
      </footer>

      {tweaks && (
        <div className="tw-panel">
          <h6>Tweaks</h6>
          <h5>Direction</h5>

          <div
            className="mono"
            style={{ color: "var(--ink-mute)", marginBottom: 8 }}
          >
            Accent
          </div>
          <div className="tw-sw" style={{ marginBottom: 18 }}>
            {[
              { k: "lime", c: "linear-gradient(160deg,#74C044,#2CB672)" },
              { k: "forest", c: "linear-gradient(160deg,#4DAA3A,#0F6B3E)" },
              { k: "spring", c: "linear-gradient(160deg,#A8E063,#56AB2F)" },
            ].map((s) => (
              <button
                key={s.k}
                onClick={() => {
                  setAccent(s.k);
                  window.parent.postMessage(
                    { type: "__edit_mode_set_keys", edits: { accent: s.k } },
                    "*",
                  );
                }}
                className={accent === s.k ? "active" : ""}
                style={{ background: s.c }}
                aria-label={s.k}
              />
            ))}
          </div>

          <div
            className="mono"
            style={{ color: "var(--ink-mute)", marginBottom: 8 }}
          >
            Hero headline
          </div>
          <div className="tw-row">
            {[
              "A new loop",
              "Smarter Cycl stations",
              "Real world recycling",
            ].map((label, i) => (
              <div
                key={i}
                className={"tw-chip" + (hero === i ? " active" : "")}
                onClick={() => {
                  setHero(i);
                  window.parent.postMessage(
                    { type: "__edit_mode_set_keys", edits: { hero: i } },
                    "*",
                  );
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
