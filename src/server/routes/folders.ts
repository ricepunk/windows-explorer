import { Elysia } from "elysia";
import { folderService } from "../services/folderService";

export const folderRoutes = new Elysia({ prefix: "/api/v1/folders" })
	.get("/", async () => {
		return await folderService.getFullTree();
	})
	.get("/:id", async ({ params }) => {
		const id = parseInt(params.id, 10);
		if (Number.isNaN(id)) {
			return new Response("Invalid ID", { status: 400 });
		}
		return await folderService.getFolderChildren(id);
	});
