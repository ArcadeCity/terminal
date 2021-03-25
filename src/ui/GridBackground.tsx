function Plane() {
  return (
    <mesh receiveShadow>
      <planeBufferGeometry attach='geometry' args={[1000, 1000]} />
      <meshStandardMaterial attach='material' color='#ffffff' />
    </mesh>
  )
}

export const GridBackground = () => {
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
      {/* <Plane /> */}
    </>
  )
}

export default GridBackground
