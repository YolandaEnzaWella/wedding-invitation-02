import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gift } from '../data/content.js'
import { EASE, fadeUp, inViewOnce, stagger } from '../lib/motion.js'
import Section from './Section.jsx'
import { Copy, Envelope, Gift as GiftIcon, Heart, Pin } from './Icons.jsx'

/** Tombol salin nomor rekening dengan tooltip "Tersalin!" yang memudar sendiri. */
function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(id)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Beberapa browser menolak clipboard di halaman non-HTTPS. Nomornya
      // tetap terlihat dan bisa disalin manual, jadi cukup diabaikan.
    }
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={handleCopy}
        whileTap={{ scale: 0.9 }}
        animate={copied ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.4, ease: EASE }}
        className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-200"
      >
        <Copy size={14} />
        Salin
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.span
            className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-sky-700 px-2.5 py-1 text-[0.6875rem] whitespace-nowrap text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            Tersalin!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Satu pilihan di baris tiga tombol. */
function Choice({ icon: Icon, label, active, onClick }) {
  return (
    <motion.button
      variants={fadeUp}
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      aria-pressed={active}
      className={`glass-card flex flex-1 flex-col items-center gap-2 rounded-2xl px-2 py-4 text-xs transition-colors ${
        active ? 'text-sky-900 ring-1 ring-sky-400' : 'text-sky-700'
      }`}
    >
      <span className={active ? 'text-sky-600' : 'text-sky-500'}>
        <Icon size={24} />
      </span>
      {label}
    </motion.button>
  )
}

export default function GiftSection() {
  // Panel mana yang sedang terbuka: 'amplop', 'kado', atau null (tertutup).
  const [panel, setPanel] = useState(null)

  const toggle = (name) => setPanel((p) => (p === name ? null : name))

  const goToWishes = () =>
    document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <Section id="gift" title="Kirim Hadiah" eyebrow="Doa dan Restu Anda Adalah Hadiah Terindah">
      <p className="-mt-4 mb-7 text-center text-sm leading-relaxed text-sky-700">{gift.note}</p>

      <motion.div
        className="flex gap-3"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
      >
        <Choice
          icon={Envelope}
          label="Amplop Digital"
          active={panel === 'amplop'}
          onClick={() => toggle('amplop')}
        />
        {gift.address && (
          <Choice
            icon={GiftIcon}
            label="Kirim Kado"
            active={panel === 'kado'}
            onClick={() => toggle('kado')}
          />
        )}
        <Choice icon={Heart} label="Ucapan" onClick={goToWishes} />
      </motion.div>

      {/* --- Panel yang terbuka ---------------------------------------------- */}
      <AnimatePresence mode="wait">
        {panel === 'amplop' && (
          <motion.ul
            key="amplop"
            className="mt-5 space-y-3"
            initial={{ opacity: 0, rotateX: -12, height: 0 }}
            animate={{ opacity: 1, rotateX: 0, height: 'auto' }}
            exit={{ opacity: 0, rotateX: -8, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ transformPerspective: 900, transformOrigin: 'top' }}
          >
            {gift.accounts.map((acc) => (
              <li
                key={acc.number}
                className="glass-card flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5"
              >
                <div className="min-w-0">
                  <p className="text-eyebrow">{acc.bank}</p>
                  <p className="mt-1 font-serif text-lg tracking-wide text-sky-900 tabular-nums">
                    {acc.number}
                  </p>
                  <p className="text-xs text-sky-600">a.n. {acc.holder}</p>
                </div>
                <CopyButton value={acc.number} />
              </li>
            ))}
          </motion.ul>
        )}

        {panel === 'kado' && (
          <motion.div
            key="kado"
            className="glass-card mt-5 overflow-hidden rounded-2xl px-4 py-4"
            initial={{ opacity: 0, rotateX: -12, height: 0 }}
            animate={{ opacity: 1, rotateX: 0, height: 'auto' }}
            exit={{ opacity: 0, rotateX: -8, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ transformPerspective: 900, transformOrigin: 'top' }}
          >
            <p className="text-eyebrow flex items-center gap-1.5">
              <Pin size={14} />
              Alamat Pengiriman
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sky-800">{gift.address}</p>
            <div className="mt-3">
              <CopyButton value={gift.address} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
