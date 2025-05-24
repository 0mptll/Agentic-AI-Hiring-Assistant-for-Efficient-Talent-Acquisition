"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, MapPin, Clock, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState([])
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetchJobs()
    fetchMyApplications()
  }, [])

  useEffect(() => {
    // Filter jobs based on search term
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()),
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
          experience: "Senior Level (6-10 years)",
          salary: "$120,000 - $160,000",
          description: "We are looking for a Senior Frontend Developer to join our engineering team...",
          requirements: "Bachelor's degree in Computer Science or related field, 6+ years of experience...",
          skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
          postedAt: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          title: "Product Manager",
          department: "Product",
          location: "Remote",
          type: "Full-time",
          experience: "Mid Level (3-5 years)",
          salary: "$100,000 - $140,000",
          description: "Join our product team to drive product strategy and execution...",
          requirements: "MBA or equivalent experience, 3+ years in product management...",
          skills: ["Product Strategy", "Analytics", "User Research", "Agile"],
          postedAt: "2024-01-14T14:20:00Z",
        },
        {
          id: 3,
          title: "UX Designer",
          department: "Design",
          location: "New York, NY",
          type: "Full-time",
          experience: "Mid Level (3-5 years)",
          salary: "$90,000 - $120,000",
          description: "We're seeking a talented UX Designer to create exceptional user experiences...",
          requirements: "Bachelor's degree in Design or related field, 3+ years of UX design experience...",
          skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
          postedAt: "2024-01-13T09:15:00Z",
        },
      ])
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const fetchMyApplications = async () => {
    try {
      // Mock data for demo
      setApplications([
        {
          id: 1,
          jobId: 1,
          jobTitle: "Senior Frontend Developer",
          status: "pending",
          score: 8.5,
          appliedAt: "2024-01-15T10:30:00Z",
        },
      ])
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const hasApplied = (jobId) => {
    return applications.some((app) => app.jobId === jobId)
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
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Find Your Dream Job</h2>
        <p className="text-muted-foreground">Discover opportunities that match your skills and experience</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs by title, department, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* My Applications Summary */}
      {applications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track your job applications and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.jobTitle}</h4>
                    <p className="text-sm text-muted-foreground">Applied on {formatDate(app.appliedAt)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {app.score && (
                      <Badge variant="outline">
                        <Star className="mr-1 h-3 w-3" />
                        {app.score}/10
                      </Badge>
                    )}
                    <Badge variant={app.status === "confirmed" ? "default" : "secondary"}>{app.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Listings */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Available Positions</h3>

        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatDate(job.postedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline">{job.experience}</Badge>
                    {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{job.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <Link to={`/candidate/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>

                  {hasApplied(job.id) ? (
                    <Button variant="secondary" size="sm" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Link to={`/candidate/jobs/${job.id}/apply`}>
                      <Button size="sm">Apply Now</Button>
                    </Link>
                  )}
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
              {searchTerm ? "No jobs found matching your search." : "No jobs available at the moment."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
