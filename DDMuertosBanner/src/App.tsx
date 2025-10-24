import { useState, useCallback, useRef, useEffect } from 'react';
import { Sparkles, Ghost, Skull } from 'lucide-react';
import { Button } from './components/ui/button';

// Generar posiciones de arañas de forma estable
const generateSpiders = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    size: 0.6 + Math.random() * 1.4, // Tamaño variable entre 0.6 y 2
  }));
};

const SPIDERS = generateSpiders(50);

export default function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showEdgeGhosts, setShowEdgeGhosts] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseDown = useCallback(() => {
    if (isPressed || isCompleted) return;
    
    setIsPressed(true);
    setShowCharacters(true);
    setShowEdgeGhosts(true);
    
    // Completar después de 10 segundos
    timeoutRef.current = window.setTimeout(() => {
      setShowCharacters(false);
      setShowEdgeGhosts(false);
      setIsCompleted(true);
      setIsPressed(false);
      timeoutRef.current = null;
    }, 10000);
  }, [isPressed, isCompleted]);

  const handleMouseUp = useCallback(() => {
    if (isCompleted || !isPressed) return;
    
    // Cancelar el timeout si existe
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Resetear el progreso
    setIsPressed(false);
    setShowCharacters(false);
    setShowEdgeGhosts(false);
  }, [isPressed, isCompleted]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-purple-900 to-zinc-950 relative overflow-hidden">
      
      {/* Sombra de sangre desde arriba */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-0 blood-shadow" />

      {/* Arañas pequeñas */}
      {SPIDERS.map(spider => (
        <div
          key={spider.id}
          className="absolute spider-crawl"
          style={{
            left: `${spider.left}%`,
            top: `${spider.top}%`,
            animationDelay: `${spider.delay}s`,
            fontSize: `${spider.size}rem`,
          }}
        >
          🕷️
        </div>
      ))}

      {/* Calaveras gigantes en esquinas superiores y fantasmas en inferiores */}
      {showEdgeGhosts && (
        <>
          <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-9xl z-50 pointer-events-none edge-ghost">
            💀
          </div>
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-9xl z-50 pointer-events-none edge-ghost">
            💀
          </div>
          <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 text-9xl z-50 pointer-events-none edge-ghost edge-ghost-sway rotate-45">
            👻
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 text-9xl z-50 pointer-events-none edge-ghost edge-ghost-sway -rotate-45">
            👻
          </div>
        </>
      )}

      {/* Personajes animados - solo cuando está presionado */}
      {showCharacters && (
        <>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '5%', top: '100%' }}>🦇</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '15%', top: '110%', animationDelay: '0.2s' }}>👻</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '25%', top: '125%' }}>🎃</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '35%', top: '105%', animationDelay: '0.2s' }}>🦇</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '45%', top: '115%' }}>👻</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '55%', top: '100%', animationDelay: '0.2s' }}>💀</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '65%', top: '105%' }}>🦇</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '75%', top: '145%', animationDelay: '0.2s' }}>🎃</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '85%', top: '125%' }}>💀</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '95%', top: '100%', animationDelay: '0.2s' }}>🎃</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '10%', top: '120%' }}>🦇</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '20%', top: '140%', animationDelay: '0.2s' }}>👻</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '30%', top: '120%' }}>🎃</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '40%', top: '130%', animationDelay: '0.2s' }}>🦇</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '50%', top: '125%' }}>👻</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '55%', top: '135%', animationDelay: '0.2s' }}>💀</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '60%', top: '130%' }}>🦇</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '70%', top: '140%', animationDelay: '0.2s' }}>🎃</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '80%', top: '120%' }}>💀</div>
          <div className="absolute pointer-events-none z-50 text-5xl animated-char" style={{ left: '90%', top: '130%', animationDelay: '0.2s' }}>🎃</div>
        </>
      )}

      {/* Contenedor principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-black/40 backdrop-blur-md rounded-3xl p-12 max-w-4xl w-full shadow-2xl border border-orange-500/30">
          
          {/* Decoraciones superiores */}
          <div className="flex justify-around mb-8 decoration-pulse">
            {['🎃', '🦇', '🧟', '🧟', '🦇', '🎃'].map((emoji, i) => (
              <div key={i} className="text-4xl">
                {emoji}
              </div>
            ))}
          </div>

          {/* Título principal */}
          {!isCompleted ? (
            <div className="text-center mb-8">
              <h1 className="text-6xl mb-4 bg-gradient-to-r from-orange-400 via-purple-400 to-orange-400 bg-clip-text text-transparent title-glow">
                Día de Muertos & Halloween
              </h1>
              <div className="flex items-center justify-center gap-3 text-orange-300">
                <Skull className="w-6 h-6" />
                <p className="text-xl">
                  Mantén presionado el botón para invocar espíritus
                </p>
                <Skull className="w-6 h-6" />
              </div>
            </div>
          ) : (
            <div className="text-center mb-8 completion-appear">
              <h1 className="text-6xl mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ¡Recordemos a Nuestros Seres Queridos!
              </h1>
              <p className="text-2xl text-orange-200 max-w-3xl mx-auto">
                Llévalos siempre en tu mente y corazón, más ahora en este Día de Muertos
              </p>
            </div>
          )}

          {/* Decoración de huesos o Ataúdes */}
          {!isCompleted ? (
            <div className="flex justify-center gap-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="text-3xl flower-sway" style={{ animationDelay: `${i * 0.1}s` }}>
                  🦴
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-8 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative flex flex-col items-center coffin-skeleton" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="text-6xl mb-2 z-10">💀</div>
                  <div className="text-6xl">⚰️</div>
                </div>
              ))}
            </div>
          )}

          {/* Botón interactivo */}
          <div className="flex flex-col items-center gap-6">
            <Button
              size="lg"
              className={`relative overflow-hidden text-xl px-12 py-8 transition-all duration-300 ${
                isCompleted
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700'
              } ${isPressed ? 'jello-active' : ''}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              onMouseLeave={handleMouseUp}
              disabled={isCompleted}
            >
              {isPressed && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 progress-fill" />
              )}
              
              <span className="relative z-10 flex items-center gap-3">
                {isCompleted ? (
                  <>
                    <Sparkles className="w-6 h-6" />
                    ¡Completado!
                  </>
                ) : isPressed ? (
                  <>
                    <Ghost className="w-6 h-6" />
                    Invocando...
                  </>
                ) : (
                  '🎃 Mantén Presionado'
                )}
              </span>
            </Button>

            {/* Barra de progreso */}
            <div className="w-full max-w-md">
              <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-orange-500/30">
                <div className={`h-full bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 ${isPressed ? 'progress-bar-fill' : ''}`} />
              </div>
            </div>
          </div>

          {/* Decoraciones inferiores */}
          <div className="flex justify-around mt-8">
            {['🕷️', '🕸️', '🦴', '🕸️', '🕷️'].map((emoji, i) => (
              <div key={i} className="text-3xl opacity-50">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Sombra de sangre desde arriba */
        .blood-shadow {
          background: linear-gradient(
            to bottom,
            rgba(139, 0, 0, 0.4) 0%,
            rgba(139, 0, 0, 0.3) 15%,
            rgba(100, 0, 0, 0.2) 30%,
            rgba(80, 0, 0, 0.1) 45%,
            rgba(60, 0, 0, 0.05) 60%,
            transparent 80%
          );
          animation: blood-pulse 4s ease-in-out infinite;
        }

        @keyframes blood-pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        /* Efecto de gelatina para el botón */

        @keyframes jello-press {
          0%, 100% {
            transform: skewX(0deg);
          }
          25% {
            transform: skewX(-6deg);
          }
          50% {
            transform: skewX(6deg);
          }
          75% {
            transform: skewX(-1deg);
          }
        }

        .jello-active {
          animation: jello-press 0.4s ease-in-out infinite;
        }

        /* Animación de arañas */
        @keyframes spider-move {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0) rotate(0deg);
          }
          25% {
            opacity: 0.7;
            transform: translateY(-10px) rotate(5deg);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-5px) rotate(-5deg);
          }
          75% {
            opacity: 0.8;
            transform: translateY(-15px) rotate(3deg);
          }
        }

        .spider-crawl {
          animation: spider-move 4s ease-in-out infinite;
          z-index: 5;
        }

        /* Animación de personajes flotantes */
        @keyframes float-away {
          0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(-20px) rotate(5deg) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-800px) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }

        .animated-char {
          animation: float-away 9s ease-out forwards;
        }

        /* Animación de fantasmas en esquinas */
        @keyframes ghost-peek {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.95;
          }
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
        }

        .edge-ghost {
          animation: ghost-peek 0.2s ease-out forwards;
        }

        /* Animación de balanceo para fantasmas inferiores */
        @keyframes ghost-sway {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        .edge-ghost-sway {
          animation: ghost-peek 0.2s ease-out forwards, ghost-sway 0.6s ease-in-out infinite 0.5s;
        }

        /* Animación de ataúdes */
        @keyframes rise-from-grave {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .coffin-skeleton {
          opacity: 0;
          animation: rise-from-grave 0.6s ease-out forwards;
        }

        /* Animación de decoraciones */
        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .decoration-pulse > div {
          animation: gentle-pulse 2s ease-in-out infinite;
        }

        .decoration-pulse > div:nth-child(1) { animation-delay: 0s; }
        .decoration-pulse > div:nth-child(2) { animation-delay: 0.2s; }
        .decoration-pulse > div:nth-child(3) { animation-delay: 0.4s; }
        .decoration-pulse > div:nth-child(4) { animation-delay: 0.6s; }
        .decoration-pulse > div:nth-child(5) { animation-delay: 0.8s; }
        .decoration-pulse > div:nth-child(6) { animation-delay: 1s; }

        /* Animación de flores */
        @keyframes sway {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        .flower-sway {
          animation: sway 2s ease-in-out infinite;
        }

        /* Brillo del título */
        @keyframes title-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(251, 146, 60, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.8));
          }
        }

        .title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }

        /* Animación de barra de progreso */
        @keyframes fill-progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .progress-bar-fill {
          animation: fill-progress 10s linear forwards;
        }

        .progress-fill {
          animation: fill-progress 10s linear forwards;
        }

        /* Aparición del mensaje final */
        @keyframes completion-appear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .completion-appear {
          animation: completion-appear 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
