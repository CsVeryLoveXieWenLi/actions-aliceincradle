/*
 * @Author: CsVeryLoveXieWenLi
 * @Description: 检测版本
 * @Copyright (c) 2026 by CsVeryLoveXieWenLi, All Rights Reserved.
 */
/**
 * @param {string} str 原始全文
 * @param {string} left 左边文本
 * @param {string} right 右边文本
 */
function getMiddleText(str, left, right) {
    // 构造正则：左边文本 + (捕获非贪婪匹配的所有内容) + 右边文本
    const reg = new RegExp(`${left}(.*?)${right}`);
    const match = str.match(reg);
    return match ? match[1] : ""; // 如果匹配成功返回索引1的内容，否则返回空
}

(async () => {
    let response, body;

    response = await fetch('https://cn.aliceincradle.dev/download/');
    body = await response.text();

    const url = getMiddleText(body, "window.location.href='", "';");
    response = await fetch(url, { 'redirect': 'manual' });

    console.log(response.headers.get('location'))
    const version = getMiddleText(response.headers.get('location'), '/Win%20ver', 'sign=');
    console.log(version.slice(0, -1));
})();
