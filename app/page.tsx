import { Carousel } from "../components/carousel";
import { BookingButton, BookingDialog, Header, Reveals } from "../components/interaction";
import { Brand, Icon, Photo, Seal, SectionHeading } from "../components/visuals";
import { dishes, navigation, restaurant, reviews, selections, spacePhotos } from "./restaurant";

function MenuLink({ children }: { children: React.ReactNode }) {
  return <a className="text-link" href={restaurant.menuUrl}>{children} <Icon name="arrow-up-right" size={15} /></a>;
}

function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <picture>
        <source media="(max-width: 600px)" srcSet="/images/hero-mobile.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-image" src="/images/hero.webp" srcSet="/images/hero-medium.webp 1152w, /images/hero.webp 1920w" sizes="100vw" width={1920} height={1280} alt="Illustrative dining room with glowing amber lanterns, warm wood and set tables" fetchPriority="high" />
      </picture>
      <div className="hero-shade" />
      <div className="shell hero-content">
        <div className="hero-kicker eyebrow">{restaurant.cuisine}<span aria-hidden="true" />{restaurant.neighborhood}, {restaurant.city}</div>
        <h1 id="hero-title">{restaurant.name}</h1>
        <p>{restaurant.heroLine}</p>
        <div className="hero-actions">
          <BookingButton className="button-primary" />
          <a href="#menu" className="button button-light">View Menu <Icon name="arrow-down" size={16} /></a>
        </div>
      </div>
      <div className="shell hero-notes">
        <a className="eyebrow scroll-link" href="#space"><Icon name="arrow-down" size={18} /> Scroll to explore</a>
        <span className="eyebrow hero-coordinates" aria-hidden="true">{restaurant.coordinates}</span>
      </div>
    </section>
  );
}

function Space() {
  return (
    <section id="space" className="section shell" tabIndex={-1}>
      <div className="section-intro" data-reveal>
        <SectionHeading>The Space</SectionHeading>
        <p>Step in from Rua de Cedofeita and settle in under warm pendant lights. There’s room for a quick lunch, dinner with friends, or an evening that takes its time.</p>
      </div>
      <div className="space-grid">
        {spacePhotos.map(({ image, alt, wide }, index) => (
          <figure className={`space-photo${wide ? " space-photo-wide" : ""}`} key={image} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}>
            <Photo name={image} alt={alt} sizes={wide ? "(max-width: 600px) 59vw, (max-width: 1420px) 57vw, 760px" : "(max-width: 1420px) 40vw, 550px"} />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Menu() {
  return (
    <section id="menu" className="section tinted" tabIndex={-1}>
      <div className="shell">
        <div className="section-intro" data-reveal>
          <SectionHeading>The Menu</SectionHeading>
          <div>
            <p>Start with a sushi platter for the table, add a round of dumplings, or order something hot from the chapa.</p>
            <div className="section-links"><MenuLink>View Full Menu</MenuLink><a href="#house-favorites" className="text-link">House Favorites <Icon name="arrow-down" size={15} /></a></div>
            <p className="fine-print">{restaurant.menuNote}</p>
          </div>
        </div>
        <Carousel label="Menu photos" variant="dishes">
          {dishes.map(({ image, alt, category, name }) => (
            <figure className="dish-card" key={image}>
              <Photo name={image} alt={alt} sizes="(max-width: 600px) 83vw, (max-width: 1000px) 47vw, 490px" />
              <figcaption><span className="eyebrow">{category}</span><span>{name}</span></figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

function HouseFavorites() {
  return (
    <section id="house-favorites" className="section shell" tabIndex={-1}>
      <div className="section-intro" data-reveal>
        <SectionHeading>House Favorites</SectionHeading>
        <p>Bring a few plates to the middle or make a meal of a sizzling chapa. Here’s a short selection from the UMI menu.</p>
      </div>
      <div className="selection-panel" data-reveal>
        <div className="selection-top"><span aria-hidden="true" /><Seal /><span aria-hidden="true" /></div>
        <div className="selection-grid">
          {selections.map(({ label, items }) => (
            <div key={label}>
              <h3 className="eyebrow">{label}</h3>
              <dl>{items.map(({ name, price }) => <div key={name}><dt>{name}</dt><dd>{price}</dd></div>)}</dl>
            </div>
          ))}
        </div>
        <p className="fine-print">From UMI’s <a href={restaurant.mapsUrl}>posted menu</a>. Call to confirm current prices and availability.</p>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="section shell visit" tabIndex={-1}>
      <div className="section-intro" data-reveal><SectionHeading>Plan Your Visit</SectionHeading></div>
      <div className="visit-grid">
        <figure className="visit-photo" data-reveal>
          <Photo name="space-nook" alt="Illustrative dining nook with amber lamps and upholstered chairs" sizes="(max-width: 600px) 100vw, (max-width: 1420px) 50vw, 652px" />
        </figure>
        <div className="visit-content" data-reveal>
          <p>Find us on Rua de Cedofeita, in the heart of Porto. Come by for lunch or make an evening of it.</p>
          <dl className="visit-details">
            <div><dt><Icon name="pin" /> Address</dt><dd><a href={restaurant.directionsUrl}>{restaurant.address}<br />{restaurant.postalAddress} <Icon name="arrow-up-right" size={14} /></a></dd></div>
            <div><dt><Icon name="clock" /> Opening Hours</dt><dd>{restaurant.hours.map(({ days, times }) => <p key={days}><strong>{days}</strong><br />{times}</p>)}<p className="fine-print">{restaurant.hoursNote}</p></dd></div>
            <div><dt><Icon name="phone" /> Contact</dt><dd><a href={restaurant.phoneHref}>{restaurant.phone}</a></dd></div>
            <div>
              <dt><Icon name="at-sign" /> Social</dt>
              <dd className="visit-social">
                {restaurant.socialLinks.map(({ label, url }) => <a key={url} href={url}>{label} <Icon name="arrow-up-right" size={14} /></a>)}
              </dd>
            </div>
          </dl>
          <div className="visit-actions"><BookingButton className="button-primary" /><a href={restaurant.directionsUrl} className="text-link">Get Directions <Icon name="arrow-up-right" size={15} /></a></div>
        </div>
      </div>
      <iframe className="map" title="Google Maps showing UMI on Rua de Cedofeita in Porto" src={restaurant.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </section>
  );
}

function Reviews() {
  if (!reviews.length) return null;

  return (
    <section id="reviews" className="section tinted" tabIndex={-1}>
      <div className="shell">
        <div className="section-intro" data-reveal>
          <SectionHeading>Guest Reviews</SectionHeading>
          <div className="review-intro"><a className="text-link" href={restaurant.mapsUrl}>Read Reviews on Google <Icon name="arrow-up-right" size={15} /></a></div>
        </div>
        <div className="review-scene">
          <div className="review-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="photo" src="/images/hero-medium.webp" alt="Illustrative panorama of the lantern-lit dining room" width={1152} height={768} loading="lazy" decoding="async" />
            {restaurant.rating && (
              <a href={restaurant.mapsUrl} className="rating-badge">
                <span className="eyebrow">{restaurant.rating.platform}</span>
                <span className="rating-score">{restaurant.rating.value}<span className="stars" aria-label={`${restaurant.rating.value} out of 5 stars`} style={{ "--rating-fill": `${Number(restaurant.rating.value) * 20}%` } as React.CSSProperties}>★★★★★</span></span>
                <span className="fine-print">{restaurant.rating.count} reviews</span>
              </a>
            )}
          </div>
          <Carousel label="Guest reviews" variant="reviews">
            {reviews.map(({ quote, name, stars, language }) => (
              <figure className="review-card" key={name}>
                <span className="stars" aria-label={`${stars} out of 5 stars`}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
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
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div><a href="#home" aria-label={`${restaurant.name} home`}><Brand /></a><p className="footer-tagline">{restaurant.tagline}</p></div>
          <div><h2 className="eyebrow">Explore</h2><ul>{navigation.slice(1).map(({ id, label }) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul></div>
          <div>
            <h2 className="eyebrow">Find Us</h2>
            <ul>
              <li><a href={restaurant.directionsUrl}>{restaurant.address}<br />{restaurant.postalAddress}</a></li>
              <li><a href={restaurant.phoneHref}>{restaurant.phone}</a></li>
              {[...restaurant.socialLinks, ...restaurant.legalLinks].map(({ label, url }) => <li key={url}><a href={url}>{label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} {restaurant.name} · {restaurant.city}</p><a href="https://intelis.pt">Powered by Intelis</a></div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
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
