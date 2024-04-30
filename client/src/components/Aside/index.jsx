import { Logo } from "../Logo"
import AvatarPhoto from '/avatar.jpg'

import { AsideAvatar, AsideContainer, AsideFooter, AsideFooterCaption, AsideFooterImage, AsideFooterImages, AsideHeader, ButtonPlus, Lines, NavList, NavListItem, UserName, UserProfile } from "./styled"
import { BookSvg } from "../svg/BookSvg"
import { HomeSvg } from "../svg/HomeSvg"
import { ChatSvg } from "../svg/ChatSvg"
import { ProfileSvg } from "../svg/ProfileSvg"
import Plus from '@/assets/icons/plus.svg'

import AsideImg from '/aside1.png'
import AsideImg2 from '/blatnoy.png'
import { useDispatch, useSelector } from "react-redux"
import { setActiveDashboardSection } from "@/store/reducers"
import { DASHBOARD_SECTIONS } from "@/constants"

export const Aside = () => {
    const dispatch = useDispatch()
    const { dashboard: { activeSection } } = useSelector(state => state)

    const handleClickNavItem = (section) => {
        console.log(section)
        dispatch(setActiveDashboardSection(section))
    }

    return (
        <AsideContainer>
            <AsideHeader>
                <Logo />
                <UserProfile>
                    <AsideAvatar src={AvatarPhoto} alt="Avatar" />
                    <Lines>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Lines>
                    <UserName>David Nikolson</UserName>
                </UserProfile>
            </AsideHeader>
            <nav>
                <NavList>
                    <NavListItem
                        onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.ACTIVITY)}
                        isActive={activeSection === DASHBOARD_SECTIONS.ACTIVITY}
                    >
                        <HomeSvg />
                        <span>Активность</span>
                    </NavListItem>
                    <NavListItem
                        onClick={handleClickNavItem.bind(null, DASHBOARD_SECTIONS.COURSES)}
                        isActive={activeSection === DASHBOARD_SECTIONS.COURSES}
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
            </nav>
            <AsideFooter>
                <AsideFooterImages>
                    <AsideFooterImage src={AsideImg} alt='asideimg' />
                    <AsideFooterImage src={AsideImg2} alt='asideimg' />
                    <ButtonPlus>
                        <img src={Plus} alt="plus" />
                    </ButtonPlus>
                </AsideFooterImages>
                <AsideFooterCaption>Learning is easy with our community</AsideFooterCaption>
            </AsideFooter>
        </AsideContainer>
    )
}