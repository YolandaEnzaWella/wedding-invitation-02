import { motion } from 'framer-motion'
import { assets, couple, values } from '../data/content.js'
import { EASE, fadeFrom, fadeUp, inViewOnce, scaleIn, stagger } from '../lib/motion.js'
import Section from './Section.jsx'
import { FloralCorner } from './decor/RibbonAccent.jsx'
import { Heart, InfinityIcon, Rings } from './Icons.jsx'

const VALUE_ICONS = { heart: Heart, rings: Rings, infinity: InfinityIcon }

/** Kartu satu mempelai: foto dalam bingkai bulat, nama, dan orang tuanya. */
function Person({ person, from }) {
  return (
    <motion.div variants={fadeFrom(from)} className="flex flex-1 flex-col items-center text-center">
      <motion.div
        variants={scaleIn}
        className="relative aspect-square w-32 overflow-hidden rounded-full border-4 border-white shadow-[var(--shadow-soft)] sm:w-40"
      >
        <img
          src={person.photo}
          alt={person.full}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <h3 className="mt-4 font-serif text-xl text-sky-900 sm:text-2xl">{person.full}</h3>
      <p className="mt-1.5 text-xs text-sky-600">{person.role}</p>
      <p className="mt-0.5 text-sm leading-relaxed whitespace-pre-line text-sky-700">
        {person.parents}
      </p>

      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 text-xs tracking-wide text-sky-500 underline-offset-4 transition-colors hover:text-sky-700 hover:underline"
        >
          @{person.instagram}
        </a>
      )}
    </motion.div>
  )
}

export default function CoupleSection() {
  return (
    <Section id="couple" title="Mempelai Kami" eyebrow="Dua Jiwa, Satu Tujuan">
      <FloralCorner src={assets.floral.cornerC} corner="tl" width={120} opacity={0.35} behind />
      {/* corner-d dipakai di kanan bawah karena sikunya memang menghadap ke
          sana — corner-e sikunya kiri bawah, akan terlihat menggantung. */}
      <FloralCorner src={assets.floral.cornerD} corner="br" width={130} opacity={0.35} behind />

      <motion.div
        className="relative flex items-start gap-2 sm:gap-6"
        variants={stagger(0.18)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        <Person person={couple.groom} from={-60} />

        {/* Ampersand + hati yang berdetak pelan di antara kedua mempelai. */}
        <motion.div variants={fadeUp} className="flex flex-col items-center self-center pt-8">
          <span className="font-script text-4xl text-sky-500 sm:text-5xl">&amp;</span>
          <motion.span
            className="mt-1 text-sky-400"
            animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          >
            <Heart size={16} />
          </motion.span>
        </motion.div>

        <Person person={couple.bride} from={60} />
      </motion.div>

      {/* --- Tiga nilai ------------------------------------------------------ */}
      <motion.ul
        className="mt-12 flex items-start justify-center gap-6 sm:gap-14"
        variants={stagger(0.14)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        {values.map((value) => {
          const Icon = VALUE_ICONS[value.icon] ?? Heart
          return (
            <motion.li
              key={value.label}
              variants={fadeUp}
              className="flex w-24 flex-col items-center text-center"
            >
              <motion.span
                className="text-sky-500"
                whileHover={{ scale: 1.12, rotate: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Icon size={26} />
              </motion.span>
              <span className="mt-2 text-xs leading-snug whitespace-pre-line text-sky-700">
                {value.label}
              </span>
            </motion.li>
          )
        })}
      </motion.ul>
    </Section>
  )
}
