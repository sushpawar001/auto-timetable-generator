import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import TimeTablePage from "./pages/TimeTablePage";
import UploadDataPage from "./pages/UploadDataPage";

function App() {
    // bg-[#100f14]
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="/timetable" element={<TimeTablePage />} />
                    <Route path="/upload-data" element={<UploadDataPage />} />
                    <Route path="*" element={<p>Page Not Found</p>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
