<template>
  <div class="header-index row items-center justify-evenly">
    <h5 class="header5">Detalhes do Eventos</h5>
  </div>
  <br />

  <spinner-cmp :loading="loading"></spinner-cmp>
  <div v-if="!loading">
    <div class="row">
      <div class="q-ml-xl column items-start offset-3">
        <div class="text-h6 q-mb-xs">Unidade</div>
        <p id="unitId">{{ event?.unit }}</p>
      </div>
    </div>
    <div class="row">
      <div class="q-ml-xl column items-start offset-3">
        <div class="text-h6 q-mb-xs">Marca</div>
        <p>{{ event?.brand }}</p>
      </div>
    </div>
    <div class="row">
      <div class="q-ml-xl column items-start offset-3">
        <div class="text-h6 q-mb-xs">Nome do Evento</div>
        <p>{{ event?.name }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-4 offset-3 text-h6">Data início: {{ event?.startDate }}</div>
      <div class="col-4 text-h6">Data fim: {{ event?.endDate }}</div>
    </div>

    <div class="row">
      <div class="col-4 offset-3 text-h6">Horário início: {{ event?.startTime }}</div>
      <div class="col-4 text-h6">Horário fim: {{ event?.endTime }}</div>
    </div>

    <div class="row">
      <div class="q-ml-xl row items-start offset-3">
        <p>Estado: {{ event?.state }}</p>
        <p style="margin-left: 150px">Cidade: {{ event?.city }}</p>
        <p style="margin-left: 150px">CEP: {{ event?.cep }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-6 offset-3">
        <!-- <div class="col-4"><p>Endereço: {{ event?.adress }}</p></div> -->

        <q-expansion-item
          expand-separator
          icon="pin_drop"
          header-class="text-orange"
          label="Endereço:"
          :caption="event?.adress"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.571493761993!2d-46.68115388558403!3d-23.61969606963295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a2bfd0d0bf%3A0xbf5928fdcfe948c6!2sR.%20Bar%C3%A3o%20do%20Triunfo%20-%20Brooklin%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1572354768921!5m2!1spt-BR!2sbr"
            width="100%"
            height="450"
            frameborder="0"
            style="border: 0"
            allowfullscreen=""
          ></iframe>
        </q-expansion-item>
      </div>
    </div>
    <div class="row">
      <p class="col-4 offset-3">Público Estimado: {{ event?.estimatedAudience }}</p>
      <p class="col-4">Investimento: $R {{ event?.invest }}</p>
    </div>

    <div class="row">
      <p class="col-4 offset-3">Nome Produtor: {{ applyDefault(event?.producerName) }}</p>
      <p class="col-4">Tel. Produtor: {{ applyDefault(event?.producerPhone) }}</p>
    </div>

    <div class="row">
      <p class="col-4 offset-3">E-mail do produtor: {{ applyDefault(event?.producerEmail) }}</p>
      <p class="col-4" id="naming">Naming ou Proprietário?: {{ event?.carriedOutBy }}</p>
    </div>

    <div class="row">
      <div class="text-h6 col-4 offset-3">Contratação com o Poder Público?*</div>
      <div class="col-1">
        <q-toggle v-model="event.contractedGovernment" disable />
      </div>
      <div class="col">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ contratPoderPublico }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>

    <div class="row">
      <div class="text-h6 col-4 offset-3">Evento realizado em espaço público?</div>
      <div class="col-1">
        <q-toggle v-model="event.madePublicSpace" disable />
      </div>
      <div class="col">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ espacioPublico }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>

    <div class="row">
      <div class="text-h6 col-4 offset-3">Eventos com menores de idade?</div>
      <div class="col-1">
        <q-toggle v-model="event.madewithMinors" disable />
      </div>
      <div class="col">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ menorIdade }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="row">
      <div class="text-h6 col-4 offset-3">Ativação de risco?</div>
      <div class="col-1">
        <q-toggle v-model="event.riskActivation" disable />
      </div>
      <div class="col">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ actRisco }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="row">
      <div class="text-h6 col-4 offset-3">Ativação de marca em estrutura montada?</div>
      <div class="col-1">
        <q-toggle v-model="event.brandActivation" disable />
      </div>
      <div class="col">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ actRisco }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="row">
      <div class="text-h6 col-4 offset-3">Universitário Open Bar?</div>
      <div class="col-1">
        <q-toggle v-model="event.universityOpenBar" disable />
      </div>
      <div class="col">
        <q-icon size="xs" name="help" color="negative">
          <q-tooltip anchor="center right" self="top right">
            {{ universitario }}
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <br />
    <div class="row items-center justify-center">
      <q-btn
        no-caps
        color="primary"
        icon="arrow_back"
        label="Voltar"
        unelevated
        rounded
        :to="{ name: 'all-events' }"
      />
    </div>
    <br />
  </div>
</template>

<script setup lang="ts">
import Event from 'src/core/data/event';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  actRisco,
  contratPoderPublico,
  espacioPublico,
  menorIdade,
  universitario,
} from 'src/core/data/text';
import ApiService from 'src/services/ApiService';
import { handleError, applyDefault, delay } from 'src/services/util';
import SpinnerCmp from 'src/components/SpinnerCmp.vue';

//variables
const loading = ref<boolean>(false);
const route = useRoute();

const event = ref<Event>({
  contractedGovernment: false,
  madePublicSpace: false,
  madewithMinors: false,
  riskActivation: false,
  brandActivation: false,
  universityOpenBar: false,
} as Event);

//functions
const getEvent = async () => {
  loading.value = true;
  try {
    //await delay(1000);
    const resp = await ApiService.get(`/api/Event/GetById/${route.params.id}`);
    event.value = resp.data.result;
  } catch (err: unknown) {
    handleError('Falha ao carregar evento', err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getEvent();
});
</script>

<style lang="scss" scoped>
.text-h6 {
  color: $primary;
}

p {
  color: $grey-7;
  font-size: 16px;
  font-weight: bold;
}
</style>

