import { motion } from 'framer-motion'
import useInViewAnimation from '../hooks/useInViewAnimation.js'
import { fadeUp, stagger } from '../lib/motion.js'
import FloralDivider from './decor/FloralDivider.jsx'

/**
 * Kerangka satu section: id untuk navigasi, judul serif, anak judul kecil,
 * dan pembatas bunga di bawah judul. Dipakai hampir semua section supaya
 * jarak dan ritme tipografinya persis sama.
 */
export default function Section({
  id,
  title,
  eyebrow,
  children,
  divider = true,
  className = '',
  innerClassName = '',
}) {
  const { ref, animate } = useInViewAnimation()

  return (
    <section id={id} className={`relative overflow-hidden px-5 py-16 sm:py-20 ${className}`}>
      <div className={`relative mx-auto max-w-2xl ${innerClassName}`}>
        {title && (
          <motion.header
            ref={ref}
            className="text-center"
            variants={stagger(0.12)}
            initial="hidden"
            animate={animate}
          >
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl font-light text-sky-900 sm:text-4xl"
            >
              {title}
            </motion.h2>

            {eyebrow && (
              <motion.p variants={fadeUp} className="text-eyebrow mt-2">
                {eyebrow}
              </motion.p>
            )}

            {divider && <FloralDivider width={170} className="mt-2" />}
          </motion.header>
        )}

        <div className={title ? 'mt-6' : ''}>{children}</div>
      </div>
    </section>
  )
}
