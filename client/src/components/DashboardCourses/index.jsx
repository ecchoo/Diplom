import { useEffect, useState } from 'react'
import { CardCourse } from '../CardCourse'
import { CoursesTitle, CoursesBody, CoursesContainer, CoursesHeader, CoursesManagement, SortCourses, SortPlaceholder, SortSelect, SortSelectHeader } from './styled'
import { getUserCourseList } from '@/api'
import { Select } from '../Select'
import { COURSES_SELECT_OPTIONS } from '@/constants'

export const DashboardCourses = () => {
    const [courses, setCourses] = useState([])
    const [queryParams, setQueryParams] = useState({})

    useEffect(() => {
        const fetchCourses = async () => {
            const { userCourses } = await getUserCourseList(queryParams)
            setCourses(userCourses)
        }

        fetchCourses()
    }, [queryParams])

    const handleChangeSelect = (option) => {
        setQueryParams({...queryParams, filter: option.value})
    }

    return (
        <CoursesContainer>
            <CoursesHeader>
                <CoursesTitle>Курсы</CoursesTitle>
                <CoursesManagement>
                    <Select
                        options={COURSES_SELECT_OPTIONS}
                        initialtOption={COURSES_SELECT_OPTIONS[0]}
                        onChange={handleChangeSelect}
                    />
                </CoursesManagement>
            </CoursesHeader>
            <CoursesBody>
                {courses.length ? (
                    courses.map(({ id, name, logo, author, progress, countLeassons, courseTime }) =>
                        <CardCourse
                            key={id}
                            name={name}
                            logo={logo}
                            author={author}
                            progress={progress}
                            countLeassons={countLeassons}
                            courseTime={courseTime}
                        />
                    )
                ) : (
                    null
                )}
            </CoursesBody>
        </CoursesContainer>
    )
}