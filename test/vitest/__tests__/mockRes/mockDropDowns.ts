const mockUnits = {
  status: 200,
  result: [
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Centro de Distribuição Direta',
      value: '0'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Centro de Distribuição Compartilhada',
      value: '1'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Revenda ou Franquia',
      value: '2'
    }
  ],
  errorMessage: null
};

const mockBrands = {
  status: 200,
  result: [
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Lowenbrau',
      value: '13'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Serramalte',
      value: '21'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Serrana',
      value: '22'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'StellaArtois',
      value: '1'
    }

  ],
  errorMessage: null
};
const mockPropietarios = {
  status: 200,
  result: [
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Naming',
      value: '0'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Proprietario',
      value: '1'
    }
  ],
  errorMessage: null
};

const novaMarca = {
  status: 200,
  result: {
    name: 'ZZ',
    id: 1
  },
  errorMessage: null
};

export {mockUnits, mockBrands, mockPropietarios, novaMarca};
