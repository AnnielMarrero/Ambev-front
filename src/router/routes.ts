import { /*createRouter, createWebHistory,*/ RouteRecordRaw } from 'vue-router';
//import { registerGuard } from './Guard';
//pending use roles on guards
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          requiresAuth: true,
          //role: 'admin'
        }
      },
      {
        name: 'all-events',
        path: '/lista-eventos',
        component: () => import('src/pages/events/EventList.vue'),
        meta: {
          requiresAuth: true,
          //role: 'admin'
        }
      },
      {
        name: 'add-event',
        path: '/add-evento',
        component: () => import('src/pages/events/AddEvent.vue'),
        meta: {
          requiresAuth: true,
          //role: 'admin'
        }
      },
      {
        name: 'farol-event',
        path: '/farol-atingimento',
        component: () => import('src/pages/farolAntigimento/FarolAtingimento.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'rel-audit',
        path: '/relatorio-auditoria',
        component: () => import('src/pages/relatorios/RelAudit.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'details-event',
        path: '/cadastro-evento-preenchido/:id',
        component: () => import('src/pages/events/EventDetails.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'edit-event',
        path: '/editar-evento/:id',
        component: () => import('src/pages/events/EditEvent.vue'),
        meta: {
          requiresAuth: true
        }
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];
/*
const router = createRouter({
  history: createWebHistory(),
  routes,
});
*/
//registerGuard(router);

export default routes;
