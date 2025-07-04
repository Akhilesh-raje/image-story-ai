
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Copy, Heart, Share2, RefreshCw, CheckCircle, Wand2, TrendingUp, Edit3, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CaptionResponse, generateMultipleAdvancedCaptions, saveCaptionToHistory } from "@/services/realCaptionService";

const Results = () => {
  const [captions, setCaptions] = useState<CaptionResponse[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<CaptionResponse | null>(null);
  const [customCaption, setCustomCaption] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [originalRequest, setOriginalRequest] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCaptions = localStorage.getItem('generatedCaptions');
    const savedImage = localStorage.getItem('originalImage');
    const savedRequest = localStorage.getItem('originalRequest');
    
    if (savedCaptions) {
      const parsedCaptions = JSON.parse(savedCaptions) as CaptionResponse[];
      setCaptions(parsedCaptions);
      setSelectedCaption(parsedCaptions[0]);
      setCustomCaption(parsedCaptions[0]?.caption || "");
    }
    
    if (savedImage) {
      setOriginalImage(savedImage);
    }
    
    if (savedRequest) {
      setOriginalRequest(JSON.parse(savedRequest));
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

  const handleRegenerate = async () => {
    if (!originalRequest) {
      toast({
        title: "Cannot regenerate",
        description: "Original request data not found.",
        variant: "destructive",
      });
      return;
    }

    setIsRegenerating(true);
    try {
      const newCaptions = await generateMultipleAdvancedCaptions(originalRequest);
      setCaptions(newCaptions);
      setSelectedCaption(newCaptions[0]);
      setCustomCaption(newCaptions[0]?.caption || "");
      
      // Save to localStorage
      localStorage.setItem('generatedCaptions', JSON.stringify(newCaptions));
      
      toast({
        title: "New captions generated!",
        description: "Fresh AI-powered captions are ready for you.",
      });
    } catch (error) {
      toast({
        title: "Regeneration failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (selectedCaption && originalRequest) {
      await saveCaptionToHistory(
        { ...selectedCaption, caption: customCaption },
        originalRequest
      );
      toast({
        title: "Saved to history!",
        description: "Caption has been added to your history.",
      });
    }
  };

  const handleExport = () => {
    const exportData = {
      caption: customCaption,
      hashtags: selectedCaption?.hashtags || [],
      platform: selectedCaption?.platform || '',
      tone: selectedCaption?.tone || '',
      engagement_score: selectedCaption?.engagement_score || 0,
      exported_at: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caption-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Caption exported!",
      description: "Caption data has been downloaded as JSON file.",
    });
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

  const getEngagementColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your AI-Generated Captions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional-grade captions with engagement predictions
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Image & Analysis */}
          <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                <img 
                  src={originalImage || "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png"} 
                  alt="Your uploaded content" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    AI Analysis Complete
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Generated Variations</span>
                    <span className="font-medium text-gray-900 dark:text-white">{captions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Target Platform</span>
                    <Badge variant="outline" className="text-xs">
                      {selectedCaption?.platform || 'Instagram'}
                    </Badge>
                  </div>
                  {selectedCaption?.engagement_score && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Engagement Score</span>
                        <span className={`font-medium ${getEngagementColor(selectedCaption.engagement_score)}`}>
                          {selectedCaption.engagement_score}%
                        </span>
                      </div>
                      <Progress 
                        value={selectedCaption.engagement_score} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline" 
                  className="w-full"
                >
                  Create New Caption
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Caption Variations */}
          <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                <span>Caption Variations</span>
                <Button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                  {isRegenerating ? 'Generating...' : 'Regenerate'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {captions.map((caption, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedCaption === caption 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => {
                    setSelectedCaption(caption);
                    setCustomCaption(caption.caption);
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getToneColor(index)}>
                        {getToneName(index)}
                      </Badge>
                      {caption.engagement_score && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {caption.engagement_score}%
                        </Badge>
                      )}
                    </div>
                    {selectedCaption === caption && (
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {caption.caption}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {caption.hashtags.slice(0, 4).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {caption.hashtags.length > 4 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                        +{caption.hashtags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Edit & Export */}
          <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Edit3 className="h-5 w-5" />
                Customize & Export
              </CardTitle>
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
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {customCaption.length} characters
                </div>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Hashtags ({selectedCaption?.hashtags.length || 0})
                </Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedCaption?.hashtags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={handleCopy}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  disabled={copied}
                >
                  {copied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : 'border-gray-200 dark:border-gray-600'}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={handleSaveToHistory}
                  variant="outline" 
                  className="w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Save to History
                </Button>
                
                <Button 
                  onClick={handleExport}
                  variant="outline" 
                  className="w-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">
                    Industry-Grade AI
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  Professional captions with engagement optimization, unlimited generation, and privacy protection.
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
