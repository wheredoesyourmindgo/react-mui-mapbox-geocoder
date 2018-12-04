import * as React from 'react';
import debounceRender from 'react-debounce-render';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

const debouncedProgressBar = (props) => {
  return (
    <Fade in={props.show}>
      <LinearProgress style={{position: 'absolute', width: '100%'}} />
    </Fade>
  );
};

debouncedProgressBar.propTypes = {
  show: PropTypes.bool.isRequired
};

export default debounceRender(debouncedProgressBar, 100);
