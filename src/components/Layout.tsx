
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { MessageSquare, Sun, Moon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-xl shadow-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Caption Genius</h1>
            </Link>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Link to="/profile">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
