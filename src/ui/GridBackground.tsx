import { a, useSpring } from '@react-spring/three'

const Plane = ({ x }) => {
  const color = x.to([0, 1], ['#051114', '#004646'])
  return (
    <a.mesh receiveShadow>
      <a.meshStandardMaterial attach='material' color={color} />
      <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
    </a.mesh>
  )
}

export const GridBackground = () => {
  const { point, spot, x } = useSpring({
    from: { point: 0, spot: 0, x: 0 },
    to: { point: 0.45, spot: 0.3, x: 1 },
    config: {
      mass: 5,
      tension: 1000,
      friction: 50,
      precision: 0.0001,
      clamp: true,
      duration: 4000,
    },
    // delay: 500,
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
