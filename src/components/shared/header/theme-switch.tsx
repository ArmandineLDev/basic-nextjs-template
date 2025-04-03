// src/components/shared/theme-switch.tsx
"use client"

import { useTheme } from "next-themes"
import { useAccessibility } from "@/components/ui/theme-provider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon, Settings, Eye, BookOpen, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function ThemeSwitch() {
    const { setTheme } = useTheme()
    const { setAccessibilityMode } = useAccessibility()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Modifier les paramètres d'affichage et d'accessibilité">
                    <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Paramètres d'affichage</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thème</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>Clair</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    <span>Sombre</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Système</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Accessibilité</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => setAccessibilityMode("default")}
                    className="flex items-center gap-2"
                >
                    <Eye className="h-4 w-4" />
                    <span>Standard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setAccessibilityMode("high-contrast")}
                    className="flex items-center gap-2"
                >
                    <Eye className="h-4 w-4" />
                    <span>Contraste élevé</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setAccessibilityMode("dyslexic-friendly")}
                    className="flex items-center gap-2"
                >
                    <BookOpen className="h-4 w-4" />
                    <span>Dyslexie</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setAccessibilityMode("reduced-motion")}
                    className="flex items-center gap-2"
                >
                    <Zap className="h-4 w-4" />
                    <span>Mouvement réduit</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}