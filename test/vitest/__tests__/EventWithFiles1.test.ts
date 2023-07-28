import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import EventList from '../../../src/pages/events/EventList.vue';
import { Notify } from 'quasar';


//https://test-utils.vuejs.org/guide/advanced/vue-router.html#using-a-mocked-router-with-composition-api
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    push: () => { }
  }))
}))


installQuasarPlugin({ plugins: { Notify } });

describe('Events List page', () => {

  it('show file is NOT visible', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    //Act
    wrapper.vm.showFileArea(false);

    //Assert
    expect(wrapper.vm.isFileShowed).toBe(false);
  });

  it('Approve event successfully', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    wrapper.vm.currEvtId = 1;
    await wrapper.vm.aprobarEvt();

    //Assert
    expect(spy).toHaveBeenCalledOnce();
  });

  it('Approve event can NOT be done because 400 error', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    wrapper.vm.currEvtId = 0;
    await wrapper.vm.aprobarEvt();
    await flushPromises();

    //Assert
    expect(spy).toHaveBeenCalledOnce();
  });

});

