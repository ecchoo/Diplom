export const COURSES_ENDPOINTS = {
    LIST: '/courses/list',
    BY_ID: '/courses/',
    ENROLL: '/courses/enroll',
    CREATE: '/courses/create',
    UPDATE: '/courses/update',
    DELETE: '/courses/delete'
}

export const MODULES_ENDPOINTS = {
    CREATE: '/modules/create',
    UPDATE: '/modules/update',
    DELETE: '/modules/delete'
}

export const PARTITOIONS_ENDPOINTS = {
    CREATE: '/partitions/create',
    UPDATE: '/partitions/update',
    DELETE: '/partitions/delete'
}

export const LEASSONS_ENDPOINTS = {
    CREATE: '/leassons/create',
    UPDATE: '/leassons/update',
    DELETE: '/leassons/delete'
}

export const PRACTICAL_TASKS_ENDPOINTS = {
    CREATE: '/practical-tasks/create',
    UPDATE: '/practical-tasks/update',
    DELETE: '/practical-tasks/delete',
    SUBMIT: '/practical-tasks/submit',
    USER_PRACTICAL_TASKS: '/practical-tasks/user-practical-tasks',
    PRACTICAL_TASKS_TURNED_IN_BY_ID: '/practical-tasks/turned-in/',
    CHECK: '/practical-tasks/chek-user-practical-task/'
}

export const DASHBOARD_ENDPOINTS = {
    CHAT_LIST: '/dashboard/chat-list',
    USER_COURSE_LIST: '/dashboard/user-course-list/',
    TEACHER_COURSE_LIST: '/dashboard/teacher-course-list/',
    // TEACHER_COURSE: '/dashboard/teacher-course-list'
}

export const AUTH_USER_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER_STUDENT: '/auth/register-student',
    REGISTER_TEACHER: '/auth/register-teacher',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
    GOOGLE: '/auth/google',
    GITHUB: '/auth/github'
}

export const PROGRESS_ENDPOINTS = {
    UPDATE: '/progress/update'
}

export const MODERATOR_ENDPOINTS = {
    MODERATION_MESSAGES: '/moderator/moderation-messages'
}

export const TEACHER_ENDPOINTS = {
    LIST: 'teachers/list'
}

export const FILE_ENDPOINTS = {
    UPLOAD: '/upload',
    DOWNLOAD: '/download/'
}

export const TESTS_ENDPOINTS = {
    BY_ID: '/tests/',
    CREATE: '/tests/create',
    UPDATE: '/tests/update',
    DELETE: '/tests/delete',
    SUBMIT: 'tests/submit'
}

export const QUESTIONS_ENDPOINTS = {
    CREATE: '/questions/create',
    UPDATE: '/questions/update',
    DELETE: '/questions/delete'
}

export const ANSWERS_ENDPOINTS = {
    CREATE: '/answers/create',
    UPDATE: '/answers/update',
    DELETE: '/answers/delete'
}