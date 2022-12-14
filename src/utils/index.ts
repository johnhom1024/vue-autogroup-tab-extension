/**
 * @description: 获取url的域名
 * @param {string} url
 * @return {string｜ null} 返回url中的域名信息
 * @example
 * 例如：
 * 接收 https://linuxtools-rst.readthedocs.io:9090/zh_CN/latest/index.html
 * 返回 linuxtools-rst.readthedocs.io
 */
export function getDomain(url: string | undefined | null) {
  if (!url) {
    return null;
  }
  const re = /^https?:\/\/([^/:]+)(:\d+)?\/.*/;
  const match = url.match(re);
  return match ? match[1] : null;
}

/**
 * @description: 获取一级域名的那一段
 * @param {string} url
 * @example
 * 例如：
 * 接收 https://linuxtools-rst.readthedocs.io:9090/zh_CN/latest/index.html
 * 返回 readthedocs
 * @return {*}
 */
export function getFirstDomain(url: string | undefined | null) {
  const domain = getDomain(url);
  if (!domain) {
    return null;
  }
  // localhost地址或者IP
  if (domain === 'localhost' || domain.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    return domain;
  }

  // 去掉域名中的www和com
  const noNeed = ['www', 'com', 'cn', 'net', 'org', 'hk', 'biz'];

  const filterDomain = domain.split('.').filter((item) => {
    return !noNeed.includes(item);
  });

  if (filterDomain.length) {
    return filterDomain.slice(-1).join('');
  }

  return null;
}

export function chromeStorageSet(items: { [key: string]: any }) {
  return chrome.storage.sync.set(items);
}

export function chromeStorageGet(
  keys: string | string[] | { [key: string]: any } | null
) {
  return chrome.storage.sync.get(keys);
}

export function chromeSendMessage(params: any) {
  chrome.runtime.sendMessage(params);
}
