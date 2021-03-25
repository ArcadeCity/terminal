import { useCallback, useState } from 'react'
import { useSpring } from '@react-spring/core'
import { A11y } from '@react-three/a11y'

function Plane() {
  return (
    <mesh receiveShadow>
      <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
      <meshStandardMaterial attach='material' color='#ffffff' />
    </mesh>
  )
}

export const GridBackground = () => {
  const [toggle, set] = useState(0)
  const [{ x }] = useSpring(
    {
      x: toggle,
      config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 },
    },
    [toggle]
  )
  const onClick = useCallback(() => set((toggle) => Number(!toggle)), [set])
  return (
    <>
      <pointLight position={[-10, -10, 30]} intensity={0.25} />
      <spotLight
        intensity={0.3}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      <A11y
        actionCall={() => {
          onClick()
        }}
      >
        <Plane />
      </A11y>
    </>
  )
}

export default GridBackground
