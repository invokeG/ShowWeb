// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: 'OFF'
//   });
// });

// chrome.action.onClicked.addListener(async (tab) => {
//   const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//   const nextState = prevState === 'ON' ? 'OFF' : 'ON';

//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: nextState
//   });

//   // 从标签页的本地存储中获取执行状态
//   chrome.storage.local.get(['scriptExecuted'], (result) => {
//     const scriptExecuted = result.scriptExecuted || false;

//     if (!scriptExecuted) {
//       // 执行脚本
//       chrome.scripting.executeScript({
//         target: {
//           tabId: tab.id
//         },
//         files: ['content.js']
//       });

//       // 将执行状态保存到标签页的本地存储中
//       chrome.storage.local.set({ scriptExecuted: true });
//     }
//   });
// });
