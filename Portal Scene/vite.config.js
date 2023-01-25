import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

const isCodeSandbox = !!process.env.SANDBOX_URL

export default {
    plugins:
    [
        react(),
        glsl()
    ],
    root: "src/",
    publicDir: "../public/",
    base: "./",
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true
    }
}