"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, DollarSign, Users } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export default function JobDetails() {
  const params = useParams()
  const jobId = params.id
  const [job, setJob] = useState(null)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    fetchJobDetails()
    checkApplicationStatus()
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
        experience: "Senior Level (6-10 years)",
        salary: "$120,000 - $160,000",
        description: `We are looking for a Senior Frontend Developer to join our engineering team and help build the next generation of our platform. You will work closely with our design and product teams to create exceptional user experiences.

Key Responsibilities:
• Develop and maintain high-quality React applications
• Collaborate with designers to implement pixel-perfect UIs
• Write clean, maintainable, and well-tested code
• Mentor junior developers and contribute to technical decisions
• Optimize applications for maximum speed and scalability`,
        requirements: `Required Qualifications:
• Bachelor's degree in Computer Science or related field
• 6+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript
• Experience with state management libraries (Redux, Zustand)
• Proficiency in CSS-in-JS solutions and responsive design
• Experience with testing frameworks (Jest, React Testing Library)
• Strong understanding of web performance optimization
• Excellent communication and collaboration skills

Preferred Qualifications:
• Experience with Next.js and server-side rendering
• Knowledge of GraphQL and Apollo Client
• Familiarity with design systems and component libraries
• Experience with CI/CD pipelines and deployment processes`,
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest"],
        postedAt: "2024-01-15T10:30:00Z",
        company: "TechCorp Inc.",
        benefits: [
          "Competitive salary and equity package",
          "Comprehensive health, dental, and vision insurance",
          "Flexible work arrangements and remote options",
          "Professional development budget",
          "Unlimited PTO policy",
          "Modern office with free meals and snacks",
        ],
      })
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const checkApplicationStatus = async () => {
    try {
      // Mock: assume user hasn't applied
      setHasApplied(false)
    } catch (error) {
      console.log("Using mock data - API not available")
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!job) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/candidate/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="text-lg">
                  {job.company} • {job.department}
                </CardDescription>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {job.type}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Users className="mr-1 h-3 w-3" />
                    {job.experience}
                  </Badge>
                  {job.salary && (
                    <Badge variant="outline" className="flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {job.salary}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{job.description}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{job.requirements}</pre>
              </div>
            </CardContent>
          </Card>

          {job.benefits && job.benefits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasApplied ? (
                <div className="text-center space-y-2">
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    Application Submitted
                  </Badge>
                  <p className="text-sm text-muted-foreground">You have already applied for this position</p>
                </div>
              ) : (
                <Link to={`/candidate/jobs/${job.id}/apply`}>
                  <Button className="w-full" size="lg">
                    Apply for this Position
                  </Button>
                </Link>
              )}

              <div className="text-center text-sm text-muted-foreground">Posted on {formatDate(job.postedAt)}</div>
            </CardContent>
          </Card>

          {job.skills && job.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Department</span>
                <span className="text-sm font-medium">{job.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Job Type</span>
                <span className="text-sm font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Experience</span>
                <span className="text-sm font-medium">{job.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm font-medium">{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Salary</span>
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
