import { db } from "../db/seed";

// The repository layer is responsible for data access.
// In a real application, this file would contain database queries.

export const folderRepository = {
	findAll: async () => {
		// Simulate async operation
		await new Promise((resolve) => setTimeout(resolve, 50));
		return db.folders;
	},
	findChildrenOf: async (parentId: number) => {
		// Simulate async operation
		await new Promise((resolve) => setTimeout(resolve, 50));
		return db.folders.filter((folder) => folder.parentId === parentId);
	},
};
