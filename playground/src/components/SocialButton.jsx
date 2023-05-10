import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import twitter from '../assets/images/social/twitter.svg';
import discord from '../assets/images/social/discord.svg';
import instagram from '../assets/images/social/instagram.svg';
import web from '../assets/images/social/web.svg';
import facebook from '../assets/images/social/facebook.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
    image: instagram,
  },
  twitter: {
    image: twitter,
  },
  discord: {
    image: discord,
  },
  web: {
    image: web,
  },
  facebook: {
    image: facebook,
  },
};
const PREVIEWCONFIG = {
  Instagram: {
    image: instagram,
  },
  Twitter: {
    image: twitter,
  },
  Discord: {
    image: discord,
  },
  Website: {
    image: web,
  },
  Facebook: {
    image: facebook,
  },
};

const SocialButton = ({ url, variant, style, icon }) => {
  const history = useHistory();
  const route = history.location.pathname;
  const routeArray = route.split('/');
  console.log(icon);
  const image =
    routeArray[1] !== 'preview' ? CONFIG[variant] : PREVIEWCONFIG[variant];
  return (
    <>
      {url !== '' && icon !== '' && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Box sx={sx.root} style={{ ...style }}>
            <img src={icon} style={{ width: '100%' }} alt="social_icon" />
          </Box>
        </a>
      )}
    </>
  );
};

export default SocialButton;
