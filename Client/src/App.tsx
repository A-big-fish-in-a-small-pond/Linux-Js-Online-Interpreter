import { Navigate, Route, Routes } from "react-router-dom";
import { Mobile, PC } from "./utils/checkPlatform";
import LoginRoutePC from "./pages/pc/login";
import NotFoundRoute from "./pages/pc/notFound";
import LoginRouteMobile from "./pages/mobile/login";
import MainRoutePC from "./pages/pc/main";

function App() {
    return (
        <div className="App">
            <Mobile>
                <Routes>
                    <Route path="*" element={<Navigate to="/m_login" replace />} />
                    <Route path={"/m_login"} element={<LoginRouteMobile />} />
                    <Route path={"*"} element={<NotFoundRoute />} />
                </Routes>
            </Mobile>

            <PC>
                <Routes>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                    <Route path={"/login"} element={<LoginRoutePC />} />
                    <Route path={"/main"} element={<MainRoutePC />} />
                    <Route path={"*"} element={<NotFoundRoute />} />
                </Routes>
            </PC>
        </div>
    );
}

export default App;
