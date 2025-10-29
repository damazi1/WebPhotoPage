import { Link } from "react-router-dom";
import "../Styles/Informacje.css";

function Informacje() {
  return (
    <div className="info-page">
      <section className="info-hero">
        <div className="info-hero__content">
          <p className="info-hero__eyebrow">About NAZWA NASZA</p>
          <h1>
            Get inspired,
            <br />
            then get started.
            <br />
            All on NAZWA NASZA.
          </h1>
          <p className="info-hero__description">
            Pinterest is a visual search and discovery platform where people find inspiration,
            curate ideas and shop – all in a positive place online. Headquartered in San Francisco,
            Pinterest launched in 2010 and has over half a billion monthly active users worldwide.
          </p>
          <Link to="/" className="info-button">
            Strona główna
          </Link>
        </div>
      </section>

      <section className="info-stats">
        <div className="info-stat">
          <span className="info-stat__value">578 mln</span>
          <span className="info-stat__label">monthly active users</span>
        </div>
        <div className="info-stat">
          <span className="info-stat__value">1.5 bln</span>
          <span className="info-stat__label">pins saved every week</span>
        </div>
        <div className="info-stat">
          <span className="info-stat__value">50%+</span>
          <span className="info-stat__label">
            of users think of NAZWA NASZA
            <br />
            as a place to shop
          </span>
        </div>
      </section>

      <section className="info-news">
        <header className="info-section-header">
          <h2>Latest news</h2>
          <p>Zmapuj tutaj najnowsze artykuły z bloga lub newsroomu.</p>
        </header>
        <div className="info-news__list">
          <article className="info-news-card">
            <div className="info-news-card__media" />
            <h3>
              NAZWA NASZA rolls out new tools to give users more control over GenAI content
            </h3>
          </article>
          <article className="info-news-card">
            <div className="info-news-card__media" />
            <h3>
              NAZWA NASZA introduces Top of Search ads and new advertising tools to power visual
              shopping decisions
            </h3>
          </article>
          <article className="info-news-card">
            <div className="info-news-card__media" />
            <h3>
              Where-to-buy links turn inspiration into action for CPG brands on NAZWA NASZA
            </h3>
          </article>
        </div>
      </section>

      <section className="info-values">
        <div className="info-pill-group">
          <span>Impact</span>
          <span>People</span>
          <span>Product</span>
          <span>Planet</span>
        </div>
        <h2>
          A more inspired internet.
          <br />
          A better world. It&apos;s possible.
        </h2>
        <p>
          We&apos;re building a more positive place online. A place that inspires the people we serve
          and protects the planet we share.
        </p>
      </section>

      <section className="info-leadership">
        <header className="info-section-header">
          <h2>Meet NAZWA NASZA leadership</h2>
          <p>Get to know our executive team.</p>
        </header>
        <div className="info-leadership__carousel">
          <div className="info-placeholder">
            Tutaj wstaw karuzelę zdjęć przewijaną w lewo z animacją rotacji.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Informacje;
