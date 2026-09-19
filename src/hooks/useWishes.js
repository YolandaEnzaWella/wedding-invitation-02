import { useCallback, useEffect, useState } from 'react'
import { seedWishes } from '../data/content.js'
import { formatShortDate } from '../lib/date.js'

const STORAGE_KEY = 'wedding-invitation-02:wishes'

/**
 * Daftar ucapan & doa.
 *
 * CATATAN PENTING: ucapan disimpan di localStorage browser tamu
 * masing-masing. Artinya tamu hanya melihat ucapannya sendiri ditambah
 * ucapan awal di content.js — ucapan antar tamu TIDAK saling terlihat.
 *
 * Itu disengaja supaya undangan ini tetap bisa dideploy sebagai situs statis
 * (GitHub Pages) tanpa server. Untuk membuat ucapan terlihat oleh semua tamu,
 * ganti `load` dan `add` di bawah dengan panggilan ke database — lihat bagian
 * "Menyambungkan ucapan ke database" di README.
 */
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    // Mode penyamaran / penyimpanan diblokir: undangan tetap jalan, hanya
    // ucapan tamu yang tidak tersimpan.
    return []
  }
}

function save(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* diabaikan dengan sengaja — lihat catatan di atas */
  }
}

export function useWishes() {
  const [mine, setMine] = useState([])

  // Dibaca setelah render pertama agar hasil server dan klien sama persis.
  useEffect(() => {
    setMine(load())
  }, [])

  const add = useCallback(({ name, message }) => {
    const wish = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: formatShortDate(),
      isMine: true,
    }

    setMine((prev) => {
      const next = [wish, ...prev]
      save(next)
      return next
    })

    return wish
  }, [])

  return {
    /** Ucapan tamu sendiri di paling atas, lalu ucapan awal. */
    wishes: [...mine, ...seedWishes],
    add,
  }
}

export default useWishes
