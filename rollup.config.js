// node-resolve will resolve all the node dependencies
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  // All the used libs needs to be here
  external: [
    'autosuggest-highlight/match',
    'autosuggest-highlight/parse',
    'axios',
    'classnames',
    'lodash.isnil',
    'lodash.omitby',
    'react',
    'react-debounce-render',
    'prop-types',
    'react-autosuggest',
    '@material-ui/core/Fade',
    '@material-ui/core/Grid',
    '@material-ui/core/IconButton',
    '@material-ui/core/InputAdornment',
    '@material-ui/core/LinearProgress',
    '@material-ui/core/MenuItem',
    '@material-ui/core/Paper',
    '@material-ui/core/styles',
    '@material-ui/core/TextField',
    '@material-ui/core/Typography',
    '@material-ui/icons/Cancel',
    '@material-ui/icons/Search'
  ],
  plugins: [
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**' // Default: undefined
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};
