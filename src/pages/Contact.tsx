import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Main Street, City, State 12345',
      color: 'bg-gradient-primary'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      color: 'bg-gradient-orange'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'support@groceryhub.com',
      color: 'bg-gradient-blue'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Sat: 8AM-10PM, Sun: 9AM-8PM',
      color: 'bg-gradient-purple'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-modern py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Get in Touch
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-4 lg:p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <Card className="p-6 lg:p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Your first name"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Your last name"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input 
                      type="text" 
                      placeholder="How can we help you?"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..."
                      className="w-full min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <Card className="p-6 lg:p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair">
                    Visit Our Store
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Come visit our flagship store and experience our fresh products firsthand. 
                      Our knowledgeable staff is always ready to help you find what you need.
                    </p>
                    <div className="bg-gray-200 rounded-lg h-48 sm:h-64 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Interactive Map</p>
                        <p className="text-sm text-gray-400">Map integration would go here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 lg:p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What are your delivery hours?</h4>
                      <p className="text-gray-600 text-sm">We deliver Monday through Sunday, 8AM to 10PM.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Do you offer same-day delivery?</h4>
                      <p className="text-gray-600 text-sm">Yes, we offer same-day delivery for orders placed before 2PM.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What's your return policy?</h4>
                      <p className="text-gray-600 text-sm">We offer a 100% satisfaction guarantee. Not happy? We'll make it right.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;