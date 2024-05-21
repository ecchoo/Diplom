import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { COURSES, DASHBOARD, HOME, VERIFY_EMAIL } from "./constants";
import { Dashboard } from "./pages/Dashboard";
import { Course } from "./pages/Course";
import { Component } from "react";
import { VerifyEmail } from "./pages/VerifyEmail";

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
        path: `${VERIFY_EMAIL}`,
        Component: VerifyEmail
    }
]