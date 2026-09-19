/* ===========================================================================
   TANGGAL & WAKTU
   ---------------------------------------------------------------------------
   Semua tanggal yang tampil di undangan dihitung dari `event.date` di
   src/data/content.js. Nama hari tidak pernah ditulis manual, jadi tidak
   mungkin tertulis "Sabtu" padahal tanggalnya jatuh di hari Senin.

   Semua format dipaksa ke zona Asia/Jakarta supaya tamu yang membuka undangan
   dari luar negeri tetap melihat jam acara dalam WIB, bukan jam lokalnya.
   =========================================================================== */

import { event } from '../data/content.js'

const TZ = 'Asia/Jakarta'

export const eventDate = new Date(event.date)

/** "Senin, 12 Oktober 2026" — nama hari dihitung, bukan diketik. */
export function formatFullDate(date = eventDate) {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** "12 . 10 . 2026" — dipakai besar di cover dan footer. */
export function formatDotted(date = eventDate) {
  const parts = new Intl.DateTimeFormat('id-ID', {
    timeZone: TZ,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).formatToParts(date)

  const get = (type) => parts.find((p) => p.type === type).value
  return `${get('day')} . ${get('month')} . ${get('year')}`
}

/**
 * "Pukul 08.00 WIB" atau "Pukul 11.00 - 14.00 WIB".
 * `start` dan `end` berupa string jam 24 ("08:00"), `end` boleh null.
 */
export function formatTimeRange(start, end, label = event.timeZoneLabel) {
  const clean = (t) => t.replace(':', '.')
  return end
    ? `Pukul ${clean(start)} - ${clean(end)} ${label}`
    : `Pukul ${clean(start)} ${label}`
}

/**
 * Sisa waktu menuju acara. Mengembalikan nol di semua kolom bila acara sudah
 * lewat, sehingga hitung mundur berhenti rapi alih-alih menampilkan angka
 * minus.
 */
export function timeLeft(from = new Date(), to = eventDate) {
  const ms = to.getTime() - from.getTime()

  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  }

  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR

  return {
    days: Math.floor(ms / DAY),
    hours: Math.floor((ms % DAY) / HOUR),
    minutes: Math.floor((ms % HOUR) / MINUTE),
    seconds: Math.floor((ms % MINUTE) / SECOND),
    isOver: false,
  }
}

/** "19 Sep 2026" — dipakai untuk menandai kapan ucapan dikirim. */
export function formatShortDate(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: TZ,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
