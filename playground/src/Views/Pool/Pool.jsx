import { Box } from '@mui/system';
import { ExplorerComponent } from 'explorer-component';

const PoolTest = () => {
  return (
    <>
      <Box id="homeContainer">
        <ExplorerComponent
          chainId={137}
          poolAddress={'0x98Fd3D4e35A78436a054Bada6b9725c42577466f'}
          tokenAddres={'0xd7041D13887F4aB96Db72b9532579DCd842768D6'}
        />
      </Box>
    </>
  );
};

export default PoolTest;
