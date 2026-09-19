/* ===========================================================================
   IKON GARIS TIPIS
   ---------------------------------------------------------------------------
   Semua ikon dibuat sebagai SVG stroke agar tetap tajam di layar retina,
   mewarisi warna teks induknya (`currentColor`), dan tidak menambah berkas
   yang perlu diunduh tamu.
   =========================================================================== */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, size = 24, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...base}
      {...rest}
    >
      {children}
    </svg>
  )
}

/* --- Acara ---------------------------------------------------------------- */

export const Rings = (p) => (
  <Svg {...p}>
    <circle cx="9.5" cy="15" r="5.5" />
    <circle cx="15.5" cy="15" r="5.5" />
    <path d="M15.5 9.5 14 6.4h3l-1.5 3.1Z" />
  </Svg>
)

export const Glass = (p) => (
  <Svg {...p}>
    <path d="M8 3h8l-.7 4.2A3.4 3.4 0 0 1 12 10a3.4 3.4 0 0 1-3.3-2.8Z" />
    <path d="M12 10v8" />
    <path d="M9 21h6" />
    <path d="M18 3.5c1.6 1.4 2 3.4 1 5" />
  </Svg>
)

export const Pin = (p) => (
  <Svg {...p}>
    <path d="M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </Svg>
)

export const Calendar = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
  </Svg>
)

/* --- Nilai & penghias ----------------------------------------------------- */

export const Heart = (p) => (
  <Svg {...p}>
    <path d="M12 20.3s-7.5-4.6-7.5-9.6a4.2 4.2 0 0 1 7.5-2.6 4.2 4.2 0 0 1 7.5 2.6c0 5-7.5 9.6-7.5 9.6Z" />
  </Svg>
)

export const Infinity_ = (p) => (
  <Svg {...p}>
    <path d="M8.2 8.4a3.6 3.6 0 1 0 0 7.2c2.6 0 4-3.6 7.6-3.6a3.6 3.6 0 1 1 0 7.2c-3.6 0-5-3.6-7.6-3.6" />
  </Svg>
)

export const Flower = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 9.8c0-2.4.9-4.3 2.4-4.3s1.7 2.4.5 3.6M12 14.2c0 2.4-.9 4.3-2.4 4.3s-1.7-2.4-.5-3.6M9.8 12c-2.4 0-4.3-.9-4.3-2.4s2.4-1.7 3.6-.5M14.2 12c2.4 0 4.3.9 4.3 2.4s-2.4 1.7-3.6.5" />
  </Svg>
)

export const Dove = (p) => (
  <Svg {...p}>
    <path d="M3.5 13.5c3.6.6 6-1 7.4-3.2 1.3-2 3-3.6 5.4-3.6 2 0 3.7 1.3 4.2 3.2-1 .4-1.9.4-2.7.1.4 4-2.6 7.5-6.8 7.5-3 0-5.4-1.4-7.5-4Z" />
    <path d="M17.6 8.1h.01" />
  </Svg>
)

/* --- Hadiah --------------------------------------------------------------- */

export const Envelope = (p) => (
  <Svg {...p}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="2.2" />
    <path d="m3.4 7 7.4 5.4a2 2 0 0 0 2.4 0L20.6 7" />
  </Svg>
)

export const Gift = (p) => (
  <Svg {...p}>
    <rect x="3.2" y="9.5" width="17.6" height="11.3" rx="2" />
    <path d="M3.2 13.5h17.6M12 9.5v11.3" />
    <path d="M12 9.5S10.8 4.2 8.4 4.2a2.2 2.2 0 0 0 0 4.4h3.6m0 .9s1.2-5.3 3.6-5.3a2.2 2.2 0 0 1 0 4.4H12" />
  </Svg>
)

export const Copy = (p) => (
  <Svg {...p}>
    <rect x="8.6" y="8.6" width="11.8" height="11.8" rx="2.2" />
    <path d="M15.4 5.6H5.8a2.2 2.2 0 0 0-2.2 2.2v9.6" />
  </Svg>
)

/* --- Antarmuka ------------------------------------------------------------ */

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4.5 12h14m0 0-5-5m5 5-5 5" />
  </Svg>
)

export const ArrowUp = (p) => (
  <Svg {...p}>
    <path d="M12 19.5v-14m0 0-5.5 5.5M12 5.5l5.5 5.5" />
  </Svg>
)

export const Close = (p) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
)

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M4 7.5h16M4 12h16M4 16.5h16" />
  </Svg>
)

export const Note = (p) => (
  <Svg {...p}>
    <path d="M9 18V6.2l10-2v11.6" />
    <ellipse cx="6.6" cy="18" rx="2.6" ry="2.2" />
    <ellipse cx="16.6" cy="15.8" rx="2.6" ry="2.2" />
  </Svg>
)

export const NoteOff = (p) => (
  <Svg {...p}>
    <path d="M9 18V6.2l10-2v11.6" />
    <ellipse cx="6.6" cy="18" rx="2.6" ry="2.2" />
    <ellipse cx="16.6" cy="15.8" rx="2.6" ry="2.2" />
    <path d="M3 3l18 18" strokeWidth="1.6" />
  </Svg>
)

export const Zoom = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M11 8.5v5M8.5 11h5M15.8 15.8 20.5 20.5" />
  </Svg>
)

export const Check = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
)

/* Nama `Infinity` bentrok dengan global JavaScript, jadi diekspor ulang. */
export { Infinity_ as InfinityIcon }
