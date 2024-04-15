import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "../AppRouter"
import { Header } from "../Header"
import { Footer } from "../Footer"

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <AppRouter>
            </AppRouter>
            <Footer />
        </BrowserRouter>
    )
}