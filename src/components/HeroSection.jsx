import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { assets, couple } from '../data/content.js'
import { formatDotted, formatFullDate } from '../lib/date.js'
import { EASE, fadeUp, inViewOnce, stagger } from '../lib/motion.js'
import CloudLayer from './decor/CloudLayer.jsx'
import RibbonAccent from './decor/RibbonAccent.jsx'

/**
 * Halaman utama setelah cover dibuka: nama lengkap mempelai, tanggal, dan foto
 * pre-wedding. Awan di latar bergerak lebih pelan daripada konten saat
 * di-scroll sehingga terasa berlapis.
 */
export default function HeroSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Foto ikut turun sedikit dan memudar saat halaman digulirkan ke bawah.
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25])
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  const names =
    couple.order === 'groom-first'
      ? [couple.groom.short, couple.bride.short]
      : [couple.bride.short, couple.groom.short]

  return (
    <section
      id="home"
      ref={ref}
      /* `100svh` (small viewport height), bukan `100vh`: di ponsel, `vh`
         dihitung seolah bilah alamat browser tersembunyi, sehingga section ini
         jadi lebih tinggi daripada layar yang benar-benar terlihat. */
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-20 pb-6 text-center"
    >
      {/* --- Latar langit, bergerak paling pelan ---------------------------- */}
      <motion.img
        src={assets.bg.sky}
        alt=""
        aria-hidden="true"
        style={{ y: skyY }}
        className="absolute inset-0 -z-20 h-[115%] w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100/80 via-sky-50/85 to-white"
      />

      <CloudLayer position="bottom" speed={0.3} opacity={0.75} className="-z-10" />

      <motion.div
        variants={stagger(0.16, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p variants={fadeUp} className="text-eyebrow">
          {couple.eyebrow}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-3 font-script text-6xl leading-[1.05] text-sky-800 sm:text-8xl"
        >
          {names[0]}
          <span className="block font-serif text-3xl italic text-sky-600 sm:text-5xl">&amp;</span>
          {names[1]}
        </motion.h1>

        {/* Garis kaligrafi yang digambar sendiri. */}
        <RibbonAccent className="mt-1" width={200} />

        <motion.p
          variants={fadeUp}
          className="mt-4 font-serif text-lg tracking-[0.35em] text-sky-700 sm:text-xl"
        >
          {formatDotted()}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-1 text-sm text-sky-600">
          {formatFullDate()}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-sm whitespace-pre-line font-serif text-base italic leading-relaxed text-sky-700/90 sm:text-lg"
        >
          {couple.tagline}
        </motion.p>
      </motion.div>

      {/* --- Foto pre-wedding ------------------------------------------------ */}
      <motion.img
        src={assets.hero}
        alt={`${couple.bride.full} dan ${couple.groom.full}`}
        style={{ y: photoY, opacity: photoOpacity }}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 1.4, ease: EASE }}
        /* Tinggi foto diikat ke tinggi layar supaya seluruh isi hero muat
           dalam satu layar. Tanpa batas ini, hero membengkak jadi 1064 px di
           layar 844 px dan petunjuk "geser ke bawah" terdorong ke bawah
           lipatan, menyisakan area kosong sebelum section berikutnya. */
        className="relative z-0 mt-6 max-h-[34svh] w-auto max-w-[84%] object-contain select-none"
      />

      {/* --- Petunjuk gulir --------------------------------------------------- */}
      <motion.div
        aria-hidden="true"
        className="relative z-10 mt-3 flex flex-col items-center gap-2 text-sky-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[0.625rem] tracking-[0.3em] uppercase">Geser ke bawah</span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-sky-400 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
