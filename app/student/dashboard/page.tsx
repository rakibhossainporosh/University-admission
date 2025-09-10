import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  GraduationCap,
  Calendar,
  Bell,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  // Mock data - in real app this would come from API/database
  const applicationStatus = {
    submitted: true,
    completionPercentage: 85,
    lastUpdated: "2024-01-18",
    currentStage: "Initial Review",
    estimatedDecision: "2024-03-15",
    sections: {
      personalInfo: { completed: true, required: true },
      academicHistory: { completed: true, required: true },
      essays: { completed: true, required: true },
      recommendations: { completed: true, required: true },
      documents: { completed: true, required: true },
      additionalInfo: { completed: false, required: false },
    },
  }

  const recentUpdates = [
    {
      id: "1",
      type: "success",
      title: "Documents Verified",
      message: "All submitted documents have been verified",
      date: "2024-01-18",
      new: true,
    },
    {
      id: "2",
      type: "info",
      title: "Application Under Review",
      message: "Your application has moved to initial review stage",
      date: "2024-01-17",
      new: true,
    },
  ]

  const getStatusBadge = (completed: boolean, required: boolean) => {
    if (completed)
      return (
        <Badge variant="default" className="bg-primary">
          Complete
        </Badge>
      )
    if (required) return <Badge variant="destructive">Required</Badge>
    return <Badge variant="secondary">Optional</Badge>
  }

  const getStatusIcon = (completed: boolean, required: boolean) => {
    if (completed) return <CheckCircle className="h-5 w-5 text-primary" />
    if (required) return <AlertCircle className="h-5 w-5 text-destructive" />
    return <Clock className="h-5 w-5 text-muted-foreground" />
  }

  const newUpdatesCount = recentUpdates.filter((update) => update.new).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Application Status Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Application Status</CardTitle>
                  <CardDescription>
                    Current stage: <span className="font-medium text-primary">{applicationStatus.currentStage}</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{applicationStatus.completionPercentage}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={applicationStatus.completionPercentage} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last updated: {applicationStatus.lastUpdated}</span>
                  <span className="text-muted-foreground">
                    Expected decision: {applicationStatus.estimatedDecision}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/student/status">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Detailed Status
                    </Link>
                  </Button>
                  {applicationStatus.completionPercentage < 100 && (
                    <Button variant="outline" asChild>
                      <Link href="/student/application">Continue Application</Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Updates */}
        {newUpdatesCount > 0 && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Updates
                  <Badge variant="destructive" className="text-xs">
                    {newUpdatesCount} new
                  </Badge>
                </CardTitle>
                <CardDescription>Latest updates about your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUpdates.slice(0, 3).map((update) => (
                    <div
                      key={update.id}
                      className={`flex gap-3 p-3 border rounded-lg ${update.new ? "bg-blue-50 border-blue-200" : ""}`}
                    >
                      {update.type === "success" && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                      {update.type === "info" && <Clock className="h-5 w-5 text-blue-600 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{update.title}</h4>
                          {update.new && <div className="h-2 w-2 bg-blue-600 rounded-full" />}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{update.message}</p>
                        <p className="text-xs text-muted-foreground">{update.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/status">View All Updates</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Application Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </div>
                {getStatusIcon(
                  applicationStatus.sections.personalInfo.completed,
                  applicationStatus.sections.personalInfo.required,
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CardDescription>Basic personal details, contact information, and demographics</CardDescription>
                <div className="flex items-center justify-between">
                  {getStatusBadge(
                    applicationStatus.sections.personalInfo.completed,
                    applicationStatus.sections.personalInfo.required,
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/application?section=personal">
                      {applicationStatus.sections.personalInfo.completed ? "Review" : "Complete"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Academic History</CardTitle>
                </div>
                {getStatusIcon(
                  applicationStatus.sections.academicHistory.completed,
                  applicationStatus.sections.academicHistory.required,
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CardDescription>Educational background, transcripts, and test scores</CardDescription>
                <div className="flex items-center justify-between">
                  {getStatusBadge(
                    applicationStatus.sections.academicHistory.completed,
                    applicationStatus.sections.academicHistory.required,
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/application?section=academic">
                      {applicationStatus.sections.academicHistory.completed ? "Review" : "Complete"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Essays & Statements</CardTitle>
                </div>
                {getStatusIcon(applicationStatus.sections.essays.completed, applicationStatus.sections.essays.required)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CardDescription>Personal statement, supplemental essays, and writing samples</CardDescription>
                <div className="flex items-center justify-between">
                  {getStatusBadge(
                    applicationStatus.sections.essays.completed,
                    applicationStatus.sections.essays.required,
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/application?section=essays">
                      {applicationStatus.sections.essays.completed ? "Review" : "Complete"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </div>
                {getStatusIcon(
                  applicationStatus.sections.recommendations.completed,
                  applicationStatus.sections.recommendations.required,
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CardDescription>Letters of recommendation from teachers and counselors</CardDescription>
                <div className="flex items-center justify-between">
                  {getStatusBadge(
                    applicationStatus.sections.recommendations.completed,
                    applicationStatus.sections.recommendations.required,
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/application?section=recommendations">
                      {applicationStatus.sections.recommendations.completed ? "Review" : "Complete"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Documents</CardTitle>
                </div>
                {getStatusIcon(
                  applicationStatus.sections.documents.completed,
                  applicationStatus.sections.documents.required,
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CardDescription>Transcripts, test scores, and supporting documents</CardDescription>
                <div className="flex items-center justify-between">
                  {getStatusBadge(
                    applicationStatus.sections.documents.completed,
                    applicationStatus.sections.documents.required,
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/documents">
                      {applicationStatus.sections.documents.completed ? "Review" : "Upload"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </div>
                {getStatusIcon(
                  applicationStatus.sections.additionalInfo.completed,
                  applicationStatus.sections.additionalInfo.required,
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CardDescription>Extracurricular activities, awards, and other achievements</CardDescription>
                <div className="flex items-center justify-between">
                  {getStatusBadge(
                    applicationStatus.sections.additionalInfo.completed,
                    applicationStatus.sections.additionalInfo.required,
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/application?section=additional">
                      {applicationStatus.sections.additionalInfo.completed ? "Review" : "Complete"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and helpful resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link href="/student/status">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Check Status
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/student/application">Continue Application</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/student/documents">Upload Documents</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/student/help">Get Help</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
