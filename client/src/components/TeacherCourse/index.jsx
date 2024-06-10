import { checkUserPracticalTask, downloadFile, getPracticalTasksTurnedInById, getTeacherCourseByCourseId } from "@/api";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Avatar,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CloudDownload } from "@mui/icons-material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { ButtonTest, CourseName, Preview, SelectTasks, TasksContainer, TeacherCourseHeader } from "./styled";
import { clearTestInfo, setActiveDashboardSection, setIsOpenTestCreateUpdate, setSelectedTeacherCourseId, setTest, setTypeTestCreateUpdate } from "@/store/reducers";
import { DASHBOARD_SECTIONS, TEST_CREATE_UPDATE_TYPES } from "@/constants";
import { getTime } from "@/utils";

export const TeacherCourse = () => {
    const dispatch = useDispatch();

    const { teacher: { selectedCourseId: courseId } } = useSelector(state => state);

    const [teacherCourse, setTeacherCourse] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [selectedTaskId, setSelectedTaskId] = useState(0);
    const [userTasks, setUserTasks] = useState(null);

    const allTasks = teacherCourse?.modules?.flatMap(m =>
        m?.partitions?.flatMap(p =>
            p?.leassons?.flatMap(l =>
                l?.practicalTasks?.map((task, index) => ({
                    ...task,
                    leassonName: l.name,
                    taskNumber: index + 1
                }))
            )
        )
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBack = () => {
        dispatch(setActiveDashboardSection(DASHBOARD_SECTIONS.TEACHER_COURSES));
        dispatch(setSelectedTeacherCourseId(0));
    };

    const handleTest = () => {
        dispatch(setIsOpenTestCreateUpdate(true));

        if (teacherCourse.test) {
            dispatch(setTest(teacherCourse.test));
            dispatch(setTypeTestCreateUpdate(TEST_CREATE_UPDATE_TYPES.UPDATE));
        } else {
            dispatch(clearTestInfo());
            dispatch(setTypeTestCreateUpdate(TEST_CREATE_UPDATE_TYPES.CREATE));
        }
    };

    const handleChangeTask = async (e) => {
        const { target: { value } } = e;
        setSelectedTaskId(value);
    };

    const handleDownloadTask = async (filePath) => {
        try {
            const response = await fetch(filePath);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filePath.split('/').pop();
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(`Error downloading file: ${error.message}`);
        }
    };

    const handleMarkChange = (taskId, value) => {
        if (value >= 0 && value <= 10) {
            setUserTasks(prevUserTasks => prevUserTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, mark: value };
                }
                return task;
            }));
        }
    };

    const handleSaveMark = async ({ taskId, userId, practicalTaskId }) => {
        const taskToUpdate = userTasks.find(task => task.id === taskId);

        if (taskToUpdate) {
            await checkUserPracticalTask({
                userId,
                practicalTaskId,
                mark: +taskToUpdate.mark
            });
        }
    };

    useEffect(() => {
        const fetchPracticalTasksTurnedIn = async () => {
            const { data: { practicalTasksTurnedIn } } = await getPracticalTasksTurnedInById(selectedTaskId);
            console.log(practicalTasksTurnedIn);
            setUserTasks(practicalTasksTurnedIn);
        };

        selectedTaskId && fetchPracticalTasksTurnedIn();
    }, [selectedTaskId]);

    useEffect(() => {
        const fetchTeacherCourse = async () => {
            const { data: { teacherCourse: course } } = await getTeacherCourseByCourseId(courseId);
            setTeacherCourse(course);
        };

        courseId && fetchTeacherCourse();
    }, [courseId]);

    return (
        <>
            <TeacherCourseHeader>
                <Preview>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIosNew />
                    </IconButton>
                    <CourseName>Курс: {teacherCourse?.name}</CourseName>
                </Preview>
                <ButtonTest onClick={handleTest}>{teacherCourse?.test ? 'Редактирование теста' : 'Создание теста'}</ButtonTest>
            </TeacherCourseHeader>
            {teacherCourse && teacherCourse.courseUsers && teacherCourse.courseUsers.length && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Фото</TableCell>
                                <TableCell>Прогресс</TableCell>
                                <TableCell>Результат теста</TableCell>
                                <TableCell>Текущий урок</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teacherCourse.courseUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((courseUser) => (
                                <TableRow key={courseUser.id}>
                                    <TableCell>{courseUser.name}</TableCell>
                                    <TableCell>
                                        <Avatar src={courseUser.photo} alt={courseUser.name} />
                                    </TableCell>
                                    <TableCell>{courseUser?.userProgress?.progressPercentage}%</TableCell>
                                    <TableCell>{courseUser.testResult || 'Тест не пройден'}</TableCell>
                                    <TableCell>{courseUser.userProgress?.currentLeasson?.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={teacherCourse.courseUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
            <TasksContainer>
                <FormControl>
                    <InputLabel id="task-label">Задание для проверки</InputLabel>
                    <SelectTasks
                        labelId="task-label"
                        id="task"
                        value={selectedTaskId}
                        name="task"
                        label="Выберите задание для проверки"
                        onChange={handleChangeTask}
                    >
                        {allTasks && allTasks.length && allTasks.map(({ id, leassonName, taskNumber }) =>
                            <MenuItem key={id} value={id}>{leassonName}- {taskNumber}</MenuItem>
                        )}
                    </SelectTasks>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Задание</TableCell>
                                <TableCell>Отметка</TableCell>
                                <TableCell>Сдал</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userTasks && userTasks.length && userTasks.map(userTask =>
                                <TableRow key={userTask.id}>
                                    <TableCell>{userTask?.user?.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={handleDownloadTask.bind(null, userTask.filePath)}>
                                            <CloudDownload />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            key={userTask.id}
                                            type="number"
                                            value={userTask.mark ?? ''}
                                            onChange={(e) => handleMarkChange(userTask.id, e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>{getTime(userTask.createdAt)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleSaveMark({
                                                taskId: userTask.id,
                                                userId: userTask.user.id,
                                                practicalTaskId: userTask.practicalTaskId,
                                            })}
                                        >
                                            Сохранить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TasksContainer>
        </>
    );
};

