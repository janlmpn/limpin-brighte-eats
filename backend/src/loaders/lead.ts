import {
  BatchedLoader,
  BatchedSQLDataSource,
  BatchedSQLDataSourceProps,
} from "@nic-jennings/sql-datasource";
import { 
  LeadModel, 
  InputLeadModel, 
  LeadServiceModel, 
  ServiceModel,
  LeadsPaginationModel
 } from "../models";

export class LeadLoader extends BatchedSQLDataSource {
  constructor(config: BatchedSQLDataSourceProps) {
    super(config);
  }

  async getLeads(limit: number = 10, offset: number = 0): Promise<LeadsPaginationModel> {
    const [leadsResult, [{totalCount}]] = await Promise.all([
      this.db.query.select("*")
      .from("lead")
      .limit(limit)
      .offset(offset),
      this.db.query.select()
      .from("lead")
      .count("*", {as: "totalCount"})
    ])

    const leads = await Promise.all(
      leadsResult.map(async (lead: any) => {
        const servicesResult = await this.getLeadServices(lead.id);
        return {
          ...lead,
          services: servicesResult,
        };
      })
    );

    return {
      leads,
      totalCount
    };
  }

  async getLead(param: string, byEmail: boolean = false): Promise<LeadModel | null> {
    const lead: LeadModel = await this.db.query
      .select("*").from("lead")
      .where(
        byEmail ? "email" : "id", 
        param)
      .first();
    if(lead){
      lead.services = await this.getLeadServices(lead.id);
    }
    return lead;
  }

  getLeadServices(id: string): Promise<ServiceModel[]> {
    return this.db.query
      .select(['s.id', 's.name'])
      .from({ s: 'service'})
      .innerJoin( { ls : 'lead_service' }, 's.id', '=', "ls.service_id" )
      .where('ls.lead_id', id);
  }

  async insertLead(lead: InputLeadModel): Promise<LeadModel> {

    const leadServiceToInsert:LeadServiceModel[] = [];
    for (const service of lead.services) {
      
      // check if service is existing, ignore any non existing ids
      const existingService = await this.db.query.select("id")
        .from("service")
        .where("id", service);
      if (existingService.length > 0) {
        leadServiceToInsert.push({
          lead_id: lead.id,
          service_id: service,
        });
      }else{
        throw new Error('Selected service not existing!');
      }       
           
    }

    // check lead and services in the lead_services table
    for (const { service_id } of leadServiceToInsert) {
      const existingLeadService = await this.db.query('lead_service')
        .where('lead_id', lead.id)
        .andWhere('service_id', service_id)
      
      if(existingLeadService.length > 0){
        throw new Error('Lead ID and service ID already exists. This should not happen.');
      }
    }
    const leadToInsert = {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      mobile: lead.mobile,
      postcode: lead.postcode
    }
    await this.db.write.insert([leadToInsert]).into('lead');
    await this.db.write.insert(leadServiceToInsert).into('lead_service')

    return this.getLead(lead.id);
  }

  getServices(): Promise<ServiceModel[]> {
    return this.db.query.select('*').from('service');
  }

}