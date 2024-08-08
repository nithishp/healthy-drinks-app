import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 sm:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg cursor-pointer">
      <Image
        src={product.attributes.images.data[0].attributes.url}
        width={500}
        height={200}
        alt={product.attributes.name}
        className="h-[100px] w-[200px] object-contain"
      />
      <h2 className=" text-lg font-semibold">{product.attributes.name}</h2>
      <div className="flex gap-3">
        {product.attributes.sellingPrice && (
          <h2 className="">₹{product.attributes.sellingPrice}</h2>
        )}
        <h2
          className={`${
            product.attributes.sellingPrice && "line-through text-gray-500 "
          }`}
        >
          ₹{product.attributes.mrp}
        </h2>
      </div>
      <Dialog>
        <DialogTrigger >
          {" "}
   
            
        <div className="text-primary hover:text-white px-6 py-3 rounded-lg border-[3px] border-green-950 hover:bg-primary" >
        Add to Cart
        </div>
        </DialogTrigger >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Cart Now !!</DialogTitle>
            <DialogDescription>
             <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
