"use client";

import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Chen",
    title: "Professional Runner",
    location: "San Francisco, CA",
    rating: 5,
    review: "These shoelaces have transformed my running experience completely. The durability is unmatched - I've put over 500 miles on them and they still look brand new. The grip technology keeps my shoes perfectly secure during marathons.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarah Martinez",
    title: "Fashion Designer",
    location: "New York, NY",
    rating: 5,
    review: "Absolutely love the aesthetic appeal and premium quality. The attention to detail in the weaving and the color options perfectly complement my sneaker collection. These laces elevate any shoe from basic to luxury.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "David Thompson",
    title: "Corporate Executive",
    location: "Chicago, IL",
    rating: 5,
    review: "Professional appearance meets practical functionality. I wear dress shoes daily and these laces maintain their crisp look all day long. The customer service team was incredibly helpful with sizing recommendations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Emma Wilson",
    title: "Fitness Instructor",
    location: "Austin, TX",
    rating: 5,
    review: "Perfect for my high-intensity workouts and daily training sessions. The laces stay tight throughout my entire routine and the moisture-wicking material keeps them fresh. Haven't found anything better in three years of searching.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "James Rodriguez",
    title: "Sneaker Collector",
    location: "Miami, FL",
    rating: 5,
    review: "As someone with 200+ pairs of sneakers, I'm extremely particular about laces. These are hands down the best quality I've encountered. The craftsmanship is exceptional and they make every pair in my collection look premium.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Lisa Park",
    title: "Outdoor Adventure Guide",
    location: "Denver, CO",
    rating: 5,
    review: "Tested these on mountain trails, river crossings, and desert hikes. They've endured everything nature can throw at them while maintaining perfect tension. The weather-resistant coating is a game-changer for outdoor enthusiasts.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Michael Brown",
    title: "Healthcare Professional",
    location: "Seattle, WA",
    rating: 5,
    review: "Spend 12+ hours on my feet daily and these laces provide consistent comfort and support. Easy to clean and sanitize, which is crucial in my work environment. The investment in quality has definitely paid off.",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Olivia Chang",
    title: "College Student",
    location: "Boston, MA",
    rating: 5,
    review: "Stylish, affordable, and incredibly durable for campus life. I love how they add personality to my everyday shoes while being practical enough to handle my busy schedule. The fast shipping was an added bonus!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating 
              ? 'fill-accent text-accent' 
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-card rounded-lg p-8 shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <StarRating rating={testimonial.rating} />
      
      <blockquote className="text-foreground mb-6 leading-relaxed text-base">
        "{testimonial.review}"
      </blockquote>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name}'s photo`}
            className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors duration-300"
          />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground text-lg">
            {testimonial.name}
          </h4>
          <p className="text-muted-foreground text-sm font-medium">
            {testimonial.title}
          </p>
          <p className="text-muted-foreground text-xs">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-bg-gradient-start to-bg-gradient-end">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real customers have to say about their 
            experience with our premium shoelaces and exceptional service.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Additional Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.slice(6).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-card rounded-xl p-8 border border-border max-w-3xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Join Thousands of Satisfied Customers
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Experience the difference that premium quality makes. 
              Try our shoelaces risk-free with our 30-day satisfaction guarantee.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 inline-flex items-center gap-2">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};