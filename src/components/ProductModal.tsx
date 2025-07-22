
import { X, Plus, Minus, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3">
                {product.badge && (
                  <Badge 
                    className={`${
                      product.badge === 'Organic' ? 'bg-green-light text-primary' :
                      product.badge === 'Fresh' ? 'bg-orange-light text-orange' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                {product.discount_percentage && (
                  <Badge className="bg-red-500 text-white">
                    -{product.discount_percentage}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.discount_percentage && (
                  <span className="text-xl text-gray-500 line-through">₹{Math.round(product.price / (1 - product.discount_percentage / 100))}</span>
                )}
                {product.discount_percentage && (
                  <Badge className="bg-green-100 text-green-800">
                    Save {product.discount_percentage}%
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium px-4">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gradient-primary hover:bg-primary/90"
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Free delivery on orders over $50</p>
                <p>• Fresh guarantee or your money back</p>
                <p>• Available for same-day delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
