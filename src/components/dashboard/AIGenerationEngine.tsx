
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Brain, Sparkles } from "lucide-react";

interface AIGenerationEngineProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export const AIGenerationEngine = ({ onGenerate, isGenerating }: AIGenerationEngineProps) => {
  return (
    <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl h-fit">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-white dark:text-white text-lg">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <Zap className="h-5 w-5 text-white animate-pulse" />
          </div>
          Premium AI Engine
        </CardTitle>
        <p className="text-white/60 dark:text-white/60 text-sm leading-relaxed">
          Industry-leading AI for viral content creation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Capabilities */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-5 rounded-2xl border border-purple-400/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-bold text-white dark:text-white">
              Neural Caption Intelligence
            </h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 text-white/80 dark:text-white/80">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-1.5 animate-pulse flex-shrink-0"></div>
              <div>
                <div className="font-medium text-white dark:text-white text-sm">Advanced Computer Vision</div>
                <div className="text-white/60 dark:text-white/60 text-xs">Deep learning object detection and scene understanding</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/80 dark:text-white/80">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1.5 animate-pulse flex-shrink-0"></div>
              <div>
                <div className="font-medium text-white dark:text-white text-sm">Real-Time Trend Analysis</div>
                <div className="text-white/60 dark:text-white/60 text-xs">Live monitoring of viral patterns and hashtag performance</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white/80 dark:text-white/80">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1.5 animate-pulse flex-shrink-0"></div>
              <div>
                <div className="font-medium text-white dark:text-white text-sm">Multi-Tone Generation</div>
                <div className="text-white/60 dark:text-white/60 text-xs">Adaptive voice matching with engagement optimization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
            <div className="text-xl font-bold text-green-400">97%</div>
            <div className="text-xs text-white/60 dark:text-white/60">Engagement Rate</div>
          </div>
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
            <div className="text-xl font-bold text-blue-400">2.4M+</div>
            <div className="text-xs text-white/60 dark:text-white/60">Captions Generated</div>
          </div>
        </div>

        {/* Generation Button */}
        <Button 
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white py-4 text-base font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                Generating Captions...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-5 w-5 animate-pulse" />
                Generate Premium Captions
              </>
            )}
          </div>
        </Button>

        {/* Status */}
        <div className="text-center">
          <div className="flex items-center gap-2 text-xs text-green-400 justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Premium AI Active • Industry-Grade Results
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
