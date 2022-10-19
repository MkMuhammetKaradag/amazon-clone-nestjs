import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) => {
  const dispatch = useDispatch();
  const addItemBasket = () => {
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
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5 flex-row">
      <Image src={image} height={200} width={200} objectFit="contain"></Image>

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500"></StarIcon>
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP"></Currency>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              loading="lazy"
            ></img>
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Rigth add/remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
