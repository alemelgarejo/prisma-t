import Image from "next/image";
import { Product } from '../../interfaces/products/Product';

const ProductCard: React.FC<Product> | any = ({ product }: any) => {
  return (
    <div className="cursor-pointer py-2.5 ">
      <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={product.image}
          alt={product.name}
        ></img>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Category: {product.category}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Brand: {product.brand}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Rating: {product.rating} stars ({product.numReviews}) reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
