
import { WaveTune } from '../../../code';

export const teamPulse3 = new WaveTune({
  name: 'teamPulse3',
  timeSignature: [5, 8],
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
        // 20 * 4
        intro: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        intro2: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 10 * 8
        introBreakdown: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 10 * 40
        breakdown: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        breakdown2: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        breakdown3: ['k', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 20 * 8
        verse: ['-', '-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        verse2: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 20 * 4
        chorus: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        chorus2: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 20 * 4
        chorusOut: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 10 * 8
        chorusOut2: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        // 20 * 16
        outro: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
        outro2: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
      },
      sequence: [
        { part: 'intro', repeat: 1 },
        { part: 'intro2', repeat: 7 },

        { part: 'introBreakdown', repeat: 8 },

        { part: 'breakdown', repeat: 1 },
        { part: 'breakdown3', repeat: 1 },
        { part: 'breakdown2', repeat: 6 },
        { part: 'breakdown', repeat: 1 },
        { part: 'breakdown3', repeat: 1 },
        { part: 'breakdown2', repeat: 6 },

        { part: 'verse', repeat: 1 },
        { part: 'verse2', repeat: 7 },
        { part: 'verse', repeat: 1 },
        { part: 'verse2', repeat: 7 },

        { part: 'chorus', repeat: 1 },
        { part: 'chorus2', repeat: 3 },
        { part: 'chorus', repeat: 1 },
        { part: 'chorus2', repeat: 3 },

        { part: 'verse', repeat: 1 },
        { part: 'verse2', repeat: 7 },
        { part: 'verse', repeat: 1 },
        { part: 'verse2', repeat: 7 },

        { part: 'chorus', repeat: 1 },
        { part: 'chorus2', repeat: 3 },
        { part: 'chorus', repeat: 1 },
        { part: 'chorus2', repeat: 3 },

        { part: 'chorusOut', repeat: 4 },
        { part: 'chorusOut2', repeat: 8 },

        { part: 'outro', repeat: 2 },
        { part: 'outro2', repeat: 2 },
        { part: 'outro', repeat: 2 },
        { part: 'outro2', repeat: 2 },
        { part: 'outro', repeat: 2 },
        { part: 'outro2', repeat: 2 },
        { part: 'outro', repeat: 2 },
        { part: 'outro2', repeat: 2 },

        { part: 'breakdown2', repeat: 24 },
      ],
      noteLength: '16n'
    },

    hihat: {
      on: false,
      parts: {},
      sequence: []
    }
  },
  bpm: 104
})
