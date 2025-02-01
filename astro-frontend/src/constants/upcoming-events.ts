import cartoonia from '~/assets/upcoming-events/cartoonia.jpg';
import pcl1 from '~/assets/upcoming-events/pcl-poster-1.jpg';
import pcl2 from '~/assets/upcoming-events/pcl-poster-2.jpg';
import pcl from '~/assets/upcoming-events/pcl.jpg';
import pycAnnualDay1 from '~/assets/upcoming-events/pyc-annual-day-1.jpg';
import pycAnnualDay2 from '~/assets/upcoming-events/pyc-annual-day-2.jpg';
import wordOfGodSunday from '~/assets/upcoming-events/word-of-god-sunday.jpg';

const upcomingEvents = [
	{
		endDate: '2025-02-09',
		eventImg: pycAnnualDay1,
		class: 'w-full rounded-sm md:w-1/3',
	},
	{
		endDate: '2025-02-09',
		eventImg: pycAnnualDay2,
		class: 'w-full rounded-sm md:w-1/3',
	},
	{
		endDate: '2025-01-26',
		eventImg: wordOfGodSunday,
		class: 'w-full rounded-sm md:w-1/3',
	},
	{
		endDate: '2024-12-15',
		eventImg: pcl,
		class: 'w-full rounded-sm md:w-1/3',
	},
	{
		endDate: '2024-11-27',
		eventImg: cartoonia,
		class: 'w-full rounded-sm md:w-1/4',
	},
	{
		endDate: '2024-12-15',
		eventImg: pcl1,
		class: 'w-full rounded-sm md:w-1/3',
	},
	{
		endDate: '2024-12-15',
		eventImg: pcl2,
		class: 'w-full rounded-sm md:w-1/3',
	},
];

export { upcomingEvents };
