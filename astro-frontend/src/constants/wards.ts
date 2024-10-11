import dummyImage from '~/assets/church-logo.png';
import { loremIpsum } from './lorem-ipsum';

export interface Ward {
  slug: string;
  title: string;
  patronImage: ImageMetadata;
	wardGroupImageSrc: ImageMetadata;
	description: string;
	officeBearers: { name: string; position: string }[];
}

const wards: Ward[] = [
  {
    slug: 'kowdoor-a',
    title: 'Kowdoor A',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'John Doe', position: 'Ward Gurkaar' },
      { name: 'Jane Smith', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'kowdoor-b',
    title: 'Kowdoor B',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Alice Johnson', position: 'Ward Gurkaar' },
      { name: 'Bob Williams', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'pompei-a',
    title: 'Pompei A',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'pompei-b',
    title: 'Pompei B',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'kandar-a',
    title: 'Kandar A',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'kandar-b',
    title: 'Kandar B',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'monel',
    title: 'Monel',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'gurpur',
    title: 'Gurpur',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'church',
    title: 'Church',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
  {
    slug: 'addoor',
    title: 'Addoor',
    patronImage: dummyImage,
    wardGroupImageSrc: dummyImage,
    description: loremIpsum,
    officeBearers: [
      { name: 'Charlie Brown', position: 'Ward Gurkaar' },
      { name: 'Emily Davis', position: 'Ward Secretary' },
    ],
  },
];

export { wards }