import { Img, StyledImage } from "./styled"

export const Image = ({ src, alt }) => {
    return (
        <StyledImage>
            <div></div>
            {/* <img className="img"  /> */}
            <Img src={src} alt={alt} />
        </StyledImage>
    )
}