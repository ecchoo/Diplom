import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { COURSES, COURSE_PASSAGE, DASHBOARD, HOME, VERIFY_EMAIL } from "./constants";
import { Dashboard } from "./pages/Dashboard";
import { Course } from "./pages/Course";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Leasson } from "./pages/Leasson";

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
    // {
    //     path: `${COURSE_PASSAGE}:id`,
    //     Component: Leasson
    // },
    {
        path: `${COURSES}:id`,
        Component: Course
    },
    {
        path: `${COURSES}:courseId/leassons/:leassonId`,
        Component: Leasson
    },
    {
        path: `${VERIFY_EMAIL}`,
        Component: VerifyEmail
    }
]