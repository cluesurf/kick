<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<h3 align='center'>@cluesurf/wave</h3>
<p align='center'>
  Free Basic Real Instrument Samples
</p>

<br/>
<br/>
<br/>

## Introduction

These are sound samples for guitar, bass, and drums for now, and might
include more in the future.

Here is a basic
**[sample song](https://www.youtube.com/shorts/Nr_AjqE9byQ)** made from
some of them.

It exists because it was way too hard to find free basic samples for
these to make music with things like
[Tone.js](https://github.com/tonejs/tone.js).

## Downloading

All `.wav` files are found in the
[`./base`](https://github.com/cluesurf/wave/tree/make/base) folder _(but
you can get them all by cloning the repo like this):_

```zsh
git clone git@github.com:cluesurf/wave.git
cd wave
git lfs fetch --all
```

## Sounds

Guitar and bass samples are tuned to Drop-D, and recording to the last
fret on an example instrument so you have every note, which were then
aligned so they are all plucked at the same time to make programmatic
music-making straightforward. These were made manually, recorded on real
electric instruments without effects.

Regarding file names:

- Files are named `string-<number>-<note>-as-<octave-note>.wav`.
- The `x` like `Dx2` means "sharp", since you can't have `#` in the URL
  :p.

[Rellem's stash](https://www.reddit.com/r/Drumkits/comments/n0e6e8/my_personal_stash_is_all_you_need/])
were used to bootstrap many of the basic drum/percussion sounds as well.

### Guitar Notes

| note  | file                                  |
| :---- | :------------------------------------ |
| `D2`  | `/base/guitar/string-6-D-as-D2.wav`   |
| `D#2` | `/base/guitar/string-6-Dx-as-Dx2.wav` |
| `E2`  | `/base/guitar/string-6-E-as-E2.wav`   |
| `F2`  | `/base/guitar/string-6-F-as-F2.wav`   |
| `F#2` | `/base/guitar/string-6-Fx-as-Fx2.wav` |
| `G2`  | `/base/guitar/string-6-G-as-G2.wav`   |
| `G#2` | `/base/guitar/string-6-Gx-as-Gx2.wav` |
| `A2`  | `/base/guitar/string-5-A-as-A2.wav`   |
| `A#2` | `/base/guitar/string-5-Ax-as-Ax2.wav` |
| `B2`  | `/base/guitar/string-5-B-as-B2.wav`   |
| `C3`  | `/base/guitar/string-5-C-as-C3.wav`   |
| `C#3` | `/base/guitar/string-5-Cx-as-Cx3.wav` |
| `D3`  | `/base/guitar/string-4-D-as-D3.wav`   |
| `D#3` | `/base/guitar/string-4-Dx-as-Dx3.wav` |
| `E3`  | `/base/guitar/string-4-E-as-E3.wav`   |
| `F3`  | `/base/guitar/string-4-F-as-F3.wav`   |
| `F#3` | `/base/guitar/string-4-Fx-as-Fx3.wav` |
| `A3`  | `/base/guitar/string-3-A-as-A3.wav`   |
| `A#3` | `/base/guitar/string-3-Ax-as-Ax3.wav` |
| `G3`  | `/base/guitar/string-3-G-as-G3.wav`   |
| `G#3` | `/base/guitar/string-3-Gx-as-Gx3.wav` |
| `B3`  | `/base/guitar/string-2-B-as-B3.wav`   |
| `C4`  | `/base/guitar/string-2-C-as-C4.wav`   |
| `C#4` | `/base/guitar/string-2-Cx-as-Cx4.wav` |
| `D4`  | `/base/guitar/string-2-D-as-D4.wav`   |
| `D#4` | `/base/guitar/string-2-Dx-as-Dx4.wav` |
| `E4`  | `/base/guitar/string-1-E-as-E4.wav`   |
| `F4`  | `/base/guitar/string-1-F-as-F4.wav`   |
| `F#4` | `/base/guitar/string-1-Fx-as-Fx4.wav` |
| `G4`  | `/base/guitar/string-1-G-as-G4.wav`   |
| `G#4` | `/base/guitar/string-1-Gx-as-Gx4.wav` |
| `A4`  | `/base/guitar/string-1-A-as-A4.wav`   |
| `A#4` | `/base/guitar/string-1-Ax-as-Ax4.wav` |
| `B4`  | `/base/guitar/string-1-B-as-B4.wav`   |
| `C5`  | `/base/guitar/string-1-C-as-C5.wav`   |
| `C#5` | `/base/guitar/string-1-Cx-as-Cx5.wav` |
| `D5`  | `/base/guitar/string-1-D-as-D5.wav`   |
| `D#5` | `/base/guitar/string-1-Dx-as-Dx5.wav` |
| `E5`  | `/base/guitar/string-1-E-as-E5.wav`   |
| `F5`  | `/base/guitar/string-1-F-as-F5.wav`   |
| `F#5` | `/base/guitar/string-1-Fx-as-Fx5.wav` |
| `G5`  | `/base/guitar/string-1-G-as-G5.wav`   |
| `G#5` | `/base/guitar/string-1-Gx-as-Gx5.wav` |
| `A5`  | `/base/guitar/string-1-A-as-A5.wav`   |
| `A#5` | `/base/guitar/string-1-Ax-as-Ax5.wav` |
| `B5`  | `/base/guitar/string-1-B-as-B5.wav`   |
| `C6`  | `/base/guitar/string-1-C-as-C6.wav`   |
| `C#6` | `/base/guitar/string-1-Cx-as-Cx6.wav` |

### Bass Notes

| note  | file                                |
| :---- | :---------------------------------- |
| `D1`  | `/base/bass/string-4-D-as-D1.wav`   |
| `D#1` | `/base/bass/string-4-Dx-as-Dx1.wav` |
| `E1`  | `/base/bass/string-4-E-as-E1.wav`   |
| `F1`  | `/base/bass/string-4-F-as-F1.wav`   |
| `F#1` | `/base/bass/string-4-Fx-as-Fx1.wav` |
| `G1`  | `/base/bass/string-4-G-as-G1.wav`   |
| `G#1` | `/base/bass/string-4-Gx-as-Gx1.wav` |
| `A1`  | `/base/bass/string-3-A-as-A1.wav`   |
| `A#1` | `/base/bass/string-3-Ax-as-Ax1.wav` |
| `B1`  | `/base/bass/string-3-B-as-B1.wav`   |
| `C2`  | `/base/bass/string-3-C-as-C2.wav`   |
| `C#2` | `/base/bass/string-3-Cx-as-Cx2.wav` |
| `D2`  | `/base/bass/string-2-D-as-D2.wav`   |
| `D#2` | `/base/bass/string-2-Dx-as-Dx2.wav` |
| `E2`  | `/base/bass/string-2-E-as-E2.wav`   |
| `F2`  | `/base/bass/string-2-F-as-F2.wav`   |
| `F#2` | `/base/bass/string-2-Fx-as-Fx2.wav` |
| `G2`  | `/base/bass/string-1-G-as-G2.wav`   |
| `G#2` | `/base/bass/string-1-Gx-as-Gx2.wav` |
| `A2`  | `/base/bass/string-1-A-as-A2.wav`   |
| `A#2` | `/base/bass/string-1-Ax-as-Ax2.wav` |
| `B2`  | `/base/bass/string-1-B-as-B2.wav`   |
| `C3`  | `/base/bass/string-1-C-as-C3.wav`   |
| `C#3` | `/base/bass/string-1-Cx-as-Cx3.wav` |
| `D3`  | `/base/bass/string-1-D-as-D3.wav`   |
| `D#3` | `/base/bass/string-1-Dx-as-Dx3.wav` |
| `E3`  | `/base/bass/string-1-E-as-E3.wav`   |
| `F3`  | `/base/bass/string-1-F-as-F3.wav`   |
| `F#3` | `/base/bass/string-1-Fx-as-Fx3.wav` |
| `G3`  | `/base/bass/string-1-G-as-G3.wav`   |
| `G#3` | `/base/bass/string-1-Gx-as-Gx3.wav` |
| `A3`  | `/base/bass/string-1-A-as-A3.wav`   |
| `A#3` | `/base/bass/string-1-Ax-as-Ax3.wav` |
| `B3`  | `/base/bass/string-1-B-as-B3.wav`   |
| `C4`  | `/base/bass/string-1-C-as-C4.wav`   |
| `C#4` | `/base/bass/string-1-Cx-as-Cx4.wav` |
| `D4`  | `/base/bass/string-1-D-as-D4.wav`   |
| `D#4` | `/base/bass/string-1-Dx-as-Dx4.wav` |
| `E4`  | `/base/bass/string-1-E-as-E4.wav`   |
| `F4`  | `/base/bass/string-1-F-as-F4.wav`   |
| `F#4` | `/base/bass/string-1-Fx-as-Fx4.wav` |
| `G4`  | `/base/bass/string-1-G-as-G4.wav`   |

## Other Places to Find Free Sound Samples

Most of these are terrible quality for what I'm looking for (which is
individual notes to build an instrument), and they usually require
signing up. Don't know why this is not more easily available, but here
are some free places still.

- [freesound.org](https://freesound.org)
- [r/Drumkits](https://www.reddit.com/r/Drumkits)
- [99sounds](https://99sounds.org/)
- [Splice Instrument](https://splice.com/instrument)
- [Philharmonia Orchestra](https://philharmonia.co.uk/resources/sound-samples/)

## Development

```zsh
pnpm install
```

Then to start dev server to see examples:

```zsh
pnpm work
```

Visit [`http://localhost:5173`](http://localhost:5173) in the browser to
see some sample songs, defined in the `./case/*` folder.

## License

- Code: MIT
- Files: Public Domain

## ClueSurf

Made by [ClueSurf](https://clue.surf), meditating on the universe ¤.
Follow the work on [YouTube](https://youtube.com/@cluesurf),
[X](https://x.com/cluesurf),
[Instagram](https://instagram.com/cluesurf),
[Substack](https://cluesurf.substack.com),
[Facebook](https://facebook.com/cluesurf), and
[LinkedIn](https://linkedin.com/company/cluesurf), and browse more of
our open-source work here on [GitHub](https://github.com/cluesurf).
