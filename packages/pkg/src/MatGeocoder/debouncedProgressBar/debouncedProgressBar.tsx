import React, {useState, useEffect} from 'react';
import {Fade, LinearProgress} from '@material-ui/core';
import {useDebouncedCallback} from 'use-debounce';

type Props = {
  show: boolean;
};

const DebouncedProgressBar = ({show: showProp = false}: Props) => {
  const [show, setShow] = useState(showProp);

  const setShowTrue = useDebouncedCallback(() => setShow(true), 250);

  useEffect(() => {
    if (showProp) {
      setShowTrue();
    } else {
      setShowTrue.flush();
      setShow(false);
    }
  }, [setShowTrue, showProp]);

  return (
    <Fade in={show}>
      <LinearProgress style={{position: 'absolute', width: '100%'}} />
    </Fade>
  );
};

export default DebouncedProgressBar;
