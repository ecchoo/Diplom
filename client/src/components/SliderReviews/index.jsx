import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Woman from '/woman2.png'
import { Review } from '../Review';
import { Slider } from './styled';

const reviews = [
    {
        name: 'name',
        photo: Woman,
        course: 'Back-end JS',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita odio ex dolores deserunt! Provident, sed est.'
    },
    {
        name: 'name',
        photo: Woman,
        course: 'Back-end JS',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita odio ex dolores deserunt! Provident, sed est.'
    },
    {
        name: 'name',
        photo: Woman,
        course: 'Back-end JS',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita odio ex dolores deserunt! Provident, sed est.'
    },
    {
        name: 'name',
        photo: Woman,
        course: 'Back-end JS',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita odio ex dolores deserunt! Provident, sed est.'
    }
]

export const SliderReviews = () => {
    return (
        <Slider
            spaceBetween={50}
            slidesPerView={3.2}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {reviews.map(({ name, photo, course, text }) =>
                <SwiperSlide>
                    <Review
                        name={name}
                        photo={photo}
                        course={course}
                        text={text}
                    ></Review>
                </SwiperSlide>
            )}
        </Slider>
    )
}