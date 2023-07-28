import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RelAudit from '../../../src/pages/relatorios/RelAudit.vue';
import { Notify } from 'quasar';
import { Select } from '../../../src/core/data/dropdown';


installQuasarPlugin({ plugins: { Notify } });


describe('RelAudit page', () => {

  it('get filters return Ok', async () => {
    //Arrange
    const wrapper = mount(RelAudit, {});

    //Act
    await flushPromises();

    //assert
    expect(wrapper.vm.filters).toHaveLength(7);
    expect(wrapper.vm.filters[0].label).toBe('Aprovados');
    expect(wrapper.vm.filters[4].label).toBe('Visão por Marca');
  });

  it('get states by region return Ok', async () => {
    //Arrange
    const wrapper = mount(RelAudit, {});

    //Act
    const sel: Select = {
      label: '',
      value: 5
    };
    await wrapper.findComponent({ ref: 'stateSel' }).setValue(sel);
    await flushPromises();

    //assert
    expect(wrapper.vm.states).toHaveLength(1);
    expect(wrapper.vm.states[0].label).toBe('SP');
  });

  it('change filter option 1 return Ok', async () => {
    //Arrange
    const wrapper = mount(RelAudit, {});

    //Act
    const sel: Select = {
      label: '',
      value: 2
    };
    await wrapper.findComponent({ ref: 'filterSel' }).setValue(sel);
    await flushPromises();

    //assert
    expect(wrapper.vm.graphicsConfig.color).toBe(wrapper.vm.colors[sel.value]);
  });

  it('change filter option 2 return Ok', async () => {
    //Arrange
    const wrapper = mount(RelAudit, {});

    //Act
    const sel: Select = {
      label: '',
      value: 6
    };
    await wrapper.findComponent({ ref: 'filterSel' }).setValue(sel);
    await flushPromises();

    //assert
    expect(wrapper.vm.regionMod).toBeUndefined();
  });

  it('change filteroption 3 return Ok', async () => {
    //Arrange
    const wrapper = mount(RelAudit, {});

    //Act
    const sel: Select = {
      label: '',
      value: 3
    };
    await flushPromises();
    const componentKey = wrapper.vm.componentKey;
    await wrapper.findComponent({ ref: 'filterSel' }).setValue(sel);
    //await flushPromises();

    //assert
    expect(wrapper.vm.componentKey).toBe(componentKey+1);
  });

  it('change filter option 4 retunr Ok', async () => {
    //Arrange
    const wrapper = mount(RelAudit, {});

    //Act
    const sel: Select = {
      label: '',
      value: 1
    };
    await flushPromises();
    const componentKey = wrapper.vm.componentKey;
    await wrapper.findComponent({ ref: 'filterSel' }).setValue(sel);
    //await flushPromises();

    //assert
    expect(wrapper.vm.componentKey).toBe(componentKey+1);
  });

});

