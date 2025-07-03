
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-500 p-3 rounded-xl">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Caption Genius</h1>
        <p className="text-xl text-gray-600 mb-8">
          Effortless, professional captions for your social posts.
        </p>
        <Button 
          size="lg" 
          className="w-full max-w-xs bg-blue-500 hover:bg-blue-600"
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
