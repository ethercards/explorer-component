import React, { useState, useEffect } from 'react';
import { Box, Button, Collapse, MenuList, Modal } from '@mui/material';
import galaxisLogo from '../assets/images/galaxis.svg';
import HeaderButton from './HeaderButton';


const BP1 = '@media (max-width: 899px)';
const BP2 = '@media (max-width: 401px)';

const sx = {
  root: {
    width: '100%',
    height: '124px',
    backgroundColor: '#FAF9F5',
    position: 'fixed',
    zIndex: 1001,
    px: '20px',
    [BP1]: {
      display: 'none',
    },
  },
  content: {
    width: '100%',
    maxWidth: '1140px',
    height: '100%',
    mx: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    maxWidth: '180px',
    cursor: 'pointer',
    zIndex: '21',
    '& img': {
      width: '100%',
    },
    [BP2]: {
      maxWidth: '130px',
    },
  },
  text: {
    '&:disabled': {
      color: '#FF692B',
    },
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    fontFamily: 'poppins',
    fontSize: '20px',
    color: '#FFF',
  },
  mobileContainer: {
    display: 'none',
    [BP1]: {
      display: 'block',
      gap: '30px',
    },
  },
  headerRoot: {
    transition: '3s ease-out',
    position: 'fixed',
    width: '100%',
    pl: '20px',
    zIndex: '1001',
    maxWidth: '1272px',
    height: '124px',
    mx: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF9F5',
  },
  collapsedMenu: {
    position: 'fixed',
    zIndex: '2222',
    width: '100%',
    mt: '100px',
    pt: '10px',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: '#FAF9F5',
    px: '20px',
    paddingBottom: '25px',
  },
  menuContainer: {
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '9px 0',
    zIndex: '1',
  },
  menuList: {
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    width: '155px',
    height: '168px',
    position: 'absolute',
    fontSize: '16px',
    boxShadow: '2px 2px 2px 3px rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    pt: '10px',
    pb: '0',
  },
  socialContainer: {
    maxHeight: '30px',
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    px: '5px',
    pt: '8px',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: '10px',
    zIndex: '2223',
  },
  disconnectButton: {
    minHeight: '40px',
    height: '40px',
    width: '120px',
    borderRadius: '5px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    backgroundColor: 'unset',
    border: '2px solid #FF692B',
    color: '#FF692B',
    marginTop: '0',
    marginLeft: '5px',
    '&:hover': {
      border: '2px solid #FF692B',
      backgroundColor: '#FF692B',
      color: '#ffffff',
    },
  },
};

const BUTTONS = [
  'Upcoming',
  'Communities',
  'Features',
  'News',
  'Streams',
  'Phoenix Burn'
  // 'Launchpad',
];
const PATHS = [
  '/#upcoming',
  '/#communities',
  '/#features',
  '/news',
  '/streams',
  '/phoenix'
  // '/launchpad',
];



const Header = ({address, disconnect}) => {
 
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);




  return (
    <>
      <Box sx={sx.root}>
        <Box sx={sx.content}>
          <Box
            sx={sx.logoContainer}
            style={{ cursor: 'pointer' }}
            onClick={() => null}
          >
            <img src={galaxisLogo} alt="Ether cards" />
          </Box>
          <Box sx={sx.btnContainer}>
            {BUTTONS.map((btn, i) => {
              return (
                <HeaderButton
                  key={btn}
                  text={btn}
                  onClick={() => null}
                />
              );
            })}

            {address && disconnect && (
              <Button
                variant="banner"
                sx={sx.disconnectButton}
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={sx.mobileContainer}>
        <Box sx={sx.headerRoot}>
          <Box
            sx={sx.logoContainer}
            style={{ marginTop: '6px' }}
            onClick={() =>null}
          >
            <img src={galaxisLogo} alt="Ether cards" />
          </Box>
      
        </Box>
        <Collapse in={menuOpened} timeout="auto" unmountOnExit>
          <Box sx={sx.collapsedMenu}>
            {BUTTONS.map((btn, i) => {
              return (
                <HeaderButton
                  key={btn}
                  text={btn}
                  onClick={() => null}
                />
              );
            })}
  
            {address && disconnect && (
              <Button
                variant="banner"
                sx={sx.disconnectButton}
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            )}
          </Box>
        </Collapse>
      </Box>      
    </>
  );
};

export default Header;
