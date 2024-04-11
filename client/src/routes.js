import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { COURSES, HOME } from "./constants";

export const routes = [
    {
        path: HOME,
        Component: Home
    },
    {
        path: COURSES,
        Component: Courses
    },
]