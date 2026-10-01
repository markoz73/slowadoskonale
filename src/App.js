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
  SearchCheck,
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
    title: "Redakcja",
    desc:
      "Architektura i logika tekstu. Wydobywam jasność przekazu, koryguję nieścisłości logiczne i leksykalne, czuwam nad właściwym rytmem zdań i płynnością narracji – tak, by Twój styl wybrzmiał z pełną mocą, a Twoja wizja zyskała wyrazistość.",
    bullets: ["Spójna konstrukcja", "Naturalny flow", "Głębia autorskiego stylu"],
  },
  {
    n: "02",
    icon: <Feather size={22} strokeWidth={1.5} />,
    title: "Korekta",
    desc:
      "Precyzja i czystość językowa. Eliminuję usterki gramatyczne, interpunkcyjne i literówki. Dbam o nienaganną poprawność, dzięki czemu Twój przekaz trafia do odbiorców w doskonałej formie.",
    bullets: ["Językowa precyzja", "Czystość zapisu", "Pełne skupienie na treści"],
  },
  {
    n: "03",
    icon: <BookOpen size={22} strokeWidth={1.5} />,
    title: "Korekta po składzie (PDF)",
    desc:
      "Ostatnia prosta przed publikacją. Weryfikuję układ typograficzny, podział słów oraz estetykę łamania tekstu – dbając o to, by słowa prezentowały się doskonale w finalnym formacie publikacji.",
    bullets: ["Typograficzna czujność", "Oko do detali", "Bezpieczeństwo przed drukiem"],
  },
  {
    n: "04",
    icon: <SearchCheck size={22} strokeWidth={1.5} />,
    title: "Rewizja",
    desc:
      "Weryfikacja i ostateczny audyt tekstu. Sprawdzam poprawność wdrożenia sugerowanych poprawek i upewniam się, czy tekst zachował swoją integralność – tak, aby dać Ci pewność, że Twoja publikacja jest zapisana doskonale.",
    bullets: ["Ostateczny audyt", "Spójność zmian", "Twoja pewność i pełny spokój"],
  },
];

// const TESTIMONIALS = [
//   {
//     name: "Anna Kowalska",
//     role: "Autorka powieści",
//     quote:
//       "Współpraca z Panią Redaktor to najczystsza przyjemność. Mój tekst zyskał rytm, lekkość i precyzję, jakiej sama nie potrafiłam wypracować przez miesiące pracy.",
//   },
//   {
//     name: "Marcin Nowak",
//     role: "Doktorant, UJ",
//     quote:
//       "Profesjonalizm na najwyższym poziomie. Korekta mojej rozprawy została wykonana w terminie, z ogromną dbałością o każdy detal i terminologię.",
//   },
//   {
//     name: "Katarzyna Wiśniewska",
//     role: "Wydawnictwo Literackie",
//     quote:
//       "Każdy tekst, który wraca z redakcji, jest gotowy do druku. Polecam każdemu, kto traktuje słowo poważnie — bo tu słowa są naprawdę doskonalone.",
//   },
//   {
//     name: "Tomasz Lewandowski",
//     role: "Copywriter",
//     quote:
//       "Zlecałem już wiele korekt, ale dopiero tutaj poczułem, że mój tekst nie jest poprawiany — jest doskonalony. Różnica jest olbrzymia.",
//   },
//   {
//     name: "Magdalena Zielińska",
//     role: "Blogerka kulinarna",
//     quote:
//       "Dzięki redakcji moje przepisy brzmią teraz tak, jak zawsze chciałam, żeby brzmiały. Polecam z czystym sumieniem.",
//   },
//   {
//     name: "Piotr Kamiński",
//     role: "Autor książki popularnonaukowej",
//     quote:
//       "Cierpliwość, dokładność i ogromna wiedza. Moja książka stała się wyraźnie lepsza po jednej rundzie współpracy.",
//   },
// ];

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
      <span className="hero-corner" aria-hidden="true"></span>
      <div className="hero-grid">
        <div className="reveal">
          <div className="hero-kicker">Profesjonalna redakcja & korekta</div>
          <h1>
            Twoje słowa
            <br />
            w <em>perfekcyjnym</em> wydaniu
          </h1>
          <p className="lead">
            Specjalizuję się w profesjonalnej redakcji i korekcie tekstów. Każde słowo traktuję z troską i precyzją, na jakie zasługuje Twoja autorska wizja.
          </p>
          <div className="hero-cta">
            <button onClick={goToQuote} className="btn btn-gold btn-large" data-testid="hero-cta-primary">
              Bezpłatna wycena
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
          {/* <div className="hero-meta">
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
          </div> */}
        </div>
        <div className="hero-visual reveal" data-testid="hero-visual">
          <img
            src="/hero.jpeg"
            alt="Pisanie — pióro i notatnik na biurku"
            loading="eager"
          />
          <div className="stamp">
            Słowo ma swoją wagę – zadbajmy o to, by wybrzmiało doskonale
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
            Droga do doskonałego tekstu
          </h2>
        </div>
        <p className="section-sub">
          Zawsze pracuję w pełnym poszanowaniu Twojego stylu i autorskiego zamysłu. Możemy podjąć współpracę na dowolnym z poniższych etapów, jak również połączyć je w spójny proces wydawniczy.
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
          Pasja do odkrywania,<br />
          <em>uważność</em> na słowo,<br />pełne wsparcie
        </h2>
        <p>
          Jestem redaktorką, korektorką i przede wszystkim – uważną czytelniczką. Wierzę, że praca nad tekstem to proces pełen wzajemnego szacunku, a dobra redakcja to nie mechaniczne poprawianie błędów, ale sztuka wydobywania z tekstu jego najlepszej formy.
        </p>
        <p>
          Tworzę bezpieczną przestrzeń dla Twojego głosu, tak aby wybrzmiał z pełną mocą. Pomogę Ci wydobyć harmonię, piękno i mocny przekaz, które już tkwią w Twoich słowach. Niezależnie od tego, czy pracuję nad literaturą piękną, publicystyką, tekstem naukowym czy komercyjnym – zawsze dbam o to, by Twój tekst był zapisany doskonale.
        </p>
        <p>
          W procesie twórczym staję się Twoim partnerem i pierwszym, wspierającym czytelnikiem. Dbam o to, by tekst w pełni zachował Twoje pisarskie DNA. Podkreślam to, co w Twoim stylu najpiękniejsze, i z wyczuciem koryguję to, co mogłoby rozpraszać w trakcie lektury. Pracuję w trybie śledzenia zmian – nigdy nie podejmuję decyzji sama, bo to do Ciebie należy ostateczny głos. Szanuję każde Twoje słowo, dlatego nie przepisuję zdań na nowo, lecz szlifuję je z najwyższą uważnością. 
        </p>
        <p>
        Mój atut to umiejętność spojrzenia na słowa ze świeżej, redaktorskiej oraz czytelniczej perspektywy i dostrzeżenia niuansów, które łatwo przeoczyć, będąc bardzo blisko własnego tekstu. Finalnie na tej drodze najważniejsza jest dla mnie Twoja duma oraz zachwyt Twoich odbiorców.
          </p>
          <p>
        Po odłożeniu arkuszy wydawniczych z równą pasją odkrywam świat i ludzi. Poznaję ich zarówno w domowym zaciszu – podczas spotkań przy planszówkach, na kartach książek i w dobrym kinie – jak i w podróży, tej dalekiej i tej zupełnie bliskiej. Zachwycam się surowym pięknem natury oraz genialnymi osiągnięciami człowieka w architekturze, muzyce i literaturze. Z ciekawością słucham opowieści o życiu i marzeniach. Lubię zwiedzać świat na rowerze, a każdą wyprawę z radością wieńczę smakowaniem lokalnej kuchni i pysznych łakoci.
          </p>
          <p>
        Wierzę, że współpraca przy Twoim tekście to osobna, wyjątkowa podróż. Zapraszam Cię do wspólnego projektu – stwórzmy przestrzeń, w której Twoje słowa zyskają należną im uwagę.
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
          Zaufanie to podstawa dobrej współpracy. Poznaj mój warsztat dzięki darmowej próbce
          
        </h2>
        <div className="quote-divider" />
        <p>
         Każdy tekst to unikalna historia, która wymaga indywidualnego podejścia i wzajemnego zaufania. Chcę mieć pewność, że moje wsparcie w pełni odpowie na Twoje potrzeby, a Ty będziesz czuć się bezpiecznie w każdym momencie pracy nad tekstem.
<p />
Dlatego na początek zapraszam Cię do niezobowiązującego kroku:
<p />

1. Prześlij mi krótki fragment swojego tekstu (wystarczą 1–2 strony, najlepiej ze środka materiału, w formacie .docx).
<br />

2. Przygotuję dla Ciebie bezpłatną próbkę redakcji i/lub korekty. Dzięki temu zobaczysz mój styl w praktyce i sprawdzisz, jak czujesz się z moimi sugestiami.
<br />

3. Podejmiemy decyzję. Jeśli wspólnie zdecydujemy, że to właściwy kierunek i nasza wizja współpracy się pokrywa, poproszę Cię o przesłanie całości materiału.
<br />

4. Otrzymasz dedykowaną wycenę oraz harmonogram prac dostosowany do Twojego projektu.
<p />

Napisz do mnie i opowiedz kilka słów o tym, co tworzysz. Sprawdźmy, jak możemy sprawić, by Twoje słowa były zapisane doskonale.
        </p>
        <a href="mailto:agnieszka.kozak@slowadoskonale.pl" data-testid="contact-email">
          <button className="btn btn-gold btn-large" data-testid="hero-cta-primary">
            <Send size={18} strokeWidth={2} />
            Wyślij zapytanie
          </button>
        </a>

        {/* <button onClick={goContact} className="btn btn-gold btn-large" data-testid="quote-cta">
          <Send size={18} strokeWidth={2} />
          Wyślij zapytanie
        </button> */}


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
