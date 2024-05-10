import { Link } from "react-router-dom"
import { StyledLogo } from "./styled"
import { HOME } from "@/constants"

export const Logo = () => {
    return (
        <StyledLogo><Link to={HOME}>Web Learn</Link></StyledLogo>
    )
}