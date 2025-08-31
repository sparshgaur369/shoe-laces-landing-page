"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  ListFilter, 
  ArrowDownNarrowWide,
  Package,
  Heart,
  X,
  Eye,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  colors: { name: string; hex: string; image: string }[];
  materials: string[];
  lengths: string[];
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
}

interface CartItem {
  productId: string;
  colorId: string;
  length: string;
  quantity: number;
}

interface Filters {
  collection: string;
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest';
  colors: string[];
  materials: string[];
  priceRange: { min: number; max: number };
  onSale: boolean;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton Laces',
    price: 12.99,
    salePrice: 9.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80'
    ],
    colors: [
      { name: 'White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80' },
      { name: 'Brown', hex: '#8B4513', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' }
    ],
    materials: ['Cotton'],
    lengths: ['36"', '45"', '54"'],
    category: 'Classic',
    description: 'Premium cotton shoelaces with reinforced aglets. Perfect for casual and dress shoes.',
    features: ['100% Cotton', 'Reinforced Tips', 'Pre-shrunk'],
    inStock: true
  },
  {
    id: '2',
    name: 'Waxed Leather Laces',
    price: 18.99,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
      'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=400&q=80'
    ],
    colors: [
      { name: 'Brown', hex: '#8B4513', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
      { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=400&q=80' },
      { name: 'Tan', hex: '#D2B48C', image: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400&q=80' }
    ],
    materials: ['Leather'],
    lengths: ['30"', '36"', '45"'],
    category: 'Waxed',
    description: 'Hand-waxed leather laces for premium boots and dress shoes. Water-resistant finish.',
    features: ['Genuine Leather', 'Water Resistant', 'Hand Waxed'],
    inStock: true
  },
  {
    id: '3',
    name: 'Round Athletic Laces',
    price: 8.99,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80'
    ],
    colors: [
      { name: 'Red', hex: '#FF0000', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
      { name: 'Blue', hex: '#0000FF', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
      { name: 'White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80' }
    ],
    materials: ['Polyester'],
    lengths: ['45"', '54"', '63"'],
    category: 'Round',
    description: 'Durable round laces perfect for athletic shoes and sneakers.',
    features: ['High Durability', 'Moisture Wicking', 'Fade Resistant'],
    inStock: true
  },
  {
    id: '4',
    name: 'Flat Canvas Laces',
    price: 7.99,
    salePrice: 5.99,
    images: [
      'https://images.unsplash.com/photo-1552066344-2464c1135c32?w=400&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80'
    ],
    colors: [
      { name: 'Navy', hex: '#000080', image: 'https://images.unsplash.com/photo-1552066344-2464c1135c32?w=400&q=80' },
      { name: 'Gray', hex: '#808080', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80' }
    ],
    materials: ['Canvas'],
    lengths: ['36"', '45"', '54"'],
    category: 'Flat',
    description: 'Classic flat canvas laces ideal for casual sneakers and canvas shoes.',
    features: ['Machine Washable', 'Color Fast', 'Soft Feel'],
    inStock: true
  }
];

const collections = ['All', 'Classic', 'Waxed', 'Round', 'Flat', 'Custom'];
const materials = ['Cotton', 'Leather', 'Polyester', 'Canvas'];
const colors = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Tan', hex: '#D2B48C' }
];

export default function ShopSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedLength, setSelectedLength] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    collection: 'All',
    sortBy: 'name',
    colors: [],
    materials: [],
    priceRange: { min: 0, max: 50 },
    onSale: false
  });

  const itemsPerPage = 8;

  // Simulate data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (Math.random() > 0.9) {
          throw new Error('Failed to load products');
        }
        
        setProducts(mockProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Collection filter
      if (filters.collection !== 'All' && product.category !== filters.collection) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasColor = product.colors.some(color => 
          filters.colors.includes(color.name)
        );
        if (!hasColor) return false;
      }

      // Material filter
      if (filters.materials.length > 0) {
        const hasMaterial = product.materials.some(material => 
          filters.materials.includes(material)
        );
        if (!hasMaterial) return false;
      }

      // Price filter
      const price = product.salePrice || product.price;
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }

      // On sale filter
      if (filters.onSale && !product.salePrice) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, filters]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleCollectionChange = useCallback((collection: string) => {
    setFilters(prev => ({ ...prev, collection }));
  }, []);

  const handleFilterChange = useCallback((key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  const openQuickView = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedLength(product.lengths[0] || '');
    setQuantity(1);
  }, []);

  const closeQuickView = useCallback(() => {
    setSelectedProduct(null);
    setSelectedColor('');
    setSelectedLength('');
    setQuantity(1);
  }, []);

  const addToCart = useCallback((product: Product, colorName?: string, length?: string, qty?: number) => {
    const selectedColorName = colorName || selectedColor;
    const selectedLengthValue = length || selectedLength;
    const selectedQuantity = qty || quantity;

    if (!selectedColorName || !selectedLengthValue) {
      toast.error('Please select color and length');
      return;
    }

    const cartItem: CartItem = {
      productId: product.id,
      colorId: selectedColorName,
      length: selectedLengthValue,
      quantity: selectedQuantity
    };

    // Show success toast
    toast.success(`Added to cart!`, {
      description: `${product.name} - ${selectedColorName}, ${selectedLengthValue}`,
      action: {
        label: 'View Cart',
        onClick: () => console.log('Navigate to cart')
      }
    });

    // Close modal if open
    if (selectedProduct) {
      closeQuickView();
    }
  }, [selectedColor, selectedLength, quantity, selectedProduct, closeQuickView]);

  const clearFilters = useCallback(() => {
    setFilters({
      collection: 'All',
      sortBy: 'name',
      colors: [],
      materials: [],
      priceRange: { min: 0, max: 50 },
      onSale: false
    });
  }, []);

  const retryLoad = useCallback(() => {
    window.location.reload();
  }, []);

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-6">We couldn't load the products. Please try again.</p>
            <Button onClick={retryLoad}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Shop Shoelaces</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated collection of premium shoelaces for every style and occasion
          </p>
        </div>

        {/* Collection Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {collections.map((collection) => (
              <Button
                key={collection}
                variant={filters.collection === collection ? "default" : "outline"}
                size="sm"
                onClick={() => handleCollectionChange(collection)}
                className="rounded-full"
              >
                {collection}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowDownNarrowWide className="w-4 h-4" />
                  Sort
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="start">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sort by</Label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value as Filters['sortBy'])}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>

            {/* Color Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />
                  Color {filters.colors.length > 0 && `(${filters.colors.length})`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Colors</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          const newColors = filters.colors.includes(color.name)
                            ? filters.colors.filter(c => c !== color.name)
                            : [...filters.colors, color.name];
                          handleFilterChange('colors', newColors);
                        }}
                        className={`w-8 h-8 rounded-full border-2 ${
                          filters.colors.includes(color.name) 
                            ? 'border-primary scale-110' 
                            : 'border-border hover:border-primary/50'
                        } transition-all`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Material Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ListFilter className="w-4 h-4" />
                  Material {filters.materials.length > 0 && `(${filters.materials.length})`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="start">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Materials</Label>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`material-${material}`}
                          checked={filters.materials.includes(material)}
                          onChange={(e) => {
                            const newMaterials = e.target.checked
                              ? [...filters.materials, material]
                              : filters.materials.filter(m => m !== material);
                            handleFilterChange('materials', newMaterials);
                          }}
                          className="rounded border-border"
                        />
                        <Label htmlFor={`material-${material}`} className="text-sm">
                          {material}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Price Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  ${filters.priceRange.min} - ${filters.priceRange.max}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Price Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min</Label>
                      <Input
                        id="min-price"
                        type="number"
                        value={filters.priceRange.min}
                        onChange={(e) => handleFilterChange('priceRange', {
                          ...filters.priceRange,
                          min: parseInt(e.target.value) || 0
                        })}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max</Label>
                      <Input
                        id="max-price"
                        type="number"
                        value={filters.priceRange.max}
                        onChange={(e) => handleFilterChange('priceRange', {
                          ...filters.priceRange,
                          max: parseInt(e.target.value) || 50
                        })}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* On Sale Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => handleFilterChange('onSale', checked)}
              />
              <Label htmlFor="on-sale" className="text-sm">On Sale</Label>
            </div>

            {/* Clear Filters */}
            {(filters.collection !== 'All' || filters.colors.length > 0 || filters.materials.length > 0 || filters.onSale) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="w-full h-64" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-card rounded-lg p-8 shadow-sm max-w-md mx-auto">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to find what you're looking for
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedProducts.map((product) => {
                const currentPrice = product.salePrice || product.price;
                const hasDiscount = !!product.salePrice;

                return (
                  <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={`${product.name} - Premium shoelaces`}
                        className="w-full h-64 object-cover"
                      />
                      
                      {/* Sale badge */}
                      {hasDiscount && (
                        <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                          Sale
                        </Badge>
                      )}

                      {/* Favorite button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.has(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>

                      {/* Quick actions - show on hover */}
                      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => openQuickView(product)}
                            className="flex-1 gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Quick View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(product, product.colors[0]?.name, product.lengths[0], 1)}
                            className="gap-2 bg-white/90"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.materials.join(', ')} • {product.lengths.join(', ')}
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold">${currentPrice.toFixed(2)}</span>
                        {hasDiscount && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Color swatches */}
                      <div className="flex gap-1">
                        {product.colors.slice(0, 4).map((color) => (
                          <div
                            key={color.name}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">+</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Quick View Modal */}
        {selectedProduct && (
          <Dialog open={!!selectedProduct} onOpenChange={() => closeQuickView()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <button
                  onClick={closeQuickView}
                  className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Images */}
                <div className="space-y-4">
                  <img
                    src={selectedProduct.colors.find(c => c.name === selectedColor)?.image || selectedProduct.images[0]}
                    alt={`${selectedProduct.name} in ${selectedColor}`}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProduct.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProduct.name} view ${index + 1}`}
                        className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80"
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold">
                        ${(selectedProduct.salePrice || selectedProduct.price).toFixed(2)}
                      </span>
                      {selectedProduct.salePrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{selectedProduct.description}</p>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Color</Label>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color.name 
                              ? 'border-primary scale-110' 
                              : 'border-border hover:border-primary/50'
                          } transition-all`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Selected: {selectedColor}
                    </p>
                  </div>

                  {/* Length Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Length</Label>
                    <Select value={selectedLength} onValueChange={setSelectedLength}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProduct.lengths.map((length) => (
                          <SelectItem key={length} value={length}>
                            {length}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Quantity</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Features</Label>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Add to Cart */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => addToCart(selectedProduct)}
                    disabled={!selectedColor || !selectedLength}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Free shipping on orders over $25 • 30-day returns
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}