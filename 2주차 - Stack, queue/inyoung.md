# 2주차 정리- stack/queue

# 개념정리
## Stack 
```
선형 
push, pop 작업
LIFO (Last in first out) - 마지막에 들어온 게 처음에 나간다.
```

## Queue
```
선형
push pop 작업.
FIFO(First In First OUT) - 처음 들어온 게 처음 나간다.
```

## 문제 1. 같은 숫자는 싫어 

내 코드 
```js
function solution(arr)
{
    var answer = [];
    for (let i=0;i<arr.length;i++){
        if (arr[i] !==arr[i+1]){
            answer.push(arr[i]);
        }
    }
    return answer;
}
```

다른 사람 풀이
```js
function solution(arr)
{
    return arr.filter((val,index) => val != arr[index+1]);
}
```


학습 내용 
- .filter의 콜백함수의 두번째 인수 `index`를 이용할 수 있다.

## 문제 2. 같은 숫자는 싫어 
내 코드 
```js
function solution(progresses, speeds) {
    const days = progresses.map((progress, index) => 
        Math.ceil((100 - progress) / speeds[index])
    );

    const releaseCounts = [];
    let currentReleaseDay = days[0];
    let count = 0;

    for (let day of days) {
        if (day <= currentReleaseDay) {
            count += 1;
        } else {
            releaseCounts.push(count);
            currentReleaseDay = day;
            count = 1;
        }
    }
    releaseCounts.push(count);
    return releaseCounts;
}

```

## 문제 3. 올바른 괄호

```js
function solution(s) {
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        let char = s[i];

        if (char === '(') {
            stack.push(char);
        } else { 
            if (stack.length === 0) {
                return false;
            }
            stack.pop(); 
        }
    }
    return stack.length === 0;
}

```

## 문제4. 프로세스 

```js
function solution(priorities, location) {
    let queue = priorities.map((priority, index) => ({
        priority,
        index
    }));
    let order = 0;  
    while (queue.length > 0) {
        let current = queue.shift();
        if (queue.some(process => process.priority > current.priority)) {
            queue.push(current);
        } else {
            if (current.index === location) {
                return order;
            }
        }
    }
}

```