
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Smile, Heart, Zap, Crown, Star, Users, Briefcase, Palette } from "lucide-react";

interface EmojiToneSelectorProps {
  onToneChange: (tone: string) => void;
  onEmojiQuantityChange: (quantity: number) => void;
  selectedTone: string;
  emojiQuantity: number;
}

export const EmojiToneSelector = ({ 
  onToneChange, 
  onEmojiQuantityChange, 
  selectedTone, 
  emojiQuantity 
}: EmojiToneSelectorProps) => {
  const tones = [
    { 
      value: "authentic", 
      label: "Authentic & Genuine", 
      description: "Natural, relatable, and trustworthy voice",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      examples: ["✨", "💫", "🌟", "💕"]
    },
    { 
      value: "professional", 
      label: "Professional & Polished", 
      description: "Business-focused with industry expertise",
      icon: Briefcase,
      gradient: "from-blue-500 to-indigo-500",
      examples: ["📈", "💼", "🎯", "⚡"]
    },
    { 
      value: "playful", 
      label: "Playful & Fun", 
      description: "Energetic, entertaining, and engaging",
      icon: Smile,
      gradient: "from-yellow-500 to-orange-500",
      examples: ["🎉", "🤩", "🚀", "🌈"]
    },
    { 
      value: "inspirational", 
      label: "Inspirational & Motivating", 
      description: "Uplifting messages that inspire action",
      icon: Star,
      gradient: "from-purple-500 to-pink-500",
      examples: ["🌅", "💪", "🙏", "✨"]
    },
    { 
      value: "luxury", 
      label: "Luxury & Premium", 
      description: "Sophisticated, exclusive, high-end appeal",
      icon: Crown,
      gradient: "from-yellow-600 to-amber-500",
      examples: ["👑", "💎", "🥂", "🌟"]
    },
    { 
      value: "community", 
      label: "Community & Social", 
      description: "Building connections and fostering engagement",
      icon: Users,
      gradient: "from-green-500 to-teal-500",
      examples: ["🤝", "❤️", "🌍", "👥"]
    },
    { 
      value: "creative", 
      label: "Creative & Artistic", 
      description: "Imaginative, unique, and visually appealing",
      icon: Palette,
      gradient: "from-indigo-500 to-purple-500",
      examples: ["🎨", "🌺", "🦋", "🎭"]
    },
    { 
      value: "trending", 
      label: "Trending & Viral", 
      description: "Current trends and viral-worthy content",
      icon: Zap,
      gradient: "from-red-500 to-pink-500",
      examples: ["🔥", "💯", "⚡", "🚀"]
    }
  ];

  const selectedToneData = tones.find(tone => tone.value === selectedTone) || tones[0];

  const getEmojiQuantityLabel = (quantity: number) => {
    if (quantity <= 2) return "Minimal (1-2 emojis)";
    if (quantity <= 4) return "Moderate (3-4 emojis)";
    if (quantity <= 6) return "Rich (5-6 emojis)";
    return "Maximum (7+ emojis)";
  };

  return (
    <Card className="bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <div className={`p-2 bg-gradient-to-r ${selectedToneData.gradient} rounded-xl`}>
            <selectedToneData.icon className="h-5 w-5 text-white" />
          </div>
          Voice & Emoji Configuration
        </CardTitle>
        <p className="text-white/60 text-sm mt-2">
          Customize your caption's personality and emoji density for optimal engagement
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Tone Selection */}
        <div>
          <Label className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Palette className="h-4 w-4 text-purple-400" />
            Brand Voice & Tone
          </Label>
          <Select value={selectedTone} onValueChange={onToneChange}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white backdrop-blur-xl h-16 text-base">
              <SelectValue placeholder="Choose your brand voice" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20 max-h-96">
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value} className="text-white hover:bg-white/10 p-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className={`p-2 bg-gradient-to-r ${tone.gradient} rounded-lg flex-shrink-0`}>
                      <tone.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white">{tone.label}</div>
                      <div className="text-xs text-white/60 mt-1">{tone.description}</div>
                      <div className="flex gap-1 mt-2">
                        {tone.examples.map((emoji, index) => (
                          <span key={index} className="text-sm">{emoji}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Selected Tone Preview */}
          <div className={`mt-4 p-4 bg-gradient-to-r ${selectedToneData.gradient}/10 backdrop-blur-xl rounded-xl border border-white/10`}>
            <div className="flex items-center gap-3 mb-2">
              <selectedToneData.icon className={`h-5 w-5 bg-gradient-to-r ${selectedToneData.gradient} bg-clip-text text-transparent`} />
              <span className="text-white font-medium">{selectedToneData.label}</span>
            </div>
            <p className="text-white/70 text-sm">{selectedToneData.description}</p>
            <div className="flex gap-2 mt-3">
              {selectedToneData.examples.map((emoji, index) => (
                <span key={index} className="text-lg bg-white/10 px-2 py-1 rounded-lg">{emoji}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Emoji Quantity Slider */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold text-white flex items-center gap-2">
              <Smile className="h-4 w-4 text-yellow-400" />
              Emoji Density
            </Label>
            <div className="text-sm text-white/70 bg-white/10 backdrop-blur-xl px-3 py-1 rounded-full">
              {getEmojiQuantityLabel(emojiQuantity)}
            </div>
          </div>
          
          <div className="space-y-4">
            <Slider
              value={[emojiQuantity]}
              onValueChange={(value) => onEmojiQuantityChange(value[0])}
              max={8}
              min={1}
              step={1}
              className="w-full"
            />
            
            {/* Emoji Preview */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
              <div className="text-white/70 text-sm mb-3">Preview Density:</div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Your amazing content here</span>
                {Array.from({ length: Math.min(emojiQuantity, 8) }, (_, i) => (
                  <span key={i} className="text-lg">
                    {selectedToneData.examples[i % selectedToneData.examples.length]}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Density Scale */}
            <div className="flex justify-between text-xs text-white/50 px-1">
              <span>Minimal</span>
              <span>Moderate</span>
              <span>Rich</span>
              <span>Maximum</span>
            </div>
          </div>
        </div>

        {/* AI Enhancement Info */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl p-4 rounded-xl border border-purple-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-white font-medium text-sm">AI Enhancement Active</span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed">
            Our advanced AI will intelligently place emojis based on context, emotion, and engagement patterns 
            while maintaining your selected tone and density preferences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
