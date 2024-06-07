export const COURSES_ENDPOINTS = {
    LIST: '/courses/list',
    BY_ID: '/courses/',
    ENROLL: '/courses/enroll',
    CREATE: '/courses/create',
    UPDATE: '/courses/update'
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
    USER_PRACTICAL_TASKS: '/practical-tasks/user-practical-tasks'
}

export const DASHBOARD_ENDPOINTS = {
    CHAT_LIST: '/dashboard/chat-list',
    USER_COURSE_LIST: '/dashboard/user-course-list',
    TEACHER_COURSE_LIST: '/dashboard/teacher-course-list',
}

export const AUTH_USER_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
    GOOGLE: '/auth/google',
    GITHUB: '/auth/github'
}

export const MODERATOR_ENDPOINTS = {
    MODERATION_MESSAGES: '/moderator/moderation-messages'
}

export const TEACHER_ENDPOINTS = {
    LIST: 'teachers/list'
}

export const UPLOAD_FILE_ENDPOINT = '/upload'