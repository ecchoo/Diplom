import { Avatar } from "@/UI/Avatar"
import { Course, Reviewer, ReviewerInfo, StyledReview, Name } from "./styled"
import { Text } from "@/UI"


export const Review = ({ name, photo, course, text }) => {
    console.log(course)

    return (
        <StyledReview>
            <Text>{text}</Text>
            <Reviewer>
                <Avatar src={photo} alt="Avatar" />
                <ReviewerInfo>
                    <Name>{name}</Name>
                    <Course>{course}</Course>
                </ReviewerInfo>
            </Reviewer>
        </StyledReview>
    )
}