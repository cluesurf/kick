
import { WaveTune } from '../../../code';

export const teamBeat = new WaveTune({
  name: 'teamBeat',
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
      on: false,
      parts: {
        // 20 * 4
      },
      sequence: [
        { part: 'breath', repeat: 104 },
      ],
      noteLength: '16n'
    },

    hihat: {
      on: true,
      parts: {
        breath: ['c', '-', 'c', '-', 'c', '-', 'c', '-', 'c', '-', 'c', '-', 'c', '-', 'c', '-', 'c', '-', 'c', '-', ],
      },
      sequence: [
        { part: 'breath', repeat: 104 },
      ],
      noteLength: '16n'
    }
  },
  bpm: 104
})
