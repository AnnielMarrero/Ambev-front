<template>
  <div v-if="!data" class="row items-center justify-center">
    <q-btn color="warning" label="Não há dados" />
  </div>
  <br />
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Boolean,
    required: true,
  },
});
</script>
