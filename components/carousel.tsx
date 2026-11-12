"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "./language";

const autoplaySpeed = 0.032;
const dragCoastTime = 230;
const keyboardCoastTime = 150;
const velocityWindow = 80;
const maxReleaseSpeed = 3.2;

type PointerSample = { x: number; time: number };

function recordPointer(samples: PointerSample[], event: PointerEvent) {
  const sample = { x: event.clientX, time: event.timeStamp };
  const previous = samples.at(-1);
  if (previous && sample.time < previous.time) return;
  if (previous && sample.time === previous.time) previous.x = sample.x;
  else samples.push(sample);

  while (samples.length > 2 && samples[1].time <= sample.time - velocityWindow) {
    samples.shift();
  }
}

function releaseSpeed(samples: PointerSample[]) {
  const end = samples.at(-1);
  if (!end || samples.length < 2) return 0;

  // Interpolate at the start of the window so event frequency doesn't change the feel.
  const [first, next] = samples;
  const startTime = Math.max(first.time, end.time - velocityWindow);
  const startX = first.x + (next.x - first.x) * (startTime - first.time) / (next.time - first.time);
  const speed = (startX - end.x) / Math.max(end.time - startTime, 16);
  return Math.max(-maxReleaseSpeed, Math.min(maxReleaseSpeed, speed));
}

export function Carousel({ label, variant, children }: { label: string; variant: "dishes" | "reviews"; children: ReactNode }) {
  const { copy: { carousel } } = useLanguage();
  const track = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const originals = useRef<HTMLDivElement>(null);
  const autoplay = useRef(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const viewport = track.current;
    const row = strip.current;
    const cards = originals.current;
    if (!viewport || !row || !cards) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let loopWidth = 0;
    let offset = 0;
    let momentum = 0;
    let coastTime = dragCoastTime;
    let frame = 0;
    let lastFrame = 0;
    let drag: { id: number; x: number; y: number; moved: boolean; samples: PointerSample[] } | null = null;

    function move(distance: number) {
      if (!loopWidth || !row) return;
      offset = ((offset + distance) % loopWidth + loopWidth) % loopWidth;
      row.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    function measure() {
      if (!viewport || !row || !cards) return;
      const width = cards.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      loopWidth = !motion.matches && width > viewport.clientWidth ? width + gap : 0;
      viewport.toggleAttribute("data-looping", Boolean(loopWidth));
      if (loopWidth) {
        viewport.scrollLeft = 0;
        move(0);
      } else {
        row.style.removeProperty("transform");
        offset = momentum = 0;
      }
    }

    function animate(now: number) {
      const elapsed = lastFrame ? Math.max(0, Math.min(now - lastFrame, 40)) : 0;
      lastFrame = now;
      if (loopWidth && !drag && (autoplay.current || momentum)) {
        const decay = Math.exp(-elapsed / coastTime);
        move((autoplay.current ? autoplaySpeed * elapsed : 0) + momentum * coastTime * (1 - decay));
        momentum *= decay;
        if (Math.abs(momentum) < 0.003) momentum = 0;
      }
      frame = requestAnimationFrame(animate);
    }

    function onPointerDown(event: PointerEvent) {
      if (!loopWidth || drag || !event.isPrimary || event.button !== 0 || !viewport) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, samples: [] };
      recordPointer(drag.samples, event);
      momentum = 0;
      viewport.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.id || !viewport) return;
      const distance = drag.x - event.clientX;
      if (!drag.moved) {
        if (event.pointerType === "touch") {
          const vertical = Math.abs(drag.y - event.clientY);
          if (Math.max(Math.abs(distance), vertical) < 4) return;
          if (vertical > Math.abs(distance)) {
            drag = null;
            return;
          }
        } else if (!distance) return;

        drag.moved = true;
        viewport.setAttribute("data-dragging", "");
      }
      for (const sample of event.getCoalescedEvents?.() ?? []) recordPointer(drag.samples, sample);
      recordPointer(drag.samples, event);
      drag.x = event.clientX;
      move(distance);
    }

    function onPointerEnd(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.id) return;
      if (event.type === "pointerup" && drag.moved) {
        move(drag.x - event.clientX);
        recordPointer(drag.samples, event);
        coastTime = dragCoastTime;
        momentum = releaseSpeed(drag.samples) - (autoplay.current ? autoplaySpeed : 0);
        lastFrame = event.timeStamp;
      }
      drag = null;
      viewport?.removeAttribute("data-dragging");
    }

    function onWheel(event: WheelEvent) {
      if (!loopWidth || drag || event.ctrlKey || !viewport) return;
      const { deltaX, deltaY, deltaMode } = event;
      const distance = event.shiftKey ? deltaX || deltaY : deltaX;
      if (!distance || (!event.shiftKey && Math.abs(deltaX) < Math.abs(deltaY))) return;
      event.preventDefault();
      momentum = 0;
      move(distance * (deltaMode === 1 ? 16 : deltaMode === 2 ? viewport.clientWidth : 1));
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!loopWidth || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      const card = cards?.firstElementChild;
      if (!card || !row) return;
      event.preventDefault();
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(row).columnGap);
      coastTime = keyboardCoastTime;
      momentum = (event.key === "ArrowRight" ? step : -step) / coastTime;
    }

    const resize = new ResizeObserver(measure);
    const intersection = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      lastFrame = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(animate);
    });
    measure();
    resize.observe(viewport);
    resize.observe(cards);
    intersection.observe(viewport);
    motion.addEventListener("change", measure);
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerEnd);
    viewport.addEventListener("pointercancel", onPointerEnd);
    viewport.addEventListener("lostpointercapture", onPointerEnd);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", measure);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerEnd);
      viewport.removeEventListener("pointercancel", onPointerEnd);
      viewport.removeEventListener("lostpointercapture", onPointerEnd);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={`carousel carousel-${variant}`} role="region" aria-label={label}>
      <div className="carousel-track" tabIndex={0} aria-label={carousel.keys} ref={track}>
        <div className="carousel-strip" ref={strip}>
          <div className="carousel-set" ref={originals}>{children}</div>
          <div className="carousel-set" aria-hidden="true" inert>{children}</div>
        </div>
      </div>
      <div className="carousel-controls">
        <span className="eyebrow">{variant === "dishes" ? carousel.kitchen : carousel.guests}</span>
        <button type="button" className="carousel-motion" onClick={() => {
          autoplay.current = paused;
          setPaused(!paused);
        }}>{paused ? carousel.play : carousel.pause}</button>
      </div>
    </div>
  );
}
