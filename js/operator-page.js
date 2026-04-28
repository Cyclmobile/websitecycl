const { useState, useEffect, useRef } = React;
const firebaseApi =
  typeof window.getCyclFirebase === "function"
    ? window.getCyclFirebase()
    : null;
const firebase = firebaseApi?.firebase ?? null;
const db = firebaseApi?.db ?? null;

if (!firebaseApi) {
  console.error(
    "Cycl operator form could not initialize because js/site-firebase.js did not load.",
  );
}
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
      {
        threshold: 0.12,
      },
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
  const firebaseReady = Boolean(firebase && db);
  const [navMode, setNavMode] = useState("over-dark");
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(
    firebaseReady
      ? ""
      : "The request form is temporarily unavailable because a required site file did not load. Please try again shortly or contact team@cyclmobileapp.com.",
  );
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
    window.addEventListener("scroll", check, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", check);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!firebaseReady) {
      setSubmitError(
        "The request form is temporarily unavailable because a required site file did not load. Please try again shortly or contact team@cyclmobileapp.com.",
      );
      return;
    }

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
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      "nav",
      {
        className: "top " + navMode + (scrolled ? " scrolled" : ""),
      },
      /*#__PURE__*/ React.createElement(
        "a",
        {
          href: "index.html",
          className: "brand",
        },
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "brand-mark",
          },
          /*#__PURE__*/ React.createElement("img", {
            src: "assets/cycl-logo.png",
            alt: "",
          }),
        ),
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "brand-word",
          },
          "Cycl",
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "nav-mid",
        },
        /*#__PURE__*/ React.createElement(
          "a",
          {
            href: "index.html#system",
          },
          "System",
        ),
        /*#__PURE__*/ React.createElement(
          "a",
          {
            href: "index.html#for-business",
          },
          "Business",
        ),
        /*#__PURE__*/ React.createElement(
          "a",
          {
            href: "operator.html",
            className: "active",
          },
          "Business Platform",
        ),
        /*#__PURE__*/ React.createElement(
          "a",
          {
            href: "index.html#impact",
          },
          "Impact",
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "nav-right",
        },
        /*#__PURE__*/ React.createElement("a", {
          href: "#",
        }),
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "sep",
          },
          "/",
        ),
        /*#__PURE__*/ React.createElement(
          "a",
          {
            href: "#apply",
            className: "nav-pill",
          },
          /*#__PURE__*/ React.createElement("span", null, "Start free"),
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "hero",
      },
      /*#__PURE__*/ React.createElement("div", {
        className: "hero-glow",
      }),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "hero-crumb mono",
        },
        /*#__PURE__*/ React.createElement(
          "a",
          {
            href: "index.html",
          },
          "Cycl",
        ),
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "sep",
          },
          "/",
        ),
        /*#__PURE__*/ React.createElement("span", null, "For business growth"),
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "hero-grid",
        },
        /*#__PURE__*/ React.createElement(
          "h1",
          {
            className: "reveal",
          },
          "Turn recycling into",
          /*#__PURE__*/ React.createElement("br", null),
          /*#__PURE__*/ React.createElement("em", null, "customer traffic."),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "hero-right",
          },
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "hero-lede reveal d1",
            },
            "Cycl gives businesses everything they need to turn bottle and can returns into a repeat-visit engine: rewards, insight on returning customers, local visibility, and analytics that improve performance over time.",
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "hero-ctas reveal d2",
            },
            /*#__PURE__*/ React.createElement(
              "a",
              {
                href: "#apply",
                className: "btn btn-primary",
              },
              /*#__PURE__*/ React.createElement("span", null, "Start free"),
              /*#__PURE__*/ React.createElement("span", {
                className: "arr",
              }),
            ),
            /*#__PURE__*/ React.createElement(
              "a",
              {
                href: "#included",
                className: "btn btn-ghost",
              },
              /*#__PURE__*/ React.createElement(
                "span",
                null,
                "See what's included",
              ),
              /*#__PURE__*/ React.createElement("span", {
                className: "arr",
              }),
            ),
          ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "hero-ticker reveal d3",
        },
        [
          {
            n: /*#__PURE__*/ React.createElement(
              React.Fragment,
              null,
              /*#__PURE__*/ React.createElement("em", null, "Free"),
            ),
            l: "To get started",
          },
          {
            n: /*#__PURE__*/ React.createElement(
              React.Fragment,
              null,
              "Live",
              /*#__PURE__*/ React.createElement("em", null, " insight"),
            ),
            l: "On returning customers",
          },
          {
            n: /*#__PURE__*/ React.createElement(
              React.Fragment,
              null,
              "Custom",
              /*#__PURE__*/ React.createElement("em", null, " rewards"),
            ),
            l: "Choose how many Cycl coins unlock them",
          },
          {
            n: /*#__PURE__*/ React.createElement(
              React.Fragment,
              null,
              /*#__PURE__*/ React.createElement("em", null, "Local"),
            ),
            l: "Competitive intelligence",
          },
        ].map((c, i) =>
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "cell",
              key: i,
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "n",
              },
              c.n,
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "l",
              },
              c.l,
            ),
          ),
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "letter",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "letter-inner",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "mono reveal",
          },
          "01, An invitation",
        ),
        /*#__PURE__*/ React.createElement(
          "h2",
          {
            className: "reveal d1",
          },
          "We built the platform. ",
          /*#__PURE__*/ React.createElement(
            "em",
            null,
            "Now it's for businesses",
          ),
          " that want better traffic and better insight.",
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "reveal d2",
          },
          "Cycl is a consumer app, a rewards engine, and a return system that helps local businesses become the place where bottles and cans come back. That means more than recycling. It means showing up before customers spend, learning what brings them back, and building a better service experience around a simple habit.",
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "reveal d2",
          },
          "If your business wants more repeat visits, stronger local visibility, and tools that connect sustainability to revenue, Cycl is the cleanest place to start. Start free, add your reward, and upgrade when you need deeper analytics, more customer insight, or stronger lead generation.",
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "sig reveal d3",
          },
          /*#__PURE__*/ React.createElement("div", {
            style: {
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--lime-grad)",
              flexShrink: 0,
            },
          }),
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "name",
              },
              "Christina",
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              "Co founder, Cycl \xB7 Copenhagen",
            ),
          ),
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "included",
        id: "included",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "included-inner",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "included-head",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "mono reveal",
                style: {
                  color: "var(--ink-mute)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                },
              },
              /*#__PURE__*/ React.createElement("span", {
                style: {
                  width: 14,
                  height: 1,
                  background: "currentColor",
                },
              }),
              "02, What's included",
            ),
            /*#__PURE__*/ React.createElement(
              "h2",
              {
                className: "reveal d1",
              },
              "Everything your business needs to turn recycling into",
              " ",
              /*#__PURE__*/ React.createElement("em", null, "repeat behavior."),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "reveal d2",
            },
            "Three parts arrive together: the return point, the business platform, and the support team that helps you improve rewards, traffic, and performance in your location.",
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "inc-grid",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "inc-card reveal d1",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "vis station",
              },
              "STATION / 01",
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "tag",
              },
              "Hardware",
            ),
            /*#__PURE__*/ React.createElement("h3", null, "Return points"),
            /*#__PURE__*/ React.createElement(
              "p",
              null,
              "Ready to deploy Cycl return points that help your business collect bottles and cans where customers already pass through, shop, and return.",
            ),
            /*#__PURE__*/ React.createElement(
              "ul",
              null,
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Made for stores, venues, libraries, and local hubs",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Low maintenance design for busy customer spaces",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Easy to move as traffic patterns change",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Designed to fit naturally into your customer experience",
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "inc-card reveal d2",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "vis dash",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "row",
                },
                /*#__PURE__*/ React.createElement("span", {
                  className: "lg",
                }),
                /*#__PURE__*/ React.createElement("span", null),
                /*#__PURE__*/ React.createElement("span", null),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "bars",
                },
                [30, 50, 28, 68, 74, 52, 88, 60, 82, 94, 70, 98].map((v, i) =>
                  /*#__PURE__*/ React.createElement("span", {
                    key: i,
                    className: v < 40 ? "dim" : "",
                    style: {
                      height: `${v}%`,
                    },
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "row",
                },
                /*#__PURE__*/ React.createElement("span", null),
                /*#__PURE__*/ React.createElement("span", null),
                /*#__PURE__*/ React.createElement("span", null),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "tag",
              },
              "Software",
            ),
            /*#__PURE__*/ React.createElement("h3", null, "Business platform"),
            /*#__PURE__*/ React.createElement(
              "p",
              null,
              "A control room for customer behavior: returns in real time, reward performance, local traffic timing, and the insight you need to improve conversion.",
            ),
            /*#__PURE__*/ React.createElement(
              "ul",
              null,
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Web dashboard + mobile tools",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "AI recognition for every return",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Analytics and competitive intelligence",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Reward setup and Cycl coin redemption controls",
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "inc-card reveal d3",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "vis support",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "msg",
                },
                "Need help picking sites?",
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "msg mine",
                },
                "On it, let me pull your district data.",
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "msg",
                },
                "Perfect \uD83D\uDE4C",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "tag",
              },
              "Humans",
            ),
            /*#__PURE__*/ React.createElement("h3", null, "Launch & support"),
            /*#__PURE__*/ React.createElement(
              "p",
              null,
              "A dedicated launch partner for your first 90 days, plus ongoing support focused on offers, customer traffic, and better performance in your market.",
            ),
            /*#__PURE__*/ React.createElement(
              "ul",
              null,
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Location and reward planning session",
              ),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Placement playbook and local partner ideas",
              ),
              /*#__PURE__*/ React.createElement("li", null, "Launch support"),
              /*#__PURE__*/ React.createElement(
                "li",
                null,
                "Regular performance reviews",
              ),
            ),
          ),
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "econ",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "econ-inner",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "mono reveal",
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "num",
            },
            "03",
          ),
          " ",
          /*#__PURE__*/ React.createElement("span", null, "A year in the life"),
        ),
        /*#__PURE__*/ React.createElement(
          "h2",
          {
            className: "reveal d1",
          },
          "What a business activation can look like ",
          /*#__PURE__*/ React.createElement("em", null, "12 months in."),
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "reveal d2",
          },
          "Illustrative, not a forecast. Based on a typical local business setup with rewards active, moderate foot traffic, and one location using Cycl to create repeat visits and better insight.",
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "econ-sheet reveal d2",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "econ-col left",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "ch",
              },
              /*#__PURE__*/ React.createElement(
                "span",
                null,
                "Business upside",
              ),
              /*#__PURE__*/ React.createElement(
                "span",
                null,
                "Year one \xB7 1 location",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Returning customer sales",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Repeat visits influenced by rewards",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "+18%",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Reward redemptions",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Customers converting after recycle",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "32%",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Returning customer share",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Known repeat users over time",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "41%",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Insight value",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Traffic timing and offer learning",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "Live",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line total",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "lbl",
                },
                "Projected outcome",
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "More repeat visits",
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "econ-col",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "ch",
              },
              /*#__PURE__*/ React.createElement(
                "span",
                null,
                "What you control",
              ),
              /*#__PURE__*/ React.createElement(
                "span",
                null,
                "Year one \xB7 1 location",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Plan level",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Start free, upgrade when needed",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "Flexible",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Reward setup",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Choose how many Cycl coins users need to redeem your reward",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "Custom",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Locations",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Add more when traffic proves out",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "Scalable",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "lbl",
                  },
                  "Campaigns",
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "sub",
                  },
                  "Use analytics before spending more",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "Smarter",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "econ-line total",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "lbl",
                },
                "Projected setup",
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "val",
                },
                "Performance first",
              ),
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "econ-foot",
          },
          /*#__PURE__*/ React.createElement(
            "span",
            null,
            "Illustrative view of business performance with Cycl",
          ),
          /*#__PURE__*/ React.createElement(
            "span",
            null,
            "Detailed rollout shared during onboarding",
          ),
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "steps",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "steps-inner",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "mono reveal",
          },
          "04, The path in",
        ),
        /*#__PURE__*/ React.createElement(
          "h2",
          {
            className: "reveal d1",
          },
          "Four steps from signup to a ",
          /*#__PURE__*/ React.createElement(
            "em",
            null,
            "better customer loop.",
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "step-list",
          },
          [
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
          ].map((s, i) =>
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "step reveal",
                key: i,
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "num",
                },
                s.n,
              ),
              /*#__PURE__*/ React.createElement("h3", null, s.h),
              /*#__PURE__*/ React.createElement("p", null, s.p),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "when",
                },
                s.w,
              ),
            ),
          ),
        ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "section",
      {
        className: "apply",
        id: "apply",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "apply-inner",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "apply-left",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "mono",
              },
              "05, Start free",
            ),
            /*#__PURE__*/ React.createElement(
              "h2",
              {
                style: {
                  marginTop: 20,
                },
              },
              "Tell us ",
              /*#__PURE__*/ React.createElement(
                "em",
                null,
                "about your business.",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "p",
              {
                style: {
                  marginTop: 18,
                },
              },
              "We read every request. If there's a fit, you'll hear from us within five working days with the next step.",
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "ul",
            null,
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              "Start free and upgrade when you need more analytics",
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              "Add your own reward and choose how many Cycl coins users need to redeem it",
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              "Built to improve traffic, insight, and business performance",
            ),
          ),
        ),
        submitted
          ? /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "success",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "mono",
                  style: {
                    color: "var(--lime-2)",
                    marginBottom: 24,
                  },
                },
                "REQUEST RECEIVED",
              ),
              /*#__PURE__*/ React.createElement(
                "h3",
                null,
                "Thanks, ",
                /*#__PURE__*/ React.createElement(
                  "em",
                  null,
                  "we'll be in touch.",
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "p",
                null,
                "A real human on the Cycl team will reply within five working days. In the meantime, keep an eye on your inbox for your next step.",
              ),
            )
          : /*#__PURE__*/ React.createElement(
              "form",
              {
                className: "apply-right",
                onSubmit: onSubmit,
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "form-row",
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field",
                  },
                  /*#__PURE__*/ React.createElement(
                    "label",
                    null,
                    "First name",
                  ),
                  /*#__PURE__*/ React.createElement("input", {
                    name: "firstName",
                    required: true,
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field",
                  },
                  /*#__PURE__*/ React.createElement("label", null, "Last name"),
                  /*#__PURE__*/ React.createElement("input", {
                    name: "lastName",
                    required: true,
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "form-row",
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field",
                  },
                  /*#__PURE__*/ React.createElement("label", null, "Email"),
                  /*#__PURE__*/ React.createElement("input", {
                    name: "email",
                    type: "email",
                    required: true,
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field",
                  },
                  /*#__PURE__*/ React.createElement("label", null, "Phone"),
                  /*#__PURE__*/ React.createElement("input", {
                    name: "phone",
                  }),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "form-row",
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field",
                  },
                  /*#__PURE__*/ React.createElement(
                    "label",
                    null,
                    "Business location",
                  ),
                  /*#__PURE__*/ React.createElement("input", {
                    name: "businessLocation",
                    required: true,
                    placeholder: "e.g. Aarhus, Denmark",
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field",
                  },
                  /*#__PURE__*/ React.createElement("label", null, "Timeline"),
                  /*#__PURE__*/ React.createElement(
                    "select",
                    {
                      name: "timeline",
                      defaultValue: "",
                    },
                    /*#__PURE__*/ React.createElement(
                      "option",
                      {
                        value: "",
                        disabled: true,
                      },
                      "Choose\u2026",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "option",
                      null,
                      "As soon as possible",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "option",
                      null,
                      "Within 3 months",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "option",
                      null,
                      "Within 6 months",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "option",
                      null,
                      "Exploring, no deadline",
                    ),
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "form-row",
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "field full",
                  },
                  /*#__PURE__*/ React.createElement(
                    "label",
                    null,
                    "Tell us a little about your business",
                  ),
                  /*#__PURE__*/ React.createElement("textarea", {
                    name: "businessDetails",
                    placeholder:
                      "What your business does, why you want Cycl, and how you'd like to use rewards, traffic insight, or customer analytics.",
                  }),
                ),
              ),
              submitError
                ? /*#__PURE__*/ React.createElement(
                    "p",
                    {
                      style: {
                        marginBottom: 20,
                        color: "#C84B31",
                        fontSize: 14,
                      },
                    },
                    submitError,
                  )
                : null,
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "form-foot",
                },
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    className: "check",
                  },
                  /*#__PURE__*/ React.createElement("input", {
                    name: "consent",
                    type: "checkbox",
                    required: true,
                  }),
                  /*#__PURE__*/ React.createElement(
                    "span",
                    null,
                    "I agree to Cycl's",
                    " ",
                    /*#__PURE__*/ React.createElement(
                      "a",
                      {
                        href: "privacyweb.html",
                        target: "_blank",
                        rel: "noopener",
                      },
                      "privacy policy",
                    ),
                    " ",
                    "and consent to be contacted about my request.",
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  "button",
                  {
                    className: "btn submit-btn",
                    type: "submit",
                    disabled: isSubmitting || !firebaseReady,
                    style:
                      isSubmitting || !firebaseReady
                        ? {
                            opacity: 0.7,
                            cursor: isSubmitting ? "wait" : "not-allowed",
                          }
                        : undefined,
                  },
                  /*#__PURE__*/ React.createElement(
                    "span",
                    null,
                    !firebaseReady
                      ? "Temporarily unavailable"
                      : isSubmitting
                        ? "Sending..."
                        : "Start with Cycl",
                  ),
                  /*#__PURE__*/ React.createElement("span", {
                    className: "arr",
                  }),
                ),
              ),
            ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "footer",
      null,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "foot-top",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "foot-brand",
          },
          /*#__PURE__*/ React.createElement(
            "a",
            {
              href: "index.html",
              className: "brand",
            },
            /*#__PURE__*/ React.createElement(
              "span",
              {
                className: "brand-mark",
                style: {
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                },
              },
              /*#__PURE__*/ React.createElement("img", {
                src: "assets/cycl-logo.png",
                alt: "",
              }),
            ),
            /*#__PURE__*/ React.createElement(
              "span",
              {
                className: "brand-word",
              },
              "Cycl",
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            null,
            "A new loop for every bottle & can. Built for any city, deployed wherever a return point belongs.",
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "foot-col",
          },
          /*#__PURE__*/ React.createElement("h5", null, "Product"),
          /*#__PURE__*/ React.createElement(
            "ul",
            null,
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: appDownloadUrl,
                  target: "_blank",
                  rel: "noopener",
                },
                "Consumer app",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "index.html#for-business",
                },
                "For business",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "operator.html",
                },
                "Business platform",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "/esg-rapport/esg-dashboard-modern.html",
                  target: "_blank",
                  rel: "noopener",
                },
                "Analytics",
              ),
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "foot-col",
          },
          /*#__PURE__*/ React.createElement("h5", null, "Company"),
          /*#__PURE__*/ React.createElement(
            "ul",
            null,
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "aboutUs.html",
                },
                "About",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "index.html#partners",
                },
                "Partners",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "press.html",
                },
                "Press",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "career.html",
                },
                "Careers",
              ),
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "foot-col",
          },
          /*#__PURE__*/ React.createElement("h5", null, "Contact"),
          /*#__PURE__*/ React.createElement(
            "ul",
            null,
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "mailto:team@cyclmobileapp.com",
                },
                "team@cyclmobileapp.com",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "https://www.linkedin.com/company/cycl-app/?viewAsMember=true",
                  target: "_blank",
                  rel: "noopener",
                },
                "LinkedIn",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "li",
              null,
              /*#__PURE__*/ React.createElement(
                "a",
                {
                  href: "https://www.instagram.com/cycl.app/",
                  target: "_blank",
                  rel: "noopener",
                },
                "Instagram",
              ),
            ),
          ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "foot-bot",
        },
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          "\xA9 2026 Cycl ApS \xB7 CVR 45873129",
        ),
        /*#__PURE__*/ React.createElement(
          "span",
          null,
          "Operator program \u2726",
        ),
      ),
    ),
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /*#__PURE__*/ React.createElement(App, null),
);
