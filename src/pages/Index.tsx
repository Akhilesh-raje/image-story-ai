
import { MessageSquare, Sparkles, Camera, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "Smart Analysis",
      description: "AI analyzes your images to understand context and mood"
    },
    {
      icon: Sparkles,
      title: "Creative Captions",
      description: "Generate engaging, personalized captions that match your style"
    },
    {
      icon: Share2,
      title: "Ready to Share",
      description: "Copy and share your perfect captions across all platforms"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Effortless, professional<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              captions for your social posts
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your images into engaging stories with AI-powered captions that capture the perfect moment and emotion.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
