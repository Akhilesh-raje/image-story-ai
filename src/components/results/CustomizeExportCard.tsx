
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Heart, CheckCircle, Edit3, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CaptionResponse, saveCaptionToHistory } from "@/services/realCaptionService";

interface CustomizeExportCardProps {
  selectedCaption: CaptionResponse | null;
  originalRequest: any;
  customCaption: string;
  onCustomCaptionChange: (caption: string) => void;
}

const CustomizeExportCard = ({ 
  selectedCaption, 
  originalRequest, 
  customCaption, 
  onCustomCaptionChange 
}: CustomizeExportCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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

  return (
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
            onChange={(e) => onCustomCaptionChange(e.target.value)}
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
  );
};

export default CustomizeExportCard;
