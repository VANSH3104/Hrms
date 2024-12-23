import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Auth/Page/loginAuth";
import { MainLayout } from "./Layout/MainLayout";
import { Dashboard } from "./Dashboard/Dashboard";
import { TaskAssignments } from "./Taskassignment/taskassignment";
import { LeavePage } from "./leave/leavepage";
import { EmployeeDirectory } from "./employeedirectory/employee";
import { Attendance } from "./attendence/attendence";
import { EmployeeSearch } from "./employeedirectory/components/employeeShow";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />

          {/* Protected routes (dashboard with dynamic id) */}
          <Route
            path="/dashboard/:id"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <MainLayout>
                <EmployeeDirectory />
              </MainLayout>
            }
          />
          {/* <Route
            path="/employee-profiles/:id"
            element={
              <MainLayout>
                <EmployeeProfiles />
              </MainLayout>
            }
          />  */}
          <Route
            path="/leave-management/:id"
            element={
              <MainLayout>
                <LeavePage />
              </MainLayout>
            }
          />
          <Route
            path="/attendance-tracking/:id"
            element={
              <MainLayout>
                <Attendance />
              </MainLayout>
            }
          />
          <Route
            path="/employeeSearch/:id"
            element={
              <MainLayout>
                <EmployeeSearch />
              </MainLayout>
            }
          />
          
          <Route
            path="/task-assignments/:id"
            element={
              <MainLayout>
                <TaskAssignments />
              </MainLayout>
            }
          />
          {/* <Route
            path="/performance-reviews/:id"
            element={
              <MainLayout>
                <PerformanceReviews />
              </MainLayout>
            }
          /> */}
          {/* <Route
            path="/onboarding/:id"
            element={
              <MainLayout>
                <OnboardingWorkflow />
              </MainLayout>
            }
          /> */}
          {/* <Route
            path="/search/:id"
            element={
              <MainLayout>
                <EmployeeSearch />
              </MainLayout>
            }
          /> */}
          {/* <Route
            path="/settings/:id"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
