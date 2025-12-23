import * as Tone from 'tone'

// Type definitions
type NoteName = string
type NoteMap = Record<NoteName, string>
type ChordMap = Record<string, NoteName[]>

interface InstrumentPart {
  [key: string]: (string | '-')[]
}

interface InstrumentSequence {
  part: string
  repeat: number
  distortion?: boolean
}

interface Instrument {
  on: boolean
  parts: InstrumentPart
  sequence: InstrumentSequence[]
  noteLength?: string
}

interface Instruments {
  guitar?: Instrument
  bass?: Instrument
  drums?: Instrument
  hihat?: Instrument
}

interface WaveTuneInput {
  instruments: Instruments
  bpm?: number
  name: string
  timeSignature?: [number, number]
}

interface SequenceState {
  sequenceIndex: number
  repeatCount: number
}

interface Steps {
  guitar: number
  bass: number
  drums: number
  hihat: number
}

interface RecordingResult {
  blob: Blob
  url: string
}

// Note definitions
export const BASS_NOTES: NoteMap = {
  D1: '/base/bass/string-4-D-as-D1.wav',
  'D#1': '/base/bass/string-4-Dx-as-Dx1.wav',
  E1: '/base/bass/string-4-E-as-E1.wav',
  F1: '/base/bass/string-4-F-as-F1.wav',
  'F#1': '/base/bass/string-4-Fx-as-Fx1.wav',
  G1: '/base/bass/string-4-G-as-G1.wav',
  'G#1': '/base/bass/string-4-Gx-as-Gx1.wav',
  A1: '/base/bass/string-3-A-as-A1.wav',
  'A#1': '/base/bass/string-3-Ax-as-Ax1.wav',
  B1: '/base/bass/string-3-B-as-B1.wav',
  C2: '/base/bass/string-3-C-as-C2.wav',
  'C#2': '/base/bass/string-3-Cx-as-Cx2.wav',
  D2: '/base/bass/string-2-D-as-D2.wav',
  'D#2': '/base/bass/string-2-Dx-as-Dx2.wav',
  E2: '/base/bass/string-2-E-as-E2.wav',
  F2: '/base/bass/string-2-F-as-F2.wav',
  'F#2': '/base/bass/string-2-Fx-as-Fx2.wav',
  G2: '/base/bass/string-1-G-as-G2.wav',
  'G#2': '/base/bass/string-1-Gx-as-Gx2.wav',
  A2: '/base/bass/string-1-A-as-A2.wav',
  'A#2': '/base/bass/string-1-Ax-as-Ax2.wav',
  B2: '/base/bass/string-1-B-as-B2.wav',
  C3: '/base/bass/string-1-C-as-C3.wav',
  'C#3': '/base/bass/string-1-Cx-as-Cx3.wav',
  D3: '/base/bass/string-1-D-as-D3.wav',
  'D#3': '/base/bass/string-1-Dx-as-Dx3.wav',
  E3: '/base/bass/string-1-E-as-E3.wav',
  F3: '/base/bass/string-1-F-as-F3.wav',
  'F#3': '/base/bass/string-1-Fx-as-Fx3.wav',
  G3: '/base/bass/string-1-G-as-G3.wav',
  'G#3': '/base/bass/string-1-Gx-as-Gx3.wav',
  A3: '/base/bass/string-1-A-as-A3.wav',
  'A#3': '/base/bass/string-1-Ax-as-Ax3.wav',
  B3: '/base/bass/string-1-B-as-B3.wav',
  C4: '/base/bass/string-1-C-as-C4.wav',
  'C#4': '/base/bass/string-1-Cx-as-Cx4.wav',
  D4: '/base/bass/string-1-D-as-D4.wav',
  'D#4': '/base/bass/string-1-Dx-as-Dx4.wav',
  E4: '/base/bass/string-1-E-as-E4.wav',
  F4: '/base/bass/string-1-F-as-F4.wav',
  'F#4': '/base/bass/string-1-Fx-as-Fx4.wav',
  G4: '/base/bass/string-1-G-as-G4.wav',
}

export const GUITAR_NOTES: NoteMap = {
  D2: '/base/guitar/string-6-D-as-D2.wav',
  'D#2': '/base/guitar/string-6-Dx-as-Dx2.wav',
  E2: '/base/guitar/string-6-E-as-E2.wav',
  F2: '/base/guitar/string-6-F-as-F2.wav',
  'F#2': '/base/guitar/string-6-Fx-as-Fx2.wav',
  G2: '/base/guitar/string-6-G-as-G2.wav',
  'G#2': '/base/guitar/string-6-Gx-as-Gx2.wav',
  A2: '/base/guitar/string-5-A-as-A2.wav',
  'A#2': '/base/guitar/string-5-Ax-as-Ax2.wav',
  B2: '/base/guitar/string-5-B-as-B2.wav',
  C3: '/base/guitar/string-5-C-as-C3.wav',
  'C#3': '/base/guitar/string-5-Cx-as-Cx3.wav',
  D3: '/base/guitar/string-4-D-as-D3.wav',
  'D#3': '/base/guitar/string-4-Dx-as-Dx3.wav',
  E3: '/base/guitar/string-4-E-as-E3.wav',
  F3: '/base/guitar/string-4-F-as-F3.wav',
  'F#3': '/base/guitar/string-4-Fx-as-Fx3.wav',
  A3: '/base/guitar/string-3-A-as-A3.wav',
  'A#3': '/base/guitar/string-3-Ax-as-Ax3.wav',
  G3: '/base/guitar/string-3-G-as-G3.wav',
  'G#3': '/base/guitar/string-3-Gx-as-Gx3.wav',
  B3: '/base/guitar/string-2-B-as-B3.wav',
  C4: '/base/guitar/string-2-C-as-C4.wav',
  'C#4': '/base/guitar/string-2-Cx-as-Cx4.wav',
  D4: '/base/guitar/string-2-D-as-D4.wav',
  'D#4': '/base/guitar/string-2-Dx-as-Dx4.wav',
  E4: '/base/guitar/string-1-E-as-E4.wav',
  F4: '/base/guitar/string-1-F-as-F4.wav',
  'F#4': '/base/guitar/string-1-Fx-as-Fx4.wav',
  G4: '/base/guitar/string-1-G-as-G4.wav',
  'G#4': '/base/guitar/string-1-Gx-as-Gx4.wav',
  A4: '/base/guitar/string-1-A-as-A4.wav',
  'A#4': '/base/guitar/string-1-Ax-as-Ax4.wav',
  B4: '/base/guitar/string-1-B-as-B4.wav',
  C5: '/base/guitar/string-1-C-as-C5.wav',
  'C#5': '/base/guitar/string-1-Cx-as-Cx5.wav',
  D5: '/base/guitar/string-1-D-as-D5.wav',
  'D#5': '/base/guitar/string-1-Dx-as-Dx5.wav',
  E5: '/base/guitar/string-1-E-as-E5.wav',
  F5: '/base/guitar/string-1-F-as-F5.wav',
  'F#5': '/base/guitar/string-1-Fx-as-Fx5.wav',
  G5: '/base/guitar/string-1-G-as-G5.wav',
  'G#5': '/base/guitar/string-1-Gx-as-Gx5.wav',
  A5: '/base/guitar/string-1-A-as-A5.wav',
  'A#5': '/base/guitar/string-1-Ax-as-Ax5.wav',
  B5: '/base/guitar/string-1-B-as-B5.wav',
  C6: '/base/guitar/string-1-C-as-C6.wav',
  'C#6': '/base/guitar/string-1-Cx-as-Cx6.wav',
}

export const CHORD_DEFINITIONS: ChordMap = {
  Gx: ['G4', 'D4'],
  Aa: ['A3', 'D4'],
  Dx: ['D4', 'A3'],
  Dg: ['C4', 'G3'],
  Gd: ['B3', 'D4'],

  // power chords
  Ap5_l: ['A2', 'E3'],
  Ap5_h: ['A3', 'E4'],
  Bp5_l: ['B2', 'D3'],
  Bp5_h: ['B3', 'D4'],
  Cp5_l: ['C3', 'G3'],
  Cp5_h: ['C4', 'G4'],
  Dp5_l: ['D2', 'A2'],
  Dp5_h: ['D3', 'A3'],
  Ep5_l: ['E2', 'B2'],
  Ep5_h: ['E3', 'B3'],
  Fp5_l: ['F2', 'C3'],
  Fp5_h: ['F3', 'C4'],
  Gp5_l: ['G2', 'D3'],
  Gp5_h: ['G3', 'D4'],
}

// Helper function to calculate sequence duration
function calculateSequenceDuration(
  instrument: Instrument,
  noteLength: string,
  bpm: number,
  timeSignature: [number, number] = [4, 4],
): { minutes: number; seconds: number; totalSeconds: number; totalBeats: number; totalNotes: number } {
  if (!instrument.on) return { minutes: 0, seconds: 0, totalSeconds: 0, totalBeats: 0, totalNotes: 0 }

  const [beatsPerMeasure, beatUnit] = timeSignature

  // Calculate the duration of each note type in seconds
  // In x/y time: x = beats per measure, y = which note gets the beat
  // For 5/8: 5 eighth notes per measure, eighth note gets the beat
  
  // Use the BPM as-is without any time signature adjustments
  const effectiveBPM = bpm;
  
  // Convert note lengths to their duration relative to a quarter note
  const noteValues: Record<string, number> = {
    '1n': 4,      // whole note = 4 quarter notes
    '2n': 2,      // half note = 2 quarter notes
    '4n': 1,      // quarter note = 1 quarter note
    '8n': 0.5,    // eighth note = 0.5 quarter notes
    '16n': 0.25,  // sixteenth note = 0.25 quarter notes
    '32n': 0.125, // thirty-second note = 0.125 quarter notes
  }

  const quarterNoteValue = noteValues[noteLength] || 0.25
  const secondsPerQuarterNote = 60 / effectiveBPM
  const secondsPerNote = quarterNoteValue * secondsPerQuarterNote

  // Calculate total notes in full sequence
  let totalNotes = 0
  instrument.sequence.forEach(seq => {
    const part = instrument.parts[seq.part]
    if (part) {
      totalNotes += part.length * seq.repeat
    }
  })

  // For beat counting in the given time signature
  // Convert notes to beats based on the time signature's beat unit
  const noteToBeats = {
    '1n': 4 * beatUnit / 4,    // whole note
    '2n': 2 * beatUnit / 4,    // half note
    '4n': 1 * beatUnit / 4,    // quarter note
    '8n': 0.5 * beatUnit / 4,  // eighth note
    '16n': 0.25 * beatUnit / 4, // sixteenth note
    '32n': 0.125 * beatUnit / 4, // thirty-second note
  }
  
  const beatsPerNote = noteToBeats[noteLength as keyof typeof noteToBeats] || (0.25 * beatUnit / 4)
  const totalBeats = totalNotes * beatsPerNote
  const totalSeconds = totalNotes * secondsPerNote
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.round(totalSeconds % 60)

  return { minutes, seconds, totalSeconds, totalBeats, totalNotes }
}

export class WaveTune {
  private instruments: Instruments
  private bpm: number
  private name: string
  private timeSignature: [number, number]
  private sequenceState: Record<string, SequenceState> = {}
  private loops: Record<string, Tone.Loop> = {}
  private samplers: Record<string, Tone.Sampler> = {}
  private steps: Steps = {
    guitar: 0,
    bass: 0,
    drums: 0,
    hihat: 0,
  }

  public isPlaying = false
  private recorder: Tone.Recorder | null = null
  private allSequencesComplete = false
  private instrumentSequenceComplete: Record<string, boolean> = {}
  private onRecordingComplete?: (result: RecordingResult) => void

  // Guitar specific
  private guitar: Tone.Sampler | null = null
  private guitarClean: Tone.Sampler | null = null
  private guitarDistorted: Tone.Sampler | null = null
  private distortion: Tone.Distortion | null = null

  // Drum specific
  private kick: {
    triggerAttackRelease: (
      note: string,
      duration: string,
      time: number,
    ) => void
  } | null = null
  private snare: {
    triggerAttackRelease: (duration: string, time: number) => void
  } | null = null

  // Microphone
  private microphone: Tone.UserMedia | null = null
  private micGain: Tone.Gain | null = null
  private micMeter: Tone.Meter | null = null
  private micCompressor: Tone.Compressor | null = null

  constructor(input: WaveTuneInput | Instruments) {
    // Handle both old and new constructor signatures
    if ('instruments' in input && 'bpm' in input) {
      this.instruments = input.instruments
      this.bpm = input.bpm || 120
      this.timeSignature = input.timeSignature || [4, 4]
    } else {
      this.instruments = input as Instruments
      this.bpm = 120
      this.timeSignature = [4, 4]
    }

    this.name = input.name

    // Initialize sequence state for each instrument
    Object.keys(this.instruments).forEach(name => {
      const instrument = this.instruments[name as keyof Instruments]
      if (instrument?.on) {
        this.sequenceState[name] = { sequenceIndex: 0, repeatCount: 0 }
      }
    })

    // Log sequence durations
    const timeSigStr = this.timeSignature ? `${this.timeSignature[0]}/${this.timeSignature[1]}` : '4/4'
    console.log(
      `\n🎵 Song ${this.name} initialized at ${this.bpm} BPM (${timeSigStr} time):`,
    )
    Object.entries(this.instruments).forEach(([name, instrument]) => {
      if (instrument?.on && instrument.noteLength) {
        const duration = calculateSequenceDuration(
          instrument,
          instrument.noteLength,
          this.bpm,
          this.timeSignature,
        )
        console.log(
          `  ${name.charAt(0).toUpperCase() + name.slice(1)}: ${
            duration.totalNotes
          } notes (${duration.totalBeats.toFixed(1)} beats), ${duration.minutes}m ${duration.seconds}s`,
        )
      }
    })
    console.log('')
  }

  async initialize(): Promise<void> {
    // Validate that all sequence parts exist in parts object
    Object.entries(this.instruments).forEach(([instrumentName, instrument]) => {
      if (instrument?.on && instrument.sequence && instrument.parts) {
        instrument.sequence.forEach((seq, index) => {
          if (!instrument.parts![seq.part]) {
            throw new Error(
              `WaveTune "${this.name}": Sequence part "${seq.part}" at index ${index} ` +
              `for instrument "${instrumentName}" does not exist in parts. ` +
              `Available parts: ${Object.keys(instrument.parts!).join(', ')}`
            )
          }
        })
      }
    })

    // Create simple rock distortion (amp-like)
    const finalGain = new Tone.Gain(0.7).toDestination()

    const cabinet = new Tone.Filter({
      frequency: 3000,
      type: 'lowpass',
      rolloff: -12,
    }).connect(finalGain)

    this.distortion = new Tone.Distortion({
      distortion: 0.8,
      oversample: '2x' as Tone.DistortionOversample,
      wet: 0.9,
    }).connect(cabinet)

    const preClip = new Tone.Gain(2).connect(this.distortion)

    // Create instruments based on configuration
    if (this.instruments.guitar?.on) {
      this.guitarClean = new Tone.Sampler({
        urls: GUITAR_NOTES,
        volume: -5,
        attack: 0.002,
        release: 1.5,
      }).toDestination()

      this.guitarDistorted = new Tone.Sampler({
        urls: GUITAR_NOTES,
        volume: 5,
        attack: 0.01,
        release: 1.0,
      }).connect(preClip)

      this.guitar = this.guitarClean
    }

    if (this.instruments.bass?.on) {
      this.samplers.bass = new Tone.Sampler({
        urls: BASS_NOTES,
        volume: -0,
        attack: 0.002,
        release: 3.0,
      }).toDestination()
    }

    if (this.instruments.drums?.on) {
      this.samplers.drums = new Tone.Sampler({
        urls: {
          C1: '/base/drum/kick-3.wav',
          D1: '/base/drum/snap.wav',
        },
        volume: -10,
      }).toDestination()

      // Set up drum triggers
      this.kick = {
        triggerAttackRelease: (
          note: string,
          duration: string,
          time: number,
        ) => {
          if (this.samplers.drums?.loaded) {
            this.samplers.drums.triggerAttackRelease(
              'C1',
              duration,
              time,
            )
          }
        },
      }

      this.snare = {
        triggerAttackRelease: (duration: string, time: number) => {
          if (this.samplers.drums?.loaded) {
            this.samplers.drums.triggerAttackRelease(
              'D1',
              duration,
              time,
            )
          }
        },
      }
    }

    if (this.instruments.hihat?.on) {
      this.samplers.hihat = new Tone.Sampler({
        urls: {
          C4: '/base/drum/stick.wav',
          D4: '/base/drum/hat-opened.wav',
        },
        volume: -24,
      }).toDestination()
    }

    // Create recorder and connect to main output
    this.recorder = new Tone.Recorder()
    Tone.Destination.connect(this.recorder)

    // Setup microphone (but don't open it yet)
    this.microphone = new Tone.UserMedia()

    this.micCompressor = new Tone.Compressor({
      threshold: -24,
      ratio: 6,
      attack: 0.003,
      release: 0.1,
    })

    this.micGain = new Tone.Gain(5.0).connect(this.micCompressor)
    this.micCompressor.toDestination()
    this.micMeter = new Tone.Meter()

    await Tone.loaded()
  }

  private getCurrentPattern(instrumentName: string): (string | '-')[] {
    const state = this.sequenceState[instrumentName]
    const instrument =
      this.instruments[instrumentName as keyof Instruments]
    if (!state || !instrument) return []

    const currentSeq = instrument.sequence[state.sequenceIndex]
    return instrument.parts[currentSeq.part] || []
  }

  private advanceSequence(instrumentName: string): void {
    const state = this.sequenceState[instrumentName]
    const instrument =
      this.instruments[instrumentName as keyof Instruments]
    if (!state || !instrument) return

    const currentSeq = instrument.sequence[state.sequenceIndex]
    if (!currentSeq) return

    state.repeatCount++

    if (state.repeatCount >= currentSeq.repeat) {
      state.repeatCount = 0
      state.sequenceIndex =
        (state.sequenceIndex + 1) % instrument.sequence.length

      const nextSeq = instrument.sequence[state.sequenceIndex]
      console.log(`${instrumentName}: Moving to ${nextSeq.part}`)

      // Switch guitar distortion if needed
      if (
        instrumentName === 'guitar' &&
        nextSeq.distortion !== undefined
      ) {
        this.guitar = nextSeq.distortion
          ? this.guitarDistorted
          : this.guitarClean
        console.log(
          `Guitar: Switching to ${
            nextSeq.distortion ? 'distorted' : 'clean'
          }`,
        )
      }

      // Check if this instrument's sequence is complete
      if (state.sequenceIndex === 0 && !this.instrumentSequenceComplete[instrumentName]) {
        this.instrumentSequenceComplete[instrumentName] = true
        console.log(`${instrumentName} sequence complete`)
        
        // Check if all active instruments have completed their sequences
        const allComplete = Object.keys(this.instruments).every(name => {
          const instrument = this.instruments[name as keyof Instruments]
          if (!instrument?.on) return true // Skip inactive instruments
          return this.instrumentSequenceComplete[name] === true
        })
        
        if (allComplete && !this.allSequencesComplete) {
          this.allSequencesComplete = true
          console.log('All sequences complete - stopping recording and playback')
          
          // Stop recording first
          this.stopRecording().then(result => {
            if (result && this.onRecordingComplete) {
              this.onRecordingComplete(result)
            }
            // Then stop playback
            this.stop()
          })
        }
      }
    }
  }

  private createLoops(): void {
    // Guitar loop
    if (this.instruments.guitar?.on && this.guitar) {
      this.loops.guitar = new Tone.Loop(time => {
        const pattern = this.getCurrentPattern('guitar')
        const note = pattern[this.steps.guitar]

        if (note !== '-' && note) {
          // Check if it's a chord
          if (CHORD_DEFINITIONS[note]) {
            const chordNotes = CHORD_DEFINITIONS[note]
            chordNotes.forEach(chordNote => {
              this.guitar?.triggerAttackRelease(chordNote, '8n', time)
            })
          } else {
            this.guitar?.triggerAttackRelease(note, '8n', time)
          }
        }

        this.steps.guitar = (this.steps.guitar + 1) % pattern.length
        if (this.steps.guitar === 0) this.advanceSequence('guitar')
      }, this.instruments.guitar!.noteLength!)
    }

    // Bass loop
    if (this.instruments.bass?.on && this.samplers.bass) {
      this.loops.bass = new Tone.Loop(time => {
        const pattern = this.getCurrentPattern('bass')
        const note = pattern[this.steps.bass]

        if (note !== '-' && note) {
          if (CHORD_DEFINITIONS[note]) {
            const chordNotes = CHORD_DEFINITIONS[note]
            chordNotes.forEach(chordNote => {
              this.samplers.bass?.triggerAttackRelease(
                chordNote,
                '8n',
                time,
              )
            })
          } else {
            this.samplers.bass?.triggerAttackRelease(note, '8n', time)
          }
        }

        this.steps.bass = (this.steps.bass + 1) % pattern.length
        if (this.steps.bass === 0) this.advanceSequence('bass')
      }, this.instruments.bass!.noteLength!)
    }

    // Drum loop
    if (this.instruments.drums?.on && this.kick && this.snare) {
      this.loops.drums = new Tone.Loop(time => {
        const pattern = this.getCurrentPattern('drums')
        const hit = pattern[this.steps.drums]

        if (hit === 'b') {
          this.kick?.triggerAttackRelease('C1', '8n', time)
        } else if (hit === 'k') {
          this.snare?.triggerAttackRelease('8n', time)
        }

        this.steps.drums = (this.steps.drums + 1) % pattern.length
        if (this.steps.drums === 0) this.advanceSequence('drums')
      }, this.instruments.drums!.noteLength!)
    }

    // Hi-hat loop
    if (this.instruments.hihat?.on && this.samplers.hihat) {
      this.loops.hihat = new Tone.Loop(time => {
        const pattern = this.getCurrentPattern('hihat')
        const hihat = pattern[this.steps.hihat]

        if (this.samplers.hihat?.loaded) {
          if (hihat === 'c') {
            this.samplers.hihat.triggerAttackRelease('C4', '16n', time)
          } else if (hihat === 'o') {
            this.samplers.hihat.triggerAttackRelease('D4', '8n', time)
          }
        }

        this.steps.hihat = (this.steps.hihat + 1) % pattern.length
        if (this.steps.hihat === 0) this.advanceSequence('hihat')
      }, this.instruments.hihat!.noteLength!)
    }
  }

  async start(
    enableMic = false,
    onRecordingComplete?: (result: RecordingResult) => void,
  ): Promise<void> {
    this.onRecordingComplete = onRecordingComplete
    await Tone.start()

    // Reset recording state
    this.allSequencesComplete = false
    this.instrumentSequenceComplete = {}
    
    // Initialize sequence tracking for active instruments
    Object.keys(this.instruments).forEach(name => {
      const instrument = this.instruments[name as keyof Instruments]
      if (instrument?.on) {
        this.instrumentSequenceComplete[name] = false
      }
    })

    // Enable microphone if requested
    if (enableMic && this.microphone && this.micMeter && this.micGain) {
      try {
        await this.microphone.open()
        this.microphone.connect(this.micMeter)
        this.microphone.connect(this.micGain)
        console.log('Microphone enabled and connected')

        // Mic controls removed - handle in UI layer if needed

        await new Promise(resolve => setTimeout(resolve, 200))
      } catch (error) {
        console.error('Microphone access denied:', error)
        alert(
          'Could not access microphone. Recording will continue without vocals.',
        )
      }
    }

    // Start recording
    this.recorder?.start()
    console.log('Started recording with mic enabled:', enableMic)

    // Set initial guitar type based on first sequence
    if (this.instruments.guitar?.on) {
      const firstGuitarSeq = this.instruments.guitar.sequence[0]
      if (firstGuitarSeq?.distortion !== undefined) {
        this.guitar = firstGuitarSeq.distortion
          ? this.guitarDistorted
          : this.guitarClean
        console.log(
          `Guitar: Starting with ${
            firstGuitarSeq.distortion ? 'distorted' : 'clean'
          }`,
        )
      }
    }

    // Reset step counters
    Object.keys(this.steps).forEach(key => {
      this.steps[key as keyof Steps] = 0
    })

    // Create and start all loops
    this.createLoops()
    Object.values(this.loops).forEach(loop => loop.start(0))

    Tone.Transport.bpm.value = this.bpm
    Tone.Transport.start()

    this.isPlaying = true
  }

  stop(): void {
    // Stop all loops
    Object.values(this.loops).forEach(loop => loop.stop())
    Tone.Transport.stop()

    // Close microphone if it was open
    if (this.microphone?.state === 'started') {
      this.microphone.close()
      console.log('Microphone closed')
    }

    // Stop recording if it's still active
    if (
      this.recorder?.state === 'started' &&
      !this.allSequencesComplete
    ) {
      console.log('Stopping recording due to manual stop')
      this.stopRecording().then(result => {
        if (result && this.onRecordingComplete) {
          this.onRecordingComplete(result)
        }
      })
    }

    // Reset states
    Object.keys(this.sequenceState).forEach(instrument => {
      const state = this.sequenceState[instrument]
      if (state) {
        state.sequenceIndex = 0
        state.repeatCount = 0
      }
    })

    this.isPlaying = false
  }

  async stopRecording(): Promise<RecordingResult | undefined> {
    if (!this.recorder) return

    const recording = await this.recorder.stop()

    // Close microphone if it was open
    if (this.microphone?.state === 'started') {
      this.microphone.close()
      console.log('Microphone closed after recording')
    }

    // Return recording blob and URL for UI to handle
    const blob = new Blob([recording], { type: 'audio/webm' })
    const url = URL.createObjectURL(blob)
    return { blob, url }
  }
}
