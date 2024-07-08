
# 1주차 정리

> 두 배열이 얼마나 유사한지 확인해보려고 합니다. 문자열 배열 s1과 s2가 주어질 때 같은 원소의 개수를 return하도록 solution 함수를 완성해주세요.

내 코드
```js
function solution(s1, s2) {
    var answer = 0;
    for (elS1 of s1){
        for (elS2 of s2){
            if (elS1 === elS2){
                answer+=1;
            }
        }
    }
    return answer;
}
```


## 💡 사용된 개념

### `for ...in 문`
- 객체의 열거 속성을 통해 지정된 변수를 반복합니다.
- 객체 순환!
- 자바스크립트에서는 배열도 객체이기 때문에 그 객체의 키값에 해당하는 index를 가리키게 된다.
```
for (variable in object) {
  statements
}
```

### `for ... of 문`
- 반복 가능한(iterable) 객체 (배열, Map, Set)을 통해 반복하는 루프를 만듭니다.
- 배열 값 순환!


### 차이점?
```js
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); // "3", "5", "7"
}
```

## .filter() 함수를 쓰는 풀이
```js
function solution(s1, s2) {
    const intersection = s1.filter((x) => s2.includes(x));
    return intersection.length;
}
```

