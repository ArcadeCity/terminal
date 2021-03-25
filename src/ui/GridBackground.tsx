import { useCallback, useState } from 'react'
import { a, useSpring } from '@react-spring/three'
import { A11y } from '@react-three/a11y'

const Plane = () => (
  <a.mesh receiveShadow>
    <a.meshStandardMaterial attach='material' color={'#004646'} />
    <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
  </a.mesh>
)

export const GridBackground = () => {
  const [toggle, set] = useState(0)
  const { x } = useSpring({
    // x: toggle,
    from: { x: 0 },
    to: { x: 0.55 },
    config: {
      mass: 5,
      tension: 1000,
      friction: 50,
      precision: 0.0001,
      clamp: true,
    },
    delay: 500,
  })
  const onClick = useCallback(() => set((toggle) => Number(!toggle)), [set])
  return (
    <>
      <a.pointLight position={[-10, -10, 30]} intensity={x} />
      <a.spotLight
        intensity={x}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      {/* <A11y
        actionCall={() => {
          onClick()
        }}
      > */}
      <Plane x={x} />
      {/* </A11y> */}
    </>
  )
}

export default GridBackground
