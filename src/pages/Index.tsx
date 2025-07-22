
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import CategorySlider from '@/components/CategorySlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import OfferZone from '@/components/OfferZone';
import WhyShopWithUs from '@/components/WhyShopWithUs';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import FloatingChatButton from '@/components/FloatingChatButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getFeaturedProducts } from '@/utils/slices/GeneralSlice';

const Index = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  const featuredProducts = useSelector((state)=>state.general.featuredProducts);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <HeroSlider />
        </section>

        {/* Categories Section */}
        <CategorySlider />

        {/* Featured Products */}
        <section className="container mx-auto px-4">
          <FeaturedProducts title="Featured" sub_title="Handpicked favorites from our collection" data={featuredProducts}/>
        </section>

        {/* Offer Zone */}
        <OfferZone />

        {/* Why Shop With Us */}
        <WhyShopWithUs />

        {/* Testimonials */}
        <TestimonialsSlider />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
