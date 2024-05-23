import { Avatar } from "@/UI/Avatar"
import { Course, Reviewer, ReviewerInfo, Name, CardWrapper, Card } from "./styled"
import { Text } from "@/UI"


export const CardReview = ({ userName, userPhoto, courseName, text }) => {
    return (
        <CardWrapper>
            <div className="bgCard"></div>
            <Card>
                <Text>{text}</Text>
                <Reviewer>
                    <Avatar src={userPhoto} alt="Avatar" />
                    <ReviewerInfo>
                        <Name>{userName}</Name>
                        <Course>{courseName}</Course>
                    </ReviewerInfo>
                </Reviewer>
            </Card>
        </CardWrapper>
    )
}