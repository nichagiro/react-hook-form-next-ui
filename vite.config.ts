import { defineConfig } from 'vite'
import path from 'path';
import dts from 'vite-plugin-dts'
import tailwindcss from "@tailwindcss/vite"
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      exclude: ['src/stories/**/*']
    }),
    analyzer()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-hook-form-hero-ui',
      formats: ["es"],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
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
