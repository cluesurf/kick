
import { WaveTune } from '../../../code';

export const talkBreath = new WaveTune({
  name: 'talkBreath',
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
        intro:                    ['b', '-', '-', '-', '-', '-', '-'],
        intro_verse:              ['b', '-', '-', '-', '-', '-', '-'],
        intro_distortion:         ['b', '-', '-', '-', '-', '-', '-'],
        verse:                    ['b', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-'],
        verse_outro:              ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', 'b', '-', '-', '-'],
        transition:               ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-'],
        chorus:                   ['b', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'b', '-', '-', '-'],
        transition_2_bass:        ['b', '-', '-', '-', '-', '-', '-'],
        transition_2_distortion:  ['b', '-', '-', '-', '-', '-', '-'],
        bridge_intro:             ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', '-', '-'],
        bridge_guitar:            ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', '-', '-'],
        bridge_distortion:        ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', '-', '-'],
        bridge_distortion_voice:  ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', '-', '-'],
        bridge_outro:             ['b', '-', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-', '-', '-'],
        outro_main:               ['b', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'b', '-', '-', '-'],
        outro_7:                  ['b', '-', '-', '-', '-', '-', '-'],
        outro_11:                 ['b', '-', '-', '-', '-', 'b', '-', '-', '-', '-', '-'],
        final_bass:               ['b', '-', '-', '-', '-', '-', '-'],
        final_distortion:         ['b', '-', '-', '-', '-', '-', '-'],
        final_distortion_voice:   ['b', '-', '-', '-', '-', '-', '-'],
        last:                     ['b', '-', '-', '-', '-', '-', '-'],
        last_last:                ['b', '-', '-', '-', '-', '-', '-'],
      },
      sequence: [
        { part: 'intro', repeat: 8 },
        { part: 'intro_verse', repeat: 8 },
        { part: 'intro_distortion', repeat: 8 },

        { part: 'verse', repeat: 8 },
        { part: 'verse_outro', repeat: 2 },
        { part: 'transition', repeat: 4 },
        { part: 'chorus', repeat: 4 },

        { part: 'verse', repeat: 8 },
        { part: 'verse_outro', repeat: 2 },
        { part: 'transition', repeat: 4 },
        { part: 'chorus', repeat: 4 },

        { part: 'transition_2_bass', repeat: 8 },
        { part: 'transition_2_distortion', repeat: 8 },
        { part: 'bridge_intro', repeat: 4 },
        { part: 'bridge_guitar', repeat: 8 },
        { part: 'bridge_distortion', repeat: 4 },
        { part: 'bridge_distortion_voice', repeat: 4 },
        { part: 'bridge_outro', repeat: 4 },
        { part: 'outro_main', repeat: 4 },
        { part: 'outro_7', repeat: 8 },
        { part: 'outro_11', repeat: 4 },
        { part: 'outro_main', repeat: 4 },
        { part: 'final_bass', repeat: 8 },
        { part: 'final_distortion', repeat: 8 },
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
