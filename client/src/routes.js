import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { COURSES, DASHBOARD, HOME } from "./constants";
import { Dashboard } from "./pages/Dashboard";

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
    }
]