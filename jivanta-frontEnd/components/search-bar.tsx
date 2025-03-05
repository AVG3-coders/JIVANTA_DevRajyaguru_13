import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar({ placeholder = "Search for Rx, generic name..." }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input type="search" placeholder={placeholder} className="pl-10 w-full" />
    </div>
  )
}

