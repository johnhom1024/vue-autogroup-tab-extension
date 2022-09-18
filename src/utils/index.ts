
// 获取url的域名
export function getDomain(url: string | undefined | null) {
  if (!url) {
    return '';
  }
  const re = /^https?:\/\/([^/:]+)(:\d+)?\/.*/;
  const match = url.match(re);
  return match ? match[1] : null;
}