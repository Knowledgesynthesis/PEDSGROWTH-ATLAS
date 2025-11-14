import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initializeTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark mode as per requirements

      setTheme: (theme: Theme) => {
        set({ theme })
        if (typeof window !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        get().setTheme(newTheme)
      },

      initializeTheme: () => {
        // Check system preference if no saved preference
        if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('theme-storage')
          if (savedTheme) {
            try {
              const parsed = JSON.parse(savedTheme)
              get().setTheme(parsed.state.theme)
            } catch {
              // Fallback to system preference
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
              get().setTheme(prefersDark ? 'dark' : 'light')
            }
          } else {
            // Default to dark mode, but respect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            get().setTheme(prefersDark ? 'dark' : 'light')
          }
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
