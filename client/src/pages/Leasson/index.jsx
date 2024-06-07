import { getCourseById, getUserPracticalTasks } from "@/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import 'react-quill/dist/quill.snow.css'
import { Container, SideBar, SectionTitle, SideBarSection, NavigationLink, LeassonContent, PracticalTasks, PracticalTask, MdWrapper, ButtonAddFile, PracticalTasksHeader, PracticalTasksList } from "./styled"
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { extractHeadingsFromMarkdown } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { setIsOpenModalTaskFile, setTaskId, setTasks } from "@/store/reducers"

const findLessonById = (course, lessonId) => {
    const lessons = course.modules.flatMap(module =>
        module.partitions.flatMap(partition =>
            partition.leassons
        )
    );
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    const lesson = lessons[currentIndex] || null;
    const isNext = currentIndex < lessons.length - 1;
    const isPrev = currentIndex > 0;
    console.log(lesson)
    return { ...lesson, isNext, isPrev }
};

export const Leasson = () => {
    const dispatch = useDispatch()

    const { user: { tasks } } = useSelector(state => state)

    const { courseId, leassonId } = useParams();
    const [headings, setHeadings] = useState([]);
    const [leasson, setLeasson] = useState(null)

    const mdParser = new MarkdownIt();

    useEffect(() => {
        const fetchCourse = async () => {
            const { data: { course } } = await getCourseById(courseId);
            const currentLeasson = findLessonById(course, +leassonId);
            setLeasson(currentLeasson)
        };

        courseId && leassonId && fetchCourse();
    }, [courseId]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            const { data: { userPracticalTasks } } = await getUserPracticalTasks()
            dispatch(setTasks(userPracticalTasks))
        };

        courseId && leassonId && fetchUserTasks()
    }, [tasks])

    const isSurrenderedTask = (taskId) => {
        return tasks.length && tasks?.some(t => t.practicalTaskId === taskId)
    }


    useEffect(() => {
        if (leasson?.content) {
            setHeadings(extractHeadingsFromMarkdown(leasson.content));
        }
    }, [leasson]);

    const renderHTML = (text) => {
        const html = mdParser.render(text);

        const enhancedHtml = html.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (match, level, content) => {
            const anchor = content.toLowerCase().replace(/\s+/g, '-');

            return `<h${level} id="${anchor}">${content}</h${level}>`
        });

        return enhancedHtml;
    }

    const handleAddFile = (taskId) => {
        dispatch(setIsOpenModalTaskFile(true))
        dispatch(setTaskId(taskId))
    }

    return (
        <>
            {
                leasson ? (
                    <Container>
                        <SideBar>
                            <SideBarSection>
                                <SectionTitle>Навигация по уроку</SectionTitle>
                                {headings.map(heading => (
                                    <NavigationLink key={heading.anchor} href={`#${heading.anchor}`}>
                                        {heading.text}
                                    </NavigationLink>
                                ))}
                            </SideBarSection>
                        </SideBar>
                        <LeassonContent>
                            <MdWrapper>
                                <MdEditor
                                    value={leasson?.content}
                                    renderHTML={renderHTML}
                                />
                            </MdWrapper>
                            {leasson.practicalTasks.length ? (
                                <>
                                    <PracticalTasks>
                                        <PracticalTasksHeader>Задания</PracticalTasksHeader>
                                        <PracticalTasksList>
                                            {leasson.practicalTasks.map(({ id, condition }, index) =>
                                                <PracticalTask key={id}>
                                                    <span>
                                                        {isSurrenderedTask(id) ? '(Сдано)' : null}
                                                        {index + 1}. {condition}
                                                    </span>
                                                    <ButtonAddFile
                                                        disabled={isSurrenderedTask(id)}
                                                        onClick={handleAddFile.bind(null, id)}
                                                    >
                                                        Добавить файл
                                                    </ButtonAddFile>
                                                </PracticalTask>
                                            )}
                                        </PracticalTasksList>
                                    </PracticalTasks>
                                </>
                            ) : null}
                        </LeassonContent>
                    </Container>
                ) : null
            }
        </>
    );
};
