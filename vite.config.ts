import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import dts from 'vite-plugin-dts'
// import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      mode === "development" && react(),
      dts({
        tsconfigPath: './tsconfig.app.json',
        rollupTypes: true
      }),
      // analyzer()
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'react-hook-form-next-ui',
        formats: ["es"],
        fileName: 'index'
      },
      rollupOptions: {
        external: [
          "@formkit/tempo",
          'xlsx',
          'yup',
          'react',
          'react-dom',
          'react-hook-form',
          '@nextui-org/react',
          'framer-motion',
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          }
        }
      }
    }
  }
})
