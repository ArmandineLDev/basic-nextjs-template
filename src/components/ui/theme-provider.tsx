// src/components/ui/theme-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

type AccessibilityModes =
    | 'default'
    | 'high-contrast'
    | 'dyslexic-friendly'
    | 'reduced-motion';

type ThemeContextType = {
    accessibilityMode: AccessibilityModes;
    setAccessibilityMode: (mode: AccessibilityModes) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [accessibilityMode, setAccessibilityMode] =
        useState<AccessibilityModes>('default');

    useEffect(() => {
        // Appliquer les classes CSS en fonction du mode d'accessibilité
        document.documentElement.classList.remove(
            'high-contrast',
            'dyslexic-friendly',
            'reduced-motion'
        );

        if (accessibilityMode !== 'default') {
            document.documentElement.classList.add(accessibilityMode);
        }
    }, [accessibilityMode]);

    return (
        <ThemeContext.Provider value={{ accessibilityMode, setAccessibilityMode }}>
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </ThemeContext.Provider>
    );
}

export const useAccessibility = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useAccessibility must be used within a ThemeProvider');
    }
    return context;
};