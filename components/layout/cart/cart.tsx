// Cart.tsx
import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import CartItem from "./cart-item";
import { useCartStore } from "stores/cart-store";

const Cart = () => {
    const { items, getTotalPrice, updateQuantity, removeItem } = useCartStore(); // Retrieve items, getTotalPrice, updateQuantity, and removeItem from the cart store

    return (
        <div className="absolute right-4 top-1">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`
                    ${open ? "text-white" : "text-white/90"}
                    group inline-flex items-center px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                        >
                            <div className="">
                                <IoCartOutline className="text-white" size={25} />
                            </div>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-1 w-screen max-w-sm -translate-x-[350px] transform ml-7">
                                <div className="flex flex-col relative shadow-lg rounded-lg bg-black border-[1px] border-white pt-4">
                                    <div className="flex flex-col">
                                        {items.length === 0 ? (
                                            <div className="text-white p-4 text-center">There are no items in your shopping cart.</div>
                                        ) : (
                                            items.map((item) => (
                                                <CartItem
                                                    key={item.id}
                                                    item={item}
                                                    updateQuantity={updateQuantity}
                                                    removeItem={removeItem}
                                                />
                                            ))
                                        )}
                                        <div className="total-price text-white p-4 text-center border-t-[1px] border-zinc-600">
                                            Total: ${getTotalPrice().toFixed(2)}
                                        </div>
                                    </div>
                                    {/* POPOVER FOOTER */}
                                    <div className="px-4 py-6 mt-4 bg-gray-100 rounded-b-lg flex justify-evenly">
                                        {/* CONTACT US BUTTON */}
                                        <Link
                                            onClick={close}
                                            className="bg-blue-600/90 px-10 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
                                            href={"/checkout"}
                                        >
                                            <h5 className="hover:text-white transition-colors duration-300 ease-in-out">Checkout</h5>
                                        </Link>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default Cart;