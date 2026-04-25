import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  Menu,
  X,
  Star,
  CheckCircle2,
  Feather,
  PenLine,
  BookOpen,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
  ArrowLeft,
  Send,
} from "lucide-react";

const NAV = [
  { id: "oferta", label: "Oferta" },
  { id: "o-mnie", label: "O mnie" },
  { id: "opinie", label: "Opinie" },
  { id: "wycena", label: "Wycena" },
  { id: "kontakt", label: "Kontakt" },
];

const OFFERS = [
  {
    n: "01",
    icon: <PenLine size={22} strokeWidth={1.5} />,
    title: "Korekta",
    desc:
      "Eliminacja błędów językowych, ortograficznych, interpunkcyjnych i literówek — by Twój tekst zabrzmiał czysto i profesjonalnie.",
    bullets: ["Ortografia i interpunkcja", "Literówki i powtórzenia", "Spójność zapisu"],
  },
  {
    n: "02",
    icon: <Feather size={22} strokeWidth={1.5} />,
    title: "Redakcja",
    desc:
      "Praca nad stylem, strukturą i logiką tekstu. Doskonalę rytm zdań, jasność przekazu i siłę argumentacji.",
    bullets: ["Styl i język", "Kompozycja i logika", "Spójność narracyjna"],
  },
  {
    n: "03",
    icon: <BookOpen size={22} strokeWidth={1.5} />,
    title: "Skład i druk",
    desc:
      "Kompleksowa pomoc wydawnicza — od redakcji, przez korektę po skład tekstu i przygotowanie do druku.",
    bullets: ["Skład typograficzny", "Łamanie kolumn", "Przygotowanie pliku do druku"],
  },
];

const TESTIMONIALS = [
  {
    name: "Anna Kowalska",
    role: "Autorka powieści",
    quote:
      "Współpraca z Panią Redaktor to czysta przyjemność. Mój tekst zyskał rytm, lekkość i precyzję, jakiej sama nie potrafiłam wypracować przez miesiące pracy.",
  },
  {
    name: "Marcin Nowak",
    role: "Doktorant, UJ",
    quote:
      "Profesjonalizm na najwyższym poziomie. Korekta mojej rozprawy została wykonana w terminie, z ogromną dbałością o każdy detal i terminologię.",
  },
  {
    name: "Katarzyna Wiśniewska",
    role: "Wydawnictwo Literackie",
    quote:
      "Każdy tekst, który wraca z redakcji, jest gotowy do druku. Polecam każdemu, kto traktuje słowo poważnie — bo tu słowa są naprawdę doskonalone.",
  },
  {
    name: "Tomasz Lewandowski",
    role: "Copywriter",
    quote:
      "Zlecałem już wiele korekt, ale dopiero tutaj poczułem, że mój tekst nie jest poprawiany — jest doskonalony. Różnica jest olbrzymia.",
  },
  {
    name: "Magdalena Zielińska",
    role: "Blogerka kulinarna",
    quote:
      "Dzięki redakcji moje przepisy brzmią teraz tak, jak zawsze chciałam, żeby brzmiały. Polecam z czystym sumieniem.",
  },
  {
    name: "Piotr Kamiński",
    role: "Autor książki popularnonaukowej",
    quote:
      "Cierpliwość, dokładność i ogromna wiedza. Moja książka stała się wyraźnie lepsza po jednej rundzie współpracy.",
  },
];

const Stars = () => (
  <div className="t-stars" aria-label="Ocena 5 na 5">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
    ))}
  </div>
);

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const Header = ({ onMobileToggle, mobileOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (mobileOpen) onMobileToggle();
  };

  return (
    <header className={`sd-header ${scrolled ? "scrolled" : ""}`} data-testid="site-header">
      <div className="nav">
        <a href="#top" className="brand" onClick={(e) => handleNav(e, "top")} data-testid="brand-link">
          <img src="/logo.png" alt="Słowa Doskonale — korekta i redakcja tekstów" className="brand-logo" />
        </a>
        <nav className="nav-links" aria-label="Główna nawigacja">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => handleNav(e, n.id)}
              data-testid={`nav-${n.id}`}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#wycena"
            className="btn btn-gold"
            onClick={(e) => handleNav(e, "wycena")}
            data-testid="cta-quote-header"
          >
            Bezpłatna wycena
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </nav>
        <button
          className="hamburger"
          onClick={onMobileToggle}
          aria-label="Otwórz menu"
          data-testid="mobile-menu-toggle"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};

const MobilePanel = ({ open, onClose }) => {
  const handleNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };
  return (
    <div className={`mobile-panel ${open ? "open" : ""}`} data-testid="mobile-panel">
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          onClick={(e) => handleNav(e, n.id)}
          data-testid={`mobile-nav-${n.id}`}
        >
          {n.label}
        </a>
      ))}
      <a
        href="#wycena"
        className="btn btn-gold"
        onClick={(e) => handleNav(e, "wycena")}
        data-testid="mobile-cta-quote"
      >
        Bezpłatna wycena
        <ArrowRight size={16} strokeWidth={2} />
      </a>
    </div>
  );
};

const Hero = () => {
  const goToQuote = () => {
    const el = document.getElementById("wycena");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="top" className="hero" data-testid="hero-section">
      <span className="hero-corner" aria-hidden="true">Sd</span>
      <div className="hero-grid">
        <div className="reveal">
          <div className="hero-kicker">Profesjonalna redakcja & korekta</div>
          <h1>
            Twoje słowa
            <br />
            w <em>perfekcyjnym</em> wydaniu.
          </h1>
          <p className="lead">
            Specjalizuję się w profesjonalnej redakcji i korekcie tekstów —
            od powieści, przez prace naukowe, po publikacje branżowe.
            Każde zdanie traktuję z troską i precyzją, jakiej zasługuje
            dobra polszczyzna.
          </p>
          <div className="hero-cta">
            <button onClick={goToQuote} className="btn btn-gold btn-large" data-testid="hero-cta-primary">
              Bezpłatna wycena w 24h
              <ArrowRight size={18} strokeWidth={2} />
            </button>
            <a
              href="#oferta"
              className="btn btn-outline btn-large"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="hero-cta-secondary"
            >
              Poznaj ofertę
            </a>
          </div>
          <div className="hero-meta">
            <div className="meta-item">
              <div className="num">12+</div>
              <div className="lbl">Lat doświadczenia</div>
            </div>
            <div className="meta-item">
              <div className="num">450+</div>
              <div className="lbl">Zredagowanych książek</div>
            </div>
            <div className="meta-item">
              <div className="num">24h</div>
              <div className="lbl">Czas na wycenę</div>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal" data-testid="hero-visual">
          <img
            src="/hero.jpeg"
            alt="Pisanie — pióro i notatnik na biurku"
            loading="eager"
          />
          <div className="stamp">
            „Słowo dobrze postawione waży więcej niż tysiąc napisanych pośpiesznie."
          </div>
        </div>
      </div>
    </section>
  );
};

const Offer = () => (
  <section id="oferta" className="section offer" data-testid="offer-section">
    <div className="container">
      <div className="offer-head reveal">
        <div>
          <div className="eyebrow">Oferta</div>
          <h2 className="section-title">
            Trzy filary mojej pracy<br />nad Twoim tekstem.
          </h2>
        </div>
        <p className="section-sub">
          Dobieram zakres usług indywidualnie — od pojedynczej korekty,
          po pełną redakcję wraz ze składem i przygotowaniem publikacji
          do druku. Zawsze z poszanowaniem Twojego głosu i stylu.
        </p>
      </div>
      <div className="offer-grid">
        {OFFERS.map((o) => (
          <article
            key={o.n}
            className="offer-card reveal"
            data-testid={`offer-card-${o.n}`}
          >
            <div className="offer-num">— {o.n}</div>
            <div className="offer-icon">{o.icon}</div>
            <h3>{o.title}</h3>
            <p>{o.desc}</p>
            <ul className="offer-list">
              {o.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="o-mnie" className="section about" data-testid="about-section">
    <div className="about-grid">
      <div className="about-photo reveal">
        <img
          src="/me.jpeg"
          alt="Portret redaktorki"
        />
      </div>
      <div className="about-text reveal">
        <div className="eyebrow">O mnie</div>
        <h2>
          Pasja do języka,<br />
          <em>uważność</em> do każdego słowa.
        </h2>
        <p>
          Od kilkunastu lat pomagam autorom, wydawcom i firmom dopracować
          ich teksty do najwyższego poziomu. Wierzę, że dobry redaktor
          jest niewidzialny — czytelnik czuje tylko, że wszystko gra.
        </p>
        <p>
          Ukończyłam filologię polską na Uniwersytecie Jagiellońskim oraz
          studia podyplomowe z edytorstwa. Pracowałam z literaturą piękną,
          poezją, publicystyką, tekstami naukowymi i komercyjnymi.
          Dla mnie każdy tekst zasługuje na ten sam szacunek.
        </p>
        <p>
          Nie poprawiam — doskonalę. To różnica, którą czuje się przy
          pierwszym czytaniu gotowego tekstu.
        </p>
        <div className="signature">
          Agnieszka Kozak
          <small>Redaktor i korektor</small>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".t-card");
    const step = card ? card.getBoundingClientRect().width + 28 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="opinie" className="section testimonials" data-testid="testimonials-section">
      <div className="container">
        <div className="t-head reveal">
          <div>
            <div className="eyebrow">Opinie klientów</div>
            <h2 className="section-title">Słowa, które do mnie wracają.</h2>
            <p className="section-sub">
              Najpiękniejsze rekomendacje to te, w których czuć ulgę
              i dumę autorów z gotowego tekstu.
            </p>
          </div>
          <div className="t-controls" aria-label="Nawigacja opinii">
            <button
              type="button"
              className="t-arrow"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Poprzednia opinia"
              data-testid="testimonials-prev"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              className="t-arrow"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Następna opinia"
              data-testid="testimonials-next"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="t-track" ref={trackRef} data-testid="testimonials-track">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className="t-card"
              data-testid={`testimonial-card-${i}`}
            >
              <Stars />
              <p className="t-quote">„{t.quote}"</p>
              <div className="t-author">
                <div className="t-avatar">
                  {t.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quote = () => {
  const goContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="wycena" className="section quote" data-testid="quote-section">
      <div className="quote-inner reveal">
        <div className="eyebrow" style={{ justifyContent: "center" }}>Bezpłatna wycena</div>
        <h2>
          Każdy tekst jest <em>inny</em>.<br />
          Twoja wycena też taka będzie.
        </h2>
        <div className="quote-divider" />
        <p>
          Napisz do mnie, załącz fragment lub podaj liczbę znaków, a przygotuję
          dla Ciebie indywidualną, bezpłatną wycenę w ciągu 24 godzin.
          Bez zobowiązań, bez ukrytych kosztów — tylko konkretna odpowiedź.
        </p>
        <button onClick={goContact} className="btn btn-gold btn-large" data-testid="quote-cta">
          <Send size={18} strokeWidth={2} />
          Wyślij zapytanie
        </button>
      </div>
    </section>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Zapytanie o wycenę — ${form.name || "klient"}`);
    const body = encodeURIComponent(
      `Imię: ${form.name}\nEmail: ${form.email}\n\nWiadomość:\n${form.message}`
    );
    window.location.href = `mailto:agnieszka.kozak@slowadoskonale.pl?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="kontakt" className="section contact" data-testid="contact-section">
      <div className="contact-grid">
        {/* <form className="form reveal" onSubmit={submit} data-testid="contact-form">
          <h3>Napisz wiadomość</h3>
          <div className="field">
            <label htmlFor="name">Imię</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jak Cię nazywać?"
              data-testid="form-name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="twoj@email.pl"
              data-testid="form-email"
            />
          </div>
          <div className="field">
            <label htmlFor="msg">Wiadomość</label>
            <textarea
              id="msg"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Opisz krótko swój tekst — gatunek, objętość, termin…"
              data-testid="form-message"
            />
          </div>
          <button type="submit" className="btn btn-gold btn-large" data-testid="form-submit">
            {sent ? (
              <>
                <CheckCircle2 size={18} /> Wysłano — sprawdź pocztę
              </>
            ) : (
              <>
                <Send size={18} /> Wyślij wiadomość
              </>
            )}
          </button>
        </form> */}

        <aside className="contact-info reveal">
          <div className="eyebrow">Kontakt</div>
          <h3>Porozmawiajmy o Twoim tekście.</h3>
          <p>
            Odpowiadam zwykle tego samego dnia. Jeśli wolisz krótką rozmowę
            — chętnie umówię się telefonicznie, bez pośpiechu.
          </p>
          <ul className="info-list">
            <li>
              <div className="info-icon"><Mail size={18} /></div>
              <div className="info-text">
                <div className="lbl">Email</div>
                <a href="mailto:agnieszka.kozak@slowadoskonale.pl" data-testid="contact-email">
                  agnieszka.kozak@slowadoskonale.pl
                </a>
              </div>
            </li>
            <li>
              <div className="info-icon"><Phone size={18} /></div>
              <div className="info-text">
                <div className="lbl">Telefon</div>
                <a href="tel:+48609620240" data-testid="contact-phone">+48 609 620 240</a>
              </div>
            </li>
            {/* <li>
              <div className="info-icon"><Instagram size={18} /></div>
              <div className="info-text">
                <div className="lbl">Social media</div>
                <span>@slowadoskonale</span>
              </div>
            </li> */}
          </ul>
          {/* <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram" data-testid="social-instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook" data-testid="social-facebook">
              <Facebook size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn" data-testid="social-linkedin">
              <Linkedin size={18} />
            </a>
          </div> */}
        </aside>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer" data-testid="site-footer">
    <div className="footer-line" />
    <div>
      © {new Date().getFullYear()} <span className="gold">Słowa Doskonale</span> · Agnieszka Kozak · Wszystkie prawa zastrzeżone
    </div>
  </footer>
);

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useReveal();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 980 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  return (
    <div className="App" data-testid="app-root">
      <Header
        onMobileToggle={() => setMobileOpen((v) => !v)}
        mobileOpen={mobileOpen}
      />
      <MobilePanel open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Hero />
      <Offer />
      <About />
      <Testimonials />
      <Quote />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

