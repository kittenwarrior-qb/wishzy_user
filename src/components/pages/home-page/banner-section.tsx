"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/shared/animated-link";
import { BookOpen, Users, Award, Play, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";

const IMAGES = [
  "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
  "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
  "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
];

const BannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Hover 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    tiltY.set(px * 12);
    tiltX.set(-py * 8);
  }, [tiltX, tiltY]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  // Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    setSelectedIndex(api?.selectedScrollSnap() || 0);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-base-100"
      style={{ minHeight: "calc(100vh - var(--header-h, 70px))" }}
    >
      <div className="h-full flex items-center justify-center px-4 py-6">
        <div className="max-w-[1280px] w-full">
          <div className="flex items-center min-h-[600px]">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left: Text - Compact height */}
              <motion.div className="order-2 lg:order-1 space-y-5 max-w-xl">
                <motion.div 
                  initial={{ opacity: 0, x: -100 }} 
                  animate={isInView ? { opacity: 1, x: 0 } : {}} 
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    Nền tảng học trực tuyến #1 Việt Nam
                  </motion.div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight">
                    Khóa học
                    <span className="text-primary"> chất lượng cao</span>
                  </h1>
                  <p className="text-lg md:text-xl text-base-content/80 font-medium mt-2">
                    Đầu tư cho tương lai của bạn
                  </p>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, x: -50 }} 
                  animate={isInView ? { opacity: 1, x: 0 } : {}} 
                  transition={{ delay: 0.5, duration: 0.6 }} 
                  className="text-base-content/70 text-base leading-relaxed"
                >
                  Học từ các chuyên gia hàng đầu với hơn 1000+ khóa học được thiết kế để giúp bạn thành công trong sự nghiệp.
                </motion.p>

                {/* Features - Compact */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={isInView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ delay: 0.65, duration: 0.6 }} 
                  className="space-y-2"
                >
                  {["Chứng chỉ được công nhận", "Học theo lộ trình cá nhân", "Hỗ trợ 24/7 từ mentor"].map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-3" 
                      initial={{ opacity: 0, x: -25 }} 
                      animate={isInView ? { opacity: 1, x: 0 } : {}} 
                      transition={{ delay: 0.8 + index * 0.08, duration: 0.5 }}
                    >
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-base-content/80 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Stats - Compact */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={isInView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ delay: 1.0, duration: 0.6 }} 
                  className="grid grid-cols-3 gap-4 py-4"
                >
                  {[
                    { icon: BookOpen, label: "1000+", desc: "Khóa học", color: "text-primary" },
                    { icon: Users, label: "50K+", desc: "Học viên", color: "text-success" },
                    { icon: Award, label: "95%", desc: "Hài lòng", color: "text-info" },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center" 
                      whileHover={{ scale: 1.05 }} 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={isInView ? { opacity: 1, scale: 1 } : {}} 
                      style={{ transitionDelay: `${1.1 + index * 0.1}s` }}
                    >
                      <div className="flex justify-center mb-1">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-xl font-bold text-base-content">{stat.label}</div>
                      <div className="text-xs text-base-content/60">{stat.desc}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTAs - Using custom button variants */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={isInView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ delay: 1.2, duration: 0.6 }} 
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button 
                    size="lg" 
                    variant="threeD" 
                    className="font-semibold"
                  >
                    <AnimatedLink href="/courses" className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Khám phá khóa học
                    </AnimatedLink>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="threeDoutline" 
                    className="font-semibold"
                  >
                    <AnimatedLink href="#demo" className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Xem demo
                    </AnimatedLink>
                  </Button>
                </motion.div>

                {/* Carousel indicators */}
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  {scrollSnaps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-base-300"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right: 3D Tilt Carousel */}
              <div className="order-1 lg:order-2">
                <motion.div
                  className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                  style={{ 
                    perspective: 1000, 
                    rotateX: smoothTiltX, 
                    rotateY: smoothTiltY, 
                    transformStyle: "preserve-3d" 
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="embla h-full" ref={emblaRef}>
                    <div className="embla__container flex h-full">
                      {IMAGES.map((src, idx) => (
                        <div key={idx} className="embla__slide relative min-w-0 flex-[0_0_100%] h-full">
                          <Image 
                            src={src} 
                            alt={`Banner ${idx + 1}`} 
                            fill 
                            className="object-cover select-none" 
                            priority={idx === 0} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="pointer-events-auto absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3">
                    <button 
                      onClick={scrollPrev} 
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-base-100/90 text-base-content shadow hover:bg-base-100 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={scrollNext} 
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-base-100/90 text-base-content shadow hover:bg-base-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;