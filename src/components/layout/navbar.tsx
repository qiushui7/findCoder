"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/ui/icons'
import { SearchInput } from '@/components/ui/search-input'
import { useTheme } from 'next-themes'
import { Moon, Sun, Languages } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-[80vw] mx-auto flex justify-center">
      <div className="w-full h-20 bg-bgColor rounded-[20px] shadow-[0_8px_32px_var(--shadow-color)] my-5 px-3">
        <div className="flex justify-between items-center h-full px-4">
          {/* Logo 部分 */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <GitHubIcon className="h-10 w-10 mr-2" />
            <span className="text-2xl">Find Coder</span>
          </Link>

          {/* 中间导航链接 */}
          <div className="flex-grow flex justify-center items-center mx-2">
            {/* 搜索框 */}
            <div className="w-full max-w-[600px] rounded-[10px]">
                <SearchInput />
            </div>
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-4">
            {/* 添加 GitHub 登录按钮 */}
            <Button 
              variant="outline" 
              className="flex items-center h-9 gap-2 border border-borderColor hover:bg-hoverBgColor"
              onClick={() => {
                console.log('GitHub login clicked')
              }}
            >
              <GitHubIcon className="h-4 w-4" />
              <span>使用 GitHub 登录</span>
            </Button>

            {/* 主题切换和语言切换 */}
            <div className="flex items-center gap-2">
              {/* 语言切换按钮 */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 border border-borderColor hover:bg-hoverBgColor"
                onClick={() => {
                  console.log('Language switch clicked')
                }}
              >
                <Languages className="h-5 w-5" />
              </Button>

              {/* 主题切换按钮 */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-10 h-10 border border-borderColor hover:bg-hoverBgColor"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 