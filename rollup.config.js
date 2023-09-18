import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: 'dist/library.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/library.js'
      }
    ],
    plugins: [
      peerDepsExternal(),
      typescript({ sourceMap: false }),
      vue({
        // Dynamically inject styles into the head tag (useful for development)
        // or extract to a CSS file (useful for production).
        css: true,
        // Compile template blocks to render functions
        compileTemplate: true,
      }),
      // If you prefer using PostCSS, replace rollup-plugin-scss with rollup-plugin-postcss
      scss({
        output: 'dist/library.css'
      }),
    ]
  }
];