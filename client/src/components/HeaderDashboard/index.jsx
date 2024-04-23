import { HeaderDashboardContainer, Search } from "./styled"
import SearchIcon from '@/assets/icons/search.svg'

export const HeaderDashboard = () => {
    return (
        <HeaderDashboardContainer>
            <Search>
                <img src={SearchIcon} alt="Search icon" />
            </Search>
        </HeaderDashboardContainer>
    )
}