// 遍历process.argv属性值数组

process.argv.forEach((val, index, array) => {
    console.log(`${index}:${val}`);
})