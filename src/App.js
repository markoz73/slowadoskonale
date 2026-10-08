import { Analytics } from "@vercel/analytics/react";
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
      "Precyzja i czystość językowa. Eliminuję usterki gramatyczne, interpunkcyjne i literówki. Dbam o nienaganną poprawność, dzięki czemu Twój przekaz trafia do odbiorców w bezbłędnej formie.",
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
      "Weryfikacja i ostateczny audyt tekstu. Sprawdzam poprawność wdrożenia sugerowanych poprawek i upewniam się, czy tekst zachował swoją integralność – tak, aby dać Ci pewność, że Twoja publikacja jest gotowa do wydania.",
    bullets: ["Ostateczny audyt", "Spójność zmian", "Twoja pewność i pełny spokój"],
  },
];

const TESTIMONIALS = [
  {
    name: "Joanna Zimowska",
    role: "Autor niezależny / Wydawca",
    quote:
      "Gorąco polecam panią Agnieszkę! Świetny kontakt, terminowość oraz ogromne zaangażowanie w pracy przy tekście. Z pewnością wrócę z kolejną powieścią. To redaktorka, której długo szukałam. Jeszcze raz polecam!",
  },
    {
    name: "Hubert Jankowski",
    role: "Autor autobiografii",
    quote:
      "Miałem ogromną przyjemność współpracować z Panią Agnieszką w ramach inicjatywy parowania twórców z korektorami, a nasza relacja zawodowa szybko objęła kompleksową redakcję i korektę moich kluczowych projektów. Pani Agnieszka wspierała mnie zarówno przy bieżącym szlifowaniu artykułów i wpisów na bloga, jak i na wymagającym etapie pracy nad książką. Co niezwykle ważne, nasza współpraca nie zakończyła się wraz z domknięciem pierwszego projektu. Kontynuujemy ją do dziś, a każdy kolejny etap stoi na równie wysokim poziomie. Jako osoba niewidoma na co dzień mierzę się z koniecznością dostosowania narzędzi i procesów komunikacji. Pani Agnieszka wykazała się w tym zakresie nie tylko najwyższym poziomem warsztatowego profesjonalizmu, ale również wybitną empatią, otwartością oraz elastycznością. Sprawnie wypracowaliśmy model pracy oparty na bezbłędnym zrozumieniu moich potrzeb, co pozwoliło mi na pełny i komfortowy udział w każdym etapie redakcji. Panią Agnieszkę wyróżnia wyjątkowa dbałość o detale językowe, wyczucie stylu, terminowość oraz zdolność do szybkiego rozwiązywania wyzwań edytorskich. Każdy tekst po jej redakcji zyskiwał na przejrzystości, płynności i wyrazistości, nie tracąc przy tym mojego indywidualnego głosu. Precyzja językowa i doskonała kultura pracy sprawiają, że współpraca z nią to gwarancja najwyższej jakości oraz pełnego spokoju o efekt końcowy. Z pełnym przekonaniem polecam usługi Pani Agnieszki każdemu autorowi, który poszukuje redaktora rzetelnego, niezwykle zaangażowanego i potrafiącego budować partnerstwo oparte na wzajemnym szacunku. Jestem wdzięczny za dotychczasowe efekty naszej wspólnej pracy i z przyjemnością powierzę jej kolejne projekty.",
  },
  {
    name: "Andrzej Zawadzki",
    role: "Pisarz",
    quote:
      "Współpracowało się fantastycznie.",
  },
  {
    name: "Biuro Rachunkowe",
    role: "Właściciel",
    quote:
      "Pani Agnieszka zredagowała nam wzór umowy o prowadzenie usług. Nawet w takim dokumencie - sporządzonym przez kancelarię prawną - znalazła dużo miejsc do ulepszenia. Brawo!",
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
          {/* seo */}
        {/* <h1>
          Redakcja i korekta:
          <br />
          Twoje słowa w <em>perfekcyjnym</em> wydaniu
        </h1>           */}
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
            {/* seo */}
            Droga do doskonałego tekstu
            {/* Redakcja i korekta — droga do doskonałego tekstu */}
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
          <em>uważność, </em>pełne wsparcie
        </h2>

        <p>
          Jestem redaktorką, korektorką i przede wszystkim – uważną czytelniczką. Wierzę, że praca nad tekstem to proces pełen wzajemnego szacunku, a dobra redakcja to nie mechaniczne poprawianie błędów, ale sztuka wydobycia z tekstu głębi Twojego przekazu.
        </p>
        <p>
          Stworzę bezpieczną przestrzeń dla Twojego głosu, tak aby wybrzmiał z pełną mocą. Pomogę Ci wydobyć harmonię, piękno i mocny przekaz, które już tkwią w Twoich słowach. Niezależnie od tego, czy pracuję nad literaturą piękną, publicystyką, tekstem naukowym czy komercyjnym – zawsze dbam o to, by Twój tekst był zapisany doskonale.
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
          
        </div>
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ t, i }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 230; // Docelowy limit znaków

  const getShortQuote = (text, maxLength) => {
    if (text.length <= maxLength) return text;

    const sub = text.slice(0, maxLength);

    // 1. Szukamy końca pełnego zdania (. ! ?) w obrębie limitu
    const lastSentenceMatch = sub.match(/.*[.!?](?=\s|$)/);
    if (lastSentenceMatch && lastSentenceMatch[0].length > 70) {
      // Usuwamy kropkę z końca zdania i dodajemy wielokropek
      return `${lastSentenceMatch[0].replace(/[.!?]+$/, "")}...`;
    }

    // 2. Jeśli brak kropki lub zdanie jest bardzo długie, ucinamy na słowie + wielokropek
    const lastSpace = sub.lastIndexOf(" ");
    if (lastSpace > 0) {
      return `${sub.slice(0, lastSpace)}...`;
    }

    return `${sub}...`;
  };

  const isLong = t.quote.length > MAX_LENGTH;
  const displayText = isLong && !expanded 
    ? getShortQuote(t.quote, MAX_LENGTH) 
    : t.quote;

  return (
    <article className="t-card" data-testid={`testimonial-card-${i}`}>
      <div>
        <Stars />
        <p className="t-quote">„{displayText}”</p>
        {isLong && (
          <button 
            className="t-expand-btn" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Zwiń opinię" : "Przeczytaj całość"}
          </button>
        )}
      </div>
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
  );
};

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
            <div className="eyebrow">Opinie twórców</div>
            <h2 className="section-title">Słowa, które do mnie wracają</h2>
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
            <TestimonialCard key={t.name} t={t} i={i} />
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
        <h2 style={{ textAlign: "left" }}>
          Zaufanie to podstawa dobrej współpracy. Poznaj mój warsztat dzięki bezpłatnej próbce
          
        </h2>
        <div className="quote-divider" />
<div className="quote-text">
          <p>
            Każdy tekst to unikalna historia, która wymaga indywidualnego podejścia i wzajemnego zaufania. Chcę mieć pewność, że moje wsparcie w pełni odpowie na Twoje potrzeby, a Ty będziesz czuć się bezpiecznie w każdym momencie pracy nad tekstem.
          </p>
          <p>
            Dlatego na początek zapraszam Cię do niezobowiązującego kroku:
          </p>

          <ol className="quote-steps">
            <li>
              Prześlij mi krótki fragment swojego tekstu (wystarczą 1–2 strony, najlepiej ze środka materiału, w formacie .docx).
            </li>
            <li>
              Przygotuję dla Ciebie bezpłatną próbkę redakcji i/lub korekty. Dzięki temu zobaczysz mój styl w praktyce i sprawdzisz, jak czujesz się z moimi sugestiami.
            </li>
            <li>
              Podejmiemy decyzję. Jeśli wspólnie zdecydujemy, że to właściwy kierunek i nasza wizja współpracy się pokrywa, poproszę Cię o przesłanie całości materiału.
            </li>
            <li>
              Otrzymasz dedykowaną wycenę oraz harmonogram prac dostosowany do Twojego projektu.
            </li>
          </ol>

          <p>
            Napisz do mnie i opowiedz kilka słów o tym, co tworzysz. Sprawdźmy, jak możemy sprawić, by Twoje słowa były zapisane doskonale.
          </p>

        </div>        <a href="mailto:agnieszka.kozak@slowadoskonale.pl" data-testid="contact-email">
          <button className="btn btn-gold btn-large" data-testid="hero-cta-primary">
            <Send size={18} strokeWidth={2} />
            Wyślij zapytanie
          </button>
        </a>

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
        
        <aside className="contact-info reveal">
          <div className="eyebrow">Kontakt</div>

          <ul className="info-list">
            <li>
              <div className="info-icon"><Mail size={18} /></div>
              <div className="info-text">
                <div className="lbl">E-mail</div>
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

          </ul>

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

  // === AUTOMATYCZNE LIKWIDOWANIE WISZĄCYCH SPÓJNIKÓW (i, z, w, a, o, u) ===
  useEffect(() => {
    const fixTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Zamienia spację po wolnostojących literach i, a, o, u, w, z na twardą spację
        node.nodeValue = node.nodeValue.replace(/\b([iaouwzIAOUWZ])\s+/g, '$1\u00A0');
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
        node.childNodes.forEach(fixTextNodes);
      }
    };

    const root = document.getElementById("root");
    if (root) fixTextNodes(root);
  }, []);

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
    
  return (
    <div className="...">
      <Header />
      <main>...</main>
      <footer>...</footer>
      <Analytics />
    </div>
  );
    </div>
  );
}

export default App;
