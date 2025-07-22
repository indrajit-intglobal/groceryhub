import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  console.log(cartItems);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item.price - item.price * item.discount_percentage * 0.01) *
        item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {cartItems.length} items in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border ${
                        index !== cartItems.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {item.weight + " " + item.unit}
                            </p>
                            <Badge variant="secondary" className="mt-1">
                              ₹
                              {item.price -
                                item.price * item.discount_percentage * 0.01}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium text-lg w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg gradient-text">
                              ₹
                              {(
                                (item.price -
                                  item.price *
                                    item.discount_percentage *
                                    0.01) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 gradient-text">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span className="font-medium">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            Free
                          </Badge>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Add ₹{(50 - subtotal).toFixed(2)} more for free shipping
                      </p>
                    )}
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="gradient-text">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Link to="/checkout" className="block">
                      <Button className="w-full gradient-primary text-white font-semibold py-3 text-lg hover:shadow-lg transition-all duration-300">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link to="/" className="block">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  {/* Security Badges */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>SSL Protected</span>
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

export default Cart;
