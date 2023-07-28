interface Event {
  madePublicSpace: boolean;
  contractedGovernment: boolean;
  madewithMinors: boolean;
  riskActivation: boolean;
  brandActivation: boolean;
  universityOpenBar: boolean;
  carriedOutBy: number; //naming or propietario
  id: number;
  name: string;
  startDate: string;
  status: number;
  unit: number;
  adress: string;
  brandId: number;
  endDate: string;
  state: string;
  city: string;
  cep: string;
  estimatedAudience: number;
  invest: number;
  producerName: string;
  producerPhone: string;
  producerEmail: string;
  validationEmailArchiveId: number | null;
  eventCharterId: number | null;
  fireDepartmentInspectionReportId: number | null;
  civilFireServiceContractId: number | null;
  mobileContractId: number | null;
  privateSecurityContractId: number | null;
  sponsorshipAgreementId: number | null;

}

// used for associated files that belong to an event
export interface DocEvt {
  color: string;
  disabled: boolean;
  src: string;
  file: File;
  category: string;
  label: string;
  docId: number | null;
  status: number | null;
  rejectionReason: string | null;
}

export default Event;
