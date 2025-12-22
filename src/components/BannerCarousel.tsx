import { useState, useEffect, useRef } from 'react';

interface BannerSlide {
  image?: string;
  gradient?: string;
}

interface BannerCarouselProps {
  title: string;
  description: string;
  slides: BannerSlide[];
  autoPlayInterval?: number; // in milliseconds
}

export default function BannerCarousel({ 
  title, 
  description, 
  slides, 
  autoPlayInterval = 5000 
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const gradientClass = currentSlide.gradient || 'from-primary-500 to-primary-600';

  return (
    <div className="relative mb-6 rounded-lg overflow-hidden">
      <div
        ref={containerRef}
        className={`bg-gradient-to-r ${gradientClass} text-white p-6 md:p-8 relative transition-all duration-500`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {currentSlide.image && (
          <div className="absolute inset-0 opacity-20 transition-opacity duration-500">
            <img
              src={currentSlide.image}
              alt="Banner background"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Fixed text content */}
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-primary-100 text-sm md:text-base">{description}</p>
        </div>

        {/* Dots indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
