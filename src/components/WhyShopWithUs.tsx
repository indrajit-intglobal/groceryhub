
import { Truck, Shield, Clock, Headphones, Gift, Leaf } from 'lucide-react';

const WhyShopWithUs = () => {
  const features = [
    {
      id: 1,
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Delivery',
      description: 'Free delivery on orders over $50',
      color: 'text-blue-500'
    },
    {
      id: 2,
      icon: <Shield className="h-8 w-8" />,
      title: 'Quality Guaranteed',
      description: '100% fresh and quality products',
      color: 'text-green-500'
    },
    {
      id: 3,
      icon: <Clock className="h-8 w-8" />,
      title: 'Quick Delivery',
      description: 'Same day delivery available',
      color: 'text-orange'
    },
    {
      id: 4,
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Round the clock customer support',
      color: 'text-purple-500'
    },
    {
      id: 5,
      icon: <Gift className="h-8 w-8" />,
      title: 'Best Offers',
      description: 'Daily deals and special offers',
      color: 'text-pink-500'
    },
    {
      id: 6,
      icon: <Leaf className="h-8 w-8" />,
      title: 'Organic Choice',
      description: 'Wide range of organic products',
      color: 'text-primary'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">Why Shop With Us?</h2>
          <p className="text-gray-600">Experience the best grocery shopping with our premium services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="text-center group">
              <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <div className={`${feature.color} group-hover:text-primary transition-colors duration-300`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyShopWithUs;
