"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export default function HRJobs() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredJobs(filtered)
  }, [jobs, searchTerm])

  const fetchJobs = async () => {
    try {
      // Mock data for demo
      setJobs([
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "San Francisco, CA",
          type: "Full-time",
          status: "active",
          applications: 24,
          createdAt: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          title: "Product Manager",
          department: "Product",
          location: "Remote",
          type: "Full-time",
          status: "active",
          applications: 18,
          createdAt: "2024-01-14T14:20:00Z",
        },
        {
          id: 3,
          title: "UX Designer",
          department: "Design",
          location: "New York, NY",
          type: "Full-time",
          status: "active",
          applications: 31,
          createdAt: "2024-01-13T09:15:00Z",
        },
        {
          id: 4,
          title: "Backend Developer",
          department: "Engineering",
          location: "Austin, TX",
          type: "Full-time",
          status: "active",
          applications: 19,
          createdAt: "2024-01-12T16:45:00Z",
        },
        {
          id: 5,
          title: "Marketing Specialist",
          department: "Marketing",
          location: "Remote",
          type: "Full-time",
          status: "active",
          applications: 12,
          createdAt: "2024-01-11T11:20:00Z",
        },
      ])
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Postings</h2>
          <p className="text-muted-foreground">Manage your job postings and track applications</p>
        </div>
        <Link to="/hr/jobs/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">
                      {job.department} • {job.location} • {job.type}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Posted {formatDate(job.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {job.applications} Applications
                    </span>
                  </div>

                  <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/hr/jobs/${job.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/hr/jobs/${job.id}/applications`}>
                    <Button size="sm">View Applications</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? "No jobs found matching your search." : "No jobs posted yet."}
            </p>
            {!searchTerm && (
              <Link to="/hr/jobs/create">
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Post Your First Job
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
