import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { a, animated } from '@react-spring/three'
import { useSpring } from '@react-spring/core'
import { useTexture } from '@react-three/drei'

import { useContext } from '../context/AppContext'
import earthImg from '../assets/earthImg.jpg'
import earthNormal from '../assets/earthNormal.jpg'

function Sphere(props: ThreeElements['mesh']) {
  const texture = useTexture(earthImg)
  const normalTexture = useTexture(earthNormal)
  return (
    <mesh {...props}>
      <sphereGeometry args={[2, 100, 100]} />
      <meshStandardMaterial
        map={texture}
        normalMap={normalTexture}
        color={'lightgray'}
      />
    </mesh>
  )
}

const AnimatedSphere = animated(Sphere)

export default () => {
  const degToRad = (deg: number) => (deg * Math.PI) / 180.0
  const { location } = useContext()
  const { springX } = useSpring({
    springX: degToRad(location[0]),
    config: { precision: 0.0001 }
  })
  const { springY } = useSpring({
    springY: degToRad((location[1] + 90) * -1),
    config: { precision: 0.0001 }
  })
  const { color } = useSpring({
    color: 0
  })

  return (
    <Canvas>
      <pointLight position={[20, 50, 60]} />
      <ambientLight intensity={0.3} />
      <AnimatedSphere
        position={[0, 0, 0]}
        rotation-y={springY}
        rotation-x={springX}
      />
    </Canvas>
  )
}
