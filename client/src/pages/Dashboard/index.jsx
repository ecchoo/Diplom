import { Aside } from "@/components/Aside"
import { HeaderDashboard } from "@/components/HeaderDashboard"
import { DashboardContainer, DashboardContent } from "./styled"
import { DashboardCourses } from "@/components/DashboardCourses"
import { DashboardChats } from "@/components/DashboardChats"
import { DashboardActivity } from "@/components/DashboardActivity"

export const Dashboard = () => {
    return (
        <DashboardContainer>
            <Aside />
            <DashboardContent>
                <HeaderDashboard />
                {/* <DashboardCourses /> */}
                <DashboardChats />
                {/* <DashboardActivity /> */}
            </DashboardContent>
        </DashboardContainer>
    )
}