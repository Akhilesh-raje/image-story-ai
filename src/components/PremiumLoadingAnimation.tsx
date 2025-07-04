
import { useEffect, useState } from 'react';
import { Sparkles, Brain, TrendingUp, Zap } from 'lucide-react';

interface PremiumLoadingAnimationProps {
  stage: 'analyzing' | 'trending' | 'generating' | 'optimizing';
  onComplete?: () => void;
}

export const PremiumLoadingAnimation = ({ stage, onComplete }: PremiumLoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const stages = {
    analyzing: {
      icon: Brain,
      title: 'AI Vision Analysis',
      subtitle: 'Analyzing visual elements, composition & aesthetics',
      steps: [
        'Detecting objects and scenes...',
        'Analyzing color palette & lighting...',
        'Evaluating composition quality...',
        'Extracting emotional context...'
      ],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    trending: {
      icon: TrendingUp,
      title: 'Trending Research',
      subtitle: 'Researching current trends & viral patterns',
      steps: [
        'Scanning trending hashtags...',
        'Analyzing viral content patterns...',
        'Identifying audience preferences...',
        'Collecting engagement data...'
      ],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    generating: {
      icon: Sparkles,
      title: 'AI Caption Generation',
      subtitle: 'Creating premium captions with multiple tones',
      steps: [
        'Generating casual variations...',
        'Creating professional content...',
        'Adding humor & personality...',
        'Crafting inspirational messages...'
      ],
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    optimizing: {
      icon: Zap,
      title: 'Optimization & Scoring',
      subtitle: 'Calculating engagement & virality potential',
      steps: [
        'Calculating engagement scores...',
        'Predicting virality potential...',
        'Optimizing hashtag selection...',
        'Finalizing recommendations...'
      ],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  };

  const currentStage = stages[stage];
  const Icon = currentStage.icon;

  useEffect(() => {
    const duration = 4000; // 4 seconds per stage
    const stepDuration = duration / currentStage.steps.length;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onComplete?.();
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= currentStage.steps.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [stage, currentStage.steps.length, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* Main Icon with Pulse Animation */}
      <div className={`relative ${currentStage.bgColor} p-6 rounded-full`}>
        <Icon className={`h-12 w-12 ${currentStage.color} animate-pulse`} />
        
        {/* Ripple Effect */}
        <div className={`absolute inset-0 ${currentStage.bgColor} rounded-full animate-ping opacity-20`}></div>
        <div className={`absolute inset-2 ${currentStage.bgColor} rounded-full animate-ping opacity-10 animation-delay-150`}></div>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {currentStage.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {currentStage.subtitle}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-150 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Current Step */}
        <div className="text-center">
          <p className={`text-sm font-medium ${currentStage.color} animate-pulse`}>
            {currentStage.steps[currentStep]}
          </p>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex space-x-2">
        {currentStage.steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentStep 
                ? currentStage.color.replace('text-', 'bg-')
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Fun Facts */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 max-w-md">
        💡 Our AI processes over 10,000 trending patterns per second to deliver the most relevant captions
      </div>
    </div>
  );
};
