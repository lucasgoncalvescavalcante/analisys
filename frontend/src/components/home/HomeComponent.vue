<template>
      <Header></Header><navbar></navbar>
      <div class="main-container">
    <div class="module-name">
      {{ $route.meta.moduleName }}
    </div>
    <div class="module-box mr-3">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script src="./Home.js"></script>
<style>
.main-container {
  padding: 20px;
  border-radius: 11px;
  margin-left: 220px; /* Ajuste o valor conforme necessário */
}

.module-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0px;
}

.module-box {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(3, 1, 3, 0.5);
  padding: 20px;
  height: 80vh;
  overflow-y: scroll;
}
</style>
