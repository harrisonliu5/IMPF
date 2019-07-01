// 生成ast树的插件
const acorn = require('acorn');
// 遍历ast的插件
const walk = require('acorn-walk');

module.exports = function (content, map, meta) {
    const astTree = acorn.parse(content);
    // walk.simple(astTree, {
    //     Literal(node) {
    //         // {
    //         //     type: 'Literal',
    //         //     start: 10,
    //         //     end: 16,
    //         //     value: '入口文件',
    //         //     raw: '\'入口文件\''
    //         // }
    //         // console.log(node.value)
    //     }
    // })
    walk.full(astTree, n => {
        console.log(n);
        // if (n.type === 'VariableDeclaration' && n.kind === 'const') {
        //     content = content.substring(0, n.start) + 'var ' + content.substring(n.declarations[0].start);
        // }
        // // console.log(n);
        // return n;

    });
    // 分析ast
    return this.data.value + content;
};

module.exports.pitch = function (rRequest, pRequest, data) {
    data.value = '// 这个是钩子 \n ';
};


