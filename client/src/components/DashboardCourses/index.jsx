import { CardCourse } from '../CardCourse'
import { CoursesTitle, CoursesBody, CoursesContainer, CoursesHeader, CoursesManagement, SortCourses, SortPlaceholder, SortSelect, SortSelectHeader } from './styled'
import AvatarPhoto from '/avatar.jpg'
import BackEndPhoto from '/backend.png'

const courses = [
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
    {
        name: 'Back-end Basic',
        logo: BackEndPhoto,
        author: {
            name: 'David Nikolson',
            photo: AvatarPhoto
        }
    },
]

export const DashboardCourses = () => {
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
                {courses.map(({ name, logo, author }) =>
                    <CardCourse
                        name={name}
                        logo={logo}
                        author={author}
                    />
                )}
            </CoursesBody>
        </CoursesContainer>
    )
}