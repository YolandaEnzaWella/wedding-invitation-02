import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import CoverScreen from './components/CoverScreen.jsx'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import CountdownSection from './components/CountdownSection.jsx'
import QuoteSection from './components/QuoteSection.jsx'
import CoupleSection from './components/CoupleSection.jsx'
import EventSection from './components/EventSection.jsx'
import LoveStorySection from './components/LoveStorySection.jsx'
import GallerySection from './components/GallerySection.jsx'
import RSVPSection from './components/RSVPSection.jsx'
import GiftSection from './components/GiftSection.jsx'
import WishesSection from './components/WishesSection.jsx'
import FooterSection from './components/FooterSection.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import FloralDivider from './components/decor/FloralDivider.jsx'

import useWishes from './hooks/useWishes.js'
import { EASE } from './lib/motion.js'

/** Mengambil nama tamu dari URL: ...?to=Budi+Santoso */
function readGuestName() {
  if (typeof window === 'undefined') return ''

  const raw = new URLSearchParams(window.location.search).get('to') ?? ''

  // Nama tamu berasal dari URL, jadi diperlakukan sebagai teks biasa:
  // dirapikan, dipotong, dan tidak pernah ditafsirkan sebagai HTML.
  return raw.replace(/\s+/g, ' ').trim().slice(0, 60)
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [guestName] = useState(readGuestName)
  const { wishes, add } = useWishes()

  // Halaman di belakang cover tidak boleh ikut ter-scroll.
  useEffect(() => {
    document.body.classList.toggle('is-locked', !opened)
    return () => document.body.classList.remove('is-locked')
  }, [opened])

  const handleOpen = () => {
    setOpened(true)
    // Mulai dari puncak halaman, bukan dari posisi scroll sebelumnya.
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <>
      <AnimatePresence>
        {!opened && <CoverScreen guestName={guestName} onOpen={handleOpen} />}
      </AnimatePresence>

      {/* Isi undangan baru dimunculkan setelah cover dibuka, agar animasi
          masuk tiap section tidak "terbakar" di balik cover. */}
      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <Navbar />

          <HeroSection />
          <CountdownSection />

          <QuoteSection />

          <CoupleSection />
          <FloralDivider width={220} flip />

          <EventSection />
          <LoveStorySection />

          <GallerySection />
          <FloralDivider width={220} />

          <RSVPSection onWish={add} />
          <GiftSection />
          <WishesSection wishes={wishes} />

          <FooterSection />
        </motion.main>
      )}

      <MusicPlayer shouldPlay={opened} />
    </>
  )
}
