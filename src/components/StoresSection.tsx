"use client";

import { MapPin, Clock, Phone, Star } from "lucide-react";

const stores = [
  {
    id: 1,
    name: "Fifth Avenue Flagship",
    location: "New York, NY",
    address: "523 Fifth Avenue, New York, NY 10017",
    phone: "(212) 555-0123",
    hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-7PM",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&auto=format",
    features: ["Personal Fitting Service", "Premium Collection", "Expert Consultation"]
  },
  {
    id: 2,
    name: "Beverly Hills Boutique",
    location: "Los Angeles, CA",
    address: "9570 Wilshire Boulevard, Beverly Hills, CA 90212",
    phone: "(310) 555-0456",
    hours: "Mon-Sat: 10AM-9PM, Sun: 12PM-6PM",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format",
    features: ["Celebrity Clientele", "Custom Orders", "Luxury Experience"]
  },
  {
    id: 3,
    name: "SoHo Design Studio",
    location: "New York, NY",
    address: "128 Spring Street, New York, NY 10012",
    phone: "(212) 555-0789",
    hours: "Tue-Sat: 11AM-7PM, Sun: 12PM-6PM",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format",
    features: ["Artisan Workshop", "Limited Editions", "Design Consultation"]
  },
  {
    id: 4,
    name: "Chicago River North",
    location: "Chicago, IL",
    address: "645 North Michigan Avenue, Chicago, IL 60611",
    phone: "(312) 555-0321",
    hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
    features: ["Sports Collection", "Athletic Consultation", "Performance Testing"]
  }
];

export const StoresSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Visit Our Stores
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience our premium shoelaces in person at our carefully curated retail locations. 
            Each store offers personalized service and our complete collection.
          </p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Store Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={store.image}
                  alt={`${store.name} storefront`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Store Details */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {store.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary" />
                    <span className="text-sm">{store.location}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {store.address}
                  </p>
                </div>

                {/* Contact & Hours */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                    <span className="text-foreground">{store.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Clock className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{store.hours}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-heading text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Special Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {store.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit Store CTA */}
                <div className="mt-6 pt-6 border-t border-border">
                  <button className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg border">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Can't Visit In Person?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Enjoy the same premium quality and personalized service with our online shopping experience. 
              Free shipping on all orders over $50.
            </p>
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5">
              Shop Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};