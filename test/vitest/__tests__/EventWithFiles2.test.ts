import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { describe, expect, it } from 'vitest';
import EventList from '../../../src/pages/events/EventList.vue';
import { Dialog } from 'quasar';
import { Notify } from 'quasar';
import { mount } from '@vue/test-utils';


installQuasarPlugin({ plugins: { Dialog } });
installQuasarPlugin({ plugins: { Notify } });

describe('Events List page', () => {

  it('listing files associated to an event', async () => {

    //Arrange
    const wrapper = mount(EventList, {
      props: {
        showDialogTest: false
      },
    });

    //act
    await wrapper.vm.showFiles(1);

    //Assert
    expect(wrapper.vm.docEvts[0].label).toBe('Alvará do evento');
    expect(wrapper.vm.docEvts[0].category).toBe('1');
    expect(wrapper.vm.docEvts[0].status).toBe(0);

    expect(wrapper.vm.docEvts[1].label).toBe('Auto de Vistoria do Corpo de Bombeiros (AVCB)');
    expect(wrapper.vm.docEvts[1].category).toBe('3');
    expect(wrapper.vm.docEvts[1].status).toBe(1);
    expect(wrapper.vm.docEvts[1].rejectionReason).toBe('O documento apresentado não se refere ao evento cadastrado');

    expect(wrapper.vm.docEvts[2].label).toBe('Contrato de Bombeiros Civis');
    expect(wrapper.vm.docEvts[2].category).toBe('4');
    expect(wrapper.vm.docEvts[2].status).toBe(1);

    expect(wrapper.vm.docEvts[6].label).toBe('Autorização da Área de compliance');
    expect(wrapper.vm.docEvts[6].category).toBe('0');
    expect(wrapper.vm.docEvts[6].color).toBe('orange');
  });
});

