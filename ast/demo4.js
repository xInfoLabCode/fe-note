const core = require("@babel/core"); //babel核心模块
const pathlib = require("path");

const sourceCode = `
var a = 1;
console.log(a);
var b = 2;
`;

//no-console 禁用 console fix=true：自动修复
const eslintPlugin = ({ fix }) => {
  return {
    //遍历前
    pre(file) {
      file.set("errors", []);
    },
    visitor: {
      CallExpression(path, state) {
        const errors = state.file.get("errors");
        const { node } = path;
        if (node.callee.object && node.callee.object.name === "console") {
          errors.push(
            path.buildCodeFrameError(`代码中不能出现console语句`, Error)  //抛出一个语法错误
          );
          if (fix) {
            //如果启动了fix，就删掉该节点
            path.parentPath.remove();
          }
        }
      },
    },
    //遍历后
    post(file) {
      console.log(...file.get("errors"));
    },
  };
};
let targetSource = core.transform(sourceCode, {
  plugins: [eslintPlugin({ fix: true })], //使用插件
});

console.log(targetSource.code);