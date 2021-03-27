import { useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { useStore } from '@/store'
import { OrbitControls, Preload } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import { A11yUserPreferences } from '@react-three/a11y'

const Bg = () => {
  const router = useStore((state) => state.router)
  const { bg } = useSpring({
    bg: router && router.route !== '/box' ? 0 : 0x17 / 255,
  })
  return <a.color attach='background' r={bg} g={bg} b={bg} />
}

const LCanvas = ({ children }) => {
  const [vignette, showVignette] = useState(false)
  return (
    <Canvas
      style={{
        backgroundColor: '#021114',
        position: 'fixed',
        top: 0,
      }}
      onCreated={({ events }) => {
        useStore.setState({ events })
        setTimeout(() => {
          showVignette(true)
        }, 1000)
      }}
    >
      <A11yUserPreferences>
        <Preload all />
        {/* <Bg /> */}
        <OrbitControls />
        {vignette && (
          <EffectComposer>
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        )}
        {children}
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
