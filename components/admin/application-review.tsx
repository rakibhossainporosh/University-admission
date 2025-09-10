"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  GraduationCap,
  FileText,
  Upload,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Award,
  CheckCircle,
  Download,
  Eye,
} from "lucide-react"

interface ApplicationData {
  id: string
  studentName: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  submittedDate: string
  status: string
  gpa: number
  satScore: number
  actScore: number
  program: string
  highSchool: string
  graduationYear: string
  personalStatement: string
  whyUniversity: string
  activities: string[]
  documents: Array<{
    id: string
    name: string
    type: string
    category: string
    uploadDate: string
  }>
  reviewNotes: Array<{
    id: string
    reviewer: string
    date: string
    note: string
    rating: number
  }>
}

// Mock application data
const mockApplication: ApplicationData = {
  id: "APP-2024-001",
  studentName: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, ST 12345",
  dateOfBirth: "2006-03-15",
  submittedDate: "2024-01-15",
  status: "under-review",
  gpa: 3.8,
  satScore: 1420,
  actScore: 32,
  program: "Computer Science",
  highSchool: "Anytown High School",
  graduationYear: "2024",
  personalStatement:
    "From a young age, I have been fascinated by the intersection of technology and human creativity. My passion for computer science began when I built my first website at age 12, and has only grown stronger through my high school years. I have participated in multiple coding competitions, led my school's robotics team to state championships, and developed mobile apps that have been downloaded by thousands of users. I am particularly interested in artificial intelligence and its potential to solve real-world problems. At your university, I hope to contribute to cutting-edge research while building the skills necessary to become a leader in the tech industry.",
  whyUniversity:
    "Your university's computer science program stands out for its emphasis on both theoretical foundations and practical applications. The opportunity to work with renowned faculty like Dr. Smith on AI research, combined with the strong industry partnerships that provide internship opportunities, makes this the ideal place for me to pursue my academic and career goals. I am particularly excited about the interdisciplinary approach that allows students to combine computer science with other fields like psychology and business.",
  activities: [
    "Robotics Team Captain - Led team to state championship",
    "National Honor Society Member",
    "Volunteer coding instructor for middle school students",
    "Mobile app developer - 3 published apps with 10K+ downloads",
    "Math Olympiad participant - Regional finalist",
  ],
  documents: [
    { id: "1", name: "official_transcript.pdf", type: "pdf", category: "transcripts", uploadDate: "2024-01-10" },
    { id: "2", name: "sat_scores.pdf", type: "pdf", category: "test-scores", uploadDate: "2024-01-10" },
    {
      id: "3",
      name: "recommendation_letter_1.pdf",
      type: "pdf",
      category: "recommendations",
      uploadDate: "2024-01-12",
    },
    {
      id: "4",
      name: "recommendation_letter_2.pdf",
      type: "pdf",
      category: "recommendations",
      uploadDate: "2024-01-12",
    },
    { id: "5", name: "portfolio_projects.pdf", type: "pdf", category: "portfolio", uploadDate: "2024-01-13" },
  ],
  reviewNotes: [
    {
      id: "1",
      reviewer: "Dr. Smith",
      date: "2024-01-16",
      note: "Strong academic performance and impressive extracurricular activities. The robotics leadership and mobile app development show practical application of skills.",
      rating: 4,
    },
  ],
}

export function ApplicationReview({ applicationId }: { applicationId: string }) {
  const [application] = useState<ApplicationData>(mockApplication)
  const [newNote, setNewNote] = useState("")
  const [newStatus, setNewStatus] = useState(application.status)
  const [newRating, setNewRating] = useState<number>(0)

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

  const handleAddNote = () => {
    if (newNote.trim()) {
      // TODO: Implement add note functionality
      console.log("Adding note:", { note: newNote, rating: newRating })
      setNewNote("")
      setNewRating(0)
    }
  }

  const handleStatusUpdate = () => {
    // TODO: Implement status update functionality
    console.log("Updating status to:", newStatus)
  }

  return (
    <div className="space-y-6">
      {/* Application Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{application.studentName}</CardTitle>
              <CardDescription className="text-lg">Application ID: {application.id}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge(application.status)}
              <Badge variant="outline" className="text-lg px-3 py-1">
                {application.program}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {application.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {application.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {application.address}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">GPA: {application.gpa}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">SAT: {application.satScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">ACT: {application.actScore}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Submitted: {application.submittedDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                {application.highSchool} ({application.graduationYear})
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="essays">Essays</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-sm">{application.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="text-sm">{application.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{application.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{application.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-sm">{application.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extracurricular Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {application.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{activity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">High School</label>
                    <p className="text-sm">{application.highSchool}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
                    <p className="text-sm">{application.graduationYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Intended Program</label>
                    <p className="text-sm">{application.program}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GPA</label>
                    <p className="text-2xl font-bold text-primary">{application.gpa}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">SAT Score</label>
                    <p className="text-2xl font-bold text-primary">{application.satScore}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">ACT Score</label>
                    <p className="text-2xl font-bold text-primary">{application.actScore}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="essays" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Personal Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed">{application.personalStatement}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Our University?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed">{application.whyUniversity}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.category} • Uploaded {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          {/* Status Update */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleStatusUpdate}>Update Status</Button>
              </div>
            </CardContent>
          </Card>

          {/* Review Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Review Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Notes */}
              {application.reviewNotes.map((note) => (
                <div key={note.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{note.reviewer}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${star <= note.rating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.note}</p>
                </div>
              ))}

              {/* Add New Note */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewRating(star)}
                          className={`text-lg ${
                            star <= newRating ? "text-yellow-400" : "text-gray-300"
                          } hover:text-yellow-400`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Review Note</label>
                    <Textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add your review notes here..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
