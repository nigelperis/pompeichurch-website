import cartoonia from '~/assets/cartoonia.jpg';
import pcl1 from '~/assets/pcl-poster-1.jpg';
import pcl2 from '~/assets/pcl-poster-2.jpg';
import pcl from '~/assets/pcl.jpg';

const upcomingEvents = [
	{
		endDate: '2024-12-15',
		eventImg: pcl,
		class: 'w-full rounded-sm object-cover md:w-1/3',
	},
	{
		endDate: '2024-11-27',
		eventImg: cartoonia,
		class: 'w-full rounded-sm object-cover md:w-1/4',
	},
	{
		endDate: '2024-12-15',
		eventImg: pcl1,
		class: 'w-full rounded-sm object-cover md:w-1/3',
	},
	{
		endDate: '2024-12-15',
		eventImg: pcl2,
		class: 'w-full rounded-sm object-cover md:w-1/3',
	},
];

export { upcomingEvents };
