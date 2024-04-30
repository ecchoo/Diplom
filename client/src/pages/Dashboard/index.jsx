import { Aside } from "@/components/Aside"
import { HeaderDashboard } from "@/components/HeaderDashboard"
import { DashboardContainer, Content } from "./styled"
import { DashboardCourses } from "@/components/DashboardCourses"
import { DashboardChats } from "@/components/DashboardChats"
import { DashboardActivity } from "@/components/DashboardActivity"
import { DashboardContent } from "@/components/DashboardContent"

export const Dashboard = () => {
    return (
        <DashboardContainer>
            <Aside />
            <Content>
                <HeaderDashboard />
                <DashboardContent />
            </Content>
        </DashboardContainer>
    )
}