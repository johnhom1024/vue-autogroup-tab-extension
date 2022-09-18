import { getDomain } from './index';
import { TabType } from './constant';

// 抽象的策略类
abstract class GroupSrategy {
  // 根据传入的tab匹配相同的tab
  static querySameTabs(tab: TabType): Promise<TabType[]> {
    return Promise.resolve([]);
  }

  // 根据tab获取标签组名
  static getGroupTitle(tab: TabType): string | null {
    return null;
  }
}

// 根据域名策略进行归类tab
export class DomainGroupStrategy extends GroupSrategy {
  static async querySameTabs(tab: TabType): Promise<TabType[]> {
    if (tab.url) {
      const domain = getDomain(tab.url);
      const allTabs = await chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        pinned: false,
      });

      return allTabs.filter((tab) => {
        return tab.url && domain && domain === getDomain(tab.url);
      });
    }
    return [];
  }
  // 获取组的名称
  static getGroupTitle(tab: TabType): string | null {
    return getDomain(tab.url);
  }
}
