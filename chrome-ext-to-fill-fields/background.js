chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.storage.sync.get(['config'], (data) => {
        const config = data.config || [];
        const host = new URL(tab.url).host;
        const siteConfig = config.find(item => item.host === host);
        if (siteConfig) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: fillFields,
            args: [siteConfig.fields]
          });
        }
      });
    }
  });
  
  function fillFields(fields) {
    fields.forEach(field => {
      const element = document.querySelector(field.selector);
      if (element) {
        element.value = field.value;
      }
    });
  }