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
		title: 'nav.home',
		href: '#',
	},
	{
		type: 'expandable',
		title: 'nav.our-church',
		expandedLinks: [
			{
				title: 'nav.parish-history',
				href: '#',
			},
			{
				title: 'nav.parish-priests',
				href: '#',
			},
			{
				title: 'nav.parish-pastoral-parishad',
				href: '#',
			},
			{
				title: 'nav.parish-pastoral-commission',
				href: '#',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.institutions',
		expandedLinks: [
			{
				title: 'nav.our-institutions',
				href: '#',
			},
			{
				title: 'nav.convents',
				href: '#',
			},
			{
				title: 'nav.infrastructure',
				href: '#',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.associations',
		expandedLinks: [
			{
				title: 'nav.svp',
				href: '#',
			},
			{
				title: 'nav.icym-pyc',
				href: '#',
			},
			{
				title: 'nav.altar-servers',
				href: '#',
			},
			{
				title: 'nav.catholic-sabha',
				href: '#',
			},
			{
				title: 'nav.ycs',
				href: '#',
			},
			{
				title: 'nav.secular-franciscan',
				href: '#',
			},
			{
				title: 'nav.catechism',
				href: '#',
			},
			{
				title: 'nav.small-christian-community',
				href: '#',
			},
			{
				title: 'nav.gurpur-gayan-mandali',
				href: '#',
			},
			{
				title: 'nav.womens-forum',
				href: '#',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.wards',
		expandedLinks: [
			{
				title: 'nav.kowdoor-a-ward',
				href: '#',
			},
			{
				title: 'nav.kowdoor-b-ward',
				href: '#',
			},
			{
				title: 'nav.pompei-a-ward',
				href: '#',
			},
			{
				title: 'nav.pompei-b-ward',
				href: '#',
			},
			{
				title: 'nav.kandar-a-ward',
				href: '#',
			},
			{
				title: 'nav.kandar-b-ward',
				href: '#',
			},
			{
				title: 'nav.monel-ward',
				href: '#',
			},
			{
				title: 'nav.gurpur-ward',
				href: '#',
			},
			{
				title: 'nav.church-ward',
				href: '#',
			},
			{
				title: 'nav.addoor-ward',
				href: '#',
			},
		],
	},
	{
		type: 'link',
		title: 'nav.news',
		href: '#',
	},

	{
		type: 'link',
		title: 'nav.gallery',
		href: '#',
	},
	{
		type: 'link',
		title: 'nav.contact',
		href: '#',
	},
] as const satisfies NavItem[];
