import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center">
        <div className="text-7xl mb-4 select-none">
          <span role="img" aria-label="Crying Face">😢</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:underline font-semibold">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
