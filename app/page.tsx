import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, FileText, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">//
              {/* <GraduationCap className="h-8 w-8 text-primary" /> */}
              <img src="" alt="" />
              <h1 className="text-2xl font-bold text-foreground">University Admissions</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Your Journey to Higher Education Starts Here
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Apply to our university with our streamlined admission system. Track your application, upload documents, and
            stay updated throughout the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Start Application</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Check Status</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Admission Process Made Simple</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Easy Application</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Complete your application with our step-by-step guided process
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Document Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Securely upload transcripts, essays, and supporting documents
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Monitor your application status and receive real-time updates
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Admin Review</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Our admissions team reviews applications efficiently and fairly
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2024 University Admissions System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
