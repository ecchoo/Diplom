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

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <AuthModal />
                        <CourseModal />
                        <ConfirmDeleteMessage />

                        <AppRouter>
                        </AppRouter>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}