
import { WaveTune } from '../../../code';

export const talkPulse = new WaveTune({
  name: 'talkPulse',
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
        intro:                    ['k', '-', '-', '-', '-', '-', '-'],
        intro_verse:              ['-', '-', '-', '-', '-', '-', '-'],
        intro_distortion:         ['k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        verse:                    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        verse_outro:              ['k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        transition:               ['-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-'],
        chorus:                   ['-', '-', '-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-'],
        transition_2_bass:        ['-', '-', '-', '-', '-', '-', '-'],
        transition_2_distortion:  ['-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_intro:             ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_guitar:            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_distortion:        ['k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_distortion_voice:  ['k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_outro:             ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        bridge_outro_voice:       ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'k', '-'],
        outro_main:               ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        outro_7:                  ['k', '-', '-', '-', '-', '-', '-'],
        outro_7_empty:            ['-', '-', '-', '-', '-', '-', '-'],
        outro_11:                 ['k', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
        final_bass:               ['-', '-', '-', '-', '-', '-', '-'],
        final_distortion:         ['k', '-', '-', '-', '-', '-', '-'],
        final_distortion_empty:   ['-', '-', '-', '-', '-', '-', '-'],
        final_distortion_voice:   ['k', '-', '-', '-', '-', '-', '-'],
        last:                     ['-', '-', '-', '-', '-', '-', '-'],
        last_last:                ['k', '-', '-', '-', '-', '-', '-'],
      },
      sequence: [
        { part: 'intro', repeat: 8 },
        { part: 'intro_verse', repeat: 8 },
        { part: 'intro_distortion', repeat: 4 },

        { part: 'verse', repeat: 8 },
        { part: 'verse_outro', repeat: 2 },
        { part: 'transition', repeat: 4 },
        { part: 'chorus', repeat: 4 },

        { part: 'verse', repeat: 8 },
        { part: 'verse_outro', repeat: 2 },
        { part: 'transition', repeat: 4 },
        { part: 'chorus', repeat: 4 },

        { part: 'transition_2_bass', repeat: 8 },
        { part: 'transition_2_distortion', repeat: 4 },
        { part: 'bridge_intro', repeat: 4 },
        { part: 'bridge_guitar', repeat: 8 },
        { part: 'bridge_distortion', repeat: 2 },
        { part: 'bridge_distortion_voice', repeat: 4 },
        { part: 'bridge_outro', repeat: 1 },
        { part: 'bridge_outro_voice', repeat: 3 },
        { part: 'outro_main', repeat: 2 },
        { part: 'outro_7', repeat: 1 },
        { part: 'outro_7_empty', repeat: 3 },
        { part: 'outro_7', repeat: 1 },
        { part: 'outro_7_empty', repeat: 3 },
        { part: 'outro_11', repeat: 4 },
        { part: 'outro_main', repeat: 2 },
        { part: 'final_bass', repeat: 8 },
        { part: 'final_distortion', repeat: 1 },
        { part: 'final_distortion_empty', repeat: 3 },
        { part: 'final_distortion', repeat: 1 },
        { part: 'final_distortion_empty', repeat: 3 },
        { part: 'final_distortion_voice', repeat: 8 },
        { part: 'last', repeat: 4 },
        { part: 'last_last', repeat: 4 },
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
