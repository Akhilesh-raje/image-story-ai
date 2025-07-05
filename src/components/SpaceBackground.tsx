
import { useEffect, useState } from 'react';

interface SpaceBackgroundProps {
  variant?: 'cosmic' | 'nebula' | 'galaxy';
  intensity?: 'subtle' | 'medium' | 'vibrant';
}

export const SpaceBackground = ({ variant = 'cosmic', intensity = 'medium' }: SpaceBackgroundProps) => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; speed: number }>>([]);

  useEffect(() => {
    // Generate stars with physics-based properties
    const generateStars = () => {
      return Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
      }));
    };
    
    setStars(generateStars());
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes galaxyRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes nebulaPulse {
        0%, 100% { 
          opacity: 0.3; 
          transform: scale(1) rotate(0deg);
        }
        50% { 
          opacity: 0.6; 
          transform: scale(1.1) rotate(180deg);
        }
      }
      
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
      @keyframes cosmicDrift {
        0% { transform: translateX(-100px) translateY(-50px); }
        25% { transform: translateX(100px) translateY(-100px); }
        50% { transform: translateX(200px) translateY(50px); }
        75% { transform: translateX(-50px) translateY(100px); }
        100% { transform: translateX(-100px) translateY(-50px); }
      }
      
      @keyframes particleFloat {
        0% { 
          transform: translateY(100vh) translateX(0) scale(0);
          opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
          transform: translateY(-100px) translateX(${Math.random() * 400 - 200}px) scale(1);
          opacity: 0;
        }
      }
      
      @keyframes shootingStar {
        0% { 
          transform: translateX(-100px) translateY(-100px) rotate(45deg);
          opacity: 0;
        }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { 
          transform: translateX(100vw) translateY(100vh) rotate(45deg);
          opacity: 0;
        }
      }
      
      @keyframes warpSpeed {
        0% { 
          transform: translateX(50%) scaleX(1);
          opacity: 0;
        }
        50% { 
          opacity: 1;
          transform: translateX(50%) scaleX(50);
        }
        100% { 
          transform: translateX(-100%) scaleX(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const getBackgroundGradient = () => {
    const gradients = {
      cosmic: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f23 40%, #000000 100%)',
      nebula: 'radial-gradient(ellipse at center, #4338ca 0%, #1e1b4b 35%, #0f0f23 70%, #000000 100%)',
      galaxy: 'radial-gradient(ellipse at bottom, #7c3aed 0%, #4338ca 25%, #1e1b4b 50%, #0f0f23 75%, #000000 100%)'
    };
    return gradients[variant];
  };

  const getIntensityOpacity = () => {
    const intensities = { subtle: 0.4, medium: 0.7, vibrant: 0.9 };
    return intensities[intensity];
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base space gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ 
          background: getBackgroundGradient(),
          opacity: getIntensityOpacity()
        }}
      />
      
      {/* Enhanced Nebula clouds with more dynamics */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`nebula-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${300 + i * 150}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 20}%`,
              top: `${5 + i * 18}%`,
              background: `radial-gradient(circle, rgba(147, 51, 234, ${0.4 - i * 0.05}) 0%, rgba(59, 130, 246, ${0.3 - i * 0.04}) 40%, rgba(236, 72, 153, ${0.2 - i * 0.03}) 70%, transparent 100%)`,
              animation: `nebulaPulse ${12 + i * 4}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
              filter: `blur(${30 + i * 10}px)`,
              opacity: getIntensityOpacity() * 0.8
            }}
          />
        ))}
      </div>

      {/* Enhanced Galaxy spiral with multiple layers */}
      <div 
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(147, 51, 234, 0.15) 60deg, 
            rgba(59, 130, 246, 0.12) 120deg, 
            transparent 180deg, 
            rgba(236, 72, 153, 0.1) 240deg, 
            rgba(147, 51, 234, 0.15) 300deg, 
            transparent 360deg)`,
          animation: 'galaxyRotate 120s linear infinite',
          filter: 'blur(25px)',
          opacity: getIntensityOpacity() * 0.6
        }}
      />

      {/* Secondary rotating galaxy */}
      <div 
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 180deg at 30% 70%, 
            transparent 0deg, 
            rgba(59, 130, 246, 0.1) 90deg, 
            rgba(147, 51, 234, 0.08) 180deg, 
            transparent 270deg, 
            rgba(236, 72, 153, 0.06) 360deg)`,
          animation: 'galaxyRotate 200s linear infinite reverse',
          filter: 'blur(35px)',
          opacity: getIntensityOpacity() * 0.4
        }}
      />

      {/* Enhanced twinkling stars with different sizes */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity * getIntensityOpacity(),
              animation: `starTwinkle ${2 + star.speed * 3}s ease-in-out infinite`,
              animationDelay: `${star.id * 0.1}s`,
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8), 0 0 ${star.size * 6}px rgba(147, 51, 234, 0.3)`
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-white to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animation: `shootingStar ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${i * 3 + Math.random() * 5}s`,
              filter: 'blur(0.5px)',
              opacity: 0.7
            }}
          />
        ))}
      </div>

      {/* Enhanced floating cosmic particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: `rgba(${147 + Math.random() * 100}, ${51 + Math.random() * 100}, ${200 + Math.random() * 55}, 0.8)`,
              animation: `particleFloat ${15 + Math.random() * 25}s linear infinite`,
              animationDelay: `${Math.random() * 15}s`,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 4px rgba(147, 51, 234, 0.5)`
            }}
          />
        ))}
      </div>

      {/* Warp speed lines for extra dynamism */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`warp-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              top: `${10 + i * 10}%`,
              width: '200px',
              animation: `warpSpeed ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Enhanced cosmic drift overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 25% 75%, rgba(147, 51, 234, 0.12) 0%, transparent 60%),
                      radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 60%),
                      radial-gradient(circle at 60% 60%, rgba(236, 72, 153, 0.08) 0%, transparent 70%),
                      radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.06) 0%, transparent 50%)`,
          animation: 'cosmicDrift 80s ease-in-out infinite',
          opacity: getIntensityOpacity() * 0.7
        }}
      />
    </div>
  );
};
