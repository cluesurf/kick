
import { WaveTune } from '../../../code';

export const team0 = new WaveTune({
  name: 'team0',
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
        intro: ['b', '-', '-', '-', 'b', '-', 'k', '-', '-', '-', 'b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
        // 10 * 8
        introBreakdown: ['b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
        // 10 * 40
        breakdown: ['b', '-', '-', '-', 'b', '-', 'k', '-', '-', '-',],
        // 20 * 8
        verse: ['b', '-', '-', '-', 'b', '-', 'k', '-', '-', '-', 'b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
        // 20 * 4
        chorus: ['b', '-', '-', '-', 'b', '-', 'k', '-', '-', '-', 'b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
        // 20 * 4
        chorusOut: ['b', '-', '-', '-', 'b', '-', 'k', '-', '-', '-', 'b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
        // 10 * 8
        chorusOut2: ['b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
        // 20 * 16
        outro: ['b', '-', '-', '-', 'b', '-', 'k', '-', '-', '-', 'b', '-', '-', '-', 'b', '-', '-', '-', '-', '-',],
      },
      sequence: [
        { part: 'intro', repeat: 8 },
        { part: 'introBreakdown', repeat: 8 },
        { part: 'breakdown', repeat: 16 },
        { part: 'verse', repeat: 16 },
        { part: 'chorus', repeat: 8 },
        { part: 'verse', repeat: 16 },
        { part: 'chorus', repeat: 8 },
        { part: 'chorusOut', repeat: 4 },
        { part: 'chorusOut2', repeat: 8 },
        { part: 'outro', repeat: 16 },
        { part: 'breakdown', repeat: 24 },
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
