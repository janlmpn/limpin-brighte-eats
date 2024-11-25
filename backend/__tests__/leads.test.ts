import { createTestServer } from '../src/test-utils/test-helper';
import { db } from '../src/test-utils/test-db-config';
import { insertLeadGQL, getLeadsGQL, getSpecificLead } from '../src/test-utils/test-queries';
import { LeadLoader } from '../src/dataloaders'

let server = null;
let leadLoader = null;

beforeAll(async () => {
  // run the migrations and do any other thing here
  server = await createTestServer();
  await db.migrate.latest()
  leadLoader = new LeadLoader({ knexConfig: db });
})

describe('GraphQL API Leads Mutations test', () => {

  /** TODO
   *  - test for uniqueness of email
   */

  it('should insert a new lead', async () => {

    const variables = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: ['abc', 'abd'],
    };

    
    const result: any = await server.executeOperation(
      {
        query: insertLeadGQL,
        variables
      },
      {
        contextValue: {
          dataSources: {
            leadLoader
          },
        }
      }

    );

    expect(result.body.kind).toBe("single");
    expect(result.body.singleResult.data.insertLead.lead).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: [
        {
          "id": "abc",
          "name": "hello"
        },
        {
          "id": "abd",
          "name": "world"
        }
      ],
    });
  });

  it('should throw an error if service is invalid', async () => {

    const variables = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: ['non-existing'],
    };

    const leadLoader = new LeadLoader({ knexConfig: db });
    
    const result: any = await server.executeOperation(
      {
        query: insertLeadGQL,
        variables
      },
      {
        contextValue: {
          dataSources: {
            leadLoader
          },
        }
      }

    );
    expect(result.body.kind).toBe("single");
    expect(result.body.singleResult.errors).toBeTruthy();
    expect(result.body.singleResult.errors[0].message).toBe('Selected service not existing!');
  });


});


describe('GraphQL API Queries', () => {
  let insertedLeadID = null;
  beforeAll(async () => {
    await db.migrate.down();
    await db.migrate.latest();
    // insert dummy lead first disregarding the leads from mutation suite
    const variables = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '1234567890',
      postcode: '12345',
      services: ['abc', 'abd'],
    };

    const result: any = await server.executeOperation(
      {
        query: insertLeadGQL,
        variables
      },
      {
        contextValue: {
          dataSources: {
            leadLoader
          },
        }
      }
    );

    insertedLeadID = result.body.singleResult.data.insertLead.lead.id
  })

  it('should return leads', async () => {

    
    const result: any = await server.executeOperation(
      {
        query: getLeadsGQL
      },
      {
        contextValue: {
          dataSources: {
            leadLoader
          },
        }
      }

    );
    expect(result.body.singleResult.data.leads).toBeInstanceOf(Array);
    expect(result.body.singleResult.data.leads).toHaveLength(1);
  });

  it('should return specific lead', async () => {
    const result: any = await server.executeOperation(
      {
        query: getSpecificLead,
        variables: { leadId: insertedLeadID }
      },
      {
        contextValue: {
          dataSources: {
            leadLoader
          },
        }
      }

    );
    expect(result.body.singleResult.data.lead.id).toBe(insertedLeadID)
  });
});

afterAll(async () => {
  await db.migrate.down();
  await db.destroy();
  await server.stop();
});