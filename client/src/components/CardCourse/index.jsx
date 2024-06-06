import { AuthorAvatar, AuthorInfo, AuthorName, ButtonDetail, ButtonEnroll, Card, CardBody, CardFooter, CardHeader, CardWrapper, CourseInfo, CourseLogo, TitleCourse } from "./styled"
import ClockIcon from '@/assets/icons/clock.svg'
import BookIcon from '@/assets/icons/book.svg'
import QuickViewIcon from '@/assets/icons/quickView.svg'
import { useDispatch } from "react-redux"
import { setIsOpenModalCourse, setSelectedCourseId } from "@/store/reducers"
import { COURSES, DIFFICULTY_LEVELS } from "@/constants"
import { enrollCourse } from "@/api"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks"

export const CardCourse = ({ courseId, name, logo, author, countLeassons, courseTime, difficultyLevel }) => {
    const dispatch = useDispatch()
    const { isAuth, verified } = useAuth()

    const hours = (courseTime / 60).toFixed(1)

    const handleClickQuickView = () => {
        dispatch(setIsOpenModalCourse(true))
        dispatch(setSelectedCourseId(courseId))
    }

    const { text: difficultyLevelText } = DIFFICULTY_LEVELS.find(l => l.value === difficultyLevel)

    const handleClickEnroll = async () => {
        try {
            if (!isAuth) {
                return toast('Для записи на курс необходимо авторизоваться')
            }

            if (!verified) {
                return toast('Для записи на курс необходимо подтвердить почту')
            }

            await enrollCourse({ courseId })
            toast(`Вы успешно записали на курс ${name}`)
        } catch (err) {
            console.log(err)
            toast('Не удалось записаться на курс, попробуйте позже')
        }
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
                    <TitleCourse>{name} - {difficultyLevelText}</TitleCourse>
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
                    <ButtonEnroll onClick={handleClickEnroll}>Записаться</ButtonEnroll>
                    <ButtonDetail to={`${COURSES}${courseId}`}>Подробней</ButtonDetail>
                </CardFooter>
            </Card>
        </CardWrapper>
    )
}