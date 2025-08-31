// "use client";

// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";

// const featuredProducts = [
//   {
//     id: 1,
//     name: "Premium Leather Laces",
//     category: "Luxury Collection",
//     price: "$24.99",
//     image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop",
//     colors: ["Brown", "Black", "Tan"],
//     description: "Hand-crafted Italian leather"
//   },
//   {
//     id: 2,
//     name: "Cotton Classic Laces",
//     category: "Essential Collection",
//     price: "$12.99",
//     image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
//     colors: ["White", "Navy", "Grey"],
//     description: "Soft organic cotton blend"
//   },
//   {
//     id: 3,
//     name: "Athletic Round Laces",
//     category: "Performance Collection",
//     price: "$16.99",
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
//     colors: ["Neon", "Red", "Blue"],
//     description: "High-performance synthetic"
//   },
//   {
//     id: 4,
//     name: "Waxed Outdoor Laces",
//     category: "Adventure Collection",
//     price: "$18.99",
//     image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop",
//     colors: ["Olive", "Brown", "Black"],
//     description: "Weather-resistant coating"
//   }
// ];

// export default function FeaturedSection() {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   return (
//     <section className="py-20 px-4 max-w-7xl mx-auto">
//       {/* Section Header */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
//           Featured Collection
//         </h2>
//         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//           Discover our most popular and premium shoelaces, crafted for style, durability, and performance across every occasion.
//         </p>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {featuredProducts.map((product, index) => (
//           <div
//             key={product.id}
//             className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
//             onMouseEnter={() => setHoveredCard(index)}
//             onMouseLeave={() => setHoveredCard(null)}
//           >
//             {/* Product Image */}
//             <div className="relative aspect-[4/3] overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
              
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              
//               {/* Category Badge */}
//               <div className="absolute top-6 left-6">
//                 <Badge 
//                   variant="secondary" 
//                   className="bg-white/90 text-foreground backdrop-blur-sm border-0 font-medium"
//                 >
//                   {product.category}
//                 </Badge>
//               </div>

//               {/* Color Variants */}
//               <div className="absolute top-6 right-6 flex gap-2">
//                 {product.colors.map((color, colorIndex) => (
//                   <div
//                     key={colorIndex}
//                     className="w-3 h-3 rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm"
//                     title={color}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Product Information Overlay */}
//             <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//               <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
//                 <h3 className="text-2xl font-heading font-bold mb-2 leading-tight">
//                   {product.name}
//                 </h3>
                
//                 <p className="text-white/80 mb-4 text-sm font-medium">
//                   {product.description}
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <div className="text-3xl font-bold">
//                     {product.price}
//                   </div>
                  
//                   {/* Hover CTA */}
//                   <div 
//                     className={`transform transition-all duration-300 ${
//                       hoveredCard === index 
//                         ? 'translate-x-0 opacity-100' 
//                         : 'translate-x-4 opacity-0'
//                     }`}
//                   >
//                     <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full font-semibold text-sm hover:bg-accent/90 transition-colors">
//                       View Details
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Hover Border Effect */}
//             <div 
//               className={`absolute inset-0 border-2 border-accent rounded-2xl transition-opacity duration-300 ${
//                 hoveredCard === index ? 'opacity-100' : 'opacity-0'
//               }`} 
//             />
//           </div>
//         ))}
//       </div>

//       {/* Bottom CTA */}
//       <div className="text-center mt-16">
//         <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
//           Explore All Collections
//         </button>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Leather Laces",
    category: "Luxury Collection",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop",
    colors: ["Brown", "Black", "Tan"],
    description: "Hand-crafted Italian leather"
  },
  {
    id: 2,
    name: "Cotton Classic Laces",
    category: "Essential Collection",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
    colors: ["White", "Navy", "Grey"],
    description: "Soft organic cotton blend"
  },
  {
    id: 3,
    name: "Athletic Round Laces",
    category: "Performance Collection",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    colors: ["Neon", "Red", "Blue"],
    description: "High-performance synthetic"
  },
  {
    id: 4,
    name: "Waxed Outdoor Laces",
    category: "Adventure Collection",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop",
    colors: ["Olive", "Brown", "Black"],
    description: "Weather-resistant coating"
  }
];

export default function FeaturedSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Featured Collection
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our most popular and premium shoelaces, crafted for style, durability, and performance across every occasion.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Product Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <Badge 
                  variant="secondary" 
                  className="bg-white/90 text-foreground backdrop-blur-sm border-0 font-medium"
                >
                  {product.category}
                </Badge>
              </div>

              {/* Color Variants */}
              <div className="absolute top-6 right-6 flex gap-2">
                {product.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-3 h-3 rounded-full border-2 border-white/80 bg-white/20 backdrop-blur-sm"
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Product Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                <h3 className="text-2xl font-heading font-bold mb-2 leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-white/80 mb-4 text-sm font-medium">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">
                    {product.price}
                  </div>
                  
                  {/* Hover CTA */}
                  <div 
                    className={`transform transition-all duration-300 ${
                      hoveredCard === index 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full font-semibold text-sm hover:bg-accent/90 transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div 
              className={`absolute inset-0 border-2 border-accent rounded-2xl transition-opacity duration-300 ${
                hoveredCard === index ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
          Explore All Collections
        </button>
      </div>
    </section>
  );
}
