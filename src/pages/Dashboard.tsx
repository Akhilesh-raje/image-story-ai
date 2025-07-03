
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ImageUpload";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <span className="text-white font-bold">💬</span>
            </div>
            <h1 className="text-2xl font-bold">Caption Genius</h1>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Step 1 of 2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="description">Describe your image (optional)</Label>
              <Input
                id="description"
                placeholder="e.g. My solo trip to Goa"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
              />
            </div>
            <ImageUpload />
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">#travel</span>
              <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">#sunset</span>
              <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">#CinqueTerre</span>
              <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">#wanderlust</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <span className="mr-2">📋</span>
                Copy
              </Button>
              <Button variant="outline" className="flex-1">
                <span className="mr-2">📱</span>
              </Button>
              <Button variant="outline" className="flex-1">
                <span className="mr-2">❤️</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
