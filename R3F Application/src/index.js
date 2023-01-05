import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { CineonToneMapping } from "three";
import { LinearEncoding } from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      gl={
        {
          // antialias:false,
          // toneMapping:CineonToneMapping
          // outputEncoding:LinearEncoding
        }
      }
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <Experience />
    </Canvas>
  </>
);
