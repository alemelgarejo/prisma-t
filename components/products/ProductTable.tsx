import { Product } from "../../interfaces/products/Product";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface Products {
  products: Product[];
}

const ProductTable: React.FC<Products> = ({ products }) => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteProduct = async (slug: string) => {
    try {
      await fetch("http://localhost:3000/api/products/" + slug, {
        method: "DELETE",
      });
      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="my-4">
        <div
          onClick={() => router.push("/products/create")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer w-36 flex justify-center"
        >
          Add product
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                In stock
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.name}
                className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {p.name}
                </th>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">{p.brand}</td>
                <td className="px-6 py-4">{p.price}€</td>
                <td className="px-6 py-4">{p.rating}</td>
                <td className="px-6 py-4">{p.countInStock}</td>
                <td className="px-6 py-4 text-right">
                  <div
                    onClick={() => router.push(`/products/${p.slug}`)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Edit
                  </div>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    onClick={openModal}
                  >
                    Delete
                  </button>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Payment successful
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Your payment has been successfully submitted.
                                  We’ve sent you an email with all of the
                                  details of your order.
                                </p>
                              </div>

                              <div className="mt-4 flex justify-between">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                  onClick={()=> {deleteProduct(p.slug)}}
                                >
                                  Delete
                                </button>
                              </div>
                              
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
