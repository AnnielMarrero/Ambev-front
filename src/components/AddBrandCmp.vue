

<template>
  <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">Cadastrar Marca</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="brandName" autofocus @keyup.enter="addBrand" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cadastrar" icon="check" color="positive" @click="addBrand" :disable="brandName.length === 0"/>
          <q-btn flat label="Cancelar" icon="close" color="negative" @click="handleCancelar" />

        </q-card-actions>
      </q-card>
    </q-dialog>
</template>


<script setup lang="ts">
import ApiService from 'src/services/ApiService';
import { handleError } from 'src/services/util';
import { ref, toRef } from 'vue';

const props = defineProps({
  prompt: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'addBrandEmit', id: number): void;
}>();

const prompt = toRef(props, 'prompt');
const brandName = ref<string>('');
const addBrand = async() => {
  let respId = -1;
  try {
    const resp = await ApiService.post('/api/Brand/Add', {
      name: brandName.value,
      id: 0,
    });
    respId = resp.data.result.id;

  } catch (err: unknown) {
    handleError('Falha ao adicionar nova marca', err);
    //console.log('pase' , respId);
  } finally {
    brandName.value = '';
    emit('addBrandEmit', respId);
    return respId; //for test
  }
};

const handleCancelar = () => {
  brandName.value = '';
  emit('addBrandEmit', 0);
}
</script>
