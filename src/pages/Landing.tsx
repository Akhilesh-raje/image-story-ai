
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Camera, Share2, Sparkles, Users, Zap, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SpaceBackground } from "@/components/SpaceBackground";

const Landing = () => {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn();
      toast({
        title: "Welcome to Caption Genius!",
        description: "Successfully signed in with Google.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const features = [
    {
      icon: Camera,
      title: "Smart Image Analysis",
      description: "AI analyzes your photos to understand context, mood, and visual elements",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Creative Caption Generation",
      description: "Generate engaging, personalized captions that match your unique style",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "Multi-Platform Ready",
      description: "Optimized captions for Instagram, Facebook, Twitter, and LinkedIn",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional captions in seconds, not minutes",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Create captions in multiple languages for global reach",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and collaborate on captions with your team members",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Social Media Manager",
      content: "Caption Genius has revolutionized our content creation process. We've seen a 300% increase in engagement!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Influencer",
      content: "The AI understands my voice perfectly. My followers can't tell the difference between AI and my own writing.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Johnson",
      role: "Brand Manager",
      content: "Finally, a tool that gets our brand voice right every time. Our campaigns have never been more consistent.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-gray-900">
      <SpaceBackground variant="nebula" intensity="medium" />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                  <img 
                    src="/lovable-uploads/06b1a495-c027-47e3-b6ec-c83bcc38a50d.png" 
                    alt="Caption Genius Logo" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold theme-text">
                Caption Genius
              </h1>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm">
              Beta
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full mb-8">
              🚀 Now with Advanced AI Analysis
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="theme-text">
                Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Social Stories
              </span>
            </h1>
            
            <p className="text-2xl theme-text-muted mb-16 max-w-4xl mx-auto leading-relaxed">
              Create engaging, professional captions that capture hearts and drive engagement. 
              Our AI understands your brand voice and crafts the perfect message every time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleSignIn}
                disabled={isSigningIn || isLoading}
                className="theme-button-primary px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group min-w-[200px]"
              >
                {isSigningIn || isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <div className="flex items-center gap-2 text-sm theme-text-muted">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Free to start • No credit card required
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 text-sm theme-text-muted">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white dark:border-gray-800"></div>
                  ))}
                </div>
                <span>10,000+ creators</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 text-yellow-400">★</div>
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 theme-text">
              Everything you need to create amazing content
            </h2>
            <p className="text-xl theme-text-muted max-w-2xl mx-auto">
              Powerful features designed to make content creation effortless and engaging
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="theme-card hover:shadow-xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold theme-text mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="theme-text-muted leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 theme-text">
              Loved by creators worldwide
            </h2>
            <p className="text-xl theme-text-muted">
              See what our users are saying about Caption Genius
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="theme-card hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-8">
                  <p className="theme-text mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="theme-text font-semibold">{testimonial.name}</h4>
                      <p className="theme-text-muted text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 backdrop-blur-sm theme-card">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 theme-text">
                Ready to transform your content?
              </h2>
              <p className="text-xl theme-text-muted mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using Caption Genius to create engaging content that drives results.
              </p>
              <Button 
                size="lg" 
                onClick={handleSignIn}
                disabled={isSigningIn || isLoading}
                className="theme-button-primary px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Landing;
