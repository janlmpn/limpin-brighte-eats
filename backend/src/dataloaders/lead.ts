import {
  BatchedLoader,
  BatchedSQLDataSource,
  BatchedSQLDataSourceProps,
} from "@nic-jennings/sql-datasource";
import { LeadModel } from "../models";

export class LeadLoader extends BatchedSQLDataSource {
  getLeadsBatched: BatchedLoader<string, LeadModel[]>;

  constructor(config: BatchedSQLDataSourceProps) {
    super(config);

    this.getLeadsBatched = this.db.query
      .select("*")
      .from({ l: "lead" })
      .batch(async (query, keys) => {
        const result = await query.whereIn("l.id", keys);
        return keys.map((x) =>
          result?.filter((y: LeadModel) => y.id === x)
        );
      });
  }

  getLeads(): Promise<LeadModel[]> {
    return this.db.query.select("*").from("lead");
  }

}