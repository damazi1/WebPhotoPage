import "../Styles/Explore.css";

const trendingPins = [
  {
    title: "Ciepłe, minimalistyczne kuchnie",
    description: "Jasne drewno, wyspa z kamienia i odważne oświetlenie. Zapisane już ponad 2 300 razy.",
    tags: ["wnętrza", "minimalizm"],
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "City break w formie kolażu",
    description: "Kolorowe moodboardy pomagają zaplanować weekend w Barcelonie lub Porto.",
    tags: ["podróże", "kolaż"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Roślinne salony",
    description: "Domowe dżungle w stylu japandi to najchętniej zapisywane pomysły tej jesieni.",
    tags: ["home decor"],
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Stylizacje core-kolor",
    description: "Pastelowe zestawy Picnestowych stylistek biją rekordy zapisów wśród Gen Z.",
    tags: ["moda", "pastel"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=60",
  },
];

const exploreCategories = [
  { title: "Wnętrza", description: "Kuchnie, salony, makiety do DIY", accent: "#f8b500" },
  { title: "Moda", description: "Lookbooki, kapsułowe szafy, core-trendy", accent: "#ff7eb6" },
  { title: "Jedzenie", description: "Proste kolacje, meal-prep i fit słodkości", accent: "#75d6b0" },
  { title: "Podróże", description: "City breaki, mapy bucket list, przewodniki", accent: "#7bb5ff" },
  { title: "Wellness", description: "Poranne rutyny, journaling, self-care", accent: "#c493ff" },
];

const freshStories = [
  {
    title: "Planner Picnest: zimowe inspiracje",
    description: "Gotowe szablony tablic pomagają zaplanować prezenty i wystroje świąteczne.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Raport trendów Picnest 2025",
    description: "Analizujemy, które motywy zapisują pokolenia Z i Alpha – oraz jak wykorzystać je w marce.",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Zapisane do wydruku",
    description: "Nowa funkcja pozwala eksportować ulubione tablice do PDF-ów i moodboardów offline.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "Kreator AI Moodboard",
    description: "Połącz swoje zdjęcia z biblioteką Picnest AI i wygeneruj moodboard w 30 sekund.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=60",
  },
];

function Explore() {
  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero__content">
          <h1>Odkrywaj Picnest</h1>
          <p>
            Wszystko, co inspiruje do działania: projekty DIY, kapsułowe szafy, przepisy i przewodniki podróżnicze.
            Zapisuj pomysły i twórz własne kolekcje w ciągu kilku sekund.
          </p>
          <div className="explore-search">
            <input
              className="explore-search__input"
              type="search"
              placeholder="Spróbuj: zimowa kapsuła · domowe studio · comfort food"
            />
            <button className="explore-search__button" type="button">
              Szukaj
            </button>
          </div>
        </div>
      </section>

      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Na topie</span>
          <h2>Najczęściej zapisywane tablice społeczności Picnest</h2>
          <p className="explore-section__description">
            Trendy aktualizujemy co kilka godzin. Zainspiruj się i dodaj je do swoich kolekcji.
          </p>
        </header>

        <div className="explore-grid explore-grid--featured">
          {trendingPins.map((pin) => (
            <article key={pin.title} className="explore-card" style={{ backgroundImage: `url(${pin.image})` }}>
              <div className="explore-card__overlay" />
              <div className="explore-card__content">
                <h3>{pin.title}</h3>
                <p>{pin.description}</p>
                <div className="explore-card__tags">
                  {pin.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="explore-see-more" type="button">
          Zobacz wszystkie trendy
        </button>
      </section>

      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Katalog</span>
          <h2>Przeglądaj Picnest według nastroju</h2>
          <p className="explore-section__description">
            Kategorie łączymy z poradami ekspertów i gotowymi listami inspiracji.
          </p>
        </header>

        <div className="explore-grid explore-grid--categories">
          {exploreCategories.map((category) => (
            <article
              key={category.title}
              className="explore-category"
              style={{
                background: `linear-gradient(135deg, ${category.accent} 0%, rgba(255,255,255,0.15) 100%)`,
              }}
            >
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <button type="button">Otwórz kolekcję</button>
            </article>
          ))}
        </div>
      </section>

      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Nowe na Picnest</span>
          <h2>Historie, które właśnie przygotowaliśmy</h2>
          <p className="explore-section__description">
            Co tydzień kuratorzy Picnest publikują raporty, plannery i listy zadań dla społeczności.
          </p>
        </header>

        <div className="explore-grid explore-grid--stories">
          {freshStories.map((story) => (
            <article key={story.title} className="explore-story">
              <img src={story.image} alt={story.title} loading="lazy" />
              <div className="explore-story__content">
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <button type="button">Przeczytaj</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Explore;
