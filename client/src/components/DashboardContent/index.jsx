import { DASHBOARD_SECTIONS } from "@/constants"
import { useSelector } from "react-redux"
import { DashboardActivity } from "../DashboardActivity"
import { DashboardCourses } from "../DashboardCourses"
import { DashboardChats } from "../DashboardChats"
import { DashboardProfile } from "../DashboardProfile"

export const DashboardContent = () => {
    const { dashboard: { activeSection } } = useSelector(state => state)
    
    switch (activeSection) {
        case DASHBOARD_SECTIONS.ACTIVITY: return <DashboardActivity />
        case DASHBOARD_SECTIONS.COURSES: return <DashboardCourses />
        case DASHBOARD_SECTIONS.CHATS: return <DashboardChats />
        case DASHBOARD_SECTIONS.PROFILE: return <DashboardProfile />
    }
}