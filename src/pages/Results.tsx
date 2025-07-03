
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Heart, Share2, RefreshCw, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const [caption, setCaption] = useState("Chasing sunsets and sea breezes in Cinque Terre 🌅 Sometimes the most beautiful moments are found in the quiet spaces between adventure and stillness.");
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const hashtags = ["#travel", "#sunset", "#CinqueTerre", "#wanderlust", "#Italy", "#photography"];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${caption}\n\n${hashtags.join(' ')}`);
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
      title: "Generating new caption...",
      description: "Please wait while we create a fresh caption for you.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Perfect Caption
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Step 2 of 2 - Review and customize your AI-generated caption
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png" 
                  alt="Cinque Terre coastal view" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Caption */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Generated Caption</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="caption" className="text-base font-medium text-gray-700 dark:text-gray-300">
                  Caption
                </Label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mt-3 min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  rows={5}
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                  Hashtags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-3 py-2 rounded-full border border-blue-200 dark:border-blue-800"
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
                  {copied ? "Copied!" : "Copy"}
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
                Generate New Caption
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
