const Reaction = require("../entities/reaction.model");
const { ErrorHandler } = require("../helpers/error");

class ReactionDB {
  async createReaction({ personId, postId, type }) {
    try {
      // Create a new reaction entry in the database
      const reaction = await Reaction.create({
        personId,
        postId,
        type
      });
      return reaction;
    } catch (error) {
      // Throw a custom error if something goes wrong
      throw new ErrorHandler(500, "Error creating reaction", error);
    }
  }

  async getReactionsByPostId(postId) {
    try {
      const reactions = await Reaction.findAll({
        where: { postId }
      });
      return reactions;
    } catch (error) {
      throw new ErrorHandler(500, "Error retrieving reactions", error);
    }
  }

  async deleteReaction(id) {
    try {
      // Delete the reaction entry by ID
      const result = await Reaction.destroy({
        where: { id }
      });

      if (!result) {
        // If no reaction was found, throw a "not found" error
        throw new ErrorHandler(404, "Reaction not found");
      }

      return { message: "Reaction deleted successfully" };
    } catch (error) {
      // Throw a custom error if something goes wrong
      throw new ErrorHandler(500, "Error deleting reaction", error);
    }
  }

  async updateReaction({id,newType}) {
    try {

      // Find the reaction by its ID
      const reaction = await Reaction.findByPk(id);
      if (!reaction) {
        // If no reaction is found, throw a "not found" error
        throw new ErrorHandler(404, "Reaction not found");
      }

      // Update the type of the reaction
      reaction.type = newType;
      await reaction.save(); // Save the updated reaction

      return reaction;
    } catch (error) {
      // Throw a custom error if something goes wrong
      throw new ErrorHandler(500, "Error updating reaction", error);
    }
  }
  
}

module.exports = new ReactionDB();