"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailPlus, Share } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Successfully subscribed to our newsletter!");
      setShowSuccess(true);
      setEmail("");
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
    if (showSuccess) setShowSuccess(false);
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Lace Up
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Premium shoelaces crafted for style, durability, and everyday comfort. 
                Elevate your footwear with our carefully curated collection.
              </p>
            </div>
            
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-secondary"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Share className="h-4 w-4" />
                <span className="sr-only">Follow us on Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-secondary"
                onClick={() => window.open("https://twitter.com", "_blank")}
              >
                <Share className="h-4 w-4" />
                <span className="sr-only">Follow us on Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-secondary"
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <Share className="h-4 w-4" />
                <span className="sr-only">Follow us on Facebook</span>
              </Button>
            </div>
          </div>

          {/* Shop links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Shop</h4>
            <nav className="space-y-3">
              <a 
                href="/collections" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                All Collections
              </a>
              <a 
                href="/new-arrivals" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                New Arrivals
              </a>
              <a 
                href="/bestsellers" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Best Sellers
              </a>
              <a 
                href="/sale" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sale
              </a>
            </nav>
          </div>

          {/* Support links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Support</h4>
            <nav className="space-y-3">
              <a 
                href="/about" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </a>
              <a 
                href="/contact" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <a 
                href="/help" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Help Center
              </a>
              <a 
                href="/size-guide" 
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Size Guide
              </a>
            </nav>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-semibold text-foreground">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Get the latest products and exclusive offers.
              </p>
            </div>
            
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pr-12 ${emailError ? "border-destructive focus:border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  <MailPlus className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                
                {emailError && (
                  <p className="text-xs text-destructive">{emailError}</p>
                )}
                
                {showSuccess && (
                  <p className="text-xs text-green-600">Welcome to our newsletter!</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-border bg-secondary/50">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2024 Lace Up. All rights reserved.</p>
            <nav className="flex items-center gap-4">
              <a 
                href="/privacy" 
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/returns" 
                className="hover:text-foreground transition-colors"
              >
                Returns
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}