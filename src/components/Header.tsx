"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingCart, Hamburger, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock cart data
  const [cartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Cotton Laces",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop"
    },
    {
      id: "2",
      name: "Leather Boot Laces",
      price: 18.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1570233273390-1acfa68b7c08?w=100&h=100&fit=crop"
    },
    {
      id: "3",
      name: "Reflective Running Laces",
      price: 15.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1551107696-a4b0167dc1a1?w=100&h=100&fit=crop"
    }
  ]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const navigationItems = [
    { name: "Collections", href: "#collections" },
    { name: "Bestsellers", href: "#bestsellers" },
    { name: "About", href: "#about" },
    { name: "Sustainability", href: "#sustainability" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const shopSection = document.getElementById("shop");
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth" });
      }
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-card/80 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="font-heading font-bold text-xl text-foreground hover:text-primary transition-colors"
            aria-label="Go to top of page"
          >
            LaceUp
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 h-9 text-sm"
                    autoFocus
                    onBlur={() => {
                      setTimeout(() => setSearchOpen(false), 150);
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-9 w-9 p-0"
                    onClick={() => setSearchOpen(false)}
                  >
                    <ChevronUp className="h-4 w-4 rotate-45" />
                    <span className="sr-only">Close search</span>
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* Cart */}
            <Popover open={cartOpen} onOpenChange={setCartOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-3">Shopping Cart</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity} × ${item.price}
                              </p>
                            </div>
                            <p className="text-sm font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="sm">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Account Avatar */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">U</span>
              </div>
              <span className="sr-only">Account menu</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden h-9 w-9 p-0">
                  <Hamburger className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="py-6">
                  <nav className="space-y-6">
                    {navigationItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-8 pt-6 border-t">
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Account
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Help & Support
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}