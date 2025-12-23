
import { WaveTune } from '../../../code';

export const teamBreath = new WaveTune({
  name: 'teamBreath',
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
        breath: ['b', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',],
      },
      sequence: [
        { part: 'breath', repeat: 104 },
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
