import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** One heartbeat, t in [0,1): P wave, QRS complex, T wave. Returns amplitude in [-1,1]. */
const beat = (t: number) => {
  const g = (c: number, w: number, a: number) => a * Math.exp(-(((t - c) / w) ** 2))
  return (
    g(0.16, 0.035, 0.18) +
    g(0.3, 0.012, -0.15) +
    g(0.33, 0.012, 1) +
    g(0.36, 0.014, -0.3) +
    g(0.6, 0.06, 0.32)
  )
}

const SPEED = 140 // px per second
const SPAN = 180 // px of trace one beat occupies at 60 bpm

/** Live, scrolling ECG trace whose heart rate follows the slider. */
const EcgMonitor = () => {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bpmRef = useRef(72)
  const [bpm, setBpm] = useState(72)

  useEffect(() => {
    bpmRef.current = bpm
  }, [bpm])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rose = getComputedStyle(document.documentElement).getPropertyValue('--rose').trim()
    let w = 0
    let h = 0
    let phase = 0 // distance travelled along the signal, in beats
    let last = performance.now()
    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reduceMotion) phase += dt * SPEED * (bpmRef.current / 60) * (1 / SPAN)

      ctx.clearRect(0, 0, w, h)

      // grid
      ctx.strokeStyle = 'rgba(246,240,251,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // trace: x runs left→right, the signal scrolls left
      const mid = h * 0.62
      const amp = h * 0.5
      ctx.strokeStyle = rose
      ctx.lineWidth = 2.5
      ctx.lineJoin = 'round'
      ctx.shadowColor = rose
      ctx.shadowBlur = 10
      ctx.beginPath()
      for (let x = 0; x <= w; x += 2) {
        const p = (x / SPAN) * (bpmRef.current / 60) + phase
        const y = mid - beat(p - Math.floor(p)) * amp
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="ecg reveal">
      <div className="ecg__top">
        <span>{t('ecg.title')}</span>
        <span className="ecg__bpm">
          {bpm}
          <small>BPM</small>
        </span>
      </div>
      <canvas ref={canvasRef} role="img" aria-label={t('ecg.aria')} />
      <label className="ecg__control">
        {t('ecg.rate')}
        <input
          type="range"
          min={40}
          max={180}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </label>
    </div>
  )
}

export default EcgMonitor
