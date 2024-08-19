interface Expandable {
	type: 'expandable';
	title: string;
	expandedLinks: {
		title: string;
		href: string;
	}[];
}

interface Link {
	type: 'link';
	title: string;
	href: string;
}

export type NavItem = Expandable | Link;

export const navLinks = [
	{
		type: 'link',
		title: 'Home',
		href: '#',
	},
	{
		type: 'expandable',
		title: 'Our Church',
		expandedLinks: [
			{
				title: 'Parish History',
				href: '#',
			},
			{
				title: 'Parish Priests',
				href: '#',
			},
			{
				title: 'Parish Pastoral Parishad',
				href: '#',
			},
			{
				title: 'Parish Pastoral Commission',
				href: '#',
			},
		],
	},
	{
		type: 'expandable',
		title: 'Institutions',
		expandedLinks: [
			{
				title: 'Our Institutions',
				href: '#',
			},
			{
				title: 'Convents',
				href: '#',
			},
			{
				title: 'Infrastructure',
				href: '#',
			},
		],
	},
	{
		type: 'expandable',
		title: 'Associations',
		expandedLinks: [
			{
				title: 'SVP',
				href: '#',
			},
			{
				title: 'ICYM (PYC)',
				href: '#',
			},
			{
				title: 'Altar Servers',
				href: '#',
			},
			{
				title: 'Catholic Sabha',
				href: '#',
			},
			{
				title: 'YCS',
				href: '#',
			},
			{
				title: 'Secular Fransican',
				href: '#',
			},
			{
				title: 'Catechism',
				href: '#',
			},
			{
				title: ' ಲ್ಹಾನ್ ಕ್ರಿಸ್ತಾಂವ್ ಸಮುದಾಯ್',
				href: '#',
			},
			{
				title: 'Gurpur Gayan Mandali',
				href: '#',
			},
			{
				title: 'Women’s Forum',
				href: '#',
			},
		],
	},
	{
		type: 'link',
		title: 'Wards',
		href: '#',
	},
	{
		type: 'link',
		title: 'News',
		href: '#',
	},

	{
		type: 'link',
		title: 'Gallery',
		href: '#',
	},
	{
		type: 'link',
		title: 'Contact',
		href: '#',
	},
] as const satisfies NavItem[];
