import { Navigate, Route, Routes } from "react-router-dom";
import CounterContainer from "./pages/counter";
import NotFound from "./pages/notFound";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path={"/login"} element={<CounterContainer />} />
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
