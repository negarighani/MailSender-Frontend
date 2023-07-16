import {BrowserRouter as ReactRouter, Route, Routes} from "react-router-dom";
import routes from "./route";
const Router = () => {
    return (
        <ReactRouter>
            <Routes>
                {routes.map(route => {
                    return <Route key ={route.path} path = {route.path} element={route.component } exact/>
                })}
            </Routes>
        </ReactRouter>)
}
export default Router;