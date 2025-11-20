import type { Folder } from "../../types";
import { folderRepository } from "../repositories/folderRepository";

const buildTree = (folders: Omit<Folder, "children">[]): Folder[] => {
	const folderMap = new Map<number, Folder>();
	const rootFolders: Folder[] = [];

	// First pass: create a map of all folders
	folders.forEach((folder) => {
		folderMap.set(folder.id, { ...folder, children: [] });
	});

	// Second pass: build the tree
	folders.forEach((folder) => {
		if (folder.parentId !== null) {
			const parent = folderMap.get(folder.parentId);
			const child = folderMap.get(folder.id);
			if (parent && child) {
				parent.children?.push(child);
			}
		} else {
			const rootFolder = folderMap.get(folder.id);
			if (rootFolder) {
				rootFolders.push(rootFolder);
			}
		}
	});

	return rootFolders;
};

export const folderService = {
	getFullTree: async () => {
		const allFolders = await folderRepository.findAll();
		return buildTree(allFolders);
	},
	getFolderChildren: async (id: number) => {
		return folderRepository.findChildrenOf(id);
	},
};
