import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
const MAX_RATING = 5;
const MIN_RATING = 1;
const Product = ({ id, title, price, description, category, image }) => {
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();

  const addItenToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    //sending th product  as an   action to the redux store ... the basket
    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 ">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit={"contain"}></Image>
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500"></StarIcon>
          ))}
      </div>
      {hasPrime && <p>Has Prime del</p>}
      <p className="text-xs my-2  line-clamp-2">{description}</p>
      <div className="mb-5 ">
        <Currency quantity={price} currency="GBP"></Currency>
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 mt-5 ">
          <img className="w-12 " src="https://links.papareact.com/fdw"></img>
          <p className="text-xs  text-gray-500 ">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItenToBasket} className="mt-auto button  ">
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
