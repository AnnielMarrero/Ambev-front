<!-- index Page  -->
<template>
  <div class="header-index">
    <div class="q-pa-md row items-center justify-center q-gutter-xl">
      <q-card class="my-card">
        <q-card-section class="column items-center">
          <q-icon name="calendar_month" color="primary" size="3.0em" />
          <q-card-actions>
            <q-btn no-caps flat :to="{name: 'add-event'}" class="btnLink"
              >Cadastrar Evento</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="column items-center">
          <q-icon name="notifications" color="primary" size="3.0em" />
          <q-card-actions>
            <q-btn no-caps flat :to="{name: 'all-events'}" class="btnLink"
              >Lista de eventos</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section class="column items-center">
          <q-icon name="description" color="primary" size="3.0em" />
          <q-card-actions>
            <q-btn no-caps flat :to="{name: 'rel-audit'}" class="btnLink"
              >Relatório de Auditoria</q-btn
            >
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <h5 id="farolText">
    Farol de Atingimento de Eventos
  </h5>
  <DisplayGraphics :resource="optionsFarolAntig"></DisplayGraphics>
</template>

<script setup lang="ts">
import DisplayGraphics from 'src/components/charts/DisplayGraphics.vue';
import {optionsFarolAntig} from 'src/core/data/graphicData';
import { useRouter } from 'vue-router';

const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testRoutercadastro = () => router.push({name: 'add-event'});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testRouterListEvt = () => router.push({name: 'all-events'});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testRouterRel = () => router.push({name: 'rel-audit'});
</script>

<style lang="scss" scoped>

.my-card {
  width: 100%;
  height: 172px;
  max-width: 290px;
}

.btnLink {
  margin-top: 20px;
  font-size: 20px;
  color: $primary;
}

#farolText {
  font-weight: bold;
  color: $primary;
  text-align: center;
}

</style>

