import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { assets, closing, couple } from '../data/content.js'
import { formatDotted } from '../lib/date.js'
import { EASE, fadeUp, inViewOnce, stagger } from '../lib/motion.js'
import { ArrowUp } from './Icons.jsx'

/** Tombol kembali ke atas, muncul setelah tamu cukup jauh menggulir. */
function BackToTop() {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => scrollY.on('change', (y) => setShow(y > 600)), [scrollY])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas"
          className="glass-card fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full text-sky-700"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function FooterSection() {
  const names =
    couple.order === 'groom-first'
      ? [couple.groom.short, couple.bride.short]
      : [couple.bride.short, couple.groom.short]

  return (
    <>
      {/* Padding bawah disediakan lebih lega daripada tinggi rangkaian bunga
          di dasar halaman, supaya tagline dan kredit duduk DI ATAS bunga,
          bukan tenggelam di tengah-tengahnya. */}
      <footer className="relative overflow-hidden px-6 pt-20 pb-52 text-center sm:pb-72">
        {/* Balkon berlatar laut sebagai penutup, memudar ke putih di atasnya. */}
        <img
          src={assets.bg.balcony}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/80 to-sky-100/70"
        />

        <motion.div
          className="relative mx-auto max-w-md"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          <motion.h2
            variants={fadeUp}
            className="font-script text-5xl text-sky-800 sm:text-6xl"
          >
            {closing.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-sm font-serif text-base leading-relaxed text-sky-700 italic sm:text-lg"
          >
            {closing.text}
          </motion.p>

          <motion.span
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-24 bg-sky-300"
          />

          <motion.p
            variants={fadeUp}
            className="mt-6 font-script text-4xl text-sky-800 sm:text-5xl"
          >
            {names[0]} &amp; {names[1]}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-2 font-serif text-sm tracking-[0.35em] text-sky-600"
          >
            {formatDotted()}
          </motion.p>
        </motion.div>

        {/* Rangkaian bunga di dasar halaman.
            Lebarnya tidak boleh melebihi layar (dulu `w-[130%]`, sehingga
            bunganya terpotong di tepi kiri dan kanan), dan digambar di
            belakang (-z-10) supaya tidak menutupi tulisan. Gambarnya
            berbanding 2:1, jadi lebar 320 px berarti tinggi 160 px — itu yang
            harus dilampaui oleh padding bawah footer. */}
        <motion.img
          src={assets.floral.swag}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto w-[92%] max-w-[20rem] select-none sm:max-w-[30rem]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.95, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 1.3, ease: EASE }}
        />

        <motion.div
          className="relative mt-14 space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          {closing.tagline && (
            <p className="text-[0.6875rem] tracking-wide text-sky-600/80">
              {closing.tagline}
            </p>
          )}
          {closing.credit && (
            <p className="text-[0.6875rem] tracking-[0.12em] text-sky-600/70">
              {closing.credit}
            </p>
          )}
        </motion.div>
      </footer>

      <BackToTop />
    </>
  )
}
