// node-resolve will resolve all the node dependencies
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@material-ui/core': 'Material-UI'
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  // All the used libs needs to be here
  external: [
    'autosuggest-highlight/match',
    'autosuggest-highlight/parse',
    'isomorphic-unfetch',
    'classnames',
    'lodash.isnil',
    'lodash.omitby',
    'react-debounce-render',
    'react-autosuggest',
    'color-alpha',
    Object.keys(globals)
    // 'react',
    // 'prop-types',
    // '@material-ui/core/Fade',
    // '@material-ui/core/Grid',
    // '@material-ui/core/IconButton',
    // '@material-ui/core/InputAdornment',
    // '@material-ui/core/LinearProgress',
    // '@material-ui/core/MenuItem',
    // '@material-ui/core/Paper',
    // '@material-ui/core/styles',
    // '@material-ui/core/TextField',
    // '@material-ui/core/Typography',
    // '@material-ui/icons/Cancel',
    // '@material-ui/icons/Search'
  ],
  plugins: [
    peerDepsExternal(),
    resolve({extensions}),
    commonjs({
      include: '**/node_modules/**',
      namedExports: {}
    }),
    typescript(),
    babel({
      runtimeHelpers: true,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      extensions
    })
  ]
};
