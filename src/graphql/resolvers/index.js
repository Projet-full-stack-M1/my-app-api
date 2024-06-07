
const {Recipe,Ingredients,User} = require("../../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const resolvers = {
    Query: {
        getRecipes: async () => {
            try {
                const recipes = await Recipe.findAll({
                    include: [{
                        model: Ingredients,
                        through: { attributes: [] } 
                    }]
                });
                return recipes;
            } catch (error) {
                console.error('Error fetching recipes:', error);
                throw new Error('Error fetching recipes');
            }
        },
        getRecipe: async (parent, args, context, info) => {
            try {
                const recipe = await Recipe.findByPk(args.id, {
                    include: [{
                        model: Ingredients,
                        through: { attributes: [] } 
                    }]
                });
                return recipe;
            } catch (error) {
                console.error('Error fetching recipe:', error);
                throw new Error('Error fetching recipe');
            }
        },
        getRecipesByCountry: async (parent, { country }, context, info) => {
          try {
              const recipes = await Recipe.findAll({
                  where: { country },
                  include: [{
                      model: Ingredients,
                      through: { attributes: [] }
                  }]
              });
              return recipes;
          } catch (error) {
              console.error('Error fetching recipes by country:', error);
              throw new Error('Error fetching recipes by country');
          }
      },
        me: async (_, __, { user }) => {
            if (!user) {
              throw new Error('You are not authenticated!');
            }
            return await User.findById(user.id);
          },
          getWishlist: async (_, __, { user }) => {
            if (!user) {
                throw new Error('You are not authenticated!');
            }
            try {
                const wishlistItems = await Wishlist.findAll({
                    where: { user_id: user.user_id },
                    include: [Recipe]
                });
                return wishlistItems.map(item => item.Recipe);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                throw new Error('Error fetching wishlist');
            }
        },
    },
    Mutation :{
        register: async (_, { first_name, last_name, email, password }) => {
            try {
              const hashedPassword = await bcrypt.hash(password, 10);
              const user = await User.create({ first_name, last_name, email, password: hashedPassword });
              return user;
            } catch (error) {
              console.error('Error registering user:', error);
              throw new Error('Error registering user');
            }
          },
      
          login: async (_, { email, password }) => {
            try {
              const user = await User.findOne({ where: { email } });
              if (!user) {
                throw new Error('No user found with this email address.');
              }
      
              const valid = await bcrypt.compare(password, user.password);
              if (!valid) {
                throw new Error('Incorrect password.');
              }
      
              const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
              );
      
              return { token, user };
            } catch (error) {
              console.error('Error logging in user:', error);
              throw new Error('Error logging in user');
            }
          },
          addToWishlist: async (_, { recipe_id }, { user }) => {
            if (!user) {
                throw new Error('You are not authenticated!');
            }

            try {
                const wishlistItem = await Wishlist.create({
                    user_id: user.user_id,
                    recipe_id,
                });
                return wishlistItem;
            } catch (error) {
                console.error('Error adding to wishlist:', error);
                throw new Error('Error adding to wishlist');
            }
        },
        removeFromWishlist: async (_, { recipe_id }, { user }) => {
          if (!user) {
              throw new Error('You are not authenticated!');
          }

          try {
              const result = await Wishlist.destroy({
                  where: {
                      user_id: user.user_id,
                      recipe_id,
                  }
              });
              return result > 0;
          } catch (error) {
              console.error('Error removing from wishlist:', error);
              throw new Error('Error removing from wishlist');
          }
      }
    }
   
}

module.exports = resolvers;