import { Routes, Route, Navigate } from 'react-router-dom'
import LayoutPublic from './components/layout/LayoutPublic.jsx'
import LayoutAdmin from './components/layout/LayoutAdmin.jsx'
import LayoutStudent from './components/layout/LayoutStudent.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from './pages/login.jsx'
import Dashboard from './pages/admin/dashboard.jsx'
import Students from './pages/admin/students.jsx'
import Courses from './pages/admin/courses.jsx'
import Exams from './pages/admin/exams.jsx'
import Questions from './pages/admin/questions.jsx'
import Results from './pages/admin/results.jsx'
import Home from './pages/student/home.jsx'
import ExamPass from './pages/student/ExamPass.jsx'
import ExamResult from './pages/student/ExamResult.jsx'
import History from './pages/student/history.jsx'
const App = () => {
  return (
    <Routes>
      <Route element={<LayoutPublic />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <LayoutAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="courses" element={<Courses />} />
        <Route path="exams" element={<Exams />} />
        <Route path="exams/:id/questions" element={<Questions />} />
        <Route path="exams/:id/results" element={<Results />} />
      </Route>
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <LayoutStudent />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="exams/:id" element={<ExamPass />} />
        <Route path="exams/:id/result" element={<ExamResult />} />
        <Route path="results" element={<History />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
export default App