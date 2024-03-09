function main() {
  DocumentApp.getUi()
    .showSidebar(
      HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Sage Contrax: Contract Co-pilot')
    );
}