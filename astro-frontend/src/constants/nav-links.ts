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
		href: '/',
	},
	{
		type: 'expandable',
		title: 'nav.about-us',
		expandedLinks: [
			{
				title: 'nav.parish-history',
				href: '/parish-history',
			},
			{
				title: 'nav.parish-priests',
				href: '/parish-priests',
			},
			{
				title: 'nav.parish-finance-committee',
				href: '/parish-finance-committee',
			},
			{
				title: 'nav.parish-pastoral-council',
				href: '/parish-pastoral-council',
			},
			{
				title: 'nav.parish-pastoral-21-commissions',
				href: '/parish-pastoral-21-commissions',
			},
			{
				title: 'nav.parish-vocations',
				href: '/parish-vocations',
			},
			{
				title: 'nav.wards',
				href: '/wards',
			},
			{
				title: 'nav.convents',
				href: '/convents',
			},
			{
				title: 'nav.institutions',
				href: '/institutions',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.associations',
		expandedLinks: [
			{
				title: 'nav.svp',
				href: '/associations/svp',
			},
			{
				title: 'nav.icym-pyc',
				href: '/associations/icym-pyc',
			},
			{
				title: 'nav.altar-servers',
				href: '/associations/altar-servers',
			},
			{
				title: 'nav.catholic-sabha',
				href: '/associations/catholic-sabha',
			},
			{
				title: 'nav.ycs',
				href: '/associations/ycs',
			},
			{
				title: 'nav.secular-franciscan',
				href: '/associations/secular-franciscan',
			},
			{
				title: 'nav.catechism',
				href: '/associations/catechism',
			},
			{
				title: 'nav.small-christian-community',
				href: '/associations/small-christian-community',
			},
			{
				title: 'nav.gurpur-choir',
				href: '/associations/gurpur-choir',
			},
			{
				title: 'nav.womens-forum',
				href: '/associations/womens-forum',
			},
			{
				title: 'nav.christian-life-community',
				href: '/associations/christian-life-community',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.halls',
		expandedLinks: [
			{
				title: 'nav.pompei-sabha-bhavan',
				href: '/pompei-sabha-bhavan',
			},
			{
				title: 'nav.centenary-hall',
				href: '/centenary-hall',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.news',
		expandedLinks: [
			{
				title: 'nav.obituary',
				href: '/obituary',
			},
			{
				title: 'nav.events',
				href: '/events',
			},
		],
	},
	{
		type: 'link',
		title: 'nav.prayer-corner',
		href: '/prayer-corner',
	},
	{
		type: 'link',
		title: 'nav.pompeichem-falkem',
		href: '/pompeichem-falkem',
	},
	{
		type: 'link',
		title: 'nav.gallery',
		href: '/gallery',
	},
	{
		type: 'link',
		title: 'nav.contact',
		href: '/contact',
	},
] as const satisfies NavItem[];
