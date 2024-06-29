const BEARER_TOKEN = PropertiesService.getScriptProperties().getProperty('BEARER_TOKEN')

if (!BEARER_TOKEN) {
  throw new Error('BEARER_TOKEN is not set in script properties')
}

const INIT_DOCUMENT_URL = "https://us-central1-rounddesk-1.cloudfunctions.net/init_document";
const CONFIG_DOCUMENT_URL = "https://us-central1-rounddesk-1.cloudfunctions.net/fill_setup_config";
const GET_DOCUMENT_URL = "https://us-central1-rounddesk-1.cloudfunctions.net/get_setup_config";

function main() {
  DocumentApp.getUi()
    .showSidebar(
      HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Sage Contrax: Contract Co-pilot')
    );
}

/**
 * Sends a request to GCP functions
 * 
 * @param {string} endpoint endpoint to send request to
 * @param {object} data data to send in request
 * @returns {Promise<{status: number, data: object}>} response from server
 */
async function sendRequest(endpoint, data = {}) {
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify({
      ...data,
      email: Session.getActiveUser().getEmail(),
      document_id: DocumentApp.getActiveDocument().getId(),
    }),
  });

  return {
    status: resp.status,
    data: await resp.json()
  };
}

async function initDocument() {
  return await sendRequest(INIT_DOCUMENT_URL);
}

async function configDocument(config) {
  return await sendRequest(CONFIG_DOCUMENT_URL, config);
}

async function getDocument() {
  return await sendRequest(GET_DOCUMENT_URL);
}
