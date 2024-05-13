import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { COURSES, DASHBOARD, HOME } from "./constants";
import { Dashboard } from "./pages/Dashboard";
import { Course } from "./pages/Course";

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
    }
]