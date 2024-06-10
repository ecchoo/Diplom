import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { COURSES, DASHBOARD, HOME, TEACHER_COURSE, TESTS, VERIFY_EMAIL } from "./constants";
import { Dashboard } from "./pages/Dashboard";
import { Course } from "./pages/Course";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Leasson } from "./pages/Leasson";
import { TeacherCourse } from "./components/TeacherCourse";
import { CourseContent } from "./pages/CourseContent";
import { CourseTest } from "./pages/CourseTest";

export const routes = [
    {
        path: HOME,
        Component: Home
    },
    {
        path: COURSES,
        Component: Courses
    },
    {
        path: DASHBOARD,
        Component: Dashboard
    },
    {
        path: `${COURSES}:id`,
        Component: Course
    },
    {
        path: `${COURSES}:id/content`,
        Component: CourseContent
    },
    {
        path: `${TESTS}:id`,
        Component: CourseTest
    },
    {
        path: `${COURSES}:courseId/lessons/:leassonId`,
        Component: Leasson
    },
    {
        path: `${VERIFY_EMAIL}`,
        Component: VerifyEmail
    },
]