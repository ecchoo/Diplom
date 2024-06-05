import { DASHBOARD_SECTIONS } from "@/constants"
import { useSelector } from "react-redux"
import { StudentActivity } from "../StudentActivity"
import { StudentCourses } from "../StudentCourses"
import { DashboardChats } from "../DashboardChats"
import { StudentProfile } from "../StudentProfile"
import { ModerationMessages } from "../ModerationMessages"
import { TeacherCourses } from "../TeacherCourses"

export const DashboardContent = () => {
    const { dashboard: { activeSection } } = useSelector(state => state)

    switch (activeSection) {
        case DASHBOARD_SECTIONS.ACTIVITY: return <StudentActivity />
        case DASHBOARD_SECTIONS.STUDENT_COURSES: return <StudentCourses />
        case DASHBOARD_SECTIONS.PROFILE: return <StudentProfile />
        case DASHBOARD_SECTIONS.CHATS: return <DashboardChats />
        case DASHBOARD_SECTIONS.MESSAGE_MODERATION: return <ModerationMessages />
        case DASHBOARD_SECTIONS.TEACHER_COURSES: return <TeacherCourses />
    }
}