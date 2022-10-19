import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import Header from "../components/Header";
import moment from "moment";
import Order from "../components/Order";

const Orders = ({ orders }) => {
  const { data: session } = useSession();
  //   console.log(orders);
  return (
    <div>
      <Header></Header>
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              ammountShipping={order.ammountShipping}
              images={order.images}
              timestamp={order.timestamp}
              items={order.items}
            ></Order>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //get the users logged in   credentials....
  const session = await getSession(context);

  console.log(session);
  if (!session) {
    return {
      props: {},
    };
  }

  //firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  //Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      ammountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
