// node-resolve will resolve all the node dependencies
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  // All the used libs needs to be here
  external: [
    ...Object.keys(pkg.dependencies || {}),
    // ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    peerDepsExternal(),
    resolve({extensions}),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript(),
    babel({
      runtimeHelpers: true,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      extensions,
    }),
    terser({module: false}),
  ],
};
