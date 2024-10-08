import dummyImage from '~/assets/church-logo.png';
import { loremIpsum } from './lorem-ipsum';

export interface Association {
	slug: string;
	title: string;
	associationImage: ImageMetadata;
	description: string;
	officeBearers: { name: string; position: string }[];
}

const associations: Association[] = [
	{
		slug: 'svp',
		title: 'SVP',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'icym-pyc',
		title: 'ICYM (PYC)',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'altar-servers',
		title: 'Altar Servers',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'catholic-sabha',
		title: 'Catholic Sabha',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'ycs',
		title: 'Young catholic students',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'secular-franciscan',
		title: 'Secular Franciscan',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'catechism',
		title: 'Catechism',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'small-christian-community',
		title: 'Small Christian Community',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'gurpur-choir',
		title: 'Gurpur Choir',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'womens-forum',
		title: 'Womens Forum',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
	{
		slug: 'legion-of-mary',
		title: 'Legion Of Mary',
		associationImage: dummyImage,
		description: loremIpsum,
		officeBearers: [
			{ name: 'Charlie Brown', position: 'Ward Gurkaar' },
			{ name: 'Emily Davis', position: 'Ward Secretary' },
		],
	},
];

export { associations };
