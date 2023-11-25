"use client";
import useAuthStore from "@/stores/authStore";
import useCart from "@/stores/cartStore";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import UserDropdown from "./user-dropdown";

const Navbar = () => {
  const { user, logout, setUser } = useAuthStore();
  const [userIsAdmin, setuserIsAdmin] = useState(false);
  const { cartItems } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const total = useMemo(() => {
    if (cartItems?.length > 0) {
      return cartItems.map((item) => item.quantity);
    } else {
      return [];
    }
  }, [cartItems]);

  useEffect(() => {
    sumOfItems(total as number[]);
  }, [cartItems, total]);

  useEffect(() => {
    setuserIsAdmin(user?.email === "admin@foodexpress.com");
  }, [user]);

  const sumOfItems = (array: number[]) => {
    let sum = 0;

    Array.from(array).forEach((item) => {
      sum += item;
    });

    setCartCount(sum);
    return sum;
  };

  useEffect(() => {
    async function fetchAuthStatus() {
      const res = await fetch("/api/status");
      const resData = await res.json();
      setUser(resData.data);
    }
    fetchAuthStatus();
  }, []);

  return (
    <>
      <header className="relative h-[80px] bg-primary text-white">
        <div className="h-full max-w-7xl mx-auto flex justify-between items-center py-2 px-3 lg:px-7">
          <Link href="/" className="font-bold text-2xl px-3 md:px-0">
            FoodExpress
          </Link>
          <nav className="mainNav z-30 hidden md:flex absolute md:static left-0 top-14 md:top-0 items-center w-full md:w-auto justify-center bg-primary">
            <ul
              className={`flex flex-col md:flex-row text-[20px] py-5 md:py-3 justify-center  items-center gap-5 `}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              {!userIsAdmin ? (
                <>
                  <li>
                    <Link href="/order/">Order Online</Link>
                  </li>
                  <li>
                    <Link href="/book/">Book a table</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/admin">Admin</Link>
                  </li>
                  <li>
                    <Link href="/admin/items">All Items</Link>
                  </li>
                  <li>
                    <Link href="/admin/orders">All Orders</Link>
                  </li>
                  <li>
                    <Link href="/admin/bookings">All Bookings</Link>
                  </li>
                </>
              )}
              <li className="">
                <Link href="/cart">
                  <div className="bg-white text-black py-2 px-5 rounded-lg text-[17px] flex items-center">
                    Cart
                    {cartCount !== 0 ? (
                      <span className="ml-2 py-[3px] px-[9px] text-white text-sm font-bold rounded-full bg-primary">
                        {cartCount}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </li>

              <li className="ml-5">
                {user ? (
                  <UserDropdown />
                ) : (
                  <Link
                    href="/login"
                    className="px-5 py-2 bg-white text-primary rounded-md"
                  >
                    Log in
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <div
            className={`px-3 hamburger  block md:hidden mt-1 cursor-pointer`}
          >
            <span className="bar block w-[30px] h-[4px] bg-white"></span>
            <span className="bar block w-[30px] mt-1 h-[4px] bg-white"></span>
            <span className="bar block w-[30px] mt-1 h-[4px] bg-white"></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
