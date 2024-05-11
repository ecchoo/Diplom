import { Header } from "@/components/Header"
import { CourseList } from "./styled"
import { useEffect, useState } from "react"
import { getCourseList } from "@/api"
import { CardCourse } from "@/components/CardCourse"

export const Courses = () => {
    const [courseList, setCourseList] = useState([])
    
    useEffect(() => {
        const fetchCourseList = async () => {
            const { courses } = await getCourseList()
            setCourseList(courses)
        }

        fetchCourseList()
    }, [])

    return (
        <>
            <Header />
            <CourseList>
                {courseList.length && courseList.map(({ id, name, logo, author, countLeassons, courseTime }) =>
                    <CardCourse
                        key={id}
                        courseId={id}
                        name={name}
                        logo={logo}
                        author={author}
                        countLeassons={countLeassons}
                        courseTime={courseTime}
                    />
                )}
            </CourseList>
        </>
    )
}