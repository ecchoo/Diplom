import { AuthorAvatar, AuthorInfo, AuthorName, ButtonDetail, ButtonRecord, Card, CardBody, CardFooter, CardHeader, CardWrapper, CourseInfo, CourseLogo, TitleCourse } from "./styled"
import ClockIcon from '@/assets/icons/clock.svg'
import BookIcon from '@/assets/icons/book.svg'
import QuickViewIcon from '@/assets/icons/quickView.svg'
import { useDispatch } from "react-redux"
import { setIsOpenCourseModal, setSelectedCourseId } from "@/store/reducers"

export const CardCourse = ({ courseId, name, logo, author, countLeassons, courseTime }) => {
    const dispatch = useDispatch()
    
    const hours = (courseTime / 60).toFixed(1)

    const handleClickQuickView = () => {
        dispatch(setIsOpenCourseModal(true))
        dispatch(setSelectedCourseId(courseId))
    }
    
    return (
        <CardWrapper>
            <div className="bgCard"></div>
            <Card>
                <CardHeader>
                    <CourseLogo src={logo} alt="Course logo" />
                    <button onClick={handleClickQuickView} className="buttonQuickView">
                        <img src={QuickViewIcon} alt="Quick view" />
                    </button>
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
                    <ButtonRecord>Записаться</ButtonRecord>
                    <ButtonDetail>Подробней</ButtonDetail>
                </CardFooter>
            </Card>
        </CardWrapper>
    )
}