import { Box, LinearProgress } from "@mui/material"
import { AuthorAvatar, AuthorInfo, AuthorName, ButtonActionsCourse, Card, CardBody, CardFooter, CardHeader, CourseInfo, CourseLogo, CourseProgressBar, Dot, TitleCourse, WrapperCourseProgressBar } from "./styled"
import ClockIcon from '@/assets/icons/clock.svg'
import BookIcon from '@/assets/icons/book.svg'
import { ButtonActions } from "../ButtonActions"


export const CardCourse = ({ name, logo, author }) => {
    return (
        <Card>
            <CardHeader>
                <CourseLogo src={logo} alt="Course logo" />
                {/* <ButtonActionsCourse>
                    <Dot />
                    <Dot />
                    <Dot />
                </ButtonActionsCourse> */}
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
                        15 уроков
                    </div>
                    <div>
                        <img src={ClockIcon} alt="Clock" />
                        40 часов
                    </div>
                </CourseInfo>
            </CardBody>
            <CardFooter>
                <span>70 %</span>
                <WrapperCourseProgressBar>
                    <CourseProgressBar variant="determinate" value={70} />
                </WrapperCourseProgressBar>
            </CardFooter>
        </Card>
    )
}