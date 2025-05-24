import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, Brain, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Agentic AI Hiring Assistant</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/hr/dashboard">
                <Button variant="outline">HR Login</Button>
              </Link>
              <Link to="/candidate/dashboard">
                <Button>Candidate Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Revolutionize Your Hiring Process</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered talent acquisition platform that matches candidates with perfect job opportunities using
            intelligent resume parsing and scoring algorithms.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Briefcase className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Smart Job Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI algorithms match candidates with relevant job opportunities based on skills and experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Resume Parsing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically extract and analyze resume data to calculate compatibility scores.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Score Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Candidates are ranked from 1-10 based on job description compatibility.</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Auto Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automated interview scheduling and email notifications for selected candidates.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Get Started Today</h3>
          <div className="flex justify-center space-x-6">
            <Link to="/hr/dashboard">
              <Button size="lg" className="px-8">
                HR Dashboard
              </Button>
            </Link>
            <Link to="/candidate/dashboard">
              <Button size="lg" variant="outline" className="px-8">
                Candidate Portal
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
