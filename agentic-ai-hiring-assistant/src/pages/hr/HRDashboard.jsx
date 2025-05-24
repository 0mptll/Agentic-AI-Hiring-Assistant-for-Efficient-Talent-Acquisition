"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, TrendingUp, Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function HRDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    averageScore: 0,
    pendingReviews: 0,
  })

  const [recentJobs, setRecentJobs] = useState([])

  useEffect(() => {
    // Fetch dashboard stats
    fetchDashboardStats()
    fetchRecentJobs()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Mock data for demo
      setStats({
        totalJobs: 12,
        totalApplications: 156,
        averageScore: 7.2,
        pendingReviews: 23,
      })
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const fetchRecentJobs = async () => {
    try {
      // Mock data for demo
      setRecentJobs([
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "Engineering",
          applications: 24,
          status: "active",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          title: "Product Manager",
          department: "Product",
          applications: 18,
          status: "active",
          createdAt: "2024-01-14",
        },
        {
          id: 3,
          title: "UX Designer",
          department: "Design",
          applications: 31,
          status: "active",
          createdAt: "2024-01-13",
        },
      ])
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here's what's happening with your hiring process today.</p>
        </div>
        <Link to="/hr/jobs/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">Active job postings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Total applications received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}/10</div>
            <p className="text-xs text-muted-foreground">AI matching score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Job Postings</CardTitle>
          <CardDescription>Your latest job postings and their application status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.department}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{job.applications}</p>
                    <p className="text-xs text-muted-foreground">Applications</p>
                  </div>
                  <Badge variant="secondary">{job.status}</Badge>
                  <Link to={`/hr/jobs/${job.id}/applications`}>
                    <Button variant="outline" size="sm">
                      View Applications
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
