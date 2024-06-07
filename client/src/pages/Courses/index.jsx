import { Header } from "@/components/Header"
import { BlockFilters, CheckboxWrapper, Container, CourseList, CustomCheckbox, FiltersContainer, Label, Search, SearchImg, SearchInput, TitleFilters } from "./styled"
import { useEffect, useState } from "react"
import { getCourseList } from "@/api"
import { CardCourse } from "@/components/CardCourse"
import SearchIcon from '@/assets/icons/search.svg'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { DIFFICULTY_LEVELS, FIELDS_STUDY } from "@/constants"

export const Courses = () => {
    const [courseList, setCourseList] = useState([])
    const [filterParams, setFilterParams] = useState({
        search: '',
        filters: {
            difficultyLevel: 'all',
            fieldStudy: 'all'
        },
    });

    useEffect(() => {
        const fetchCourseList = async () => {
            const { courses } = await getCourseList(filterParams);
            setCourseList(courses)
        }

        fetchCourseList()
    }, [filterParams])

    const handleChangeSearch = (e) => {
        setFilterParams({
            ...filterParams,
            search: e.target.value
        })
    }

    const handleChangeDifficultyLevel = (value) => {
        setFilterParams({
            ...filterParams,
            filters: {
                ...filterParams.filters,
                difficultyLevel: value
            }
        });
    }

    console.log(filterParams)

    const handleChangeFieldStudy = (value) => {
        setFilterParams({
            ...filterParams,
            filters: {
                ...filterParams.filters,
                fieldStudy: value
            }
        });
    }

    return (
        <>
            <Header />
            <Container>
                <FiltersContainer>
                    <Search>
                        <SearchImg src={SearchIcon} alt="Search" />
                        <SearchInput onChange={handleChangeSearch} placeholder="Поиск" />
                    </Search>
                    <BlockFilters>
                        <TitleFilters>Уровень сложности</TitleFilters>
                        <CheckboxWrapper>
                            <CustomCheckbox
                                type="checkbox"
                                id="alldifficultyLevels"
                                onChange={handleChangeDifficultyLevel.bind(null, 'all')}
                                checked={filterParams.filters.difficultyLevel === 'all'}
                            />
                            <Label htmlFor="alldifficultyLevels">Все</Label>
                        </CheckboxWrapper>
                        {DIFFICULTY_LEVELS.map(({ text, value }) =>
                            <CheckboxWrapper>
                                <CustomCheckbox
                                    type="checkbox"
                                    id={value}
                                    onChange={handleChangeDifficultyLevel.bind(null, value)}
                                    checked={filterParams.filters.difficultyLevel === value}
                                />
                                <Label htmlFor={value}>{text}</Label>
                            </CheckboxWrapper>
                        )}
                    </BlockFilters>
                    <BlockFilters>
                        <TitleFilters>Область изучения</TitleFilters>
                        <CheckboxWrapper>
                            <CustomCheckbox
                                type="checkbox"
                                id="allFieldStudy"
                                onChange={handleChangeFieldStudy.bind(null, 'all')}
                                checked={filterParams.filters.fieldStudy === 'all'}
                            />
                            <Label htmlFor="allFieldStudy">Все</Label>
                        </CheckboxWrapper>
                        {FIELDS_STUDY.map(({ text, value }) =>
                            <CheckboxWrapper>
                                <CustomCheckbox
                                    type="checkbox"
                                    id={value}
                                    onChange={handleChangeFieldStudy.bind(null, value)}
                                    checked={filterParams.filters.fieldStudy === value}
                                />
                                <Label htmlFor={value}>{text}</Label>
                            </CheckboxWrapper>
                        )}
                    </BlockFilters>
                </FiltersContainer>
                <CourseList>
                    {courseList.length && courseList.map(({ id, name, logo, author, countLeassons, difficultyLevel, courseTime }) =>
                        <CardCourse
                            key={id}
                            courseId={id}
                            name={name}
                            logo={logo}
                            author={author}
                            countLeassons={countLeassons}
                            courseTime={courseTime}
                            difficultyLevel={difficultyLevel}
                        />
                    )}
                </CourseList>
            </Container>
        </>
    )
}
