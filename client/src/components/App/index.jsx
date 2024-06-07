import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "../AppRouter"
import { ThemeProvider } from "styled-components"
import { theme } from "@/theme"
import { ModalAuth } from "../ModalAuth"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store"
import { ModalCourse } from "../ModalCourse"
import { ModalConfirmDeleteMessage } from "../ModalConfirmDeleteMessage"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalLockUser } from "../ModalLockUser"
import { DialogCourseCreateUpdate } from "../DialogCourseCreateUpdate"
import { ModalTaskFile } from "../ModalTaskFile"

export const App = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <GoogleOAuthProvider clientId={clientId}>
                            <ModalAuth />
                            <ModalCourse />
                            <ModalConfirmDeleteMessage />
                            <ModalLockUser />
                            <ModalTaskFile />

                            <DialogCourseCreateUpdate />

                            <ToastContainer />

                            <AppRouter>
                            </AppRouter>
                        </GoogleOAuthProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}