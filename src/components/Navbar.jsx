import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { couple, navLinks } from '../data/content.js'
import { EASE } from '../lib/motion.js'
import { Close, Menu } from './Icons.jsx'

/**
 * Navigasi mengambang dengan latar kaca (glassmorphism). Menyembunyikan diri
 * saat tamu scroll ke bawah — supaya tidak menutupi foto — dan muncul lagi
 * begitu scroll ke atas.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(navLinks[0].id)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    // Di dekat puncak halaman navbar selalu terlihat.
    setHidden(y > 140 && y > previous)
  })

  // Menyorot tautan sesuai section yang sedang terlihat.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Menutup menu mobile setiap kali tamu berpindah section.
  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        className="glass-card fixed inset-x-0 top-0 z-40 rounded-none border-x-0 border-t-0"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? -88 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => go('home')}
            className="font-script text-2xl text-sky-700"
          >
            {couple.monogram}
          </button>

          {/* Tautan penuh — hanya di layar lebar. */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active === link.id
                      ? 'text-sky-800'
                      : 'text-sky-600 hover:text-sky-800'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-sky-600"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Tombol menu — hanya di layar sempit. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-full text-sky-700 transition-colors hover:bg-sky-100 md:hidden"
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Daftar tautan versi mobile. */}
        <AnimatePresence>
          {open && (
            <motion.ul
              className="overflow-hidden border-t border-white/70 px-5 md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className={`w-full border-b border-sky-100 py-3 text-left text-sm last:border-0 ${
                      active === link.id ? 'text-sky-800' : 'text-sky-600'
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Menutup menu saat tamu menyentuh area di luarnya. */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 cursor-default bg-sky-900/10 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
