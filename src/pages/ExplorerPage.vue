<script setup lang="ts">
import { onMounted } from 'vue';
import LayoutSplit from '../components/LayoutSplit.vue';
import ExplorerTree from '../components/ExplorerTree.vue';
import RightPanel from '../components/RightPanel.vue';
import { useExplorer } from '../composables/useExplorer';

const { fetchFullTree } = useExplorer();

onMounted(() => {
  fetchFullTree();
});
</script>

<template>
  <main>
    <LayoutSplit>
      <template #left>
        <ExplorerTree />
      </template>
      <template #right>
        <RightPanel />
      </template>
    </LayoutSplit>
  </main>
</template>

<style scoped>
main {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
}
</style>
