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
    id: ID!
    name: String!
    country: String!
    photoUrl: String!
    cookingTime: String!
    ingredients: String!
    preparation: String!
    allergens: String
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