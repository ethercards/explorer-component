import { Box } from '@mui/system';
import { ExplorerComponent } from 'explorer-component';

const PoolTest = () => {
  return (
    <>
      <Box id="homeContainer">
        <ExplorerComponent
          chainId={1}
          poolAddress={'0x0258603a5f67ADB28282AFBadEfe44c41537b3f8'}
          tokenAddres={'0xEdEc929E45e1fC9D151E2DD2c416Af4a43075bfa'}
        />
      </Box>
    </>
  );
};

export default PoolTest;
