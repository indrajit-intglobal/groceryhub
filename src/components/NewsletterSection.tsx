
import { Mail, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSection = () => {
  return (
    <div className="py-12 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2 font-playfair">Stay in the Loop</h2>
          <p className="text-white/90 mb-8">
            Subscribe to our newsletter and get exclusive deals, fresh updates, and weekly offers
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button 
              className="bg-orange hover:bg-orange/90 text-white px-8"
              size="lg"
            >
              Subscribe
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Gift className="h-4 w-4" />
            <span className="text-sm">Get 10% off on your first order when you subscribe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
