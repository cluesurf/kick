# DAW Architecture

## 1. DAW vs Instrument: Who Does What?

Think of a DAW as:

- a **scheduler of events** (MIDI)
- a **recorder and mixer of audio streams**
- a **host** for plugins

It does not know what a cello is. It only knows:

- "At time t, on track 5, send a Note On for pitch 62 with velocity 90"
- "At time t+0.3, send pitch bend +2500"
- "At time t+0.5, change CC11 (expression) to 80"
- "Render whatever audio comes back from that plugin on this track"

So:

- DAW = traffic controller
- Plugin (Kontakt, SWAM, etc.) = vehicle that actually moves

The "real instrument behavior" lives inside the plugin, not inside the
DAW.

## 2. What DAWs Actually Route

When that text says "DAWs route: MIDI notes / pitch bend / CC1 / CC2 /
CC11 / automation / sample triggers," it's pointing to these layers.

### 2.1 MIDI Notes

Each note event has:

- channel
- pitch (0–127; middle C often 60)
- velocity (0–127; loosely: how hard you played)
- note on / note off times

The DAW records and schedules these and forwards them to the instrument
plugin on that track.

The plugin then decides:

- which recorded sample (if any) to play
- how loud
- with what articulation
- whether to trigger a legato transition sample instead of a fresh
  attack, etc.

### 2.2 Pitch Bend

Pitch Bend is a special MIDI message:

- conceptually, a value from −1 to +1 (or −8192 to +8191)
- range (in semitones) is decided by the instrument plugin (often ±2
  semitones by default; can be ±12, ±24, etc.)

The DAW simply:

- stores the pitch bend curve
- sends changes at the correct times

The plugin interprets it, doing:

- real-time resampling of the sample
- or adjusting oscillator frequency (for synths)
- possibly morphing between samples if it is fancy

So your "cello slide" is actually:

- DAW: "send gradually changing pitch-bend data"
- Plugin: "read those values and morph the sound accordingly"

### 2.3 Continuous Controllers (CC1, CC2, CC11, etc.)

Some standard controllers:

- CC1: Mod Wheel (often mapped to vibrato depth, timbre, or intensity)
- CC2: Breath (in wind/string modeling, often bow/blow intensity)
- CC11: Expression (fine-grained volume / intensity)

The DAW:

- lets you draw or record these as automation lanes / MIDI CC data
- routes them, timestamped, to the plugin

The plugin decides what they _mean_:

- For a cello library, CC1 might be "bow pressure / dynamic layer
  crossfade"
- CC11 might be "overall loudness but preserving timbral changes"
- CC2 might be unused, or used for some special effect

Again: DAW just sends the numbers; the plugin gives them semantics.

### 2.4 Automation Curves

In modern DAWs, two things get called "automation":

1. MIDI automation

   - CC's, pitch bend, aftertouch, etc.
   - stored in the MIDI clip or in per-track MIDI lanes

2. Plugin parameter automation

   - "Change this plugin's ‘vibrato depth' knob from 0.3 to 0.7 over 2
     seconds"
   - DAW sends parameter-change events to the plugin

For realistic instruments, libraries often expose:

- "Tightness"
- "Attack"
- "Release"
- "Vibrato On/Off"
- "Legato speed"
- etc.

You draw automation in the DAW → numbers get sent → plugin interprets
them as changes in its instrument model.

### 2.5 Sample Triggers / Keyswitches

Sample-based libraries frequently use "keyswitches":

- low or high MIDI notes outside the playable range (like C0, D0)
- each keyswitch tells the plugin "switch to legato", "switch to
  tremolo", "switch to pizzicato", etc.

DAW role:

- you put those notes in the MIDI clip
- DAW sends them like any other note

Plugin role:

- intercept those special notes
- don't play a sound
- just change internal articulation state

So a realistic cello legato phrase might be:

1. Keyswitch to "legato" articulation
2. Note-on C4
3. Note-on E4 overlapping C4 (triggers legato transition sample)
4. DAW has just sent timestamps and note numbers; plugin chooses which
   transition samples to play.

## 3. Where the "Realism" Actually Happens

The paragraph lists:

- Kontakt libraries
- Spitfire
- VSL
- SWAM / Audio Modeling
- Hollywood Orchestra / LAStrings
- etc.

These are all **instrument engines / libraries**.

### 3.1 Sample-based Libraries (Kontakt, Spitfire, VSL, etc.)

They rely on big, organized sample sets:

- multiple mic positions (close, room, stereo, etc.)
- multiple dynamic layers (pp, p, mf, f, ff)
- multiple articulations (sustain, legato, staccato, spiccato, tremolo,
  etc.)
- round-robins (several different takes per note to avoid "machine gun"
  repetition)
- transition samples (recorded intervals: C → D, C → E, etc.)

Inside the plugin:

1. It listens for note events, CCs, and keyswitches.
2. It decides which sample(s) to play:

   - articulation from keyswitch
   - dynamic layer from CC1
   - legato vs fresh attack from note overlaps

3. It may crossfade between dynamic layers (e.g. crossfade between pp,
   mf, ff samples as CC1 moves).
4. For legato, it may:

   - stop the sustaining sample
   - play a special "C→E transition" sample
   - then continue with the destination note's sustain sample

This is what makes a cello line sound like an actual slide instead of
just note jumps.

The DAW's contribution: just the events.

### 3.2 Physical Modeling (SWAM / Audio Modeling, etc.)

These libraries don't play back recordings. They:

- simulate the physical behavior of strings, bow, body resonance, air,
  etc.
- treat notes and controllers as "performance gestures"

Example for a modeled cello:

- Note On at C3: "place finger at position X, start bowing the string"
- Pitch bend: "shift finger along string slightly"
- CC1/CC2: "increase/decrease bow force and speed"
- Portamento: "move finger continuously between positions → true
  continuous slide"

So:

- You draw a pitch-bend curve in the DAW.
- DAW: "here is a series of bend values over time"
- Plugin: "move the virtual finger + adjust bow to match → physically
  realistic glissando"

Again, DAW is just a sequencer and automation lane. The realism is the
math and DSP inside the instrument.

## 4. Features DAWs Offer That _Help_ But Don't Equal "Real Instruments"

The paragraph mentions:

- Time-stretch (Flex Pitch, Warp, VariAudio)
- Pitch automation
- Envelope curves
- Scripting (Logic Scripter, REAPER JSFX)

These are general audio tools, not instrument simulations.

### 4.1 Time-stretch / Pitch tools

Examples:

- Logic: Flex Time, Flex Pitch
- Ableton: Warp
- Cubase: VariAudio

They can:

- move existing notes around
- change their pitch
- glue audio together more naturally

You can, for instance:

- record a cello line with fake slides
- then manually draw pitch curves in Flex Pitch
- to force an artificial continuous slide

But this is offline editing of audio, not a live performance model.

### 4.2 Pitch Automation

You can automate:

- a track's pitch shifter plugin
- or a sampler's "transpose" parameter
- or any pitch-related plugin parameter

Again: the DAW changes parameters; plugins do shifty resampling.
Naturalness is limited compared with bespoke instrument models.

### 4.3 Envelopes / Volume curves

DAW volume automation is critical for realism:

- shaping note tails
- accenting attacks
- smoothing transitions between phrases

But envelopes alone cannot create instrument behavior (bow hair, finger
pressure, string interaction). They just make transitions feel less
mechanical.

### 4.4 Scripting

Some DAWs allow scripting:

- Logic Scripter: you can transform incoming MIDI, generate legato
  behaviors, add randomization.
- REAPER JSFX: you can build your own MIDI processing plugins.

Even then:

- these scripts manipulate the **control layer** (notes, CCs, timing)
- they do not simulate the physical acoustics themselves

They are advanced ways of telling the plugin what to do, not of _being_
the instrument.

## 5. Realistic Cello Glissando: How the Chain Actually Works

Putting it together:

1. You draw or record a cello phrase in the DAW:

   - notes
   - keyswitch for "legato"
   - CC1 for dynamics
   - CC11 for expression
   - maybe pitch bend if needed

2. DAW stores this as:

   - MIDI events with timing
   - CC lanes and automation curves

3. On playback:

   - DAW iterates over those events in time
   - For each track, DAW sends them to the instrument plugin

4. The plugin receives:

   - Note On C3 (velocity 60)
   - CC1 = 40
   - Note On E3 overlapping C3
   - CC1 ramping up to 80
   - maybe pitch bend ramping

5. Inside a sampled cello library:

   - It sees articulation state = legato.
   - It recognizes that E3 starts while C3 is still held.
   - It selects a pre-recorded "C3→E3 legato transition" sample.
   - It crossfades from C3 sustain into the transition, then into E3
     sustain.
   - It crossfades dynamic layers based on CC1.

   The result: a very smooth C→E slide that sounds like bow movement.

6. Inside a physical-model cello:

   - It interprets note events as finger positions and bow commands.
   - It drives a nonlinear physical model of string and body.
   - Pitch bend / portamento messages bend the virtual finger position
     continuously.
   - CC1/CC2 alter bow pressure, speed, contact point.

   The result: a mathematically simulated gliss that reacts to your
   curves in real time.

7. DAW receives the plugin's audio output and:

   - records it or passes it to the mixer
   - applies any insert FX (reverb, EQ, compression)
   - sends to master

At no point does the DAW itself know:

- "ah, this is a cellist sliding up a fifth using half-position
  shifting"

It just forwarded messages.

## 6. Why This Distinction Matters For You

Since you asked earlier about Tone.js and "virtual cello":

- Tone.js is like a **mini-DAW + synth/sampler framework** in JS.
- You can design:

  - the _routing layer_ (notes, envelopes, automation)
  - and the _instrument layer_ (sampler, additive, physical-ish models)
    all by hand.

If you want "real instrument behavior" in your own system:

- You have to implement what Kontakt/SWAM do:

  - design how notes, CCs, and pitch bend map to:

    - sample selection
    - interpolation between layers
    - legato transitions
    - or a physical model

- The "DAW" side (event routing) is the easy part.

- The "instrument engine" side (sample logic or physical model) is where
  all the deep realism lives.

## Implementation Details

Cool, let’s unpack that paragraph like a signal chain and walk through
what is actually happening under the hood.

I will break it into three layers:

1. What the DAW actually does
2. What the plugins actually do
3. How this produces something like “realistic cello glissando”

Then we can map each line of your quoted text to that mental model.

1. “DAWs do not do it.”

This is making a sharp distinction:

- DAW = host, transport, editor, router
- Plugin / instrument = the thing that actually knows how a cello
  behaves

A DAW like Logic, Ableton, Cubase, Reaper:

- Does not have a built-in concept of “bow”, “string crossing”,
  “breath”, or “legato”.
- It only understands generic concepts: notes, automation, audio
  streams.

Realistic behavior like “this note should connect to the next as a
glissando, with bow pressure changing over time” lives in:

- The sampler instrument (Kontakt, SINE, Halion, etc)
- Or the physical modeling synth (SWAM, Audio Modeling, etc)

The DAW just feeds those instruments data and plays back the audio they
generate.

2. “DAWs route: MIDI notes, pitch bend, CCs, automation, sample
   triggers”

Think of the DAW as a very fancy post office plus tape machine.

You write musical instructions:

- MIDI note events

  - Note on (pitch + velocity + channel)
  - Note off (release)

- Pitch bend

  - A continuous stream of values, often 14-bit (0 to 16383)
  - Represents a relative pitch change around the current note

- Continuous Controllers (CC)

  - CC1 (mod wheel)
  - CC2 (breath)
  - CC11 (expression)
  - Others: CC7 volume, CC64 sustain pedal, CC21…CC31 for custom
    mappings

- Automation curves

  - DAW-side parameter changes over time (like “turn this knob from 0 to
    1 over 2 seconds”)

- Sample triggers

  - Not usually explicit, but effectively: a MIDI event reaches a plugin
    and causes a sample or synthesis process to start

The DAW’s core jobs here:

- Store these events on tracks in a timeline
- Play them back in order and at the right time
- Route them into the right plugin instance / output bus
- Apply any generic audio processing (EQ, compression, reverb if used at
  the DAW level)

It is not responsible for “how a cello responds to CC1”. That mapping is
entirely a plugin decision.

3. “The realism happens inside plugins”

This is the heart of it.

A plugin instrument is either:

- A sample engine (Kontakt/SINE/Halion/etc)
- A physical modeling engine (SWAM, PianoTeq style)
- Or a hybrid

Inside a sample engine, a realistic string instrument (cello, violin)
typically uses:

1. Multi-sampled notes

   - Several samples per pitch
   - Several dynamic layers (pp, p, mf, f, ff)
   - Often “round robins” (different recordings for the same note to
     avoid machine-gun effect)

2. Articulations

   - Sustains, spiccato, staccato, pizzicato, tremolo, harmonics, etc
   - Each articulation is a whole set of samples
   - Controlled by:

     - Keyswitches (special low keys that change articulation)
     - MIDI CC values
     - Program changes or separate tracks

3. Transition samples

   - Specialized recordings of note-to-note transitions:

     - Legato (smooth, slurred)
     - Portamento (sliding)
     - Fingered legato, bow change, etc

   - When you play two notes in a “legato” patch, the engine:

     - Detects overlap / timing
     - Chooses the right transition sample between previous pitch and
       new pitch
     - Crossfades or layers that on top of the sustain layers

4. Performance logic The library’s script (Kontakt script, VSL engine,
   SINE script, etc.) does something like:

   - Watch MIDI notes, their timing, their velocities
   - Watch CC1, CC11, and others for dynamics and timbre
   - Decide:

     - Which sample(s) to trigger
     - How to crossfade between dynamic layers
     - Whether to play a legato transition
     - Whether to switch bow direction, strings, or articulations

   - Apply envelope shaping, filters, EQ, and time-domain tricks to make
     it feel alive

So the realism is essentially an elaborate rule system with a huge
sample set underneath.

Physical modeling plugins (like SWAM) do something else:

- No big sample pool
- They model the physics:

  - String vibration modes
  - Bow friction as a nonlinear oscillator
  - Resonance of the body
  - Interaction of bow speed, pressure, position

- MIDI data is mapped to model parameters:

  - CC1 / CC2 / CC11 controlling bow speed, pressure, vibrato rate and
    depth
  - Pitch bend controlling continuous pitch of the modeled string

- You get:

  - Seamless pitch glides between any notes
  - Response to subtle controller curves
  - No need for recorded transition samples

Again: the DAW knows nothing about bow physics. It just sends numbers.

4. “DAWs offer time-stretch, pitch automation, envelope curves,
   scripting”

These are generic audio tools, not instrument behavior engines.

- Time stretch (Flex, Warp, VariAudio)

  - Operates on audio clips
  - Changes playback speed / pitch, often with independent control
  - Uses algorithms like granular, phase vocoder, spectral resynthesis
  - Has no inherent concept of “cello string” or “bow”, only “audio”

- Pitch automation

  - You draw a curve that modulates a pitch parameter of a plugin or
    audio process
  - The plugin or pitch shifter modifies frequency accordingly
  - Again, no bow model. The plugin decides what pitch change means.

- Envelope curves

  - DAW envelopes modulate amplitude, filters, send levels, etc.
  - They shape loudness and tone, but they do not know when to switch to
    a legato transition or when to emulate a string crossing.

- Scripting (Logic Scripter, Reaper JSFX)

  - Lets you transform MIDI or audio in flexible ways (e.g.
    humanization, auto-keyswitching)
  - You can script “if two notes are within 80 ms, send keyswitch L to
    request legato”
  - But the actual sound of legato still depends on the instrument
    plugin.

So the DAW offers tools that can help, and meta-logic to steer the
plugin, but it is still agnostic about the actual physics of the
instrument.

5. “Realistic cello glissando in a DAW comes from: sampled-transition
   engine or physical modeling engine, not the DAW itself”

Let’s use your cello glissando as a concrete example.

Case A: Sample library (Kontakt, SINE, Halion)

1. You pick a “legato” or “portamento” cello patch.
2. That patch has:

   - Sustains at many dynamics
   - Recorded slides between intervals (minor 2nd, major 2nd, 3rd, etc.)

3. You play MIDI:

   - Note on C4, then D4 while C4 is still held

4. The DAW:

   - Stores and replays “note C4 at t0, note D4 at t0 + 150 ms”
   - Sends those raw MIDI events to the plugin instance

5. The plugin:

   - Sees that you are in legato patch mode
   - Sees that a new note D4 arrived while C4 is held and close in time
   - Decides:

     - “Trigger a C4 sustain if it is not yet playing”
     - “Play the appropriate legato transition sample from C4 to D4”

   - Crossfades the transition into the sustain sample for D4
   - Applies dynamic crossfade based on CC1 / CC11, plus vibrato and
     other details

To your ear: it sounds like the cello slides naturally from C4 to D4. To
the DAW: it was just two notes and some CC.

Case B: Physical modeling (SWAM Cello)

1. You load SWAM Cello, which has a model of strings, bow, resonances.
2. You send:

   - Note events to indicate target pitch
   - CC1 / CC11 for expressive pressure
   - Pitch bend for subtle or large slides

3. The DAW:

   - Just routes those MIDI events

4. The modeled engine:

   - Treats the note as the nominal pitch
   - Treats pitch bend as continuous adjustment of string frequency
   - Treats CCs as bow force / speed / position
   - Solves the internal equations that model the string and body
     vibration frame by frame

The continuous glissando emerges from the evolving state of the physical
model, not from any DAW logic.

6. Why the separation exists at all

This separation is intentional and important:

- DAW stays generic:

  - It does not embed assumptions about specific instruments.
  - It can handle pianos, drums, violins, modular synths, granular
    weirdness, all with the same internal structures.

- Plugins specialize:

  - They can be extremely opinionated about how a cello behaves.
  - Different libraries can compete by modeling different details: bow
    noise, rosin, player style, room response, etc.

That division of labor is basically:

- Host: timeline + routing + automation + editing
- Instrument: what sound is produced and how it reacts to musical
  control

If you were implementing this from scratch for your own “virtual cello”:

- Your “DAW” layer would only need to:

  - Schedule note events and controller changes on a timeline
  - Provide UI for drawing control curves
  - Call “render audio” on your instrument engine

- Your “instrument engine” would:

  - Interpret those events according to an internal model of how a cello
    behaves
  - Decide which samples or modeled states to use at each moment
  - Output the resulting audio buffers

That is exactly what is happening in the commercial world, just wrapped
in the VST/AU/AAX plugin API.

## Implementation Details 2

Nice, this is a fun one.

I’ll do two things:

1. First, unpack that paragraph in fine-grained detail: what DAWs
   actually do vs what “realism engines” (Kontakt, SWAM, etc.) do.
2. Then sketch a TypeScript architecture for your own “Kontakt-style”
   virtual cello sampler.

You can treat it as a blueprint for a browser/Web Audio or Node audio
engine.

1. What “real DAWs” actually do for realism (in detail)

That text said:

> DAWs do not do it. DAWs route:
>
> - MIDI notes
> - pitch bend
> - CC1, CC2, CC11 (expression controllers)
> - automation curves
> - sample triggers
>
> The realism happens inside plugins.

Let’s make that precise.

a) Signal flow: controller → DAW → plugin

Physical controller (MIDI keyboard, wind controller, MPE device)
generates:

- NoteOn / NoteOff events
- Pitch Bend messages
- Control Change (CC) messages like:

  - CC1: Mod wheel (often mapped to dynamics in orchestral libs)
  - CC2: Breath (often mapped to expression in wind/brass/strings libs)
  - CC11: Expression (fine control of volume/dynamics)
  - Other CCs for vibrato, bow noise, legato, etc.

- Aftertouch / poly aftertouch
- Program change, sometimes keyswitches, etc.

The DAW does not interpret these semantically. It just:

- Timestamps them
- Records them on a MIDI track
- Routes them to the target plugin instance
- Plays them back at the correct time

The plugin (Kontakt, SWAM, etc.) decides what to do with “NoteOn C3,
velocity 78, CC1=92, CC11=64” in terms of actual sound.

b) What the DAW offers “natively”

On top of raw MIDI pass-through, DAWs give you several generic tools:

- Automation lanes:

  - You can draw curves for CC1, CC11, pitch bend, plugin parameters,
    etc.
  - DAW interpolates: at each buffer, it evaluates current automation
    values and sends them to the plugin (as parameter changes or CC
    events).

- Time-stretch / pitch-edit on audio clips:

  - Flex Pitch / Flex Time (Logic)
  - Warp (Ableton)
  - VariAudio (Cubase)
  - These process raw audio clips, not live instrument models.
  - Good for editing recorded cello phrases, not for “real-time virtual
    cello playing” from scratch.

- Simple MIDI transforms:

  - Humanize timing/velocity
  - Scale, transpose
  - Arpeggiators
  - MIDI plugins (e.g. Logic Scripter, REAPER JSFX) that can
    algorithmically generate/modify MIDI

All of this is still “symbolic plumbing”. The DAW is not thinking: “Ah,
this is a cello. Bow must accelerate here, we must cross from D string
to A string and change bow direction.”

It just sees numbers.

c) Where realism actually happens: inside instruments

This is the critical line:

> Realistic cello glissando in a DAW comes from:
>
> - a sampled-transition engine (Kontakt/Sine/Halion)
> - or a physically modeled engine (SWAM) Not from the DAW itself.

Two big families:

1. Sample-based engines (Kontakt, SINE, HALion, etc.)

They load:

- Many gigabytes of samples:

  - Sustains at multiple dynamics
  - Staccato, spiccato, pizzicato, tremolo, sul pont, sul tasto, etc.
  - Legato / portamento transitions between pairs of notes (C4→D4,
    D4→E4, etc.)
  - Release samples, bow-change samples, string-crossing samples

They include logic like:

- Articulation selection:

  - via keyswitch (low keys trigger articulation changes)
  - via CC (e.g. CC32 chooses articulation)
  - via velocity or playing style (short note → staccato, etc.)

- Dynamic selection:

  - multiple dynamic layers (pp, p, mf, f, ff)
  - crossfading between layers based on CC1/CC11

- Round-robin:

  - multiple slightly different recordings for the same note and
    articulation
  - chosen in rotation/randomly to avoid “machine gun” repeats

- Legato engine:

  - if notes overlap, interpret as legato
  - check interval and speed
  - play a special transition sample (e.g. C4 sustain → C4→E4 legato
    transition → E4 sustain)

- String/fingering logic:

  - decide which “string” a note would be on
  - choose the correct sample set (G-string vs D-string vs A-string vs
    C-string) for timbral differences

From the outside, the DAW just sends “NoteOn D4, CC1=80, CC11=60,
previous note C4 still held.” The instrument says “Okay, that is likely
a legato transition from C4 to D4 at a certain speed and dynamic; I’ll
choose legato transition sample X, then sustain sample Y, crossfaded
according to CC1/CC11, with G-string timbre.”

2. Physical modeling engines (SWAM, Audio Modeling, etc.)

Instead of playing back recordings of real notes, they implement a
physics-inspired model:

- Internal state: bow pressure, bow speed, bow position, string tension,
  damping, body resonance, etc.
- Inputs:

  - Note events define string and stopped pitch
  - CC1/CC2/CC11 define bow pressure/dynamics
  - Pitch bend can modulate micro-pitch or slides
  - Additional CCs can control vibrato depth/rate, position, etc.

- The model generates sound:

  - The engine integrates differential equations / waveguides / digital
    filters to simulate string vibration and body response.
  - It can smoothly glide between pitches and timbres because it isn’t
    limited to discrete samples.

The DAW still just sends MIDI + parameter automation. All instrument
intelligence (physics, bowing, string crossing) lives inside the plugin.

2. Sketching a “Kontakt-style” virtual cello sampler in TypeScript

Now, suppose you want to architect your own sampler in TS, aiming for:

- Multi-sample, multi-articulation cello
- Legato transitions
- Dynamics driven by CCs
- Possibly Web Audio backend

Not production-ready, but structurally sound.

I’ll sketch the main layers.

a) Core data structures

You need a way to describe:

- Which WAV belongs to which note, dynamic, articulation, and string.
- How they should be triggered.

Something like:

```ts
type MidiNote = number // 0–127
type Velocity = number // 0–127
type CcValue = number // 0–127

type ArticulationId =
  | 'sustain'
  | 'staccato'
  | 'spiccato'
  | 'pizzicato'
  | 'tremolo'
  | 'legato-transition'
  | 'bow-change'
  | 'release'

type CelloStringId = 'C' | 'G' | 'D' | 'A'

interface SampleMeta {
  url: string
  rootNote: MidiNote
  minNote: MidiNote
  maxNote: MidiNote
  minVelocity: Velocity
  maxVelocity: Velocity
  articulation: ArticulationId
  dynamicLayer: number // e.g. 0=pp,1=p,2=mf,3=f,4=ff
  stringId?: CelloStringId
  roundRobinIndex?: number
  loopStart?: number
  loopEnd?: number
}

interface SampleMap {
  samples: SampleMeta[]
}
```

This is your “Kontakt .nki-like mapping” in JSON.

b) Playback primitives

You need primitives to actually make sound:

- AudioBuffer loading/cache
- Voice: one instance of a sample being played
- Envelope generator for amplitude
- Pitch + filter modulation

In TS with Web Audio:

```ts
interface Voice {
  id: string
  note: MidiNote
  velocity: Velocity
  articulation: ArticulationId
  stringId?: CelloStringId

  // Web Audio nodes
  source: AudioBufferSourceNode
  gainNode: GainNode
  filterNode?: BiquadFilterNode

  startTime: number
  releaseScheduled: boolean

  stop(releaseTime: number): void
}
```

Voice manager:

```ts
interface VoiceManager {
  activeVoices: Map<string, Voice>

  noteOn(note: MidiNote, velocity: Velocity, ctx: PlaybackContext): void
  noteOff(note: MidiNote, ctx: PlaybackContext): void
  allNotesOff(ctx: PlaybackContext): void
}
```

Where `PlaybackContext` includes `AudioContext`, sample cache, and
global settings.

c) Articulation and mapping logic

You need a “brain” that decides:

- Which articulation to use
- Which sample region to select
- Which dynamic layer(s) to crossfade
- Which round-robin index

```ts
interface PerformanceState {
  lastNoteOn?: {
    note: MidiNote
    time: number
  }
  sustainPedal: boolean
  cc: Record<number, CcValue> // CC number → value
  currentArticulation: ArticulationId
  roundRobinCounters: Record<string, number> // per articulation/string
}

interface SampleSelector {
  selectSample(
    note: MidiNote,
    velocity: Velocity,
    perf: PerformanceState,
    map: SampleMap,
  ): SampleMeta[]
}
```

Design approach:

1. Determine articulation:

- If explicit keyswitch/CC chooses pizzicato, staccato, etc., use that.
- Else infer by note length or velocity.

2. Determine string:

- Use a heuristic: for a given note, choose string that matches a given
  fingering position (e.g. prefer D string for certain ranges unless
  user overrides).
- Or allow user to lock a string via keyswitch.

3. Determine dynamic layers:

- Map CC1/CC11 into a [0..1] “dynamic continuum”.
- Blend between nearest dynamic layers (e.g. between mf and f).

4. Determine round robin:

- Maintain a per-(articulation,string,note-range) counter.
- Increment each time, wrap around number of layers.

Return 1–2 selected `SampleMeta` entries:

- For simple use: just one sample.
- For crossfade: two samples with weights derived from dynamic position.

d) Legato / glissando engine

This is where cello behavior gets interesting.

You want:

- If a new note arrives while old note is held → treat as legato.
- Decide whether to:

  - Play legato transition sample (if available).
  - Or simply overlap 2 sustains with envelope shaping.

Simplified interface:

```ts
interface LegatoEngine {
  onNoteOn(
    note: MidiNote,
    velocity: Velocity,
    time: number,
    state: PerformanceState,
  ): 'normal' | 'legato-transition'

  getTransitionSample(
    fromNote: MidiNote,
    toNote: MidiNote,
    map: SampleMap,
  ): SampleMeta | null
}
```

Example logic:

- If previous note exists and:

  - Time since last note < legatoThresholdMs
  - Notes overlap (previous note not yet released)
  - Interval within some max (e.g. <= perfect 5th)

- Then:

  - classify as legato
  - try to find a `legato-transition` sample in `SampleMap` for that
    interval and string.
  - If found:

    - play transition sample
    - fade out old note
    - then begin new sustain sample

  - Else:

    - alternative: crossfade between two sustain samples with a very
      fast attack on the new note.

e) Dynamics / expression engine

You want smooth continuous control like SWAM/Kontakt using CC1/CC11:

```ts
interface DynamicsEngine {
  getTargetGain(perf: PerformanceState): number // 0..1
  getDynamicLayerBlend(perf: PerformanceState): {
    lowerLayerIndex: number
    upperLayerIndex: number
    t: number // blend
  }
}
```

Implementation:

- Map CC1 to coarse dynamic level (p..ff).
- Map CC11 to overall volume scaling within that level.
- Smooth values over time to avoid zipper noise (simple 1-pole filter).

At runtime:

- Update `GainNode.gain` inside each Voice based on aggregated dynamic
  gain.
- Optionally crossfade between two adjacent dynamic layers by fading
  their voices.

f) The main engine class

Something like:

```ts
class CelloSamplerEngine {
  private ctx: AudioContext
  private sampleMap: SampleMap
  private sampleCache: Map<string, AudioBuffer> = new Map()
  private voiceManager: VoiceManager
  private legatoEngine: LegatoEngine
  private dynamicsEngine: DynamicsEngine
  private sampleSelector: SampleSelector
  private performanceState: PerformanceState

  constructor(ctx: AudioContext, map: SampleMap, deps: { ... }) {
    this.ctx = ctx
    this.sampleMap = map
    this.voiceManager = deps.voiceManager
    this.legatoEngine = deps.legatoEngine
    this.dynamicsEngine = deps.dynamicsEngine
    this.sampleSelector = deps.sampleSelector
    this.performanceState = {
      cc: {},
      currentArticulation: "sustain",
      roundRobinCounters: {},
    }
  }

  async loadAllSamples() {
    for (const meta of this.sampleMap.samples) {
      if (!this.sampleCache.has(meta.url)) {
        const buffer = await this.loadBuffer(meta.url)
        this.sampleCache.set(meta.url, buffer)
      }
    }
  }

  onMidiNoteOn(note: MidiNote, velocity: Velocity) {
    const now = this.ctx.currentTime
    const legatoMode =
      this.legatoEngine.onNoteOn(note, velocity, now, this.performanceState)

    const selected = this.sampleSelector.selectSample(
      note,
      velocity,
      this.performanceState,
      this.sampleMap
    )

    // create voices from selected samples,
    // plus any legato transition if applicable
    // then hand them to VoiceManager to schedule
  }

  onMidiNoteOff(note: MidiNote) {
    this.voiceManager.noteOff(note, { ctx: this.ctx })
  }

  onMidiCc(ccNumber: number, value: CcValue) {
    this.performanceState.cc[ccNumber] = value
    // update dynamics, articulation, vibrato, etc.
  }

  onPitchBend(value: number) {
    // propagate to active voices as pitch ratio
  }

  private async loadBuffer(url: string): Promise<AudioBuffer> {
    const res = await fetch(url)
    const arr = await res.arrayBuffer()
    return await this.ctx.decodeAudioData(arr)
  }
}
```

This isn’t complete, but structurally it is similar to what a small
“Kontakt-style” sampler does.

g) Extending toward “real cello feel”

You can push realism by adding:

- String selection logic:

  - Give the engine a concept of positions and string to favor.

- Bowing model on top of samples:

  - Use noise layers for bow scratch.
  - Modulate noise with CC or envelope.

- Release behavior:

  - When NoteOff arrives, trigger dedicated release samples depending on
    dynamics and length.

- Performance scripting:

  - Write rule tables:

    - if velocity < 40 and duration < 120 ms → use “spiccato”
    - if velocity > 80 and overlap > 50 ms → force legato
    - if 3+ fast repeated notes → alternate round-robin sets that
      emphasize bow changes.

All of this lives in your engine. The DAW’s role is just:

- Provide a MIDI track
- Host a plugin (or a bridge to your TS/Web Audio engine)
- Route notes / CCs / automation into it

Which is exactly what the original text was pointing at: “DAWs do not
simulate real instruments; they just deliver control streams. The
realism engines live inside the instruments.”
