import { StatusTracker } from "@/components/student/status-tracker"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function StatusPage() {
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
            <Button variant="outline" asChild>
              <Link href="/student/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Application Status</h1>
          <p className="text-muted-foreground">
            Track your application progress and stay updated on the latest developments.
          </p>
        </div>

        <StatusTracker />
      </div>
    </div>
  )
}
