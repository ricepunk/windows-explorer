import { readonly, ref } from "vue";
import type { Folder } from "../types";

// State
const fullTree = ref<Folder[]>([]);
const selectedFolder = ref<Readonly<Folder> | null>(null);
const rightPanelChildren = ref<Folder[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Private method to fetch data
const fetchData = async <T>(url: string): Promise<T> => {
	isLoading.value = true;
	error.value = null;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (e) {
		const errorMessage =
			e instanceof Error ? e.message : "An unknown error occurred";
		error.value = errorMessage;
		console.error(errorMessage);
		throw e;
	} finally {
		isLoading.value = false;
	}
};

// Methods
const fetchFullTree = async () => {
	try {
		const tree = await fetchData<Folder[]>("/api/v1/folders");
		fullTree.value = tree;
	} catch {
		fullTree.value = [];
	}
};

const selectFolder = async (folder: Readonly<Folder>) => {
	selectedFolder.value = folder;
	try {
		const children = await fetchData<Folder[]>(`/api/v1/folders/${folder.id}`);
		rightPanelChildren.value = children;
	} catch {
		rightPanelChildren.value = [];
	}
};

export function useExplorer() {
	return {
		// State
		fullTree: readonly(fullTree),
		selectedFolder: readonly(selectedFolder),
		rightPanelChildren: readonly(rightPanelChildren),
		isLoading: readonly(isLoading),
		error: readonly(error),

		// Methods
		fetchFullTree,
		selectFolder,
	};
}
