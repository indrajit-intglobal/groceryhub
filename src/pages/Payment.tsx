import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const cartItems = [
    { id: 1, name: 'Fresh Organic Bananas', price: 2.99, quantity: 2 },
    { id: 2, name: 'Whole Milk', price: 3.49, quantity: 1 },
    { id: 3, name: 'Organic Spinach', price: 4.99, quantity: 1 },
    { id: 4, name: 'Premium Ribeye Steak', price: 24.99, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      navigate('/order-confirmation');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/checkout" className="flex items-center text-muted-foreground hover:text-primary transition-colors mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Checkout
          </Link>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Payment</h1>
            <p className="text-muted-foreground">Secure payment processing</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">Cart</span>
            </div>
            <div className="flex-1 h-px bg-green-500"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">Checkout</span>
            </div>
            <div className="flex-1 h-px bg-primary"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="text-sm font-medium text-primary">Payment</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-sm">4</span>
              </div>
              <span className="text-sm text-muted-foreground">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Secure Payment</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 ml-auto">
                    SSL Encrypted
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your payment information is encrypted and secure
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {processing && (
                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="font-medium">Processing your payment...</span>
                    </div>
                    <Progress value={66} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Please do not refresh or close this page
                    </p>
                  </div>
                )}

                {/* Payment Methods */}
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} disabled={processing}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-medium">Credit/Debit Card</span>
                          <div className="ml-auto flex space-x-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                          </div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                          </div>
                          <span className="font-medium">PayPal</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-primary/5 transition-colors">
                      <RadioGroupItem value="apple" id="apple" />
                      <Label htmlFor="apple" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                            <span className="text-white text-xs">🍎</span>
                          </div>
                          <span className="font-medium">Apple Pay</span>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lock className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Encrypted Payment Details</span>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456"
                        disabled={processing}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          disabled={processing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          disabled={processing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="John Doe"
                        disabled={processing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Billing Address</h3>
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-sm">
                      <p className="font-medium">John Doe</p>
                      <p>123 Main Street</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                    <Button variant="outline" size="sm" disabled={processing}>
                      Edit Address
                    </Button>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="pt-6">
                  <Button 
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full gradient-primary text-white font-semibold py-4 text-lg hover:shadow-lg transition-all duration-300"
                  >
                    {processing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      `Complete Payment - $${total.toFixed(2)}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="gradient-text">Final Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1 truncate">{item.name} × {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
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
                      <span>Total</span>
                      <span className="gradient-text">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="pt-6 space-y-3">
                    <h4 className="font-medium text-sm">Security Features</h4>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span>256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-3 w-3 text-green-500" />
                        <span>PCI DSS compliant</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Fraud protection</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;