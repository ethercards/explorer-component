import React from 'react';
import {
	Box, Typography, TextField, Button,
} from '@mui/material';
import SocialButton from './SocialButton';
import logo from '../assets/images/favicon.png';
import FooterSocialButton from './FooterSocialButton';

const BP1 = '@media (max-width: 1420px)';

const sx = {
	root: {
		px: '10px',
		py: '10px',
		width: '100%',
		minHeight: '366px',
		backgroundColor: '#000103',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		mt: '40px',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: '40px 180px',
	},
	joinText: {
		maxWidth: '275px',
		lineHeight: '26px',
		fontFamily: 'poppins-semibold',
		fontSize: '22px',
		color: '#FFFFFF',
		[BP1]: {
			textAlign: 'center',
			maxWidth: '340px',
			px: '20px',
		},
	},
	menuContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
		gap: '20px 50px',
	},
	minuscula: {
		mt: '75px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	minusculaText: {
		fontSize: '12px',
		color: '#B7B1B7',
		opacity: '50%',
		lineHeight: '16px',
	},
	logoContainer: {
		px: '6px',
	},
	menu: {
		width: '134px',
		display: 'flex',
		flexDirection: 'column',
		gap: '7px',
		[BP1]:{
			alignItems: 'center',
		},
	},
	socialContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: '16px',
	},
	subscribe: {
		mt: '15px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		height: '50px',
		backgroundColor: '#24272C',
		color: '#FFF',
	},
	subscribeButton: {
		backgroundColor: '#FF692B',
		fontFamily: 'poppins-medium',
		borderRadius: '0',
		height: '48px',
		width: '105px',
		color: '#FFF',
		fontSize: '14px',
	},
};

const PageFooter = () => (
	<Box sx={sx.root}>
		<Box sx={sx.content}>
			<Box sx={sx.join}>
				<Typography sx={sx.joinText}>
					Join The Community to stay up to date
				</Typography>
				<Box sx={sx.subscribe}>
					<TextField
						value='Email adress'
						sx={sx.text}
					/>
					<Button sx={sx.subscribeButton}>Subscribe</Button>
				</Box>
			</Box>
			<Box sx={sx.menuContainer}>
				<Box sx={sx.menu}>
					<Typography variant='footerTitle'>Core</Typography>
					<Typography variant='footerText'>Menu01</Typography>
					<Typography variant='footerText'>Menu02</Typography>
					<Typography variant='footerText'>Menu03</Typography>
				</Box>
				<Box sx={sx.menu}>
					<Typography variant='footerTitle'>Community</Typography>
					<Typography variant='footerText'>Menu01</Typography>
					<Typography variant='footerText'>Menu02</Typography>
					<Typography variant='footerText'>Menu03</Typography>
				</Box>
				<Box sx={sx.menu}>
					<Typography variant='footerTitle'>About Us</Typography>
					<Typography variant='footerText'>Menu01</Typography>
					<Typography variant='footerText'>Menu02</Typography>
					<Typography variant='footerText'>Menu03</Typography>
				</Box>
				<Box sx={sx.menu}>
					<Typography variant='footerTitle'>Dust</Typography>
					<Typography variant='footerText'>Menu01</Typography>
					<Typography variant='footerText'>Menu02</Typography>
					<Typography variant='footerText'>Menu03</Typography>
				</Box>
				<Box sx={sx.menu}>
					<Typography variant='footerTitle'>Contact</Typography>
					<Box sx={sx.socialContainer}>
						<FooterSocialButton variant='discord' style={{ width: '28px', justifyContent: 'flex-start', opacity: '60%' }} />
						<FooterSocialButton variant='twitter' style={{ width: '28px', justifyContent: 'flex-start', opacity: '60%' }} />
					</Box>
				</Box>
			</Box>
		</Box>
		<Box sx={sx.minuscula}>
			<Typography sx={sx.minusculaText}>ALll Right Reserved</Typography>
			<Box sx={sx.logoContainer}>
				<img src={logo} alt='Ether cards' style={{width: '40px'}}/>
			</Box>
			<Typography sx={sx.minusculaText}>20121 Privacy policy</Typography>
		</Box>
	</Box>
);
export default PageFooter;
