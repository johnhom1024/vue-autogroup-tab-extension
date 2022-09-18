
// 新标签页的标签组名称
export const NEW_TAB_GROUP_TITLE = 'newtab';
// 新标签页的url
export const NEW_TAB_URL = 'chrome://newtab/';

export type TabType = chrome.tabs.Tab;

export enum TabStatus {
  COMPETED = 'complete',
  PENDING = 'pending',
} 
