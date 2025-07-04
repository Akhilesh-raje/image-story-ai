
import { MessageSquare, Sparkles, Camera, Share2, Zap, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SpaceBackground } from "@/components/SpaceBackground";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "Neural Vision Analysis",
      description: "Advanced AI computer vision that understands context, emotions, and visual storytelling elements",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Quantum Caption Generation",
      description: "Multi-dimensional AI that creates personalized captions matching your unique brand voice",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "Cross-Platform Optimization",
      description: "Platform-specific algorithms that maximize engagement across all social media channels",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-Time Intelligence",
      description: "Live trend analysis and viral pattern recognition for maximum content performance",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Global Reach Engine",
      description: "Multi-language support with cultural context awareness for worldwide audience engagement",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Audience Psychology AI",
      description: "Deep learning models that understand and target specific demographic psychographics",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground variant="galaxy" intensity="vibrant" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-32">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/90">AI-Powered • Real-Time Analysis • Industry Leading</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Transform Ideas Into
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Viral Stories
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-2xl text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed">
            Harness the power of advanced artificial intelligence to craft compelling social media captions 
            that captivate audiences and drive unprecedented engagement across all platforms.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center gap-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
              onClick={() => navigate('/dashboard')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                Launch AI Studio
                <Sparkles className="ml-3 h-6 w-6 animate-pulse" />
              </div>
            </Button>
            
            {/* Social Proof */}
            <div className="flex items-center gap-8 text-white/60">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white/20"></div>
                  ))}
                </div>
                <span className="font-medium">50K+ Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Powered by Advanced
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Experience the future of content creation with our revolutionary AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 relative overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/20">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">97%</div>
                <div className="text-white/60">Engagement Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">2.4M+</div>
                <div className="text-white/60">Captions Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-400 mb-2">15sec</div>
                <div className="text-white/60">Average Generation Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">50K+</div>
                <div className="text-white/60">Active Creators</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
