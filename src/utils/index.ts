
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

