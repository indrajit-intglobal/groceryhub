
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Truck, Shield, CreditCard, Clock, Star, Gift, Leaf, Apple, Milk, Cookie, Beef, Coffee, Utensils } from 'lucide-react';

const MegaMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const megaMenuData = {
    categories: {
      title: 'Categories',
      items: [
        { 
          name: 'Fresh Produce',
          icon: Leaf,
          description: 'Farm-fresh fruits & vegetables',
          subcategories: [
            { name: 'Fruits', link: '/products/fruits' },
            { name: 'Vegetables', link: '/products/vegetables' },
            { name: 'Organic', link: '/products/organic' },
            { name: 'Herbs & Spices', link: '/products/herbs' }
          ]
        },
        { 
          name: 'Dairy & Eggs',
          icon: Milk,
          description: 'Fresh dairy products',
          subcategories: [
            { name: 'Milk & Cream', link: '/products/milk' },
            { name: 'Cheese', link: '/products/cheese' },
            { name: 'Eggs', link: '/products/eggs' },
            { name: 'Yogurt', link: '/products/yogurt' }
          ]
        },
        { 
          name: 'Bakery',
          icon: Cookie,
          description: 'Fresh baked goods',
          subcategories: [
            { name: 'Bread', link: '/products/bread' },
            { name: 'Pastries', link: '/products/pastries' },
            { name: 'Cakes', link: '/products/cakes' },
            { name: 'Cookies', link: '/products/cookies' }
          ]
        },
        { 
          name: 'Meat & Seafood',
          icon: Beef,
          description: 'Quality proteins',
          subcategories: [
            { name: 'Beef', link: '/products/beef' },
            { name: 'Chicken', link: '/products/chicken' },
            { name: 'Fish', link: '/products/fish' },
            { name: 'Seafood', link: '/products/seafood' }
          ]
        }
      ]
    },
    deals: {
      title: 'Deals & Offers',
      items: [
        { 
          name: 'Weekly Specials',
          icon: Star,
          description: 'Best deals this week',
          link: '/deals/weekly'
        },
        { 
          name: 'Bundle Offers',
          icon: Gift,
          description: 'Save more with bundles',
          link: '/deals/bundles'
        },
        { 
          name: 'Clearance',
          icon: Clock,
          description: 'Limited time offers',
          link: '/deals/clearance'
        }
      ]
    },
    services: {
      title: 'Services',
      items: [
        { 
          name: 'Free Delivery',
          icon: Truck,
          description: 'On orders over $50',
          link: '/services/delivery'
        },
        { 
          name: 'Quality Guarantee',
          icon: Shield,
          description: 'Fresh or money back',
          link: '/services/guarantee'
        },
        { 
          name: 'Easy Returns',
          icon: CreditCard,
          description: 'Hassle-free returns',
          link: '/services/returns'
        }
      ]
    }
  };

  const handleMenuToggle = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <nav className="relative bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-8">
            
            {/* Categories Mega Menu */}
            <div className="relative">
              <button
                onClick={() => handleMenuToggle('categories')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenu === 'categories' ? 'rotate-180' : ''}`} />
              </button>
              
              {openMenu === 'categories' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[800px] max-w-[90vw] z-50 animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {megaMenuData.categories.items.map((category, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <category.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <Link
                              key={subIndex}
                              to={sub.link}
                              className="text-sm text-gray-600 hover:text-primary transition-colors duration-200 py-1"
                              onClick={() => setOpenMenu(null)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Deals Menu */}
            <div className="relative">
              <button
                onClick={() => handleMenuToggle('deals')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                <span>Deals</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenu === 'deals' ? 'rotate-180' : ''}`} />
              </button>
              
              {openMenu === 'deals' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[400px] max-w-[90vw] z-50 animate-fade-in">
                  <div className="space-y-4">
                    {megaMenuData.deals.items.map((deal, index) => (
                      <Link
                        key={index}
                        to={deal.link}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
                          <deal.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">{deal.name}</h3>
                          <p className="text-sm text-gray-600">{deal.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Menu */}
            <div className="relative">
              <button
                onClick={() => handleMenuToggle('services')}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              
              {openMenu === 'services' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[400px] max-w-[90vw] z-50 animate-fade-in">
                  <div className="space-y-4">
                    {megaMenuData.services.items.map((service, index) => (
                      <Link
                        key={index}
                        to={service.link}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div className="w-10 h-10 bg-gradient-blue rounded-lg flex items-center justify-center">
                          <service.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Regular Links */}
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {openMenu && (
        <div 
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => setOpenMenu(null)}
        />
      )}
    </nav>
  );
};

export default MegaMenu;
