import { getCourseById } from "@/api"
import { Header } from "@/components/Header"
import { Container, SectionTitle } from "./styled"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Modules } from "./styled"
import { CardModule } from "@/components/CardModule"

export const Course = () => {
    const { id: selectedCourseId } = useParams()

    const [selectedCourse, setSelectedCourse] = useState(null)

    useEffect(() => {
        const fetchCourse = async () => {
            const { course } = await getCourseById(selectedCourseId)
            setSelectedCourse(course)
        }

        selectedCourseId && fetchCourse()
    }, [selectedCourseId])

    console.log(selectedCourse)

    return (
        <>
            <Header />
            <section>
                <Container>
                    <SectionTitle>Содержание курса</SectionTitle>
                    <Modules className="modules">
                        {selectedCourse !== null && selectedCourse.modules.map(({id, name, partitions}) =>
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