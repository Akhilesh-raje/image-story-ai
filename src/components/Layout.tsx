
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { MessageSquare, Sun, Moon, User, LogOut, Settings, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function Layout() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of Caption Genius.",
    });
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/06b1a495-c027-47e3-b6ec-c83bcc38a50d.png" 
                    alt="Caption Genius Logo" 
                    className="h-6 w-6 object-contain filter brightness-0 invert"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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
              
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-gradient-to-r from-blue-500 to-purple-600">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Link to="/results" className="flex items-center">
                        <History className="mr-2 h-4 w-4" />
                        <span>History</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
