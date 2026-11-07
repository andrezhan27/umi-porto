"use client";

import { useEffect, useRef, useState } from "react";
import { navigation, restaurant } from "../app/restaurant";
import { Brand, Icon } from "./visuals";

export function BookingButton({ className = "", onOpen }: { className?: string; onOpen?: () => void }) {
  if (restaurant.bookingUrl) return <a className={`button ${className}`} href={restaurant.bookingUrl} onClick={onOpen}>Book a Table <Icon name="arrow-up-right" size={16} /></a>;

  return (
    <button className={`button ${className}`} type="button" aria-haspopup="dialog" onClick={() => {
      onOpen?.();
      const dialog = document.querySelector<HTMLDialogElement>("#booking");
      if (dialog && !dialog.open) dialog.showModal();
    }}>
      Book a Table <Icon name="arrow-up-right" size={16} />
    </button>
  );
}

export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <dialog ref={ref} id="booking" className="booking-dialog" aria-labelledby="booking-title" onClick={(event) => {
      if (event.target === event.currentTarget) ref.current?.close();
    }}>
      <div className="booking-dialog-inner">
        <button type="button" className="icon-button dialog-close" aria-label="Close booking" onClick={() => ref.current?.close()}><Icon name="close" /></button>
        <Brand />
        <h2 id="booking-title">Book a Table</h2>
        <p>Call UMI to ask about a table and confirm availability.</p>
        <a className="button button-primary" href={restaurant.phoneHref}><Icon name="phone" size={17} /> {restaurant.phone}</a>
        <p className="fine-print">Online booking link pending.</p>
      </div>
    </dialog>
  );
}

export function Header() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const sections = navigation.map(({ id }) => document.getElementById(id));

    function measure() {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const marker = Math.min(window.innerHeight * 0.36, 260);
      let current = navigation[0].id;
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
  }, []);

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
      if (event.key === "Escape" && !document.querySelector("#booking[open]")) {
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
          <a href="#home" className="brand-link" aria-label={`${restaurant.name} home`} onClick={() => setOpen(false)}><Brand /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}
          </nav>
          <BookingButton className="button-outline header-booking" />
          <button ref={trigger} type="button" className="icon-button menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} size={25} />
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label="Mobile navigation">
          <div className="shell mobile-nav-inner">
            <p className="eyebrow">Explore UMI</p>
            <ol>
              {navigation.map(({ id, label }, index) => (
                <li key={id}>
                  <a ref={index === 0 ? firstLink : undefined} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => {
                    setOpen(false);
                    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
                  }}>
                    <span aria-hidden="true">0{index + 1}</span>{label}<Icon name="arrow-up-right" />
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
