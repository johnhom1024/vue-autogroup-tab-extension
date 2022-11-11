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

export type TabType = chrome.tabs.Tab;