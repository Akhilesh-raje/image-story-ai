
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Search, Heart, Copy, Share2, Trash2, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCaptionHistory } from "@/services/realCaptionService";

interface HistoryItem {
  id: string;
  caption: string;
  hashtags: string[];
  platform: string;
  tone: string;
  engagement_score?: number;
  createdAt: string;
  liked: boolean;
  used: boolean;
}

export function CaptionHistoryManager() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [toneFilter, setToneFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = getCaptionHistory();
      setHistory(savedHistory);
      setFilteredHistory(savedHistory);
    };
    
    loadHistory();
    
    // Listen for new captions added
    const handleStorageChange = () => loadHistory();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    let filtered = history;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (platformFilter !== "all") {
      filtered = filtered.filter(item => item.platform === platformFilter);
    }

    if (toneFilter !== "all") {
      filtered = filtered.filter(item => item.tone === toneFilter);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(item => item.liked);
    }

    setFilteredHistory(filtered);
  }, [history, searchTerm, platformFilter, toneFilter, showFavoritesOnly]);

  const handleCopy = async (item: HistoryItem) => {
    const textToCopy = `${item.caption}\n\n${item.hashtags.join(' ')}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied to clipboard!",
        description: "Caption and hashtags have been copied.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleLike = (id: string) => {
    const updatedHistory = history.map(item => 
      item.id === id ? { ...item, liked: !item.liked } : item
    );
    setHistory(updatedHistory);
    localStorage.setItem('captionHistory', JSON.stringify(updatedHistory));
  };

  const deleteItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('captionHistory', JSON.stringify(updatedHistory));
    toast({
      title: "Caption deleted",
      description: "Caption has been removed from your history.",
    });
  };

  const getToneColor = (tone: string) => {
    const colors: Record<string, string> = {
      casual: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      professional: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      funny: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      inspirational: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };
    return colors[tone] || colors.casual;
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      twitter: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
      linkedin: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      tiktok: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    return colors[platform] || colors.instagram;
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <History className="h-5 w-5" />
          Caption History ({filteredHistory.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search captions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
            </SelectContent>
          </Select>

          <Select value={toneFilter} onValueChange={setToneFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Tones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tones</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="funny">Funny</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Favorites Only
          </Button>
        </div>

        {/* History List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {history.length === 0 ? "No captions generated yet." : "No captions match your filters."}
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getPlatformColor(item.platform)}>
                      {item.platform}
                    </Badge>
                    <Badge className={getToneColor(item.tone)}>
                      {item.tone}
                    </Badge>
                    {item.engagement_score && (
                      <Badge variant="outline">
                        Score: {item.engagement_score}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {item.caption}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.hashtags.slice(0, 5).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.hashtags.length > 5 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      +{item.hashtags.length - 5} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleCopy(item)}>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleLike(item.id)}
                    className={item.liked ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20' : ''}
                  >
                    <Heart className={`h-3 w-3 mr-1 ${item.liked ? 'fill-current' : ''}`} />
                    {item.liked ? 'Liked' : 'Like'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
