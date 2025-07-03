
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copy } from "lucide-react";

const Results = () => {
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

        <Card>
          <CardHeader>
            <CardTitle>Step 2 of 2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png" 
                alt="Cinque Terre coastal view" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <Label htmlFor="caption">Caption</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900">Chasing sunsets and sea breezes in</p>
              </div>
            </div>

            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
