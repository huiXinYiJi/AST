import parse from "./parse";

var templateString = `<div>
    <h3 class="box ccc" id="test">你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>`;

var ast = parse(templateString);
console.log(ast);
