import { Box, LinearProgress } from "@mui/material"
import { AuthorAvatar, AuthorInfo, AuthorName, ButtonActionsCourse, Card, CardBody, CardFooter, CardHeader, CourseInfo, CourseLogo, CourseProgressBar, Dot, TitleCourse, WrapperCourseProgressBar } from "./styled"
import ClockIcon from '@/assets/icons/clock.svg'
import BookIcon from '@/assets/icons/book.svg'
import { ButtonActions } from "../ButtonActions"


export const CardCourse = ({ name, logo, progress, author, countLeassons, courseTime }) => {
    const hours = (courseTime / 60).toFixed(1)

    return (
        <Card>
            <CardHeader>
                <CourseLogo src={logo} alt="Course logo" />
                <ButtonActions direction='row' />
            </CardHeader>
            <CardBody>
                <TitleCourse>{name}</TitleCourse>
                <AuthorInfo>
                    <AuthorAvatar src={author.photo} alt="Author photo" />
                    <AuthorName>от {author.name}</AuthorName>
                </AuthorInfo>
                <CourseInfo>
                    <div>
                        <img src={BookIcon} alt="Book" />
                        {countLeassons} уроков
                    </div>
                    <div>
                        <img src={ClockIcon} alt="Clock" />
                        {hours} ч
                    </div>
                </CourseInfo>
            </CardBody>
            <CardFooter>
                <span>{progress} %</span>
                <WrapperCourseProgressBar>
                    <CourseProgressBar variant="determinate" value={progress} />
                </WrapperCourseProgressBar>
            </CardFooter>
        </Card>
    )
}