import { motion } from 'framer-motion'
import { assets } from '../../data/content.js'
import useInViewAnimation from '../../hooks/useInViewAnimation.js'
import { EASE, inViewOnce } from '../../lib/motion.js'

/**
 * Pembatas antar-section: rangkaian bunga tipis yang "tersingkap" dari tengah
 * ke kiri dan kanan saat masuk viewport, sehingga peralihan warna biru↔putih
 * terasa lembut alih-alih tegas.
 *
 * Singkapannya memakai `scaleX` dari titik tengah, bukan `clipPath`. Selain
 * lebih ringan (ditangani GPU), `clipPath` sempat membuat pembatas ini
 * tersangkut di kondisi awal dan tidak pernah terlihat sama sekali.
 *
 * Props:
 *   width  — lebar maksimum dalam px (default 260)
 *   flip   — true untuk membalik vertikal (dipakai di bawah section)
 */
export default function FloralDivider({ width = 260, flip = false, className = '' }) {
  const { ref, animate } = useInViewAnimation()

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none mx-auto select-none ${className}`}
      style={{ maxWidth: width, transformOrigin: 'center' }}
      initial="hidden"
      animate={animate}
      variants={{
        hidden: { scaleX: 0, opacity: 0 },
        show: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 1.1, ease: EASE },
        },
      }}
    >
      <img
        src={assets.floral.swag}
        alt=""
        width={width}
        height={Math.round(width / 2)}
        loading="lazy"
        decoding="async"
        className={`h-auto w-full ${flip ? 'rotate-180' : ''}`}
      />
    </motion.div>
  )
}

/**
 * Versi ringan tanpa gambar: garis lengkung tipis dengan satu bunga kecil di
 * tengah, digambar mengikuti `pathLength`. Dipakai di tempat yang sudah ramai
 * gambar supaya tidak menumpuk.
 */
export function LineDivider({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 200 24"
      className={`mx-auto h-6 w-44 text-sky-400 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
    >
      <motion.path
        d="M4 12h74"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 0.9, ease: EASE } },
        }}
      />
      <motion.path
        d="M122 12h74"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: 0.9, ease: EASE } },
        }}
      />
      <motion.path
        d="M100 5.5c2.6 1.6 4 3.9 4 6.5s-1.4 4.9-4 6.5c-2.6-1.6-4-3.9-4-6.5s1.4-4.9 4-6.5Z"
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          show: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.5, duration: 0.5, ease: EASE },
          },
        }}
        style={{ transformOrigin: '100px 12px' }}
      />
      <motion.path
        d="M88 12h4M108 12h4"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { delay: 0.7 } },
        }}
      />
    </motion.svg>
  )
}
