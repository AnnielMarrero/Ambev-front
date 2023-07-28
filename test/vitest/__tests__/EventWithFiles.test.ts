import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
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

  it('is required reason for reject file', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    //Act
    wrapper.vm.showRechazarFile(0);
    wrapper.vm.group = '6';
    wrapper.vm.reason = 'blaXbla';
    await wrapper.vm.rechazarArquivo();

    //Assert
    expect(wrapper.vm.reason.length).toBeGreaterThan(0);

  });

  it('file is rejected when a reason is fullfilled', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    //Act
    wrapper.vm.showRechazarFile(1);
    wrapper.vm.group = '6';
    wrapper.vm.reason = 'bla bla';
    await wrapper.vm.rechazarArquivo();
    //await flushPromises();
    //Assert
    expect(wrapper.vm.reason).toBe(''); //clear reasons
  });

  it('file can NOT be rejected, response is 400 error', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    wrapper.vm.showRechazarFile(0);
    wrapper.vm.group = '1';
    await wrapper.vm.rechazarArquivo();

    //Assert
    expect(spy).toHaveBeenCalledOnce();
  });

  it('show file associated to a given event', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });
    const flag = true;
    const path = 'path';
    const reason = 'rejected because...';

    //Act
    wrapper.vm.showFileArea(flag, path, reason );

    //Assert
    expect(wrapper.vm.isFileShowed).toBe(flag);
    expect(wrapper.vm.srcFile).toBe(path);
    expect(wrapper.vm.rejectionReason).toBe(reason);
  });


});

