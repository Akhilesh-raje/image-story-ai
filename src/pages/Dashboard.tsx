
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Hash, Wand2 } from "lucide-react";
import { generateMultipleCaptions, CaptionRequest } from "@/services/captionService";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<string>("instagram");
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      const request: CaptionRequest = {
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        platform: platform as any,
      };

      const captions = await generateMultipleCaptions(request);
      
      // Store results in localStorage for Results page
      localStorage.setItem('generatedCaptions', JSON.stringify(captions));
      localStorage.setItem('originalImage', imageUrl);
      
      toast({
        title: "Captions generated!",
        description: "Your AI-powered captions are ready.",
      });
      
      navigate('/results');
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestedTags = [
    "#travel", "#sunset", "#CinqueTerre", "#wanderlust", 
    "#adventure", "#explore", "#nature", "#photography"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Perfect Caption
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Upload your image and let AI craft the perfect story
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Upload className="h-5 w-5" />
                Content Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="platform" className="text-base font-medium text-gray-700 dark:text-gray-300">
                  Target Platform
                </Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium text-gray-700 dark:text-gray-300">
                  Describe your image or moment (optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., My solo trip to Cinque Terre watching the sunset over the Mediterranean..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-3 min-h-[100px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  rows={4}
                />
              </div>
              
              <ImageUpload onImageChange={setImageUrl} />
            </CardContent>
          </Card>

          {/* Right Column - Preview & Generate */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Hash className="h-5 w-5" />
                AI Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Suggested Tags
                </Label>
                <div className="flex flex-wrap gap-3">
                  {suggestedTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <Wand2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI-Powered Generation
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Our AI will analyze your image, understand the context, and generate 4 different caption styles: Casual, Professional, Funny, and Inspirational.
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  100% Free • Unlimited Use • No API Keys Required
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Generating Captions...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate AI Captions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
