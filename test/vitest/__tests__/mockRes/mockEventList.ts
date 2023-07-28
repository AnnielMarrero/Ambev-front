const mockEventList = {
  status: 200,
  result: {
    totalCount: 33,
    items: [
      {
        id: 40,
        name: 'Evt last test',
        startDate: '29-03-2023 00:00',
        status: 1,
        unit: 1
      },
      {
        id: 39,
        name: 'sasas',
        startDate: '10-03-2023 00:00',
        status: 0,
        unit: 0
      },
      {
        id: 38,
        name: 'Evt test 01',
        startDate: '25-03-2023 00:00',
        status: 2,
        unit: 0
      },
      {
        id: 37,
        name: 'ERRRR',
        startDate: '29-03-2023 00:00',
        status: 0,
        unit: 0
      },
      {
        id: 36,
        name: 'Evt new',
        startDate: '08-03-2023 00:00',
        status: 0,
        unit: 2
      },
      {
        id: 35,
        name: 'ggfgfg',
        startDate: '10-03-2023 00:00',
        status: 1,
        unit: 1
      },
      {
        id: 34,
        name: 'Evt yo',
        startDate: '09-03-2023 00:00',
        status: 1,
        unit: 1
      },
      {
        id: 33,
        name: 'evt r22',
        startDate: '22-03-2023 00:00',
        status: 2,
        unit: 0
      },
      {
        id: 32,
        name: 'Evt router',
        startDate: '22-03-2023 00:00',
        status: 1,
        unit: 0
      },
      {
        id: 31,
        name: 'Evt valid',
        startDate: '01-03-2023 00:00',
        status: 1,
        unit: 0
      },
      {
        id: 30,
        name: 'Evt puma',
        startDate: '02-03-2023 00:00',
        status: 0,
        unit: 1
      },
      {
        id: 29,
        name: 'Evt async 0',
        startDate: '24-03-2023 00:00',
        status: 2,
        unit: 0
      },
      {
        id: 28,
        name: 'Evt Anniel',
        startDate: '02-03-2023 02:25',
        status: 2,
        unit: 0
      },
      {
        id: 27,
        name: 'Evt java',
        startDate: '12-03-2023 20:20',
        status: 1,
        unit: 1
      },
      {
        id: 26,
        name: 'evt .net0',
        startDate: '16-03-2023 12:00',
        status: 1,
        unit: 2
      },
      {
        id: 25,
        name: 'Evt .net Test',
        startDate: '02-03-2023 00:00',
        status: 1,
        unit: 0
      },
      {
        id: 24,
        name: 'Evt 1000',
        startDate: '13-03-2023 19:35',
        status: 2,
        unit: 0
      },
      {
        id: 23,
        name: 'Evt Vue.js',
        startDate: '09-03-2023 12:00',
        status: 2,
        unit: 0
      },
      {
        id: 22,
        name: 'Evt q11',
        startDate: '09-03-2023 12:00',
        status: 1,
        unit: 2
      },
      {
        id: 21,
        name: 'Evt q2',
        startDate: '09-03-2023 00:00',
        status: 2,
        unit: 1
      },
      {
        id: 20,
        name: 'Evt q1',
        startDate: '22-03-2023 12:00',
        status: 2,
        unit: 2
      },
      {
        id: 19,
        name: 'dsdsd',
        startDate: '10-03-2023 00:00',
        status: 1,
        unit: 1
      },
      {
        id: 18,
        name: 'Quasar',
        startDate: '09-03-2023 12:00',
        status: 2,
        unit: 0
      },
      {
        id: 17,
        name: 'sasasa',
        startDate: '10-03-2023 15:04',
        status: 2,
        unit: 0
      },
      {
        id: 16,
        name: 'Evt',
        startDate: '09-03-2023 00:00',
        status: 2,
        unit: 0
      },
      {
        id: 15,
        name: 'Evt',
        startDate: '09-03-2023 00:00',
        status: 2,
        unit: 0
      },
      {
        id: 13,
        name: 'sas',
        startDate: '10-03-2023 15:04',
        status: 2,
        unit: 0
      },
      {
        id: 12,
        name: 'asasas',
        startDate: '10-03-2023 15:04',
        status: 1,
        unit: 1
      },
      {
        id: 11,
        name: 'Jose Jose',
        startDate: '03-03-2023 11:38',
        status: 2,
        unit: 2
      },
      {
        id: 10,
        name: 'Rodrigo Camargo',
        startDate: '02-03-2023 16:39',
        status: 2,
        unit: 1
      },
      {
        id: 3,
        name: 'Evt C',
        startDate: '07-02-2023 03:30',
        status: 2,
        unit: 0
      },
      {
        id: 2,
        name: 'Evt B',
        startDate: '14-02-2023 15:09',
        status: 2,
        unit: 0
      },
      {
        id: 1,
        name: 'asasas',
        startDate: '27-02-2023 15:09',
        status: 2,
        unit: 0
      }
    ]
  },
  errorMessage: null
};

const mockEventReject400 = {
  status: 400,
  result: null,
  errorMessage: 'A exclusão só pode ser realizada até um dia antes do evento'
};

const mockEventRejectOK = {
  status: 200,
  result: null,
  errorMessage: null
};

const mockAprovarEvt400 = {
  status: 400,
  result: null,
  errorMessage: 'Existem arquivos não aprovados neste evento'
};


const mockEvtRejectRes = {status:200,result:null,errorMessage:null};

const mockEventFiles = [
  {
    id: 244,
    category: 1,
    fileName: 'b5654c35-035b-4768-a9b4-448687bc4b96.pdf',
    status: 0,
    rejectionReason: null
  },
  {
    id: 242,
    category: 6,
    fileName: 'aef87a39-966d-42f1-9cba-7135a24837ba.pdf',
    status: null,
    rejectionReason: null
  },
  {
    id: 241,
    category: 3,
    fileName: '5beaae96-ba67-46f3-a0f6-72ccbf1c0286.pdf',
    status: 1,
    rejectionReason: 'O documento apresentado não se refere ao evento cadastrado'
  },
  {
    id: 233,
    category: 0,
    fileName: 'bcaa65f3-6a99-49b4-84e5-a5a3cd73e802.pdf',
    status: 1,
    rejectionReason: 'Outro comentário: Mario junior'
  },
  {
    id: 231,
    category: 7,
    fileName: 'be9ff619-0f08-4bc7-be88-f92be2942bde.pdf',
    status: 1,
    rejectionReason: 'O contrato apresentado não está assinado pelas partes'
  },
  {
    id: 229,
    category: 5,
    fileName: 'd621bc85-5ae7-4f76-a6e4-841999b03651.pdf',
    status: 1,
    rejectionReason: 'O documento apresentado não se refere ao evento cadastrado'
  },
  {
    id: 228,
    category: 4,
    fileName: '1f01c4a3-25b5-4521-8ddb-a5c6ace62c6c.pdf',
    status: 1,
    rejectionReason: 'O documento apresentado é um protocolo, não o documento final expedido pelo órgão público'
  }
];

export { mockEventList, mockEventReject400, mockEventRejectOK, mockEvtRejectRes, mockAprovarEvt400, mockEventFiles };
