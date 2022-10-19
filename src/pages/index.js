import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products, session }) {
  // console.log( );
  return (
    <div className="bg-gray-100 h-full">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* <h1>Hey Chat</h1> */}
      {/* Header Component */}
      <Header></Header>
      <main className="max-w-screen-2xl mx-auto">
        {/*Banner */}
        <Banner></Banner>

        {/*ProductFeed */}
        <ProductFeed products={products}></ProductFeed>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = getSession(context);
  const products = await fetch("https://fakestoreapi.com/products")
    .then((res) => {
      const data = res.json();
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));

  return {
    props: {
      products,
      // session,
    },
  };
}

//https://fakestoreapi.com/products
