
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle, TrendingUp } from "lucide-react";
import { CaptionResponse, generateMultipleAdvancedCaptions } from "@/services/realCaptionService";
import { useToast } from "@/hooks/use-toast";

interface CaptionVariationsCardProps {
  captions: CaptionResponse[];
  selectedCaption: CaptionResponse | null;
  originalRequest: any;
  isRegenerating: boolean;
  onCaptionsUpdate: (captions: CaptionResponse[]) => void;
  onCaptionSelect: (caption: CaptionResponse) => void;
  onRegeneratingChange: (isRegenerating: boolean) => void;
}

const CaptionVariationsCard = ({ 
  captions, 
  selectedCaption, 
  originalRequest, 
  isRegenerating,
  onCaptionsUpdate, 
  onCaptionSelect,
  onRegeneratingChange
}: CaptionVariationsCardProps) => {
  const { toast } = useToast();

  const handleRegenerate = async () => {
    if (!originalRequest) {
      toast({
        title: "Cannot regenerate",
        description: "Original request data not found.",
        variant: "destructive",
      });
      return;
    }

    onRegeneratingChange(true);
    try {
      const newCaptions = await generateMultipleAdvancedCaptions(originalRequest);
      onCaptionsUpdate(newCaptions);
      
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
      onRegeneratingChange(false);
    }
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
            onClick={() => onCaptionSelect(caption)}
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
  );
};

export default CaptionVariationsCard;
