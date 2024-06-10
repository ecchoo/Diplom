import { getCourseById } from "@/api"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, CourseDescription, CourseInfo, CourseTitle, Lesson, LessonTitle, Lessons, LinkTest, Module, ModuleDescription, ModuleTitle, Modules, Partition, PartitionTitle, Partitions } from "./styled"
import { COURSES, TESTS } from "@/constants"
import { Header } from "@/components/Header"

export const CourseContent = () => {
    const { id: courseId } = useParams()

    const [course, setCourse] = useState(null)

    useEffect(() => {
        const fetchCourse = async () => {
            const { data } = await getCourseById(courseId)
            setCourse(data.course)
        }

        courseId && fetchCourse()
    }, [courseId])

    console.log(course)

    return (
        <>
            <Header />
            <Container>
                <CourseInfo>
                    <CourseTitle>Содержание курса {course?.name}</CourseTitle>
                    <CourseDescription>{course?.description}</CourseDescription>
                </CourseInfo>
                <Modules>
                    {/* <ModuleTitle>Модули</ModuleTitle> */}
                    {course && course.modules.length ? course.modules.map(({ id, name, description, partitions }) =>
                        <Module key={id}>
                            <ModuleTitle>Модуль {name}</ModuleTitle>
                            <ModuleDescription>{description}</ModuleDescription>
                            <Partitions>
                                {partitions.length ? partitions.map(({ id, name, leassons }, partitonIndex) =>
                                    <Partition key={id}>
                                        <PartitionTitle>Раздел {name}</PartitionTitle>
                                        <Lessons>
                                            {leassons.length ? leassons.map(({ id, name }, lessonIndex) =>
                                                <Lesson key={id}>
                                                    {partitonIndex + 1}.{lessonIndex + 1}
                                                    <Link to={`${COURSES}${courseId}/lessons/${id}`}>
                                                        <LessonTitle>{name}</LessonTitle>
                                                    </Link>
                                                </Lesson>
                                            ) : null}
                                        </Lessons>
                                    </Partition>
                                ) : null}
                            </Partitions>
                        </Module>
                    ) : null}
                </Modules>
                {course?.test ? <LinkTest to={`${TESTS}${course?.test?.id}`}>Пройти итоговый тест</LinkTest> : null}
            </Container>
        </>
    )
}