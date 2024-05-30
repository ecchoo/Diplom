import { Logo } from "../Logo"
import AvatarPhoto from '/avatar.jpg'

import { AsideAvatar, AsideContainer, AsideFooter, AsideFooterCaption, AsideFooterImage, AsideFooterImages, AsideHeader, ButtonPlus, Lines, UserName, UserProfile } from "./styled"
import Plus from '@/assets/icons/plus.svg'

import AsideImg from '/aside1.png'
import AsideImg2 from '/blatnoy.png'
import { useSelector } from "react-redux"
import { ROLES } from "@/constants"
import { NavListStudent } from "../NavListStudent"
import { NavListModerator } from "../NavListModerator"
import { NavListAside } from "../NavListAside"

export const Aside = () => {
    const { user: { name, role, photo } } = useSelector(state => state)

    return (
        <AsideContainer>
            <AsideHeader>
                <Logo />
                <UserProfile>
                    <AsideAvatar src={photo} alt="Avatar" />
                    <Lines>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </Lines>
                    <UserName>{name}</UserName>
                </UserProfile>
            </AsideHeader>
            {/* <nav>
                {role === ROLES.STUDENT && <NavListStudent />}
                {role === ROLES.MODERATOR && <NavListModerator />}
            </nav> */}
            <NavListAside />
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