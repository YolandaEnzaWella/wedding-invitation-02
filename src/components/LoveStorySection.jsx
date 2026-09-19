import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { loveStory } from '../data/content.js'
import { EASE, inViewOnce } from '../lib/motion.js'
import Section from './Section.jsx'

/**
 * Timeline perjalanan pasangan. Garis vertikalnya tidak muncul sekaligus —
 * panjangnya mengikuti sejauh mana tamu sudah menggulir section ini, sehingga
 * terasa seperti cerita yang sedang berjalan.
 */
export default function LoveStorySection() {
  const trackRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 60%'],
  })

  // Dihaluskan agar garis tidak tersentak mengikuti scroll yang kasar.
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <Section id="story" title="Love Story" eyebrow="Setiap Langkah, Cerita Kita">
      <div ref={trackRef} className="relative">
        {/* Rel garis: jalur pucat + garis biru yang tumbuh mengikuti scroll. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[2.75rem] w-px bg-sky-100 sm:left-[3.5rem]"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: lineScale, transformOrigin: 'top' }}
          className="absolute top-2 bottom-2 left-[2.75rem] w-px bg-sky-400 sm:left-[3.5rem]"
        />

        <ol className="space-y-9">
          {loveStory.map((item, i) => (
            <li key={item.year} className="relative flex items-start gap-4 sm:gap-6">
              {/* --- Foto bulat --------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: -36, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative z-10 size-[5.5rem] shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[var(--shadow-soft)] sm:size-28"
              >
                <img
                  src={item.photo}
                  alt={`${item.year} — ${item.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* --- Titik pada garis ---------------------------------------- */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={inViewOnce}
                transition={{ delay: 0.25, duration: 0.45, ease: EASE }}
                className="absolute top-9 left-[2.4rem] z-20 size-2.5 rounded-full bg-sky-500 ring-4 ring-white sm:left-[3.15rem]"
              />

              {/* --- Teks ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inViewOnce}
                transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
                className="pt-1.5 pl-2 sm:pl-4"
              >
                <span className="font-serif text-sm tracking-[0.2em] text-sky-500">
                  {item.year}
                </span>
                <h3 className="mt-0.5 font-serif text-xl text-sky-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sky-700">{item.text}</p>
              </motion.div>

              {/* Nomor urut disembunyikan dari tampilan, dibaca pembaca layar. */}
              <span className="sr-only">Tahap {i + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
