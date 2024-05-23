import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "../AppRouter"
import { ThemeProvider } from "styled-components"
import { theme } from "@/theme"
import { AuthModal } from "../AuthModal"
import { Provider, useSelector } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store"
import { CourseModal } from "../CourseModal"
import { ConfirmDeleteMessage } from "../ConfirmDeleteMessage"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <GoogleOAuthProvider clientId={clientId}>
                            <AuthModal />
                            <CourseModal />
                            <ConfirmDeleteMessage />

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