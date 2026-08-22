"use client";

import type { SwipeDecision } from "@/types/book";
import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  onSwipe: (decision: SwipeDecision) => void;
  children: ReactNode;
};

const SWIPE_THRESHOLD = 100;

export function SwipeableCard({ onSwipe, children }: Props) {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  /** Latest offsets for window-level up handlers (avoid stale state). */
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const onSwipeRef = useRef(onSwipe);

  useEffect(() => {
    onSwipeRef.current = onSwipe;
  }, [onSwipe]);

  const scale = isDragging ? 1.05 : 1;

  // indicators
  const likeProgress = Math.min(Math.max(offsetX / SWIPE_THRESHOLD, 0), 1);
  const passProgress = Math.min(Math.max(-offsetX / SWIPE_THRESHOLD, 0), 1);

  const likeOpacity = isDragging ? likeProgress : 0;
  const passOpacity = isDragging ? passProgress : 0;

  function resetPosition() {
    offsetXRef.current = 0;
    offsetYRef.current = 0;
    setOffsetX(0);
    setOffsetY(0);
  }

  /** Shared end logic for element + window (release outside browser). */
  function endDrag(clientX?: number) {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    // Prefer last known offset; fall back to event position if provided
    const dx =
      clientX !== undefined ? clientX - startX.current : offsetXRef.current;

    if (dx > SWIPE_THRESHOLD) {
      onSwipeRef.current("like");
    } else if (dx < -SWIPE_THRESHOLD) {
      onSwipeRef.current("dislike");
    }

    resetPosition();
  }

  function cancelDrag() {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    resetPosition();
  }

  // When the pointer is released outside the window, the card often never
  // gets pointerup. Listen on window while a drag is active.
  useEffect(() => {
    if (!isDragging) return;

    function onWindowPointerUp(e: PointerEvent) {
      endDrag(e.clientX);
    }

    function onWindowPointerCancel() {
      cancelDrag();
    }

    // Switched app / browser lost focus mid-drag
    function onWindowBlur() {
      cancelDrag();
    }

    window.addEventListener("pointerup", onWindowPointerUp);
    window.addEventListener("pointercancel", onWindowPointerCancel);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("pointerup", onWindowPointerUp);
      window.removeEventListener("pointercancel", onWindowPointerCancel);
      window.removeEventListener("blur", onWindowBlur);
    };
    // endDrag/cancelDrag close over refs; only re-bind when drag starts/stops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startY.current = e.clientY;
    isDraggingRef.current = true;
    setIsDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    offsetXRef.current = dx;
    offsetYRef.current = dy;
    setOffsetX(dx);
    setOffsetY(dy);
  }

  function onPointerUp(e: React.PointerEvent) {
    endDrag(e.clientX);
  }

  function onPointerCancel() {
    cancelDrag();
  }

  function onLostPointerCapture() {
    if (isDraggingRef.current) {
      endDrag();
    }
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerCancel={onPointerCancel}
      onLostPointerCapture={onLostPointerCapture}
      onDragStart={(e) => e.preventDefault()}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        transition: isDragging
          ? "transform 120ms ease-out"
          : "transform 200ms ease-out",
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        boxShadow: isDragging ? "0 10px 40px rgba(0,0,0,0.2)" : "none",
      }}
      className="relative w-full max-w-sm touch-none select-none"
    >
      {children}

      {/* Swipe direction stamps — anchored to this card (relative parent) */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
      >
        {/* Drag left → pass: stamp on the left, red */}
        <div
          className="absolute left-4 top-6 rounded-lg border-4 border-rose-500 bg-white/90 px-3 py-1 text-2xl font-black uppercase tracking-wide text-rose-500 shadow-sm"
          style={{
            opacity: passOpacity,
            transform: `scale(${0.8 + passProgress * 0.2}) rotate(-12deg)`,
          }}
        >
          Pass
        </div>

        {/* Drag right → like: stamp on the right, green */}
        <div
          className="absolute right-4 top-6 rounded-lg border-4 border-emerald-500 bg-white/90 px-3 py-1 text-2xl font-black uppercase tracking-wide text-emerald-500 shadow-sm"
          style={{
            opacity: likeOpacity,
            transform: `scale(${0.8 + likeProgress * 0.2}) rotate(12deg)`,
          }}
        >
          Like
        </div>
      </div>
    </div>
  );
}
