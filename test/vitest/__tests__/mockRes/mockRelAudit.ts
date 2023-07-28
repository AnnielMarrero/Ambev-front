const mockFilters = {
  status: 200,
  result: [
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Aprovados',
      value: '0'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Não Aprovados',
      value: '1'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Expirados por falta de documento',
      value: '2'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Visão por Período',
      value: '3'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Visão por Marca',
      value: '4'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Visão nivel Brasil',
      value: '5'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Visão por Regional',
      value: '6'
    },
    {
      disabled: false,
      group: null,
      selected: false,
      text: 'Faron Antig',
      value: '6'
    }
  ],
  errorMessage: null
};

const mockStates = [
  {
    name: 'SP',
    abbr: 'SP',
    regionID: 7,
    id: 13,
    createdAt: '0001-01-01T00:00:00',
    createdBy: '',
    updatedAt: '0001-01-01T00:00:00',
    updatedBy: ''
  }
];

const mockAprovadosResp = [
  {
    stateId: 0,
    name: 'NE',
    approvedPercent: 0,
    rejectPercent: 100,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 2,
    totalApproved: 0,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 2
  },
  {
    stateId: 0,
    name: 'RJ/ES',
    approvedPercent: 45,
    rejectPercent: 54,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 11,
    totalApproved: 5,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 6
  },
  {
    stateId: 0,
    name: 'SP',
    approvedPercent: 52,
    rejectPercent: 41,
    pendentPercent: 5,
    expiredPercent: 5,
    totalEvent: 17,
    totalApproved: 9,
    totalExpired: 1,
    totalPendent: 1,
    totalReject: 7
  },
  {
    stateId: 0,
    name: 'SUL',
    approvedPercent: 0,
    rejectPercent: 100,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 3,
    totalApproved: 0,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 3
  }
];

const mockPeriodoResp =[
  {
    stateId: 0,
    name: 'NE',
    approvedPercent: 0,
    rejectPercent: 100,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 2,
    totalApproved: 0,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 2
  },
  {
    stateId: 0,
    name: 'RJ/ES',
    approvedPercent: 45,
    rejectPercent: 54,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 11,
    totalApproved: 5,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 6
  },
  {
    stateId: 0,
    name: 'SP',
    approvedPercent: 52,
    rejectPercent: 41,
    pendentPercent: 5,
    expiredPercent: 5,
    totalEvent: 17,
    totalApproved: 9,
    totalExpired: 1,
    totalPendent: 1,
    totalReject: 7
  },
  {
    stateId: 0,
    name: 'SUL',
    approvedPercent: 0,
    rejectPercent: 100,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 3,
    totalApproved: 0,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 3
  }
];

const mockBrandResp = [
  {
    stateId: 0,
    name: 'RJ/ES',
    approvedPercent: 100,
    rejectPercent: 0,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 1,
    totalApproved: 1,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 0
  },
  {
    stateId: 0,
    name: 'SP',
    approvedPercent: 100,
    rejectPercent: 0,
    pendentPercent: 0,
    expiredPercent: 0,
    totalEvent: 1,
    totalApproved: 1,
    totalExpired: 0,
    totalPendent: 0,
    totalReject: 0
  }
];
const mockBrasilResp = [
  {
    stateId: 0,
    name: 'Brasil',
    approvedPercent: 42,
    rejectPercent: 54,
    pendentPercent: 3,
    expiredPercent: 3,
    totalEvent: 33,
    totalApproved: 14,
    totalExpired: 1,
    totalPendent: 1,
    totalReject: 18
  }
];

export {mockFilters, mockStates, mockAprovadosResp, mockPeriodoResp , mockBrandResp, mockBrasilResp}
