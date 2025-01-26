import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TimeTablePage from "./pages/TimeTablePage";
import UploadDataPage from "./pages/UploadDataPage";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import AuthLayout from "./pages/AuthPages/AuthLayout";
import LoginPage from "./pages/AuthPages/LoginPage";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectEditPage from "./pages/SubjectEditPage";
import { Toaster } from "react-hot-toast";
import ProfessorsPage from "./pages/ProfessorsPage";
import TestPage from "./pages/TestPage";
import DashboardPage2 from "./pages/DashboardPage2";
import DepartmentsPage from "./pages/DepartmentsPage";

function App() {
    // bg-[#100f14]
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    <Route path="/" element={<DashboardPage2 />}>
                        <Route index element={<HomePage />} />
                        <Route path="/timetable" element={<TimeTablePage />} />
                        <Route path="/subjects" element={<SubjectsPage />} />
                        <Route
                            path="/subjects/edit/:id"
                            element={<SubjectEditPage />}
                        />
                        <Route
                            path="/upload-data"
                            element={<UploadDataPage />}
                        />
                        <Route
                            path="/professors"
                            element={<ProfessorsPage />}
                        />
                        <Route
                            path="/departments"
                            element={<DepartmentsPage />}
                        />
                        <Route path="/test" element={<TestPage />} />
                        <Route
                            path="*"
                            element={
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-center text-2xl font-bold">
                                        Page Not Found
                                    </p>
                                </div>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    );
}

export default App;
