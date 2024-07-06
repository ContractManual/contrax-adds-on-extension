// Store for the document data and state

import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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
      if (!doc.configured) {
        router.push({ name: "setup" });
      } else {
        router.push({ name: "contract-analysis" });
      }
    }).withFailureHandler(function (error) {
      console.error(error);
    }).getDocument();
  },

  // trigger `configDocument` on `main.gs` to save the document data
  saveDoc(conf) {
    google.script.run.withSuccessHandler(function (newConf) {
      docStore.doc = newConf;
      router.push({ name: "contract-analysis" });
    }).withFailureHandler(function (error) {
      console.error(error);
    }).configDocument(conf);
  },
});