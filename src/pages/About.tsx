import { CheckCircle, Users, Clock, Award, Truck, Shield, Leaf, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Clock, value: '24/7', label: 'Customer Support' },
    { icon: Award, value: '99.5%', label: 'Satisfaction Rate' },
    { icon: Truck, value: '1M+', label: 'Deliveries Made' }
  ];

  const features = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'We source the freshest organic produce directly from local farms to ensure quality and nutrition.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your groceries delivered within 2 hours with our express delivery service.'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Not satisfied with your order? We offer a 100% money-back guarantee on all products.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to serve you better.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-modern py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              About GroceryHub
            </h1>
            <p className="text-xl mb-8 opacity-90">
              We're passionate about bringing fresh, quality groceries to your doorstep. 
              Since 2020, we've been serving communities with the best products and exceptional service.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 font-playfair">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  GroceryHub was founded with a simple mission: to make fresh, quality groceries accessible to everyone. 
                  What started as a small local store has grown into a trusted online platform serving thousands of families.
                </p>
                <p className="text-gray-600 mb-6">
                  We believe in sustainable farming, supporting local communities, and providing exceptional customer service. 
                  Every product we offer is carefully selected and quality-tested to ensure you get the best.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">Locally sourced products</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">Eco-friendly packaging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-gray-700">Fair trade practices</span>
                  </li>
                </ul>
              </div>
              <div className="relative order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=600&fit=crop"
                  alt="Our team"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience through our core values and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-4 lg:p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team works tirelessly to bring you the best grocery shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b588?w=300&h=300&fit=crop' },
              { name: 'Michael Chen', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
              { name: 'Emily Rodriguez', role: 'Customer Experience', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' }
            ].map((member, index) => (
              <Card key={index} className="text-center p-4 lg:p-6">
                <CardContent className="p-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm sm:text-base text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;