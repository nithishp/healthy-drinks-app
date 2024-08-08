import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {

  return (
    <div className="relative flex flex-col h-full">
      <div className="overflow-y-auto flex-grow max-h-[70vh]">
        {cartItemList.map((cart, index) => (
          <div key={index} className="flex justify-between items-center p-2 mb-2">
            <div className="flex gap-6 items-center">
              <Image
                src={cart.image}
                width={90}
                height={90}
                alt={cart.name}
                className="border p-2"
              />
              <div>
                <h2 className="font-semibold">{cart.name}</h2>
                <h2>Quantity: {cart.quantity}</h2>
                <h2 className="text-lg">₹ {cart.amount}</h2>
              </div>
            </div>
            <Trash2Icon className="cursor-pointer" onClick={() => onDeleteItem(cart.id)} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CartItemList;
