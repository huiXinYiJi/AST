export default function parseAttrsString(attrsString) {
  if (!attrsString) return [];
  console.log(attrsString);
  // 当前是否在引号内
  let isYinhao = false;
  // 断点
  let point = 0;
  // 结果数组
  var result = [];
  for (let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if (char === '"') {
      isYinhao = !isYinhao;
    } else if (char === " " && !isYinhao) {
      // 遇到了空格且不在引号内
      const str = attrsString.substring(point, i);
      if (!/^\s*$/.test(str)) result.push(str.trim());
      point = i;
    } else {
    }
  }
  result.push(attrsString.substring(point).trim());

  // ["k=v"] 变为 [{name: 'k, value: 'v}]
  result = result.map((item) => {
    const o = item.match(/^(.+)="(.+)"$/);
    return {
      name: o[1],
      value: o[2],
    };
  });

  return result;
}
