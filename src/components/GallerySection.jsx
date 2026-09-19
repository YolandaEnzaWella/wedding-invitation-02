import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gallery } from '../data/content.js'
import { EASE, inViewOnce, scaleIn, stagger } from '../lib/motion.js'
import Section from './Section.jsx'
import { ArrowRight, Close, Zoom } from './Icons.jsx'

/** Berapa foto yang tampil sebelum tamu menekan "Lihat Semua Foto". */
const PREVIEW_COUNT = 5

export default function GallerySection() {
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const visible = expanded ? gallery : gallery.slice(0, PREVIEW_COUNT)
  const isOpen = activeIndex !== null

  const close = useCallback(() => setActiveIndex(null), [])
  const step = useCallback(
    (delta) => setActiveIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length)),
    [],
  )

  // Tombol Esc menutup, panah kiri/kanan berpindah foto.
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKey)
    // Halaman di belakang lightbox tidak ikut ter-scroll.
    document.body.classList.add('is-locked')

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('is-locked')
    }
  }, [isOpen, close, step])

  return (
    <Section id="gallery" title="Galeri Foto" eyebrow="Kenangan Manis Kita">
      <motion.ul
        className="grid grid-cols-2 gap-3"
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {visible.map((photo, i) => (
          <motion.li
            key={photo.src}
            variants={scaleIn}
            className={photo.wide ? 'col-span-2' : ''}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(gallery.indexOf(photo))}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
              aria-label={`Perbesar foto: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  photo.wide ? 'aspect-[4/3]' : 'aspect-[3/4]'
                }`}
              />

              {/* Selubung putih tipis + ikon perbesar saat disentuh kursor. */}
              <span className="pointer-events-none absolute inset-0 grid place-items-center bg-white/35 opacity-0 backdrop-blur-[1px] transition-opacity duration-400 group-hover:opacity-100">
                <span className="grid size-10 place-items-center rounded-full bg-white/80 text-sky-700 shadow-[var(--shadow-soft)]">
                  <Zoom size={18} />
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {gallery.length > PREVIEW_COUNT && (
        <div className="mt-7 text-center">
          <motion.button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            whileHover={{ y: -3, boxShadow: 'var(--shadow-lift)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)]"
          >
            {expanded ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Foto'}
            <span
              className={`grid size-6 place-items-center rounded-full bg-white/25 transition-transform duration-300 ${
                expanded ? 'rotate-180' : 'group-hover:translate-x-0.5'
              }`}
            >
              <ArrowRight size={14} />
            </span>
          </motion.button>
        </div>
      )}

      {/* --- Lightbox --------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-sky-900/55 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto diperbesar"
          >
            <motion.img
              key={gallery[activeIndex].src}
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-[var(--shadow-lift)]"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white/85 text-sky-800 transition-colors hover:bg-white"
            >
              <Close size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 grid size-10 place-items-center rounded-full bg-white/75 text-sky-800 transition-colors hover:bg-white sm:left-6"
            >
              <span className="rotate-180">
                <ArrowRight size={18} />
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 grid size-10 place-items-center rounded-full bg-white/75 text-sky-800 transition-colors hover:bg-white sm:right-6"
            >
              <ArrowRight size={18} />
            </button>

            <p className="absolute bottom-6 text-xs tracking-[0.2em] text-white/90">
              {activeIndex + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
