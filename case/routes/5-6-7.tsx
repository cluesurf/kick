import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: '5-6-7 Curvature' }]
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

function interiorAngle(n: number): number {
  return ((n - 2) * 180) / n
}

function angularDeficit(n: number, k: number): number {
  return 360 - k * interiorAngle(n)
}

// ============================================================
// Tile type used by all three tilings
// ============================================================

interface Tile {
  // Vertices in normalized coordinates:
  // For dodec: perspective-projected from 3D sphere
  // For hex: flat 2D positions (unit = tile size)
  // For hyper: Poincaré disk coordinates (unit disk)
  vertices: [number, number][]
  center: [number, number]
  depth: number // 0 = center, higher = further
}

// ============================================================
// 1. DODECAHEDRON — {5,3} spherical tiling
//    20 vertices on unit sphere, 12 pentagonal faces
//    Rendered with perspective projection (soccer ball look)
// ============================================================

function generateDodecahedron(): Tile[] {
  const phi = (1 + Math.sqrt(5)) / 2
  const iphi = 1 / phi

  // 20 vertices (unnormalized)
  const raw: [number, number, number][] = []
  for (const x of [-1, 1])
    for (const y of [-1, 1])
      for (const z of [-1, 1]) raw.push([x, y, z])
  for (const s1 of [-1, 1])
    for (const s2 of [-1, 1]) raw.push([0, s1 * phi, s2 * iphi])
  for (const s1 of [-1, 1])
    for (const s2 of [-1, 1]) raw.push([s1 * iphi, 0, s2 * phi])
  for (const s1 of [-1, 1])
    for (const s2 of [-1, 1]) raw.push([s1 * phi, s2 * iphi, 0])

  // Normalize to unit sphere
  const verts = raw.map(v => {
    const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
    return [v[0] / len, v[1] / len, v[2] / len] as [number, number, number]
  })

  // Find edges (adjacent vertices have minimum distance)
  const pairDists: number[] = []
  for (let i = 0; i < 20; i++)
    for (let j = i + 1; j < 20; j++) {
      const d = Math.sqrt(
        (verts[i][0] - verts[j][0]) ** 2 +
        (verts[i][1] - verts[j][1]) ** 2 +
        (verts[i][2] - verts[j][2]) ** 2,
      )
      pairDists.push(d)
    }
  pairDists.sort((a, b) => a - b)
  const edgeLen = pairDists[0]

  const adj: Set<number>[] = Array.from({ length: 20 }, () => new Set())
  for (let i = 0; i < 20; i++)
    for (let j = i + 1; j < 20; j++) {
      const d = Math.sqrt(
        (verts[i][0] - verts[j][0]) ** 2 +
        (verts[i][1] - verts[j][1]) ** 2 +
        (verts[i][2] - verts[j][2]) ** 2,
      )
      if (d < edgeLen * 1.05) {
        adj[i].add(j)
        adj[j].add(i)
      }
    }

  // Find pentagonal faces via 5-cycles
  const faceSet = new Set<string>()
  const faces: number[][] = []

  for (let a = 0; a < 20; a++) {
    for (const b of adj[a]) {
      for (const c of adj[b]) {
        if (c === a) continue
        for (const d of adj[c]) {
          if (d === a || d === b) continue
          for (const e of adj[d]) {
            if (e === a || e === b || e === c) continue
            if (!adj[e].has(a)) continue
            const face = [a, b, c, d, e]
            const key = [...face].sort((x, y) => x - y).join(',')
            if (faceSet.has(key)) continue
            // Check coplanarity
            const v0 = verts[a],
              v1 = verts[b],
              v2 = verts[c]
            const nx =
              (v1[1] - v0[1]) * (v2[2] - v0[2]) -
              (v1[2] - v0[2]) * (v2[1] - v0[1])
            const ny =
              (v1[2] - v0[2]) * (v2[0] - v0[0]) -
              (v1[0] - v0[0]) * (v2[2] - v0[2])
            const nz =
              (v1[0] - v0[0]) * (v2[1] - v0[1]) -
              (v1[1] - v0[1]) * (v2[0] - v0[0])
            let ok = true
            for (const fi of [d, e]) {
              const vi = verts[fi]
              const dot =
                nx * (vi[0] - v0[0]) +
                ny * (vi[1] - v0[1]) +
                nz * (vi[2] - v0[2])
              if (Math.abs(dot) > 0.05) {
                ok = false
                break
              }
            }
            if (ok) {
              faceSet.add(key)
              faces.push(face)
            }
          }
        }
      }
    }
  }

  // Orient dodecahedron: rotate so the top face center points at (0,0,1)
  const faceData = faces.slice(0, 12)

  // Find face with highest z center
  let bestFace = 0
  let bestZ = -Infinity
  for (let i = 0; i < faceData.length; i++) {
    const cz =
      faceData[i].reduce((s, vi) => s + verts[vi][2], 0) / 5
    if (cz > bestZ) {
      bestZ = cz
      bestFace = i
    }
  }

  // Compute rotation to align top face center with (0,0,1)
  const topCenter = faceData[bestFace].reduce(
    (acc, vi) => [
      acc[0] + verts[vi][0] / 5,
      acc[1] + verts[vi][1] / 5,
      acc[2] + verts[vi][2] / 5,
    ],
    [0, 0, 0],
  )
  const tcLen = Math.sqrt(
    topCenter[0] ** 2 + topCenter[1] ** 2 + topCenter[2] ** 2,
  )
  const tc = [topCenter[0] / tcLen, topCenter[1] / tcLen, topCenter[2] / tcLen]

  // Rotation axis: tc × (0,0,1) = (tc[1], -tc[0], 0)
  const axLen = Math.sqrt(tc[0] ** 2 + tc[1] ** 2)
  const angle = Math.acos(Math.min(1, tc[2]))

  function rotateVert(v: [number, number, number]): [number, number, number] {
    if (axLen < 0.001) return v // already aligned
    const ax = tc[1] / axLen
    const ay = -tc[0] / axLen
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    const ic = 1 - c
    // Rodrigues rotation
    const dot = ax * v[0] + ay * v[1]
    const cx2 = ay * v[2]
    const cy2 = -ax * v[2]
    const cz2 = ax * v[1] - ay * v[0]
    return [
      v[0] * c + cx2 * s + ax * dot * ic,
      v[1] * c + cy2 * s + ay * dot * ic,
      v[2] * c + cz2 * s + 0 * dot * ic,
    ]
  }

  // Hmm, Rodrigues is a bit tricky with 2D axis. Let me use a rotation matrix.
  function rotateVertex(v: [number, number, number]): [number, number, number] {
    if (axLen < 0.001) return v
    const ux = tc[1] / axLen
    const uy = -tc[0] / axLen
    const uz = 0
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)
    const oneMinusCos = 1 - cosA
    // Rotation matrix columns
    const r00 = cosA + ux * ux * oneMinusCos
    const r01 = ux * uy * oneMinusCos
    const r02 = uy * sinA
    const r10 = uy * ux * oneMinusCos
    const r11 = cosA + uy * uy * oneMinusCos
    const r12 = -ux * sinA
    const r20 = -uy * sinA
    const r21 = ux * sinA
    const r22 = cosA
    return [
      r00 * v[0] + r01 * v[1] + r02 * v[2],
      r10 * v[0] + r11 * v[1] + r12 * v[2],
      r20 * v[0] + r21 * v[1] + r22 * v[2],
    ]
  }

  const rotatedVerts = verts.map(rotateVertex)

  // Perspective projection: camera at (0, 0, camDist) looking at origin
  const camDist = 3.0
  function project(v: [number, number, number]): [number, number] {
    const scale = camDist / (camDist - v[2])
    return [v[0] * scale, v[1] * scale]
  }

  // Build tiles
  const tiles: Tile[] = []
  for (const face of faceData) {
    const projVerts = face.map(vi => project(rotatedVerts[vi])) as [number, number][]
    const center3d = face.reduce(
      (acc, vi) => [
        acc[0] + rotatedVerts[vi][0] / 5,
        acc[1] + rotatedVerts[vi][1] / 5,
        acc[2] + rotatedVerts[vi][2] / 5,
      ],
      [0, 0, 0],
    )
    // Skip back-facing tiles
    if (center3d[2] < -0.1) continue

    const projCenter = project(center3d as [number, number, number])
    tiles.push({
      vertices: projVerts,
      center: projCenter as [number, number],
      depth: 1 - center3d[2], // 0 = facing viewer
    })
  }

  // Sort by depth (back to front)
  tiles.sort((a, b) => b.depth - a.depth)
  return tiles
}

// ============================================================
// 2. HEX GRID — {6,3} Euclidean tiling
//    Standard hex grid in normalized coordinates
// ============================================================

function generateHexGrid(rings: number): Tile[] {
  const tiles: Tile[] = []

  for (let q = -rings; q <= rings; q++) {
    for (let r = -rings; r <= rings; r++) {
      if (Math.abs(q + r) > rings) continue
      // Center position (unit = edge-to-edge distance)
      const cx = (q + r * 0.5) * Math.sqrt(3)
      const cy = r * 1.5
      const radius = 1 // circumradius

      const verts: [number, number][] = []
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6
        verts.push([cx + radius * Math.cos(a), cy + radius * Math.sin(a)])
      }

      tiles.push({
        vertices: verts,
        center: [cx, cy],
        depth: Math.sqrt(cx * cx + cy * cy),
      })
    }
  }

  return tiles.sort((a, b) => a.depth - b.depth)
}

// ============================================================
// 3. HYPERBOLIC {7,3} — Poincaré disk via circle inversions
//    Generates tiles recursively using reflections across geodesics
// ============================================================

function generateHyperbolicTiling(maxTiles: number): Tile[] {
  const p = 7

  // Vertex radius in Poincaré disk
  const cosQ = Math.cos(Math.PI / 3) // q=3
  const sinP = Math.sin(Math.PI / p)
  const coshD = cosQ / sinP
  const d = Math.acosh(coshD)
  const r = Math.tanh(d / 2)

  // Central heptagon
  const centralVerts: [number, number][] = []
  for (let i = 0; i < p; i++) {
    const angle = (2 * Math.PI * i) / p - Math.PI / 2
    centralVerts.push([r * Math.cos(angle), r * Math.sin(angle)])
  }

  const tiles: Tile[] = []
  const centerKeys = new Set<string>()

  function keyOf(c: [number, number]): string {
    return `${Math.round(c[0] * 500)},${Math.round(c[1] * 500)}`
  }

  function tileCenter(vs: [number, number][]): [number, number] {
    let sx = 0,
      sy = 0
    for (const v of vs) {
      sx += v[0]
      sy += v[1]
    }
    return [sx / vs.length, sy / vs.length]
  }

  // Find geodesic circle through two points on the Poincaré disk
  function geodesicCircle(
    a: [number, number],
    b: [number, number],
  ): { cx: number; cy: number; r2: number } | null {
    const det = a[0] * b[1] - a[1] * b[0]
    if (Math.abs(det) < 1e-10) return null // diameter (through origin)

    const ra = (a[0] * a[0] + a[1] * a[1] + 1) / 2
    const rb = (b[0] * b[0] + b[1] * b[1] + 1) / 2
    const cx = (ra * b[1] - rb * a[1]) / det
    const cy = (a[0] * rb - b[0] * ra) / det
    const r2 = cx * cx + cy * cy - 1
    return { cx, cy, r2 }
  }

  // Invert point through circle
  function invertPoint(
    z: [number, number],
    gcx: number,
    gcy: number,
    gr2: number,
  ): [number, number] {
    const dx = z[0] - gcx
    const dy = z[1] - gcy
    const d2 = dx * dx + dy * dy
    if (d2 < 1e-12) return z
    return [gcx + (gr2 * dx) / d2, gcy + (gr2 * dy) / d2]
  }

  // Reflect tile across geodesic through edge (a, b)
  function reflectTile(
    vs: [number, number][],
    a: [number, number],
    b: [number, number],
  ): [number, number][] | null {
    const gc = geodesicCircle(a, b)
    if (!gc) {
      // Diameter geodesic: reflect through the line from origin through midpoint
      const mx = (a[0] + b[0]) / 2
      const my = (a[1] + b[1]) / 2
      const ml = Math.sqrt(mx * mx + my * my)
      if (ml < 1e-10) return null
      const nx = mx / ml
      const ny = my / ml
      return vs.map(v => {
        const dot = v[0] * nx + v[1] * ny
        return [2 * dot * nx - v[0], 2 * dot * ny - v[1]] as [number, number]
      })
    }
    return vs.map(v => invertPoint(v, gc.cx, gc.cy, gc.r2))
  }

  function tryAddTile(vs: [number, number][]): boolean {
    // Check all vertices within disk
    for (const v of vs) {
      if (v[0] * v[0] + v[1] * v[1] > 0.99) return false
    }
    const c = tileCenter(vs)
    if (c[0] * c[0] + c[1] * c[1] > 0.97) return false
    const key = keyOf(c)
    if (centerKeys.has(key)) return false
    centerKeys.add(key)
    tiles.push({
      vertices: [...vs],
      center: c,
      depth: Math.sqrt(c[0] * c[0] + c[1] * c[1]),
    })
    return true
  }

  // BFS from center
  tryAddTile(centralVerts)
  const queue: [number, number][][] = [centralVerts]

  while (queue.length > 0 && tiles.length < maxTiles) {
    const current = queue.shift()!
    for (let i = 0; i < p; i++) {
      const a = current[i]
      const b = current[(i + 1) % p]
      const reflected = reflectTile(current, a, b)
      if (reflected && tryAddTile(reflected)) {
        queue.push(reflected)
      }
    }
  }

  return tiles
}

// ============================================================
// Drawing helpers
// ============================================================

function drawTilePolygon(
  ctx: CanvasRenderingContext2D,
  verts: [number, number][],
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
) {
  if (verts.length < 3) return
  ctx.beginPath()
  ctx.moveTo(verts[0][0], verts[0][1])
  for (let i = 1; i < verts.length; i++) {
    ctx.lineTo(verts[i][0], verts[i][1])
  }
  ctx.closePath()
  ctx.fillStyle = fillStyle
  ctx.fill()
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

// Draw geodesic edges (arcs) for Poincaré disk tiles
function drawHyperbolicTile(
  ctx: CanvasRenderingContext2D,
  verts: [number, number][],
  diskCx: number,
  diskCy: number,
  diskR: number,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
) {
  if (verts.length < 3) return

  // Convert to screen coords and draw with geodesic arcs
  const screenVerts = verts.map(
    v => [diskCx + v[0] * diskR, diskCy + v[1] * diskR] as [number, number],
  )

  ctx.beginPath()
  ctx.moveTo(screenVerts[0][0], screenVerts[0][1])

  for (let i = 0; i < verts.length; i++) {
    const a = verts[i]
    const b = verts[(i + 1) % verts.length]

    // Check if edge is close to a diameter (geodesic = straight line)
    const det = a[0] * b[1] - a[1] * b[0]
    if (Math.abs(det) < 0.001) {
      ctx.lineTo(
        diskCx + b[0] * diskR,
        diskCy + b[1] * diskR,
      )
      continue
    }

    // Find geodesic circle
    const ra = (a[0] * a[0] + a[1] * a[1] + 1) / 2
    const rb = (b[0] * b[0] + b[1] * b[1] + 1) / 2
    const gcx = (ra * b[1] - rb * a[1]) / det
    const gcy = (a[0] * rb - b[0] * ra) / det
    const gr = Math.sqrt(gcx * gcx + gcy * gcy - 1)

    // Convert circle center to screen coords
    const scx = diskCx + gcx * diskR
    const scy = diskCy + gcy * diskR
    const sr = gr * diskR

    // Compute arc angles
    const startAngle = Math.atan2(
      screenVerts[i][1] - scy,
      screenVerts[i][0] - scx,
    )
    const endAngle = Math.atan2(
      screenVerts[(i + 1) % verts.length][1] - scy,
      screenVerts[(i + 1) % verts.length][0] - scx,
    )

    // Determine arc direction (should curve toward center of disk)
    // The geodesic arc is the shorter arc on the side toward the origin
    const midAngle = (startAngle + endAngle) / 2
    const testX = scx + sr * Math.cos(midAngle)
    const testY = scy + sr * Math.sin(midAngle)
    const testDist = Math.sqrt(
      (testX - diskCx) ** 2 + (testY - diskCy) ** 2,
    )

    const altMidAngle = midAngle + Math.PI
    const altTestX = scx + sr * Math.cos(altMidAngle)
    const altTestY = scy + sr * Math.sin(altMidAngle)
    const altTestDist = Math.sqrt(
      (altTestX - diskCx) ** 2 + (altTestY - diskCy) ** 2,
    )

    // Choose the arc that curves toward the center
    const counterclockwise = testDist > altTestDist

    ctx.arc(scx, scy, sr, startAngle, endAngle, counterclockwise)
  }

  ctx.closePath()
  ctx.fillStyle = fillStyle
  ctx.fill()
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

// ============================================================
// Component
// ============================================================

type Phase = 'spherical' | 'euclidean' | 'hyperbolic'

export default function FiveSixSeven() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef<number>(0)
  const [phase, setPhase] = useState<Phase>('spherical')
  const [displayN, setDisplayN] = useState(5)
  const [displayDeficit, setDisplayDeficit] = useState(36)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  // Pre-generate all three tilings
  const dodecTiles = useMemo(() => generateDodecahedron(), [])
  const hexTiles = useMemo(() => generateHexGrid(7), [])
  const hyperTiles = useMemo(() => generateHyperbolicTiling(250), [])

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      const W = rect.width
      const H = rect.height
      const cx = W / 2
      const cy = H / 2
      const diskR = Math.min(W, H) * 0.44

      if (!pausedRef.current) {
        timeRef.current = timestamp
      }

      // ---- Animation: 18s cycle ----
      const CYCLE = 18000
      const t = (timeRef.current % CYCLE) / CYCLE
      let currentN: number
      let currentPhase: Phase

      // Determine what to render and transition state
      let morphFrom: Phase | null = null
      let morphTo: Phase | null = null
      let morphT = 0

      if (t < 1 / 6) {
        currentN = 5
        currentPhase = 'spherical'
      } else if (t < 2 / 6) {
        morphT = smoothstep((t - 1 / 6) * 6)
        currentN = lerp(5, 6, morphT)
        morphFrom = 'spherical'
        morphTo = 'euclidean'
        currentPhase = morphT < 0.5 ? 'spherical' : 'euclidean'
      } else if (t < 3 / 6) {
        currentN = 6
        currentPhase = 'euclidean'
      } else if (t < 4 / 6) {
        morphT = smoothstep((t - 3 / 6) * 6)
        currentN = lerp(6, 7, morphT)
        morphFrom = 'euclidean'
        morphTo = 'hyperbolic'
        currentPhase = morphT < 0.5 ? 'euclidean' : 'hyperbolic'
      } else if (t < 5 / 6) {
        currentN = 7
        currentPhase = 'hyperbolic'
      } else {
        morphT = smoothstep((t - 5 / 6) * 6)
        currentN = lerp(7, 5, morphT)
        morphFrom = 'hyperbolic'
        morphTo = 'spherical'
        currentPhase = morphT < 0.5 ? 'hyperbolic' : 'spherical'
      }

      const deficit = angularDeficit(currentN, 3)
      setPhase(currentPhase)
      setDisplayN(Math.round(currentN * 100) / 100)
      setDisplayDeficit(Math.round(deficit * 100) / 100)

      // ---- Colors ----
      const K = deficit / 36
      const sRGB = [80, 150, 255]
      const fRGB = [190, 190, 190]
      const hRGB = [240, 80, 80]
      let cr: number, cg: number, cb: number
      if (K >= 0) {
        cr = lerp(fRGB[0], sRGB[0], K)
        cg = lerp(fRGB[1], sRGB[1], K)
        cb = lerp(fRGB[2], sRGB[2], K)
      } else {
        const b = Math.min(1, Math.abs(K) / 0.71)
        cr = lerp(fRGB[0], hRGB[0], b)
        cg = lerp(fRGB[1], hRGB[1], b)
        cb = lerp(fRGB[2], hRGB[2], b)
      }

      // ---- Clear ----
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, W, H)

      // ---- Boundary circle ----
      ctx.beginPath()
      ctx.arc(cx, cy, diskR, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${Math.round(cr)}, ${Math.round(cg)}, ${Math.round(cb)}, 0.25)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // ---- Render tilings ----
      function renderDodec(alpha: number) {
        if (alpha < 0.01) return
        ctx.globalAlpha = alpha
        const scale = diskR * 0.85
        for (const tile of dodecTiles) {
          const screenVerts = tile.vertices.map(
            v => [cx + v[0] * scale, cy + v[1] * scale] as [number, number],
          )
          const depthShade = Math.max(0.3, 1 - tile.depth * 0.3)
          drawTilePolygon(
            ctx,
            screenVerts,
            `rgba(${Math.round(cr * 0.15 * depthShade)}, ${Math.round(cg * 0.15 * depthShade)}, ${Math.round(cb * 0.15 * depthShade)}, 1)`,
            `rgba(${Math.round(cr)}, ${Math.round(cg)}, ${Math.round(cb)}, ${(0.85 * depthShade).toFixed(2)})`,
            Math.max(1, 2.5 * depthShade),
          )
        }
        ctx.globalAlpha = 1
      }

      function renderHex(alpha: number) {
        if (alpha < 0.01) return
        ctx.globalAlpha = alpha
        // Scale hex grid to fill disk
        const hexScale = diskR * 0.072
        for (const tile of hexTiles) {
          const sd =
            Math.sqrt(tile.center[0] ** 2 + tile.center[1] ** 2) * hexScale
          if (sd > diskR * 0.97) continue
          const fade = 1 - Math.pow(sd / diskR, 6)
          if (fade < 0.01) continue

          const screenVerts = tile.vertices.map(
            v =>
              [cx + v[0] * hexScale, cy + v[1] * hexScale] as [number, number],
          )
          const depthShade = Math.max(0.3, 1 - (sd / diskR) * 0.4)
          ctx.globalAlpha = alpha * fade
          drawTilePolygon(
            ctx,
            screenVerts,
            `rgba(${Math.round(cr * 0.12 * depthShade)}, ${Math.round(cg * 0.12 * depthShade)}, ${Math.round(cb * 0.12 * depthShade)}, 1)`,
            `rgba(${Math.round(cr)}, ${Math.round(cg)}, ${Math.round(cb)}, ${(0.7 * depthShade).toFixed(2)})`,
            1.2,
          )
        }
        ctx.globalAlpha = 1
      }

      function renderHyper(alpha: number) {
        if (alpha < 0.01) return
        for (const tile of hyperTiles) {
          const dist = Math.sqrt(
            tile.center[0] ** 2 + tile.center[1] ** 2,
          )
          const fade = 1 - Math.pow(dist, 8)
          if (fade < 0.01) continue

          const depthShade = Math.max(0.2, 1 - dist * 0.5)
          ctx.globalAlpha = alpha * Math.max(0.05, fade)
          drawHyperbolicTile(
            ctx,
            tile.vertices,
            cx,
            cy,
            diskR,
            `rgba(${Math.round(cr * 0.15 * depthShade)}, ${Math.round(cg * 0.15 * depthShade)}, ${Math.round(cb * 0.15 * depthShade)}, 1)`,
            `rgba(${Math.round(cr)}, ${Math.round(cg)}, ${Math.round(cb)}, ${(0.8 * depthShade).toFixed(2)})`,
            Math.max(0.3, 1.5 * (1 - dist)),
          )
        }
        ctx.globalAlpha = 1
      }

      // Clip to disk
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, diskR - 1, 0, Math.PI * 2)
      ctx.clip()

      if (morphFrom && morphTo) {
        // Transition: crossfade between two tilings
        const alphaFrom = 1 - morphT
        const alphaTo = morphT

        const renderers: Record<Phase, (a: number) => void> = {
          spherical: renderDodec,
          euclidean: renderHex,
          hyperbolic: renderHyper,
        }

        renderers[morphFrom](alphaFrom)
        renderers[morphTo](alphaTo)
      } else {
        // Hold: render single tiling
        if (currentPhase === 'spherical') renderDodec(1)
        else if (currentPhase === 'euclidean') renderHex(1)
        else renderHyper(1)
      }

      ctx.restore()

      animRef.current = requestAnimationFrame(draw)
    },
    [dodecTiles, hexTiles, hyperTiles],
  )

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [draw])

  const togglePause = () => {
    pausedRef.current = !pausedRef.current
    setPaused(pausedRef.current)
  }

  const phaseLabels: Record<Phase, string> = {
    spherical: 'Positive Curvature (Spherical)',
    euclidean: 'Zero Curvature (Euclidean)',
    hyperbolic: 'Negative Curvature (Hyperbolic)',
  }

  const phaseColors: Record<Phase, string> = {
    spherical: '#509bff',
    euclidean: '#bebebe',
    hyperbolic: '#f05050',
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-1">5 - 6 - 7</h1>
        <p className="text-gray-500 text-sm">
          Dialing the curvature of space from spherical through flat to
          hyperbolic
        </p>
      </div>

      <div className="flex-1 relative mx-4 mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-xl"
          style={{ minHeight: '520px' }}
        />

        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur rounded-lg p-4 text-white font-mono text-sm space-y-1 border border-white/10">
          <div
            className="text-base font-bold mb-2"
            style={{ color: phaseColors[phase] }}
          >
            {phaseLabels[phase]}
          </div>
          <div>
            n-gon:{' '}
            <span className="text-yellow-300">{displayN.toFixed(2)}</span>
          </div>
          <div>
            interior angle:{' '}
            <span className="text-yellow-300">
              {interiorAngle(displayN).toFixed(2)}
            </span>
          </div>
          <div>
            deficit (3 meet):{' '}
            <span
              style={{
                color:
                  displayDeficit > 0
                    ? '#509bff'
                    : displayDeficit < 0
                      ? '#f05050'
                      : '#999',
              }}
            >
              {displayDeficit > 0 ? '+' : ''}
              {displayDeficit.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={togglePause}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20 backdrop-blur text-sm"
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div
            className={`p-4 rounded-lg border text-center transition-all duration-700 ${
              phase === 'spherical'
                ? 'bg-blue-500/15 border-blue-500/60 text-blue-300'
                : 'bg-white/[0.03] border-white/10 text-gray-600'
            }`}
          >
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs font-medium">Pentagon</div>
            <div className="text-[11px] mt-1 opacity-70">
              Dodecahedron
            </div>
          </div>
          <div
            className={`p-4 rounded-lg border text-center transition-all duration-700 ${
              phase === 'euclidean'
                ? 'bg-gray-400/15 border-gray-400/60 text-gray-300'
                : 'bg-white/[0.03] border-white/10 text-gray-600'
            }`}
          >
            <div className="text-2xl font-bold">6</div>
            <div className="text-xs font-medium">Hexagon</div>
            <div className="text-[11px] mt-1 opacity-70">
              Flat plane
            </div>
          </div>
          <div
            className={`p-4 rounded-lg border text-center transition-all duration-700 ${
              phase === 'hyperbolic'
                ? 'bg-red-500/15 border-red-500/60 text-red-300'
                : 'bg-white/[0.03] border-white/10 text-gray-600'
            }`}
          >
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs font-medium">Heptagon</div>
            <div className="text-[11px] mt-1 opacity-70">
              Poincare disk
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
