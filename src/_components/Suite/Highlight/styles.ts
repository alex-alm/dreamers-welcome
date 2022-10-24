import styled from 'styled-components'
import { rem } from 'polished'
import { BREAKPOINTS } from '../../../_constants/brekpoints'

export const HighlightBlurb = styled.div`
    width: 100%;
    margin-top: ${rem('20px')};

    > p {
        margin-left: calc(25% + 20px);
        max-width: ${rem('570px')};
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        > p {
            margin-left: 0;
            padding: 0 ${rem(20)};
        }
    }
`

export const SliderWrap = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: ${rem('40px')};

    .swiper {
        overflow: visible;
        margin-left: calc(25% + 20px);
        margin-right: ${rem(20)};
        position: relative;
    }

    .swiper-slide {
        width: auto;
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        .swiper {
            margin-left: ${rem(20)};
        }
    }
`
