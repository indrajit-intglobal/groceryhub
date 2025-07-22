import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, Truck, Calendar, MapPin, CreditCard, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const orderNumber = '#ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  const cartItems = [
    { id: 1, name: 'Fresh Organic Bananas', price: 2.99, quantity: 2, image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=100&h=100&fit=crop' },
    { id: 2, name: 'Whole Milk', price: 3.49, quantity: 1, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop' },
    { id: 3, name: 'Organic Spinach', price: 4.99, quantity: 1, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop' },
    { id: 4, name: 'Premium Ribeye Steak', price: 24.99, quantity: 1, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop' }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Order Number:</span>
              <Badge className="text-lg px-3 py-1 bg-primary text-white">{orderNumber}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{orderDate}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold gradient-text">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Delivery Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Shipping Address</span>
                    </h4>
                    <div className="text-muted-foreground">
                      <p>John Doe</p>
                      <p>123 Main Street</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Estimated Delivery</span>
                    </h4>
                    <div className="text-muted-foreground">
                      <p className="font-medium text-lg">{estimatedDelivery}</p>
                      <p>Standard Shipping (5-7 business days)</p>
                      <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                        Free Shipping
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-medium">•••• •••• •••• 1234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transaction ID</span>
                    <span className="font-medium">TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="gradient-text">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Free</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Receipt
                </Button>
                <Button className="w-full" variant="outline">
                  <Truck className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
                <Separator />
                <Link to="/" className="block">
                  <Button className="w-full gradient-primary text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about your order, our customer support team is here to help.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>support@groceryhub.com</span>
                  </div>
                </div>
                <Link to="/contact" className="block">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Email Confirmation Note */}
        <div className="mt-12 text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
          <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Confirmation Email Sent</h3>
          <p className="text-muted-foreground">
            We've sent a confirmation email with your order details to your registered email address. 
            You'll also receive shipping updates as your order makes its way to you.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;