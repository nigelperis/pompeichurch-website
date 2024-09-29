
import fraaecolaco from '~/assets/FrAAEColaco.jpeg';
import frfxnazreth from '~/assets/FrFXNazreth.jpg';
import frarebello from '~/assets/FrARebello.jpg';
import blankp from '~/assets/blankp.png';
import frjohnc from '~/assets/FrJohnC.jpg';
import frbernard from '~/assets/FrBernard.jpg';
import frstany from '~/assets/FrStany.jpeg';
import frleo from '~/assets/FrLeo.jpeg';
import frcyprian from '~/assets/FrCyprian.jpeg';
import frpaulrego from '~/assets/FrPaulRego.jpeg';
import frgregory from '~/assets/FrGregory.jpg';
import frpaulp from '~/assets/FrPaulPinto.jpg';
import ProfileCard from '~/components/profile-card.astro';

const parishPriests = [
	{
		imageUrl: fraaecolaco,
		name: 'priest.aaecolaco',
		date: '1921-22',
	},
	{
		imageUrl: frfxnazreth,
		name: 'priest.fxnazreth',
		date: '1922-30',
	},
	{
		imageUrl: frleo,
		name: 'priest.raphaelpinto',
		date: '1930-33',
	},
	{
		imageUrl: frarebello,
		name: 'priest.avelinerebello',
		date: '1933-40',
	},
	{
		imageUrl: blankp,
		name: 'priest.ajnazreth',
		date: '1940-48',
	},
	{
		imageUrl: frjohnc,
		name: 'priest.johncastelino',
		date: '1948-55',
	},
	{
		imageUrl: frleo,
		name: 'priest.jstrodrigues',
		date: '1955-71',
	},
	{
		imageUrl: frbernard,
		name: 'priest.bernardsouza',
		date: '1971-72',
	},
	{
		imageUrl: frleo,
		name: 'priest.graciandsouza',
		date: '1972-83',
	},
	{
		imageUrl: frstany,
		name: 'priest.stanyperiera',
		date: '1983-91',
	},
	{
		imageUrl: frleo,
		name: 'priest.leoveigas',
		date: '1991-98',
	},
	{
		imageUrl: frcyprian,
		name: 'priest.cyprianpinto',
		date: '1998-05',
	},
	{
		imageUrl: frpaulrego,
		name: 'priest.paulrego',
		date: '2005-13',
	},
	{
		imageUrl: frgregory,
		name: 'priest.gregoryserrao',
		date: '2013-15',
	},
	{
		imageUrl: frpaulp,
		name: 'priest.paulpinto',
		date: '2015-16',
	},
	{
		imageUrl: frleo,
		name: 'priest.anthonylobo',
		date: '2016-22',
	},
];


export {parishPriests}