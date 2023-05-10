import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import logo from '../assets/images/galaxis.svg';
import twitter from '../assets/images/social/twitter.svg';
import discord from '../assets/images/social/discord.svg';
import email from '../assets/images/social/email.svg';
import EmailPopup from './EmailPopup';

const sx = {
  root: {
    position: 'absolute',
    height: '110px',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FAF9F5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialContainer: {
    maxHeight: '30px',
    display: 'flex',
    flexDirection: 'row',
    mb: '10px',
    gap: '10px',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minuscule: {
    mt: '-1px',
    fontSize: '12px',
    fontFamily: 'poppins',
    color: '#020002',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: '10px',
  },
};

const Footer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <Box sx={sx.root}>
        <Box sx={sx.socialContainer}>
          <a
            href="https://discord.com/invite/mBwauRSJNW"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box>
              <img src={discord} style={{ width: '100%' }} alt="discord" />
            </Box>
          </a>
          <a
            href="https://twitter.com/galaxisxyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box>
              <img src={twitter} style={{ width: '100%' }} alt="twitter" />
            </Box>
          </a>

          {/* <Box onClick= {()=> setModalIsOpen(true)} style={{cursor: 'pointer'}}>
              <img src={email} style={{ width: '100%' }} alt="not found" />
            </Box> */}
        </Box>
        <Box sx={sx.logo}>
          <img
            src={logo}
            style={{ width: '66px', marginRight: '7px' }}
            alt="logo"
          />
          <Typography sx={sx.minuscule}>All Rights Reserved 2022</Typography>
        </Box>
      </Box>
      <Modal
        onBackdropClick={() => {
          setModalIsOpen(false);
        }}
        sx={sx.modal}
        open={modalIsOpen}
      >
        <EmailPopup
          onClose={() => {
            setModalIsOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
export default Footer;
