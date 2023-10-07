/**
 * 将数据存到cookies里
 * @param obj 要存储的数据
 * @param cookieName 数据的名字
 *
 */
export const saveDataIntoCookies = (obj: any, cookieName: string) => {
  // chrome 浏览器限制cookie最长只能保存400天，因此设置大于400天是无效的
  const jsonStr = JSON.stringify(obj); // 将对象转换为 JSON 格式

  const expires = new Date();
  expires.setDate(expires.getDate() + 365); // 设置有效期为365天

  const expiresStr = expires.toUTCString(); // 将日期转换为字符串格式

  // 存储 Cookie（设置有效期和路径）
  document.cookie = `${cookieName}=${encodeURIComponent(jsonStr)}; expires=${expiresStr}; path=/`;
};

/**
 * 通过cookieName获取该cookies
 * @param cookieName
 */
export const getDataFromCookies = (cookieName: string) => {
  // 获取所有的 Cookie
  const cookies = document.cookie.split('; ');

  // 遍历每个 Cookie，找到名为 'cookieName' 的值
  let storedValue = '';
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      storedValue = value;
    }
  });

  // console.log(`storedValue`, storedValue);

  // 如果找到了 cookieName，将存储的值解码并转换回对象
  let obj = null;
  if (storedValue) {
    const decodedValue = decodeURIComponent(storedValue);
    obj = JSON.parse(decodedValue);
  }

  // 输出对象
  // console.log(obj);
  return obj;
};
