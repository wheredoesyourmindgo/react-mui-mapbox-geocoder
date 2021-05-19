import React from 'react';
import debounceRender from 'react-debounce-render';
import {Fade, LinearProgress} from '@material-ui/core';

type Props = {
  show: boolean;
};

const debouncedProgressBar = ({show = false}: Props) => {
  return (
    <Fade in={show}>
      <LinearProgress style={{position: 'absolute', width: '100%'}} />
    </Fade>
  );
};

export default debounceRender(debouncedProgressBar, 100);
