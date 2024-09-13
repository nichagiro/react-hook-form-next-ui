import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true
    })
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
          xlsx: 'Xlsx',
          yup: 'Yup',
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-hook-form': 'ReactHookForm',
          '@nextui-org/react': 'NextUI',
          'framer-motion': 'FramerMotion',
        },
      },
    },
  },
});