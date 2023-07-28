<!-- View for make the tooolbar menu and the header -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="myToolBar"
      >
        <q-toolbar-title>
          <q-img
            src="../assets/images/ambev-logo-branco.png"
            class="dimImgHeader"
          ></q-img>
          <!-- Quasar App -->
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn icon="home" to="/" no-caps flat rounded label="Início"></q-btn>
        <q-btn-dropdown no-caps flat rounded label="Eventos">
          <q-list>
            <q-item :to="{name: 'add-event'}" v-close-popup>
              <q-item-section>
                <q-item-label>Cadastrar evento</q-item-label>
              </q-item-section>
            </q-item>

            <q-item :to="{name: 'all-events'}" clickable v-close-popup>
              <q-item-section>
                <q-item-label>Lista de eventos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          icon="area_chart"
          no-caps
          flat
          rounded
          label="Farol de Atingimento"
          :to="{name: 'farol-event'}"
        ></q-btn>
        <q-btn
          icon="description"
          no-caps
          flat
          rounded
          label="Relatório de Auditoria"
          :to="{name: 'rel-audit'}"
          v-show="true || userRol === Role.Juridico || userRol === Role.Connections"
        ></q-btn>

        <q-btn-dropdown
          v-if="!!name"
          no-caps
          stretch
          flat
          :label="`Bem-vindo ${name}`"
        >
          <q-list>
            <q-item clickable v-close-popup dense id="logoutItem" @click="logoutRedirect">
              <q-item-section avatar>
                <q-avatar
                  icon="logout"
                  text-color="white"
                  color= "$toGradient"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="myfooter" elevated>
      <q-toolbar class="row items-center justify-center">
        <q-img
          src="../assets/images/ambev-logo-branco.png"
          class="dimImgHeader"
        ></q-img>
        <!--  <q-space /> -->
        <q-img
          src="../assets/images/img_agence.png"
          style="width: 90px; height: 25px"
        ></q-img>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMsal } from '../composition-api/useMsal';
import { loginRequest } from '../authConfig';
import { Role } from 'src/core/data/enums';

export default defineComponent({
  name: 'MainLayout',
  setup() {

    const leftDrawerOpen = ref(false);

    const { instance } = useMsal();
    const { accounts } = useMsal();

    const loginRedirect = () => {
      instance.loginRedirect(loginRequest);
    };
/*
    const loginPopup = () => {
      instance.loginPopup(loginRequest);
    };

    const logoutPopup = () => {
      instance.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    };
    */
    const logoutRedirect = () => {
      //console.log("logout");
      instance.logoutRedirect();
    };
    const name = computed(() => {
      if (accounts.value.length > 0) {
        const name = accounts.value[0].name;
        // console.log(
        //   'account',
        //   accounts.value[0].idTokenClaims?.preferred_username
        // );
        if (name) {
          return name.split(' ')[0];
        }
      }
      return '';
    });
    const userRol = computed(() => {
      if (accounts.value.length > 0) {
        return accounts.value[0].idTokenClaims?.preferred_username; //fixRole
      }
      return '';
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loginRedirect,
      /*
      loginPopup,
      logoutPopup,*/
      logoutRedirect,
      name,
      Role,
      userRol,
    };
  },
});
</script>

<style lang="scss" scoped>
.myToolBar {
  background: linear-gradient(to right, $fromGradient 0%, $toGradient 100%);
}

.dimImgHeader {
  width: 200px;
  height: 44px;
}

.myfooter {
  background-color: $primary;
}

#logoutItem {
  color: white;
  background: $toGradient;
}

</style>
