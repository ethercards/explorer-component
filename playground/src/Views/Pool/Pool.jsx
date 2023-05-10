import { Box } from '@mui/system';
import { ExplorerComponent } from 'galaxis-components';
import { useEffect } from 'react';
import Header from '../../components/Header';
import useWeb3Ctx from '../../Hooks/useWeb3Ctx';

const PoolTest = () => {
  const sx = {
    root: {
      position: 'relative',
      width: '100%',
      pt: '120px',
      pb: '115px',
      mb: '100px',
      overflow: 'hidden',
      transition: 'all .3s',
      backgroundColor: '#FAF9F5',
      px: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  const { address, ethersProvider, handleConnect, handleDisconnect, chainId } =
    useWeb3Ctx();

  useEffect(() => {
    console.log('ADDR', address);
    console.log('EP', ethersProvider);
    console.log('CONNECT', handleConnect);
    console.log('CHAIN', chainId);
  }, [address]);

  return (
    <>
      <Header address={address} disconnect={handleDisconnect} />
      <Box sx={sx.root} id="homeContainer">
        <ExplorerComponent
          address={address}
          ethersProvider={ethersProvider}
          handleConnect={handleConnect}
          chainId={chainId}
        />
      </Box>
    </>
  );
};

export default PoolTest;
