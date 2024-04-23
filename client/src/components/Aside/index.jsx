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

export const Aside = () => {
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
                    <NavListItem isActive={false}>
                        <HomeSvg />
                        <span>Главная</span>
                    </NavListItem>
                    <NavListItem isActive={false}>
                        <BookSvg />
                        <span>Курсы</span>
                    </NavListItem>
                    <NavListItem isActive={true}>
                        <ChatSvg />
                        <span>Чаты</span>
                    </NavListItem>
                    <NavListItem isActive={false}>
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