import { getUserCourseByCourseId, getUserPracticalTasks, updateProgress } from "@/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import 'react-quill/dist/quill.snow.css'
import { Container, SideBar, SectionTitle, SideBarSection, NavigationLink, LeassonContent, PracticalTasks, PracticalTask, MdWrapper, ButtonAddFile, PracticalTasksHeader, PracticalTasksList, ButtonPrev, LeassonWrapper, ButtonNext } from "./styled"
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { extractHeadingsFromMarkdown } from "@/utils"
import { useDispatch, useSelector } from "react-redux"
import { setCourseIdModalTaskFile, setIsOpenModalTaskFile, setNextTaskId, setTaskId, setTasks } from "@/store/reducers"
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from "@mui/material"

const findLessonById = (course, lessonId) => {
    const lessons = course.modules.flatMap(module =>
        module.partitions.flatMap(partition =>
            partition.leassons
        )
    );
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    const lesson = lessons[currentIndex] || null;

    const prev = currentIndex > 0 ? `http://localhost:5173/courses/${course.id}/lessons/${lessons[currentIndex - 1].id}` : null;
    let next;
    if (currentIndex < lessons.length - 1) {
        next = `http://localhost:5173/courses/${course.id}/lessons/${lessons[currentIndex + 1].id}`;
    } else {
        const allPracticalTasks = course.modules.flatMap(module =>
            module.partitions.flatMap(partition =>
                partition.leassons.flatMap(lesson => lesson.practicalTasks)
            )
        );
        const lastPracticalTaskId = allPracticalTasks[allPracticalTasks.length - 1]?.id;
        if (course.test && course.progress.currentPracticalTaskId === lastPracticalTaskId) {
            next = `http://localhost:5173/tests/${course.test.id}`;
        } else {
            next = null;
        }
    }

    console.log('next', next)

    return { ...lesson, prev, next };
};



export const Leasson = () => {
    const dispatch = useDispatch()
    const { user: { tasks, courses: userCourses } } = useSelector(state => state)

    const { courseId, leassonId } = useParams();

    const [course, setCourse] = useState(null)

    const leasson = course && findLessonById(course, +leassonId)
    const headings = leasson && extractHeadingsFromMarkdown(leasson.content)

    const mdParser = new MarkdownIt();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data: { userCourse } } = await getUserCourseByCourseId(courseId);
                setCourse(userCourse);

                if (userCourse.progress.currentLeassonId) {
                    const currentLessonIndex = userCourse.modules.flatMap(module =>
                        module.partitions.flatMap(partition =>
                            partition.leassons
                        )
                    ).findIndex(lesson => lesson.id === userCourse.progress.currentLeassonId);

                    const nextLessonId = userCourse.modules.flatMap(module =>
                        module.partitions.flatMap(partition =>
                            partition.leassons
                        )
                    )[currentLessonIndex + 1]?.id;

                    if (nextLessonId === +leassonId) {
                        await updateProgress({
                            courseId,
                            currentLeassonId: leassonId,
                        })
                        console.log('Progress updated');
                    }
                }
            } catch (err) {

            }
        };

        courseId && leassonId && fetchCourse();
    }, [courseId, leassonId]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            const { data: { userPracticalTasks } } = await getUserPracticalTasks()
            dispatch(setTasks(userPracticalTasks))
        };

        courseId && leassonId && fetchUserTasks()
    }, [courseId, leassonId])

    const isSurrenderedTask = (taskId) => {
        return tasks.length && tasks?.some(t => t.practicalTaskId === taskId)
    }

    const renderHTML = (text) => {
        const html = mdParser.render(text);

        const enhancedHtml = html.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (match, level, content) => {
            const anchor = content.toLowerCase().replace(/\s+/g, '-');

            return `<h${level} id="${anchor}">${content}</h${level}>`
        });

        return enhancedHtml;
    }

    const handleAddFile = (taskId) => {
        const taskIndex = leasson.practicalTasks.findIndex(task => task.id === taskId);
        const nextTaskId = leasson.practicalTasks[taskIndex + 1]?.id;

        dispatch(setIsOpenModalTaskFile(true))
        dispatch(setTaskId(taskId))
        dispatch(setCourseIdModalTaskFile(+courseId))
        dispatch(setNextTaskId(nextTaskId || null))
    }

    return (
        <>
            {
                leasson ? (
                    <Container>
                        <SideBar>
                            <SideBarSection>
                                <SectionTitle>Навигация по уроку</SectionTitle>
                                {headings.map((heading, index) => (
                                    <NavigationLink key={index} href={`#${heading.anchor}`}>
                                        {heading.text}
                                    </NavigationLink>
                                ))}
                            </SideBarSection>
                        </SideBar>
                        <LeassonWrapper>
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
                        </LeassonWrapper>
                        <ButtonPrev to={leasson?.prev}>
                            <IconButton>
                                <ArrowBackIosNew />
                            </IconButton>
                        </ButtonPrev>
                        <ButtonNext to={leasson?.next}>
                            <IconButton>
                                <ArrowForwardIos />
                            </IconButton>
                        </ButtonNext>
                    </Container>
                ) : null
            }
        </>
    );
};
