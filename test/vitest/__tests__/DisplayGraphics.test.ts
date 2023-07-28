import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DisplayGraphics from '../../../src/components/charts/DisplayGraphics.vue';
import { Notify } from 'quasar';
import { optionsFarolAntig } from 'src/core/data/graphicData';
import { FilterGrafico, GraficoRelatorio } from '../../../src/core/data/graphicData';

installQuasarPlugin({ plugins: { Notify } });
const endpoint = '/api/Event/GetEventsInfo';

describe('DisplayGraphics component', () => {

  it('check leyend have 3 items', async () => {
    //Arrange
    const wrapper = mount(DisplayGraphics, {});
    //Act
    //assert
    expect(wrapper.findAll('.q-icon')).toHaveLength(3);
  });

  it('The information of Farol Antigimento is loaded correctly', async () => {
    //Arrange
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: optionsFarolAntig
      }
    });

    //Act
    await flushPromises();
    //assert
    expect(wrapper.vm.graficos).toHaveLength(4);
  });

  it('testing graphic (SP) info', async () => {
    //Arrange
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: optionsFarolAntig
      }
    });

    //Act
    await flushPromises();

    //assert
    const sp = wrapper.vm.graficos[2];
    expect(sp.name).toBe('SP');
    expect(sp.series[0].data).toStrictEqual([52, 5, 41]);
  });

  //one col
  it('testing graphic one column (Aprobados)', async () => {

    //Arrange
    const caption = 'Aprovado';
    const color = '#21BA45';
    const data: FilterGrafico = {
      filter: 0,
      unit: 0,
      state: 0,
      city: '',
      startDate: '',
      endDate: '',
      brandId: 0,
    };
    const graphicsConfig: GraficoRelatorio = {
      data: data,
      color: color,
      caption: caption,
      endpoint: endpoint,
    };
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: graphicsConfig,
        oneColumn: true
      },
    });

    //Act
    await flushPromises();

    //assert
    expect(wrapper.vm.$props.resource.caption).toBe(caption);
    expect(wrapper.vm.chartOptions.colors[0]).toBe(color);

  });

  it('testing graphic one column (Nao Aprobados)', async () => {
    //Arrange
    const caption = 'Reprovado';
    const color = '#C10015';
    const data: FilterGrafico = {
      filter: 1,
      unit: 0,
      state: 0,
      city: '',
      startDate: '',
      endDate: '',
      brandId: 0,
    };
    const graphicsConfig: GraficoRelatorio = {
      data: data,
      color: color,
      caption: caption,
      endpoint: endpoint,
    };
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: graphicsConfig,
        oneColumn: true
      },
    });

    //Act
    await flushPromises();

    //assert
    //const names = wrapper.vm.graficos
    expect(wrapper.vm.$props.resource.caption).toBe(caption);
    expect(wrapper.vm.chartOptions.colors[0]).toBe(color);

  });

  //3 cols
  it('testing graphic tree column (Visao Periodo)', async () => {
    //Arrange
    const data : FilterGrafico = {
      filter: 3,
      unit: 0,
      state: 0,
      city: '',
      startDate: '11-01-2023 00:00',
      endDate: '26-05-2023 00:00',
      brandId: 0,
    };
    const graphicsConfig: GraficoRelatorio = {
      data: data,
      color: '',
      caption: '',
      endpoint: endpoint
    };
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: graphicsConfig
      },
    });

    //Act
    await flushPromises();

    //assert
    expect(wrapper.findAll('.caption')).toHaveLength(4);
    expect(wrapper.text()).toContain('RJ/ES');
  });

  it('testing graphic tree column (Marca)', async () => {
    //Arrange
    const data : FilterGrafico = {
      filter: 4,
      unit: 0,
      state: 0,
      city: '',
      startDate: '11-01-2023 00:00',
      endDate: '26-05-2023 00:00',
      brandId: 7,
    };
    const graphicsConfig: GraficoRelatorio = {
      data: data,
      color: '',
      caption: '',
      endpoint: endpoint
    };
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: graphicsConfig
      },
    });

    //Act
    await flushPromises();

    //assert
    //const names = wrapper.vm.graficos
    expect(wrapper.findAll('.caption')).toHaveLength(2);
    expect(wrapper.text()).toContain('SP');
  });

  it('testing graphic tree column (Nivel Brasil)', async () => {
    //Arrange
    const data : FilterGrafico = {
      filter: 5,
      unit: 0,
      state: 0,
      city: '',
      startDate: '',
      endDate: '',
      brandId: 0,
    };
    const graphicsConfig: GraficoRelatorio = {
      data: data,
      color: '',
      caption: '',
      endpoint: endpoint
    };
    const wrapper = mount(DisplayGraphics, {
      props: {
        resource: graphicsConfig
      },
    });

    //Act
    await flushPromises();

    //assert
    expect(wrapper.findAll('.caption')).toHaveLength(1);
    expect(wrapper.text()).toContain('Brasil');
  });
  //end one col
});


