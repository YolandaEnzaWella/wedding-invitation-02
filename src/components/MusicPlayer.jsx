import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../data/content.js'
import { EASE } from '../lib/motion.js'
import { Note, NoteOff } from './Icons.jsx'

/**
 * Tombol musik mengambang.
 *
 * Browser melarang audio berbunyi sebelum ada interaksi tamu, jadi pemutaran
 * selalu dimulai dari tombol "Buka Undangan" (lewat prop `shouldPlay`) —
 * bukan otomatis saat halaman dimuat.
 */
export default function MusicPlayer({ shouldPlay }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)

  // Menyalakan musik begitu cover dibuka.
  useEffect(() => {
    if (!shouldPlay) return

    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.45
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Tetap ditolak (misalnya mode hemat daya). Tombol tetap tersedia
        // supaya tamu bisa menyalakannya sendiri.
        setBlocked(true)
        setPlaying(false)
      })
  }, [shouldPlay])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    audio
      .play()
      .then(() => {
        setPlaying(true)
        setBlocked(false)
      })
      .catch(() => setBlocked(true))
  }

  return (
    <>
      {/* Elemen audio selalu dirender dengan bentuk pohon yang sama, supaya
          ia tidak dipasang ulang saat cover dibuka dan `audioRef` tetap
          menunjuk ke elemen yang sedang memutar. */}
      <audio ref={audioRef} src={assets.music} loop preload={shouldPlay ? 'auto' : 'none'} />

      {/* Tombol baru muncul setelah cover dibuka. */}
      {shouldPlay && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Matikan musik' : 'Nyalakan musik'}
          aria-pressed={playing}
          title={blocked ? 'Ketuk untuk menyalakan musik' : undefined}
          className={`fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full shadow-[var(--shadow-soft)] transition-colors ${
            playing ? 'bg-sky-600 text-white' : 'glass-card text-sky-600'
          }`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.6 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.span
            animate={playing ? { rotate: [0, 8, -8, 0] } : { rotate: 0 }}
            transition={
              playing
                ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3, ease: EASE }
            }
          >
            {playing ? <Note size={19} /> : <NoteOff size={19} />}
          </motion.span>

          {/* Riak lembut saat musik berjalan. */}
          {playing && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-sky-400"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.button>
      )}
    </>
  )
}
