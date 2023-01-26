import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  EffectComposer,
  Bloom,
  Noise,
  Glitch,
  Vignette,
  SSR,
  DepthOfField,
} from "@react-three/postprocessing";
import {  GlitchMode, BlendFunction } from "postprocessing";

export default function Experience() {
  return (
    <>
      <color args={["#ffffff"]} attach="background" />
      <EffectComposer>
        {/* <Vignette 
                offset={0.3}
                darkness={ 0.9 }
                blendFunction={ BlendFunction.NORMAL }
            /> */}

        {/* <Glitch
                delay={ [ 0.5, 1 ] }
                duration={ [ 0.1, 0.3 ] }
                strength={ [ 0.02, 0.04 ] }
                mode={ GlitchMode.CONSTANT_WILD }
            /> */}

        {/* <Noise 
                premultiply
                blendFunction={ BlendFunction.SCREEN }
            /> */}

        {/* <Bloom 
            mipmapBlur
            intensity={ 0.1 }
            luminanceThreshold={ 0 }
        /> */}

        {/* <DepthOfField 
            focusDistance={ 0.025 }
            focusLength ={ 0.025 }
            bokehScale={ 6 }
        /> */}

        {/* <SSR /> */}

      </EffectComposer>

      <Perf position = "top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />

        {/** for bloom effect */}
        {/* <meshBasicMaterial
          color={ [ 1.5, 1, 4 ] }
          toneMapped={false} //if we set tonemapping the bloom effect will not work as tone mapping set the clamp on the value of colors and that won't allow the values to go beyond 1
        /> */}

        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial 
            metalness={0} 
            roughness={0} 
            color="greenyellow" />
      </mesh>
    </>
  );
}
