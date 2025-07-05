
interface DashboardHeaderProps {
  showHistory: boolean;
  setShowHistory: (value: boolean) => void;
}

import { Button } from "@/components/ui/button";
import { Wand2, Hash } from "lucide-react";

export const DashboardHeader = ({ showHistory, setShowHistory }: DashboardHeaderProps) => {
  return (
    <div className="text-center mb-12">
      {/* Premium Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-3 bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white/90 dark:text-white/90">AI-Powered Caption Studio</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-6 leading-tight px-4">
          Craft Viral Content with
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Precision AI Intelligence
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
          Transform your visual content into compelling narratives that captivate audiences 
          and drive meaningful engagement across all social platforms.
        </p>
      </div>

      {/* Navigation Toggle */}
      <div className="flex justify-center">
        <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
          <div className="flex gap-2">
            <Button 
              variant={!showHistory ? "default" : "ghost"}
              onClick={() => setShowHistory(false)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${
                !showHistory 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Wand2 className="h-4 w-4" />
              <span className="hidden sm:inline">Create New Caption</span>
              <span className="sm:hidden">Create</span>
            </Button>
            <Button 
              variant={showHistory ? "default" : "ghost"}
              onClick={() => setShowHistory(true)}
              className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${
                showHistory 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Hash className="h-4 w-4" />
              <span className="hidden sm:inline">Caption History</span>
              <span className="sm:hidden">History</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
