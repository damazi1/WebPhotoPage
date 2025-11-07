import { Link } from "react-router-dom";
import "../Styles/Informacje.css";

const stats = [
  { value: "2,3 mln", label: "zapisanych tablic Picnest miesięcznie" },
  { value: "82%", label: "użytkowników wraca co tydzień po inspiracje" },
  { value: "190 krajów", label: "w których Picnest buduje społeczność" },
];

const newsItems = [
  {
    title: "Picnest Planner uruchamia współpracę w czasie rzeczywistym",
    summary:
      "Projektanci mogą teraz współedytować tablice i komentować pomysły tak jak w dokumencie online.",
    link: "#planner",
  },
  {
    title: "Marketplace mikro-twórców już w Polsce",
    summary: "Marki kupują licencje na tablice i moodboardy bezpośrednio od społeczności.",
    link: "#marketplace",
  },
  {
    title: "Biblioteka AI Moodboard rośnie o 2 000 motywów",
    summary: "Zestawy kolorów i tekstur generowane przez Picnest AI trafiają do trybu beta.",
    link: "#aimoodboard",
  },
];

const impactPillars = [
  {
    title: "Społeczność",
    description: "Moderujemy Picnest tak, by była najżyczliwszą platformą inspiracji.",
  },
  {
    title: "Produkt",
    description: "Budujemy narzędzia, które realnie przyśpieszają planowanie i tworzenie.",
  },
  {
    title: "Twórcy",
    description: "Płacimy autorom za tablice, raporty trendów i kolekcje AI.",
  },
  {
    title: "Planeta",
    description: "Priorytetem są lokalne materiały, slow fashion i zrównoważone pomysły.",
  },
];

const leadership = [
  {
    name: "Maria Król",
    role: "CEO & Co‑Founder",
    bio: "Wcześniej odpowiadała za marketplace w Pinterest EMEA. Po godzinach projektuje ceramikę.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=420&q=60",
  },
  {
    name: "Mateusz Nowicki",
    role: "Chief Product Officer",
    bio: "Twórca Picnest Planner i kreatora AI Moodboard. Fan danych i dobrego UX.",
    avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?auto=format&fit=crop&w=420&q=60",
  },
  {
    name: "Iga Ważyk",
    role: "VP Community & Partnerships",
    bio: "Buduje programy dla twórców i edukuje marki, jak pracować z inspiracjami.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=420&q=60",
  },
];

function Informacje() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <div className="info-hero__content">
          <p className="info-hero__eyebrow">O Picnest</p>
          <h1>
            Inspiracja, planowanie i realizacja.
            <br />
            Wszystko w jednym miejscu.
          </h1>
          <p className="info-hero__description">
            Picnest to polska platforma wizualnych inspiracji, z której korzystają projektanci, twórcy i
            ludzie planujący codzienne projekty. Łączymy zapisane pomysły, kreatora AI, szablony planów i
            marketplace dla mikro‑twórców.
          </p>
          <Link to="/" className="info-button">
            Wróć do strony głównej
          </Link>
        </div>
      </section>

      <section className="info-stats">
        {stats.map((stat) => (
          <div key={stat.value} className="info-stat">
            <span className="info-stat__value">{stat.value}</span>
            <span className="info-stat__label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="info-news">
        <header className="info-section-header">
          <h2>Aktualności Picnest</h2>
          <p>Co miesiąc ogłaszamy nowe funkcje lub raporty trendów. Oto najnowsze z nich.</p>
        </header>
        <div className="info-news__list">
          {newsItems.map((item) => (
            <article key={item.title} className="info-news-card">
              <div className="info-news-card__media" />
              <h3>{item.title}</h3>
              <p className="info-news-card__summary">{item.summary}</p>
              <a href={item.link} className="info-news-card__link">
                Czytaj dalej →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="info-values">
        <div className="info-pill-group">
          <span>Impact</span>
          <span>Community</span>
          <span>Product</span>
          <span>Planet</span>
        </div>
        <h2>Picnest zmienia sposób, w jaki ludzie zapisują pomysły.</h2>
        <p>
          Tworzymy najbardziej pozytywne miejsce w sieci. Chronimy społeczność, promujemy twórców i
          pomagamy realizować kreatywne cele – od projektu kuchni po plan marketingowy.
        </p>
        <ul className="info-values__list">
          {impactPillars.map((pillar) => (
            <li key={pillar.title}>
              <strong>{pillar.title}</strong>
              <span>{pillar.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="info-leadership">
        <header className="info-section-header">
          <h2>Zespół Picnest</h2>
          <p>Poznaj osoby, które dbają o produkt, społeczność i partnerstwa.</p>
        </header>
        <div className="info-leadership__grid">
          {leadership.map((person) => (
            <article key={person.name} className="info-leadership-card">
              <img src={person.avatar} alt={person.name} loading="lazy" />
              <div>
                <h3>{person.name}</h3>
                <span>{person.role}</span>
                <p>{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Informacje;
