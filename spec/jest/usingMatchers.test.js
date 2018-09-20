// Using Matchers
test('two plus two is four', () => {
    expect(2+2).toBe(4);
});

// toBe 使用 === 来测试完全相等。如果你想要检查的是一个对象，请使用 toEqual:

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two:2});
});

// toEqual 递归检查对象或数组的每个字段。

// 您还可以测试相反的匹配︰

test('adding positive numbers is not zero', () => {
    for(let a = 1;a<10;a++) {
        for(let b = 1;b<10;b++) {
            expect(a+b).not.toBe(0);
        }
    }
})

// 在测试中，你有时需要区分 undefined、 null，和 false，但有时你又不需要区分。 Jest 让你明确你想要什么。
// toBeNull 只匹配 null
// toBeUndefined 只匹配 undefined
// toBeDefined 与 toBeUndefined 相反
// toBeTruthy 匹配任何 if 语句为真
// toBeFalsy 匹配任何 if 语句为假
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
});

// 数字

// 大多数的比较数字有等价的匹配器

test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3); // >
    expect(value).toBeGreaterThanOrEqual(3.5); // >=
    expect(value).toBeLessThan(5); // <
    expect(value).toBeLessThanOrEqual(4.5) // <=

    // toBe and toEqual are equvalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
});

// 对于比较浮点数相等，使用 toBeCloseTo 而不是 toEqual，因为你不希望测试取决于一个小小的舍入误差。
test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3);
    expect(value).toBeCloseTo(0.3);
})

// 字符串

// 您可以检查对具有 toMatch 正则表达式的字符串

test('there is no I in team', () => {
    expect('team').not.toMatch(/i/);
});

test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
})

// 数组

// 你可以检查数组是否包含特定子项使用 toContain︰

const shoppingList = [
    'diapers',
    'kleenex', 
    'trash bags', 
    'paper towels', 
    'beer',
  ];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});

// 例外
// 如果你想要测试的特定函数抛出一个错误，在它调用时，使用 toThrow。

function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
};

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});