import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import routes from '../../Routes';

const Home = () => {
	const BP1 = '@media (max-width: 619px)';
	const BP2 = '@media (max-width: 1348px)';
	const BP4 = '@media (max-width: 1350px)';
	const BP5 = '@media (max-width: 871px)';
	const BP6 = '@media (max-width: 471px)';
	const BP7 = '@media (max-width: 900px)';
	const BP8 = '@media (max-width: 775px)';
	const BP9 = '@media (max-width: 740px)';
	const BP10 = '@media (max-width: 600px)';
	const BP11 = '@media (max-width: 470px)';
	const BP12 = '@media (max-width: 340px)';

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
	logo: {
		width: '100%',
		maxWidth: '1140px',
		display: 'flex',
		justifyContent: 'center',
	},
	title: {
		maxWidth: '550px',
		mx: 'auto',
		textAlign: 'center',
		mt: '8px',
		[BP1]: {
		maxWidth: '300px',
		},
	},
	description: {
		mx: 'auto',
		textAlign: 'center',
		maxWidth: '638px',
		mt: '20px',
		overflowWrap: 'break-word',
		wordWrap: 'break-word',
		wordBreak: 'break-word',
	},
	cardContainer: {
		width: '100%',
		maxWidth: '1140px',
		mt: '50px',
		mx: 'auto',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		gap: '14px 12px',
		[BP2]: {
		justifyContent: 'center',
		},
	},
	collectionHelper: {
		width: '100%',
		pb: '70px',
	},

	viewbtn: {
		mt: '30px',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	project: {
		width: '360px',
		[BP6]: {
		width: '350px',
		},
	},
	existing: {
		cursor: 'pointer',
	},
	imgtitle: {
		width: '100%',
		maxWidth: '380px',
		fontFamily: 'poppins-semibold',
		fontSize: '32px',
		color: '#FAF9F5',
		lineHeight: '34px',
		mt: '17px',
		textShadow: '2px 2px 2px #000000',
		[BP9]: {
		fontSize: '21px',
		lineHeight: '24px',
		},
	},
	imgtext: {
		maxWidth: '240px',
		width: '100%',
		fontFamily: 'bau',
		fontSize: '16px',
		color: '#FAF9F5',
		lineHeight: '24px',
		mt: '8px',
		mb: '12px',
		[BP11]: {
		display: 'none',
		},
	},
	bannerGrid: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		[BP7]: {
		display: 'flex',
		flexDirection: 'ROW',
		flexWrap: 'wrap',
		mt: '-45px',
		},
	},
	box: {
		minHeight: '30px',
		maxWidth: 'fit-content',
		fontFamily: 'poppins-semibold',
		fontWeight: 500,
		borderRadius: 0,
		fontSize: '12px',
		color: '#FFF',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'uppercase',
		px: '10px',
		[BP11]: {
		minHeight: '30px',
		fontSize: '11px',
		},
	},
	imageBox: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'flex-end',
		maxHeight: '600px',
		height: '81%',
		paddingLeft: '30px',
		width: '100%',
		pr: '10px',
		[BP8]: {
		paddingLeft: '50px',
		},
		[BP10]: {
		paddingLeft: '30px',
		},
		[BP11]: {
		height: '90%',
		},
		[BP12]: {
		paddingLeft: '10px',
		paddingRight: '2px',
		},
	},
	image: {
		cursor: 'pointer',
	},
	};
	
	return(
		<>
			<Header/>
			<Box sx={sx.root} id="homeContainer">
				{routes.map(({ path, component, exact }) => (
					<>
						<Link to={path}>{path}</Link>
						<br/>
					</>
				))}

			</Box>
		</>
	);
}

export default Home;