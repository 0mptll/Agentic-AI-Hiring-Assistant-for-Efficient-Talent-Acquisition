"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Download, Mail, Calendar, Star } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export default function JobApplications() {
  const params = useParams()
  const jobId = params.id
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchJobDetails()
    fetchApplications()
  }, [jobId])

  const fetchJobDetails = async () => {
    try {
      // Mock data for demo
      setJob({
        id: jobId,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "Full-time",
      })
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const fetchApplications = async () => {
    try {
      // Mock data for demo
      setApplications([
        {
          id: 1,
          candidateName: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          experience: "5 years",
          score: 9.2,
          resumeUrl: "/resumes/john-doe.pdf",
          portfolioLinks: ["https://johndoe.dev", "https://github.com/johndoe"],
          appliedAt: "2024-01-15T10:30:00Z",
          status: "pending",
        },
        {
          id: 2,
          candidateName: "Jane Smith",
          email: "jane.smith@email.com",
          phone: "+1 (555) 987-6543",
          experience: "7 years",
          score: 8.8,
          resumeUrl: "/resumes/jane-smith.pdf",
          portfolioLinks: ["https://janesmith.portfolio.com"],
          appliedAt: "2024-01-14T14:20:00Z",
          status: "pending",
        },
        {
          id: 3,
          candidateName: "Mike Johnson",
          email: "mike.johnson@email.com",
          phone: "+1 (555) 456-7890",
          experience: "4 years",
          score: 8.5,
          resumeUrl: "/resumes/mike-johnson.pdf",
          portfolioLinks: ["https://mikej.dev", "https://linkedin.com/in/mikejohnson"],
          appliedAt: "2024-01-13T09:15:00Z",
          status: "pending",
        },
      ])
    } catch (error) {
      console.log("Using mock data - API not available")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmCandidate = async (applicationId) => {
    try {
      // Update application status
      setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: "confirmed" } : app)))
      alert("Interview scheduled and email sent to candidate!")
    } catch (error) {
      console.error("Error confirming candidate:", error)
      alert("Error scheduling interview. Please try again.")
    }
  }

  const getScoreColor = (score) => {
    if (score >= 9) return "text-green-600"
    if (score >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score) => {
    if (score >= 9) return "default"
    if (score >= 7) return "secondary"
    return "destructive"
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Sort applications by score in descending order
  const sortedApplications = [...applications].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/hr/jobs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground">
            {job?.title} • {sortedApplications.length} applications
          </p>
        </div>
      </div>

      {/* Job Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{job?.title}</CardTitle>
          <CardDescription>
            {job?.department} • {job?.location} • {job?.type}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {sortedApplications.map((application) => (
          <Card key={application.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${application.candidateName}`} />
                    <AvatarFallback>
                      {application.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{application.candidateName}</h3>
                      <p className="text-sm text-muted-foreground">{application.email}</p>
                      <p className="text-sm text-muted-foreground">{application.phone}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{application.experience} experience</Badge>
                      <Badge variant={getScoreBadgeVariant(application.score)}>
                        <Star className="mr-1 h-3 w-3" />
                        {application.score}/10
                      </Badge>
                      <Badge variant={application.status === "confirmed" ? "default" : "secondary"}>
                        {application.status}
                      </Badge>
                    </div>

                    {/* Portfolio Links */}
                    {application.portfolioLinks && application.portfolioLinks.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Portfolio Links:</p>
                        <div className="flex flex-wrap gap-2">
                          {application.portfolioLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className={`text-2xl font-bold ${getScoreColor(application.score)}`}>{application.score}/10</div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Resume
                      </a>
                    </Button>

                    {application.status === "pending" && (
                      <Button size="sm" onClick={() => handleConfirmCandidate(application.id)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Confirm
                      </Button>
                    )}

                    {application.status === "confirmed" && (
                      <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Interview Scheduled
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No applications received yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
