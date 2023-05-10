import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import whitetwitter from '../assets/images/social/whitetwitter.png';
import whitediscord from '../assets/images/social/whitediscord.png';
import instagram from '../assets/images/social/instagram.svg';

const sx = {
  root: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '1',
  },
};

const CONFIG = {
  instagram: {
    url: 'https://instagram.com/toddlerpillars',
    image: instagram,
  },
  twitter: {
    url: 'https://twitter.com/ether_cards',
    image: whitetwitter,
  },
  discord: {
    url: 'https://discord.com/invite/mBwauRSJNW',
    image: whitediscord,
  },
};

const FooterSocialButton = ({ variant, style }) => {
  const { url, image } = CONFIG[variant];
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Box sx={sx.root} style={{ ...style }}>
        <img src={image} style={{ width: '100%' }} alt={variant} />
      </Box>
    </a>
  );
};

FooterSocialButton.propTypes = {
  variant: PropTypes.oneOf(['twitter', 'discord', 'instagram']).isRequired,
};

export default FooterSocialButton;
