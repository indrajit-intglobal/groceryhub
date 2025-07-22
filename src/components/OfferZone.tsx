
import { Clock, Gift, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const OfferZone = () => {
  const offers = [
    {
      id: 1,
      title: 'Flash Sale',
      description: 'Up to 70% off on selected items',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      timeLeft: '2h 30m',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-orange'
    },
    {
      id: 2,
      title: 'Weekend Special',
      description: 'Buy 2 Get 1 Free on fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
      timeLeft: '1d 12h',
      icon: <Gift className="h-5 w-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      title: 'Daily Deals',
      description: 'Fresh vegetables at lowest prices',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      timeLeft: '12h 45m',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Mega Discount',
      description: 'Save up to 50% on dairy products',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      timeLeft: '3h 15m',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-orange-light to-green-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">Hot Offers</h2>
          <p className="text-gray-600">Don't miss these amazing deals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover-scale">
                <div className="relative overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${offer.color} text-white`}>
                      <span className="flex items-center space-x-1">
                        {offer.icon}
                        <span>Hot Deal</span>
                      </span>
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Clock className="h-3 w-3 text-orange" />
                        <span className="text-gray-700 font-medium">{offer.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  <Button className="w-full bg-gradient-primary hover:bg-primary/90 text-white">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferZone;
