import { NavList, NavListItem } from "@/UI"
import { ChatSvg } from "../svg/ChatSvg"
import { ShieldSvg } from "../svg/ShieldSvg"
import { useDispatch, useSelector } from "react-redux"
import { setActiveDashboardSection } from "@/store/reducers"
import { DASHBOARD_SECTIONS } from "@/constants"

export const NavListModerator = () => {
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
                onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.MESSAGE_MODERATION)}
                isActive={activeSection === DASHBOARD_SECTIONS.MESSAGE_MODERATION}
            >
                <ShieldSvg />
                <span>Модерация</span>
            </NavListItem>
            <NavListItem
                onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.CHATS)}
                isActive={activeSection === DASHBOARD_SECTIONS.CHATS}
            >
                <ChatSvg />
                <span>Чаты</span>
            </NavListItem>
        </NavList>
    )
}