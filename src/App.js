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
    title: "Redakcja - Tekst, który dobrze się czyta",
    desc:
      "Pracuję nad tekstem jako całością. Sprawdzam jego konstrukcję, logikę i spójność. Poprawiam niejasne sformułowania, niezręczności językowe i powtórzenia. Dbam o rytm zdań oraz płynność narracji. Szukam rozwiązań, które pomagają lepiej przekazać Twoje myśli, nie zmieniając tekstu w mój sposób pisania.",
    bullets: ["Spójna konstrukcja", "Jasny przekaz", "Płynność i styl"],
  },
  {
    n: "02",
    icon: <Feather size={22} strokeWidth={1.5} />,
    title: "Korekta - Poprawność w każdym szczególe",
    desc:
      "Sprawdzam tekst pod kątem błędów ortograficznych, interpunkcyjnych, gramatycznych i składniowych. Wychwytuję literówki, błędy językowe oraz niekonsekwencje w zapisie. Zwracam uwagę na szczegóły, które łatwo przeoczyć podczas samodzielnego czytania.",
    bullets: ["Ortografia i interpunkcja", "Gramatyka i składnia", "Staranność zapisu"],
  },
  {
    n: "03",
    icon: <BookOpen size={22} strokeWidth={1.5} />,
    title: "Korekta po składzie (PDF) - Ostatnie czytanie przed publikacją",
    desc:
      "Sprawdzam książkę lub inną publikację po składzie, w jej docelowym układzie graficznym. Weryfikuję podziały wyrazów, układ tekstu i poprawność typograficzną. Wychwytuję również literówki i inne błędy, które mogły pozostać po wcześniejszych etapach pracy.",
    bullets: ["Kontrola składu", "Podziały wyrazów i typografia", "Weryfikacja przed publikacją"],
  },
  {
    n: "04",
    icon: <SearchCheck size={22} strokeWidth={1.5} />,
    title: "Rewizja - Kontrola wprowadzonych zmian",
    desc:
      "Sprawdzam, czy poprawki korekty po składzie zostały prawidłowo wdrożone. Kontroluję spójność tekstu i wychwytuję ewentualne błędy, które pojawiły się podczas wprowadzania zmian lub przygotowania publikacji do druku.",
    bullets: ["Weryfikacja poprawek", "Kontrola spójności", "Ostatnia kontrola tekstu"],
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
    role: "Autor artykułów naukowych, bloga i autobiografii",
    quote:
      "Miałem ogromną przyjemność współpracować z Panią Agnieszką w ramach inicjatywy parowania twórców z korektorami, a nasza relacja zawodowa szybko objęła kompleksową redakcję i korektę moich kluczowych projektów. Pani Agnieszka wspierała mnie zarówno przy bieżącym szlifowaniu artykułów i wpisów na bloga, jak i na wymagającym etapie pracy nad książką. Co niezwykle ważne, nasza współpraca nie zakończyła się wraz z domknięciem pierwszego projektu. Kontynuujemy ją do dziś, a każdy kolejny etap stoi na równie wysokim poziomie. Jako osoba niewidoma na co dzień mierzę się z koniecznością dostosowania narzędzi i procesów komunikacji. Pani Agnieszka wykazała się w tym zakresie nie tylko najwyższym poziomem warsztatowego profesjonalizmu, ale również wybitną empatią, otwartością oraz elastycznością. Sprawnie wypracowaliśmy model pracy oparty na bezbłędnym zrozumieniu moich potrzeb, co pozwoliło mi na pełny i komfortowy udział w każdym etapie redakcji. Panią Agnieszkę wyróżnia wyjątkowa dbałość o detale językowe, wyczucie stylu, terminowość oraz zdolność do szybkiego rozwiązywania wyzwań edytorskich. Każdy tekst po jej redakcji zyskiwał na przejrzystości, płynności i wyrazistości, nie tracąc przy tym mojego indywidualnego głosu. Precyzja językowa i doskonała kultura pracy sprawiają, że współpraca z nią to gwarancja najwyższej jakości oraz pełnego spokoju o efekt końcowy. Z pełnym przekonaniem polecam usługi Pani Agnieszki każdemu autorowi, który poszukuje redaktora rzetelnego, niezwykle zaangażowanego i potrafiącego budować partnerstwo oparte na wzajemnym szacunku. Jestem wdzięczny za dotychczasowe efekty naszej wspólnej pracy i z przyjemnością powierzę jej kolejne projekty.",
  },
  {
    name: "Sebastian Kwiatkowski",
    role: "Autor powieści „Czerwona cegła Czarna ziemia”",
    quote:
      "Współpraca z Panią Agnieszką Kozak przy redakcji i korekcie mojej powieści „Czerwona cegła Czarna ziemia” była dla mnie pierwszym doświadczeniem tego rodzaju, dlatego na początku nie do końca wiedziałem, czego się spodziewać. Dziś wiem, jak wiele dobry redaktor może wnieść do tekstu, nie odbierając przy tym autorowi jego własnego głosu.\n\nTo właśnie najbardziej ceniłem w naszej współpracy. Pani Agnieszka nie poprawiała tekstu „pod siebie”. Każda większa ingerencja była wyjaśniona, często pojawiało się kilka możliwych rozwiązań, a ostateczna decyzja pozostawała po mojej stronie. Kiedy moje rozwiązanie było świadomym zabiegiem stylistycznym, potrafiła je zaakceptować. Kiedy natomiast zdanie nie działało, zaburzało rytm, było niejasne albo nie zgadzało się z tym, co wydarzyło się kilka akapitów wcześniej, potrafiła bardzo precyzyjnie pokazać, gdzie leży problem i dlaczego warto coś zmienić.\n\nSzczególnie doceniłem to, że redakcja nie ograniczała się do przecinków, literówek i poprawności językowej. Pani Agnieszka zwracała uwagę na rytm zdań, konstrukcję dialogów, powtórzenia, logikę scen, znaczenie pojedynczych słów, a nawet na drobne szczegóły, które autor po wielu miesiącach pracy zwyczajnie przestaje zauważać. Niektóre komentarze stawały się wręcz małymi lekcjami języka i warsztatu. Dzięki temu miałem poczucie, że nie tylko poprawiam jedną książkę, ale sam uczę się lepiej pisać.\n\nBardzo ważna była dla mnie także atmosfera tej współpracy. Nie czułem dystansu między „redaktorem, który wie” a „autorem, który ma się podporządkować”. Była rozmowa, czasem różnica zdań, czasem wspólne szukanie trzeciego rozwiązania. Mogłem się nie zgodzić i uzasadnić swoją decyzję, a moje zdanie było traktowane poważnie.\n\nZ czasem zobaczyłem też coś, czego chyba nie da się nauczyć wyłącznie z podręczników do redakcji: Pani Agnieszka naprawdę czyta tekst. Nie tylko go sprawdza. Interesują ją bohaterowie, ich losy i sens opowiadanej historii. Przy tak długiej pracy nad powieścią ma to ogromne znaczenie, bo autor szybko wyczuwa, czy osoba po drugiej stronie jedynie wykonuje usługę, czy rzeczywiście weszła w świat książki.\n\nPo redakcji przeszliśmy również przez korektę po składzie, więc Pani Agnieszka towarzyszyła „Czerwonej cegle czarnej ziemi” praktycznie do ostatniego etapu przed drukiem.\n\nJeżeli ktoś zastanawia się, czy oddać jej swój tekst, mogę powiedzieć przede wszystkim jedno: jest to redakcja uważna, rzetelna i prowadzona z ogromnym szacunkiem do autora. Ja po zakończeniu pracy nad pierwszą książką nie zastanawiam się, komu wysłać kolejną. Wiem, do kogo wrócę.",
  },
  {
    name: "Andrzej Zawadzki",
    role: "Pisarz",
    quote:
      "Współpracowało się fantastycznie!",
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
          {/* <h1>
            Twoje słowa
            <br />
            w <em>perfekcyjnym</em> wydaniu
          </h1> */}
          {/* seo */}
        <h1>
          Redakcja i korekta tekstów.
          <br />
          Twój tekst. Twój styl. <em>Dopracowana</em> forma
        </h1>          
          <p className="lead">
            Współpracuję z pisarzami, twórcami artykułów i tekstów użytkowych. Pomagam przełożyć myśli na klarowny przekaz: porządkuję strukturę i dbam o poprawność językową. Zwracam uwagę na szczegóły, ale zawsze patrzę też na całość – sens, logikę i charakter tekstu.</p>
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
            Dopracowany tekst zaczyna się od uważnego czytania
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
            {/* Droga do doskonałego tekstu */}
            Redakcja i korekta tekstów – jak mogę Ci pomóc?
          </h2>
        </div>
        <p className="section-sub">
          Każdy tekst wymaga czegoś innego. Czasem potrzebuje uporządkowania i dopracowania, czasem wystarczy sprawdzić poprawność językową, a czasem warto skontrolować go jeszcze przed publikacją.
          Oferuję cztery rodzaje usług, które możesz zamówić osobno lub połączyć – zależnie od potrzeb materiału.
 
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
          alt="Agnieszka Kozak — redaktorka i korektorka tekstów"
        />
      </div>
      <div className="about-text reveal">
        <div className="eyebrow">O mnie</div>
        <h2>
          Lubię wiedzieć, dlaczego coś<br />
          <em>działa </em> – i co można zrobić, żeby działało lepiej
        </h2>

        <p>
Lubię, kiedy rzeczy działają dobrze. A jeszcze bardziej lubię odkrywać, co można zrobić, żeby działały lepiej.
Przyglądam się, analizuję, szukam zależności i rozwiązań. Lubię porządkować, usprawniać i dopracowywać – zarówno drobiazgi, jak i większe całości. Tę samą przyjemność odnajduję w pracy z tekstem.
Nie wystarczy mi zauważyć, że zdanie brzmi niezgrabnie. Chcę wiedzieć, dlaczego tak jest i jak można je poprawić.
Zwracam uwagę na szczegóły, ale nie tracę z oczu całości: sensu, logiki, konstrukcji i intencji osoby piszącej. Czytam uważnie, interesuję się opowiadaną historią i szukam rozwiązań, które poprawiają tekst, nie odbierając mu indywidualnego charakteru.

        </p>
        <p>
W pracy redaktorskiej ciekawość bardzo się przydaje. Pozwala dostrzegać nie tylko błędy językowe, ale również nieścisłości, nieoczywiste zależności i miejsca, które wymagają zastanowienia.
Lubię zadawać pytania, szukać przyczyn i sprawdzać, czy proponowana zmiana rzeczywiście poprawia tekst.

        </p>
        <p>
Podróżuję rowerem, czytam książki, oglądam dobre filmy. Ciekawi mnie przyroda, architektura, malarstwo, regionalne kuchnie, a przede wszystkim ludzie – ich historie, pasje i motywacje.
Lubię poznawać rzeczy od podszewki i rozumieć, skąd się wzięły i dlaczego są właśnie takie.
W relacjach cenię otwartość, dialog i wzajemny szacunek. Lubię rozmawiać, wyjaśniać wątpliwości i wspólnie szukać najlepszych rozwiązań.
Wierzę, że dobra współpraca nad tekstem zaczyna się od wzajemnego zrozumienia.

        </p>
        <p>
Jeśli szukasz redaktorki, która uważnie przeczyta Twój tekst, przyjrzy się mu z różnych perspektyw i pomoże znaleźć najlepsze rozwiązania, zapraszam do współpracy.
          </p>
        <div className="signature">
          Agnieszka Kozak
          
        </div>
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ t, i, onOpen }) => {
  const MAX_LENGTH = 230;

  const getShortQuote = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const sub = text.slice(0, maxLength);
    const lastSentenceMatch = sub.match(/.*[.!?](?=\s|$)/);
    if (lastSentenceMatch && lastSentenceMatch[0].length > 70) {
      return `${lastSentenceMatch[0].replace(/[.!?]+$/, "")}...`;
    }
    const lastSpace = sub.lastIndexOf(" ");
    if (lastSpace > 0) {
      return `${sub.slice(0, lastSpace)}...`;
    }
    return `${sub}...`;
  };

  const isLong = t.quote.length > MAX_LENGTH;
  const displayText = isLong ? getShortQuote(t.quote, MAX_LENGTH) : t.quote;

  return (
    <article className="t-card" data-testid={`testimonial-card-${i}`}>
      <div>
        <Stars />
        <p className="t-quote">„{displayText}”</p>
        {isLong && (
          <button 
            type="button"
            className="t-expand-btn" 
            onClick={() => onOpen(t)}
          >
            Przeczytaj całość
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
  const [activeReview, setActiveReview] = useState(null); // Obsługa pełnej opinii

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
            <h2 className="section-title">Opinie o współpracy – co mówią osoby, z którymi pracowałam?</h2>
            <p className="section-sub">
Najlepiej o współpracy opowiadają osoby, które ją poznały.
Każdy projekt wygląda inaczej. Jedne osoby powierzają mi powieści, inne artykuły naukowe, wpisy blogowe lub dokumenty użytkowe. Łączy je to, że wspólnie szukamy rozwiązań, które pomagają tekstowi spełnić jego cel.
Poniżej znajdziesz wybrane opinie.

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
            <TestimonialCard 
              key={t.name} 
              t={t} 
              i={i} 
              onOpen={(review) => setActiveReview(review)} 
            />
          ))}
        </div>
      </div>

      {/* Okienko pełnej opinii dopasowane do designu strony */}
      {activeReview && (
        <div className="t-modal-overlay" onClick={() => setActiveReview(null)}>
          <div className="t-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="t-modal-close" 
              onClick={() => setActiveReview(null)}
              aria-label="Zamknij"
            >
              ✕
            </button>
            <Stars />
            <div className="t-modal-quote">
              „{activeReview.quote}”
            </div>
            <div className="t-author">
              <div className="t-avatar">
                {activeReview.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <div className="t-name">{activeReview.name}</div>
                <div className="t-role">{activeReview.role}</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
          Bezpłatna wycena redakcji i korekty tekstu
          
        </h2>
        <div className="quote-divider" />
<div className="quote-text">
          <p>
           Zobacz, jak pracuję, zanim zdecydujesz się na współpracę.
            Każdy tekst jest inny, dlatego zależy mi, żeby przed podjęciem decyzji było jasne, czego możesz się spodziewać.
            Prześlij mi krótki fragment swojej pracy, a ja przygotuję bezpłatną próbkę redakcji i/lub korekty.
            Zobaczysz moje propozycje zmian, komentarze i sposób pracy z tekstem.

          </p>
          <p>
           Jak to wygląda?
          </p>

          <ol className="quote-steps">
            <li>
              Prześlij fragment tekstu. Wystarczy 1–2 strony, najlepiej ze środka materiału, w pliku DOCX.

            </li>
            <li>
             Przygotuję bezpłatną próbkę. Zredaguję i/lub skoryguję przesłany fragment. Zobaczysz moje poprawki i komentarze, a także sposób, w jaki pracuję z tekstem.

            </li>
            <li>
              Zdecydujesz, czy chcesz współpracować. Spokojnie zapoznasz się z propozycjami. Jeśli uznasz, że odpowiada Ci mój sposób pracy, przejdziemy do kolejnego etapu.

            </li>
            <li>
              Otrzymasz wycenę i termin. Po zapoznaniu się z całością materiału przygotuję indywidualną wycenę i zaproponuję harmonogram prac.

            </li>
          </ol>

          <p>
            Napisz do mnie i opowiedz kilka słów o swoim projekcie. Chętnie go poznam!
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
        <div className="contact-info reveal">
          <div className="eyebrow">Kontakt</div>
          <h3>
            Potrzebujesz redakcji i korekty tekstu? <em>Napisz do mnie.</em>
          </h3>
          <p>
            Opowiedz, czego dotyczy projekt, na jakim jest etapie i jakiego wsparcia potrzebujesz.
          </p>
          <p>
            Nie musisz od razu wiedzieć, czy potrzebujesz redakcji, korekty czy obu usług. Chętnie pomogę Ci ustalić odpowiedni zakres pracy.
          </p>
        </div>

        <aside className="contact-card reveal">
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
      <Analytics />
    </div>
  );
}

export default App;
