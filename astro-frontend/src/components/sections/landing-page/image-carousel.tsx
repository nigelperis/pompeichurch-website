import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import ciboriumImage from '~/assets/ciborium.jpg';
import maryGrottoImage from '~/assets/mary-grotto.jpg';
import sacramentImage from '~/assets/sacrament.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ImageCarousel() {
	return (
		<div>
			{/* <h2
				className="font-poppins border-l-4 border-natgeo-yellow pl-3 text-3xl font-extrabold opacity-0"
				data-animate-on-view="animate-slidein-left"
			>
				Parish gallery
			</h2> */}

			<Swiper
				modules={[Navigation, Pagination, A11y, Autoplay]}
				spaceBetween={50}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				autoplay
			>
				<SwiperSlide>
					<ImageCard image={sacramentImage.src} />
				</SwiperSlide>

				<SwiperSlide>
					<ImageCard image={ciboriumImage.src} />
				</SwiperSlide>

				<SwiperSlide>
					<ImageCard image={maryGrottoImage.src} />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}

export default ImageCarousel;

interface WideCardProps {
	image: string;
}

function ImageCard({ image }: WideCardProps) {
	return (
		<div
			className="relative flex h-72 w-full flex-shrink-0 items-end overflow-hidden rounded-sm bg-cover bg-center"
			style={{ backgroundImage: `url(${image})` }}
		>
			{/* <div className="w-full bg-black bg-opacity-50 p-4 text-xl text-white">
				{text}
			</div> */}
		</div>
	);
}
