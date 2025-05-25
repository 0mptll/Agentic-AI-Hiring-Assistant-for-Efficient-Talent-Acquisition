"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Replace with actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        // Store user data in localStorage (in production, use proper auth management)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Redirect based on user role
        if (data.user.role === "HR") {
          navigate("/hr/dashboard")
        } else {
          navigate("/candidate/dashboard")
        }
      } else {
        const errorData = await response.json()
        setErrors({ general: errorData.message || "Login failed" })
      }
    } catch (error) {
      console.log("Demo mode - simulating login")
      // Demo mode: simulate successful login
      const mockUser = {
        id: "1",
        name: "Demo User",
        email: formData.email,
        role: formData.email.includes("hr") ? "HR" : "Candidate",
      }

      localStorage.setItem("user", JSON.stringify(mockUser))

      if (mockUser.role === "HR") {
        navigate("/hr/dashboard")
      } else {
        navigate("/candidate/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (type) => {
    if (type === "hr") {
      setFormData({ email: "hr@demo.com", password: "password" })
    } else {
      setFormData({ email: "candidate@demo.com", password: "password" })
    }
    setErrors({}) // Clear any existing errors
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500 font-medium underline">
                  Sign up
                </Link>
              </p>
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 underline">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Demo Credentials</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  <p><strong>HR:</strong> hr@demo.com / password</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fillDemoCredentials("hr")}
                  className="text-xs h-7"
                  type="button"
                >
                  Use HR
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  <p><strong>Candidate:</strong> candidate@demo.com / password</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fillDemoCredentials("candidate")}
                  className="text-xs h-7"
                  type="button"
                >
                  Use Candidate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
