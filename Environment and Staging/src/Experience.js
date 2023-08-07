import { OrbitControls,Sky,useHelper,BakeShadows, Cloud } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from 'three';

export default function Experience() {
  const cube = useRef();
  const directionalLight=useRef();
  useHelper(directionalLight,THREE.DirectionalLightHelper,1);

  const { envMapIntensity }=useControls('environment map',{
    envMapIntensity:{value:1,min:0,max:12}
  })

  return (
    <>
  <Sky/>

    <BakeShadows />
    <color args={['ivory']} attach='background'/>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <directionalLight 
      ref={directionalLight} 
      position={[1, 2, 3]} 
      intensity={1.5} 
      castShadow 
      shadow-mapSize={[1024,1024]}

      />
      <ambientLight intensity={0.5} /> */}

      <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="orange" />
      </mesh>

      <mesh ref={cube} position-y={1} castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      
      </>
  );
}
