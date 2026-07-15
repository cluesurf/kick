
import { WaveTune } from '../../../code';

export const tuneBreath = new WaveTune({
  name: 'tuneBreath',
  timeSignature: [8, 8],
  instruments: {
    guitar: {
      on: false,
      parts: {},
      sequence: []
    },

    bass: {
      on: false,
      parts: {},
      sequence: []
    },

    drums: {
      on: true,
      parts: {
        intro:                    ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        transition:               ['b', '-', '-', '-', '-', '-'],
        chorus_intro:             ['b', '-', '-', '-', '-', '-'],
        chorus:                   ['b', '-', '-', '-', '-', '-'],
        verse:                    ['b', '-', '-', '-', '-', '-'],
        verse2:                   ['b', '-', '-', '-', '-', '-'],
        bridge_intro:             ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_intro2:            ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_riff1:             ['b', '-', '-', '-', '-', '-'],
        bridge_riff2:             ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        verse_distortion:         ['b', '-', '-', '-', '-', '-'],
        verse2_distortion:        ['b', '-', '-', '-', '-', '-'],
        bridge_riff3:             ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_riff4:             ['b', '-', '-', '-', '-', '-'],
        outro_distortion:         ['b', '-', '-', '-', '-', '-'],
        outro_distortion2:        ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        outro:                    ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        outro_end:                ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
        outro_end2:               ['b', '-', '-', '-', '-', '-', '-', '-', '-'],
      },
      sequence: [
        { part: 'intro', repeat: 8 },
        { part: 'transition', repeat: 16 },
        { part: 'chorus_intro', repeat: 8 },
        { part: 'chorus', repeat: 16 },

        { part: 'verse', repeat: 8 },
        { part: 'verse2', repeat: 8 },
        { part: 'verse', repeat: 8 },
        { part: 'verse2', repeat: 8 },
        { part: 'chorus_intro', repeat: 8 },
        { part: 'chorus', repeat: 8 },

        { part: 'verse', repeat: 8 },
        { part: 'verse2', repeat: 8 },

        { part: 'chorus_intro', repeat: 8 },
        { part: 'chorus', repeat: 16 },

        { part: 'bridge_intro', repeat: 8 },
        { part: 'bridge_intro2', repeat: 8 },

        { part: 'bridge_riff1', repeat: 16 },
        { part: 'bridge_riff2', repeat: 8 },

        { part: 'verse_distortion', repeat: 8 },
        { part: 'bridge_riff2', repeat: 8 },
        { part: 'verse2_distortion', repeat: 8 },

        { part: 'bridge_riff3', repeat: 8 },
        { part: 'bridge_riff4', repeat: 16 },

        { part: 'outro_distortion', repeat: 32 },
        { part: 'outro_distortion2', repeat: 8 },
        { part: 'outro', repeat: 16 },
        { part: 'outro_end', repeat: 4 },
        { part: 'outro_end2', repeat: 4 },
      ],
      noteLength: '8n'
    },

    hihat: {
      on: false,
      parts: {},
      sequence: []
    }
  },
  bpm: 104
})
