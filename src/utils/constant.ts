
// 新标签页的标签组名称
export const NEW_TAB_GROUP_TITLE = 'newtab';
// 新标签页的url
export const NEW_TAB_URL = 'chrome://newtab/';

export type TabType = chrome.tabs.Tab;

// 标签状态
export enum TabStatus {
  COMPETED = 'complete',
  PENDING = 'pending',
}

// 域名分组策略类型
export enum DomainStrategyTypeDef {
  // 根据域名分组  例如 www.google.com  匹配 www.google.com
  DOMAIN = 1,
  // 根据一级域名分组 例如 www.google.com 匹配 google
  FIRST_DOMAIN = 2,
}

// 默认配置
export const DEFAULT_CONFIG = {
  // 是否启用标签自动分组
  enableAutoGroup: true,
  // 一个标签组至少需要的标签数
  minGroupTabNum: 2,
  // 域名分组策略模式
  domainGroupType: DomainStrategyTypeDef.FIRST_DOMAIN,
}