import { AnimatePresence, motion } from 'framer-motion'
import { assets } from '../data/content.js'
import { EASE, inViewOnce } from '../lib/motion.js'
import Section from './Section.jsx'
import { ArrowRight } from './Icons.jsx'

/** Berapa ucapan yang ditampilkan sekaligus. */
const VISIBLE = 4

/** Inisial nama untuk avatar bulat, misal "Rizky & Amel" → "RA". */
function initials(name) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default function WishesSection({ wishes }) {
  const shown = wishes.slice(0, VISIBLE)

  // Mengarahkan tamu ke kolom pesan di formulir RSVP — supaya tidak ada dua
  // formulir terpisah yang menanyakan nama dua kali.
  const goWrite = () => {
    const section = document.getElementById('rsvp')
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Fokus menyusul setelah gulir selesai, agar halaman tidak melompat.
    setTimeout(() => {
      const field = section?.querySelector('textarea')
      field?.focus({ preventScroll: true })
    }, 700)
  }

  return (
    <Section id="wishes" title="Ucapan & Doa" eyebrow="Tinggalkan Pesan untuk Kami">
      <img
        src={assets.floral.cornerB}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -bottom-6 -left-8 -z-10 w-32 opacity-35"
      />

      <motion.ul
        className="relative space-y-3"
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        variants={{ show: { transition: { staggerChildren: 0.13 } } }}
      >
        <AnimatePresence initial={false}>
          {shown.map((wish) => (
            <motion.li
              key={wish.id}
              layout
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.97 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 220, damping: 22 },
                },
              }}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card rounded-2xl px-4 py-3.5"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-100 font-serif text-sm text-sky-700"
                >
                  {initials(wish.name)}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-sm font-medium text-sky-900">
                      {wish.name}
                      {wish.isMine && (
                        <span className="ml-1.5 align-middle text-[0.625rem] font-normal text-sky-500">
                          (Anda)
                        </span>
                      )}
                    </p>
                    <time className="shrink-0 text-[0.6875rem] text-sky-500">{wish.date}</time>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-sky-700">{wish.message}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {wishes.length > VISIBLE && (
        <p className="mt-4 text-center text-xs text-sky-500">
          dan {wishes.length - VISIBLE} ucapan lainnya
        </p>
      )}

      <div className="mt-7 text-center">
        <motion.button
          type="button"
          onClick={goWrite}
          whileHover={{ y: -3, boxShadow: 'var(--shadow-lift)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="group inline-flex items-center gap-2.5 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)]"
        >
          Tulis Ucapan
          <span className="grid size-6 place-items-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={14} />
          </span>
        </motion.button>
      </div>
    </Section>
  )
}
