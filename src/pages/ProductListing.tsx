
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Heart, Filter, Grid3X3, List, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChatButton from '@/components/FloatingChatButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import ProductModal from '@/components/ProductModal';

const ProductListing = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      price: 2.99,
      originalPrice: 3.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=300&h=300&fit=crop',
      badge: 'Organic',
      discount: 25,
      description: 'Fresh organic bananas, perfect for snacking or baking.',
      inStock: true
    },
    {
      id: 2,
      name: 'Fresh Strawberries',
      price: 4.99,
      originalPrice: 6.99,
      rating: 4.8,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop',
      badge: 'Fresh',
      discount: 29,
      description: 'Sweet and juicy strawberries, locally sourced.',
      inStock: true
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      price: 3.49,
      originalPrice: 4.49,
      rating: 4.3,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
      badge: 'Bestseller',
      discount: 22,
      description: 'Nutritious whole grain bread, baked fresh daily.',
      inStock: true
    },
    {
      id: 4,
      name: 'Organic Milk',
      price: 3.99,
      originalPrice: 4.99,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
      badge: 'Organic',
      discount: 20,
      description: 'Fresh organic milk from grass-fed cows.',
      inStock: false
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      price: 2.49,
      originalPrice: 3.49,
      rating: 4.4,
      reviews: 73,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop',
      badge: 'Fresh',
      discount: 29,
      description: 'Crisp and nutritious spinach leaves.',
      inStock: true
    },
    {
      id: 6,
      name: 'Premium Apples',
      price: 5.99,
      originalPrice: 7.99,
      rating: 4.7,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
      badge: 'Premium',
      discount: 25,
      description: 'Premium quality apples, crisp and sweet.',
      inStock: true
    }
  ];

  const filters = {
    categories: ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Meat', 'Organic'],
    brands: ['Fresh Farm', 'Organic Valley', 'Nature\'s Best', 'Green Choice'],
    ratings: [5, 4, 3, 2, 1]
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const ProductCard = ({ product }) => (
    <Card className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            className={`${
              product.badge === 'Organic' ? 'bg-green-light text-primary' :
              product.badge === 'Fresh' ? 'bg-orange-light text-orange' :
              'bg-gray-100 text-gray-800'
            }`}
          >
            {product.badge}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-red-500 text-white">
            -{product.discount}%
          </Badge>
        </div>
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-red-500 text-white">Out of Stock</Badge>
          </div>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button 
            size="sm" 
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => handleViewProduct(product)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            size="sm" 
            className="bg-primary text-white hover:bg-primary/90"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Products</span>
            {category && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900 capitalize">{category}</span>
              </>
            )}
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600">Discover our fresh and quality products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card className="p-4 lg:p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Price Range */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Price Range</label>
                  <div className="mt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Categories</label>
                  <div className="mt-2 space-y-2">
                    {filters.categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2">
                        <Checkbox id={cat} />
                        <label htmlFor={cat} className="text-sm text-gray-600">{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Brands</label>
                  <div className="mt-2 space-y-2">
                    {filters.brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm text-gray-600">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Rating</label>
                  <div className="mt-2 space-y-2">
                    {filters.ratings.map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center text-sm text-gray-600">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="ml-1">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Showing 1-6 of 24 products</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2 justify-center sm:justify-start">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center flex-wrap gap-2 mt-12">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChatButton />
      
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default ProductListing;
