import type { Folder } from "../../types";

// Using an in-memory store instead of a database for this example.
// In a real application, you would use a database like PostgreSQL or MySQL
// with a client like Prisma or Drizzle.

const folders: Omit<Folder, "children">[] = [
	// Root Folders
	{ id: 1, name: "Documents", parentId: null },
	{ id: 2, name: "Pictures", parentId: null },
	{ id: 3, name: "Music", parentId: null },
	{ id: 4, name: "Downloads", parentId: null },

	// Documents Subfolders
	{ id: 5, name: "Work", parentId: 1 },
	{ id: 6, name: "Personal", parentId: 1 },

	// Work Sub-subfolders
	{ id: 7, name: "Projects", parentId: 5 },
	{ id: 8, name: "Reports", parentId: 5 },

	// Projects Sub-sub-subfolders
	{ id: 9, name: "Project Alpha", parentId: 7 },
	{ id: 10, name: "Project Beta", parentId: 7 },

	// Pictures Subfolders
	{ id: 11, name: "Vacations", parentId: 2 },
	{ id: 12, name: "Family", parentId: 2 },

	// Vacations Sub-subfolders
	{ id: 13, name: "Bali Trip 2025", parentId: 11 },

	// Empty folder
	{ id: 14, name: "Empty Folder", parentId: null },
];

// In-memory database
export const db = {
	folders,
};
