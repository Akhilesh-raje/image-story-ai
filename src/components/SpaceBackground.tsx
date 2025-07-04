
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
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
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
      
      {/* Nebula clouds */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`nebula-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${400 + i * 200}px`,
              height: `${300 + i * 150}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
              background: `radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)`,
              animation: `nebulaPulse ${15 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      {/* Galaxy spiral */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(147, 51, 234, 0.1) 60deg, 
            rgba(59, 130, 246, 0.1) 120deg, 
            transparent 180deg, 
            rgba(236, 72, 153, 0.1) 240deg, 
            rgba(147, 51, 234, 0.1) 300deg, 
            transparent 360deg)`,
          animation: 'galaxyRotate 100s linear infinite',
          filter: 'blur(20px)'
        }}
      />

      {/* Twinkling stars */}
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
              opacity: star.opacity,
              animation: `starTwinkle ${2 + star.speed * 3}s ease-in-out infinite`,
              animationDelay: `${star.id * 0.1}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`
            }}
          />
        ))}
      </div>

      {/* Floating cosmic particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(${147 + Math.random() * 100}, ${51 + Math.random() * 100}, 234, 0.6)`,
              animation: `particleFloat ${20 + Math.random() * 30}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Cosmic drift overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 70%)`,
          animation: 'cosmicDrift 60s ease-in-out infinite'
        }}
      />
    </div>
  );
};
