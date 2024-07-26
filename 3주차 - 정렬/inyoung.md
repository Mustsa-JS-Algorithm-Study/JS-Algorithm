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
- comparefunction(a,b)가 0보다 작으면 a를 앞으로 오게 한다는 점 기억
- sorted


### 문제2. 가장 큰 수 

```js
function solution(numbers) {
    // 숫자를 문자열로 변환하여 비교 정렬
    let sortedNumbers = numbers.map(String).sort((a, b) => (b + a) - (a + b));
    
    // 정렬된 배열을 하나의 문자열로 합침
    let result = sortedNumbers.join('');
    
    // '0000'과 같은 경우를 방지하기 위해 숫자로 변환 후 다시 문자열로 변환
    return result[0] === '0' ? '0' : result;
}

```

### 문제3 H-index

```js
function solution(citations) {
    // 인용 횟수를 내림차순으로 정렬
    citations.sort((a, b) => b - a);
    
    let hIndex = 0;
    
    // 정렬된 인용 횟수 배열에서 H-Index를 구함
    for (let i = 0; i < citations.length; i++) {
        if (citations[i] >= i + 1) {
            hIndex = i + 1;
        } else {
            break;
        }
    }
    
    return hIndex;
}

```