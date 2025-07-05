
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Globe2, Building, Users, Brain } from "lucide-react";

interface ContentConfigurationPanelProps {
  platform: string;
  setPlatform: (value: string) => void;
  industry: string;
  setIndustry: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export const ContentConfigurationPanel = ({
  platform,
  setPlatform,
  industry,
  setIndustry,
  targetAudience,
  setTargetAudience,
  description,
  setDescription
}: ContentConfigurationPanelProps) => {
  const industries = [
    "Fashion & Beauty", "Food & Beverage", "Travel & Tourism", "Technology", 
    "Fitness & Health", "Business & Finance", "Arts & Entertainment", "Education",
    "Real Estate", "Automotive", "Home & Garden", "Sports", "Non-profit", "Other"
  ];

  const audiences = [
    "Young Adults (18-25)", "Millennials (26-35)", "Gen X (36-50)", "Baby Boomers (50+)",
    "Professionals", "Students", "Parents", "Entrepreneurs", "Creatives", "General Public"
  ];

  const platformOptions = [
    { value: "instagram", label: "Instagram", icon: "📷", description: "Visual storytelling" },
    { value: "facebook", label: "Facebook", icon: "👥", description: "Community engagement" },
    { value: "twitter", label: "Twitter", icon: "🐦", description: "Real-time conversations" },
    { value: "linkedin", label: "LinkedIn", icon: "💼", description: "Professional networking" },
    { value: "tiktok", label: "TikTok", icon: "🎵", description: "Short-form video" }
  ];

  return (
    <Card className="bg-white/5 dark:bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl h-fit">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-white dark:text-white text-lg">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Palette className="h-5 w-5 text-white" />
          </div>
          Content Configuration
        </CardTitle>
        <p className="text-white/60 dark:text-white/60 text-sm leading-relaxed">
          Define your content parameters for precision-targeted generation
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Platform Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-white dark:text-white flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-blue-400" />
            Target Platform
          </Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="bg-white/5 dark:bg-white/5 border-white/20 text-white dark:text-white backdrop-blur-xl h-12">
              <SelectValue placeholder="Choose platform" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
              {platformOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-base">{option.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-white/60">{option.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industry */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-white dark:text-white flex items-center gap-2">
            <Building className="h-4 w-4 text-purple-400" />
            Industry
          </Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="bg-white/5 dark:bg-white/5 border-white/20 text-white dark:text-white backdrop-blur-xl h-12">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind} className="text-white hover:bg-white/10 text-sm">
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audience */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-white dark:text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-pink-400" />
            Target Audience
          </Label>
          <Select value={targetAudience} onValueChange={setTargetAudience}>
            <SelectTrigger className="bg-white/5 dark:bg-white/5 border-white/20 text-white dark:text-white backdrop-blur-xl h-12">
              <SelectValue placeholder="Define audience" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
              {audiences.map((aud) => (
                <SelectItem key={aud} value={aud} className="text-white hover:bg-white/10 text-sm">
                  {aud}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-white dark:text-white flex items-center gap-2">
            <Brain className="h-4 w-4 text-green-400" />
            Content Context
          </Label>
          <Textarea
            placeholder="Describe your content's story, message, or key elements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/5 dark:bg-white/5 border-white/20 text-white dark:text-white placeholder:text-white/40 backdrop-blur-xl min-h-[120px] text-sm leading-relaxed resize-none focus:ring-2 focus:ring-blue-500/50"
            rows={5}
          />
          <div className="text-xs text-white/50 dark:text-white/50">
            Include emotions, context, and key messages for better AI understanding
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
