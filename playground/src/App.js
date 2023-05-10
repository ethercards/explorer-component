import './App.css';

import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from './Routes';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

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
        </HashRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
