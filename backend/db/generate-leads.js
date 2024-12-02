const { v4: uuidv4 } = require('uuid');

// Constants for generating sample data
const VALID_SERVICE_IDS = [
  "bc50a56f-f3ba-4f65-864d-e5b813740802",
  "e4de9a6e-45d6-4cef-b619-995d54d1ecbb",
  "8929eb38-6424-495d-a5c3-d2175c34ad48",
];

const NAMES = [
  "John Doe", "Jane Doe", "Jane Doe", "John Doe", "Alice Brown",
  "Bob Smith", "Mary Johnson", "Michael Davis", "Sarah Miller", "David Wilson",
  "Emily Clark", "Daniel Adams", "Sophia Wright", "James Taylor", "Olivia Lee",
  "Liam Harris", "Ava Martin", "Noah Thompson", "Isabella White", "Lucas Garcia",
  "Mia Martinez", "Ethan Robinson", "Charlotte Lewis", "Elijah Young", "Amelia Walker",
  "Benjamin King", "Harper Hall", "William Allen", "Abigail Scott", "Alexander Green",
  "Ella Adams", "Henry Baker", "Grace Gonzalez", "Jack Nelson", "Lily Carter",
  "Samuel Perez", "Victoria Mitchell", "Levi Turner", "Scarlett Phillips", "David Parker",
  "Sofia Campbell", "Andrew Edwards", "Madison Collins", "Isaac Murphy", "Chloe Rivera",
  "Matthew Ross", "Layla Ramirez", "Sebastian Reed", "Zoey Stewart", "Jackson Hughes"
];


const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
const POSTCODES = ["2000", "2023", "3000", "4001", "5002", "6003"];
const COUNTRY_CODES = ["+639", "+1", "+44", "+61"];

// Function to generate random email
function generateEmail(name) {
  const [first, last] = name.split(" ");
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  return `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`;
}

// Function to generate random SQL inserts
function generateSQLSamples() {
  const leadsSQL = [];
  const leadServicesSQL = [];

  for (let i = 0; i < NAMES.length; i++) {
    // Generate lead details
    const leadId = uuidv4();
    const name = NAMES[i];
    const email = generateEmail(name);
    const mobile = `${COUNTRY_CODES[Math.floor(Math.random() * COUNTRY_CODES.length)]}${Math.floor(
      Math.random() * 900000000 + 100000000
    )}`;
    const postcode = POSTCODES[Math.floor(Math.random() * POSTCODES.length)];

    // Add lead INSERT statement
    leadsSQL.push(
      `INSERT INTO \`lead\` (\`id\`, \`name\`, \`email\`, \`mobile\`, \`postcode\`) VALUES ('${leadId}', '${name}', '${email}', '${mobile}', '${postcode}');`
    );

    // Assign random services
    const numServices = Math.floor(Math.random() * 3) + 1; // 1-3 services
    const selectedServices = [];
    while (selectedServices.length < numServices) {
      const serviceId =
        VALID_SERVICE_IDS[Math.floor(Math.random() * VALID_SERVICE_IDS.length)];
      if (!selectedServices.includes(serviceId)) {
        selectedServices.push(serviceId);
        leadServicesSQL.push(
          `INSERT INTO \`lead_service\` (\`lead_id\`, \`service_id\`) VALUES ('${leadId}', '${serviceId}');`
        );
      }
    }
  }

  return { leadsSQL, leadServicesSQL };
}

// Generate sample SQL for 50 leads
const { leadsSQL, leadServicesSQL } = generateSQLSamples();

// Output the SQL
console.log("-- INSERT statements for leads");
console.log(leadsSQL.join("\n"));
console.log("\n-- INSERT statements for lead services");
console.log(leadServicesSQL.join("\n"));
