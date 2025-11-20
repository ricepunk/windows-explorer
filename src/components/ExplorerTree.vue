<script setup lang="ts">
import { useExplorer } from '../composables/useExplorer';
import ExplorerNode from './ExplorerNode.vue';

const { fullTree, isLoading, error } = useExplorer();
</script>

<template>
  <div class="explorer-tree">
    <!-- <div v-if="isLoading">Loading...</div> -->
    <div v-if="error" class="error-message">Error: {{ error }}</div>
    <div v-else-if="fullTree.length > 0">
      <ExplorerNode
        v-for="folder in fullTree"
        :key="folder.id"
        :folder="folder" 
      />
    </div>
    <div v-else>No folders found.</div>
  </div>
</template>

<style scoped>
.explorer-tree {
  /* The left-pane in LayoutSplit provides padding */
}

.error-message {
  color: red;
}
</style>
