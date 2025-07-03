
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Hash } from "lucide-react";

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate('/results');
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
                Step 1 of 2
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label htmlFor="description" className="text-base font-medium text-gray-700 dark:text-gray-300">
                  Describe your image (optional)
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
              
              <ImageUpload />
            </CardContent>
          </Card>

          {/* Right Column - Preview & Tags */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Hash className="h-5 w-5" />
                Suggested Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Caption
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
