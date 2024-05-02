import { useEffect, useState } from 'react'
import { CardCourse } from '../CardCourse'
import { CoursesTitle, CoursesBody, CoursesContainer, CoursesHeader, CoursesManagement, SortCourses, SortPlaceholder, SortSelect, SortSelectHeader } from './styled'
import { useSelector } from 'react-redux'
import { getUserCourseList } from '@/api'

export const DashboardCourses = () => {
    const { user: { id: userId } } = useSelector(state => state)
    const [courses, setCourses] = useState([])
    
    useEffect(() => {
        const fetchCourses = async () => {
            const { userCourses } = await getUserCourseList()
            setCourses(userCourses)
        }

        fetchCourses()
    }, [])
    
    return (
        <CoursesContainer>
            <CoursesHeader>
                <CoursesTitle>Курсы</CoursesTitle>
                <CoursesManagement>
                    {/* <SortCourses>
                        <SortPlaceholder>Сортировать</SortPlaceholder>
                        <SortSelect>
                            <SortSelectHeader>
                                
                            </SortSelectHeader>
                        </SortSelect>
                    </SortCourses> */}
                </CoursesManagement>
            </CoursesHeader>
            <CoursesBody>
                { courses.length && courses.map(({ id, name, logo, author, progress, countLeassons, courseTime }) =>
                    <CardCourse
                        key={id}
                        name={name}
                        logo={logo}
                        author={author}
                        progress={progress}
                        countLeassons={countLeassons}
                        courseTime={courseTime}
                    />
                )}
            </CoursesBody>
        </CoursesContainer>
    )
}