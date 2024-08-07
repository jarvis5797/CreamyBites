import { useEffect, useState } from "react";

const AdminItemOverview = ({item , onEdit , onClose}) => {

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const handleOpenConfirmDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted");
    handleCloseConfirmDelete();
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb"></nav>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto lg:px-8">
          <div className="flex-shrink-0 lg:w-2/3 lg:pr-8">
            <img
              src={item.image}
              alt="Model wearing plain white basic tee."
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="lg:w-1/3 lg:pl-8">
            <div className="max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h4 className="text-l font-bold tracking-tight text-gray-900 sm:text-l">
                  {item.flavour}
                </h4>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">&#8377;{item.price}</p>

                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div class="flex items-center">
                      <svg
                        class="h-5 w-5 flex-shrink-0 text-gray-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        class="h-5 w-5 flex-shrink-0 text-gray-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        class="h-5 w-5 flex-shrink-0 text-gray-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        class="h-5 w-5 flex-shrink-0 text-gray-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        class="h-5 w-5 flex-shrink-0 text-gray-200"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <p class="sr-only">4 out of 5 stars</p>
                    <a
                      href="#"
                      class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      117 reviews
                    </a>
                  </div>
                </div>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  <h6 className="text-sm font-small text-gray-900">Type: {item.type.toLowerCase()}</h6>
                </div>

                <div className="mt-2">
                  <h6 className="text-sm font-small text-gray-900">Variant: {item.variant.toLowerCase()}</h6>
                </div>

                <form>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      Weight
                    </h4>

                    <fieldset aria-label="Choose a size" class="mt-4">
                      <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none w-12 h-12">
                          <input
                            type="radio"
                            name="size-choice"
                            value="L"
                            class="sr-only"
                          />
                          <span>0.5KG</span>

                          <span
                            class="pointer-events-none absolute -inset-px rounded-md"
                            aria-hidden="true"
                          ></span>
                        </label>
                        <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none w-12 h-12">
                          <input
                            type="radio"
                            name="size-choice"
                            value="XL"
                            class="sr-only"
                          />
                          <span>1KG</span>

                          <span
                            class="pointer-events-none absolute -inset-px rounded-md"
                            aria-hidden="true"
                          ></span>
                        </label>

                        <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none w-12 h-12">
                          <input
                            type="radio"
                            name="size-choice"
                            value="2XL"
                            class="sr-only"
                          />
                          <span>2KG</span>

                          <span
                            class="pointer-events-none absolute -inset-px rounded-md"
                            aria-hidden="true"
                          ></span>
                        </label>
                        <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none w-12 h-12">
                          <input
                            type="radio"
                            name="size-choice"
                            value="3XL"
                            class="sr-only"
                          />
                          <span>3KG</span>

                          <span
                            class="pointer-events-none absolute -inset-px rounded-md"
                            aria-hidden="true"
                          ></span>
                        </label>
                      </div>
                    </fieldset>

                    <div className="mt-10 ">
                      <button
                        type="submit"
                        class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onEdit}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="mt-2 ">
                      <button
                        type="button"
                        class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleOpenConfirmDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
            <p className="mt-2 text-gray-700">Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={handleCloseConfirmDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      
    </div>
  );
};

export default AdminItemOverview;
