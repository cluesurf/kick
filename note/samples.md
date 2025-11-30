# Samples

## Strings

- **note** (all notes + harmonics)
- **string** (all strings)
- **fret**
- **release**: sustained
  - sustained: Ring until it naturally silences
- **hit**: soft, medium, hard
  - soft: just enough to hear
  - medium: "normal" playing
  - hard: bright, lots of attack
- **take** (8 takes per combination)
- **pluck**: pick, finger, muted

Folder structure:

```
<instrument>/
  <pluck>/
    string-<string>-fret-<fret>-<note>-<hit>-<take>.wav
```

## Guitar

In each folder like this:

```
guitar/electric/fender123/pick/normal
guitar/electric/fender123/pick/muted
guitar/electric/fender123/finger
```

They each have folders like this:

```
/soft
/medium
/hard
```

And within each of those, you have 8 versions per fret:

```
string-6-fret-0-<version>.wav
string-6-fret-1-<version>.wav
string-6-fret-2-<version>.wav
```

On a guitar with **20** frets, that is **20x6 = 120 frets**.

Oh plus the **harmonics** (4 per string, so add 24 extra notes). **144
notes**.

Times 8 recordings per fret/harmonic, which is **1152 samples per
folder**!

With these folders basically:

```
guitar/electric/fender123/pick/normal/soft
guitar/electric/fender123/pick/normal/medium
guitar/electric/fender123/pick/normal/hard
guitar/electric/fender123/pick/muted/soft
guitar/electric/fender123/pick/muted/medium
guitar/electric/fender123/pick/muted/hard
guitar/electric/fender123/finger/soft
guitar/electric/fender123/finger/medium
guitar/electric/fender123/finger/hard
```

So that is 1152 samples times 9 folders, or **10368 samples per
instrument**.

Instruments would be:

- steel string acoustic guitar
- nylon string acoustic guitar
- electric guitar (are there multiple types?)

Perhaps we just do `medium` strikes (not hard or soft for now):

```
guitar/electric/fender123/pick/normal/medium
guitar/electric/fender123/pick/muted/medium
guitar/electric/fender123/finger/medium
```

That is **3456 samples**.

## Bass

## Harp

## Cello

## Violin
