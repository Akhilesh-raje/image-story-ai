
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image, Camera, Link as LinkIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface AdvancedImageUploadProps {
  onImageChange?: (imageUrl: string, metadata?: any) => void;
  onAnalysisComplete?: (keywords: string[]) => void;
}

export function AdvancedImageUpload({ onImageChange, onAnalysisComplete }: AdvancedImageUploadProps) {
  const [preview, setPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<string[]>([]);
  const { toast } = useToast();

  const analyzeImage = async (url: string) => {
    setIsAnalyzing(true);
    try {
      // Mock analysis - in production, this would call real AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockKeywords = ['lifestyle', 'photography', 'creative', 'inspiring', 'beautiful', 'artistic'];
      setAnalysisResults(mockKeywords);
      onAnalysisComplete?.(mockKeywords);
      
      toast({
        title: "Image analyzed successfully!",
        description: "AI has extracted key themes from your image.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again or continue without analysis.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, GIF).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageChange?.(result, { filename: file.name, size: file.size, type: file.type });
      analyzeImage(result);
    };
    reader.readAsDataURL(file);
  }, [onImageChange, toast]);

  const handleUrlSubmit = async () => {
    if (!imageUrl) return;
    
    try {
      // Validate URL
      new URL(imageUrl);
      setPreview(imageUrl);
      onImageChange?.(imageUrl, { source: 'url' });
      await analyzeImage(imageUrl);
      setImageUrl("");
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL.",
        variant: "destructive",
      });
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const clearImage = () => {
    setPreview("");
    setAnalysisResults([]);
    onImageChange?.("");
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <Image className="h-5 w-5" />
          Smart Image Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!preview ? (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                URL
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-4">
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragging 
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={handleDrop}
              >
                <Input 
                  type="file" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      Drop your image here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Supports JPG, PNG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="mt-4">
              <div className="space-y-4">
                <Label htmlFor="image-url">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleUrlSubmit} disabled={!imageUrl}>
                    Load
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                onClick={clearImage}
                variant="outline"
                size="sm"
                className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isAnalyzing && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Analyzing image with AI...</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Extracting themes and keywords</p>
                </div>
              </div>
            )}

            {analysisResults.length > 0 && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">
                    AI Analysis Complete
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.map((keyword, index) => (
                    <span 
                      key={index}
                      className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full border border-green-200 dark:border-green-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
