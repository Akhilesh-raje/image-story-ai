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
import { Sparkles, Upload, Hash, Wand2, Target, Users, Building, TrendingUp, Zap, Brain, Globe2, Palette } from "lucide-react";
import { generateMultipleAdvancedCaptions, saveCaptionToHistory, CaptionRequest } from "@/services/realCaptionService";
import { useToast } from "@/hooks/use-toast";
import { SpaceBackground } from "@/components/SpaceBackground";
import { PremiumLoadingAnimation } from "@/components/PremiumLoadingAnimation";
import { generateMultiplePremiumCaptions, EnhancedCaptionRequest } from "@/services/enhancedAIService";
import { EmojiToneSelector } from "@/components/EmojiToneSelector";

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
  const [selectedTone, setSelectedTone] = useState<string>("authentic");
  const [emojiQuantity, setEmojiQuantity] = useState<number>(3);

  const handleGenerate = async () => {
    if (!description && !imageUrl) {
      toast({
        title: "Content Required",
        description: "Please provide a description or upload an image to generate premium captions.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
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
        brandVoice: selectedTone as any,
        emojiDensity: emojiQuantity
      };

      const captions = await generateMultiplePremiumCaptions(request);
      
      const compatibleCaptions = captions.map(caption => ({
        caption: caption.caption,
        hashtags: caption.hashtags,
        platform: caption.platform,
        tone: caption.tone,
        engagement_score: caption.engagement_score
      }));
      
      if (compatibleCaptions.length > 0) {
        await saveCaptionToHistory(compatibleCaptions[0], request as any);
      }
      
      localStorage.setItem('generatedCaptions', JSON.stringify(compatibleCaptions));
      localStorage.setItem('originalImage', imageUrl);
      localStorage.setItem('originalRequest', JSON.stringify(request));
      
      toast({
        title: "🚀 Premium AI Captions Generated",
        description: `Created ${captions.length} industry-grade captions with ${Math.round(captions[0]?.engagement_score || 90)}% engagement potential.`,
      });
      
      navigate('/results');
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
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

  const platformOptions = [
    { value: "instagram", label: "Instagram", icon: "📷", description: "Visual storytelling platform" },
    { value: "facebook", label: "Facebook", icon: "👥", description: "Community engagement focus" },
    { value: "twitter", label: "Twitter", icon: "🐦", description: "Real-time conversations" },
    { value: "linkedin", label: "LinkedIn", icon: "💼", description: "Professional networking" },
    { value: "tiktok", label: "TikTok", icon: "🎵", description: "Short-form video content" }
  ];

  if (isGenerating && loadingStage) {
    return (
      <div className="min-h-screen relative">
        <SpaceBackground variant="cosmic" intensity="medium" />
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="bg-white/5 dark:bg-gray-900/20 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 shadow-2xl">
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
    <div className="min-h-screen relative">
      <SpaceBackground variant="cosmic" intensity="medium" />
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/90">AI-Powered Caption Studio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Craft Viral Content with
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Precision AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Transform your visual content into compelling narratives that captivate audiences 
              and drive meaningful engagement across all social platforms.
            </p>
          </div>

          {/* Navigation Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
              <div className="flex gap-2">
                <Button 
                  variant={!showHistory ? "default" : "ghost"}
                  onClick={() => setShowHistory(false)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    !showHistory 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Wand2 className="h-4 w-4" />
                  Create New Caption
                </Button>
                <Button 
                  variant={showHistory ? "default" : "ghost"}
                  onClick={() => setShowHistory(true)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    showHistory 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Hash className="h-4 w-4" />
                  Caption History
                </Button>
              </div>
            </div>
          </div>

          {showHistory ? (
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
              <CaptionHistoryManager />
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Content Configuration Panel */}
              <Card className="lg:col-span-1 bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl">
                <CardHeader className="pb-8">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    Content Configuration
                  </CardTitle>
                  <p className="text-white/60 text-sm mt-2">
                    Define your content parameters for precision-targeted caption generation
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Platform Selection */}
                  <div>
                    <Label className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <Globe2 className="h-4 w-4 text-blue-400" />
                      Target Platform
                    </Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white backdrop-blur-xl h-14 text-base">
                        <SelectValue placeholder="Choose your platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                        {platformOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{option.icon}</span>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-white/60">{option.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Industry Specification */}
                  <div>
                    <Label className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-400" />
                      Industry Specialization
                    </Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white backdrop-blur-xl h-14 text-base">
                        <SelectValue placeholder="Select your industry vertical" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind} className="text-white hover:bg-white/10">
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Audience Targeting */}
                  <div>
                    <Label className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <Users className="h-4 w-4 text-pink-400" />
                      Audience Demographics
                    </Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white backdrop-blur-xl h-14 text-base">
                        <SelectValue placeholder="Define your target audience" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                        {audiences.map((aud) => (
                          <SelectItem key={aud} value={aud} className="text-white hover:bg-white/10">
                            {aud}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Content Description */}
                  <div>
                    <Label className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-green-400" />
                      Content Context
                    </Label>
                    <Textarea
                      placeholder="Describe your content's story, message, or key elements that should be highlighted in the caption..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 backdrop-blur-xl min-h-[140px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-blue-500/50"
                      rows={6}
                    />
                    <div className="text-xs text-white/50 mt-2">
                      Pro tip: Include emotions, context, and key messages for better AI understanding
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Content Upload */}
              <div className="lg:col-span-1 space-y-8">
                <AdvancedImageUpload 
                  onImageChange={setImageUrl} 
                  onAnalysisComplete={setImageKeywords}
                />
                
                {/* Enhanced Emoji & Tone Selector */}
                <EmojiToneSelector
                  selectedTone={selectedTone}
                  emojiQuantity={emojiQuantity}
                  onToneChange={setSelectedTone}
                  onEmojiQuantityChange={setEmojiQuantity}
                />
                
                {suggestedTags.length > 0 && (
                  <Card className="bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        AI Vision Analysis
                      </CardTitle>
                      <p className="text-white/60 text-sm">
                        Detected themes and elements from your visual content
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {suggestedTags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl text-blue-300 text-sm px-4 py-2 rounded-full border border-blue-400/30 hover:border-blue-400/50 cursor-pointer transition-all duration-300 hover:scale-105"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* AI Generation Engine */}
              <Card className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl">
                <CardHeader className="pb-8">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                      <Zap className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    Premium AI Engine
                  </CardTitle>
                  <p className="text-white/60 text-sm mt-2">
                    Industry-leading artificial intelligence for viral content creation
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* AI Capabilities Showcase */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-6 rounded-2xl border border-purple-400/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        Neural Caption Intelligence
                      </h3>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 animate-pulse"></div>
                        <div>
                          <div className="font-medium text-white">Advanced Computer Vision</div>
                          <div className="text-white/60">Deep learning object detection and scene understanding</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
                        <div>
                          <div className="font-medium text-white">Real-Time Trend Analysis</div>
                          <div className="text-white/60">Live monitoring of viral patterns and hashtag performance</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
                        <div>
                          <div className="font-medium text-white">Multi-Tone Generation</div>
                          <div className="text-white/60">Adaptive voice matching with engagement optimization</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 text-white/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mt-2 animate-pulse"></div>
                        <div>
                          <div className="font-medium text-white">Psychographic Targeting</div>
                          <div className="text-white/60">Audience psychology analysis for maximum resonance</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-green-400">97%</div>
                      <div className="text-xs text-white/60">Engagement Rate</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
                      <div className="text-2xl font-bold text-blue-400">2.4M+</div>
                      <div className="text-xs text-white/60">Captions Generated</div>
                    </div>
                  </div>

                  {/* Generation Button */}
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
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

                  {/* Status Indicator */}
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-sm text-green-400 justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Premium AI Active • Industry-Grade Results • Viral Optimization
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
