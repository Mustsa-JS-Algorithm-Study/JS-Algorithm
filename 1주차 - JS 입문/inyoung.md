
# 1주차 정리


# 문제 !

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

### .filter() 함수를 쓰는 풀이
```js
function solution(s1, s2) {
    const intersection = s1.filter((x) => s2.includes(x));
    return intersection.length;
}
```

### ```filter()```

Array 인스턴스의 fileter() 메소드는 주어진 배열의 일부에 대한 얕은 복사본을 생성하고, 주어진 배열에서 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다.

```js
// 사용법
filter(callbackFn)
```
이 메서드는 배열의 각 요소에 대해 제공된 callbackFn 함수를 한 번씩 호출하고, callbackFn이 참 값을 반환하는 모든 값으로 새 배열을 구성합니다. 
callbackFn 테스트를 통과하지 못한 배열 요소는 새 배열에 포함되지 않습니다.



---

# 문제 !

> 머쓱이네 피자가게는 피자를 두 조각에서 열 조각까지 원하는 조각 수로 잘라줍니다. 피자 조각 수 slice와 피자를 먹는 사람의 수 n이 매개변수로 주어질 때, n명의 사람이 최소 한 조각 이상 피자를 먹으려면 최소 몇 판의 피자를 시켜야 하는지를 return 하도록 solution 함수를 완성해보세요.


내 코드
```js
function solution(slice, n) {
    return n% slice ===0 ? n/slice : parseInt(n/slice+1);
}
```
좀 더 간결하게!

```js
function solution(slice, n) {
    return Math.ceil(n/slice);
}
```

## 💡 사용된 개념
### `Math.ceil`
Math.ceil() 함수는 주어진 숫자보다 크거나 같은 숫자 중 가장 작은 숫자를 integer 로 반환합니다.
```
Math.ceil(0.95); // 1
Math.ceil(4); // 4
Math.ceil(7.004); // 8
Math.ceil(-0.95); // -0
Math.ceil(-4); // -4
Math.ceil(-7.004); // -7
```


---

# 문제 !

> 머쓱이는 친구들과 369게임을 하고 있습니다. 369게임은 1부터 숫자를 하나씩 대며 3, 6, 9가 들어가는 숫자는 숫자 대신 3, 6, 9의 개수만큼 박수를 치는 게임입니다. 머쓱이가 말해야하는 숫자 order가 매개변수로 주어질 때, 머쓱이가 쳐야할 박수 횟수를 return 하도록 solution 함수를 완성해보세요.

내 코드
```js
function solution(order) {
    var answer = 0;
    const a = order.toString().split("").forEach((item) => {
        if (item === '3' || item === '6' || item === '9') {
            answer += 1;
        }
    });
    return answer;
}

```



### Set 자료구조와 filter() 함수를 통한 풀이
```js
function solution(order) {
    const set = new Set([3,6,9]);
    return String(order).split("").filter((num)=>set.has(Number(num))).length;    
}
```

## 💡 사용된 개념

### .split()
split() 메서드는 String 객체를 지정한 구분자를 이용하여 여러 개의 문자열로 나눕니다.

`반환값` : 주어진 문자열을 separator마다 끊은 부분 문자열을 담은 Array.

- seperator 가 등장하면 해당 부분은 `삭제`되고 `남은 문자열이 배열로 반환`.
- 빈 문자열일 경우 각 문자 하나씩을 원소로 갖는 배열을 반환



### Set()

- new Set([iterable]): Set을 생성합니다.
- add(value): 값을 추가합니다.
- delete(value): 값을 삭제합니다.
- `has(value)`:  값이 존재하는지 확인합니다.
- clear(): 모든 값을 삭제합니다.
- size: Set에 있는 값의 개수를 반환합니다.


Set 자료구조의 경우 검색 속도가 빠르다고 하네요.