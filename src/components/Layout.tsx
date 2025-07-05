
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { MessageSquare, Sun, Moon, User, LogOut, Settings, History, Sparkles, Crown, Zap } from "lucide-react";
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
      title: "✨ Signed out successfully",
      description: "Thank you for using Caption Genius. See you soon!",
    });
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/5 dark:bg-gray-900/20 border-b border-white/10 dark:border-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/dashboard" className="flex items-center gap-4 group">
              <div className="relative">
                {/* Enhanced Logo Container */}
                <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <img 
                    src="/lovable-uploads/06b1a495-c027-47e3-b6ec-c83bcc38a50d.png" 
                    alt="Caption Genius AI" 
                    className="h-8 w-8 object-contain filter brightness-0 invert relative z-10"
                  />
                  {/* Sparkle effect */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg">
                  <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                  Caption Genius
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/60 font-medium">AI-Powered Studio</span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-110"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                      <Avatar className="h-10 w-10 border-2 border-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {/* Pro badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Crown className="h-3 w-3 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72 bg-gray-900/95 backdrop-blur-2xl border-white/20 shadow-2xl rounded-2xl p-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 border-2 border-gradient-to-r from-blue-500 to-purple-600">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 text-white font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-lg font-semibold leading-none text-white">
                            {user.name}
                          </p>
                          <p className="text-sm leading-none text-white/60">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
                              <span className="text-yellow-300 text-xs font-medium">Pro Elite</span>
                            </div>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10 my-2" />
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 rounded-xl m-1 p-3 transition-all duration-200">
                      <Link to="/profile" className="flex items-center">
                        <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                          <User className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <span className="text-white font-medium">Profile & Analytics</span>
                          <p className="text-xs text-white/60">Manage account settings</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10 rounded-xl m-1 p-3 transition-all duration-200">
                      <Link to="/results" className="flex items-center">
                        <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                          <History className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <span className="text-white font-medium">Creative History</span>
                          <p className="text-xs text-white/60">View past generations</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-white/10 rounded-xl m-1 p-3 transition-all duration-200">
                      <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                        <Settings className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <span className="text-white font-medium">Advanced Settings</span>
                        <p className="text-xs text-white/60">Customize preferences</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10 my-2" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer hover:bg-red-500/10 rounded-xl m-1 p-3 transition-all duration-200 text-red-400 hover:text-red-300"
                    >
                      <div className="p-2 bg-red-500/20 rounded-lg mr-3">
                        <LogOut className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium">Sign out</span>
                        <p className="text-xs text-red-400/60">End current session</p>
                      </div>
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
