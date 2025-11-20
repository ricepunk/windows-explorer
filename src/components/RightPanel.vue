<script setup lang="ts">
import { useExplorer } from '../composables/useExplorer';
import type { Folder } from '../types';

const { rightPanelChildren, selectedFolder, isLoading, error, selectFolder } = useExplorer();

const handleFolderClick = (folder: Folder) => {
  selectFolder(folder);
};
</script>

<template>
  <div class="right-panel">
    <!-- <div v-if="isLoading" class="status-message">Loading children...</div> -->
    <div v-if="error" class="status-message error">{{ error }}</div>
    <div v-else-if="!selectedFolder" class="status-message">
      Select a folder to see its contents.
    </div>
    <div v-else-if="rightPanelChildren.length === 0" class="status-message">
      This folder is empty.
    </div>
    <div v-else class="folder-grid">
      <div
        v-for="folder in rightPanelChildren"
        :key="folder.id"
        class="folder-item"
        @click="handleFolderClick(folder)"
      >
        <span>&#128193;</span> <!-- Folder Icon -->
        <span class="folder-name">{{ folder.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.right-panel {
  /* The right-pane in LayoutSplit provides padding */
}

.status-message {
  color: #666;
  font-style: italic;
}

.status-message.error {
  color: red;
  font-style: normal;
}

.folder-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.folder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.folder-item:hover {
  background-color: #eee;
}

.folder-item span:first-child {
  font-size: 2rem; /* Larger folder icon */
}

.folder-name {
  margin-top: 5px;
  word-break: break-word;
}
</style>
