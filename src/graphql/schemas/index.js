const typeDefs = `
type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    wishlist: [Recipe]
  }
  
  type Recipe {
    recipe_id: ID!
    name: String!
    country: String!
    photo_url: String!
    cooking_time: String!
    preparation: String!
  }
  
  type Wishlist {
    id: ID!
    user: User!
    recipes: [Recipe!]!
  }
  type Query{
    getRecipes: [Recipe]!
    getRecipe(id: ID!): Recipe
  }`;


module.exports = typeDefs;