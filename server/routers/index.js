const express = require("express");
const router = express.Router();
const swaggerDocument = require("../docs");
const swaggerUi = require("swagger-ui-express");

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const assignmentRouter = require("./assignment.router");
const classRouter = require('./class.router')
const postRouter = require('./post.router')
const attachmentRouter = require('./attachment.router')
const reactionRouter = require('./reaction.router'); 

router.use("/reactions", reactionRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/assignments",assignmentRouter);
router.use("/attachments", attachmentRouter);
router.use("/classes",classRouter);
router.use("/posts",postRouter);


router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = router;