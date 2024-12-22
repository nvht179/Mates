const authComponent = require("./auth");
const classComponent = require("./class");
const postComponent = require("./post");
const reactionComponent = require("./reaction");
const userComponent = require("./user");
const commentComponent = require("./comment");
const attachmentComponent = require('./attachment')
const eventComponent = require('./event')
const gradeComponent = require('./grade')

module.exports = {
  components: {
    schemas: {
      ...authComponent.schemas,
      ...classComponent.schemas,
      ...postComponent.schemas,
      ...reactionComponent.schemas,
      ...userComponent.schemas,
      ...commentComponent.schemas,
      ...eventComponent.schemas,
      ...attachmentComponent.schemas,
      ...gradeComponent.schemas
    }
  }
};
