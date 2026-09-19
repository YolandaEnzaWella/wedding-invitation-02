/* ===========================================================================
   POLA ANIMASI YANG DIPAKAI BERULANG
   ---------------------------------------------------------------------------
   Dikumpulkan di satu tempat supaya ritme animasi antar-section terasa satu
   napas: durasi, easing, dan jarak geser yang sama.
   =========================================================================== */

/** Easing lembut khas gerakan "melayang" — bukan bounce. */
export const EASE = [0.22, 1, 0.36, 1]

/** Fade + naik pelan. Pola paling sering dipakai di hampir semua section. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

/** Masuk dari samping — kartu mempelai pria (kiri) dan wanita (kanan). */
export const fadeFrom = (x) => ({
  hidden: { opacity: 0, x },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
})

/** Fade + membesar dari 0.9 — foto berbingkai, ikon. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
}

/**
 * Pembungkus daftar: anak-anaknya muncul berurutan, bukan serentak.
 * Pakai bersama salah satu varian di atas pada tiap anak.
 */
export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Garis SVG yang "digambar" 0 → 1. */
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: 'easeInOut' },
  },
}

/** Naik-turun pelan tanpa henti — bunga kecil, kelopak, ikon musik. */
export const floating = (distance = 10, duration = 5, delay = 0) => ({
  y: [0, -distance, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut',
  },
})

/** Setelan `whileInView` standar: sekali jalan, tidak mengulang saat scroll balik. */
export const inViewOnce = { once: true, amount: 0.25 }
