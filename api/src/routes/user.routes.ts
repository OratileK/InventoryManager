import { Hono } from "hono"
import { createUserController, loginUserController } from "../controllers/user.controller";
import { validateUserSchemaMiddleware } from "../middlewares/user.middleware";

const userRoutes = new Hono()

//middleware validation then user controller executes
userRoutes.post('/create', validateUserSchemaMiddleware, createUserController);
userRoutes.post('/login', validateUserSchemaMiddleware, loginUserController)



export default userRoutes;