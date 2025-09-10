"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, ImageIcon, File, CheckCircle, X, Eye, Download, AlertCircle, Loader2 } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
  status: "uploading" | "completed" | "error"
  progress?: number
  category: string
}

interface DocumentCategory {
  id: string
  name: string
  description: string
  required: boolean
  acceptedTypes: string[]
  maxSize: number // in MB
  maxFiles: number
}

const documentCategories: DocumentCategory[] = [
  {
    id: "transcripts",
    name: "Official Transcripts",
    description: "High school transcripts and grade reports",
    required: true,
    acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSize: 10,
    maxFiles: 3,
  },
  {
    id: "test-scores",
    name: "Test Scores",
    description: "SAT, ACT, or other standardized test scores",
    required: true,
    acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSize: 5,
    maxFiles: 5,
  },
  {
    id: "essays",
    name: "Essays & Writing Samples",
    description: "Personal statement and supplemental essays",
    required: true,
    acceptedTypes: [".pdf", ".doc", ".docx"],
    maxSize: 5,
    maxFiles: 10,
  },
  {
    id: "recommendations",
    name: "Letters of Recommendation",
    description: "Teacher and counselor recommendations",
    required: true,
    acceptedTypes: [".pdf"],
    maxSize: 5,
    maxFiles: 5,
  },
  {
    id: "certificates",
    name: "Certificates & Awards",
    description: "Academic awards, certificates, and achievements",
    required: false,
    acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSize: 5,
    maxFiles: 10,
  },
  {
    id: "portfolio",
    name: "Portfolio Items",
    description: "Art, music, or other creative work samples",
    required: false,
    acceptedTypes: [".pdf", ".jpg", ".jpeg", ".png", ".mp3", ".mp4"],
    maxSize: 50,
    maxFiles: 20,
  },
]

export function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    // Mock data
    {
      id: "1",
      name: "high_school_transcript.pdf",
      size: 2048000,
      type: "application/pdf",
      uploadDate: "2024-01-15",
      status: "completed",
      category: "transcripts",
    },
    {
      id: "2",
      name: "sat_scores.pdf",
      size: 1024000,
      type: "application/pdf",
      uploadDate: "2024-01-14",
      status: "completed",
      category: "test-scores",
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState<string>("transcripts")
  const [error, setError] = useState<string>("")

  const currentCategory = documentCategories.find((cat) => cat.id === selectedCategory)!
  const categoryFiles = uploadedFiles.filter((file) => file.category === selectedCategory)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError("")

      // Validate file count
      if (categoryFiles.length + acceptedFiles.length > currentCategory.maxFiles) {
        setError(`Maximum ${currentCategory.maxFiles} files allowed for ${currentCategory.name}`)
        return
      }

      acceptedFiles.forEach((file) => {
        // Validate file size
        if (file.size > currentCategory.maxSize * 1024 * 1024) {
          setError(`File size must be less than ${currentCategory.maxSize}MB`)
          return
        }

        // Validate file type
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
        if (!currentCategory.acceptedTypes.includes(fileExtension)) {
          setError(`File type ${fileExtension} not allowed for ${currentCategory.name}`)
          return
        }

        // Create upload entry
        const uploadFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString().split("T")[0],
          status: "uploading",
          progress: 0,
          category: selectedCategory,
        }

        setUploadedFiles((prev) => [...prev, uploadFile])

        // Simulate upload progress
        simulateUpload(uploadFile.id)
      })
    },
    [selectedCategory, categoryFiles.length, currentCategory],
  )

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((file) => (file.id === fileId ? { ...file, status: "completed" as const, progress: 100 } : file)),
        )
      } else {
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
      }
    }, 500)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: currentCategory.acceptedTypes.reduce(
      (acc, type) => {
        acc[type] = []
        return acc
      },
      {} as Record<string, string[]>,
    ),
    maxSize: currentCategory.maxSize * 1024 * 1024,
    multiple: true,
  })

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />
    if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-500" />
    return <File className="h-5 w-5 text-gray-500" />
  }

  const getRequiredFilesStatus = () => {
    const requiredCategories = documentCategories.filter((cat) => cat.required)
    const completedRequired = requiredCategories.filter((cat) =>
      uploadedFiles.some((file) => file.category === cat.id && file.status === "completed"),
    )
    return {
      completed: completedRequired.length,
      total: requiredCategories.length,
    }
  }

  const requiredStatus = getRequiredFilesStatus()

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Document Upload Progress
            <Badge variant={requiredStatus.completed === requiredStatus.total ? "default" : "secondary"}>
              {requiredStatus.completed}/{requiredStatus.total} Required Categories Complete
            </Badge>
          </CardTitle>
          <CardDescription>Upload all required documents to complete your application</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(requiredStatus.completed / requiredStatus.total) * 100} className="h-3" />
        </CardContent>
      </Card>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentCategories.map((category) => {
          const categoryFileCount = uploadedFiles.filter(
            (f) => f.category === category.id && f.status === "completed",
          ).length
          const isComplete = categoryFileCount > 0
          const isSelected = selectedCategory === category.id

          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {category.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                    {isComplete && <CheckCircle className="h-5 w-5 text-primary" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-2">{category.description}</CardDescription>
                <div className="text-sm text-muted-foreground">
                  {categoryFileCount}/{category.maxFiles} files uploaded
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload {currentCategory.name}
            {currentCategory.required && (
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            )}
          </CardTitle>
          <CardDescription>{currentCategory.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg text-primary">Drop files here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Accepted formats: {currentCategory.acceptedTypes.join(", ")} | Max size: {currentCategory.maxSize}MB |
                  Max files: {currentCategory.maxFiles}
                </p>
                <Button variant="outline">Choose Files</Button>
              </div>
            )}
          </div>

          {/* File List */}
          {categoryFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium">Uploaded Files</h4>
              {categoryFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} • Uploaded {file.uploadDate}
                    </p>
                    {file.status === "uploading" && file.progress !== undefined && (
                      <Progress value={file.progress} className="h-2 mt-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                    {file.status === "completed" && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
