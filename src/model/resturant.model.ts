import mongoose, { Schema, Model } from "mongoose";

interface IRestaurant {
  name: String;
  cuisine: String;
}

type TRestaurant = Model<IRestaurant>;

const restaurantSchema = new Schema<IRestaurant, TRestaurant>({
  name: String,
  cuisine: String,
});

export const Restaurants = mongoose.model("restaurant", restaurantSchema);
