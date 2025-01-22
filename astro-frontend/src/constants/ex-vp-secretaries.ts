//Administrators
import placeholderImage from '~/assets/parish-priests/blank.jpeg';
import trindadPinto from '~/assets/vice-presidents/trindad-pinto.jpeg';
import rosarioMendonca from '~/assets/vice-presidents/rosario-mendonca.jpeg';
import baptistRasquinha from '~/assets/vice-presidents/baptist-rasquinha.jpeg';
import richardRodrigues from '~/assets/vice-presidents/richard-rodrigues.jpeg';
import hilaryPinto from '~/assets/vice-presidents/hilary-pinto.jpeg';
import alexLobo from '~/assets/vice-presidents/alex-lobo.jpeg';

//Vice-Presidents
import eliasRodrigues from '~/assets/vice-presidents/elias-rodrigues.jpeg';
import georgePinto from '~/assets/vice-presidents/george-pinto.jpeg';
import jeraldRasquinha from '~/assets/vice-presidents/jerald-rasquinha.jpeg';
import johnsonLobo from '~/assets/vice-presidents/johnson-lobo.jpg';
import richardFernandes from '~/assets/vice-presidents/richard-fernandes.jpeg';
import richardLobo from '~/assets/vice-presidents/richard-lobo.jpeg';
import romansLobo from '~/assets/vice-presidents/romans-lobo.jpg';
import wilfredPinto from '~/assets/vice-presidents/wilfred-pinto.jpeg';

//Secretaries
import agnesRodrigues from '~/assets/secretaries/agnes-rodrigues.jpeg';
import alexDsouza from '~/assets/secretaries/alex-dsouza.jpeg';
import benedictPeris from '~/assets/secretaries/benedict-peris.jpeg';
import jeraldLobo from '~/assets/secretaries/jerald-lobo.jpeg';
import lillyMathias from '~/assets/secretaries/lilly-mathias.jpeg';
import oswaldPeris from '~/assets/secretaries/oswald-peris.jpeg';
import srJacintha from '~/assets/secretaries/sr-jacintha.jpeg';

const treasurers = [
	{
		imageUrl: placeholderImage,
		name: 'parodrigues',
	},
	{
		imageUrl: placeholderImage,
		name: 'benjaminpais',
	},
	{
		imageUrl: placeholderImage,
		name: 'rosariodsouza',
	},
	{
		imageUrl: placeholderImage,
		name: 'kashmirtauro',
	},
	{
		imageUrl: trindadPinto,
		name: 'trindadpinto',
	},
	{
		imageUrl: rosarioMendonca,
		name: 'rosariomendonca',
	},
	{
		imageUrl: baptistRasquinha,
		name: 'baptistrasquinha',
	},
];

const administrators = [
	{
		imageUrl: richardRodrigues,
		name: 'richardrodrigues',
	},
	{
		imageUrl: hilaryPinto,
		name: 'hilarypinto',
	},
	{
		imageUrl: alexLobo,
		name: 'alexlobo',
	}
];

const vicePresidents = [
	{
		imageUrl: georgePinto,
		name: 'georgepinto',
		term: '06-03-1986 : 31-05-1991',
	},
	{
		imageUrl: eliasRodrigues,
		name: 'eliasrodrigues',
		term: '01-06-1991 : 31-05-1994',
	},
	{
		imageUrl: jeraldRasquinha,
		name: 'jeraldrasquinha',
		term1: '01-06-1994 : 31-05-1998',
	},
	{
		imageUrl: richardLobo,
		name: 'richardlobo',
		term: '01-06-1998 : 31-05-2000',
	},
	{
		imageUrl: wilfredPinto,
		name: 'wilfredpinto',
		term: '01-06-2000 : 31-05-2003',
	},
	{
		imageUrl: johnsonLobo,
		name: 'johnsonlobo',
		term1: '01-06-2003 : 31-05-2010',
		term2: '01-01-2014 : 31-12-2016',
	},
	{
		imageUrl: romansLobo,
		name: 'romanslobo',
		term: '01-01-2011 : 31-12-2013',
		// term2: ''
	},
	{
		imageUrl: richardFernandes,
		name: 'richardfernandes',
		term1: '01-01-2017 : 31-12-2019',
		term2: '01-01-2020 : 31-12-2020',
	},
];

const secretaries = [
	{
		imageUrl: alexDsouza,
		name: 'alexdsouza',
		term: '01-02-1982 : 31-05-1985',
	},
	{
		imageUrl: agnesRodrigues,
		name: 'agnesrodrigues',
		term: '01-06-1985 : 30-11-1985',
	},
	{
		imageUrl: srJacintha,
		name: 'srjacintha',
		term: '01-12-1985 : 31-05-1986',
	},
	{
		imageUrl: benedictPeris,
		name: 'benedictperis',
		term: '01-06-1986 : 31-05-1988',
	},
	{
		imageUrl: oswaldPeris,
		name: 'oswaldperis',
		term1: '01-06-1988 : 31-05-1991',
		term2: '01-06-2006 : 31-12-2010',
	},
	{
		imageUrl: jeraldRasquinha,
		name: 'jeraldrasquinha',
		term: '01-06-1991 : 31-05-1994',
	},
	{
		imageUrl: wilfredPinto,
		name: 'wilfredpinto',
		term1: '01-06-1994 : 31-05-2000',
		term2: '01-06-2006 : 31-12-2010',
	},
	{
		imageUrl: lillyMathias,
		name: 'lillymathias',
		term1: '01-06-2000 : 31-05-2003',
		term2: '01-01-2014 : 31-12-2016',
	},
	{
		imageUrl: richardFernandes,
		name: 'richardfernandes',
		term: '01-01-2011 : 31-12-2013',
	},
	{
		imageUrl: jeraldLobo,
		name: 'jeraldlobo',
		term1: '01-01-2017 : 31-12-2019',
		term2: '01-01-2020 : 31-12-2020',
	},
	// {
	//   imageUrl: johnsonLobo,
	//   name: 'johnsonlobo',
	//   period: '',
	// },
];

export { treasurers, administrators, secretaries, vicePresidents };
