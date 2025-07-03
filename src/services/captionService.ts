
// Free AI Caption Generation Service
export interface CaptionRequest {
  imageUrl?: string;
  description?: string;
  platform?: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';
  tone?: 'casual' | 'professional' | 'funny' | 'inspirational';
}

export interface CaptionResponse {
  caption: string;
  hashtags: string[];
  platform: string;
}

// Image analysis using a free vision API (mock implementation for now)
export const analyzeImage = async (imageUrl: string): Promise<string[]> => {
  // In a real implementation, this would use a free image analysis service
  // For now, we'll return mock keywords based on the image
  const mockKeywords = [
    'travel', 'sunset', 'nature', 'adventure', 'beautiful', 
    'landscape', 'peaceful', 'scenic', 'wanderlust', 'explore'
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockKeywords.slice(0, Math.floor(Math.random() * 5) + 3);
};

// Free caption generation (simulating ContentStudio API)
export const generateCaption = async (request: CaptionRequest): Promise<CaptionResponse> => {
  const { description, platform = 'instagram', tone = 'casual' } = request;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate keywords from image if provided
  let imageKeywords: string[] = [];
  if (request.imageUrl) {
    imageKeywords = await analyzeImage(request.imageUrl);
  }
  
  // Combine description and image keywords
  const context = [description, ...imageKeywords].filter(Boolean).join(', ');
  
  // Generate caption based on context and tone
  const captions = {
    casual: [
      `Living my best life! ${context} ✨`,
      `Just another day in paradise 🌅 ${context}`,
      `Can't get enough of moments like these! ${context} 💫`,
      `Soaking up every second of this beautiful day ${context} 🌸`
    ],
    professional: [
      `Embracing new perspectives and opportunities. ${context}`,
      `Finding inspiration in the beauty around us. ${context}`,
      `Taking time to appreciate life's precious moments. ${context}`,
      `Grateful for experiences that shape our journey. ${context}`
    ],
    funny: [
      `When life gives you ${context}, make it Instagram-worthy! 😂`,
      `Plot twist: This is actually my life now! ${context} 🤪`,
      `Just out here pretending to be a lifestyle blogger ${context} 😅`,
      `Living that ${context} life like it's my job! 💪`
    ],
    inspirational: [
      `Every moment is a fresh beginning. ${context} 🌟`,
      `Chase your dreams and make them reality. ${context} ✨`,
      `Life is beautiful when you open your heart to wonder. ${context} 💖`,
      `Believe in yourself and magic happens. ${context} 🌈`
    ]
  };
  
  const platformHashtags = {
    instagram: ['#instagram', '#insta', '#instagood', '#photooftheday', '#love', '#beautiful', '#happy', '#follow'],
    facebook: ['#facebook', '#social', '#connect', '#share', '#community', '#friends', '#family'],
    twitter: ['#twitter', '#trending', '#social', '#connect', '#share'],
    linkedin: ['#linkedin', '#professional', '#networking', '#career', '#business', '#success'],
    tiktok: ['#tiktok', '#viral', '#trending', '#fyp', '#foryou', '#dance', '#fun']
  };
  
  const contextHashtags = imageKeywords.map(keyword => `#${keyword.toLowerCase()}`);
  const selectedHashtags = [
    ...contextHashtags.slice(0, 5),
    ...platformHashtags[platform].slice(0, 8)
  ];
  
  const selectedCaption = captions[tone][Math.floor(Math.random() * captions[tone].length)];
  
  return {
    caption: selectedCaption,
    hashtags: [...new Set(selectedHashtags)], // Remove duplicates
    platform
  };
};

// Generate multiple caption variations
export const generateMultipleCaptions = async (request: CaptionRequest): Promise<CaptionResponse[]> => {
  const tones: Array<'casual' | 'professional' | 'funny' | 'inspirational'> = 
    ['casual', 'professional', 'funny', 'inspirational'];
  
  const promises = tones.map(tone => generateCaption({ ...request, tone }));
  return Promise.all(promises);
};
