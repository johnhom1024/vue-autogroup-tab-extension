import {
  NEW_TAB_GROUP_TITLE,
  TabType,
  TabStatus,
  NEW_TAB_URL,
  DEFAULT_CONFIG,
  DomainStrategyTypeDef,
} from '@/utils/constant';

import { DomainGroupStrategy, FirstDomainStrategy } from '@/utils/Strategy';
import { chromeStorageGet } from '@/utils/index';

// 定义域名策略的方法
const DOMAIN_STRATEGY_MAP = new Map();
DOMAIN_STRATEGY_MAP.set(DomainStrategyTypeDef.DOMAIN, DomainGroupStrategy);
DOMAIN_STRATEGY_MAP.set(DomainStrategyTypeDef.FIRST_DOMAIN, FirstDomainStrategy);


// 是否在分组中
let isGrouping = false;
let userConfig = {} as typeof DEFAULT_CONFIG;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const config = await chromeStorageGet(Object.keys(DEFAULT_CONFIG));
  userConfig = { ...DEFAULT_CONFIG, ...config };
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

  const strategy = DOMAIN_STRATEGY_MAP.get(userConfig.domainGroupType);
  try {
    isGrouping = true;
    const tabs = await strategy.querySameTabs(tab);
    const tabIds = tabs
      .map((t) => t.id)
      .filter((t) => !!t) as number[];

    // 如果tab数量不满足tab组的最低数量要求，则ungroup
    if (tabs.length < userConfig.minGroupTabNum) {
      if (tabIds.length) {
        chrome.tabs.ungroup(tabIds);
      }
      return;
    }

    const groupTitle = strategy.getGroupTitle(tab);

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
