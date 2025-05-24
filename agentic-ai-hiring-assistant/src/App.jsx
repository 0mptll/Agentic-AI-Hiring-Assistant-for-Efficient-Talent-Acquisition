import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"

// Import pages
import HomePage from "@/pages/HomePage"
import HRLayout from "@/layouts/HRLayout"
import CandidateLayout from "@/layouts/CandidateLayout"
import HRDashboard from "@/pages/hr/HRDashboard"
import HRJobs from "@/pages/hr/HRJobs"
import CreateJob from "@/pages/hr/CreateJob"
import JobApplications from "@/pages/hr/JobApplications"
import CandidateDashboard from "@/pages/candidate/CandidateDashboard"
import JobDetails from "@/pages/candidate/JobDetails"
import ApplyJob from "@/pages/candidate/ApplyJob"

function App() {
  return (
    <SidebarProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* HR Routes */}
            <Route path="/hr" element={<HRLayout />}>
              <Route index element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="dashboard" element={<HRDashboard />} />
              <Route path="jobs" element={<HRJobs />} />
              <Route path="jobs/create" element={<CreateJob />} />
              <Route path="jobs/:id/applications" element={<JobApplications />} />
            </Route>

            {/* Candidate Routes */}
            <Route path="/candidate" element={<CandidateLayout />}>
              <Route index element={<Navigate to="/candidate/dashboard" replace />} />
              <Route path="dashboard" element={<CandidateDashboard />} />
              <Route path="jobs/:id" element={<JobDetails />} />
              <Route path="jobs/:id/apply" element={<ApplyJob />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </SidebarProvider>
  )
}

export default App
