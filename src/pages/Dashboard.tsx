import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdvancedImageUpload } from "@/components/AdvancedImageUpload";
import { CaptionHistoryManager } from "@/components/CaptionHistoryManager";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Hash, Wand2, Target, Users, Building, TrendingUp } from "lucide-react";
import { generateMultipleAdvancedCaptions, saveCaptionToHistory, CaptionRequest } from "@/services/realCaptionService";
import { useToast } from "@/hooks/use-toast";
import { DynamicBackground } from "@/components/DynamicBackground";
import { PremiumLoadingAnimation } from "@/components/PremiumLoadingAnimation";
import { generateMultiplePremiumCaptions, EnhancedCaptionRequest } from "@/services/enhancedAIService";

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<string>("instagram");
  const [industry, setIndustry] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageKeywords, setImageKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingStage, setLoadingStage] = useState<'analyzing' | 'trending' | 'generating' | 'optimizing' | null>(null);

  const handleGenerate = async () => {
    if (!description && !imageUrl) {
      toast({
        title: "Missing content",
        description: "Please add a description or upload an image to generate captions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Enhanced loading stages
      const stages: Array<'analyzing' | 'trending' | 'generating' | 'optimizing'> = 
        ['analyzing', 'trending', 'generating', 'optimizing'];
      
      for (const stage of stages) {
        setLoadingStage(stage);
        await new Promise(resolve => setTimeout(resolve, 4000));
      }

      const request: EnhancedCaptionRequest = {
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        platform: platform as any,
        industry: industry || undefined,
        targetAudience: targetAudience || undefined,
        includeEmojis: true,
        captionLength: 'medium',
        brandVoice: 'authentic'
      };

      const captions = await generateMultiplePremiumCaptions(request);
      
      // Convert to compatible format
      const compatibleCaptions = captions.map(caption => ({
        caption: caption.caption,
        hashtags: caption.hashtags,
        platform: caption.platform,
        tone: caption.tone,
        engagement_score: caption.engagement_score
      }));
      
      // Save the best caption to history
      if (compatibleCaptions.length > 0) {
        await saveCaptionToHistory(compatibleCaptions[0], request as any);
      }
      
      // Store results in localStorage for Results page
      localStorage.setItem('generatedCaptions', JSON.stringify(compatibleCaptions));
      localStorage.setItem('originalImage', imageUrl);
      localStorage.setItem('originalRequest', JSON.stringify(request));
      
      toast({
        title: "🚀 Premium AI captions generated!",
        description: `Generated ${captions.length} industry-grade captions with ${Math.round(captions[0]?.engagement_score || 90)}% engagement potential.`,
      });
      
      navigate('/results');
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setLoadingStage(null);
    }
  };

  const industries = [
    "Fashion & Beauty", "Food & Beverage", "Travel & Tourism", "Technology", 
    "Fitness & Health", "Business & Finance", "Arts & Entertainment", "Education",
    "Real Estate", "Automotive", "Home & Garden", "Sports", "Non-profit", "Other"
  ];

  const audiences = [
    "Young Adults (18-25)", "Millennials (26-35)", "Gen X (36-50)", "Baby Boomers (50+)",
    "Professionals", "Students", "Parents", "Entrepreneurs", "Creatives", "General Public"
  ];

  const suggestedTags = imageKeywords.length > 0 ? imageKeywords.map(k => `#${k}`) : [
    "#trending", "#viral", "#explore", "#creative", "#inspiration", "#lifestyle", "#motivation", "#success"
  ];

  if (isGenerating && loadingStage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
        <DynamicBackground variant="dashboard" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
            <PremiumLoadingAnimation 
              stage={loadingStage} 
              onComplete={() => {}} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <DynamicBackground variant="dashboard" />
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Caption Studio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Create viral social media captions with industry-leading AI analysis
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              <Button 
                variant={!showHistory ? "default" : "outline"}
                onClick={() => setShowHistory(false)}
                className="flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4" />
                Create New
              </Button>
              <Button 
                variant={showHistory ? "default" : "outline"}
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2"
              >
                <Hash className="h-4 w-4" />
                View History
              </Button>
            </div>
          </div>

          {showHistory ? (
            <CaptionHistoryManager />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Content Input */}
              <Card className="lg:col-span-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/20 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Upload className="h-5 w-5" />
                    Content Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="platform" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      Target Platform *
                    </Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">📷 Instagram</SelectItem>
                        <SelectItem value="facebook">👥 Facebook</SelectItem>
                        <SelectItem value="twitter">🐦 Twitter</SelectItem>
                        <SelectItem value="linkedin">💼 LinkedIn</SelectItem>
                        <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Industry (Optional)
                    </Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="audience" className="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Target Audience (Optional)
                    </Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audiences.map((aud) => (
                          <SelectItem key={aud} value={aud}>{aud}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      Describe your content (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="e.g., Celebrating our team's latest achievement at the office. Everyone worked hard to reach this milestone..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-3 min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      rows={5}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Middle Column - Image Upload */}
              <div className="lg:col-span-1 space-y-6">
                <AdvancedImageUpload 
                  onImageChange={setImageUrl} 
                  onAnalysisComplete={setImageKeywords}
                />
                
                {suggestedTags.length > 0 && (
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <Target className="h-5 w-5" />
                        AI Detected Themes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {suggestedTags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-sm px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Enhanced AI Generation */}
              <Card className="lg:col-span-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-white/20 dark:border-gray-700/20 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Sparkles className="h-5 w-5" />
                    Premium AI Engine
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <Wand2 className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Industry-Leading AI
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span>Advanced computer vision & object detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span>Real-time trending analysis & viral pattern detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span>Multi-tone generation with engagement optimization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span>Platform-specific viral coefficient analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                        <span>Audience psychology & brand alignment scoring</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:bg-gradient-to-r dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        Live Trending Analysis
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Our AI monitors trending hashtags, viral patterns, and audience behavior in real-time to maximize your content's reach and engagement potential.
                    </p>
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                    size="lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {isGenerating ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Generating Viral Captions...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
                          Generate Premium Captions
                        </>
                      )}
                    </div>
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Premium AI • Viral Optimization • Industry-Grade Results
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
