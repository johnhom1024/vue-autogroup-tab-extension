import {
  NEW_TAB_GROUP_TITLE,
  TabType,
  TabStatus,
  NEW_TAB_URL,
} from '@/utils/constant';

import { DomainGroupStrategy } from '@/utils/Strategy';


// 是否在分组中
let isGrouping = false;

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log('----------johnhomLogDebug 更新了tab', tab);
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
  try {
    isGrouping = true;
    const tabs = await DomainGroupStrategy.querySameTabs(tab);
    const tabIds = tabs
      .map((t) => t.id)
      .filter((t) => !!t) as number[];

    console.log('----------johnhomLogDebug tabIds', tabIds)

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
            console.log('----------johnhomLogDebug 组成了一个标签组', groupTitle);
          } else {
            chrome.tabs.group({ tabIds }).then((groupId) => {
              chrome.tabGroups.update(groupId, { title: groupTitle });
              console.log('----------johnhomLogDebug 新建了一个标签组', groupTitle);
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
