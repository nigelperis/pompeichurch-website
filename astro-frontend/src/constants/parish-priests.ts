import blank from '~/assets/blank.jpeg';
import frAaeColaco from '~/assets/fr-aae-colaco.jpeg';
import frAnthonyLobo from '~/assets/fr-anthony-lobo.jpg';
import frAvelineRebello from '~/assets/fr-aveline-rebello.jpg';
import frBernardDsouza from '~/assets/fr-bernard-dsouza.jpg';
import frCyprianPinto from '~/assets/fr-cyprian-pinto.jpeg';
import frFxNazreth from '~/assets/fr-fx-nazreth.jpg';
import frGregorySerrao from '~/assets/fr-gregory-serrao.jpg';
import frGracianDsouza from '~/assets/fr-greshan.jpg';
import frJohnCastelino from '~/assets/fr-john-castelino.jpg';
import frJST from '~/assets/fr-jst.jpg';
import frLeoVeigas from '~/assets/fr-leo-veigas.jpg';
import frPaulPinto from '~/assets/fr-paul-pinto.jpg';
import frPaulRego from '~/assets/fr-paul-rego.jpeg';
import frRaphaelPinto from '~/assets/fr-raphael-pinto.jpg';
import frStanleyPeriera from '~/assets/fr-stanley-periera.jpeg';
import frRudolphDsa from '~/assets/fr-ravi-dsa.jpg';
import dnVikasPereira from '~/assets/dn-vikas-pereira.jpg'

const parishPriests = [
	{
		imageUrl: frAaeColaco,
		name: 'aaecolaco',
		date: '1921-22',
	},
	{
		imageUrl: frFxNazreth,
		name: 'fxnazreth',
		date: '1922-30',
	},
	{
		imageUrl: frRaphaelPinto,
		name: 'raphaelpinto',
		date: '1930-33',
	},
	{
		imageUrl: frAvelineRebello,
		name: 'avelinerebello',
		date: '1933-40',
	},
	{
		imageUrl: blank,
		name: 'ajnazreth',
		date: '1940-48',
	},
	{
		imageUrl: frJohnCastelino,
		name: 'johncastelino',
		date: '1948-55',
	},
	{
		imageUrl: frJST,
		name: 'jstrodrigues',
		date: '1955-71',
	},
	{
		imageUrl: frBernardDsouza,
		name: 'bernarddsouza',
		date: '1971-72',
	},
	{
		imageUrl: frGracianDsouza,
		name: 'graciandsouza',
		date: '1972-83',
	},
	{
		imageUrl: frStanleyPeriera,
		name: 'stanlypereira',
		date: '1983-91',
	},
	{
		imageUrl: frLeoVeigas,
		name: 'leoveigas',
		date: '1991-98',
	},
	{
		imageUrl: frCyprianPinto,
		name: 'cyprianpinto',
		date: '1998-05',
	},
	{
		imageUrl: frPaulRego,
		name: 'paulrego',
		date: '2005-13',
	},
	{
		imageUrl: frGregorySerrao,
		name: 'gregoryserrao',
		date: '2013-15',
	},
	{
		imageUrl: frPaulPinto,
		name: 'paulpinto',
		date: '2015-16',
	},
	{
		imageUrl: frAnthonyLobo,
		name: 'anthonylobo',
		date: '2016-22',
	},
	//TODO: temporary date, updated once father leaves
	{
		imageUrl: frRudolphDsa,
		name: 'rudolphdsa',
		date: '2022-Present'
	},
	//TODO: temporary card, remove once deacon leaves
	{
		imageUrl: dnVikasPereira,
		name: 'vikaspereira',
		date: '2024-Present'
	}
];

export { parishPriests };
