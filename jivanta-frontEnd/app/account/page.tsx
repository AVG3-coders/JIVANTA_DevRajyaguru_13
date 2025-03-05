import Link from "next/link"
import { X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccountSettings() {
  return (
    <div className="min-h-screen bg-primary/10 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <span className="font-medium">Account Settings</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-6">Manage your account settings and preferences</p>

          <div className="space-y-3">
            <Link href="/cart">
              <Button variant="outline" className="w-full justify-start">
                Cart
              </Button>
            </Link>

            <Link href="/orders">
              <Button variant="outline" className="w-full justify-start">
                Order History
              </Button>
            </Link>

            <Link href="/help">
              <Button variant="outline" className="w-full justify-start">
                Help
              </Button>
            </Link>

            <Link href="/settings">
              <Button variant="outline" className="w-full justify-start">
                Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

