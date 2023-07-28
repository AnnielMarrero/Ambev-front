
<template>
  <LeyendaCmp></LeyendaCmp>
  <br />
  <spinner-cmp :loading="loading"></spinner-cmp>

  <div v-if="!loading" class="row">
    <div
      :class="`col-${
        graficos.length === 1 ? '12' : '3'
      } column items-center justify-evenly`"
      style="margin-bottom: 20px"
      v-for="cd in graficos"
      :key="cd.stateId"
    >
      <apexchart
        type="bar"
        height="270"
        width="260"
        :options="chartOptions"
        :series="cd.series"
      ></apexchart>
      <p class="caption">{{ cd.name }}</p>
    </div>
  </div>
  <no-data :data="isData"></no-data>
</template>


<script setup lang="ts">
/** Componet that show a graphic with 3 columns (Green ,yellow, red) for 3 states (Aprvado, Pendent, Rejected) */
import {
  ChartData,
  Grafico,
  GraficoRelatorio
} from 'src/core/data/graphicData';
import ApiService from 'src/services/ApiService';
import { delay, handleError } from 'src/services/util';
import { onMounted, PropType, ref } from 'vue';
import LeyendaCmp from 'src/components/charts/LeyendaCmp.vue';
import SpinnerCmp from 'src/components/SpinnerCmp.vue';
import NoData from 'src/components/NoData.vue';

const props = defineProps({
  resource: {
    type: Object as PropType<GraficoRelatorio>,
    required: true,
  },
  oneColumn: {
    type: Boolean,
    required: false,
    default: false,
  },
});

//variables
const isData = ref<boolean>(true);
const loading = ref<boolean>(false);

const chartDatas = ref<Array<ChartData>>([]);
const graficos = ref<Array<Grafico>>([]);

//for one col
const categories = ref<Array<string>>([]);
const percents = ref<Array<number>>([]);
//end for one

const chartOptions = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + '%';
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },

  xaxis: {
    categories: props.oneColumn ? categories.value : ['Aprovado', 'Pendente', 'Reprovado'], //change here
    position: 'top',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val: number) {
        return val + '%';
      },
    },
  },
  title: {
    text: '', //change here
    floating: true,
    offsetY: 330,
    align: 'center',
    style: {
      color: '#444',
    },
  },
  //change here
  colors: [ props.oneColumn ? props.resource.color : function ({
      value,
      seriesIndex,
      dataPointIndex,
      w,
    }: {
      value: string;
      seriesIndex: number;
      dataPointIndex: number;
      w: string;
    }): string {
      switch (dataPointIndex) {
        case 0:
          return '#21BA45';
        case 1:
          return '#F2C037';
        case 2:
          return '#C10015';
        default:
          return '';
      }
    },], //aqui
};

//functions
const getGraphics = async () => {
  loading.value = true;
  try {
    //await delay(1000);
    const resp = await ApiService.post(
      props.resource.endpoint,
      props.resource.data
    );
    chartDatas.value = resp.data;
    isData.value = chartDatas.value.length > 0;

    if (props.oneColumn) {
      chartDatas.value.forEach((cd) => {
        //const porcientos = [];
        let pc = 0;
        switch (props.resource.data.filter) {
          case 0:
            pc = cd.approvedPercent;
            break;
          case 1:
            pc = cd.rejectPercent;
            break;
          default:
            pc = cd.expiredPercent;
            break;
        }
        //porcientos.push(pc);
        categories.value.push(cd.name);
        percents.value.push(pc);
      });
      graficos.value.push({
        series: [{ name: '', data: percents.value }],
        name: props.resource.caption,
      });
    } else {
      //console.log(chartDatas.value);
      chartDatas.value.forEach((cd) => {
        const porcientos = [];
        porcientos.push(
          cd.approvedPercent,
          cd.pendentPercent,
          cd.rejectPercent
        );
        graficos.value.push({
          series: [{ name: 'Eventos', data: porcientos }],
          name: cd.name,
        });
      });
    }
  } catch (err: unknown) {
    handleError('Não foi possível exibir gráficos', err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getGraphics();
});
</script>

<style lang="scss" scoped>
.caption {
  font-weight: bold;
  margin-top: -20px;
}

</style>>
