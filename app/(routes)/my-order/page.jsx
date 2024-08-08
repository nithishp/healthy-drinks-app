"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_component/MyOrderItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCookie } from "cookies-next";

const MyOrder = () => {
  const jwt = getCookie("jwt");
  const userData = getCookie("user");
  const user = JSON.parse(userData);
  console.log("jwt",jwt)
  console.log('user',user)
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }
    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    console.log("My Orders ", orderList_);
    setOrderList(orderList_);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div className="mt-10">

          {orderList.map((item, index) => (
            <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="border p-2 bg-slate-100 flex w-[100%] gap-24">
                  <h2>
                    <span className="font-bold mr-2">Order Date: </span>
                    {moment(item?.createdAt).format("DD/MMM/yyy")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount:</span>{" "}
                    {item?.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status:</span>{" "}
                    {item?.status}
                  </h2>
                </div></AccordionTrigger>
              <AccordionContent>
              {item.OrderItemList.map((order, index_) => (
                  <MyOrderItem orderItem={order} key={index_} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
            
          ))}

     
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
