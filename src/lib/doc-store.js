// Store for the document data and state

import { reactive } from 'vue';

export const docStore = reactive({
  // data from "users/:id/documents/:docId" in firebase
  doc: null,

  isConfigured() {
    return docStore.doc?.configured;
  },

  // trigger `getDocument` on `main.gs` to get the document data
  getDoc() {
    google.script.run.withSuccessHandler(function (doc) {
      docStore.doc = doc;
      console.log(doc);
    }).withFailureHandler(function (error) {
      console.error('Failed to get document', error);
    }).getDocument();
  },

  // trigger `configDocument` on `main.gs` to save the document data
  saveDoc(conf) {
    let isSuccessful = false;

    google.script.run.withSuccessHandler(function (newConf) {
      docStore.doc = newConf;
      console.log(newConf);
      isSuccessful = true;
    }).withFailureHandler(function (error) {
      console.error('Failed to save document', error);
    }).configDocument(conf);

    return isSuccessful;
  },
});
