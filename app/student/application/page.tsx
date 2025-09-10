import { ApplicationForm } from "@/components/student/application-form"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

interface PageProps {
  searchParams: { section?: string }
}

export default function ApplicationPage({ searchParams }: PageProps) {
  const section = searchParams.section || "personal"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/student/dashboard"
              className="flex items-center gap-2 text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <GraduationCap className="h-8 w-8" />
              University Admissions
            </Link>
            <Link href="/student/dashboard" className="text-primary hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ApplicationForm initialStep={section} />
      </div>
    </div>
  )
}
