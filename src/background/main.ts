import {
  NEW_TAB_GROUP_TITLE,
  TabType,
  TabStatus,
  NEW_TAB_URL,
  DEFAULT_CONFIG,
} from '@/utils/constant';

import { DomainGroupStrategy } from '@/utils/Strategy';
import { chromeStorageGet } from '@/utils/index';

// 是否在分组中
let isGrouping = false;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const config = await chromeStorageGet(Object.keys(DEFAULT_CONFIG));
  const userConfig = { ...DEFAULT_CONFIG, ...config };
  // 判断是否开启了自动分组
  if (!userConfig.enableAutoGroup) {
    return;
  }
  // 如果 tab 还未加载完，则不执行
  if (tab.status !== TabStatus.COMPETED) {
    return;
  }

  // 如果是新标签页，并且还没有被设置标签组
  if (
    tab.url === NEW_TAB_URL &&
    tab.groupId === chrome.tabGroups.TAB_GROUP_ID_NONE
  ) {
    const tabGroups = await chrome.tabGroups.query({
      title: NEW_TAB_GROUP_TITLE,
      windowId: chrome.windows.WINDOW_ID_CURRENT,
    });

    // 如果存在这个标签组
    if (tabGroups && tabGroups.length) {
      chrome.tabs.group({ tabIds: tab.id, groupId: tabGroups[0].id });
    } else {
      console.log('----------johnhomLogDebug tabId', tab.id)
      const groupId = await chrome.tabs.group({ tabIds: tab.id });
      chrome.tabGroups.update(groupId, { title: NEW_TAB_GROUP_TITLE });
    }

    return;
  }

  // 如果不是新标签页
  groupTabs(tab);
});

// 将相同的tabs组成一个标签页
async function groupTabs(tab: TabType) {
  if (isGrouping) {
    return;
  }
  try {
    isGrouping = true;
    const tabs = await DomainGroupStrategy.querySameTabs(tab);
    const tabIds = tabs
      .map((t) => t.id)
      .filter((t) => !!t) as number[];

    // 这里tabs可能会是0

    const groupTitle = DomainGroupStrategy.getGroupTitle(tab);

    if (groupTitle) {
      await chrome.tabGroups
        .query({
          title: groupTitle,
          windowId: chrome.windows.WINDOW_ID_CURRENT,
        })
        .then((tabGroups) => {
          if (tabGroups && tabGroups.length > 0) {
            chrome.tabs.group({ tabIds, groupId: tabGroups[0].id });
          } else {
            chrome.tabs.group({ tabIds }).then((groupId) => {
              chrome.tabGroups.update(groupId, { title: groupTitle });
            });
          }
        });
    }
  } catch (error) {
    console.error(error);
  } finally {
    isGrouping = false;
  }
}


// 监听storage的变化
chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log('----------johnhomLogDebug changes', changes)
  console.log('----------johnhomLogDebug areaName', areaName)
});


chrome.runtime.onMessage.addListener((request) => {
  console.log('----------johnhomLogDebug request', request)
  
  // if (request.groupRightNow) {
  //   chrome.storage.sync.get(Object.keys(DEFAULT_CONFIG), (config) => {
  //     userConfig = { ...DEFAULT_CONFIG, ...config };
  //     groupAllTabs();
  //   });
  // }
});
