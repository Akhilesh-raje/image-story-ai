
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AdvancedImageUpload } from "@/components/AdvancedImageUpload";
import { CaptionHistoryManager } from "@/components/CaptionHistoryManager";
import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";
import { generateMultiplePremiumCaptions, EnhancedCaptionRequest } from "@/services/enhancedAIService";
import { saveCaptionToHistory } from "@/services/realCaptionService";
import { useToast } from "@/hooks/use-toast";
import { SpaceBackground } from "@/components/SpaceBackground";
import { PremiumLoadingAnimation } from "@/components/PremiumLoadingAnimation";
import { EmojiToneSelector } from "@/components/EmojiToneSelector";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ContentConfigurationPanel } from "@/components/dashboard/ContentConfigurationPanel";
import { AIGenerationEngine } from "@/components/dashboard/AIGenerationEngine";

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

  const suggestedTags = imageKeywords.length > 0 ? imageKeywords.map(k => `#${k}`) : [
    "#trending", "#viral", "#explore", "#creative", "#inspiration", "#lifestyle", "#motivation", "#success"
  ];

  if (isGenerating && loadingStage) {
    return (
      <div className="min-h-screen relative cream-pink-gradient dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <SpaceBackground variant="cosmic" intensity="medium" />
        <div className="flex items-center justify-center min-h-screen relative z-10 p-4">
          <div className="light-theme-card backdrop-blur-2xl rounded-3xl p-8 md:p-12 border shadow-2xl w-full max-w-lg">
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
    <div className="min-h-screen relative cream-pink-gradient dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SpaceBackground variant="cosmic" intensity="medium" />
      <div className="relative z-10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardHeader showHistory={showHistory} setShowHistory={setShowHistory} />

          {showHistory ? (
            <div className="light-theme-card backdrop-blur-2xl rounded-3xl border shadow-2xl">
              <CaptionHistoryManager />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column - Configuration */}
              <div className="lg:col-span-3 space-y-6">
                <ContentConfigurationPanel
                  platform={platform}
                  setPlatform={setPlatform}
                  industry={industry}
                  setIndustry={setIndustry}
                  targetAudience={targetAudience}
                  setTargetAudience={setTargetAudience}
                  description={description}
                  setDescription={setDescription}
                />
              </div>

              {/* Middle Column - Visual Content & Controls */}
              <div className="lg:col-span-4 space-y-6">
                <AdvancedImageUpload 
                  onImageChange={setImageUrl} 
                  onAnalysisComplete={setImageKeywords}
                />
                
                <EmojiToneSelector
                  selectedTone={selectedTone}
                  emojiQuantity={emojiQuantity}
                  onToneChange={setSelectedTone}
                  onEmojiQuantityChange={setEmojiQuantity}
                />
                
                {suggestedTags.length > 0 && (
                  <Card className="light-theme-card backdrop-blur-2xl border shadow-2xl">
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="light-theme-text font-semibold">AI Vision Analysis</h3>
                      </div>
                      <p className="light-theme-text-muted text-sm mb-4">
                        Detected themes from your visual content
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl text-blue-600 dark:text-blue-300 text-xs px-3 py-2 rounded-full border border-blue-400/30 hover:border-blue-400/50 cursor-pointer transition-all duration-300 hover:scale-105"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Right Column - AI Engine */}
              <div className="lg:col-span-5">
                <AIGenerationEngine
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
