import planeVertex from './shaders/test/vertex.js'
import planeFragment from './shaders/test/fragment.js'
import blobVertex from './shaders/blob/vertex.js'
import blobFragment from './shaders/blob/fragment.js'
import { useRef } from 'react'
import { shaderMaterial,OrbitControls } from '@react-three/drei'
import { useFrame,extend } from '@react-three/fiber';
import { Color, MathUtils } from 'three';

//just use the shaderMaterial helper from the drei its so simple to use
//plane Material
const PlaneMaterial = shaderMaterial(
    {
        u_time:0,
        u_colorA:  new Color("#FFE486") ,
        u_colorB:  new Color("#FEB3D9") ,  
    },
    planeVertex,
    planeFragment
)
extend({PlaneMaterial});//so that we can use it as a component



//for blob material
const BlobMaterial = shaderMaterial(
    {
        u_time:0.0,
        u_intensity:0.3,  
    },
    blobVertex,
    blobFragment
)
extend({BlobMaterial});//so that we can use it as a component



function App(){
    const plane = useRef();//direct access to the plane mesh
    const planeMaterial = useRef();//reference of the plane shader material

    
    const blob = useRef();//direct access to the blob mesh
    const blobMaterial = useRef();//reference of the blob shader material
    const hover = useRef(false);//for checking if the blob is hovered or not

  useFrame((state,delta)=>{
        // planeMaterial.current.u_time = state.clock.elapsedTime;

        blobMaterial.current.u_time = 0.4 * state.clock.elapsedTime;//for using the perlin noise

        blobMaterial.current.u_intensity = MathUtils.lerp(
            blobMaterial.current.u_intensity, //starting point -> initial value provided
            hover.current ? 0.85 : 0.15, // final value depending upon if the blob is hovered or not
            0.02 //by how much amount to lerp , smaller the value more is the smoothness
        )
        
  })

  return (
    <>
    <OrbitControls />{ /** using the orbit controls */ }

    {/** for plane */}
      {/* <mesh ref={plane} position={[0, 0, 0]}  rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
        <planeGeometry args={[2, 20]} />
        <planeMaterial ref={ planeMaterial } />
      </mesh> */}

    {/** for blob */}
      <mesh 
        ref={blob} 
        position={[0, 0, 0]} 
        scale={1.5}
        onPointerOver={() => (hover.current = true)}
        onPointerOut={() => (hover.current = false)}
      >
        <icosahedronGeometry args={[2, 20]} />
        <blobMaterial ref={ blobMaterial } />
      </mesh>

    </>
  )
}
export default App