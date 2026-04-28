const { useState, useEffect, useRef } = React;

const { firebase, db } = window.getCyclFirebase();

const APP_STORE_URL = "https://apps.apple.com/us/app/cycl/id1661695563";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mobile.cycl";

function getAppDownloadUrl() {
  const ua = navigator.userAgent || navigator.vendor || "";
  return /iPad|iPhone|iPod|Macintosh/.test(ua) ? APP_STORE_URL : PLAY_STORE_URL;
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

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeoutMs);
    }),
  ]);
}

function App() {
  useReveal();
  const [navMode, setNavMode] = useState("over-dark");
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const check = () => {
      const y = window.scrollY + 40;
      const darks = document.querySelectorAll(".hero, .econ, footer");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await withTimeout(
        db.collection("support").add({
          type: "request",
          source: "operator-business-page",
          firstName: formData.get("firstName") || "",
          lastName: formData.get("lastName") || "",
          email: formData.get("email") || "",
          phone: formData.get("phone") || "",
          businessLocation: formData.get("businessLocation") || "",
          timeline: formData.get("timeline") || "",
          businessDetails: formData.get("businessDetails") || "",
          consent: Boolean(formData.get("consent")),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }),
        8000,
      );

      setSubmitted(true);
      window.scrollTo({
        top: document.querySelector(".apply").offsetTop - 80,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Failed to store support request:", error);
      setSubmitError(
        "We could not send your request right now. Please try again in a moment or contact us directly at team@cyclmobileapp.com.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
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
          <a href="index.html#system">System</a>
          <a href="index.html#for-business">Business</a>
          <a href="operator.html" className="active">
            Business Platform
          </a>
          <a href="index.html#impact">Impact</a>
        </div>
        <div className="nav-right">
          <a href="#">Sign in</a>
          <span className="sep">/</span>
          <a href="#apply" className="nav-pill">
            <span>Start free</span>
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-crumb mono">
          <a href="index.html">Cycl</a>
          <span className="sep">/</span>
          <span>For business growth</span>
        </div>
        <div className="hero-grid">
          <h1 className="reveal">
            Turn recycling into
            <br />
            <em>customer traffic.</em>
          </h1>
          <div className="hero-right">
            <p className="hero-lede reveal d1">
              Cycl gives businesses everything they need to turn bottle and can
              returns into a repeat-visit engine: rewards, insight on returning
              customers, local visibility, and analytics that improve
              performance over time.
            </p>
            <div className="hero-ctas reveal d2">
              <a href="#apply" className="btn btn-primary">
                <span>Start free</span>
                <span className="arr" />
              </a>
              <a href="#included" className="btn btn-ghost">
                <span>See what's included</span>
                <span className="arr" />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-ticker reveal d3">
          {[
            {
              n: (
                <>
                  <em>Free</em>
                </>
              ),
              l: "To get started",
            },
            {
              n: (
                <>
                  Live<em> insight</em>
                </>
              ),
              l: "On returning customers",
            },
            {
              n: (
                <>
                  Custom<em> rewards</em>
                </>
              ),
              l: "Choose how many Cycl coins unlock them",
            },
            {
              n: (
                <>
                  <em>Local</em>
                </>
              ),
              l: "Competitive intelligence",
            },
          ].map((c, i) => (
            <div className="cell" key={i}>
              <div className="n">{c.n}</div>
              <div className="l">{c.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="letter">
        <div className="letter-inner">
          <div className="mono reveal">01, An invitation</div>
          <h2 className="reveal d1">
            We built the platform. <em>Now it's for businesses</em> that want
            better traffic and better insight.
          </h2>
          <p className="reveal d2">
            Cycl is a consumer app, a rewards engine, and a return system that
            helps local businesses become the place where bottles and cans come
            back. That means more than recycling. It means showing up before
            customers spend, learning what brings them back, and building a
            better service experience around a simple habit.
          </p>
          <p className="reveal d2">
            If your business wants more repeat visits, stronger local
            visibility, and tools that connect sustainability to revenue, Cycl
            is the cleanest place to start. Start free, add your reward, and
            upgrade when you need deeper analytics, more customer insight, or
            stronger lead generation.
          </p>
          <div className="sig reveal d3">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--lime-grad)",
                flexShrink: 0,
              }}
            />
            <div>
              <div className="name">Christina</div>
              <div>Co founder, Cycl · Copenhagen</div>
            </div>
          </div>
        </div>
      </section>

      <section className="included" id="included">
        <div className="included-inner">
          <div className="included-head">
            <div>
              <div
                className="mono reveal"
                style={{
                  color: "var(--ink-mute)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{ width: 14, height: 1, background: "currentColor" }}
                />
                02, What's included
              </div>
              <h2 className="reveal d1">
                Everything your business needs to turn recycling into{" "}
                <em>repeat behavior.</em>
              </h2>
            </div>
            <p className="reveal d2">
              Three parts arrive together: the return point, the business
              platform, and the support team that helps you improve rewards,
              traffic, and performance in your location.
            </p>
          </div>

          <div className="inc-grid">
            <div className="inc-card reveal d1">
              <div className="vis station">STATION / 01</div>
              <div className="tag">Hardware</div>
              <h3>Return points</h3>
              <p>
                Ready to deploy Cycl return points that help your business
                collect bottles and cans where customers already pass through,
                shop, and return.
              </p>
              <ul>
                <li>Made for stores, venues, libraries, and local hubs</li>
                <li>Low maintenance design for busy customer spaces</li>
                <li>Easy to move as traffic patterns change</li>
                <li>Designed to fit naturally into your customer experience</li>
              </ul>
            </div>

            <div className="inc-card reveal d2">
              <div className="vis dash">
                <div className="row">
                  <span className="lg" />
                  <span />
                  <span />
                </div>
                <div className="bars">
                  {[30, 50, 28, 68, 74, 52, 88, 60, 82, 94, 70, 98].map(
                    (v, i) => (
                      <span
                        key={i}
                        className={v < 40 ? "dim" : ""}
                        style={{ height: `${v}%` }}
                      />
                    ),
                  )}
                </div>
                <div className="row">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="tag">Software</div>
              <h3>Business platform</h3>
              <p>
                A control room for customer behavior: returns in real time,
                reward performance, local traffic timing, and the insight you
                need to improve conversion.
              </p>
              <ul>
                <li>Web dashboard + mobile tools</li>
                <li>AI recognition for every return</li>
                <li>Analytics and competitive intelligence</li>
                <li>Reward setup and Cycl coin redemption controls</li>
              </ul>
            </div>

            <div className="inc-card reveal d3">
              <div className="vis support">
                <div className="msg">Need help picking sites?</div>
                <div className="msg mine">
                  On it, let me pull your district data.
                </div>
                <div className="msg">Perfect 🙌</div>
              </div>
              <div className="tag">Humans</div>
              <h3>Launch &amp; support</h3>
              <p>
                A dedicated launch partner for your first 90 days, plus ongoing
                support focused on offers, customer traffic, and better
                performance in your market.
              </p>
              <ul>
                <li>Location and reward planning session</li>
                <li>Placement playbook and local partner ideas</li>
                <li>Launch support</li>
                <li>Regular performance reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="econ">
        <div className="econ-inner">
          <div className="mono reveal">
            <span className="num">03</span> <span>A year in the life</span>
          </div>
          <h2 className="reveal d1">
            What a business activation can look like <em>12 months in.</em>
          </h2>
          <p className="reveal d2">
            Illustrative, not a forecast. Based on a typical local business
            setup with rewards active, moderate foot traffic, and one location
            using Cycl to create repeat visits and better insight.
          </p>

          <div className="econ-sheet reveal d2">
            <div className="econ-col left">
              <div className="ch">
                <span>Business upside</span>
                <span>Year one · 1 location</span>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Returning customer sales</div>
                  <div className="sub">Repeat visits influenced by rewards</div>
                </div>
                <div className="val">+18%</div>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Reward redemptions</div>
                  <div className="sub">Customers converting after recycle</div>
                </div>
                <div className="val">32%</div>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Returning customer share</div>
                  <div className="sub">Known repeat users over time</div>
                </div>
                <div className="val">41%</div>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Insight value</div>
                  <div className="sub">Traffic timing and offer learning</div>
                </div>
                <div className="val">Live</div>
              </div>
              <div className="econ-line total">
                <div className="lbl">Projected outcome</div>
                <div className="val">More repeat visits</div>
              </div>
            </div>

            <div className="econ-col">
              <div className="ch">
                <span>What you control</span>
                <span>Year one · 1 location</span>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Plan level</div>
                  <div className="sub">Start free, upgrade when needed</div>
                </div>
                <div className="val">Flexible</div>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Reward setup</div>
                  <div className="sub">
                    Choose how many Cycl coins users need to redeem your reward
                  </div>
                </div>
                <div className="val">Custom</div>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Locations</div>
                  <div className="sub">Add more when traffic proves out</div>
                </div>
                <div className="val">Scalable</div>
              </div>
              <div className="econ-line">
                <div>
                  <div className="lbl">Campaigns</div>
                  <div className="sub">Use analytics before spending more</div>
                </div>
                <div className="val">Smarter</div>
              </div>
              <div className="econ-line total">
                <div className="lbl">Projected setup</div>
                <div className="val">Performance first</div>
              </div>
            </div>
          </div>

          <div className="econ-foot">
            <span>Illustrative view of business performance with Cycl</span>
            <span>Detailed rollout shared during onboarding</span>
          </div>
        </div>
      </section>

      <section className="steps">
        <div className="steps-inner">
          <div className="mono reveal">04, The path in</div>
          <h2 className="reveal d1">
            Four steps from signup to a <em>better customer loop.</em>
          </h2>
          <div className="step-list">
            {[
              {
                n: "/01",
                h: "Start free",
                p: "Tell us about your business, your location, and what kind of customer behavior you want to influence. We reply within five working days.",
                w: "Week 0",
              },
              {
                n: "/02",
                h: "Business fit",
                p: "A 45 minute conversation with the Cycl team about your audience, your rewards, and where recycling can create the most traffic.",
                w: "Week 1",
              },
              {
                n: "/03",
                h: "Setup & insights",
                p: "We help configure your rewards, analytics, and location setup so you can track returning customers and performance from day one.",
                w: "Weeks 2 to 3",
              },
              {
                n: "/04",
                h: "Go live",
                p: "Your return point goes live, customers start recycling, and your dashboard begins showing the behavior and traffic you can act on.",
                w: "Week 4",
              },
            ].map((s, i) => (
              <div className="step reveal" key={i}>
                <div className="num">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <div className="when">{s.w}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="apply" id="apply">
        <div className="apply-inner">
          <div className="apply-left">
            <div>
              <div className="mono">05, Start free</div>
              <h2 style={{ marginTop: 20 }}>
                Tell us <em>about your business.</em>
              </h2>
              <p style={{ marginTop: 18 }}>
                We read every request. If there's a fit, you'll hear from us
                within five working days with the next step.
              </p>
            </div>
            <ul>
              <li>Start free and upgrade when you need more analytics</li>
              <li>
                Add your own reward and choose how many Cycl coins users need to
                redeem it
              </li>
              <li>
                Built to improve traffic, insight, and business performance
              </li>
            </ul>
          </div>

          {submitted ? (
            <div className="success">
              <div
                className="mono"
                style={{ color: "var(--lime-2)", marginBottom: 24 }}
              >
                REQUEST RECEIVED
              </div>
              <h3>
                Thanks, <em>we'll be in touch.</em>
              </h3>
              <p>
                A real human on the Cycl team will reply within five working
                days. In the meantime, keep an eye on your inbox for your next
                step.
              </p>
            </div>
          ) : (
            <form className="apply-right" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="field">
                  <label>First name</label>
                  <input name="firstName" required />
                </div>
                <div className="field">
                  <label>Last name</label>
                  <input name="lastName" required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Email</label>
                  <input name="email" type="email" required />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input name="phone" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label>Business location</label>
                  <input
                    name="businessLocation"
                    required
                    placeholder="e.g. Aarhus, Denmark"
                  />
                </div>
                <div className="field">
                  <label>Timeline</label>
                  <select name="timeline" defaultValue="">
                    <option value="" disabled>
                      Choose…
                    </option>
                    <option>As soon as possible</option>
                    <option>Within 3 months</option>
                    <option>Within 6 months</option>
                    <option>Exploring, no deadline</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field full">
                  <label>Tell us a little about your business</label>
                  <textarea
                    name="businessDetails"
                    placeholder="What your business does, why you want Cycl, and how you'd like to use rewards, traffic insight, or customer analytics."
                  />
                </div>
              </div>
              {submitError ? (
                <p style={{ marginBottom: 20, color: "#C84B31", fontSize: 14 }}>
                  {submitError}
                </p>
              ) : null}
              <div className="form-foot">
                <label className="check">
                  <input name="consent" type="checkbox" required />
                  <span>
                    I agree to Cycl's{" "}
                    <a href="privacyweb.html" target="_blank" rel="noopener">
                      privacy policy
                    </a>{" "}
                    and consent to be contacted about my request.
                  </span>
                </label>
                <button
                  className="btn submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  style={
                    isSubmitting ? { opacity: 0.7, cursor: "wait" } : undefined
                  }
                >
                  <span>{isSubmitting ? "Sending..." : "Start with Cycl"}</span>
                  <span className="arr" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer>
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
                <a href="index.html#for-business">For business</a>
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
                <a href="index.html#partners">Partners</a>
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
          <span>Operator program ✦</span>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
