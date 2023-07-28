import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import EventList from '../../../src/pages/events/EventList.vue';
import { Notify } from 'quasar';
import { Select } from '../../../src/core/data/dropdown';
import { EventStatus } from '../../../src/core/data/enums';
import { useRoute, useRouter } from 'vue-router';

//https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: () => { }
  }))
}));

installQuasarPlugin({ plugins: { Notify } });

describe('EventList page', () => {

  it('get events return OK', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      }
    });

    //Act happens when the componet is loaded
    await flushPromises();

    //Assert
    expect(wrapper.vm.events.length).toBe(33);
  });


  it('get events with filters (unit and date)', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    const unitId = 1;
    const date = '02-03-2023';
    const sel: Select = {
      label: '',
      value: unitId
    };

    //Act happens when the componet is loaded

    wrapper.findComponent({ ref: 'unitSel' }).setValue(sel);
    wrapper.vm.changeDate(date);
    await flushPromises();

    //Assert
    expect(wrapper.vm.events.length).toBe(2);
  });

  it('get events with filters (Date), Expect 0 result', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    const date = '02-03-1980';
    //Act
    wrapper.vm.changeDate(date);
    await flushPromises();

    //Assert
    expect(wrapper.vm.events.length).toBe(0);
  });

  it('get events with filters (unit)', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    //Act
    const sel: Select = {
      label: '',
      value: 2
    };

    wrapper.findComponent({ ref: 'unitSel' }).setValue(sel);
    await flushPromises();

    //Assert
    expect(wrapper.vm.events.length).toBe(5);
  });

  it('Reject event is possible', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    //Act
    const evtId = 38;
    wrapper.vm.showRejectEvt(evtId);
    await wrapper.vm.rejectEvent();

    //Assert
    const event = wrapper.vm.events.filter(x => x.id === evtId)[0];
    //console.log("evts", event);
    expect(event.status).toBe(EventStatus.Rejected); // fue posible rejectar evt
  });

  it('Reject event is NOT possible', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    wrapper.vm.showRejectEvt(0);
    await wrapper.vm.rejectEvent();

    //Assert
    expect(spy).toHaveBeenCalledOnce(); //no fue posible rejectar evt, Notify was called

  });

  // testing vue-router details page
  it('testing vue-router go to Event Details page', async () => {

    //Arrange
    const id = 1;
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: id
      }
    }))
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    wrapper.vm.testEventDetails();
    //

    //Assert
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith(`/cadastro-evento-preenchido/${id}`);

  });


  // testing vue-router
  it('testing vue-router go to Edit Event page', async () => {

    //Arrange
    const id = 1;
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: id
      }
    }))
    const push = vi.fn()
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
      global: {
        stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
      }
    });

    //Act
    wrapper.vm.testRouterEdit();
    //

    //Assert
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith(`/editar-evento/${id}`);

  });


});

