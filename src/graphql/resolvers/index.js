
const Recipe = require("../../models");

const resolvers = {
    Query: {
        getRecipes: async (parent, args, context, info) => {
                try {
                    const recipes = await Recipe.findAll();
                    return recipes;
                  } catch (error) {
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