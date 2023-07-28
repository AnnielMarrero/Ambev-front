import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import IndexPage from '../../../src/pages/IndexPage.vue';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router'


installQuasarPlugin({ plugins: { Notify } });

//https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: () => { }
  }))
}));

describe('Index Page', () => {

  // testing vue-router
  it('testing vue-router => add event', async () => {

    //Arrange
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(IndexPage, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    wrapper.vm.testRoutercadastro();
    //

    //Assert
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith( {name: 'add-event'});

  });

  it('testing vue-router => all event', async () => {

    //Arrange
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(IndexPage, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    wrapper.vm.testRouterListEvt();
    //

    //Assert
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith({name: 'all-events'});

  });

  it('testing vue-router => Relatorio', async () => {

    //Arrange
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(IndexPage, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    wrapper.vm.testRouterRel();

    //Assert
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith({name: 'rel-audit'});

  });

});

