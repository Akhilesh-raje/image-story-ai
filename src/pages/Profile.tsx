
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, History, Settings, Copy, Heart, Share2 } from "lucide-react";

const Profile = () => {
  const historyItems = [
    {
      id: 1,
      caption: "Chasing sunsets and sea breezes in Cinque Terre 🌅 Sometimes the most beautiful moments are found in quiet spaces...",
      hashtags: ["#travel", "#sunset", "#CinqueTerre", "#wanderlust"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png",
      date: "2 hours ago",
      liked: true
    },
    {
      id: 2,
      caption: "Lost in the golden hour magic ✨ Every sunset brings the promise of a new dawn...",
      hashtags: ["#goldenhour", "#sunset", "#photography", "#peaceful"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png",
      date: "1 day ago",
      liked: false
    },
    {
      id: 3,
      caption: "Where the Mediterranean meets the sky 🌊 Finding peace in the rhythm of waves...",
      hashtags: ["#mediterranean", "#ocean", "#travel", "#serenity"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png",
      date: "3 days ago",
      liked: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your account and view your caption history
          </p>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-8">
            <div className="space-y-6">
              {historyItems.map((item) => (
                <Card key={item.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <img 
                          src={item.image} 
                          alt="Generated content" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-gray-900 dark:text-white font-medium text-lg leading-relaxed line-clamp-2">
                            {item.caption}
                          </p>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4 whitespace-nowrap">
                            {item.date}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.hashtags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <Button size="sm" variant="outline" className="flex items-center gap-2">
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={`flex items-center gap-2 ${item.liked ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : ''}`}
                          >
                            <Heart className={`h-3 w-3 ${item.liked ? 'fill-current' : ''}`} />
                            {item.liked ? 'Liked' : 'Like'}
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-2">
                            <Share2 className="h-3 w-3" />
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
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">James Smith</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">Logged in with Google</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Member since October 2024 • 3 captions generated
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
