"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Input
        placeholder="Search developers..."
        className="rounded-[10px] h-10 border-borderColor bg-searchBgColor"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
} 