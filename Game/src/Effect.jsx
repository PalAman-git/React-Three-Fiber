import React from "react";
import { DepthOfField, EffectComposer, SSR } from "@react-three/postprocessing";

function Effect() {
  return (
    <EffectComposer>
      <SSR 
        intensity={0.45}
        exponent={1}
        distance={10}
        fade={10}
        roughnessFade={1}
        thickness={10}
        ior={0.45}
        maxRoughness={1}
        maxDepthDifference={10}
        blend={0.95}
        correction={1}
        blur={0}
        blurKernel={1}
        blurSharpness={10}
        jitter={0.75}
        jitterRoughness={0.2}
        steps={40}
        refineSteps={5}
        missedRays={true}
        useNormalMap={true}
        useRoughnessMap={true}
        resolutionScale={1}
        velocityResolutionScale={1}
      />
      <DepthOfField focusDistance={0.01} focusLength={0.2} bokehScale={3} />
    </EffectComposer>
  );
}

export default Effect;
