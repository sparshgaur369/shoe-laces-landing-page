"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Award, Users, Clock } from 'lucide-react';

export const BrandStorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Award, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Clock, value: "72hrs", label: "Crafting Time" },
    { icon: Sparkles, value: "100%", label: "Handmade Quality" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Textured Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f4ed] via-[#f3efe7] to-[#ede5d6]">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Handcrafted Excellence</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                An Extension of Your
                <span className="block text-accent">Expression</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every lace tells a story. Every knot carries purpose. We believe that the smallest details make the greatest difference in your daily ritual of self-expression.
              </p>
            </div>

            {/* Brand Story */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground/80 leading-relaxed">
                  Founded on the principle that quality transcends trends, our artisans have perfected the ancient craft of lace-making over generations. Each shoelace is meticulously woven using premium materials sourced from sustainable suppliers, ensuring durability that matches beauty.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  From the initial fiber selection to the final finishing touches, every step embodies our commitment to excellence. We don't just make shoelaces – we craft the threads that connect you to your journey.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sustainable Craft</h4>
                    <p className="text-sm text-muted-foreground">Eco-friendly materials and ethical production</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Lifetime Quality</h4>
                    <p className="text-sm text-muted-foreground">Built to last, designed to inspire</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="group inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Discover Our Craft
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Visual Content */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Main Visual Container */}
            <div className="relative">
              
              {/* Hero Image Placeholder */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#8B7355] via-[#A0956B] to-[#6B5B47] rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Lace Pattern Overlay */}
                <div className="absolute inset-0 opacity-20"
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                       backgroundSize: '40px 40px'
                     }}>
                </div>

                {/* Central Brand Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 border-2 border-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <p className="font-heading text-xl font-bold">Premium Craft</p>
                    <p className="text-sm opacity-80">Since 2009</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="absolute -bottom-8 left-4 right-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className={`bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg text-center transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${400 + index * 100}ms` }}
                    >
                      <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                      <div className="font-heading text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
    </section>
  );
};