import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Restaurants } from "./model/resturant.model";

import mongoose, { Model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .then((err) => console.error("Could not connect to Mongodb", err));

interface IRestaurant {
  name: String;
  cuisine: String;
}

type TRestaurant = Model<IRestaurant>;

const RestaurantSchema = new Schema<IRestaurant, TRestaurant>({
  name: String,
  cuisine: String,
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "CIty of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql
   type Book {
    title: String,
    author: String,
}

type Restaurant {
    name: String,
    cuisine: String,
}

type Query {
    books: [Book]
    restaurants: [Restaurant]
}

`;

const resolvers = {
  Query: {
    books() {
      return books;
    },
    async restaurants() {
      return await Restaurant.find();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Server ready at ${url}`);
