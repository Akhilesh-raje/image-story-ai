
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CaptionResponse } from "@/services/realCaptionService";

interface ImageAnalysisCardProps {
  originalImage: string;
  captionsCount: number;
  selectedCaption: CaptionResponse | null;
}

const ImageAnalysisCard = ({ originalImage, captionsCount, selectedCaption }: ImageAnalysisCardProps) => {
  const navigate = useNavigate();

  const getEngagementColor = (score?: number) => {
    if (!score) return 'text-gray-500 dark:text-gray-400';
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
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
            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
              AI Analysis Complete
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-400">Generated Variations</span>
              <span className="font-medium text-gray-900 dark:text-white">{captionsCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-400">Target Platform</span>
              <Badge variant="outline" className="text-xs text-gray-900 dark:text-gray-300">
                {selectedCaption?.platform || 'Instagram'}
              </Badge>
            </div>
            {selectedCaption?.engagement_score && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Engagement Score</span>
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
            className="w-full text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Create New Caption
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageAnalysisCard;
