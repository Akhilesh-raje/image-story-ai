
import { useEffect, useState } from 'react';

interface DynamicBackgroundProps {
  variant?: 'dashboard' | 'results' | 'minimal';
}

export const DynamicBackground = ({ variant = 'dashboard' }: DynamicBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Add CSS animations to document head
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%, 100% 50%, 0% 50%;
        }
        25% {
          background-position: 100% 0%, 0% 100%, 50% 0%;
        }
        50% {
          background-position: 100% 100%, 0% 0%, 100% 50%;
        }
        75% {
          background-position: 0% 100%, 100% 0%, 50% 100%;
        }
      }

      @keyframes gradientFloat {
        0%, 100% {
          background-position: 0% 50%, 100% 50%;
        }
        50% {
          background-position: 100% 50%, 0% 50%;
        }
      }

      @keyframes float {
        0% {
          transform: translateY(100vh) translateX(0px) scale(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getBackgroundStyle = () => {
    const x = mousePosition.x / window.innerWidth;
    const y = mousePosition.y / window.innerHeight;
    
    switch (variant) {
      case 'dashboard':
        return {
          background: `
            radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${(1-x) * 100}% ${(1-y) * 100}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(59, 130, 246, 0.05) 0%, 
              rgba(147, 51, 234, 0.05) 25%,
              rgba(236, 72, 153, 0.05) 50%,
              rgba(59, 130, 246, 0.05) 75%,
              rgba(147, 51, 234, 0.05) 100%
            )
          `,
          backgroundSize: '100% 100%, 100% 100%, 400% 400%',
          animation: 'gradientShift 15s ease infinite'
        };
      case 'results':
        return {
          background: `
            radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${(1-x) * 100}% ${(1-y) * 100}%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            linear-gradient(45deg, 
              rgba(34, 197, 94, 0.03) 0%, 
              rgba(59, 130, 246, 0.03) 50%,
              rgba(147, 51, 234, 0.03) 100%
            )
          `,
          backgroundSize: '100% 100%, 100% 100%, 200% 200%',
          animation: 'gradientFloat 20s ease infinite'
        };
      default:
        return {
          background: `
            linear-gradient(135deg, 
              rgba(59, 130, 246, 0.03) 0%, 
              rgba(147, 51, 234, 0.03) 100%
            )
          `
        };
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 -z-10 transition-all duration-1000 ease-out"
        style={getBackgroundStyle()}
      />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </>
  );
};
