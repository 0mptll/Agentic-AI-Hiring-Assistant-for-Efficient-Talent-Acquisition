"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function ApplyJob() {
  const params = useParams()
  const navigate = useNavigate()
  const jobId = params.id

  const [job, setJob] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    portfolioLinks: [""],
  })
  const [resumeFile, setResumeFile] = useState(null)

  useEffect(() => {
    fetchJobDetails()
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePortfolioLinkChange = (index, value) => {
    const newLinks = [...formData.portfolioLinks]
    newLinks[index] = value
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: newLinks,
    }))
  }

  const addPortfolioLink = () => {
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, ""],
    }))
  }

  const removePortfolioLink = (index) => {
    const newLinks = formData.portfolioLinks.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: newLinks.length > 0 ? newLinks : [""],
    }))
  }

  const handleResumeUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate success for demo
      console.log("Application submitted successfully (demo mode)")
      alert("Application submitted successfully! You will receive an email confirmation.")
      navigate("/candidate/dashboard")
    } catch (error) {
      console.log("Demo mode - application submission simulated")
      alert("Application submitted successfully! You will receive an email confirmation.")
      navigate("/candidate/dashboard")
    } finally {
      setIsSubmitting(false)
    }
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
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Apply for Position</h2>
          <p className="text-muted-foreground">
            {job.title} • {job.department}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
          <CardDescription>Fill out the form below to apply for this position</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="e.g. 5 years"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume (PDF) *</Label>
              <div className="flex items-center space-x-4">
                <Input id="resume" type="file" accept=".pdf" onChange={handleResumeUpload} required />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {resumeFile && <p className="text-sm text-green-600">✓ {resumeFile.name} uploaded</p>}
            </div>

            <div className="space-y-2">
              <Label>Portfolio Links</Label>
              <div className="space-y-2">
                {formData.portfolioLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={link}
                      onChange={(e) => handlePortfolioLinkChange(index, e.target.value)}
                      placeholder="https://your-portfolio.com"
                    />
                    {formData.portfolioLinks.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removePortfolioLink(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addPortfolioLink}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Link
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                rows={6}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Link to="/candidate/dashboard">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
