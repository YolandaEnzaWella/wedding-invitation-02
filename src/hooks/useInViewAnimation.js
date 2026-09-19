import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { inViewOnce } from '../lib/motion.js'

/**
 * Menyalakan animasi saat elemen masuk viewport, sekali saja.
 *
 *   const { ref, animate } = useInViewAnimation()
 *   <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={animate} />
 *
 * Dipakai untuk elemen yang perlu mengoordinasi beberapa anak sekaligus.
 * Untuk kasus sederhana, `whileInView` langsung dari Framer Motion sudah cukup.
 */
export function useInViewAnimation(options = inViewOnce) {
  const ref = useRef(null)
  const isInView = useInView(ref, options)

  return {
    ref,
    isInView,
    animate: isInView ? 'show' : 'hidden',
  }
}

export default useInViewAnimation
