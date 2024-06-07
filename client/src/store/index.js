import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/User'
import modalAuthReducer from './reducers/ModalAuth'
import modalCourseReducer from './reducers/ModalCourse'
import chatsReducer from './reducers/Chats'
import dashboardReducer from './reducers/Dashboard'
import modalConfirmDeleteMessageReducer from './reducers/ModalConfirmDeleteMessage'
import editMessageReducer from './reducers/EditMessage'
import modalLockUserReducer from './reducers/ModalLockUser'
import moderatorReducer from './reducers/Moderator'
import courseCreateUpdateReducer from './reducers/CourseCreateUpdate'
import teacherReducer from './reducers/Teacher'
import modalTaskFileReducer from './reducers/ModalTaskFile'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    user: userReducer,
    modalAuth: modalAuthReducer,
    modalCourse: modalCourseReducer,
    chats: chatsReducer,
    dashboard: dashboardReducer,
    modalConfirmDeleteMessage: modalConfirmDeleteMessageReducer,
    editMessage: editMessageReducer,
    modalLockUser: modalLockUserReducer,
    moderator: moderatorReducer,
    courseCreateUpdate: courseCreateUpdateReducer,
    teacher: teacherReducer,
    modalTaskFile: modalTaskFileReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store)