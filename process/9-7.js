// chdir 方法与 cwd方法的使用示例

console.log(`当前目录：${process.cwd()}`);
process.chdir('../');
console.log(`上层目录：${process.cwd()}`);