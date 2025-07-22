import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/utils/slices/cartSlice";

const FeaturedProducts = (props) => {
  const swiperRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const products = props.data || [];
  const flatProducts = products.map((item) => item.id || item);
  const user_id = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2 font-playfair bg-gradient-to-r from-primary to-blue bg-clip-text text-transparent">
              {props?.title} Products
            </h2>
            <p className="text-muted-foreground">{props?.sub_title}</p>
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
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className="products-swiper"
        >
          {flatProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group bg-card border rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02]">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    {product.badge && (
                      <Badge
                        className={`${
                          product.badge === "Organic"
                            ? "bg-green-light text-primary"
                            : product.badge === "Fresh"
                            ? "bg-orange-light text-orange"
                            : "bg-gray-100 text-gray-800"
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
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      className="glass-effect text-white hover:bg-white/20 backdrop-blur-md border-white/20"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-primary text-white hover:scale-105 transition-transform"
                      onClick={() => dispatch(addToCart({ data:product, id:user_id, quantity:1}))}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-foreground mb-2 line-clamp-1 cursor-pointer hover:underline"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  {/* Optionally add rating/reviews if available */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        ₹
                        {product.price -
                          product.price * product.discount_percentage * 0.01}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default FeaturedProducts;
