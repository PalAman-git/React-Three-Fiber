import {
  PresentationControls,
  Float,
  useGLTF,
  Html,
  Text,
  ContactShadows,
} from "@react-three/drei";

export default function Experience() {
  
  const computer = useGLTF("./model.gltf");

  return (
    <>
      <color args={["#040e13"]} attach="background" />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]} //for vertical movement limit
        azimuth={[-1, 0.75]} //for horizontal movement limit
        config={{
          mass: 2,
          tension: 400,
        }} //animation control on holding the laptop and moving
        snap={{
          mass: 4,
          tension: 400,
        }} //animation control on leaving the mouse button
      >
        <Float rotationIntensity={0.5}>
          {/* Screen Light */}
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#E7fafa"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          {/* Laptop */}
          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://ajayky-portfolio.netlify.app/" />
            </Html>
          </primitive>

          {/* Text */}
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={ 1 }
                position={ [ 2,0.75,0.75 ] }
                rotation-y={-1.25}
                maxWidth={2}
                textAlign="center"
            >AJAY KUMAR</Text>
        </Float>
      </PresentationControls>

      <ContactShadows position={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
