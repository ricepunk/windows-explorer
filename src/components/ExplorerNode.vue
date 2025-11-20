<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Folder } from '../types';
import { useExplorer } from '../composables/useExplorer';
// Since this component is recursive, we need to import it explicitly.
// In Vue 3, components are auto-imported, but this is a special case.
import ExplorerNode from './ExplorerNode.vue';

const props = defineProps<{
  folder: Folder;
}>();

const { selectedFolder, selectFolder } = useExplorer();

const isOpen = ref(false);

const hasChildren = props.folder.children && props.folder.children.length > 0;

const toggle = () => {
  if (hasChildren) {
    isOpen.value = !isOpen.value;
  }
};

const onFolderClick = () => {
  selectFolder(props.folder);
};

const isSelected = ref(false);
watch(selectedFolder, (newSelection) => {
  isSelected.value = newSelection?.id === props.folder.id;
});
</script>

<template>
  <div class="node-container">
    <div
      class="node-item"
      @click="onFolderClick"
      :class="{ selected: isSelected }"
    >
      <span @click.stop="toggle" class="toggle-icon" :class="{ 'has-children': hasChildren }">
        {{ isOpen ? '&#9660;' : '&#9654;' }}
      </span>
      <span>{{ folder.name }}</span>
    </div>
    <div v-if="isOpen && hasChildren" class="children-nodes">
      <ExplorerNode
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
      />
    </div>
  </div>
</template>

<style scoped>
.node-container {
  margin-left: 20px;
}

.node-item {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.node-item:hover {
  background-color: #eee;
}

.node-item.selected {
  background-color: #0078d4;
  color: white;
}

.toggle-icon {
  margin-right: 8px;
  width: 12px;
  display: inline-block;
  text-align: center;
  color: #666; /* Default color for icon */
}

.node-item.selected .toggle-icon {
  color: white; /* Icon color when selected */
}


.toggle-icon:not(.has-children) {
  visibility: hidden; /* Hide icon if no children */
}

.children-nodes {
  border-left: 1px solid #ddd;
  padding-left: 0; /* Let the child node's margin handle indentation */
}
</style>
