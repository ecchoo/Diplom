import { enrollCourse, getCourseById } from "@/api"
import { Header } from "@/components/Header"
import { Badges, ButtonEnroll, Container, CourseDescription, CourseDetails, CourseDetailsTitle, CourseInfo, CourseOverview, CourseTitle, ListDetails, ListDetailsItem, ReviewSlider, SectionTitle, Teachers } from "./styled"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Modules } from "./styled"
import { CardModule } from "@/components/CardModule"
import { CardTeacher } from "@/components/CardTeacher"
import { Badge } from "@/UI"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks"
import { CardReview } from "@/components/CardReview"
import 'swiper/css';
import { SwiperSlide } from "swiper/react"


export const Course = () => {
    const { id: selectedCourseId } = useParams()
    const { isAuth, verified } = useAuth()
    const [selectedCourse, setSelectedCourse] = useState(null)

    useEffect(() => {
        const fetchCourse = async () => {
            const { data: { course } } = await getCourseById(selectedCourseId)
            setSelectedCourse(course)
        }

        selectedCourseId && fetchCourse()
    }, [selectedCourseId])

    const hours = (selectedCourse?.courseTime / 60).toFixed(1)

    const handleClickEnroll = async () => {
        try {
            if (!isAuth) {
                return toast('Для записи на курс необходимо авторизоваться')
            }

            if (!verified) {
                return toast('Для записи на курс необходимо подтвердить почту')
            }

            await enrollCourse({ courseId: selectedCourse?.id })
            toast(`Вы успешно записали на курс ${selectedCourse?.name}`)
        } catch (err) {
            console.log(err)
            toast('Не удалось записаться на курс, попробуйте позже')
        }
    }

    return (
        <>
            <Header />
            <section>
                <Container>
                    <CourseInfo>
                        <CourseOverview>
                            <CourseTitle>{selectedCourse?.name}</CourseTitle>
                            <CourseDescription>{selectedCourse?.description}</CourseDescription>
                            <Badges>
                                <Badge className="badge">Front-end</Badge>
                                <Badge className="badge">Java Script</Badge>
                            </Badges>
                        </CourseOverview>
                        <CourseDetails>
                            <CourseDetailsTitle>Детали курса</CourseDetailsTitle>
                            <ListDetails>
                                <ListDetailsItem>
                                    <Badge className="badge">{selectedCourse?.modules.length}</Badge>
                                    <span>Модулей</span>
                                </ListDetailsItem>
                                <ListDetailsItem>
                                    <Badge className="badge">{selectedCourse?.countLeassons}</Badge>
                                    <span>Уроков</span>
                                </ListDetailsItem>
                                <ListDetailsItem>
                                    <Badge className="badge">{hours}</Badge>
                                    <span>Часов обучения</span>
                                </ListDetailsItem>
                                <ListDetailsItem>
                                    <Badge className="badge">{selectedCourse?.reviews.length}</Badge>
                                    <span>Отзывов</span>
                                </ListDetailsItem>
                            </ListDetails>
                            <ButtonEnroll onClick={handleClickEnroll}>Записаться</ButtonEnroll>
                        </CourseDetails>
                    </CourseInfo>
                </Container>
            </section>
            <section>
                <Container>
                    <SectionTitle>Преподаватели курса</SectionTitle>
                    <Teachers>
                        {selectedCourse?.teachers.map(teacher =>
                            <CardTeacher
                                key={teacher.id}
                                direction='row'
                                name={teacher?.name}
                                bio={teacher?.bio}
                                photo={teacher?.photo}
                                isAuthor={teacher?.isAuthor}
                                yearsExperience={teacher?.yearsExperience}
                            />
                        )}
                    </Teachers>
                </Container>
            </section>
            <section>
                <Container>
                    <SectionTitle>Отзывы курса</SectionTitle>
                    <ReviewSlider
                        spaceBetween={50}
                        slidesPerView={3.2}
                    >
                        {selectedCourse?.reviews.map(({ id, text, user: { name, photo } }) =>
                            <SwiperSlide key={id}>
                                <CardReview
                                    key={id}
                                    userName={name}
                                    userPhoto={photo}
                                    courseName={selectedCourse?.name}
                                    text={text}
                                />
                            </SwiperSlide>
                        )}
                    </ReviewSlider>
                </Container>
            </section>
            <section>
                <Container>
                    <SectionTitle>Содержание курса</SectionTitle>
                    <Modules className="modules">
                        {selectedCourse !== null && selectedCourse.modules.map(({ id, name, partitions }) =>
                            <CardModule
                                key={id}
                                name={name}
                                partitions={partitions}
                            />
                        )}
                    </Modules>
                </Container>
            </section>
        </>
    )
}