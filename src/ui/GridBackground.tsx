import { a, useSpring } from '@react-spring/three'
import { useStore } from '@/store'

const Plane = ({ x }) => {
  const color = x.to([0, 1], ['#021114', '#004646'])
  return (
    <a.mesh receiveShadow>
      <a.meshStandardMaterial attach='material' color={color} />
      <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
    </a.mesh>
  )
}

export const GridBackground = () => {
  const user = useStore((s) => s.user)
  const { point, spot, x } = useSpring({
    from: { point: 0, spot: 0, x: 0 },
    to: user
      ? { point: 0.6, spot: 0.4, x: 1 }
      : { point: 0.3, spot: 0.2, x: 1 }, // when in: point: 0.45, spot: 0.3
    config: {
      mass: 5,
      tension: 1000,
      friction: 50,
      precision: 0.0001,
      clamp: true,
      duration: 1500,
    },
  })
  return (
    <>
      <a.pointLight position={[-10, -10, 30]} intensity={point} />
      <a.spotLight
        intensity={spot}
        position={[30, 30, 50]}
        angle={0.2}
        penumbra={1}
        castShadow
      />

      <Plane x={x} />
    </>
  )
}

export default GridBackground
