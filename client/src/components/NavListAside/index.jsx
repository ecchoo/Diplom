import { ROLES } from "@/constants"
import { useSelector } from "react-redux"
import { NavListStudent } from "../NavListStudent"
import { NavListModerator } from "../NavListModerator"
import { NavListTeacher } from "../NavListTeacher"

export const NavListAside = () => {
    const { user: { role } } = useSelector(state => state)

    switch (role) {
        case ROLES.STUDENT: return <NavListStudent />
        case ROLES.MODERATOR: return <NavListModerator />
        case ROLES.TEACHER: return <NavListTeacher />
    }
}