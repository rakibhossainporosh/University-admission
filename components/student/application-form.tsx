"use client"

import type React from "react"
import Link from "next/link"
import { CheckCircle, AlertCircle } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Save, User, GraduationCap, FileText, Calendar, Upload, Plus } from "lucide-react"

interface ApplicationStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  required: boolean
}

const steps: ApplicationStep[] = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Basic personal details and contact information",
    icon: <User className="h-5 w-5" />,
    required: true,
  },
  {
    id: "academic",
    title: "Academic History",
    description: "Educational background and test scores",
    icon: <GraduationCap className="h-5 w-5" />,
    required: true,
  },
  {
    id: "essays",
    title: "Essays & Statements",
    description: "Personal statement and supplemental essays",
    icon: <FileText className="h-5 w-5" />,
    required: true,
  },
  {
    id: "recommendations",
    title: "Recommendations",
    description: "Letters of recommendation",
    icon: <Calendar className="h-5 w-5" />,
    required: true,
  },
  {
    id: "documents",
    title: "Documents",
    description: "Upload transcripts and supporting documents",
    icon: <Upload className="h-5 w-5" />,
    required: true,
  },
  {
    id: "additional",
    title: "Additional Information",
    description: "Extracurricular activities and achievements",
    icon: <Plus className="h-5 w-5" />,
    required: false,
  },
]

export function ApplicationForm({ initialStep = "personal" }: { initialStep?: string }) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Academic History
    highSchool: "",
    graduationYear: "",
    gpa: "",
    satScore: "",
    actScore: "",

    // Essays
    personalStatement: "",
    whyUniversity: "",

    // Additional
    activities: [""],
  })

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id)
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving form data:", formData)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "academic":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="highSchool">High School Name *</Label>
              <Input
                id="highSchool"
                value={formData.highSchool}
                onChange={(e) => handleInputChange("highSchool", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year *</Label>
                <Select onValueChange={(value) => handleInputChange("graduationYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA *</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="satScore">SAT Score</Label>
                <Input
                  id="satScore"
                  type="number"
                  min="400"
                  max="1600"
                  value={formData.satScore}
                  onChange={(e) => handleInputChange("satScore", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actScore">ACT Score</Label>
                <Input
                  id="actScore"
                  type="number"
                  min="1"
                  max="36"
                  value={formData.actScore}
                  onChange={(e) => handleInputChange("actScore", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case "essays":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="personalStatement">Personal Statement *</Label>
              <p className="text-sm text-muted-foreground">
                Tell us about yourself, your background, and what motivates you. (500-650 words)
              </p>
              <Textarea
                id="personalStatement"
                rows={10}
                value={formData.personalStatement}
                onChange={(e) => handleInputChange("personalStatement", e.target.value)}
                placeholder="Begin your personal statement here..."
                required
              />
              <div className="text-sm text-muted-foreground text-right">
                {formData.personalStatement.split(" ").filter((word) => word.length > 0).length} words
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyUniversity">Why Our University? *</Label>
              <p className="text-sm text-muted-foreground">
                What specifically attracts you to our university? (250-300 words)
              </p>
              <Textarea
                id="whyUniversity"
                rows={6}
                value={formData.whyUniversity}
                onChange={(e) => handleInputChange("whyUniversity", e.target.value)}
                placeholder="Explain why you want to attend our university..."
                required
              />
              <div className="text-sm text-muted-foreground text-right">
                {formData.whyUniversity.split(" ").filter((word) => word.length > 0).length} words
              </div>
            </div>
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Document Upload</h3>
              <p className="text-muted-foreground mb-6">
                Upload your transcripts, test scores, and other required documents
              </p>
              <Button asChild size="lg">
                <Link href="/student/documents">Go to Document Upload</Link>
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-muted/30">
              <h4 className="font-medium mb-3">Required Documents Checklist:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Official High School Transcripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>SAT/ACT Test Scores</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Letters of Recommendation</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Personal Statement (if not submitted in Essays section)</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">This section is coming soon!</p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-foreground">University Application</h1>
          <Badge variant="outline">
            Step {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                step.id === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {step.icon}
              {step.title}
              {step.required && <span className="text-xs">*</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[currentStepIndex].icon}
            {steps[currentStepIndex].title}
            {steps[currentStepIndex].required && (
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            )}
          </CardTitle>
          <CardDescription>{steps[currentStepIndex].description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStepIndex === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button variant="outline" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Progress
        </Button>

        <Button onClick={handleNext} disabled={currentStepIndex === steps.length - 1}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
