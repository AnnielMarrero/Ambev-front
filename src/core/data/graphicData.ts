
export interface Serie {
  name: string;
  data: Array<number>;
}

export interface Grafico {
  series: Array<Serie>;
  name: string;
}


// response from api
export interface ChartData {
  stateId: number;
  name: string;
  approvedPercent: number;
  rejectPercent: number;
  pendentPercent: number;
  expiredPercent: number;
  totalEvent: number;
  totalApproved: number;
  totalExpired: number;
  totalPendent: number;
  totalReject: number;
}

// objecto to request to api
export interface FilterGrafico {
  filter: number;
  unit: number;
  state: number;
  city: string;
  startDate: string;
  endDate: string;
  brandId: number;
}

// model used in Relatorio audit, for send properties to DisplayCharts component
export interface GraficoRelatorio {
  data: FilterGrafico;
  endpoint: string;
  color: string;
  caption: string;
}

//for show farol antig...
export const optionsFarolAntig: GraficoRelatorio = {
  data: {filter: 7 } as FilterGrafico,
  endpoint: '/api/Event/GetEventsInfo',
} as GraficoRelatorio;
