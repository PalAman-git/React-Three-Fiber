export default /*glsl*/ `

  uniform float u_time;

  varying vec2 vUv;
  varying float vZ;


  void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;//y changing with respect to x
  modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;//y changing with respect to z
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;


  vUv = uv;
}

`
