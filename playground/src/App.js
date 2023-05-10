import './App.css';

import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from './Routes';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import Web3Manager from './components/Web3Manager/Web3Manager.jsx';
import { ToastContainer } from 'react-toast';

function App() {
  const sx = {
    root: {
      height: '100%',
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FAF9F5',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100%' }}>
        <HashRouter>
          <Web3Manager>
            <Switch>
              {routes.map(({ path, component, exact }) => (
                <Route
                  key={path}
                  path={path}
                  component={component}
                  exact={exact}
                />
              ))}
            </Switch>
          </Web3Manager>
        </HashRouter>
      </Box>
      <ToastContainer delay={4000} position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
