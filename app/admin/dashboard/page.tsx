import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  GraduationCap,
  BarChart3,
  Calendar,
  Eye,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API/database
const applicationStats = {
  total: 1247,
  pending: 423,
  underReview: 298,
  accepted: 187,
  rejected: 339,
  incomplete: 156,
}

const recentApplications = [
  {
    id: "APP-2024-001",
    studentName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    submittedDate: "2024-01-15",
    status: "under-review",
    gpa: 3.8,
    satScore: 1420,
    program: "Computer Science",
    reviewer: "Dr. Smith",
    priority: "high",
  },
  {
    id: "APP-2024-002",
    studentName: "Michael Chen",
    email: "michael.chen@email.com",
    submittedDate: "2024-01-14",
    status: "pending",
    gpa: 3.9,
    satScore: 1480,
    program: "Engineering",
    reviewer: null,
    priority: "high",
  },
  {
    id: "APP-2024-003",
    studentName: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    submittedDate: "2024-01-13",
    status: "accepted",
    gpa: 4.0,
    satScore: 1520,
    program: "Biology",
    reviewer: "Dr. Johnson",
    priority: "high",
  },
  {
    id: "APP-2024-004",
    studentName: "David Wilson",
    email: "david.wilson@email.com",
    submittedDate: "2024-01-12",
    status: "incomplete",
    gpa: 3.6,
    satScore: 1350,
    program: "Business",
    reviewer: null,
    priority: "medium",
  },
  {
    id: "APP-2024-005",
    studentName: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    submittedDate: "2024-01-11",
    status: "rejected",
    gpa: 3.2,
    satScore: 1200,
    program: "Psychology",
    reviewer: "Dr. Brown",
    priority: "low",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pending
        </Badge>
      )
    case "under-review":
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          Under Review
        </Badge>
      )
    case "accepted":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Accepted
        </Badge>
      )
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>
    case "incomplete":
      return (
        <Badge variant="outline" className="border-orange-300 text-orange-600">
          Incomplete
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return (
        <Badge variant="destructive" className="text-xs">
          High
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="secondary" className="text-xs">
          Medium
        </Badge>
      )
    case "low":
      return (
        <Badge variant="outline" className="text-xs">
          Low
        </Badge>
      )
    default:
      return null
  }
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">University Admissions Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Logout</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">{applicationStats.total}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{applicationStats.pending}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{applicationStats.underReview}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{applicationStats.accepted}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{applicationStats.rejected}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Incomplete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{applicationStats.incomplete}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reviewers">Reviewers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Application Management</CardTitle>
                <CardDescription>Review and manage student applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search by name, email, or application ID..." className="pl-10" />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="incomplete">Incomplete</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Programs</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="psychology">Psychology</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>

                {/* Applications Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-medium">Application ID</th>
                          <th className="text-left p-4 font-medium">Student</th>
                          <th className="text-left p-4 font-medium">Program</th>
                          <th className="text-left p-4 font-medium">GPA</th>
                          <th className="text-left p-4 font-medium">SAT</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Priority</th>
                          <th className="text-left p-4 font-medium">Reviewer</th>
                          <th className="text-left p-4 font-medium">Submitted</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentApplications.map((application) => (
                          <tr key={application.id} className="border-t hover:bg-muted/30">
                            <td className="p-4">
                              <Link
                                href={`/admin/applications/${application.id}`}
                                className="font-mono text-sm text-primary hover:underline"
                              >
                                {application.id}
                              </Link>
                            </td>
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{application.studentName}</div>
                                <div className="text-sm text-muted-foreground">{application.email}</div>
                              </div>
                            </td>
                            <td className="p-4">{application.program}</td>
                            <td className="p-4">
                              <Badge variant="outline" className="font-mono">
                                {application.gpa}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className="font-mono">
                                {application.satScore}
                              </Badge>
                            </td>
                            <td className="p-4">{getStatusBadge(application.status)}</td>
                            <td className="p-4">{getPriorityBadge(application.priority)}</td>
                            <td className="p-4">
                              {application.reviewer ? (
                                <span className="text-sm">{application.reviewer}</span>
                              ) : (
                                <span className="text-sm text-muted-foreground">Unassigned</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {application.submittedDate}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/admin/applications/${application.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing 1-5 of {applicationStats.total} applications
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Application Trends
                  </CardTitle>
                  <CardDescription>Monthly application submissions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Program Distribution</CardTitle>
                  <CardDescription>Applications by academic program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Computer Science</span>
                      <span className="text-sm font-medium">324 (26%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engineering</span>
                      <span className="text-sm font-medium">298 (24%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Business</span>
                      <span className="text-sm font-medium">187 (15%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Biology</span>
                      <span className="text-sm font-medium">156 (12%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Psychology</span>
                      <span className="text-sm font-medium">134 (11%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other</span>
                      <span className="text-sm font-medium">148 (12%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviewers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviewer Management</CardTitle>
                <CardDescription>Manage admissions reviewers and their workloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">Reviewer management interface coming soon</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure admission system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">Settings interface coming soon</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
