import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../routes";
import { HOME } from "../../constants";


export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, Component }) =>
                <Route key={path} path={path} Component={Component} exact />
            )}
            <Route path="*" element={<Navigate to={HOME} replace />} />
        </Routes>
    )
}