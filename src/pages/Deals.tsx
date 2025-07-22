import { useState } from 'react';
import { Clock, Star, Gift, Tag, Filter, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Deals = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const dealCategories = [
    { id: 'all', name: 'All Deals', icon: Tag },
    { id: 'weekly', name: 'Weekly Specials', icon: Star },
    { id: 'bundles', name: 'Bundle Offers', icon: Gift },
    { id: 'clearance', name: 'Clearance', icon: Clock }
  ];

  const deals = [
    {
      id: 1,
      title: 'Fresh Fruit Bundle',
      description: 'Mix of seasonal fruits - perfect for the family',
      originalPrice: 24.99,
      salePrice: 18.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
      category: 'bundles',
      timeLeft: '2 days left',
      badge: 'Limited Time'
    },
    {
      id: 2,
      title: 'Organic Vegetables Pack',
      description: 'Fresh organic vegetables sourced from local farms',
      originalPrice: 32.99,
      salePrice: 24.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop',
      category: 'weekly',
      timeLeft: '5 days left',
      badge: 'Weekly Special'
    },
    {
      id: 3,
      title: 'Dairy Essentials Bundle',
      description: 'Milk, cheese, yogurt, and eggs - all your dairy needs',
      originalPrice: 28.99,
      salePrice: 21.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      category: 'bundles',
      timeLeft: '3 days left',
      badge: 'Bundle Deal'
    },
    {
      id: 4,
      title: 'Bakery Clearance',
      description: 'Fresh baked goods at clearance prices',
      originalPrice: 15.99,
      salePrice: 8.99,
      discount: 44,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      category: 'clearance',
      timeLeft: 'Today only',
      badge: 'Clearance'
    },
    {
      id: 5,
      title: 'Snack Attack Bundle',
      description: 'Variety of healthy snacks for work and school',
      originalPrice: 22.99,
      salePrice: 16.99,
      discount: 26,
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop',
      category: 'bundles',
      timeLeft: '1 week left',
      badge: 'Popular'
    },
    {
      id: 6,
      title: 'Pantry Essentials',
      description: 'Stock up on pantry staples at great prices',
      originalPrice: 45.99,
      salePrice: 34.99,
      discount: 24,
      image: 'https://images.unsplash.com/photo-1544207240-1b0ac7e48e1d?w=400&h=300&fit=crop',
      category: 'weekly',
      timeLeft: '4 days left',
      badge: 'Best Value'
    }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesCategory = activeFilter === 'all' || deal.category === activeFilter;
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-sunset py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Amazing Deals & Offers
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Save big on your favorite products with our exclusive deals and bundle offers. 
              Limited time only!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Shop All Deals
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View Weekly Specials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {dealCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category.id)}
                  className="flex items-center space-x-1 sm:space-x-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full lg:w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white text-xs">
                      -{deal.discount}%
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-white text-xs">
                      {deal.badge}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{deal.timeLeft}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{deal.description}</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl font-bold text-primary">${deal.salePrice}</span>
                      <span className="text-base sm:text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Save ${(deal.originalPrice - deal.salePrice).toFixed(2)}
                    </Badge>
                  </div>
                  
                  <Button className="w-full bg-gradient-primary hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-playfair">
              Never Miss a Deal
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-white text-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Deals;