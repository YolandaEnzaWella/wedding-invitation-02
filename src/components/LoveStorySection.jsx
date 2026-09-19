import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { loveStory } from '../data/content.js'
import { EASE, inViewOnce } from '../lib/motion.js'
import Section from './Section.jsx'

/* ---------------------------------------------------------------------------
   UKURAN JALUR TIMELINE
   ---------------------------------------------------------------------------
   Garis vertikal dan titiknya diposisikan absolut, jadi letaknya harus
   dihitung dari lebar foto — bukan ditebak. Tiga angka di bawah adalah
   sumbernya; ubah FOTO saja dan sisanya ikut menyesuaikan.

   Foto sengaja berukuran sama di semua lebar layar. Versi sebelumnya membesar
   di layar lebar (`sm:size-28`) sementara garisnya tetap di tempat, sehingga
   garis dan titiknya menembus foto.
   --------------------------------------------------------------------------- */
const FOTO = 96 // diameter foto bulat, px
const JARAK = 32 // jarak foto → teks, px
const GARIS = FOTO + JARAK / 2 // garis tepat di tengah jarak itu
const TITIK = 10 // diameter titik penanda, px

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
          className="absolute top-2 bottom-2 w-px bg-sky-100"
          style={{ left: GARIS }}
        />
        <motion.span
          aria-hidden="true"
          style={{ left: GARIS, scaleY: lineScale, transformOrigin: 'top' }}
          className="absolute top-2 bottom-2 w-px bg-sky-400"
        />

        <ol className="space-y-9">
          {loveStory.map((item) => (
            <li key={item.year} className="relative flex items-start">
              {/* --- Foto bulat --------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: -36, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={inViewOnce}
                transition={{ duration: 0.7, ease: EASE }}
                style={{ width: FOTO, height: FOTO }}
                className="relative z-10 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[var(--shadow-soft)]"
              >
                <img
                  src={item.photo}
                  alt={`${item.year} — ${item.title}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* --- Titik pada garis, persis di tengah tinggi foto ---------- */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={inViewOnce}
                transition={{ delay: 0.25, duration: 0.45, ease: EASE }}
                style={{
                  left: GARIS - TITIK / 2,
                  top: FOTO / 2 - TITIK / 2,
                  width: TITIK,
                  height: TITIK,
                }}
                className="absolute z-20 rounded-full bg-sky-500 ring-4 ring-white"
              />

              {/* --- Teks ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inViewOnce}
                transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
                style={{ marginLeft: JARAK }}
                className="min-w-0 flex-1 pt-1.5"
              >
                <span className="font-serif text-sm tracking-[0.2em] text-sky-500">
                  {item.year}
                </span>
                <h3 className="mt-0.5 font-serif text-xl text-sky-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sky-700">{item.text}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
