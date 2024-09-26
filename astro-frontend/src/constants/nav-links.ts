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
		title: 'nav.our-church',
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
				title: 'nav.parish-pastoral-council',
				href: '/parish-pastoral-council',
			},
			{
				title: 'nav.parish-pastoral-21-commissions',
				href: '/parish-pastoral-21-commissions',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.institutions',
		expandedLinks: [
			{
				title: 'nav.our-institutions',
				href: '/our-institutions',
			},
			{
				title: 'nav.our-convents',
				href: '/our-convents',
			},
			{
				title: 'nav.infrastructure',
				href: '/infrastructure',
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
				title: 'nav.legion-of-mary',
				href: '/associations/legion-of-mary',
			},
		],
	},
	{
		type: 'expandable',
		title: 'nav.wards',
		expandedLinks: [
			{
				title: 'nav.kowdoor-a-ward',
				href: '/wards/kowdoor-a',
			},
			{
				title: 'nav.kowdoor-b-ward',
				href: '/wards/kowdoor-b',
			},
			{
				title: 'nav.pompei-a-ward',
				href: '/wards/pompei-a',
			},
			{
				title: 'nav.pompei-b-ward',
				href: '/wards/pompei-b',
			},
			{
				title: 'nav.kandar-a-ward',
				href: '/wards/kandar-a',
			},
			{
				title: 'nav.kandar-b-ward',
				href: '/wards/kandar-b',
			},
			{
				title: 'nav.monel-ward',
				href: '/wards/monel',
			},
			{
				title: 'nav.gurpur-ward',
				href: '/wards/gurpur',
			},
			{
				title: 'nav.church-ward',
				href: '/wards/church',
			},
			{
				title: 'nav.addoor-ward',
				href: '/wards/addoor',
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
			{
				title: 'nav.pompeichem-falkem',
				href: '/pompeichem-falkem',
			},
		],
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
