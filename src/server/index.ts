import { Elysia } from "elysia";
import { folderRoutes } from "./routes/folders";

const app = new Elysia().use(folderRoutes).listen(3000);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
