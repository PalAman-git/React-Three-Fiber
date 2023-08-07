import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './styles.css'
import App from './app'

// import {boxCollider} from '@react-three/rapier'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      <App />
    </Canvas>
  </StrictMode>
)
