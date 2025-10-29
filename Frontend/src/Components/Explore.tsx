import "../Styles/Explore.css";

function Explore() {
  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero__content">
          <h1>Explore the best of Pinterest</h1>
          <p>Discover trendy inspirations, curated boards, and the freshest ideas from the community.</p>
          <div className="explore-search">
            <input
              className="explore-search__input"
              type="search"
              placeholder="Szukaj pomysłów: kolacje, moda, wystroje..."
            />
            <button className="explore-search__button" type="button">
              Szukaj
            </button>
          </div>
        </div>
      </section>

      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Trending teraz</span>
          <h2>Najpopularniejsze piny społeczności</h2>
          <p className="explore-section__description">
            Poniżej w mapowaniu wstaw karty z trendującymi pinami.
          </p>
        </header>

        <div className="explore-grid explore-grid--featured">
          <div className="explore-placeholder">Mapowanie tu ma być</div>
        </div>

        <button className="explore-see-more" type="button">
          Zobacz więcej
        </button>
      </section>

      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Kategorie</span>
          <h2>Przeglądaj według kategorii</h2>
          <p className="explore-section__description">
            Tutaj w mapowaniu dodaj listę kategorii z obrazkami lub ikonami.
          </p>
        </header>

        <div className="explore-grid explore-grid--categories">
          <div className="explore-placeholder">Tu też jakieś mapowanie</div>
        </div>

        <button className="explore-see-more" type="button">
          Zobacz więcej
        </button>
      </section>

      <section className="explore-section">
        <header className="explore-section__header">
          <span className="explore-section__eyebrow">Nowości</span>
          <h2>Co nowego na Pinterest</h2>
          <p className="explore-section__description">
            Grida możesz zamienić na masonry o stałej szerokości i różnych wysokościach kafelków.
          </p>
        </header>

        <div className="explore-grid explore-grid--masonry">
          <div className="explore-placeholder">
            Tu zdjęcia mają mieć stałą szerokość ale różną wysokość – wstaw tutaj mapowanie.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Explore;
