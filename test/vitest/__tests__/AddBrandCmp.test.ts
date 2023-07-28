import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import AddBrandCmp from '../../../src/components/AddBrandCmp.vue';
import { Notify } from 'quasar';

installQuasarPlugin({ plugins: { Notify } });


describe('Add Event Page', () => {

  it('cadastrar nova marca con succeso', async () => {
    //Arrange
    const wrapper = mount(AddBrandCmp, {
      props: {
        prompt: true
      }
    });

    //Act
    wrapper.vm.brandName = 'BM'; //2 length
    const respId = await wrapper.vm.addBrand();
    //assert
    expect(respId).toBe(1);
  });

  it('cadastrar nova marca return BadRequest', async () => {
    //Arrange
    const wrapper = mount(AddBrandCmp, {
      props: {
        prompt: true
      }
    });
    const spy = vi.spyOn(Notify, 'create');

    //Act
    wrapper.vm.brandName = 'BMM';
    const respId = await wrapper.vm.addBrand();

    //assert
    expect(respId).toBe(-1);
    expect(spy).toHaveBeenCalledOnce();
  });

});

