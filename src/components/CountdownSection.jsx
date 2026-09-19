import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { assets } from '../data/content.js'
import { timeLeft } from '../lib/date.js'
import { EASE, fadeUp, floating, inViewOnce, stagger } from '../lib/motion.js'
import Section from './Section.jsx'

const UNITS = [
  { key: 'days', label: 'Hari' },
  { key: 'hours', label: 'Jam' },
  { key: 'minutes', label: 'Menit' },
  { key: 'seconds', label: 'Detik' },
]

/**
 * Satu kotak angka. Angkanya diganti lewat <AnimatePresence> supaya tiap
 * pergantian terasa sebagai pudar-dan-membesar yang lembut, bukan lompatan.
 */
function Unit({ value, label }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center">
      <div className="glass-card grid h-20 w-16 place-items-center rounded-[1.75rem] sm:h-24 sm:w-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.25, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-serif text-3xl text-sky-900 tabular-nums sm:text-4xl"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-xs tracking-[0.15em] text-sky-600">{label}</span>
    </motion.div>
  )
}

export default function CountdownSection() {
  const [left, setLeft] = useState(() => timeLeft())

  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Section id="countdown" title="Hitung Mundur" eyebrow="Menuju Hari Bahagia">
      <div className="relative">
        {/* Bunga kecil yang mengambang di kiri-kanan kotak angka. Keduanya
            digambar di belakang (-z-10) supaya tidak pernah menutupi angka
            atau keterangan "Hari / Jam / Menit / Detik" di bawahnya. */}
        <motion.img
          src={assets.floral.leaf}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -left-4 -z-10 w-16 opacity-60 sm:-left-12 sm:w-20"
          animate={floating(10, 6)}
        />
        <motion.img
          src={assets.floral.bouquet}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -bottom-12 -z-10 w-20 opacity-60 sm:-right-14 sm:w-24"
          animate={floating(13, 7.5, 0.8)}
        />

        <motion.div
          className="flex items-start justify-center gap-3 sm:gap-5"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          {UNITS.map((u) => (
            <Unit key={u.key} value={left[u.key]} label={u.label} />
          ))}
        </motion.div>
      </div>

      {left.isOver && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center font-serif text-lg italic text-sky-700"
        >
          Hari bahagia itu telah tiba. Terima kasih sudah menjadi bagian darinya.
        </motion.p>
      )}
    </Section>
  )
}
