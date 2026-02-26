interface Expandable {
  type: "expandable";
  title: string;
  expandedLinks: {
    title: string;
    href: string;
  }[];
}

interface Link {
  type: "link";
  title: string;
  href: string;
}

export type NavItem = Expandable | Link;

export const navLinks = [
  {
    type: "link",
    title: "nav.home",
    href: "/",
  },
  {
    type: "expandable",
    title: "nav.about-us",
    expandedLinks: [
      {
        title: "nav.patron",
        href: "/patron-of-our-parish",
      },
      {
        title: "nav.parish-history",
        href: "/parish-history",
      },
      {
        title: "nav.parish-priests-and-deacons",
        href: "/parish-priests-and-deacons",
      },
      {
        title: "nav.parish-pastoral-council",
        href: "/parish-pastoral-council",
      },
      {
        title: "nav.parish-finance-committee",
        href: "/parish-finance-committee",
      },
      {
        title: "nav.parish-pastoral-commissions",
        href: "/parish-pastoral-commissions",
      },
      {
        title: "nav.ex-vp-secretaries",
        href: "/ex-vp-secretaries",
      },
      {
        title: "nav.religious-vocations",
        href: "/religious-vocations",
      },
      {
        title: "nav.wards",
        href: "/wards",
      },
      {
        title: "nav.convents",
        href: "/convents",
      },
      {
        title: "nav.institutions",
        href: "/institutions",
      },
    ],
  },
  {
    type: "expandable",
    title: "nav.associations",
    expandedLinks: [],
  },
  {
    type: "expandable",
    title: "nav.halls",
    expandedLinks: [
      {
        title: "nav.pompei-sabha-bhavan",
        href: "/pompei-sabha-bhavan",
      },
      {
        title: "nav.centenary-hall",
        href: "/centenary-hall",
      },
    ],
  },
  {
    type: "expandable",
    title: "nav.news",
    expandedLinks: [
      {
        title: "nav.obituary",
        href: "/obituary",
      },
      {
        title: "nav.events",
        href: "/events",
      },
      {
        title: "nav.parishioners-achievements",
        href: "/parishioners-achievements",
      },
    ],
  },
  {
    type: "link",
    title: "nav.prayer-corner",
    href: "/prayer-corner",
  },
  {
    type: "link",
    title: "nav.pompeichem-falkem",
    href: "/pompeichem-falkem",
  },
  {
    type: "link",
    title: "nav.gallery",
    href: "/gallery",
  },
  {
    type: "link",
    title: "nav.contact",
    href: "/contact",
  },
] as const satisfies NavItem[];
