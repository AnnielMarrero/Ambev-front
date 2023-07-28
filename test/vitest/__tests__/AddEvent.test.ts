import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AddEvent from '../../../src/pages/events/AddEvent.vue';
import { Notify } from 'quasar';
import { mockBrands } from './mockRes/mockDropDowns';
import { Select } from '../../../src/core/data/dropdown';



installQuasarPlugin({ plugins: { Notify } });


describe('Add Event Page', () => {

  it('set data (Nome do evento) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = 'Evt testing';
    //Act
    const input = wrapper.find('[data-test="evtName"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });

  it('set data (cep) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = '89898-989';
    //Act
    const input = wrapper.find('[data-test="cep"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });

  it('set data (address) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = 'Rua ...';
    //Act
    const input = wrapper.find('[data-test="address"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });

  it('set data (estimatedAudience) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = '500';
    //Act
    const input = wrapper.find('[data-test="estimatedAudience"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });

  it('set data (investEvent) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = '100';
    //Act
    const input = wrapper.find('[data-test="investEvent"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });



  it('set data (prodName) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = 'Productor A';
    //Act
    const input = wrapper.find('[data-test="prodName"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });

  it('set data (prodTel) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = '587899'
    //Act
    const input = wrapper.find('[data-test="prodTel"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });


  it('set data (email) forms works Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});
    const value = 'proda@gmail.com';
    //Act
    const input = wrapper.find('[data-test="email"]');
    await input.setValue(value);

    //assert
    expect(input.element.value).toBe(value);
  });

  it('get units return Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});

    //Act
    await flushPromises();
    //assert
    //console.log('units', wrapper.vm.units);
    expect(wrapper.vm.units).toHaveLength(3);
  });

  it('get brands return Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});

    //Act
    await flushPromises();
    //assert
    expect(wrapper.vm.brands).toStrictEqual(mockBrands.result.map((m): Select => {
      return { label: m.text, value: parseInt(m.value) };
    }));
  });

  it('get carried out by return Ok', async () => {
    //Arrange
    const wrapper = mount(AddEvent, {});

    //Act
    await flushPromises();
    //assert
    expect(wrapper.vm.namProp).toHaveLength(2);
  });

});

