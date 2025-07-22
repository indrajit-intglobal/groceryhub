
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary hover:bg-primary/90 shadow-lg z-50 floating"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-40 animate-scaleIn pb-2">
          <div className="p-4 border-b bg-gradient-primary text-white rounded-t-lg">
            <h3 className="font-semibold">Chat Support</h3>
            <p className="text-sm text-white/90">We're here to help!</p>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Hi! How can I help you today?</p>
              </div>
              <div className="bg-primary text-white p-3 rounded-lg ml-8">
                <p className="text-sm">Hello! I need help with my order.</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">I'd be happy to help you with your order. Can you please provide your order number?</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t pt-1">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg text-sm"
              />
              <Button size="sm" className="bg-primary">Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
