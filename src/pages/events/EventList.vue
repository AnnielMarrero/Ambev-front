<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="header5"
    >
      Lista de Eventos
    </h5>
  </div>
  <div class="q-pa-md row items-center justify-center q-gutter-lg">
    <q-select
      clearable
      :options="units"
      v-model="unitMod"
      label="Unidade"
      @update:model-value="changeUnit"
      class="filter"
      ref='unitSel'
    />
    <!-- ref: 'unitSel' is for Vitest-->
    <q-input
      v-model="date"
      class="filter"
      label="Data do Evento"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="date"
              mask="DD-MM-YYYY"
              :locale="ptLocale"
              @update:model-value="changeDate"
            >
              <div class="row items-center justify-end">
                <q-btn no-caps v-close-popup label="Fechar" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

  <LeyendaCmp></LeyendaCmp>
  <br />

  <spinner-cmp :loading="loading"></spinner-cmp>



  <div class="q-ml-xl row items-start q-gutter-xl">
    <q-card
      class="card-event"
      :class="
        event.status === EventStatus.Pendent
          ? 'warningBor'
          : event.status === EventStatus.Approved
          ? 'positiveBor'
          : 'negativeBor'
      "
      v-for="event in events"
      :key="event.id"
    >
      <q-card-actions align="right">
        <q-btn
          :to="`/cadastro-evento-preenchido/${event.id}`"
          flat
          round
          color="blue-grey-13"
          icon="visibility"
        />
        <q-btn
          :to="`/editar-evento/${event.id}`"
          flat
          round
          :color="
            event.status === EventStatus.Pendent
              ? 'warning'
              : event.status === EventStatus.Approved
              ? 'positive'
              : 'negative'
          "
          icon="edit"
          :disable="event.status !== EventStatus.Pendent"
        />
        <q-btn
          flat
          round
          color="grey"
          icon="close"
          @click="showRejectEvt(event.id)"
          :disable="userRol.includes(Role.Connections)"
        />
      </q-card-actions>

      <q-card-section>
        <div
          class="text-h6 q-mb-xs"
          :class="
            event.status === EventStatus.Pendent
              ? 'text-warning'
              : event.status === EventStatus.Approved
              ? 'text-positive'
              : 'text-negative'
          "
        >
          {{ event.name }}
        </div>
        <div class="row no-wrap items-center">
          <q-item-label caption>{{ event.startDate }}</q-item-label>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          no-caps
          flat
          :class="{ 'text-negative': event.status === EventStatus.Rejected }"
          :disable="event.status !== EventStatus.Pendent"
          @click="showFiles(event.id)"
          >Arquivos</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
  <br />
  <br />
  <no-data :data="isData"></no-data>
  <q-dialog v-if="showDialogTest" v-model="confirmRejectEvt" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm">Deseja realmente rejeitar este evento?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          no-caps
          label="Sim"
          color="positive"
          v-close-popup
          @click="rejectEvent"
        />
        <q-btn flat no-caps label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-if="showDialogTest" v-model="confirmAprbarEvt" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm">Deseja realmente aprovar este evento?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          label="Sim"
          color="positive"
          v-close-popup
          @click="aprobarEvt"
        />
        <q-btn flat no-caps label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--Aprobar arquivo -->
  <q-dialog v-if="showDialogTest" v-model="confirmAprobarFile" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm">Deseja realmente aprovar este arquivo?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          label="Sim"
          color="positive"
          v-close-popup
          @click="aprobarArquivo"
        />
        <q-btn no-caps flat label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Rechazar arquvio -->
  <q-dialog v-if="showDialogTest" v-model="confirmRechazarFile" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm"
          >Se você realmente deseja rejeitar este arquivo, insira o motivo</span
        >
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          <q-option-group
            :options="options"
            type="radio"
            v-model="group"
            ref="optionRejectFile"
          />
          <q-input v-show="group == '6'" dense v-model="reason" autofocus />
          <!--  -->
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          label="Sim"
          color="positive"
          @click="rechazarArquivo"
        />
        <q-btn no-caps flat label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- dialog with files asociated to the event -->
  <q-dialog v-if="showDialogTest" v-model="showFileDialog">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center text-orange">Arquivos</div>
      </q-card-section>
      <spinner-cmp :loading="loading"></spinner-cmp>
      <q-card-section v-show="!loading" class="q-pt-none">
        <div v-show="!isFileShowed">
          <div
            class="row"
            v-for="docEvt in docEvts"
            :key="docEvt.category"
            style="margin-bottom: 25px"
          >
            <div
              v-if="docEvt.category !== '0' || docEvt.docId !== null"
              class="col-7"
            >
              <q-btn
                no-caps
                class="csWidth"
                :label="docEvt.label"
                filled
                rounded
                :color="
                  docEvt.status === null
                    ? 'primary'
                    : docEvt.status === ArchiveStatus.Approved
                    ? 'positive'
                    : 'negative'
                "
              />
            </div>
            <div
              v-if="docEvt.category !== '0' || docEvt.docId !== null"
              class="col-5 row items-center q-gutter-md"
            >
              <q-btn
                icon="description"
                no-caps
                flat
                rounded
                :color="docEvt.color"
                :disable="docEvt.color === 'grey'"
                @click="showFileArea(true, docEvt.src, docEvt.status === ArchiveStatus.Rejected ? docEvt.rejectionReason : '')"
              ></q-btn>
              <q-btn
                v-if="!docEvt.disabled/* && userRol.includes(Role.Juridico)*/"
                icon="thumb_up"
                no-caps
                size="sm"
                rounded
                color="positive"
                @click="showAprobarFile(docEvt.docId)"
              ></q-btn>
              <q-btn
                v-if="!docEvt.disabled/* && userRol.includes(Role.Juridico)*/"
                icon="thumb_down"
                no-caps
                size="sm"
                rounded
                color="negative"
                @click="showRechazarFile(docEvt.docId)"
              ></q-btn>
            </div>
          </div>
        </div>
        <div v-show="isFileShowed">
          <q-btn
            flat
            color="negative"
            @click="showFileArea(false)"
            icon="close"
          />

          <iframe
            :src="srcFile"
            allow="fullscreen"
            width="800"
            height="700"
          ></iframe>
          <p
            v-if="rejectionReason && rejectionReason !== ''"
            class="text-negative"
          >
            Arquivo rejeitado: {{ rejectionReason }}
          </p>
        </div>
      </q-card-section>

      <q-card-actions v-show="!isFileShowed" align="center">
        <q-btn
          no-caps
          flat
          label="Aprovar evento"
          icon="check"
          color="positive"
          @click="confirmAprbarEvt = true"
          :disable="!userRol.includes(Role.Juridico)"
        />
        <q-btn no-caps flat label="Cancelar" icon="close" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <br />
</template>

<script setup lang="ts">
import {DocEvt} from 'src/core/data/event';
import { Select } from 'src/core/data/dropdown';
import Event from 'src/core/data/event';
import { computed, onMounted, ref } from 'vue';
import { ptLocale } from 'src/core/data/config'
import { showAlert, handleError, delay } from 'src/services/util';
import ApiService from 'src/services/ApiService';
import DropDownService from 'src/services/DropDownService';
import { ArchiveStatus, EventStatus, Role } from 'src/core/data/enums'; //used by the template
import { useMsal } from 'src/composition-api/useMsal';
import { useRouter } from 'vue-router';
import LeyendaCmp from 'src/components/charts/LeyendaCmp.vue';
import SpinnerCmp from 'src/components/SpinnerCmp.vue';
import NoData from 'src/components/NoData.vue';

// props used in vitest test
defineProps({
  showDialogTest: {
    type: Boolean,
    default: true,
  },
});

//variables
const isData = ref<boolean>(true);
const loading = ref<boolean>(false);
const skip = ref<number>(0);
const maxResult = ref<number>(1000000);

const router = useRouter();
const { accounts } = useMsal();

const units = ref<Select[]>();
const unitMod = ref<Select>();
const date = ref('');
const unitId = ref<number|string>('');
const events = ref<Array<Event>>([]);
const selectedEvt = ref(-1);
const confirmRejectEvt = ref(false);
const docEvts = ref<DocEvt[]>();
const showFileDialog = ref(false);
const srcFile = ref('https://url.com');
const isFileShowed = ref(false); //para mostrar ocultar area archivos
const confirmAprobarFile = ref(false);
const confirmRechazarFile = ref(false);
const currDocId = ref(0); //id del archivo seleccionado para aprobar o rechazar
const currEvtId = ref(0);
const reason = ref(''); //razon de rejeitar archivo
const confirmAprbarEvt = ref(false);
const rejectionReason = ref(''); //si un archivo es desaprobado mostrar la razon;
const group = ref(null);
const options = [
  {
    label:
      'O documento apresentado é um protocolo, não o documento final expedido pelo órgão público',
    value: '1',
  },
  {
    label:
      'O documento apresentado é um rascunho, não o documento definitivo expedido pelo órgão público',
    value: '2',
  },
  {
    label: 'O documento apresentado é divergente do documento solicitado',
    value: '3',
  },
  {
    label: 'O contrato apresentado não está assinado pelas partes',
    value: '4',
  },
  {
    label: 'O documento apresentado não se refere ao evento cadastrado',
    value: '5',
  },
  { label: 'Outro comentário', value: '6' },
];

const labels = [
    'Alvará do evento',
    'Auto de Vistoria do Corpo de Bombeiros (AVCB)',
    'Contrato de Bombeiros Civis',
    'Contrato de UTI Móvel',
    'Contrato de Segurança Privada',
    'Contrato de Patrocínio Assinado Pelas Partes',
    'Autorização da Área de compliance',
  ];

//functions
const rejectEvent = async () => {
  try {
    await ApiService.get(`api/Event/RejectEvent/${selectedEvt.value}`);
    await getEvents();
  } catch (err: unknown) {
    handleError('Não foi possível rejeitar este evento', err);
  }
};

const aprobarEvt = async () => {
  try {
    await ApiService.get(`/api/Event/ApproveEvent/${currEvtId.value}`);
    await getEvents();
    showFileDialog.value = false; // close dialog
    showAlert('Evento aprovado com sucesso', true);
  } catch (err: unknown) {
    handleError('Não foi possível aprovar este evento', err);
  }
};

const showRejectEvt = (evtId: number) => {
  //console.log("show",evtId);
  confirmRejectEvt.value = true;
  selectedEvt.value = evtId;
  //console.log('sel', evtId);
};

const getUnits = async () => {
  try {
    units.value = await DropDownService.getUnits();
  } catch (err: unknown) {
    handleError('Falha ao carregar unidades', err);
  }
};

const getEvents = async () => {
  loading.value = true;
  try {
    //await delay(1500);
    //console.log("beg");
    const resp = await ApiService.get(
      `api/Event/GetPaginatedList?SkipCount=${skip.value}&MaxResultCount=${maxResult.value}&Unit=${unitId.value}&Date=${date.value}`
    );
    events.value = resp.data.result.items;
    isData.value = events.value.length > 0;
    //console.log("after", events.value);
  } catch (error: unknown) {
    handleError('Falha ao carregar eventos', error);
  } finally {
    loading.value = false;
  }
};

const changeUnit = (val: Select) => {
  unitId.value = val ? val.value : '';
  getEvents();
};

const changeDate = (value: string) => {
  //console.log('change date',value);
  date.value = value;
  getEvents();
};

const fillDocEvt = () => {
  docEvts.value = [];

  for (let i = 1; i <= 7; i++) {
    let cat = i === 1 ? '1' : '' + (i + 1);
    if (i === 7) cat = '0';

    docEvts.value?.push({
      color: 'grey',
      disabled: true,
      src: '',
      file: new File([], ''),
      category: cat,
      label: labels[i - 1],
      docId: null,
      status: null,
      rejectionReason: null,
    });
  }
  //console.log("evtDoc", docEvts.value);
};

/**
 * Show the associated files for a given event
 *
 */
const showFiles = async (evtId: number) => {
  fillDocEvt(); //clear status
  showFileDialog.value = true;
  loading.value = true;
  currEvtId.value = evtId;
  try {
    //await delay(1500);
    const response = await ApiService.get(
      `/api/Archive/GetUploadedArchives?eventId=${evtId}`
    );
    //TODO
    response.data.forEach(
      (x: {
        id: number;
        category: string;
        status: number | null;
        rejectionReason: string | null;
      }) => {
        const evt = docEvts.value?.filter((e) => e.category == x.category);
        //buscar cada evento existente y llenarlo de acuerdo a info de la api
        if (evt && evt?.length > 0) {
          const first = evt[0];
          first.docId = x.id;
          first.status = x.status;
          first.color = x.id ? 'orange' : 'grey';
          first.disabled = x.status != null;
          first.src = `${process.env.VUE_APP_API_URL}/api/Archive/Show/${x.id}`;
          first.rejectionReason = x.rejectionReason;
        }
      }
    );
  } catch (err: unknown) {
      handleError('Falha ao carregar arquivos' , err);
  } finally {
    loading.value = false;
  }
};

const showFileArea = (flag: boolean, src = '', reason: '') => {
  isFileShowed.value = flag;
  srcFile.value = src;
  rejectionReason.value = reason;
  //console.log("src", src);
};

// handle Aprobar and rechazar archivo
const aprobarArquivo = async () => {
  try {
    await ApiService.get(`/api/Archive/ApproveArchive/${currDocId.value}`);
    await showFiles(currEvtId.value);
  } catch (err: unknown) {
    handleError('Não foi possível aprovar este arquivo' , err);
  }
};
const rechazarArquivo = async () => {
  //console.log("group",group.value); //TODO
  if (
    group.value === null ||
    (group.value === '6' && reason.value.trim().length === 0)
  ) {
    showAlert('Insira o motivo');
    return;
  }
  let comment = options[group.value - 1].label;
  if (group.value === '6') comment += `: ${reason.value}`;
  try {
    await ApiService.get(
      `/api/Archive/RejectArchive?ArchiveId=${currDocId.value}&RejectionReason=${comment}`
    );
    await showFiles(currEvtId.value);
    reason.value = '';
    confirmRechazarFile.value = false;
  } catch (err: unknown) {
    handleError('Não foi possível rejeitar este arquivo', err);
  }
};

const showRechazarFile = (docId: number) => {
  confirmRechazarFile.value = true; // propmt for reason
  currDocId.value = docId;
};
const showAprobarFile = (docId: number) => {
  confirmAprobarFile.value = true;
  currDocId.value = docId;
  //console.log("currDocId",docId);
};
// End handle Aprobar and rechazar archivo

//using in vitest test
const testEventDetails = () => router.push('/cadastro-evento-preenchido/1');
const testRouterEdit = () => router.push('/editar-evento/1');

const userRol = computed(() => {
  //console.log("user rol" , userRol);
  if (accounts.value.length > 0) {
    return accounts.value[0].idTokenClaims?.preferred_username; //fixRole
  }
  return '';
});

onMounted(async () => {
  fillDocEvt();
  await getEvents(); //first async op
  await getUnits();

});
</script>

<style lang="scss" scoped>

.csWidth {
  width: 340px;
  margin-left: 20px;
}

.positiveBor {
  border-right-color: $positive;
}
.negativeBor {
  border-right-color: $negative;
}
.warningBor {
  border-right-color: $warning;
}

.card-event {
  width: 100%;
  max-width: 300px;
  border-right-style: solid;
  border-right-width: 7px;
}

.filter {
  width: 350px;
}
</style>
