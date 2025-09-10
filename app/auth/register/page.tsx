import { RegisterForm } from "@/components/auth/register-form"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <GraduationCap className="h-8 w-8" />
            University Admissions
          </Link>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
