import { defineConfig } from 'vite'
import path from 'path';
import dts from 'vite-plugin-dts'
// import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      exclude: ['src/stories/**/*']
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
        'yup',
        'react',
        'react-dom',
        'react-hook-form',
        '@heroui/react',
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
})
