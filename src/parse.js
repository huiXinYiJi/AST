import parseAttrsString from "./parseAttrsString";

export default function parse(templateString) {
  // 指针
  var index = 0;
  // 剩余部分
  var rest = "";
  // 开始标记
  var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  // 结束标记
  var endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 抓取结束标记前的文字
  var wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
  // 准备两个栈
  var stack1 = [];
  var stack2 = [{ children: [] }];

  while (index < templateString.length - 1) {
    rest = templateString.substring(index);
    // 识别遍历到的字符是否是一个开始标签
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1];
      let attrsString = rest.match(startRegExp)[2];
      stack1.push(tag);
      stack2.push({ tag, children: [], attrs: parseAttrsString(attrsString) });
      // 指针移动标签的长度 +2, < >占两位, 再加attrsString长度
      const attrsStringLength =
        attrsString !== undefined ? attrsString.length : 0;
      index += tag.length + 2 + attrsStringLength;
      console.log(
        "开始标签:",
        tag,
        JSON.parse(JSON.stringify(stack1)),
        JSON.parse(JSON.stringify(stack2))
      );
    } else if (endRegExp.test(rest)) {
      let tag = rest.match(endRegExp)[1];
      let pop_tag = stack1.pop();
      if (tag === pop_tag) {
        let pop_arr = stack2.pop();
        if (stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_arr);
        }
      } else {
        throw new Error(`${tag}标签未封闭`);
      }
      index += tag.length + 3;
      console.log(
        "结束标签:",
        tag,
        JSON.parse(JSON.stringify(stack1)),
        JSON.parse(JSON.stringify(stack2))
      );
    } else if (wordRegExp.test(rest)) {
      // 标签中的文字
      let word = rest.match(wordRegExp)[1];
      // 看word是否全空
      if (!/^\s+$/.test(word)) {
        // 改变stack2栈顶元素为当前文字
        stack2[stack2.length - 1].children.push({ text: word, type: 3 });
        console.log(
          "非空文字:",
          word,
          JSON.parse(JSON.stringify(stack1)),
          JSON.parse(JSON.stringify(stack2))
        );
      }
      index += word.length;
    } else {
      // 标签中的文字
      index++;
    }
  }
  return stack2[0].children[0];
}
