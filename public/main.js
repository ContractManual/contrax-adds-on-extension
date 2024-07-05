const BEARER_TOKEN = PropertiesService.getScriptProperties().getProperty('BEARER_TOKEN')

if (!BEARER_TOKEN) {
  throw new Error('BEARER_TOKEN is not set in script properties')
}

const CONFIG_DOCUMENT_URL = "https://us-central1-rounddesk-1.cloudfunctions.net/fill_setup_config";
const GET_DOCUMENT_URL = "https://us-central1-rounddesk-1.cloudfunctions.net/get_setup_config";

function main() {
  DocumentApp.getUi()
    .showSidebar(
      HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Sage Contrax: Contract Co-pilot')
    );
}

function sendRequest(endpoint, data = {}) {
  const resp = UrlFetchApp.fetch(endpoint, {
    method: 'POST',
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
    payload: JSON.stringify({
      ...data,
      email: Session.getActiveUser().getEmail(),
      document_id: DocumentApp.getActiveDocument().getId(),
    }),
  });

  return {
    status: resp.getResponseCode(),
    data: JSON.parse(resp.getContentText()),
  };
}

function configDocument(config) {
  return sendRequest(CONFIG_DOCUMENT_URL, config);
}

function getDocument() {
  return sendRequest(GET_DOCUMENT_URL);
}
