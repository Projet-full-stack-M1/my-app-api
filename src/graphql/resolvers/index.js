
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
        me: async (_, __, { user }) => {
            if (!user) {
              throw new Error('You are not authenticated!');
            }
            return await User.findById(user.id);
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
    }
   
}

module.exports = resolvers;