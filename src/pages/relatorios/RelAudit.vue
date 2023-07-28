<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="header5"
    >
      Relatório de Auditoria
    </h5>
  </div>

  <div v-if="!loading" class="row">
    <div class="col-4 offset-4">
      <q-select
        v-model="filterMod"
        :options="filters"
        label="Selecione um filtro*"
        @update:model-value="changeFilter"
        ref="filterSel"
      />
      <!-- :rules="[(val) => !!val || 'O campo é obrigatório.']" -->
    </div>
  </div>
  <div
    v-show="filterMod && filterMod.value === sPeriodo"
    class="row"
  >
    <div class="col-4 offset-4">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-input v-model="startDate" label="Data e hora do Início do Evento*">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="startDate"
                    mask="DD-MM-YYYY HH:mm"
                    :locale="ptLocale"
                    @update:model-value="changeStartDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        no-caps
                        v-close-popup
                        label="Fechar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="startDate" mask="DD-MM-YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn
                        no-caps
                        v-close-popup
                        label="Fechar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-6">
          <q-input v-model="endDate" label="Data e hora do Fim do Evento*">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="endDate"
                    mask="DD-MM-YYYY HH:mm"
                    :locale="ptLocale"
                    @update:model-value="changeEndDate"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        no-caps
                        v-close-popup
                        label="Fechar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="endDate"
                    mask="DD-MM-YYYY HH:mm"
                    format24h
                    :rules="[(val) => !!val || 'O campo é obrigatório.']"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        no-caps
                        v-close-popup
                        label="Fechar"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="filterMod && filterMod.value === sBrand"
    class="row"
  >
    <div class="col-4 offset-4">
      <q-select
        v-model="brandMod"
        :options="brands"
        label="Selecione uma Marca*"
        @update:model-value="changeBrand"
      />
    </div>
  </div>
  <div
    v-show="filterMod && filterMod.value === sRegion"
    class="row"
  >
    <div class="col-4 offset-4">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-select
            v-model="regionMod"
            :options="regions"
            label="Selecione uma região*"
            @update:model-value="getStatesByRegion"
            ref="stateSel"
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="stateMod"
            :options="states"
            label="Selecione um estado*"
            :disable="!regionMod"
            @update:model-value="getCitiesByState"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="filterMod && filterMod.value === sRegion"
    class="row"
  >

    <div class="col-4 offset-4">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-select
            v-model="cityMod"
            :options="cities"
            label="Selecione um município*"
            :disable="!stateMod"
            @update:model-value="doRegionalFilter"
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="unitMod"
            :options="units"
            label="Selecione uma Unidade*"
            @update:model-value="doRegionalFilter"
          />
        </div>
      </div>
    </div>
  </div>
  <br />
  <spinner-cmp :loading="loading"></spinner-cmp>

  <DisplayGraphics
    v-if="filterMod && filterMod.value <= 2"
    :key="componentKey"
    :oneColumn="true"
    :resource="graphicsConfig"
  ></DisplayGraphics>

  <DisplayGraphics
    v-if="filterMod && filterMod.value > 2 && showRegionalFlag"
    :key="componentKey"
    :resource="graphicsConfig"
  ></DisplayGraphics>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DropDownService from 'src/services/DropDownService';
import { Select } from 'src/core/data/dropdown';
import { FilterGrafico, GraficoRelatorio } from 'src/core/data/graphicData';
import { delay, handleError } from 'src/services/util';
import DisplayGraphics from 'src/components/charts/DisplayGraphics.vue';
import SpinnerCmp from 'src/components/SpinnerCmp.vue';

//variables
const loading = ref<boolean>(false);
const sBrand = ref<number>(4);
const sPeriodo = ref<number>(3);
const sRegion = ref<number>(6);

const filters = ref<Select[]>();
const filterMod = ref<Select>();

const startDate = ref('');
const endDate = ref('');
const brands = ref<Select[]>();
const brandMod = ref<Select>();

const regions = ref<Select[]>();
const regionMod = ref<Select>();

const states = ref<Select[]>();
const stateMod = ref<Select>();

const cities = ref<Select[]>();
const cityMod = ref<Select>();

const units = ref<Select[]>();
const unitMod = ref<Select>();

const colors = ['#21BA45', '#C10015', '#F2C037'];
const captions = ['Aprovado', 'Reprovado', 'Expirados'];

const showRegionalFlag = ref<boolean>(true);

const data = ref<FilterGrafico>({
  filter: 0,
  unit: 0,
  state: 0,
  city: '',
  startDate: '',
  endDate: '',
  brandId: 0,
});

const graphicsConfig = ref<GraficoRelatorio>({
  data: data.value,
  color: '#21BA45',
  caption: 'Aprovado',
  endpoint: '/api/Event/GetEventsInfo',
});
const componentKey = ref(0); //for update DisplayGraphics component

//functions
const getFilters = async () => {
  loading.value = true;
  try {
    //await delay(1500);
    filters.value = await DropDownService.getFilters();
    // console.log(filterMod.value);
  } catch (err: unknown) {
    handleError('Falha ao carregar filtros', err);
  } finally {
    loading.value = false;
  }
}

const getUnits = async () => {
  try {
    units.value = await DropDownService.getUnits();
  } catch (err: unknown) {
    handleError('Falha ao carregar unidades', err);
  }
};

const getBrands = async () => {
  try {
    brands.value = await DropDownService.getBrands();
  } catch (err: unknown) {
    handleError('Falha ao carregar marcas', err);
  }
};


const getRegions = async () => {
  try {
    regions.value = await DropDownService.getRegions();
  } catch (err: unknown) {
    handleError('Falha ao carregar regiões', err);
  }
}

const getStatesByRegion = async (val: Select) => {
  loading.value = true;
  try {
    //await delay(1500);
    states.value = await DropDownService.getStatesByRegion(val.value);
    //console.log(filters.value);
    //deselect stte and municipio
    stateMod.value = undefined;
    cityMod.value = undefined;
  } catch (err: unknown) {
    handleError('Falha ao carregar estados', err);
  } finally {
    loading.value = false;
  }
}

const getCitiesByState = async (val: Select) => {
  loading.value = true;
  try {
    //await delay(1500);
      cities.value = await DropDownService.getCitiesByState(val.value);
    //console.log(filters.value);
      cityMod.value = undefined;
  } catch (err: unknown) {
    handleError('Falha ao carregar cidades', err);
  } finally {
    loading.value = false;
  }
}

const changeStartDate = (value: string/*, reason: any, details: any*/) => {
  //console.log(value);
  //date.value = value;
  graphicsConfig.value.data.startDate = value;
  componentKey.value++;
};
const changeEndDate = (value: string/*, reason: any, details: any*/) => {
  graphicsConfig.value.data.endDate = value;
  componentKey.value++;
};

const changeBrand = (val: Select) => {
  data.value.brandId = val.value;
  componentKey.value++;
}

const doRegionalFilter = () => {
  showRegionalFlag.value = true;
  //console.log("text", stateMod.value?.value ?? 0);
  data.value.state = stateMod.value ? stateMod.value?.value : 0;
  data.value.city =
    cityMod.value ? cityMod.value?.label : '';
  data.value.unit = unitMod.value ? +unitMod.value?.value : -1; //-1 means filter toda en caso q no este definido

  if (stateMod.value && cityMod.value) {
    //filtrar solo cuando municipio y estado este definido
    componentKey.value++;
  }
}

const changeFilter = (val: Select) => {
  data.value.filter = val.value; //update this variable
  const temp = data.value;
  if (
    temp.filter === sRegion.value &&
    (!temp.city || temp.city === '' || !temp.state || temp.state < 0)
  ) {
    showRegionalFlag.value = false;
    //console.log('pas');
    return;
  }

  //console.log(temp.filter,temp.city,  temp.state); //no hacer peticion cuando es regional hasta defnir todos los campos
  if (val.value < 3) {
    //show graphic one column
    graphicsConfig.value.color = colors[val.value];
    graphicsConfig.value.caption = captions[val.value];
  } else {
    //show graphic three column
    if (val.value === sPeriodo.value) {
      data.value.startDate = startDate.value;
      data.value.endDate = endDate.value;
    } else if (val.value === sBrand.value) {
      data.value.brandId =
        brandMod.value ? brandMod.value.value : 0;
    } else if (val.value === sRegion.value) {
      //regional
      //clear region, state, city and units
      regionMod.value = undefined;
      stateMod.value = undefined;
      cityMod.value = undefined;
      unitMod.value = undefined;
      data.value.state = -1; //pro primera vez no mostrar resultados
    }
  }
  showRegionalFlag.value = true;
  componentKey.value++; //update
}

onMounted(async () => {
  await getFilters();
  await getBrands();
  await getUnits();
  await getRegions();

});
</script>

<style lang="scss" scoped>

</style>
