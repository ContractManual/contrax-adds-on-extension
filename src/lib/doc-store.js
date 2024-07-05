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
      $emit('success', {
        message: 'Document loaded',
      });
    }).withFailureHandler(function (error) {
      $emit('error', {
        message: 'Failed to load document',
        error,
      });
    }).getDocument();
  },

  // trigger `configDocument` on `main.gs` to save the document data
  saveDoc(conf) {
    let isSuccessful = false;

    google.script.run.withSuccessHandler(function (newConf) {
      docStore.doc = newConf;
      $emit('success', {
        message: 'Document saved',
      });
      isSuccessful = true;
    }).withFailureHandler(function (error) {
      $emit('error', {
        message: 'Failed to save document',
        error,
      });
    }).configDocument(conf);

    return isSuccessful;
  },
});
