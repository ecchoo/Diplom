import { NavList, NavListItem } from "@/UI"
import { BookSvg } from "../svg/BookSvg"
import { HomeSvg } from "../svg/HomeSvg"
import { ChatSvg } from "../svg/ChatSvg"
import { ProfileSvg } from "../svg/ProfileSvg"
import { useDispatch, useSelector } from "react-redux"
import { setActiveDashboardSection } from "@/store/reducers"
import { DASHBOARD_SECTIONS } from "@/constants"

export const NavListStudent = () => {
    const dispatch = useDispatch()

    const {
        dashboard: { activeSection },
    } = useSelector(state => state)

    const handleClickNavItem = (section) => {
        dispatch(setActiveDashboardSection(section))
    }

    return (
        <NavList>
            <NavListItem
                onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.ACTIVITY)}
                isActive={activeSection === DASHBOARD_SECTIONS.ACTIVITY}
            >
                <HomeSvg />
                <span>Активность</span>
            </NavListItem>
            <NavListItem
                onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.STUDENT_COURSES)}
                isActive={activeSection === DASHBOARD_SECTIONS.STUDENT_COURSES}
            >
                <BookSvg />
                <span>Курсы</span>
            </NavListItem>
            <NavListItem
                onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.CHATS)}
                isActive={activeSection === DASHBOARD_SECTIONS.CHATS}
            >
                <ChatSvg />
                <span>Чаты</span>
            </NavListItem>
            <NavListItem
                onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.PROFILE)}
                isActive={activeSection === DASHBOARD_SECTIONS.PROFILE}
            >
                <ProfileSvg />
                <span>Профиль</span>
            </NavListItem>
        </NavList>
    )
}