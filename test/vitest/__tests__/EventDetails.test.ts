import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import EventDetails from '../../../src/pages/events/EventDetails.vue';
import { Notify } from 'quasar';
import { useRouter, useRoute } from 'vue-router';

//https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: () => {}
  }))
}))


installQuasarPlugin({ plugins: { Notify } });

describe('EventDetails page', () => {

  it('get event by id return OK', async () => {

    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1, // id that exists
      }
    }));

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }));

    const wrapper = mount(EventDetails, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act happens when the componet is loaded
    await flushPromises();

    //Assert
    expect(wrapper.vm.event.name).toBe('Evt .net Test');
    expect(wrapper.find('#unitId').text()).toBe('Centro de Distribuição Direta');
    expect(wrapper.vm.event.madewithMinors).toBe(true);
    expect(wrapper.vm.event.universityOpenBar).toBe(false);
    expect(wrapper.find('#naming').text()).toBe('Naming ou Proprietário?: Naming');
  });


  it('get event by id return Not found', async () => {
    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 0,
      }
    }));

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }));

    const wrapper = mount(EventDetails, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act happens when the componet is loaded
    await flushPromises();

    //Assert
    expect(wrapper.vm.event.id).toBeUndefined();
    expect(wrapper.vm.loading).toBe(false);
    expect(spy).toHaveBeenCalledOnce(); // calling error can't be found, displaying notify error
  });

  // it('get event by id return Unhautorized', async () => {
  //   //Arrange
  //   useRoute.mockImplementationOnce(() => ({
  //     params: {
  //       id: 1,
  //     }
  //   }))

  //   const push = vi.fn()
  //   useRouter.mockImplementationOnce(() => ({
  //     push
  //   }))

  //   const wrapper = mount(EventDetails, {
  //     global: {
  //       stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
  //     }
  //   });

  //   //Act happens when the componet is loaded
  //   await flushPromises();

  //   //Assert
  //   expect(wrapper.vm.msg).toBe('Request failed with status code 401');

  // });
});
