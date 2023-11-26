chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  })
})

let scriptExecuted = false;

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON'? 'OFF' : 'ON';

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  })

  if(!scriptExecuted){
    await chrome.scripting.executeScript({
      target: { 
        tabId: tab.id 
      },
      files: ['content.js']
    })
    scriptExecuted = true;
  }
})

