import Letter from "../pages/Letter/LetterCreation";
import User from "../pages/User/UserRegistration";
import path from "./path";

const routes = [
    {
        component: <Letter />,
        path: path.letter
    },
    {
        component: <User />,
        path: path.user
    }
]
export default routes;