export type LeadModel = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: ServiceModel[]
}

export type LeadsPaginationModel = {
  leads: LeadModel[]
  totalCount: number;
}

export type InputLeadModel = Omit<LeadModel, 'services'> & {
  services: string[]
}

export type ServiceModel = {
  id: string;
  name: string;
}

export type LeadServiceModel = {
  lead_id: string;
  service_id: string;
}