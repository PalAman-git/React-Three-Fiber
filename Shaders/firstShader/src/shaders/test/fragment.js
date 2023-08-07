export default /*glsl*/ `

  uniform vec3 u_colorA;
  uniform vec3 u_colorB;

  varying vec2 vUv;
  varying float vZ;

  void main()
  {
    vec3 color = mix( u_colorA , u_colorB ,vZ * 2.0 + 0.5 ); 
    gl_FragColor = vec4( color , 1.0 );
  }
`
