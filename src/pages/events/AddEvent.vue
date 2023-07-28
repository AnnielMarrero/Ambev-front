<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="header5"
    >
      Cadastro de Eventos
    </h5>
  </div>
  <br />
  <spinner-cmp :loading="loading"></spinner-cmp>
  <q-form v-if="!loading" @submit="submitEvent">
    <div :class="centerClassRow">
      <div class="col-6">
        <q-select
          option-value="value"
          option-label="label"
          emit-value
          map-options
          v-model="event.unit"
          :options="units"
          label="Selecione uma Unidade*"
          :rules="[(val) => val >= 0 || 'O campo é obrigatório.']"
        />
      </div>
    </div>

    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-11">
            <q-select
              option-value="value"
              option-label="label"
              emit-value
              map-options
              v-model="event.brandId"
              :options="brands"
              label="Selecione uma Marca*"
              :rules="[(val) => val >= 0 || 'O campo é obrigatório.']"
            />
          </div>
          <div class="col-1">
            <q-btn icon="add" color="primary" @click="showBrandDialogHandle" />
          </div>
        </div>
      </div>
    </div>
    <add-brand-cmp :prompt="showBrandDialog" @addBrandEmit="closeAddBrandDialog" />
    <div :class="centerClassRow">
      <div class="col-6">
        <q-input
          data-test="evtName"
          v-model="event.name"
          label="Nome do evento*"
          :rules="[(val) => !!val || 'O campo é obrigatório.']"
        />
      </div>
    </div>

    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-input
              v-model="event.startDate"
              :rules="[
                (val) => !!val || 'O campo é obrigatório.',
                (val) =>
                  validDates() ||
                  'A data final deve ser maior ou igual à data inicial.',
              ]"
              label="Data e hora do Início do Evento*"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="event.startDate"
                      mask="DD-MM-YYYY HH:mm"
                      :locale="ptLocale"
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
                      v-model="event.startDate"
                      mask="DD-MM-YYYY HH:mm"
                      format24h
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
          <div class="col-6">
            <q-input
              v-model="event.endDate"
              :rules="[
                (val) => !!val || 'O campo é obrigatório.',
                (val) =>
                  validDates() ||
                  'A data final deve ser maior ou igual à data inicial.',
              ]"
              label="Data e hora do Fim do Evento*"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="event.endDate"
                      mask="DD-MM-YYYY HH:mm"
                      :locale="ptLocale"
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
                      v-model="event.endDate"
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

    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-5">
            <q-input
              data-test="cep"
              v-model="event.cep"
              label="CEP*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
              mask="#####-###"
              fill-mask="_"
              @blur="pesquisacep"
            />
          </div>
          <div class="col-2">
            <q-input v-model="event.state" label="Estado*" disable />
          </div>
          <div class="col-5">
            <q-input v-model="event.city" label="Cidade*" disable />
          </div>
        </div>
      </div>
    </div>

    <div :class="centerClassRow">
      <div class="col-6">
        <q-expansion-item
          expand-separator
          icon="pin_drop"
          header-class="text-orange"
          label="Endereço*"
          default-opened
        >
          <q-input
            data-test="address"
            v-model="event.adress"
            label="Endereço*"
            :rules="[(val) => !!val || 'O campo é obrigatório.']"
          />
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

    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-input
              data-test="estimatedAudience"
              v-model="event.estimatedAudience"
              type="number"
              min="1"
              max="1000000"
              label="Público Estimado*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
            />
          </div>
          <div class="col-6">
            <q-input
              data-test="investEvent"
              v-model="event.invest"
              label="Investimento*"
              type="number"
              min="0"
              max="1000000"
              step="0.01"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
            />
          </div>
        </div>
      </div>
    </div>
    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-input
              data-test="prodName"
              v-model="event.producerName"
              label="Produtor"
            />
          </div>
          <div class="col-6">
            <q-input
              data-test="prodTel"
              v-model="event.producerPhone"
              label="Tel. Produtor"
            />
          </div>
        </div>
      </div>
    </div>

    <div :class="centerClassRow">
      <div class="col-6">
        <q-input
          data-test="email"
          v-model="event.producerEmail"
          label="E-mail do produtor"
          type="email"
        />
      </div>
    </div>
    <div :class="centerClassRow">
      <div class="col-6">
        <q-select
          option-value="value"
          option-label="label"
          emit-value
          map-options
          v-model="event.carriedOutBy"
          :options="namProp"
          label="Naming ou Proprietário?*"
          :rules="[(val) => val >= 0 || 'O campo é obrigatório.']"
        />
      </div>
    </div>
    <br />
    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row">
          <div class="col-8">
            <div class="row">
              <p class="text-orange">Contratação com o Poder Público?*</p>
            </div>
            <div class="row">
              <p class="text-caption text-positive">
                Crique
                <a
                  href="http://compliancechannel.la.interbrew.net/"
                  target="_blank"
                  class="text-caption text-positive"
                  >aqui</a
                >
                e registre um chamado no canal de compliance
              </p>
            </div>
          </div>
          <div class="col-2">
            <q-toggle
              v-model="event.contractedGovernment"
              @click="handleShowEmailMod"
            />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                {{ contratPoderPublico }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>

    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row">
          <div class="col-8">
            <p class="text-orange">Evento realizado em espaço público?</p>
          </div>
          <div class="col-2">
            <q-toggle v-model="event.madePublicSpace" />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                {{ espacioPublico }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>

    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row">
          <div class="col-8">
            <p class="text-orange">Eventos com menores de idade?</p>
          </div>
          <div class="col-2">
            <q-toggle v-model="event.madewithMinors" />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                {{ menorIdade }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>
    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row">
          <div class="col-8"><p class="text-orange">Ativação de risco?</p></div>
          <div class="col-2">
            <q-toggle v-model="event.riskActivation" />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                {{ actRisco }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>
    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row">
          <div class="col-8">
            <p class="text-orange">Ativação de marca em estrutura montada?</p>
          </div>
          <div class="col-2">
            <q-toggle v-model="event.brandActivation" />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                {{ marcaEst }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>
    <div :class="centerClassRow">
      <div class="col-6">
        <div class="row">
          <div class="col-8">
            <p class="text-orange">Universitário Open Bar?</p>
          </div>
          <div class="col-2">
            <q-toggle v-model="event.universityOpenBar" />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                {{ universitario }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="row items-center justify-center q-gutter-xl">
      <q-btn
        no-caps
        color="primary"
        icon="upload"
        label="Upload"
        unelevated
        rounded
        @click="showFileUploadModal = true"
      />
      <q-btn
        no-caps
        color="primary"
        icon="check"
        label="Salvar"
        :disable="disableSave"
        type="submit"
        unelevated
        rounded
      />
    </div>
    <!-- put inside q-form -->
    <!-- upload files -->
    <q-dialog v-model="showFileUploadModal">
      <q-card style="width: 800px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-center text-orange">Upload de arquivos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-show="!isFileShowed">
            <div
              class="row"
              v-for="docEvt in docEvts"
              :key="docEvt.category"
              style="margin-bottom: 25px"
            >
              <div v-if="docEvt.category !== '0'" class="col-5">
                <q-btn
                  no-caps
                  class="csWidthLabel"
                  :label="docEvt.label"
                  filled
                  rounded
                  color="primary"
                />
              </div>
              <div v-if="docEvt.category !== '0'" class="col-7 row items-center">
                <q-btn
                  icon="description"
                  no-caps
                  flat
                  rounded
                  :color="docEvt.color"
                  :disable="docEvt.disabled"
                  @click="showFileArea(true, docEvt.src)"
                ></q-btn>

                <q-file
                  color="primary"
                  style="margin-top: -10px; width: 80%"
                  v-model="docEvt.file"
                  label="Arquivos pdf, .png"
                  accept=".pdf, .png"
                  max-file-size="15728640"
                  @rejected="onRejectedFile"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
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
          </div>
        </q-card-section>

        <q-card-actions v-show="!isFileShowed" align="center">
          <q-btn
            no-caps
            unelevated
            rounded
            color="primary"
            label="Upload"
            @click="upload6File"
            icon="upload"
          />
          <q-btn no-caps unelevated rounded label="Fechar" icon="close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showEmailModal" persistent>
      <q-card style="width: 800px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-center text-orange">Upload de e-mail de validação de evento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <div class="row" style="margin-bottom: 15px">
                <q-file
                  color="primary"
                  style="margin-top: 0px; width: 100%"
                  label="Arquivos pdf, .eml"
                  accept=".pdf, .eml"
                  max-file-size="15728640"
                  @rejected="onRejectedFile"
                  v-model="docEvts[docEvts.length - 1].file"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            no-caps
            unelevated
            rounded
            label="Upload"
            icon="upload"
            color="primary"
            @click="uploadEmailFile"
            v-close-popup
          />
          <q-btn
            no-caps
            unelevated
            rounded
            label="Fechar"
            icon="close"
            color="primary"
            @click="event.contractedGovernment = false"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-form>
  <br />
</template>

<script setup lang="ts">
import { Select } from 'src/core/data/dropdown';
import { DocEvt } from 'src/core/data/event';
import Event from 'src/core/data/event';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  actRisco,
  contratPoderPublico,
  espacioPublico,
  marcaEst,
  menorIdade,
  universitario,
} from 'src/core/data/text';
import ApiService from 'src/services/ApiService';
import DropDownService from 'src/services/DropDownService';
import { getInfoFromCep, validStartEndDates, showAlert, handleError, delay } from 'src/services/util';
import { ptLocale, centerClassRow } from 'src/core/data/config';
import SpinnerCmp from 'src/components/SpinnerCmp.vue';
import AddBrandCmp from 'src/components/AddBrandCmp.vue';

//variables
const showBrandDialog = ref<boolean>(false);
const loading = ref<boolean>(false);
const router = useRouter();

const units = ref<Select[]>();
const brands = ref<Select[]>({} as Select[]);
const namProp = ref<Select[]>();

const event = ref<Event>({} as Event);

const showEmailModal = ref(false);
const docEvts = ref<DocEvt[]>();

const srcFile = ref('');
const isFileShowed = ref(false); //para mostrar ocultar area archivos
const disableSave = ref(false);
const showFileUploadModal = ref(false); // use in the template

const labels = [
    'Alvará do evento',
    'Auto de Vistoria do Corpo de Bombeiros (AVCB)',
    'Contrato de Bombeiros Civis',
    'Contrato de UTI Móvel',
    'Contrato de Segurança Privada',
    'Contrato de Patrocínio Assinado Pelas Partes',
    '',
  ];

//functions
const validDates = (): boolean =>
    validStartEndDates(event.value.startDate, event.value.endDate, 'DD-MM-YYYY HH:mm');

const pesquisacep = async () => {
  //Preenche os campos com "..." enquanto consulta webservice.
  event.value.state = '...';
  event.value.city = '...';
  const conteudo = await getInfoFromCep(event.value.cep);

  if (conteudo && !('erro' in conteudo)) {
    //Atualiza os campos com os valores.
    event.value.city = conteudo.localidade;
    event.value.state = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    event.value.state = '';
    event.value.city = '';
    showAlert('CEP não encontrado.');
  }
};

const closeAddBrandDialog = async (id: number) => {
  if(id !== -1) showBrandDialog.value = false;
  if(id > 0) {
    //update selection
    await getBrands();
    event.value.brandId = brands.value.filter(
      (b) => b.value === id
    )[0].value;
  }
  //console.log('id', id);
}

const showBrandDialogHandle = () => {
  showBrandDialog.value = true;
};

// load select
const getPropietarios = async () => {
  try {
    namProp.value = await DropDownService.getPropietarios();
  } catch (err: unknown) {
    handleError('Falha ao carregar propietarios', err);
  }
};

const getUnits = async () => {
  try {
    units.value = await DropDownService.getUnits();
  } catch (err: unknown) {
    handleError('Falha ao carregar unidades',err);
  }
};

const getBrands = async () => {
  try {
    brands.value = await DropDownService.getBrands();
  } catch (err: unknown) {
    handleError('Falha ao carregar marcas', err);
  }
};
//end load select

// submit form
const submitEvent = async () => {
  //console.log('formState', 1);

  disableSave.value = true;
  event.value.validationEmailArchiveId = docEvts.value
    ? docEvts.value[6].docId
    : null;
  event.value.eventCharterId = docEvts.value ? docEvts.value[0].docId : null;
  event.value.fireDepartmentInspectionReportId = docEvts.value
    ? docEvts.value[1].docId
    : null;
  event.value.civilFireServiceContractId = docEvts.value
    ? docEvts.value[2].docId
    : null;
  event.value.mobileContractId = docEvts.value
    ? docEvts.value[3].docId
    : null;
  event.value.privateSecurityContractId = docEvts.value
    ? docEvts.value[4].docId
    : null;
  event.value.sponsorshipAgreementId = docEvts.value
    ? docEvts.value[5].docId
    : null;
  try {
    await ApiService.post('/api/Event/Add', event.value);

    //clear data
    event.value = {} as Event;
    docEvts.value?.forEach((de) => (de.docId = null));
    //end clear
    showAlert('Evento cadastrado com sucesso!', true);
    router.push({ name: 'all-events'});
  } catch (err: unknown) {
    handleError('Falha ao adicionar evento', err);
  } finally {
    disableSave.value = false;
  }
};

// handle upload files
const uploadFile = async (de: DocEvt) => {
  const file = de.file;
  if (file && file.name !== '') {
    //console.log("file",JSON.stringify(file), typeof file);
    var formData = new FormData();
    formData.append('archive', file);
    formData.append('category', de.category);
    try {
      const resp = await ApiService.post(
        '/api/Archive/UploadArchive',
        formData
      );
      de.color = 'orange';
      de.disabled = false;
      de.src = `${process.env.VUE_APP_API_URL}/api/Archive/Show/${resp.data.result}`;
      de.docId = parseInt(resp.data.result);
      showAlert('Arquivo enviado com sucesso.', true);
      //console.log("src", de.src);
    } catch (err: unknown) {
      handleError('Falha ao upload arquive', err);
    }
  }
};
// subir los 6 documentos cuando se abre modal en Upload
const upload6File = async () => {
  disableSave.value = true;
  const len = docEvts.value?.length ? docEvts.value?.length - 1 : 0;
  for (let i = 0; i < len; i++) {
    if (docEvts.value) await uploadFile(docEvts.value[i]);
  }
  disableSave.value = false;
};

const uploadEmailFile = async () => {
  const last = docEvts.value?.length ? docEvts.value?.length - 1 : 0;

  if (docEvts.value) {
    //console.log(docEvts.value[last].file.name);
    if (docEvts.value[last].file.name !== '')
      await uploadFile(docEvts.value[last]);
    else event.value.contractedGovernment = false;
  }
};

// end handle upload files

const showFileArea = (flag: boolean, src = '') => {
  isFileShowed.value = flag;
  srcFile.value = src;
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
      file: new File([], ''), //ref(null)
      category: cat,
      label: labels[i - 1],
      docId: null,
      status: null,
      rejectionReason: null,
    });
  }
  //console.log("evtDoc", docEvts.value);
};

const handleShowEmailMod = () => {
  if (event.value.contractedGovernment) showEmailModal.value = true;
};

const onRejectedFile = () =>
  showAlert(
    'O arquivo deve ser nos formatos .pdf ou .png e o tamanho máximo permitido é de 15 Mb por arquivo'
  );

onMounted(async () => {
  fillDocEvt();
  loading.value = true;
  //await delay(1500);
  await getUnits();
  await getBrands();
  await getPropietarios();
  loading.value = false;
});
</script>

<style lang="scss" scoped>

</style>

