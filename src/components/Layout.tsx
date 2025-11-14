import { Outlet, Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, Activity } from 'lucide-react'
import { useState } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Growth Charts', href: '/growth-charts' },
  { name: 'Velocity Calculator', href: '/velocity' },
  { name: 'Bone Age', href: '/bone-age' },
  { name: 'Endocrine Pathways', href: '/endocrine' },
  { name: 'Nutrition', href: '/nutrition' },
  { name: 'Genetics', href: '/genetics' },
  { name: 'Cases', href: '/cases' },
  { name: 'Assessment', href: '/assessment' },
  { name: 'Glossary', href: '/glossary' },
]

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <Link to="/" className="text-xl font-bold">
              PedsGrowth Atlas
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-6">
            {navigation.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                More
              </button>
              <div className="absolute hidden group-hover:block pt-2">
                <div className="bg-popover border rounded-md shadow-lg p-2 min-w-[160px]">
                  {navigation.slice(5).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                        location.pathname === item.href
                          ? "bg-accent"
                          : ""
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>
            PedsGrowth Atlas - Educational purposes only. Not for clinical use.
          </p>
          <p className="mt-2">
            Evidence-based content from WHO, CDC, AAP, and ESPE guidelines.
          </p>
        </div>
      </footer>
    </div>
  )
}
