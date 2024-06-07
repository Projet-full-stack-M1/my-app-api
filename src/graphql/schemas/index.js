const typeDefs = `
type User {
    user_id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    wishlist: [Recipe]
    
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  
  type Recipe {
    recipe_id: ID!
    name: String!
    country: String!
    photo_url: String!
    cooking_time: String!
    preparation: String!
    ingredients: [Ingredients]
  }

  type Ingredients {
    ingredient_id: ID!
    name: String!
  }
  
  type Wishlist {
    id: ID!
    user_id: User!
    recipe_id: [Recipe!]!
  }
  type Query{
    getRecipes: [Recipe]!
    getRecipe(id: ID!): Recipe
    me: User
    getRecipesByCountry(country: String!): [Recipe]!
    getWishlist: [Recipe]!
  }
  type Mutation {
    register(first_name: String!,last_name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
    addToWishlist(recipe_id: ID!): Wishlist
    removeFromWishlist(recipe_id: ID!): Boolean
  }
  
  `;


module.exports = typeDefs;