# 3주차 정리- 정렬 
### 문제1. K번째 수 
제코드
```js
function solution(array, commands) {
    const answer =[];
    for (commandItem of commands ){
        const [s, e, k] = commandItem
        const sortedArray= array.slice(s-1,e).sort((a,b)=>a-b);
        answer.push(sortedArray[k-1]);
    }
    return answer;
}
```

- for of 
- 비구조화 할당 
- comparefunction(a,b)가 0보다 작으면 a를 앞으로 오게 한다는 점.


### 문제2. K번째 수 