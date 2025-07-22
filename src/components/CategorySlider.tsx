import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { replace, useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const swiperRef = useRef(null);
  const categoryData = useSelector((state: any) => state.general.categories);

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Explore our wide range of fresh categories
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          modules={[Navigation]}
          className="category-swiper"
        >
          {categoryData?.map((category) => (
            <SwiperSlide key={category.id}>
              <div
                className="group cursor-pointer"
                onClick={() => handleNavigation(category.name)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover-scale">
                  <div className="aspect-square overflow-hidden rounded-xl mb-4">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.itemCount}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
