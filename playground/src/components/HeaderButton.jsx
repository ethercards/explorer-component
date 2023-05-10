import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const BP1 = '@media (max-width: 516px)';

const sx = {
  root: {
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'right',
  },
  rootDisabled: {
    color: '#FC6C03',
    fontWeight: 700,
  },
  rootHorizontal: {
    height: '45px',
    px: '6.5px',
    pt: '10px',
    textTransform: 'uppercase',
    [BP1]: {
      px: '5px',
    },
  },
  rootVertical: {
    pl: '24px',
    py: '10px',
    pr: '20px',
  },
  text: {
    fontFamily: 'poppins',
    fontSize: '18px',
    color: '#111317',
    textAlign: 'right',
    lineHeight: '21px',
    // '&:hover': {
    //   color: '#FF692B',
    // },
  },
};

const HeaderButton = ({
  active,
  onClick,
  text,
  vertical,
  onMouseOver,
  onMouseLeave,
  style,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  const handleHover = () => {
    if (onMouseOver) {
      onMouseOver();
    }
  };
  const handleLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  };
  return (
    <Box
      sx={{
        ...sx.root,
        ...(vertical ? sx.rootVertical : sx.rootHorizontal),
        ...style,
      }}
      style={{ cursor: 'pointer' }}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
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
HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.any,
  vertical: PropTypes.bool,
  onMouseOver: PropTypes.any,
  onMouseLeave: PropTypes.any,
};

HeaderButton.defaultProps = {
  active: false,
  onClick: null,
  vertical: false,
  onMouseOver: null,
  onMouseLeave: null,
};

export default HeaderButton;
