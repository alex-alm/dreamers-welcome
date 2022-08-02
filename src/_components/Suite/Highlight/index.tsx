import React from 'react'
import { HighlightBlurb, HighlightWrapper, Name, SliderWrap } from './styles'
import BodyText from '../../Typography/BodyText'
import ImageSlider from '../../UI/Swiper'
import { ContentfulImage } from '../../../_constants/DataTypes'

interface HighlightProps {
    title: string
    blurb: string
    images: ContentfulImage[]
    hideSeparator?: boolean
    slug: string
}
const Highlight = ({
    title,
    blurb,
    images,
    hideSeparator = false,
    slug,
}: HighlightProps) => {
    return (
        <HighlightWrapper>
            {!hideSeparator && <div className="separator" />}
            <Name>{title}</Name>
            <SliderWrap>
                {/*@ts-ignore*/}
                <ImageSlider slug={slug} items={images} slidesPerView={1} />
            </SliderWrap>
            <HighlightBlurb>
                {blurb && <BodyText size="lg">{blurb}</BodyText>}
            </HighlightBlurb>
        </HighlightWrapper>
    )
}

export default Highlight
