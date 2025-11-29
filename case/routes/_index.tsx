import { useEffect, useState } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { WaveTune } from '../../code'
import type { Song } from '../types'

export const meta: MetaFunction = () => {
  return [{ title: 'Wave Tune' }]
}

// Song registry - add new songs here
const SONGS: Song[] = [
  {
    id: 'home',
    name: 'Home',
    module: () => import('../songs/home'),
  },
]

export default function Index() {
  const [loadedSongs, setLoadedSongs] = useState<
    Record<string, WaveTune>
  >({})
  const [loading, setLoading] = useState(true)
  const [playingSong, setPlayingSong] = useState<string | null>(null)

  useEffect(() => {
    const loadSongs = async () => {
      const loaded: Record<string, WaveTune> = {}

      for (const song of SONGS) {
        try {
          const module = await song.module()
          const instance = module[song.id] || module.default

          if (instance instanceof WaveTune) {
            await instance.initialize()
            loaded[song.id] = instance
          } else {
            console.error(
              `Song ${song.id} doesn't export a valid WaveTune instance`,
            )
          }
        } catch (error) {
          console.error(`Failed to load song ${song.id}:`, error)
        }
      }

      setLoadedSongs(loaded)
      setLoading(false)
    }

    loadSongs()
  }, [])

  const toggleSong = async (songId: string) => {
    const instance = loadedSongs[songId]
    if (!instance) return

    // Stop all other songs
    for (const [id, song] of Object.entries(loadedSongs)) {
      if (id !== songId && song.isPlaying) {
        song.stop()
      }
    }

    // Toggle this song
    if (!instance.isPlaying) {
      await instance.start()
      setPlayingSong(songId)
    } else {
      instance.stop()
      setPlayingSong(null)
    }
  }

  return (
    <div className="min-h-screen bg-dark p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Wave Tune
        </h1>

        {loading ? (
          <div className="text-center text-gray-400 text-xl">
            Loading songs...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SONGS.map(song => {
              const isPlaying = playingSong === song.id
              const isLoaded = !!loadedSongs[song.id]

              return (
                <button
                  key={song.id}
                  onClick={() => toggleSong(song.id)}
                  disabled={!isLoaded}
                  className={`
                    relative p-8 rounded-xl border-2 transition-all duration-300 transform
                    ${
                      isPlaying
                        ? 'bg-primary text-dark border-primary scale-105 shadow-2xl shadow-primary/50'
                        : 'bg-gray-800 text-white border-gray-700 hover:border-primary hover:scale-105 hover:shadow-xl'
                    }
                    ${
                      !isLoaded
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    }
                  `}
                >
                  <span className="text-xl font-semibold">
                    {song.name}
                  </span>
                  {isPlaying && (
                    <span className="absolute top-2 right-3 text-2xl animate-pulse-slow">
                      ♪
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
