"use client";

import { useEffect, useRef, useState } from "react";
import { languages } from "../app/copy";
import { navigation, restaurant } from "../app/restaurant";
import { useLanguage } from "./language";
import { Brand, Icon } from "./visuals";

export function BookingButton({ className = "", onOpen }: { className?: string; onOpen?: () => void }) {
  const { copy: { booking } } = useLanguage();
  const classes = `button booking-button ${className}`;
  if (restaurant.bookingUrl) return <a className={classes} href={restaurant.bookingUrl} onClick={onOpen}>{booking.action}</a>;

  return (
    <button className={classes} type="button" aria-haspopup="dialog" onClick={() => {
      onOpen?.();
      const dialog = document.querySelector<HTMLDialogElement>("#booking");
      if (dialog && !dialog.open) dialog.showModal();
    }}>
      {booking.action}
    </button>
  );
}

export function BookingDialog() {
  const { copy: { booking } } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <dialog ref={ref} id="booking" className="booking-dialog" aria-labelledby="booking-title" onClick={(event) => {
      if (event.target === event.currentTarget) ref.current?.close();
    }}>
      <div className="booking-dialog-inner">
        <button type="button" className="icon-button dialog-close" aria-label={booking.close} onClick={() => ref.current?.close()}><Icon name="close" /></button>
        <Brand />
        <h2 id="booking-title">{booking.action}</h2>
        <p>{booking.description}</p>
        <a className="button button-primary" href={restaurant.phoneHref}>{restaurant.phone}</a>
        <p className="fine-print">{booking.note}</p>
      </div>
    </dialog>
  );
}

function LanguageSwitch() {
  const { locale, setLocale, copy } = useLanguage();

  return (
    <label className="language-switch">
      <span aria-hidden="true">{locale.toUpperCase()} <Icon name="chevron-down" size={14} /></span>
      <select aria-label={copy.language} value={locale} onChange={(event) => {
        const value = event.currentTarget.value;
        if (value === "pt" || value === "en") setLocale(value);
      }}>
        <option value="pt" lang={languages.pt.tag}>{languages.pt.name}</option>
        <option value="en" lang={languages.en.tag}>{languages.en.name}</option>
      </select>
    </label>
  );
}

export function Header() {
  const { locale, copy } = useLanguage();
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const sections = navigation.map((id) => document.getElementById(id));

    function measure() {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const marker = Math.min(window.innerHeight * 0.36, 260);
      let current: string = navigation[0];
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= marker) current = section.id;
      }
      setActive(current);
    }

    function update() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const breakpoint = window.matchMedia("(min-width: 800px)");
    const content = document.querySelectorAll<HTMLElement>("main, footer");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    content.forEach((element) => { element.inert = true; });
    firstLink.current?.focus();

    function closeOnResize(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && !(event.target instanceof HTMLSelectElement) && !document.querySelector("#booking[open]")) {
        setOpen(false);
        trigger.current?.focus();
      }
    }

    breakpoint.addEventListener("change", closeOnResize);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      content.forEach((element) => { element.inert = false; });
      breakpoint.removeEventListener("change", closeOnResize);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled} data-menu-open={open}>
        <div className="shell header-inner">
          <a href="#home" className="brand-link" aria-label={copy.homeLink} onClick={() => setOpen(false)}><Brand /></a>
          <nav className="desktop-nav" aria-label={copy.mainNavigation}>
            {navigation.map((id) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{copy.navigation[id]}</a>)}
          </nav>
          <div className="header-actions">
            <LanguageSwitch />
            <BookingButton className="button-outline header-booking" />
            <button ref={trigger} type="button" className="icon-button menu-toggle" aria-label={open ? copy.closeNavigation : copy.openNavigation} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
              <Icon name={open ? "close" : "menu"} size={25} />
            </button>
          </div>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label={copy.mainNavigation}>
          <div className="shell mobile-nav-inner">
            <p className="eyebrow">{copy.exploreUmi}</p>
            <ol>
              {navigation.map((id, index) => (
                <li key={id}>
                  <a ref={index === 0 ? firstLink : undefined} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => {
                    setOpen(false);
                    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
                  }}>
                    <span aria-hidden="true">0{index + 1}</span>{copy.navigation[id]}<Icon name="arrow-up-right" />
                  </a>
                </li>
              ))}
            </ol>
            <BookingButton className="button-primary" onOpen={() => { setOpen(false); trigger.current?.focus(); }} />
          </div>
        </nav>
      </header>
      {!open && <BookingButton className="button-primary floating-booking" />}
    </>
  );
}

export function Reveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("reveal-in");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
