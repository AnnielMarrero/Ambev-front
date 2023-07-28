import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FarolAtingimento from '../../../src/pages/farolAntigimento/FarolAtingimento.vue';
import { Notify } from 'quasar';


installQuasarPlugin({ plugins: { Notify } });


describe('FarolAtingimento page', () => {

  it('Header of the page set correctly', async () => {
    //Arrange
    const wrapper = mount(FarolAtingimento, {});
    //Act

    //assert
    expect(wrapper.find('[data-test="title-farol"]').text()).toBe('Farol de Atingimento de Eventos');
  });

});

