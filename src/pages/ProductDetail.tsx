import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeaturedProducts from "@/components/FeaturedProducts";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/utils/slices/generalSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  const flatProduct = useSelector((state) => state.general.product);
  const product = flatProduct?.[0];

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const reviews = product?.product_reviews;

  // const reviews = [
  //   {
  //     id: 1,
  //     name: "Sarah M.",
  //     rating: 5,
  //     comment: "These bananas are amazing! Super fresh and sweet.",
  //     date: "2024-01-15",
  //     verified: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Mike R.",
  //     rating: 4,
  //     comment: "Great quality organic bananas. Will definitely buy again.",
  //     date: "2024-01-10",
  //     verified: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Emily K.",
  //     rating: 5,
  //     comment: "Perfect ripeness and excellent taste. Highly recommend!",
  //     date: "2024-01-08",
  //     verified: true,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/products/${product?.category_id?.name.toLowerCase()}`}
              className="hover:text-primary"
            >
              {product?.category_id?.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product?.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={product?.image_url}
                alt={product?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* <div className="flex space-x-2 overflow-x-auto pb-2">
              {product?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge
                className={`mb-4 ${
                  product?.badge === "Organic"
                    ? "bg-green-light text-primary"
                    : product?.badge === "Fresh"
                    ? "bg-orange-light text-orange"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {product?.badge || "Fresh"}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">
                {product?.name}
              </h1>
              <p className="text-gray-600 mb-4">{product?.description}</p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product?.product_reviews?.reduce((acc, review) => acc + (review.rating || 0), 0) / (product?.product_reviews?.length || 1) || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  
                </div>
                <span className="text-gray-500">
                  ({product?.product_reviews?.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ₹{product?.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₹
                  {Math.round(
                    product?.price -
                      product?.price * product?.discount_percentage * 0.01
                  )}
                </span>
                {product?.discount_percentage && (
                  <Badge className="bg-red-500 text-white">
                    -{product?.discount_percentage}%
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-500">SKU:</span>
                  <span className="ml-2 font-medium">{product?.sku}</span>
                </div>
                <div>
                  <span className="text-gray-500">Weight:</span>
                  <span className="ml-2 font-medium">
                    {product?.weight} {product?.unit}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium">
                    {product?.category_id?.name}
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product?.in_stock ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`font-medium ${
                    product?.in_stock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product?.in_stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-medium px-4">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:bg-primary/90"
                  disabled={!product?.in_stock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <div className="flex space-x-3 sm:space-x-0 sm:space-y-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 sm:flex-none"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 sm:flex-none"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free delivery over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>100% Fresh guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span>Easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description" className="text-xs sm:text-sm">
                  Description
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="text-xs sm:text-sm">
                  Nutrition
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm">
                  Reviews ({product?.product_reviews ? product.product_reviews.length : 0})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product?.longDescription}
                  </p>
                  <h4 className="text-lg font-semibold mt-6 mb-3">
                    Key Features:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 100% Organic and naturally grown</li>
                    <li>• Rich in potassium and vitamin B6</li>
                    <li>• Perfect for snacking, smoothies, and baking</li>
                    <li>• Sustainably sourced from certified farms</li>
                    <li>• No artificial preservatives or additives</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Nutrition Facts (per 100g)
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Calories</span>
                        <span className="font-medium">
                          {product?.nutritionalInfo?.calories ?? "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <span className="font-medium">
                          {product?.nutritionalInfo?.protein ?? "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbohydrates</span>
                        <span className="font-medium">
                          {product?.nutritionalInfo?.carbs ?? "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dietary Fiber</span>
                        <span className="font-medium">
                          {product?.nutritionalInfo?.fiber ?? "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sugar</span>
                        <span className="font-medium">
                          {product?.nutritionalInfo?.sugar ?? "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Health Benefits
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Supports heart health</li>
                      <li>• Aids in digestion</li>
                      <li>• Provides natural energy</li>
                      <li>• Helps regulate blood pressure</li>
                      <li>• Supports brain function</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {review.user_id?.avatar_url && (
                              <img src={review.user_id.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
                            )}
                            <span className="font-medium">{review.user_id?.first_name || review.user_id || 'Anonymous'}</span>
                            {review.is_verified_purchase && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <span className="text-yellow-500 font-bold flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < (review.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2 text-xs">{review.comment || review.body || 'No comment provided.'}</p>
                        <span className="text-xs text-gray-400">{review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No reviews yet.</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <FeaturedProducts
          title="Related"
          sub_title="Related from our collection"
          data={[]}
        />
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default ProductDetail;
