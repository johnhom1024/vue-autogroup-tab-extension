import { DomainStrategyTypeDef } from "types/type";

// 新标签页的标签组名称
export const NEW_TAB_GROUP_TITLE = 'newtab';
// 新标签页的url
export const NEW_TAB_URL = 'chrome://newtab/';

// 默认配置
export const DEFAULT_CONFIG = {
  // 是否启用标签自动分组
  enableAutoGroup: true,
  // 一个标签组至少需要的标签数
  minGroupTabNum: 2,
  // 域名分组策略模式
  domainGroupType: DomainStrategyTypeDef.FIRST_DOMAIN
}