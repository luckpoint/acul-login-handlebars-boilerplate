import { defineConfig } from 'vite';
import { handlebarsPrecompile } from 'vite-plugin-handlebars-precompile';

export default defineConfig(({ mode }) => ({
  plugins: [
    handlebarsPrecompile({
      enableMinification: mode === 'production',
      mode: mode,
      minificationLevel: 'aggressive' // 'conservative' | 'aggressive'
    })
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: mode !== 'production', // 開発環境でのみ有効
    rollupOptions: {
      input: 'src/main.ts', // Specify TypeScript file directly as entry point
      output: {
        entryFileNames: 'index.js', // Single JavaScript output file
        assetFileNames: 'index.css', // Single CSS output file        
      }
    },

    cssCodeSplit: false, // Disable CSS code-splitting to bundle CSS in one file
  }
}));

