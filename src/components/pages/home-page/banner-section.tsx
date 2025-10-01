// src/components/sections/banner-section.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/shared/animated-link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  BookOpen,
  Users,
  Award,
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Rocket,
  X,
} from "lucide-react";
import Image from "next/image";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import ThreeDCanvas from "@/components/shared/ThreeDCanvas";
import { useInteractiveModeStore } from "@/store/slices/interactive-mode";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
  "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
  "https://res.cloudinary.com/djuksxdrw/image/upload/v1754121769/photo-1548360129-ae7eb8da13b2_jmw5pq.avif",
];

const BannerSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null); // Ref mới cho text h1

  const {
    isInteractiveMode,
    isRocketLaunched,
    toggleInteractiveMode,
    setRocketLaunched,
  } = useInteractiveModeStore();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const onSelect = useCallback(
    (api: UseEmblaCarouselType[1]) =>
      setSelectedIndex(api?.selectedScrollSnap() || 0),
    []
  );
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const toggleAndResetInteractiveMode = () => {
    if (!isInteractiveMode) {
      if (containerRef.current) {
        window.scrollTo({
          top: containerRef.current.offsetTop,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          toggleInteractiveMode();
        }, 800);
      } else {
        toggleInteractiveMode();
      }
    } else {
      setRocketLaunched(false);
      toggleInteractiveMode();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".anim-child", { opacity: 0, x: -50 });
      gsap.set(".anim-child-y", { opacity: 0, y: 30 });
      gsap.set(".anim-tag", { opacity: 0, scale: 0.5 });
      gsap.set(cardRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(titleRef.current, { opacity: 0, y: 50, rotateX: -90 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => setIsInView(true),
        },
      });

      tl.to(".anim-tag", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transformOrigin: "center top",
        duration: 1,
        ease: "power3.out",
      }, "-=0.2")
        .to(
          ".anim-child",
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          ".anim-child-y",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          cardRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          0.2
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#fff1e8] h-[100vh]"
      style={{ transform: 'translateY(-64px)' }}
    >
      <div className={`absolute inset-0 z-0`}>
      <ThreeDCanvas
          key={canvasKey}
          isInteractiveMode={isInteractiveMode}
          isRocketLaunched={isRocketLaunched}
        />
      </div>

      <div
        ref={contentRef}
        className={`absolute inset-0 z-10 h-full flex items-center justify-center overflow-y-auto backdrop-blur-sm px-3 py-6 transition-opacity duration-500
        ${isInteractiveMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="max-w-[1280px] w-full">
          <div className="flex items-center min-h-[600px]">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-5 max-w-xl">
                <div>
                  <div className="anim-tag inline-flex items-center gap-2 bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Star className="w-4 h-4 fill-current" />
                    Nền tảng học trực tuyến #1 Việt Nam
                  </div>
                  <div className="perspective-800" ref={titleRef}>
                    <h1 className="anim-child text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight">
                      Khóa học{" "}
                      <span className="text-primary"> chất lượng cao</span>
                    </h1>
                    <p className="anim-child text-lg md:text-xl text-base-content/80 font-medium mt-2">
                      Đầu tư cho tương lai của bạn
                    </p>
                  </div>
                </div>
                <p className="anim-child text-base-content/70 text-base leading-relaxed">
                  Học từ các chuyên gia hàng đầu với hơn 1000+ khóa học được
                  thiết kế để giúp bạn thành công trong sự nghiệp.
                </p>
                <div className="space-y-2">
                  {[
                    "Chứng chỉ được công nhận",
                    "Học theo lộ trình cá nhân",
                    "Hỗ trợ 24/7 từ mentor",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="anim-child-y flex items-center gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-base-content/80 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 py-4">
                  {[
                    {
                      icon: BookOpen,
                      label: "1000+",
                      desc: "Khóa học",
                      color: "text-primary",
                    },
                    {
                      icon: Users,
                      label: "50K+",
                      desc: "Học viên",
                      color: "text-success",
                    },
                    {
                      icon: Award,
                      label: "95%",
                      desc: "Hài lòng",
                      color: "text-info",
                    },
                  ].map((stat) => (
                    <div key={stat.label} className="anim-child-y text-center">
                      <div className="flex justify-center mb-1">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-xl font-bold text-base-content">
                        {stat.label}
                      </div>
                      <div className="text-xs text-base-content/60">
                        {stat.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="anim-child-y flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="outline" className="font-semibold">
                    <AnimatedLink
                      href="/courses"
                      className="flex items-center gap-2"
                    >
                      Khám phá khóa học
                    </AnimatedLink>
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold">
                    <AnimatedLink
                      href="#demo"
                      className="flex items-center gap-2"
                    >
                      Xem demo
                    </AnimatedLink>
                  </Button>
                </div>
              </div>

              <div ref={cardRef} className="order-1 lg:order-2">
                <CardContainer className="inter-var" containerClassName="py-0">
                  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full aspect-[4/3] rounded-xl border shadow-2xl overflow-hidden">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative"
                    >
                      <div className="embla w-full h-full" ref={emblaRef}>
                        <div className="embla__container flex h-full">
                          {IMAGES.map((src, idx) => (
                            <div
                              key={idx}
                              className="embla__slide relative min-w-0 flex-[0_0_100%] h-full"
                            >
                              <Image
                                src={src}
                                alt={`Banner ${idx + 1}`}
                                fill
                                className="object-cover select-none rounded-xl"
                                priority={idx === 0}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={scrollPrev}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-base-100 text-base-content shadow hover:bg-base-200 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-base-100 text-base-content shadow hover:bg-base-200 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 justify-center mt-4">
                  {scrollSnaps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === selectedIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-base-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isInteractiveMode && (
        <Button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-300"
          onClick={toggleAndResetInteractiveMode}
          size="lg"
          variant="outline"
        >
          <Rocket size={20} className="mr-2" />
          Khám phá 3D
        </Button>
      )}

      {isInteractiveMode && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] flex gap-4 transition-all duration-300">
          <Button
            className="transition-all duration-300 shadow-lg"
            onClick={toggleAndResetInteractiveMode}
            size="lg"
          >
            <X size={20} className="mr-2" />
            Thoát chế độ 3D
          </Button>
          <Button
            className="transition-all duration-300 shadow-lg"
            onClick={() => setRocketLaunched(true)}
            size="lg"
          >
            <Rocket size={20} className="mr-2" />
            Phóng tên lửa
          </Button>
        </div>
      )}
    </div>
  );
};

export default BannerSection;