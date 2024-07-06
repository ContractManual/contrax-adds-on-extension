// Store for the document data and state

import { reactive } from 'vue';

export const docStore = reactive({
  // data from "users/:id/documents/:docId" in firebase
  doc: null,

  isConfigured() {
    return docStore.doc?.configured;
  },

  // trigger `getDocument` on `main.gs` to get the document data
  getDoc(onSuccess, onFailure) {
    google.script.run.withSuccessHandler(function (doc) {
      docStore.doc = doc;
      onSuccess(doc);
    }).withFailureHandler(function (error) {
      console.error(error);
      onFailure(error);
    }).getDocument();
  },

  // trigger `configDocument` on `main.gs` to save the document data
  saveDoc(conf, onSuccess, onFailure) {
    google.script.run.withSuccessHandler(function (newConf) {
      docStore.doc = newConf;
      onSuccess(newConf);
    }).withFailureHandler(function (error) {
      console.error(error);
      onFailure(error);
    }).configDocument(conf);
  },
});
