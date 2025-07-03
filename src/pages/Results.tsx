
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, Share2, RefreshCw, CheckCircle, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CaptionResponse } from "@/services/captionService";

const Results = () => {
  const [captions, setCaptions] = useState<CaptionResponse[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<CaptionResponse | null>(null);
  const [customCaption, setCustomCaption] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load generated captions from localStorage
    const savedCaptions = localStorage.getItem('generatedCaptions');
    const savedImage = localStorage.getItem('originalImage');
    
    if (savedCaptions) {
      const parsedCaptions = JSON.parse(savedCaptions) as CaptionResponse[];
      setCaptions(parsedCaptions);
      setSelectedCaption(parsedCaptions[0]);
      setCustomCaption(parsedCaptions[0]?.caption || "");
    }
    
    if (savedImage) {
      setOriginalImage(savedImage);
    }
  }, []);

  const handleCopy = async () => {
    const textToCopy = `${customCaption}\n\n${selectedCaption?.hashtags.join(' ') || ''}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Caption and hashtags have been copied.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerate = () => {
    toast({
      title: "Generating new captions...",
      description: "Please wait while we create fresh captions for you.",
    });
    // In a real app, this would trigger regeneration
  };

  const getToneColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    ];
    return colors[index] || colors[0];
  };

  const getToneName = (index: number) => {
    const tones = ['Casual', 'Professional', 'Funny', 'Inspirational'];
    return tones[index] || 'Custom';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your AI-Generated Captions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose your favorite style and customize as needed
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                <img 
                  src={originalImage || "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png"} 
                  alt="Your uploaded image" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wand2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    AI Analysis Complete
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generated {captions.length} unique caption styles tailored for {selectedCaption?.platform || 'social media'}.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Middle Column - Caption Variations */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Caption Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {captions.map((caption, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCaption === caption 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => {
                    setSelectedCaption(caption);
                    setCustomCaption(caption.caption);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getToneColor(index)}>
                      {getToneName(index)}
                    </Badge>
                    {selectedCaption === caption && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                    {caption.caption}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column - Edit & Export */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Customize & Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="caption" className="text-base font-medium text-gray-700 dark:text-gray-300">
                  Caption
                </Label>
                <Textarea
                  id="caption"
                  value={customCaption}
                  onChange={(e) => setCustomCaption(e.target.value)}
                  className="mt-3 min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  rows={5}
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Hashtags
                </Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {selectedCaption?.hashtags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCopy}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  disabled={copied}
                >
                  {copied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy All"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-4 ${isLiked ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : 'border-gray-200 dark:border-gray-600'}`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="px-4 border-gray-200 dark:border-gray-600"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                onClick={handleRegenerate}
                variant="outline" 
                className="w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Variations
              </Button>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">
                    100% Free Generation
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  No API costs, no usage limits. Generate unlimited captions for all your content.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
