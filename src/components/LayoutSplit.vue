<template>
  <div class="split-layout">
    <div class="left-pane">
      <slot name="left"></slot>
    </div>
    <div class="right-pane">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.split-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-pane {
  width: 250px;
  min-width: 200px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  padding: 10px;
}

.right-pane {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}
</style>
