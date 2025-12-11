import { useEffect, useState, useMemo } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { WaveTune } from '../../code'
import type { Song } from '../types'
import SAMPLES from '../settings/samples.json'

export const meta: MetaFunction = () => {
  return [{ title: 'Wave' }]
}

// Song registry - add new songs here
const SONGS: Song[] = [
  {
    id: 'home',
    name: 'Home',
    module: () => import('../songs/home'),
  },
  {
    id: 'flowBeat',
    name: 'Flow Beat',
    module: () => import('../songs/flow-beat'),
  },
]

// Title mappings for drum sections
const TITLE_MAPPINGS: Record<string, { title: string; level: number }> =
  {
    guitar: { title: 'Guitar', level: 2 },
    bass: { title: 'Bass', level: 2 },
    drum: { title: 'Drum', level: 2 },
    'drum/kick': { title: 'Kick Drum', level: 3 },
    'drum/kick/808': { title: 'Kick (808)', level: 4 },
    'drum/kick/classic': { title: 'Kick (Classic)', level: 4 },
    'drum/kick/deep': { title: 'Kick (Deep)', level: 4 },
    'drum/kick/heavy': { title: 'Kick (Heavy)', level: 4 },
    'drum/kick/mid': { title: 'Kick (Mid)', level: 4 },
    'drum/kick/processed-machine': {
      title: 'Kick (Processed Machine)',
      level: 4,
    },
    'drum/kick/punchy': { title: 'Kick (Punchy)', level: 4 },
    'drum/kick/short-snappy': {
      title: 'Kick (Short Snappy)',
      level: 4,
    },
    'drum/kick/unusual': { title: 'Kick (Unusual)', level: 4 },
    'drum/kick/various': { title: 'Kick (Various)', level: 4 },
    'drum/snare': { title: 'Snare', level: 3 },
    'drum/snare/808': { title: 'Snare (808)', level: 4 },
    'drum/snare/body': { title: 'Snare (Body)', level: 4 },
    'drum/snare/heavy': { title: 'Snare (Heavy)', level: 4 },
    'drum/snare/layered': { title: 'Snare (Layered)', level: 4 },
    'drum/snare/lo-fi-gritty': {
      title: 'Snare (Lo-Fi Gritty)',
      level: 4,
    },
    'drum/snare/low-mid': { title: 'Snare (Low Mid)', level: 4 },
    'drum/snare/noise': { title: 'Snare (Noise)', level: 4 },
    'drum/snare/processed-machine': {
      title: 'Snare (Processed Machine)',
      level: 4,
    },
    'drum/snare/punchy': { title: 'Snare (Punchy)', level: 4 },
    'drum/snare/synthetic': {
      title: 'Snare (Synthetic)',
      level: 4,
    },
    'drum/snare/tight': { title: 'Snare (Tight)', level: 4 },
    'drum/cymbal': { title: 'Cymbal', level: 3 },
    'drum/cymbal/crash': { title: 'Crash', level: 4 },
    'drum/cymbal/effected': {
      title: 'Cymbal (Effected)',
      level: 4,
    },
    'drum/cymbal/hat': { title: 'Hi-Hat', level: 3 },
    'drum/cymbal/hat/closed': { title: 'Hi-Hat Closed', level: 4 },
    'drum/cymbal/hat/closed/acoustic': {
      title: 'Hi-Hat Closed (Acoustic)',
      level: 5,
    },
    'drum/cymbal/hat/closed/classic': {
      title: 'Hi-Hat Closed (Classic)',
      level: 5,
    },
    'drum/cymbal/hat/closed/metallic': {
      title: 'Hi-Hat Closed (Metallic)',
      level: 5,
    },
    'drum/cymbal/hat/closed/noise': {
      title: 'Hi-Hat Closed (Noise)',
      level: 5,
    },
    'drum/cymbal/hat/closed/short': {
      title: 'Hi-Hat Closed (Short)',
      level: 5,
    },
    'drum/cymbal/hat/closed/synthetic': {
      title: 'Hi-Hat Closed (Synthetic)',
      level: 5,
    },
    'drum/cymbal/hat/open': { title: 'Hi-Hat Open', level: 4 },
    'drum/cymbal/hat/open/acoustic': {
      title: 'Hi-Hat Open (Acoustic)',
      level: 5,
    },
    'drum/cymbal/hat/open/classic': {
      title: 'Hi-Hat Open (Classic)',
      level: 5,
    },
    'drum/cymbal/hat/open/layered': {
      title: 'Hi-Hat Open (Layered)',
      level: 5,
    },
    'drum/cymbal/hat/open/metallic': {
      title: 'Hi-Hat Open (Metallic)',
      level: 5,
    },
    'drum/cymbal/hat/open/noise': {
      title: 'Hi-Hat Open (Noise)',
      level: 5,
    },
    'drum/cymbal/hat/open/synthetic': {
      title: 'Hi-Hat Open (Synthetic)',
      level: 5,
    },
    'drum/cymbal/noise': { title: 'Cymbal (Noise)', level: 4 },
    'drum/cymbal/ride': { title: 'Ride', level: 4 },
    'drum/cymbal/synthetic': {
      title: 'Cymbal (Synthetic)',
      level: 4,
    },
    'drum/tom': { title: 'Tom', level: 3 },
    'drum/tom/classic': { title: 'Tom (Classic)', level: 4 },
    'drum/tom/heavy': { title: 'Tom (Heavy)', level: 4 },
    'drum/tom/lazer': { title: 'Tom (Lazer)', level: 4 },
    'drum/tom/short': { title: 'Tom (Short)', level: 4 },
    'drum/tom/sub': { title: 'Tom (Sub)', level: 4 },
    'drum/tom/synthetic': { title: 'Tom (Synthetic)', level: 4 },
    'drum/tom/tone': { title: 'Tom (Tone)', level: 4 },
    'drum/clap': { title: 'Clap', level: 3 },
    'drum/clap/abstract': { title: 'Clap (Abstract)', level: 4 },
    'drum/clap/bright': { title: 'Clap (Bright)', level: 4 },
    'drum/clap/classic': { title: 'Clap (Classic)', level: 4 },
    'drum/clap/deep': { title: 'Clap (Deep)', level: 4 },
    'drum/clap/layered': { title: 'Clap (Layered)', level: 4 },
    'drum/clap/noise': { title: 'Clap (Noise)', level: 4 },
    'drum/clap/snap': { title: 'Clap (Snap)', level: 4 },
    'drum/clap/synthetic': { title: 'Clap (Synthetic)', level: 4 },
    'drum/clap/transient': { title: 'Clap (Transient)', level: 4 },
    'drum/click': { title: 'Click', level: 3 },
    'drum/bongo': { title: 'Bongo', level: 3 },
    'drum/conga': { title: 'Conga', level: 3 },
    'drum/rimshot': { title: 'Rimshot', level: 3 },
    'drum/bell': { title: 'Bell', level: 3 },
    'drum/blip': { title: 'Blip (Drum)', level: 3 },
    'drum/abstract': { title: 'Abstract (Drum)', level: 3 },
    'drum/glitch': { title: 'Glitch', level: 3 },
    'drum/hand-drum': { title: 'Hand Drum', level: 3 },
    'drum/layer': { title: 'Layer', level: 3 },
    'drum/layer/clap-tail': { title: 'Clap Tail', level: 4 },
    'drum/layer/live-snare': { title: 'Live Snare', level: 4 },
    'drum/layer/noise': { title: 'Noise Layer', level: 4 },
    'drum/layer/organic': { title: 'Organic Layer', level: 4 },
    'drum/layer/prep-snare': { title: 'Prep Snare', level: 4 },
    'drum/layer/room-snare': { title: 'Room Snare', level: 4 },
    'drum/layer/sub-boom': { title: 'Sub Boom', level: 4 },
    'drum/layer/sub-deep': { title: 'Sub Deep', level: 4 },
    'drum/layer/sub-mid': { title: 'Sub Mid', level: 4 },
    'drum/layer/sub-verb': { title: 'Sub Verb', level: 4 },
    'drum/nu': { title: 'Nu Drum', level: 3 },
    'drum/pop': { title: 'Pop', level: 3 },
    'drum/shaker': { title: 'Shaker', level: 3 },
    'drum/hard': { title: 'Hard Drum', level: 3 },
    'drum/soft': { title: 'Soft Drum', level: 3 },
    'drum/small': { title: 'Small Drum', level: 3 },
    'drum/timbale': { title: 'Timbale', level: 3 },
    'drum/various': { title: 'Various Drum', level: 3 },
  }

interface SampleSection {
  path: string
  title: string
  level: number
  samples: any[]
}

// Function to extract drum samples from the nested JSON structure
function extractDrumSamples(data: any[]): SampleSection[] {
  const sections: SampleSection[] = []
  const processedPaths = new Set<string>()

  function traverse(node: any, ancestors: string[] = []) {
    if (!node || !node.name) return

    const currentPath = [...ancestors, node.name]
    const fullPath = currentPath.join('/')

    // Get the relative path from base
    const relativePath = fullPath

    // Check if this path has a title mapping
    const mapping = TITLE_MAPPINGS[relativePath]

    if (mapping && !processedPaths.has(relativePath)) {
      processedPaths.add(relativePath)

      // Collect samples for this section
      const samples: any[] = []

      if (node.children && Array.isArray(node.children)) {
        // Get direct .wav files in this directory
        node.children.forEach((child: any) => {
          // Files have both name and path, directories only have name and children
          if (child.path && !child.children) {
            samples.push({
              name: child.name,
              path: child.path, // Use the path field from the file object
            })
          }
        })

        // Add section even if it has no direct samples (might have subdirectories)
        sections.push({
          path: relativePath,
          title: mapping.title,
          level: mapping.level,
          samples: samples.sort((a, b) => a.name.localeCompare(b.name)),
        })

        // Traverse subdirectories
        node.children.forEach((child: any) => {
          if (child.children) {
            traverse(child, currentPath)
          }
        })
      }
    } else if (node.children) {
      // Continue traversing even if this node doesn't have a mapping
      node.children.forEach((child: any) => {
        traverse(child, currentPath)
      })
    }
  }

  // Start traversal
  data.forEach(item => traverse(item))

  // Sort sections by path to maintain hierarchy
  return sections.sort((a, b) => a.path.localeCompare(b.path))
}

export default function Index() {
  const [loadedSongs, setLoadedSongs] = useState<
    Record<string, WaveTune>
  >({})
  const [loading, setLoading] = useState(true)
  const [playingSong, setPlayingSong] = useState<string | null>(null)
  const [playingSample, setPlayingSample] = useState<string | null>(
    null,
  )
  const [currentAudioSource, setCurrentAudioSource] =
    useState<AudioBufferSourceNode | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(
    null,
  )
  const [recordingUrls, setRecordingUrls] = useState<
    Record<string, string>
  >({})

  // Process sample sections from JSON data
  const sampleSections = useMemo(() => {
    return extractDrumSamples(SAMPLES)
  }, [])

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

  // Helper function to stop all audio (songs and samples)
  const stopAllAudio = () => {
    // Stop all playing songs
    for (const [id, song] of Object.entries(loadedSongs)) {
      if (song.isPlaying) {
        song.stop()
      }
    }
    setPlayingSong(null)

    // Stop current playing sample
    if (currentAudioSource) {
      try {
        currentAudioSource.stop()
      } catch (e) {
        // Ignore error if already stopped
      }
      setCurrentAudioSource(null)
    }
    setPlayingSample(null)
  }

  // Clean up recording URLs on unmount
  useEffect(() => {
    return () => {
      // Revoke all blob URLs to free memory
      Object.values(recordingUrls).forEach(url => {
        URL.revokeObjectURL(url)
      })
    }
  }, [recordingUrls])

  const toggleSong = async (songId: string) => {
    const instance = loadedSongs[songId]
    if (!instance) return

    // If this song is already playing, just stop it
    if (instance.isPlaying && playingSong === songId) {
      instance.stop()
      setPlayingSong(null)
      return
    }

    // Stop all audio (songs and samples)
    stopAllAudio()

    // Clear previous recording for this song if it exists
    if (recordingUrls[songId]) {
      URL.revokeObjectURL(recordingUrls[songId])
      setRecordingUrls(prev => {
        const newUrls = { ...prev }
        delete newUrls[songId]
        return newUrls
      })
    }

    // Start the new song with recording enabled
    await instance.start(false, (result) => {
      // Callback when recording completes
      setRecordingUrls(prev => ({
        ...prev,
        [songId]: result.url,
      }))
      
      // Automatically trigger download
      const songName = SONGS.find(s => s.id === songId)?.name || songId
      const a = document.createElement('a')
      a.href = result.url
      a.download = `${songName.toLowerCase().replace(/\s+/g, '-')}-recording.webm`
      a.click()
    })
    setPlayingSong(songId)
  }

  const playSample = async (samplePath: string) => {
    // Stop all audio (songs and samples)
    stopAllAudio()

    try {
      // Create or reuse audio context
      const ctx = audioContext || new AudioContext()
      if (!audioContext) {
        setAudioContext(ctx)
      }

      // Load and play the sample
      const response = await fetch(samplePath)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer)

      const source = ctx.createBufferSource()
      source.buffer = audioBuffer
      source.connect(ctx.destination)
      source.start()

      setCurrentAudioSource(source)
      setPlayingSample(samplePath)

      // Clear playing state when sample finishes
      source.onended = () => {
        setPlayingSample(null)
        setCurrentAudioSource(null)
      }
    } catch (error) {
      console.error('Failed to play sample:', error)
      setPlayingSample(null)
      setCurrentAudioSource(null)
    }
  }

  return (
    <div className="min-h-screen bg-dark p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Wave
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
                <div key={song.id} className="flex flex-col gap-3">
                  <button
                    onClick={() => toggleSong(song.id)}
                    disabled={!isLoaded}
                    className={`
                      relative p-8 rounded border-2 transition-all duration-300 transform cursor-pointer
                      ${
                        isPlaying
                          ? 'bg-primary text-dark border-primary scale-105 shadow-2xl shadow-primary/50'
                          : 'bg-gray-800 text-white border-gray-700 hover:border-primary hover:scale-105 hover:shadow-xl'
                      }
                      ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}
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
                  {recordingUrls[song.id] && (
                    <button
                      onClick={() => {
                        const a = document.createElement('a')
                        a.href = recordingUrls[song.id]
                        a.download = `${song.name.toLowerCase().replace(/\s+/g, '-')}-recording.webm`
                        a.click()
                      }}
                      className="p-3 bg-green-600 hover:bg-green-500 text-white rounded transition-colors duration-200"
                    >
                      Download Recording Again
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Sample Library Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Sample Library
          </h2>

          {/* Navigation Buttons */}
          <div className="mb-12 p-6 bg-gray-800 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {Object.entries(TITLE_MAPPINGS)
                .filter(
                  ([_, mapping]) =>
                    mapping.level === 2 || mapping.level === 3,
                )
                // .sort(([pathA, mappingA], [pathB, mappingB]) => {
                //   // Sort by level first, then alphabetically
                //   if (mappingA.level !== mappingB.level) {
                //     return mappingA.level - mappingB.level
                //   }
                //   return pathA.localeCompare(pathB)
                // })
                .map(([path, mapping]) => (
                  <button
                    key={path}
                    onClick={() => {
                      const element = document.getElementById(
                        `section-${path}`,
                      )
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    }}
                    className={`
                      px-4 py-2 rounded border cursor-pointer transition-all duration-200
                      bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-primary
                      text-sm font-medium
                    `}
                  >
                    {mapping.title}
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-8">
            {sampleSections.map(section => {
              return (
                <div
                  key={section.path}
                  id={`section-${section.path}`}
                  className="mb-8 scroll-mt-20"
                >
                  <h2 className="text-2xl font-bold mb-4 text-white mt-0">
                    {section.title}
                  </h2>

                  {/* Display samples for this section */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {section.samples.length > 0 &&
                      section.samples.map(
                        (sample: { name: string; path: string }) => (
                          <button
                            key={sample.path}
                            onClick={() => playSample(sample.path)}
                            className={`
                            p-3 rounded border transition-all duration-200 cursor-pointer
                            ${
                              playingSample === sample.path
                                ? 'bg-primary text-dark border-primary scale-105'
                                : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-primary hover:text-white'
                            }
                            text-sm truncate
                          `}
                            title={sample.name}
                          >
                            {sample.name}
                          </button>
                        ),
                      )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
