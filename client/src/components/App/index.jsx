import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "../AppRouter"
import { Header } from "../Header"
import { Footer } from "../Footer"
import styled, { ThemeProvider } from "styled-components"
import { theme } from "@/theme"

export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                {/* <Header /> */}
                <AppRouter>
                </AppRouter>
                {/* <Footer /> */}
            </ThemeProvider>
        </BrowserRouter>
    )
}