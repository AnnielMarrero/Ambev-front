<template>
  <div v-if="loading" class="row items-center justify-center">
    <q-spinner
      :color="spinnerConfig.color"
      :size="spinnerConfig.size"
      :thickness="spinnerConfig.thickness"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
const spinnerConfig = {
  size: '5em',
  thickness: 8,
  color: 'primary'
};
</script>
