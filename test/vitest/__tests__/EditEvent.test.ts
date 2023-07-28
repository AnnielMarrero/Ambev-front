import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import EditEvent from '../../../src/pages/events/EditEvent.vue';
import { Notify } from 'quasar';
import { useRouter, useRoute } from 'vue-router';


installQuasarPlugin({ plugins: { Notify } });

//https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: () => {}
  }))
}))


describe('Edit event page', () => {

  it('validate date return false when endDate is less than start Date, for an event', async () => {
    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1, // id that exists
      }
    }))

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EditEvent, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    wrapper.vm.event.startDate = '01-01-2023 00:00';
    wrapper.vm.event.endDate = '01-01-2022 00:00';

    //assert
    expect(wrapper.vm.validDates()).toBeFalsy();
  });

  it('get event by id return Ok', async () => {
    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1, // id that exists
      }
    }))

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EditEvent, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    await flushPromises();

    //assert
    expect(wrapper.vm.event.name).toBe('sasas');
    expect(wrapper.vm.event.adress).toBe('sasa');
    expect(wrapper.vm.event.invest).toBe('0.01');
    expect(wrapper.vm.event.madePublicSpace).toBe(true);
    expect(wrapper.vm.event.universityOpenBar).toBe(false);
  });


  it('get event by id return Not Found', async () => {
    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 0, // id that exists
      }
    }))

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EditEvent, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    await flushPromises();

    //assert
    //console.log("my" , wrapper.vm.event);
    expect(wrapper.vm.event.name).toBeUndefined();
    expect(spy).toHaveBeenCalledOnce();
  });

  it('editing event with put return Ok', async () => {
    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1, // id that exists
      }
    }))

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EditEvent, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    await flushPromises();
    await wrapper.vm.submitEvent();

    //assert
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith({
      color: 'positive',
      icon: 'check',
      message: 'Evento editado com sucesso!',
      position: 'top'
    });
  });

  it('editing event with put return BadRequest', async () => {
    //Arrange
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 0, // id that not exists
      }
    }))

    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EditEvent, {
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });
    const spy = vi.spyOn(Notify, 'create');
    //spy.mockClear();

    //Act
    await flushPromises();
    await wrapper.vm.submitEvent();

    //assert
    //using last called ir required in this test
    expect(spy).toHaveBeenLastCalledWith({
      color: 'negative',
      icon: 'report_problem',
      message: 'Falha ao editar evento. Request failed with status code 400',
      position: 'top'
    });
  });

});

