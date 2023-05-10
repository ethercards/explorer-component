import { createTheme } from '@mui/material';
const BP1 = '@media (max-width: 600px)';
const COLORS = {
  primaryColor: '#FF692B',
  blue2: '#00A5F7',
  blue3: '#7FC4FD',
  blue4: '#BCE0FD',
  grey: '#F1F9FF',
  light: '#FFF',
};

const theme = createTheme({
  typography: {
    fontFamily: 'bau',
    fontSize: '16px',
    color: '#030000',
    bannerTitle: {
      fontFamily: 'poppins-semibold',
      fontSize: '36px',
      lineHeight: '50px',
      width: '100%',
      zIndex: 10,
      transition: 'all .3s',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },
    bannerText: {
      fontSize: '16px',
      lineHeight: '24px',
      width: '100%',
      zIndex: 10,
      fontFamily: 'bau',
      transition: 'all .3s',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },
    projectSubtitle: {
      fontFamily: 'poppins-semibold',
      textTransform: 'unset',
      color: '#000',
      fontSize: '36px',
      lineHeight: '50px',
      width: '100%',
      zIndex: 10,
      transition: 'all .3s',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },
    bannerCubeText: {
      fontFamily: 'cubano',
      color: '#FAF9F6',
      fontSize: '40px',
      lineHeight: '40px',
      width: '100%',
      zIndex: 10,
      transition: 'all .3s',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },
    footerText: {
      color: '#FFFFFF',
      opacity: '60%',
      fontFamily: 'poppins',
      fontSize: '14px',
    },
    footerTitle: {
      color: '#FAF4F2',
      fontFamily: 'cubano',
      fontSize: '22px',
      marginBottom: '24px',
    },
    minuscule: {
      fontFamily: 'poppins',
      fontSize: '14px',
      lineHeight: '5,06px',
      color: '#1C1D22',
    },
    heading: {
      fontFamily: 'poppins-semibold',
      fontSize: '26px',
      lineHeight: '22px',
      color: '#1C1D22',
    },
  },
  palette: {
    primary: {
      main: COLORS.primaryColor,
    },
    background: {
      socialIcon: COLORS.blue2,
      grey: COLORS.grey,
      infoBox: COLORS.blue3,
      image: COLORS.blue4,
      light: COLORS.light,
    },
    light: {
      main: '#FFF',
    },
    text: {
      primary: '#FFF',
    },
    error: {
      main: '#EE1B11',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          color: COLORS.blue1,
          fontFamily: 'poppins',
          fontSize: '18px',
        },
      },
      defaultProps: {
        variantMapping: {
          body1: 'div',
          bannerTitle: 'div',
          bannerText: 'div',
          heading1: 'div',
          heading2: 'div',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#FFF',
          height: '48px',
          fontSize: '16px',
          fontWeight: 600,
        },
        banner: {
          minHeight: '55px',
          fontFamily: 'poppins',
          fontWeight: 500,
          borderRadius: 0,
          fontSize: '14px',
          color: '#FFF',
          backgroundColor: '#FF692B',
          '&:hover': {
            backgroundColor: '#FF692B',
          },
        },
        collectionCard: {
          borderRadius: '5px',
          minHeight: '54px',
          fontFamily: 'poppins-semibold',
          fontSize: '14px',
          color: '#FF692B',
          border: '2px solid #FF692B',
          '&:hover': {
            border: '2px solid #FF692B',
            backgroundColor: '#FF692B',
            color: '#FFF',
          },
        },
      },
    },
  },
});

export default theme;
