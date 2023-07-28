<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="header5"
      data-test='title-farol'>
      Farol de Atingimento de Eventos
    </h5>
  </div>


  <DisplayGraphics :resource="optionsFarolAntig"></DisplayGraphics>
</template>

<script setup lang="ts">
import DisplayGraphics from 'src/components/charts/DisplayGraphics.vue';
import {optionsFarolAntig} from 'src/core/data/graphicData';
</script>

<style lang="scss" scoped>

</style>
