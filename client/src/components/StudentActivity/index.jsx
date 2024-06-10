import { useSelector } from "react-redux";
import { ButtonContinue, DashboardActivityContainer, DashboardActivityHeader, Descriptor, Offer, SalutationBlock } from "./styled";
import { useEffect, useState } from "react";
import { getUserPracticalTasks, getUserCourseList } from "@/api";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { PieChart } from '@mui/x-charts/PieChart';

dayjs.extend(isBetween);

export const StudentActivity = () => {
    const { user: { name } } = useSelector(state => state);
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(dayjs());
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            const { data: { userPracticalTasks } } = await getUserPracticalTasks();
            setTasks(userPracticalTasks);
        };

        const fetchUserCourses = async () => {
            const { userCourses } = await getUserCourseList();
            setCourses(userCourses);
        };

        fetchUserTasks();
        fetchUserCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse && startDate && endDate) {
            const courseTasks = selectedCourse.modules.flatMap(module =>
                module.partitions.flatMap(partition =>
                    partition.leassons.flatMap(lesson =>
                        lesson.practicalTasks.map(task => task.id)
                    )
                )
            );

            const filteredTasks = tasks.filter(task =>
                courseTasks.includes(task.practicalTaskId) &&
                dayjs(task.createdAt).isBetween(startDate, endDate, null, '[]')
            );

            const totalTasks = courseTasks.length;
            const completedTasks = filteredTasks.length;

            setChartData([
                { id: 0, value: completedTasks, label: 'Выполнено', color: '#ffc773' },
                { id: 1, value: totalTasks - completedTasks, label: 'Осталось', color: '#c19cf6' }
            ]);
        }
    }, [selectedCourse, startDate, endDate, tasks]);

    const handleCourseChange = (event) => {
        const course = courses.find(course => course.id === event.target.value);
        setSelectedCourse(course);
        setStartDate(dayjs(course.enrolmentDate));
    };

    const handleStartDateChange = (newValue) => {
        if (!selectedCourse || !newValue || newValue.isBefore(dayjs(selectedCourse.enrolmentDate))) {
            return;
        }
        setStartDate(newValue);
    };

    const handleEndDateChange = (newValue) => {
        if (!newValue || newValue.isBefore(startDate) || newValue.isAfter(dayjs())) {
            return;
        }
        setEndDate(newValue);
    };

    return (
        <DashboardActivityContainer>
            <DashboardActivityHeader>
                <SalutationBlock>
                    <Offer>С возвращением, {name}!</Offer>
                    {/* <Descriptor>Продолжите обучение, в последний раз вы выполнили {tasks.length} уроков</Descriptor>
                    <ButtonContinue>Продолжить обучение</ButtonContinue> */}
                </SalutationBlock>
            </DashboardActivityHeader>
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="course-select-label">Курс</InputLabel>
                <Select
                    labelId="course-select-label"
                    value={selectedCourse ? selectedCourse.id : ''}
                    onChange={handleCourseChange}
                    label="Курс"
                >
                    {courses && courses.map(course => (
                        <MenuItem key={course.id} value={course.id}>
                            {course.name}
                        </MenuItem>
                    ))}
                </Select>
                {selectedCourse && (
                    <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Дата от"
                                value={startDate}
                                onChange={handleStartDateChange}
                                minDate={dayjs(selectedCourse.enrolmentDate)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DatePicker
                                label="Дата до"
                                value={endDate}
                                onChange={handleEndDateChange}
                                minDate={startDate}
                                maxDate={dayjs()}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </>
                )}
            </FormControl>
            {selectedCourse && (
                <div>
                    <PieChart
                        series={[
                            {
                                data: chartData,
                            },
                        ]}
                        width={400}
                        height={400}
                    />
                </div>
            )}
        </DashboardActivityContainer>
    );
};
