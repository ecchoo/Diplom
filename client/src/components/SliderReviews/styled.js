import styled from "styled-components";
import { Swiper } from 'swiper/react';

export const Slider = styled(Swiper)`
    padding-top: ${({ theme }) => theme.spacing(5)};
`