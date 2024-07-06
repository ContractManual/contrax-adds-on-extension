window.google = {
  script: {
    run: {
      withSuccessHandler: function (callback) {
        return {
          withFailureHandler: function (errorCallback) {
            return {
              getDocument: function () {
                console.log('Mock getDocument called');
                // Simulate success callback
                setTimeout(() => {
                  callback({ configured: false });
                }, 2000);
                // Simulate failure callback
                // setTimeout(() => {
                //   errorCallback('Mock error response');
                // }, 1000);
              },
              configDocument: function (conf) {
                console.log('Mock configDocument called');
                // Simulate success callback
                setTimeout(() => {
                  callback(conf);
                }, 1000);
                // Simulate failure callback
                // setTimeout(() => {
                //   errorCallback('Mock error response');
                // }, 1000);
              },
            };
          }
        };
      }
    }
  }
};
