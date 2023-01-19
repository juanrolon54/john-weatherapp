import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { animated } from '@react-spring/three'
import { useSpring } from '@react-spring/core'
import { useTexture } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'

import earthImg from '../assets/earthImg.jpg'
import earthNormal from '../assets/earthNormal.jpg'
import useSearchParamsState from '../hooks/useSearchParamsState'

function Sphere(props: ThreeElements['mesh']) {
  const texture = useTexture(earthImg)
  const normalTexture = useTexture(earthNormal)
  return (
    <mesh {...props} >
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
  const [latitude, setLatitude] = useSearchParamsState('latitude')
  const [longitude, setLongitude] = useSearchParamsState('longitude')

  const rotationX = degToRad(Number(latitude))
  const rotationY = degToRad((Number(longitude) + 90) * -1)

  const { springX } = useSpring({
    springX: rotationX,
    config: { precision: 0.0001 }
  })
  const { springY } = useSpring({
    springY: rotationY,
    config: { precision: 0.0001 }
  })
  const { color } = useSpring({
    color: 0
  })

  return (
    <Canvas >

      <pointLight position={[20, 50, 60]} />
      <ambientLight intensity={0.3} />
      {/* <OrbitControls onChange={(e) => {
        console.log(e?.target.getPolarAngle(), e?.target.getAzimuthalAngle())
      }} getPolarAngle={} getAzimuthalAngle={}/> */}
      <AnimatedSphere
        position={[0, 0, 0]}
        rotation-y={springY}
        rotation-x={springX}
      />

    </Canvas>
  )
}
