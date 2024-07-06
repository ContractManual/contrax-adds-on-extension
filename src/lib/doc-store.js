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
    google.script.run.withSuccessHandler(function (resp) {
      docStore.doc = resp.data;
      onSuccess(resp.data);
    }).withFailureHandler(function (error) {
      console.error(error.message);
      onFailure(error);
    }).getDocument();
  },

  // trigger `configDocument` on `main.gs` to save the document data
  saveDoc(conf, onSuccess, onFailure) {
    google.script.run.withSuccessHandler(function (resp) {
      docStore.doc = resp.data;
      onSuccess(resp.data);
    }).withFailureHandler(function (error) {
      console.error(error.message);
      onFailure(error);
    }).configDocument(conf);
  },
});
