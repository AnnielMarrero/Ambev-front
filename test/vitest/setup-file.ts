// This file will be run before each test file

import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockEventDetails, mockEventDetails401, mockEventDetails404 } from './__tests__/mockRes/mockEventDetails';
import { mockAprovarEvt400, mockEventList, mockEventReject400, mockEventRejectOK, mockEvtRejectRes,
  mockEventFiles } from './__tests__/mockRes/mockEventList';

import dotenv from 'dotenv'
import { InteractionStatus } from '@azure/msal-browser';
import { ref } from 'vue';
import { mockBrands, mockPropietarios, mockUnits, novaMarca } from './__tests__/mockRes/mockDropDowns';
import { mockEventEdit } from './__tests__/mockRes/mockEventEdit';
import { mockFarol } from './__tests__/mockRes/mockFarol';
import { mockAprovadosResp, mockBrandResp, mockBrasilResp, mockFilters, mockPeriodoResp, mockStates } from './__tests__/mockRes/mockRelAudit';
import { HttpStatusCode } from 'axios';


dotenv.config(); // load env vars from .env

const baseUrl = process.env.VUE_APP_API_URL;
//console.log('Setup');

//mocking msal
vi.mock('../../src/authConfig', () => ({
  getActiveAccount: () => ({}),
  getToken: () => Promise.resolve('token'),
  loginRequest: () => ({
    scopes: ['fake scope'],
  })
}));

vi.mock('../../src/composition-api/useMsal', () => ({
  useMsal: () => ({
    instance: '',
    accounts: ref([{idTokenClaims: {preferred_username: 'username'}}]),
    inProgress: InteractionStatus.Startup
  })
}));

//end msal

export const restHandlers = [

  rest.get(`${baseUrl}/api/Event/GetById/:id`, (req, res, ctx) => {
    //console.log('pase id-- evtDetails ');
    const { id } = req.params;

    const idNumb = parseInt(id as string);

    let httpStatus = 0;
    let mockResp = null;
    if (idNumb > 0) {
      httpStatus = HttpStatusCode.Ok;
      mockResp = mockEventDetails
    } else if (idNumb === 0) {
      httpStatus = HttpStatusCode.NotFound;
      mockResp = mockEventDetails404
    } else {
      httpStatus = HttpStatusCode.Unauthorized;
      mockResp = mockEventDetails401
    }

    return res(
      ctx.status(httpStatus),
      ctx.json(mockResp)
    );
  }),

  rest.get(`${baseUrl}/api/Event/GetPaginatedList`, (req, res, ctx) => {

    const unit = parseInt(req.url.searchParams.get('Unit'));
    const date = req.url.searchParams.get('Date');

    //console.log(req.url.searchParams.get('Unit'), unit, date);
    //console.log('length:', mockEventList.result.items.length);

    const aux = JSON.parse(JSON.stringify(mockEventList)); //cloning the object in this way
    //console.log("aux",aux);
    let result = aux.result.items;
    if(unit >= 0)
      result = result.filter(x => x.unit === unit);
    if(date && date.length > 0 ) {
      result = result.filter(x => x.startDate.split(' ')[0] === date);
    }
    //mockEventList.result.items = result;
    aux.result.items = result;
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json(aux)
    );
  }),

  //reject event
  rest.get(`${baseUrl}/api/Event/RejectEvent/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const idNumb = parseInt(id as string);

    return res(
      ctx.status(idNumb ? HttpStatusCode.Ok : HttpStatusCode.BadRequest),
      ctx.json(idNumb ? '' : mockEventReject400)
    );
  }),

  //reject file
  rest.get(`${baseUrl}/api/Archive/RejectArchive`, (req, res, ctx) => {
    const ArchiveId = parseInt(req.url.searchParams.get('ArchiveId'));
    //console.log("archiveId" , ArchiveId);
    return res(
      ctx.status(ArchiveId ? HttpStatusCode.Ok : HttpStatusCode.BadRequest),
      ctx.json(ArchiveId ? mockEventRejectOK : mockEvtRejectRes)
    );
  }),

  //approve event
  rest.get(`${baseUrl}/api/Event/ApproveEvent/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const idNumb = parseInt(id as string);
    //console.log('id:',idNumb);
    return res(
      ctx.status(idNumb ? HttpStatusCode.Ok : HttpStatusCode.BadRequest),
      ctx.json(idNumb ? mockEventRejectOK : mockAprovarEvt400)
    );
  }),

  //show files associated to an event
  rest.get(`${baseUrl}/api/Archive/GetUploadedArchives`, (req, res, ctx) => {
    //const eventId = parseInt(req.url.searchParams.get('eventId'));
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json( mockEventFiles)
    );
  }),

  //load units
  rest.get(`${baseUrl}/api/Enum/GetUnitsDropdownItems`, (req, res, ctx) => {
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json( mockUnits)
    );
  }),

  //load brands
  rest.get(`${baseUrl}/api/Brand/GetDropdownItems`, (req, res, ctx) => {
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json( mockBrands)
    );
  }),

  //
  rest.get(`${baseUrl}/api/Enum/GetEventMakersDropdownItems`, (req, res, ctx) => {
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json( mockPropietarios)
    );
  }),

  //nova marca
  rest.post(`${baseUrl}/api/Brand/Add`, async (req, res, ctx) => {
    const {name} = await req.json();
    //console.log("Body",  name);
    return res(
      ctx.status(name.length === 2 ? HttpStatusCode.Ok : HttpStatusCode.BadRequest),
      ctx.json(name.length === 2 ? novaMarca : {})
    );
  }),

  //get Event by id
  rest.get(`${baseUrl}/api/Event/GetForEdit/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const idNumb = parseInt(id as string);
    //console.log("id:",idNumb);
    return res(
      ctx.status(idNumb ? HttpStatusCode.Ok : HttpStatusCode.NotFound),
      ctx.json(idNumb ? mockEventEdit : {})
    );
  }),

  //update Event by id
  rest.put(`${baseUrl}/api/Event/Update/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const idNumb = parseInt(id as string);
    //console.log('idA:',idNumb);
    return res(
      ctx.status(idNumb ? HttpStatusCode.Ok : HttpStatusCode.BadRequest),
      ctx.json(idNumb ? mockEventEdit : {error: 'Error'})
    );
  }),

   //load filters
   rest.get(`${baseUrl}/api/Enum/GetFilterEnventsDropdownItems`, (req, res, ctx) => {
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json(mockFilters)
    );
  }),

  //load states by region
  rest.get(`${baseUrl}/api/RegionStateCity/GetSatesPerRegions`, (req, res, ctx) => {
    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json(mockStates)
    );
  }),

  //load graphicis with filters
  rest.post(`${baseUrl}/api/Event/GetEventsInfo`, async (req, res, ctx) => {
    const {filter} = await req.json();
    //console.log('Data', filter);
    let resp = undefined;
    if(filter < 3){
      resp = mockAprovadosResp;
    } else if (filter === 3){ //no aprobvados
      resp = mockPeriodoResp;
    } else if (filter === 4) {
      resp = mockBrandResp;
    } else if (filter === 5) {
      resp = mockBrasilResp;
    } else if(filter === 7) {
      resp = mockFarol;
    }

    return res(
      ctx.status(HttpStatusCode.Ok),
      ctx.json(resp)
    );
  }),

];
const server = setupServer(...restHandlers);
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
//  Close server after all tests
afterAll(() => server.close());
// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
});
