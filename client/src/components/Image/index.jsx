import { StyledImage } from "./styled"

export const Image = ({ src, alt }) => {
    return (
        <StyledImage>
            <div></div>
            <img src={src} alt={alt} />
        </StyledImage>
    )
}