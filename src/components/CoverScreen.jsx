import { motion } from 'framer-motion'
import { assets, couple, defaultGuest } from '../data/content.js'
import { formatDotted } from '../lib/date.js'
import { EASE } from '../lib/motion.js'
import { FloralCorner } from './decor/RibbonAccent.jsx'
import { ArrowRight } from './Icons.jsx'

/**
 * Layar pembuka. Tetap menutupi seluruh halaman sampai tamu menekan
 * "Buka Undangan" — App yang mengatur keluarnya lewat <AnimatePresence>.
 *
 * Tata letaknya sengaja memakai flex kolom dengan foto sebagai satu-satunya
 * elemen yang boleh menyusut (`flex-1` + `object-contain`). Dengan begitu
 * seluruh isi cover pasti muat di layar setinggi apa pun — termasuk ponsel
 * pendek — tanpa tombol "Buka Undangan" terdorong keluar layar.
 */
export default function CoverScreen({ guestName, onOpen }) {
  const names =
    couple.order === 'groom-first'
      ? [couple.groom.short, couple.bride.short]
      : [couple.bride.short, couple.groom.short]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-sky-100"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* --- Latar: gerbang bunga berlatar laut ----------------------------- */}
      <motion.img
        src={assets.bg.arch}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-sky-50/65 to-white/85"
      />

      {/* --- Kelopak bunga di sudut, muncul satu per satu -------------------
          Tiap berkas dipasang di sudut yang sesuai arah sikunya — lihat
          catatan di FloralCorner. Jangan menukar pasangan sudut/berkas di
          bawah tanpa mengganti gambarnya, nanti sikunya menggantung. */}
      <div className="absolute inset-0">
        {[
          { src: assets.floral.cornerC, corner: 'tl', width: 132, delay: 0.2 },
          { src: assets.floral.cornerB, corner: 'tr', width: 140, delay: 0.42 },
          { src: assets.floral.cornerE, corner: 'bl', width: 138, delay: 0.64 },
          { src: assets.floral.cornerD, corner: 'br', width: 130, delay: 0.86 },
        ].map((c) => (
          <FloralCorner key={c.corner} {...c} opacity={0.85} eager className="sm:w-48" />
        ))}
      </div>

      {/* Monogram sengaja tidak ditampilkan di cover: sudut atas sudah terisi
          rangkaian bunga, dan nama mempelai toh tertulis besar tepat di
          bawahnya. Monogram muncul di navbar setelah undangan dibuka. */}

      {/* --- Isi utama -------------------------------------------------------- */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center px-6 pt-12 text-center">
        <motion.p
          className="text-eyebrow shrink-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
        >
          {couple.eyebrow}
        </motion.p>

        <motion.h1
          className="mt-1 shrink-0 font-script text-5xl leading-[1.08] text-sky-800 sm:text-6xl"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, letterSpacing: '0.02em' }}
          transition={{ delay: 0.75, duration: 1.2, ease: EASE }}
        >
          {names[0]}
          <span className="block font-serif text-2xl italic text-sky-600 sm:text-3xl">&amp;</span>
          {names[1]}
        </motion.h1>

        <motion.p
          className="mt-2 shrink-0 font-serif text-base tracking-[0.3em] text-sky-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
        >
          {formatDotted()}
        </motion.p>

        <motion.p
          className="mt-2 max-w-xs shrink-0 font-serif text-sm leading-relaxed whitespace-pre-line text-sky-700/90 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.9 }}
        >
          {couple.tagline}
        </motion.p>

        {/* --- Foto + sapaan tamu + tombol ---------------------------------- */}
        <div className="relative flex min-h-0 w-full flex-1 items-end justify-center">
          <motion.img
            src={assets.hero}
            alt={`${couple.bride.full} dan ${couple.groom.full}`}
            className="max-h-full w-auto max-w-[86%] origin-bottom object-contain select-none"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.3, ease: EASE }}
          />

          {/* Sapaan dan tombol mengambang di atas foto. Kabut putih di
              belakangnya harus digambar SEBELUM teks (urutan DOM), bukan
              didorong ke belakang dengan z negatif — z negatif akan membuatnya
              tenggelam di balik foto dan teksnya jadi tak terbaca di atas
              gaun pengantin. */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-white via-white/90 to-transparent"
            />

            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <p className="text-[0.625rem] tracking-[0.2em] text-sky-600 uppercase">
                Kepada Yth.
              </p>
              <p className="mt-0.5 font-serif text-lg text-sky-800">
                {guestName || defaultGuest}
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={onOpen}
              className="group relative mt-3 inline-flex items-center gap-3 rounded-full bg-sky-600 px-7 py-3 font-sans text-sm font-medium text-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  '0 0 0px rgba(127,175,209,0.4)',
                  '0 0 24px rgba(127,175,209,0.75)',
                  '0 0 0px rgba(127,175,209,0.4)',
                ],
              }}
              transition={{
                opacity: { delay: 1.8, duration: 0.6 },
                y: { delay: 1.8, duration: 0.6, ease: EASE },
                boxShadow: { delay: 2.2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileTap={{ scale: 0.96 }}
            >
              Buka Undangan
              <span className="grid size-6 place-items-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
