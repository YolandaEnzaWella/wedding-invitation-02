import { motion } from 'framer-motion'
import { assets } from '../../data/content.js'
import useInViewAnimation from '../../hooks/useInViewAnimation.js'
import { EASE, drawLine, floating, inViewOnce } from '../../lib/motion.js'

/**
 * Garis lengkung halus yang "digambar" saat masuk viewport — dipakai di bawah
 * nama mempelai untuk memberi kesan goresan kaligrafi.
 */
export default function RibbonAccent({ className = '', width = 220 }) {
  return (
    <motion.svg
      viewBox="0 0 220 28"
      width={width}
      className={`mx-auto h-auto text-sky-500 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      <motion.path d="M6 20c34-18 70-18 104 0s70 18 104 0" variants={drawLine} />
      <motion.circle
        cx="110"
        cy="9"
        r="2.4"
        fill="currentColor"
        stroke="none"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.9, duration: 0.45, ease: EASE },
          },
        }}
        style={{ transformOrigin: '110px 9px' }}
      />
    </motion.svg>
  )
}

/**
 * Pita biru bergambar yang mengambang pelan. Dipakai sebagai aksen sudut di
 * beberapa section. `side` menentukan ia menempel kiri atau kanan.
 */
export function RibbonFloat({ side = 'left', className = '', width = 150 }) {
  return (
    <motion.img
      src={assets.floral.ribbon}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{ width }}
      className={`pointer-events-none absolute select-none opacity-70 ${
        side === 'left' ? 'left-0 -scale-x-100' : 'right-0'
      } ${className}`}
      animate={floating(12, 7)}
    />
  )
}

/**
 * Ornamen bunga di sudut.
 *
 * PENTING — jangan mencerminkan gambarnya. Tiap berkas sudah digambar dengan
 * arah sikunya masing-masing, jadi tinggal dipasang di sudut yang cocok:
 *
 *     corner-b  →  'tr'   (siku kanan atas)
 *     corner-c  →  'tl'   (siku kiri atas)
 *     corner-d  →  'br'   (siku kanan bawah)
 *     corner-e  →  'bl'   (siku kiri bawah)
 *
 * Versi sebelumnya menganggap semuanya siku kiri-atas lalu membaliknya dengan
 * `-scale-x-100`. Selain salah secara konsep, kelas Tailwind itu tidak pernah
 * berlaku: Framer Motion menulis `transform` sebagai gaya inline yang selalu
 * menimpa transform dari kelas. Akibatnya ornamen terpasang apa adanya di
 * sudut yang salah dan terlihat menggantung.
 *
 *   behind — true bila ornamen dipasang di section yang berisi teks. Tanpa ini
 *            bunga akan digambar DI ATAS tulisan dan menutupinya, karena ia
 *            muncul belakangan di urutan DOM.
 *   delay  — untuk memunculkan beberapa sudut secara berurutan.
 */
export function FloralCorner({
  src,
  corner = 'tl',
  width = 190,
  opacity = 0.9,
  behind = false,
  delay = 0,
  eager = false,
  immediate = false,
  className = '',
}) {
  const place = {
    tl: 'left-0 top-0',
    tr: 'right-0 top-0',
    bl: 'left-0 bottom-0',
    br: 'right-0 bottom-0',
    // Aksen tengah tepi, untuk meramaikan sisi kiri dan kanan. Tidak memakai
    // `-translate-y-1/2` karena kelas transform Tailwind selalu kalah oleh
    // transform inline dari Framer Motion — posisinya diatur lewat `top` saja.
    ml: 'left-0 top-[36%]',
    mr: 'right-0 top-[40%]',
  }[corner]

  // Masuk dari tepi terdekat: yang di kiri bergeser dari kiri, yang di kanan
  // dari kanan — seolah rangkaiannya menjalar masuk ke dalam layar.
  const dariKiri = corner === 'tl' || corner === 'bl' || corner === 'ml'

  // Memakai hook yang sama dengan pembatas bunga. `whileInView` sempat tidak
  // pernah menyala untuk ornamen dekoratif seperti ini.
  //
  // `immediate` untuk ornamen yang sudah pasti terlihat begitu dirender —
  // misalnya di cover, yang memenuhi layar dan tidak bisa di-scroll. Di sana
  // menunggu deteksi viewport tidak ada gunanya dan hanya menambah risiko
  // ornamennya tidak pernah muncul.
  const { ref, isInView } = useInViewAnimation()
  const tampil = immediate || isInView

  return (
    <motion.img
      src={src || assets.floral.cornerA}
      alt=""
      aria-hidden="true"
      /* Ornamen di cover harus `eager`: ia tampil sebelum tamu sempat
         menggulir, dan `lazy` membuatnya telat muncul. */
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{ width }}
      className={`pointer-events-none absolute select-none ${place} ${
        behind ? '-z-10' : ''
      } ${className}`}
      ref={ref}
      initial={{ opacity: 0, x: dariKiri ? -48 : 48 }}
      animate={tampil ? { opacity, x: 0 } : { opacity: 0, x: dariKiri ? -48 : 48 }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    />
  )
}
