import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/User'
import authModalReducer from './reducers/AuthModal'
import courseModalReducer from './reducers/CourseModal'
import chatsReducer from './reducers/Chats'
import dashboardReducer from './reducers/Dashboard'
import confirmDeleteMessageReducer from './reducers/ConfirmDeleteMessage'
import editMessageReducer from './reducers/EditMessage'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    user: userReducer,
    authModal: authModalReducer,
    courseModal: courseModalReducer,
    chats: chatsReducer,
    dashboard: dashboardReducer,
    confirmDeleteMessage: confirmDeleteMessageReducer,
    editMessage: editMessageReducer
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