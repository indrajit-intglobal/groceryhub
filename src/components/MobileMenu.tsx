
import { X, Search, User, Heart, MapPin, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const megaMenuCategories = [
    { 
      name: 'Fresh Produce',
      subcategories: [
        { name: 'Fruits', link: '/products/fruits' },
        { name: 'Vegetables', link: '/products/vegetables' },
        { name: 'Organic', link: '/products/organic' },
        { name: 'Herbs & Spices', link: '/products/herbs' }
      ]
    },
    { 
      name: 'Dairy & Eggs',
      subcategories: [
        { name: 'Milk & Cream', link: '/products/milk' },
        { name: 'Cheese', link: '/products/cheese' },
        { name: 'Eggs', link: '/products/eggs' },
        { name: 'Yogurt', link: '/products/yogurt' }
      ]
    },
    { 
      name: 'Bakery',
      subcategories: [
        { name: 'Bread', link: '/products/bread' },
        { name: 'Pastries', link: '/products/pastries' },
        { name: 'Cakes', link: '/products/cakes' },
        { name: 'Cookies', link: '/products/cookies' }
      ]
    },
    { 
      name: 'Meat & Seafood',
      subcategories: [
        { name: 'Beef', link: '/products/beef' },
        { name: 'Chicken', link: '/products/chicken' },
        { name: 'Fish', link: '/products/fish' },
        { name: 'Seafood', link: '/products/seafood' }
      ]
    }
  ];

  const deals = [
    { name: 'Weekly Specials', link: '/deals/weekly' },
    { name: 'Bundle Offers', link: '/deals/bundles' },
    { name: 'Clearance', link: '/deals/clearance' }
  ];

  const services = [
    { name: 'Free Delivery', link: '/services/delivery' },
    { name: 'Quality Guarantee', link: '/services/guarantee' },
    { name: 'Easy Returns', link: '/services/returns' }
  ];

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
            <img src="logo.png" alt="GroceryHub" className='w-[150px]' />
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Actions */}
            <div className="p-4 space-y-2 border-b border-gray-100">
              <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={onClose}>
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">My Account</span>
              </Link>
              <Link to="/wishlist" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors" onClick={onClose}>
                <Heart className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Wishlist</span>
              </Link>
            </div>

            {/* Categories */}
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold mb-3">Categories</h3>
              <div className="space-y-1">
                {megaMenuCategories.map((category) => (
                  <div key={category.name}>
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex items-center justify-between w-full py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>{category.name}</span>
                      {expandedCategory === category.name ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedCategory === category.name && (
                      <div className="ml-4 space-y-1 mt-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.link}
                            className="block py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                            onClick={onClose}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Deals */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-gray-900 font-semibold mb-3">Deals & Offers</h3>
              <div className="space-y-1">
                {deals.map((deal) => (
                  <Link
                    key={deal.name}
                    to={deal.link}
                    className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    {deal.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-gray-900 font-semibold mb-3">Services</h3>
              <div className="space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.link}
                    className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="p-4 border-t border-gray-100">
              <div className="space-y-1">
                <Link to="/about" className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors" onClick={onClose}>
                  About Us
                </Link>
                <Link to="/contact" className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors" onClick={onClose}>
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Info - Fixed at bottom */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Deliver to 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
