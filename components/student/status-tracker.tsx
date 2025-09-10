"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, AlertCircle, FileText, Users, Calendar, Bell, ArrowRight, Info } from "lucide-react"

interface StatusStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "pending" | "blocked"
  date?: string
  estimatedDate?: string
  details?: string[]
}

interface ApplicationStatus {
  applicationId: string
  currentStatus: string
  overallProgress: number
  submittedDate: string
  lastUpdated: string
  estimatedDecision: string
  steps: StatusStep[]
  notifications: Array<{
    id: string
    type: "info" | "success" | "warning" | "error"
    title: string
    message: string
    date: string
    read: boolean
  }>
  requirements: Array<{
    id: string
    name: string
    status: "completed" | "pending" | "missing"
    dueDate?: string
    description: string
  }>
}

// Mock status data
const mockStatus: ApplicationStatus = {
  applicationId: "APP-2024-001",
  currentStatus: "under-review",
  overallProgress: 65,
  submittedDate: "2024-01-15",
  lastUpdated: "2024-01-18",
  estimatedDecision: "2024-03-15",
  steps: [
    {
      id: "submitted",
      title: "Application Submitted",
      description: "Your application has been successfully submitted",
      status: "completed",
      date: "2024-01-15",
      details: ["Application form completed", "Application fee paid", "Confirmation email sent"],
    },
    {
      id: "documents",
      title: "Document Review",
      description: "Reviewing submitted documents and transcripts",
      status: "completed",
      date: "2024-01-16",
      details: ["Transcripts verified", "Test scores confirmed", "Letters of recommendation received"],
    },
    {
      id: "initial-review",
      title: "Initial Review",
      description: "Academic credentials and eligibility assessment",
      status: "current",
      date: "2024-01-17",
      details: ["GPA evaluation completed", "Test score analysis in progress", "Academic fit assessment ongoing"],
    },
    {
      id: "committee-review",
      title: "Committee Review",
      description: "Comprehensive review by admissions committee",
      status: "pending",
      estimatedDate: "2024-02-15",
      details: [
        "Holistic application review",
        "Essays and personal statement evaluation",
        "Extracurricular activities assessment",
      ],
    },
    {
      id: "final-decision",
      title: "Final Decision",
      description: "Admission decision finalized and communicated",
      status: "pending",
      estimatedDate: "2024-03-15",
      details: ["Decision letter preparation", "Financial aid package (if applicable)", "Enrollment instructions"],
    },
  ],
  notifications: [
    {
      id: "1",
      type: "success",
      title: "Documents Verified",
      message: "All your submitted documents have been verified and are complete.",
      date: "2024-01-16",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Application Under Review",
      message: "Your application has moved to the initial review stage.",
      date: "2024-01-17",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Application Received",
      message: "We have received your complete application. Thank you for applying!",
      date: "2024-01-15",
      read: true,
    },
  ],
  requirements: [
    {
      id: "transcript",
      name: "Official Transcript",
      status: "completed",
      description: "High school transcript with official seal",
    },
    {
      id: "test-scores",
      name: "Standardized Test Scores",
      status: "completed",
      description: "SAT or ACT scores sent directly from testing agency",
    },
    {
      id: "recommendations",
      name: "Letters of Recommendation",
      status: "completed",
      description: "2 letters from teachers or counselors",
    },
    {
      id: "essay",
      name: "Personal Statement",
      status: "completed",
      description: "Personal essay (500-650 words)",
    },
    {
      id: "midyear-grades",
      name: "Mid-Year Grades",
      status: "pending",
      dueDate: "2024-02-01",
      description: "First semester senior year grades",
    },
  ],
}

export function StatusTracker() {
  const status = mockStatus

  const getStepIcon = (stepStatus: string) => {
    switch (stepStatus) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "current":
        return <Clock className="h-6 w-6 text-blue-600" />
      case "blocked":
        return <AlertCircle className="h-6 w-6 text-red-600" />
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
    }
  }

  const getRequirementIcon = (reqStatus: string) => {
    switch (reqStatus) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "missing":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const unreadNotifications = status.notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Application Status</CardTitle>
              <CardDescription>Application ID: {status.applicationId}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{status.overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={status.overallProgress} className="h-3" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Submitted:</span>
              <div className="font-medium">{status.submittedDate}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated:</span>
              <div className="font-medium">{status.lastUpdated}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Expected Decision:</span>
              <div className="font-medium">{status.estimatedDecision}</div>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Your application is currently in the <strong>initial review</strong> stage. We expect to complete this
              phase by February 15, 2024.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Application Timeline
          </CardTitle>
          <CardDescription>Track your application progress through each review stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {status.steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {getStepIcon(step.status)}
                  {index < status.steps.length - 1 && (
                    <div
                      className={`w-0.5 h-16 mt-2 ${step.status === "completed" ? "bg-green-600" : "bg-gray-300"}`}
                    />
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{step.title}</h3>
                    {step.status === "current" && (
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        In Progress
                      </Badge>
                    )}
                    {step.status === "completed" && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>

                  {step.date && <div className="text-xs text-muted-foreground mb-2">Completed on {step.date}</div>}

                  {step.estimatedDate && step.status !== "completed" && (
                    <div className="text-xs text-muted-foreground mb-2">Expected by {step.estimatedDate}</div>
                  )}

                  {step.details && (
                    <ul className="text-xs space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Requirements Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Requirements Checklist
            </CardTitle>
            <CardDescription>Track completion of all application requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {status.requirements.map((req) => (
                <div key={req.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getRequirementIcon(req.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{req.name}</h4>
                      {req.status === "completed" && (
                        <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                          Complete
                        </Badge>
                      )}
                      {req.status === "pending" && (
                        <Badge variant="secondary" className="text-xs">
                          Pending
                        </Badge>
                      )}
                      {req.status === "missing" && (
                        <Badge variant="destructive" className="text-xs">
                          Missing
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{req.description}</p>
                    {req.dueDate && req.status !== "completed" && (
                      <p className="text-xs text-orange-600">Due: {req.dueDate}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Updates
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadNotifications} new
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Latest updates about your application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {status.notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 p-3 border rounded-lg ${
                    !notification.read ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && <div className="h-2 w-2 bg-blue-600 rounded-full" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            What Happens Next?
          </CardTitle>
          <CardDescription>Information about the next steps in your application process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Current Stage:</strong> Your application is being reviewed by our admissions team. This process
                typically takes 2-3 weeks to complete.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">What We're Reviewing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Academic performance and GPA</li>
                  <li>• Standardized test scores</li>
                  <li>• Personal statement and essays</li>
                  <li>• Extracurricular activities</li>
                  <li>• Letters of recommendation</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Action Items for You</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Submit mid-year grades by Feb 1, 2024</li>
                  <li>• Check your email regularly for updates</li>
                  <li>• Keep your contact information current</li>
                  <li>• No additional documents needed at this time</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
