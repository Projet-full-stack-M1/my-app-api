
const {Recipe} = require("../../models");

const resolvers = {
    Query: {
        getRecipes: async () => {
                try {
                    const recipes = await Recipe.findAll();
                    return recipes;
                  } catch (error) {
                    console.error('Error fetching recipes:', error);
                    throw new Error('Error fetching recipes');
                  }
           
        },
        getRecipe: (parent, args, context, info) => {
            const recipe = Recipe.findByPk(args.id);
            return recipe;
        },
    },
   
}

module.exports = resolvers;