
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Profile = () => {
  const historyItems = [
    {
      id: 1,
      caption: "Chasing sunsets and sea breezes in Cinque...",
      hashtags: ["#travel", "#sunset", "#CinqueTerre", "#wanderlust"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png"
    },
    {
      id: 2,
      caption: "Chasing sunsets and sea breezes in Cinque...",
      hashtags: ["#travel", "#sunset", "#CinqueTerre", "#wanderlust"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png"
    },
    {
      id: 3,
      caption: "Chasing sunsets and sea breezes in Cinque...",
      hashtags: ["#travel", "#sunset", "#CinqueTerre", "#wanderlust"],
      image: "/lovable-uploads/f57ec341-9d83-439f-979f-a7e2afe31258.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <span className="text-white font-bold">💬</span>
            </div>
            <h1 className="text-2xl font-bold">Caption Genius</h1>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {historyItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt="Generated content" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{item.caption}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.hashtags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-blue-500 text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div>
                    <h3 className="text-xl font-semibold">James Smith</h3>
                    <p className="text-gray-600">Logged in with Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
