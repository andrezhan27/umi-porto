"use client";

import { Carousel } from "../components/carousel";
import { BookingButton, BookingDialog, Header, Reveals } from "../components/interaction";
import { useLanguage } from "../components/language";
import { Brand, Icon, Photo, Seal, SectionHeading } from "../components/visuals";
import { dishes, navigation, restaurant, reviews, selections, spacePhotoDimensions, spacePhotos } from "./restaurant";

function MenuLink({ children }: { children: React.ReactNode }) {
  return <a className="text-link" href={restaurant.menuUrl}>{children} <Icon name="arrow-up-right" size={15} /></a>;
}

function Hero() {
  const { locale, copy: { hero } } = useLanguage();
  const { room } = spacePhotos;

  return (
    <section id="home" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <Photo {...spacePhotoDimensions} name={room.name} alt={room.alt[locale]} sizes="(max-width: 600px) 960px, 100vw" className="hero-image" priority />
      <div className="hero-shade" />
      <div className="shell hero-content">
        <div className="hero-kicker eyebrow">{hero.cuisine}<span aria-hidden="true" />{restaurant.neighborhood}, {restaurant.city}</div>
        <h1 id="hero-title">{restaurant.name}</h1>
        <div className="hero-actions">
          <BookingButton className="button-primary" />
          <a href="#menu" className="button button-light">{hero.viewMenu} <Icon name="arrow-down" size={16} /></a>
        </div>
      </div>
      <div className="shell hero-notes">
        <a className="eyebrow scroll-link" href="#space"><Icon name="arrow-down" size={18} /> {hero.scroll}</a>
        <span className="eyebrow hero-coordinates" aria-hidden="true">{restaurant.coordinates}</span>
      </div>
    </section>
  );
}

function Space() {
  const { locale, copy: { space } } = useLanguage();

  return (
    <section id="space" className="section shell" tabIndex={-1}>
      <div className="section-intro" data-reveal>
        <SectionHeading>{space.title}</SectionHeading>
        <p>{space.intro}</p>
      </div>
      <div className="space-grid">
        {Object.entries(spacePhotos).map(([area, { name, alt, sizes }], index) => (
          <figure className="space-photo" key={area} data-reveal style={{ gridArea: area, "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}>
            <Photo {...spacePhotoDimensions} name={name} alt={alt[locale]} sizes={sizes} />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Menu() {
  const { locale, copy: { menu } } = useLanguage();

  return (
    <section id="menu" className="section tinted" tabIndex={-1}>
      <div className="shell">
        <div className="section-intro" data-reveal>
          <SectionHeading>{menu.title}</SectionHeading>
          <div>
            <p>{menu.intro}</p>
            <div className="section-links"><MenuLink>{menu.fullMenu}</MenuLink><a href="#house-favorites" className="text-link">{menu.favorites} <Icon name="arrow-down" size={15} /></a></div>
            <p className="fine-print">{menu.note}</p>
          </div>
        </div>
        <Carousel label={menu.photos} variant="dishes">
          {dishes.map(({ image, alt, category, name }) => (
            <figure className="dish-card" key={image}>
              <Photo name={image} alt={alt[locale]} sizes="(max-width: 600px) 83vw, (max-width: 1000px) 47vw, 490px" />
              <figcaption><span className="eyebrow">{category[locale]}</span><span>{name[locale]}</span></figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function HouseFavorites() {
  const { locale, copy: { menu } } = useLanguage();

  return (
    <section id="house-favorites" className="section shell" tabIndex={-1}>
      <div className="section-intro" data-reveal>
        <SectionHeading>{menu.favorites}</SectionHeading>
        <p>{menu.favoritesIntro}</p>
      </div>
      <div className="selection-panel" data-reveal>
        <div className="selection-top"><span aria-hidden="true" /><Seal /><span aria-hidden="true" /></div>
        <div className="selection-grid">
          {selections.map(({ label, items }) => (
            <div key={label.en}>
              <h3 className="eyebrow">{label[locale]}</h3>
              <dl>{items.map(({ name, price }) => <div key={name.en}><dt>{name[locale]}</dt><dd>{price}</dd></div>)}</dl>
            </div>
          ))}
        </div>
        <p className="fine-print">{menu.favoritesNote(<a href={restaurant.mapsUrl}>{menu.postedMenu}</a>)}</p>
      </div>
    </section>
  );
}

function Visit() {
  const { locale, copy: { visit } } = useLanguage();
  const { sign } = spacePhotos;

  return (
    <section id="visit" className="section shell visit" tabIndex={-1}>
      <div className="section-intro" data-reveal><SectionHeading>{visit.title}</SectionHeading></div>
      <div className="visit-grid">
        <figure className="visit-photo" data-reveal>
          <Photo {...spacePhotoDimensions} name={sign.name} alt={sign.alt[locale]} sizes="(max-width: 600px) 100vw, (max-width: 1420px) 50vw, 652px" />
        </figure>
        <div className="visit-content" data-reveal>
          <p>{visit.intro}</p>
          <dl className="visit-details">
            <div><dt><Icon name="pin" /> {visit.address}</dt><dd><a href={restaurant.directionsUrl}>{restaurant.address}<br />{restaurant.postalAddress} <Icon name="arrow-up-right" size={14} /></a></dd></div>
            <div><dt><Icon name="clock" /> {visit.hours}</dt><dd>{restaurant.hours.map(({ days, times }) => <p key={days.en}><strong>{days[locale]}</strong><br />{times}</p>)}<p className="fine-print">{visit.hoursNote}</p></dd></div>
            <div><dt><Icon name="phone" /> {visit.contact}</dt><dd><a href={restaurant.phoneHref}>{restaurant.phone}</a></dd></div>
            <div>
              <dt><Icon name="at-sign" /> {visit.social}</dt>
              <dd className="visit-social">
                {restaurant.socialLinks.map(({ label, url }) => <a key={url} href={url}>{label} <Icon name="arrow-up-right" size={14} /></a>)}
              </dd>
            </div>
          </dl>
          <div className="visit-actions"><BookingButton className="button-primary" /><a href={restaurant.directionsUrl} className="text-link">{visit.directions} <Icon name="arrow-up-right" size={15} /></a></div>
        </div>
      </div>
      <iframe className="map" title={visit.mapTitle} src={restaurant.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </section>
  );
}

function Reviews() {
  const { locale, copy: { reviews: reviewCopy } } = useLanguage();
  const { stone } = spacePhotos;
  if (!reviews.length) return null;

  return (
    <section id="reviews" className="section tinted" tabIndex={-1}>
      <div className="shell">
        <div className="section-intro" data-reveal>
          <SectionHeading>{reviewCopy.title}</SectionHeading>
          <div className="review-intro"><a className="text-link" href={restaurant.mapsUrl}>{reviewCopy.link} <Icon name="arrow-up-right" size={15} /></a></div>
        </div>
        <div className="review-scene">
          <div className="review-photo">
            <Photo {...spacePhotoDimensions} name={stone.name} alt={stone.alt[locale]} sizes="(max-width: 1420px) 100vw, 1320px" />
            {restaurant.rating && (
              <a href={restaurant.mapsUrl} className="rating-badge">
                <span className="eyebrow">{restaurant.rating.platform}</span>
                <span className="rating-score">{locale === "pt" ? restaurant.rating.value.replace(".", ",") : restaurant.rating.value}<span className="stars" aria-label={reviewCopy.stars(restaurant.rating.value)} style={{ "--rating-fill": `${Number(restaurant.rating.value) * 20}%` } as React.CSSProperties}>★★★★★</span></span>
                <span className="fine-print">{reviewCopy.count(restaurant.rating.count)}</span>
              </a>
            )}
          </div>
          <Carousel label={reviewCopy.title} variant="reviews">
            {reviews.map(({ quote, name, stars, language }) => (
              <figure className="review-card" key={name}>
                <span className="stars" aria-label={reviewCopy.stars(stars)}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
                <blockquote lang={language}>“{quote}”</blockquote>
                <figcaption><span className="initial" aria-hidden="true">{name[0]}</span><div>{name}<small>Google Maps</small></div></figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div><a href="#home" aria-label={copy.homeLink}><Brand /></a><p className="footer-tagline">{copy.footerTagline}</p></div>
          <div><h2 className="eyebrow">{copy.footer.explore}</h2><ul>{navigation.slice(1).map((id) => <li key={id}><a href={`#${id}`}>{copy.navigation[id]}</a></li>)}</ul></div>
          <div>
            <h2 className="eyebrow">{copy.footer.findUs}</h2>
            <ul>
              <li><a href={restaurant.directionsUrl}>{restaurant.address}<br />{restaurant.postalAddress}</a></li>
              <li><a href={restaurant.phoneHref}>{restaurant.phone}</a></li>
              {[...restaurant.socialLinks, ...restaurant.legalLinks].map(({ label, url }) => <li key={url}><a href={url}>{label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {restaurant.name} · {restaurant.city}</p><a href="https://intelis.pt">{copy.footer.credit}</a></div>
      </div>
    </footer>
  );
}

export default function Home() {
  const { copy } = useLanguage();

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Space />
        <Menu />
        <HouseFavorites />
        <Visit />
        <Reviews />
      </main>
      <Footer />
      <BookingDialog />
      <Reveals />
    </>
  );
}
