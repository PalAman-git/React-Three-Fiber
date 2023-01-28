import { CubeCamera, OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  CuboidCollider,
  CylinderCollider,
  Debug,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const twister = useRef();

  const [hitSound] = useState(() => new Audio("./hit.mp3")); //this is a react trick to load the sound only one time not on every time when the experience component re-renders

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eularRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eularRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
  });

  const CollisionEnter = () => {
    // hitSound.currentTime=0;
    // hitSound.volume=Math.random()
    // hitSound.play();
  };

  const hamburger = useGLTF("./hamburger.glb");

  const cubeJump = () => {
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
    });
  };

  const cubesCount = 100;

  const cubes = useRef();

  const cubesTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([Math.random(), Math.random(), Math.random()]);

      const scale = 0.2 + Math.random() * 0.8;

      scales.push([scale, scale, scale]);
    }

    return { positions, rotations, scales };
  }, []);
  //   useEffect(() => {
  //     for (let i = 0; i < cubesCount; i++) {
  //       const matrix = new THREE.Matrix4();
  //       matrix.compose(
  //         new THREE.Vector3(i * 2, 0, 0),
  //         new THREE.Quaternion(),
  //         new THREE.Vector3(1, 1, 1)
  //       );
  //       cubes.current.setMatrixAt(i, matrix);
  //     }
  //   }, []); //for instance component

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics>
        {/** Used for implimenting physics */}
        {/* <Debug /> */}

        <RigidBody colliders="ball">
          {/**Colliders are the wireframe that covers meshes */}
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/**<RigidBody colliders="trimesh">  */}
        {/** hull collider will make membrane around the geometry */}
        {/**Avoid using trimesh because they behave weird when collided with the fast moving objects */}
        {/** <mesh
            castShadow
            position={[0, 1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusBufferGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </RigidBody>*/}

        <RigidBody
          position={[1.5, 2, 0]}
          ref={cube}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          onCollisionEnter={CollisionEnter}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={0.5} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies
          positions={cubesTransforms.positions}
          rotations={cubesTransforms.rotations}
          scales={cubesTransforms.scales}
        >
          <instancedMesh ref={cubes} args={[null, null, cubesCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
