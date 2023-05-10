import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const sx = {
  root: {
    cursor: 'pointer',
    position: 'relative',
  },
  rootDisabled: {
    color: '#FF692B',
    fontWeight: '900',
  },
  rootHorizontal: {
    height: '54px',
    px: '14px',
    pt: '10px',
  },
  rootVertical: {
    pl: '24px',
    pr: '20px',
  },
  text: {
    fontFamily: 'poppins',
    fontSize: '16px',
    color: '#111317',
    lineHeight: '29px',
  },
};

const VerticalHeaderButton = ({
  active,
  onClick,
  text,
  vertical,
  onMouseOver,
}) => {
  const handleClick = () => {
    onClick();
  };
  const handleHover = () => {
    if (onMouseOver) {
      onMouseOver();
    }
  };
  return (
    <Box
      sx={{ ...sx.root, ...(vertical ? sx.rootVertical : sx.rootHorizontal) }}
      onMouseOver={handleHover}
      onClick={handleClick}
    >
      <Typography
        sx={{ ...sx.text, ...(active ? sx.rootDisabled : {}) }}
        variant="text"
      >
        {text}
      </Typography>
    </Box>
  );
};
/* eslint-disable react/forbid-prop-types */
VerticalHeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.any,
  vertical: PropTypes.bool,
  onMouseOver: PropTypes.any,
};

VerticalHeaderButton.defaultProps = {
  active: false,
  onClick: null,
  vertical: false,
  onMouseOver: null,
};

export default VerticalHeaderButton;
