import { getDomain } from './index';
import { TabType } from './constant';

// 抽象的策略类
abstract class Srategy {
  // 根据传入的tab匹配相同的tab
  static querySameTabs(tab: TabType): Promise<TabType[]> {
    return Promise.resolve([]);
  }
}

export class DomainStrategy extends Srategy {
  static async querySameTabs(tab: TabType): Promise<TabType[]> {
    if (tab.url) {
      const tabHostname = new URL(tab.url).hostname;
      const allTabs = await chrome.tabs.query({
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        pinned: false,
      });

      return allTabs.filter((tab) => {
        return tab.url && tabHostname && tabHostname === getDomain(tab.url);
      });
    }
    return [];
  }
  // 获取组的名称
  static getGroupTitle(tab: TabType): string | null {
    return getDomain(tab.url);
  }
}
