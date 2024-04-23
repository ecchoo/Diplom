import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "../AppRouter"
import { Header } from "../Header"
import { Footer } from "../Footer"
import styled, { ThemeProvider } from "styled-components"
import { theme } from "@/theme"
import { AuthModal } from "../AuthModal"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store"

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <AuthModal />
                        <AppRouter>
                        </AppRouter>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}