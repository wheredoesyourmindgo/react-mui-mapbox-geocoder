import React, {useState} from 'react';
import {Fade, LinearProgress} from '@material-ui/core';
import {useDebouncedCallback} from 'use-debounce';
import {useEffect} from 'react';

type Props = {
  show: boolean;
};

const debouncedProgressBar = ({show: showProp = false}: Props) => {
  const [show, setShow] = useState(showProp);
  useEffect(() => {
    if (showProp) {
      setShowTrue();
    } else {
      setShowTrue.flush();
      setShow(false);
    }
  }, [showProp]);
  const setShowTrue = useDebouncedCallback(() => setShow(true), 250);

  return (
    <Fade in={show}>
      <LinearProgress style={{position: 'absolute', width: '100%'}} />
    </Fade>
  );
};

export default debouncedProgressBar;
