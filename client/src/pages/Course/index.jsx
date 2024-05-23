import { enrollCourse, getCourseById } from "@/api"
import { Header } from "@/components/Header"
import { Badges, ButtonEnroll, Container, CourseDescription, CourseDetails, CourseDetailsTitle, CourseInfo, CourseOverview, CourseTitle, ListDetails, ListDetailsItem, SectionTitle, Teachers } from "./styled"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Modules } from "./styled"
import { CardModule } from "@/components/CardModule"
import { CardTeacher } from "@/components/CardTeacher"
import { Badge } from "@/UI"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { useAuth } from "@/hooks"

export const Course = () => {
    const { id: selectedCourseId } = useParams()
    const { isAuth, verified } = useAuth()
    const [selectedCourse, setSelectedCourse] = useState(null)

    useEffect(() => {
        const fetchCourse = async () => {
            const { course } = await getCourseById(selectedCourseId)
            setSelectedCourse(course)
        }

        selectedCourseId && fetchCourse()
    }, [selectedCourseId])

    const hours = (selectedCourse?.courseTime / 60).toFixed(1)

    const handleClickEnroll = async () => {
        try {
            if (!isAuth) {
                toast('Для записи на курс необходимо авторизоваться')
            }

            if (!verified) {
                toast('Для записи на курс необходимо подтвердить почту')
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
                                    <Badge className="badge">{selectedCourse?.teachers.length}</Badge>
                                    <span>Преподавателей</span>
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