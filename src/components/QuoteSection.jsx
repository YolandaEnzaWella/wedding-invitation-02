import { motion } from 'framer-motion'
import { assets, quote } from '../data/content.js'
import { EASE, inViewOnce } from '../lib/motion.js'
import { LineDivider } from './decor/FloralDivider.jsx'

/**
 * Kutipan cinta. Teksnya muncul baris demi baris agar terbaca seperti orang
 * yang sedang mengucapkannya, bukan sekaligus.
 *
 * Isinya netral secara default dan bisa diganti ayat/kitab sesuai keyakinan
 * pasangan lewat src/data/content.js — lihat catatan di sana.
 */
export default function QuoteSection() {
  // Dipecah per kata supaya bisa di-stagger, tapi jeda antar kata dibuat
  // sangat pendek agar terasa sebagai satu kalimat yang mengalir.
  const words = quote.text.split(' ')

  return (
    <section id="quote" className="relative overflow-hidden px-6 py-16 sm:py-20">
      {/* Ornamen bunga tunggal di kiri dan kanan. */}
      <motion.img
        src={assets.floral.leaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-6 w-20 -translate-y-1/2 opacity-60 sm:left-2 sm:w-28"
        initial={{ opacity: 0, rotate: -12 }}
        whileInView={{ opacity: 0.6, rotate: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.img
        src={assets.floral.leaf}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-6 w-20 -translate-y-1/2 -scale-x-100 opacity-60 sm:right-2 sm:w-28"
        initial={{ opacity: 0, rotate: 12 }}
        whileInView={{ opacity: 0.6, rotate: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
      />

      <figure className="relative mx-auto max-w-lg text-center">
        <motion.span
          aria-hidden="true"
          className="block font-serif text-5xl leading-none text-sky-300"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.7, ease: EASE }}
        >
          &ldquo;
        </motion.span>

        <motion.blockquote
          className="mt-2 font-serif text-lg leading-relaxed text-sky-800 italic sm:text-xl"
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } } }}
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              {word}
              {/* Spasi ikut di dalam span agar jarak antar kata tidak hilang. */}
              {i < words.length - 1 && ' '}
            </motion.span>
          ))}
        </motion.blockquote>

        {quote.source && (
          <motion.figcaption
            className="text-eyebrow mt-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inViewOnce}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {quote.source}
          </motion.figcaption>
        )}

        <LineDivider className="mt-7" />
      </figure>
    </section>
  )
}
