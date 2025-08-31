"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Play, Video } from 'lucide-react';

interface HeroProps {
  videoUrl?: string;
  onShopNowClick?: () => void;
  onExploreCollectionsClick?: () => void;
}

export default function Hero({
  videoUrl = "",
  onShopNowClick,
  onExploreCollectionsClick
}: HeroProps) {
  const [showProductInfo, setShowProductInfo] = useState(false);

  const handleShopNowClick = () => {
    if (onShopNowClick) {
      onShopNowClick();
    } else {
      // Smooth scroll to ShopSection
      const shopSection = document.getElementById('shop-section');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExploreCollectionsClick = () => {
    if (onExploreCollectionsClick) {
      onExploreCollectionsClick();
    } else {
      // Emit custom event for collection selector toggle and scroll to shop section
      const event = new CustomEvent('toggleCollectionSelector');
      window.dispatchEvent(event);
      
      const shopSection = document.getElementById('shop-section');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="min-h-[65vh] py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight">
                Premium Shoelaces
                <br />
                <span className="text-muted-foreground">Crafted to Last</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Discover our curated collection of premium shoelaces designed for durability, style, and perfect fit. Every pair tells a story of quality craftsmanship.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-8"
                onClick={handleShopNowClick}
              >
                Shop Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="font-medium px-8"
                onClick={handleExploreCollectionsClick}
              >
                Explore Collections
              </Button>
            </div>

            {/* Trust/USP Chips */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-3 py-1 font-medium">
                Free Shipping
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 font-medium">
                Premium Materials
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="secondary" 
                      className="px-3 py-1 font-medium cursor-help hover:bg-secondary/80 transition-colors"
                      onMouseEnter={() => setShowProductInfo(true)}
                      onMouseLeave={() => setShowProductInfo(false)}
                    >
                      30-day Returns
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Custom lengths and colors available</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Right Column - Media */}
          <div className="relative">
            <Card className="relative overflow-hidden bg-muted/30 border-2 border-accent/20 shadow-lg">
              <div className="aspect-[4/3] relative">
                {/* Background Panel */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/80" />
                
                {/* Video Container */}
                <div className="absolute inset-4 bg-card rounded-lg overflow-hidden shadow-md">
                  {videoUrl ? (
                    <div className="relative w-full h-full">
                      {/* Video would be embedded here when URL is provided */}
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                        <Button
                          variant="ghost"
                          size="lg"
                          className="relative z-10 bg-card/80 hover:bg-card shadow-lg"
                        >
                          <Play className="w-8 h-8 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Placeholder State */
                    <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/60 flex flex-col items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Add video URL
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Cutout Overlay */}
                <div className="absolute bottom-4 right-4 w-24 h-24 bg-card rounded-full shadow-lg border-2 border-accent/30 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&crop=center"
                    alt="Premium shoelace close-up"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}