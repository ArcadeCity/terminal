import { a, useSpring } from '@react-spring/three'

const Plane = () => (
  <a.mesh receiveShadow>
    <a.meshStandardMaterial attach='material' color={'#004646'} />
    <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
  </a.mesh>
)

export const GridBackground = () => {
  const { point, spot } = useSpring({
    from: { point: 0, spot: 0 },
    to: { point: 0.45, spot: 0.3 },
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

      <Plane />
    </>
  )
}

export default GridBackground
