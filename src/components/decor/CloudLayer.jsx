import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Lapisan awan tipis di latar belakang yang bergerak lebih pelan daripada
 * konten saat halaman di-scroll (parallax). Murni SVG supaya ringan dan bisa
 * ditumpuk beberapa lapis tanpa membebani unduhan.
 *
 * Props:
 *   speed    — 0 berarti diam, 1 berarti ikut penuh. Nilai kecil = terasa jauh.
 *   position — 'top' | 'bottom', menentukan awan menempel di sisi mana.
 *   opacity  — kepekatan awan.
 */
export default function CloudLayer({
  speed = 0.25,
  position = 'top',
  opacity = 0.55,
  className = '',
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Bergerak berlawanan arah scroll sejauh beberapa persen tingginya sendiri.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 100}%`])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 overflow-hidden ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
    >
      <motion.svg
        style={{ y, opacity }}
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        className={`h-40 w-[130%] -translate-x-[8%] text-white sm:h-52 ${
          position === 'bottom' ? 'rotate-180' : ''
        }`}
        fill="currentColor"
      >
        <path d="M0 0h1200v96c-52 26-104 10-156-6s-104-24-156 2-104 60-156 58-104-40-156-56-104-8-156 10-104 42-156 30-104-48-108-62V0Z" />
        <path
          opacity="0.7"
          d="M0 0h1200v52c-70 34-140 14-210-4s-140-20-210 8-140 54-210 46-140-46-210-56-140 8-160 18V0Z"
        />
      </motion.svg>
    </div>
  )
}

/**
 * Bulatan-bulatan kabut lembut yang mengambang pelan tanpa henti. Dipakai di
 * belakang section yang butuh kedalaman tapi tidak boleh mencuri perhatian.
 */
export function MistBlobs({ className = '' }) {
  const blobs = [
    { size: 320, left: '-8%', top: '6%', delay: 0, duration: 14 },
    { size: 260, left: '72%', top: '28%', delay: 2.5, duration: 17 },
    { size: 380, left: '18%', top: '68%', delay: 1.2, duration: 20 },
  ]

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {blobs.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-sky-200/45 blur-3xl"
          style={{ width: b.size, height: b.size, left: b.left, top: b.top }}
          animate={{ y: [0, -26, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
