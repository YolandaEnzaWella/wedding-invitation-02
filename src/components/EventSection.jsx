import { motion } from 'framer-motion'
import { agenda, assets } from '../data/content.js'
import { formatFullDate, formatTimeRange } from '../lib/date.js'
import { EASE, fadeUp, inViewOnce, stagger } from '../lib/motion.js'
import Section from './Section.jsx'
import { ArrowRight, Glass, Pin, Rings } from './Icons.jsx'

const AGENDA_ICONS = { rings: Rings, glass: Glass }

/**
 * Satu kartu acara. Tanggal dan nama harinya dihitung dari `event.date`,
 * bukan diketik ulang per kartu — jadi mengubah tanggal cukup di satu tempat.
 */
function EventCard({ item }) {
  const Icon = AGENDA_ICONS[item.icon] ?? Rings

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group glass-card relative flex-1 overflow-hidden rounded-3xl p-5 text-center"
    >
      {/* Sapuan gradien halus saat kursor melewati kartu. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-200/0 via-sky-200/40 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <span className="inline-grid size-11 place-items-center rounded-full bg-sky-100 text-sky-600">
          <Icon size={22} />
        </span>

        <h3 className="mt-3 font-serif text-xl text-sky-900">{item.title}</h3>

        <p className="mt-3 text-sm text-sky-700">{formatFullDate()}</p>
        <p className="text-sm text-sky-700">{formatTimeRange(item.start, item.end)}</p>

        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-10 bg-sky-200" />

        <p className="mt-4 inline-flex items-center gap-1.5 text-sky-600">
          <Pin size={16} />
          <span className="font-medium">{item.venue}</span>
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-sky-600/90">{item.address}</p>
      </div>
    </motion.article>
  )
}

export default function EventSection() {
  // Kalau semua acara di tempat yang sama, satu tombol maps sudah cukup.
  const sameVenue = agenda.every((a) => a.maps === agenda[0].maps)

  return (
    <Section id="event" title="Detail Acara" eyebrow="Akad Nikah & Resepsi">
      {/* Rangkaian bunga samar di belakang kartu, memberi kedalaman. */}
      <img
        src={assets.floral.wreath}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-72 -translate-x-1/2 -translate-y-1/2 opacity-15"
      />

      <motion.div
        className="relative flex flex-col gap-4 sm:flex-row"
        variants={stagger(0.16)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {agenda.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </motion.div>

      <motion.div
        className="relative mt-8 flex flex-wrap justify-center gap-3"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {(sameVenue ? agenda.slice(0, 1) : agenda).map((item) => (
          <motion.a
            key={item.id}
            variants={fadeUp}
            href={item.maps}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -3, boxShadow: 'var(--shadow-lift)' }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)]"
          >
            {sameVenue ? 'Lihat Lokasi di Maps' : `Lokasi ${item.title}`}
            <span className="grid size-6 place-items-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={14} />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  )
}
