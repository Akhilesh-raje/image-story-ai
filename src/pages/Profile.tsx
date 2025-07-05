
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, History, Settings, Copy, Heart, Share2, Crown, Zap, TrendingUp, Award } from "lucide-react";
import { SpaceBackground } from "@/components/SpaceBackground";

const Profile = () => {
  const historyItems = [
    {
      id: 1,
      caption: "🌅 Chasing sunsets and sea breezes in Cinque Terre ✨ Sometimes the most beautiful moments are found in quiet spaces where the soul can breathe... 🌊💫",
      hashtags: ["#travel", "#sunset", "#CinqueTerre", "#wanderlust", "#serenity", "#goldenhour"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png",
      date: "2 hours ago",
      liked: true,
      engagement: 97,
      tone: "Poetic & Dreamy"
    },
    {
      id: 2,
      caption: "✨ Lost in the golden hour magic 🌅 Every sunset brings the promise of a new dawn and endless possibilities... 🙏💛",
      hashtags: ["#goldenhour", "#sunset", "#photography", "#peaceful", "#mindfulness", "#gratitude"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png",
      date: "1 day ago",
      liked: false,
      engagement: 89,
      tone: "Inspirational"
    },
    {
      id: 3,
      caption: "🌊 Where the Mediterranean meets the sky ☁️ Finding peace in the rhythm of waves and the whispers of ancient winds... 🏛️⚓",
      hashtags: ["#mediterranean", "#ocean", "#travel", "#serenity", "#coastallife", "#bluewater"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png",
      date: "3 days ago",
      liked: true,
      engagement: 94,
      tone: "Contemplative"
    }
  ];

  const stats = [
    { label: "Total Captions", value: "247", icon: Zap, color: "text-blue-400" },
    { label: "Avg Engagement", value: "94%", icon: TrendingUp, color: "text-green-400" },
    { label: "Viral Hits", value: "23", icon: Crown, color: "text-yellow-400" },
    { label: "Pro Member", value: "Elite", icon: Award, color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen relative">
      <SpaceBackground variant="nebula" intensity="vibrant" />
      
      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/90">AI-Powered Profile Analytics</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Creative
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Track your content performance, manage your creative history, and unlock insights 
              that drive viral engagement across all your social platforms.
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="history" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/5 backdrop-blur-xl border border-white/20 p-2 rounded-2xl">
                <TabsTrigger 
                  value="history" 
                  className="flex items-center gap-3 px-8 py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70 transition-all duration-300"
                >
                  <History className="h-5 w-5" />
                  Creative History
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-3 px-8 py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70 transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  Profile Settings
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="history" className="mt-8">
              <div className="space-y-8">
                {historyItems.map((item) => (
                  <Card key={item.id} className="bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="flex gap-8">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={item.image} 
                            alt="Generated content" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <p className="text-white font-medium text-lg leading-relaxed mb-4">
                                {item.caption}
                              </p>
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-green-400 font-medium text-sm">{item.engagement}% Engagement</span>
                                </div>
                                <div className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30">
                                  <span className="text-purple-300 text-sm font-medium">{item.tone}</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-white/50 ml-6 whitespace-nowrap text-sm">
                              {item.date}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {item.hashtags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="bg-blue-500/10 backdrop-blur-xl text-blue-300 text-sm px-4 py-2 rounded-full border border-blue-400/30 hover:border-blue-400/50 cursor-pointer transition-all duration-300 hover:scale-105"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4">
                            <Button size="sm" className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300">
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Caption
                            </Button>
                            <Button 
                              size="sm" 
                              className={`backdrop-blur-xl border transition-all duration-300 ${
                                item.liked 
                                  ? 'bg-red-500/20 text-red-300 border-red-400/30 hover:bg-red-500/30' 
                                  : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                              }`}
                            >
                              <Heart className={`h-4 w-4 mr-2 ${item.liked ? 'fill-current' : ''}`} />
                              {item.liked ? 'Loved' : 'Love'}
                            </Button>
                            <Button size="sm" className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300">
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <Card className="bg-white/5 backdrop-blur-2xl border-white/20 shadow-2xl">
                  <CardHeader className="pb-8">
                    <CardTitle className="flex items-center gap-4 text-white text-2xl">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      Elite Creator Profile
                    </CardTitle>
                    <p className="text-white/60 text-lg mt-2">
                      Manage your premium account settings and preferences
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex items-center gap-8">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                          <User className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Crown className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-white mb-2">James Smith</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
                            <span className="text-yellow-300 text-sm font-medium">Pro Elite Member</span>
                          </div>
                          <div className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30">
                            <span className="text-green-300 text-sm font-medium">Verified Creator</span>
                          </div>
                        </div>
                        <p className="text-white/70 text-lg">Logged in with Google</p>
                        <p className="text-white/50 mt-2">
                          Elite member since October 2024 • 247 viral captions generated
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 pt-8 border-t border-white/20">
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Account Features</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white/80">Unlimited AI Generations</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-white/80">Advanced Analytics</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-white/80">Priority Support</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg">Usage Stats</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70">Monthly Generations</span>
                            <span className="text-green-400 font-medium">247/∞</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Storage Used</span>
                            <span className="text-blue-400 font-medium">2.1GB/100GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">API Calls</span>
                            <span className="text-purple-400 font-medium">1,247</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-white/20">
                      <div className="flex gap-4">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <Settings className="h-5 w-5 mr-2" />
                          Advanced Settings
                        </Button>
                        <Button variant="outline" className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border-white/20 hover:border-white/30 px-6 py-3 rounded-xl transition-all duration-300">
                          Export Data
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
