const mockEventDetails = {
  status: 200,
  result: {
    unit: 'Centro de Distribuição Direta',
    brand: 'Hoegaarden',
    name: 'Evt .net Test',
    startDate: '02-03-2023',
    startTime: '00:00',
    endDate: '24-03-2023',
    endTime: '00:00',
    state: 'RJ',
    city: 'Rio de Janeiro',
    cep: '21540-501',
    adress: 'sasas',
    estimatedAudience: '500',
    invest: '89',
    producerName: 'sasasass',
    producerPhone: '1545454545',
    producerEmail: '',
    carriedOutBy: 'Naming',
    contractedGovernment: true,
    madePublicSpace: false,
    madewithMinors: true,
    riskActivation: true,
    brandActivation: true,
    universityOpenBar: false,
    status: 'Aprovado',
    id: 1,
  },
  errorMessage: null,
};

const mockEventDetails404 = {
  status: 404,
  result: null,
  errorMessage: 'Elemento não encontrado.'
};

const mockEventDetails401 = {
  status: 401,
  result: null,
  errorMessage: 'Request failed with status code 401'
};

export { mockEventDetails, mockEventDetails404, mockEventDetails401 };
