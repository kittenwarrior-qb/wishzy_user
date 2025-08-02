'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Palette, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

const themes = [
  { name: 'wishzy', label: 'Wishzy', color: '#F7941D' },
  { name: 'coffee', label: 'coffee', color: '#ffffff' },
  { name: 'lofi', label: 'Lofi', color: '#fbcfe8' },
  { name: 'forest', label: 'Forest', color: '#166534' },
  { name: 'caramellatte', label: 'Caramellatte', color: '#e879f9' },
  { name: 'dim', label: 'Dim', color: '#ffffff' },
  { name: 'retro', label: 'Retro', color: '#1f2937' },
  { name: 'luxury', label: 'Luxury', color: '#ffffff' },
  { name: 'fantasy', label: 'Fantasy', color: '#ffffff' },
  { name: 'valentine', label: 'Valentine', color: '#ffffff' },
]

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('wishzy')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  const getIcon = (theme: string) => {
    if (theme === 'dark') return <Moon className="w-4 h-4" />
    if (theme === 'light') return <Sun className="w-4 h-4" />
    return <Palette className="w-4 h-4" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {getIcon(currentTheme)}
          <span className="capitalize">{currentTheme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[400px] overflow-y-auto w-52">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => setCurrentTheme(theme.name)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: theme.color }}
              />
              <span className="capitalize">{theme.label}</span>
            </div>
            {theme.name === currentTheme && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
