"use client";
//error handling added

import { Button } from "@/components/ui/button";
import { CircleUserRound, CupSoda, Search, ShoppingBag } from "lucide-react";
import logo from "../assets/img/logowithtext.png";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  const isLogin = getCookie("jwt") ? true : false;
  const user = JSON.parse(getCookie("user") || "{}");
  const jwt = getCookie("jwt");
  const { updateCart } = useContext(UpdateCartContext);
  const router = useRouter();

  
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategories()
      .then((resp) => {
       
        setCategoryList(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again later.");
      });
  };

  const getCartItems = async () => {
    try {
      if (!user || !jwt) {
        throw new Error("User or JWT is not available.");
      }

      const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
      

      if (Array.isArray(cartItemList_)) {
        setCartItemList([...cartItemList_]);
        setTotalCartItem(cartItemList_.length);
      } else {
        throw new Error("Cart items data is not in expected array format.");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items. Please try again later.");
      setCartItemList([]);
    }
  };

  const onSignOut = () => {
    try {
      deleteCookie("jwt");
      deleteCookie("user");
      router.push("/sign-in");
      toast.success("Signed out successfully.");
    } catch (error) {
      console.error("Error during sign out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt)
      .then(() => {
        toast.success("Item Removed!");
        getCartItems();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast.error("Failed to remove item. Please try again.");
      });
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      const amount = parseFloat(element.amount);
      if (!isNaN(amount)) {
        total += amount;
      } else {
        console.warn(`Invalid amount for item ${element.name}:`, element.amount);
      }
    });
    setSubTotal(total);
  }, [cartItemList]);

  return (
    <div className="px-5 pt-6 pb-6 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <div>
          <Link href={"/"}>
            <Image
              src={logo}
              alt="logo"
              width={150}
              height={100}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200">
              <CupSoda className="h-5 w-5" /> Categories
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="cursor-pointer">
              Browse Categories
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.length > 0 ? (
              categoryList.map((category, index) => {
                const iconUrl =
                  category?.attributes?.icon?.data[0]?.attributes?.url;
                return (
                  <Link
                    key={index}
                    href={"/products-category/" + category.attributes.name}
                  >
                    <DropdownMenuItem className="flex items-center cursor-pointer gap-4">
                      <Image src={iconUrl} alt="icon" width={23} height={23} />
                      <h2 className="ml-1">{category?.attributes?.name}</h2>
                    </DropdownMenuItem>
                  </Link>
                );
              })
            ) : (
              <DropdownMenuItem>
                <h2>No categories available</h2>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center hidden rounded-full border-[3px] p-2">
          <Search />
          <input type="text" className="outline-none" placeholder="search" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBag />
              <span className=" bg-primary text-white  px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-semibold text-lg p-2">
                My cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="flex-shrink-0 w-full bottom-6 flex flex-col mt-4">
                <h2 className="text-lg font-semibold flex justify-between">
                  Subtotal <span>₹{subtotal.toFixed(2)}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="text-primary cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
