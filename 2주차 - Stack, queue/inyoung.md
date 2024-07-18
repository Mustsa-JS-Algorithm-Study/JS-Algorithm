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

## 문제 2. 기능 개발 
내 코드 
```js
function solution(progresses, speeds) {
    // 각 기능이 100%가 되는데 걸리는 일수를 계산
    const days = progresses.map((progress, index) => 
        Math.ceil((100 - progress) / speeds[index])
    );

    // 배포될 기능들의 개수를 저장할 배열
    const releaseCounts = [];
    // 첫 번째 기능이 배포되는 날을 초기화
    let currentReleaseDay = days[0];
    // 현재 배포 그룹의 기능 수를 초기화
    let count = 0;

    // 각 기능의 배포 일수를 순회
    for (let day of days) {
        if (day <= currentReleaseDay) {
            // 현재 배포일보다 작거나 같으면 같은 날 배포
            count += 1;
        } else {
            // 현재 배포일보다 크면 새로운 배포 시작
            releaseCounts.push(count); // 이전 배포 그룹의 수를 저장
            currentReleaseDay = day; // 새로운 배포일로 업데이트
            count = 1; // 새로운 배포 그룹의 기능 수를 초기화
        }
    }
    // 마지막 배포 그룹의 수를 저장
    releaseCounts.push(count);

    // 배포 그룹별 기능 수를 반환
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


## 문제 5. 다리를 지나는 트럭



```js
function solution(bridge_length, weight, truck_weights) {
    // 현재 시간을 나타내는 변수
    let time = 0;
    
    // 현재 다리 위의 트럭들을 저장하는 큐
    let bridge = Array(bridge_length).fill(0);
    
    // 현재 다리 위의 트럭들의 무게 합
    let currentWeight = 0;
    
    // 대기 트럭들 큐
    let trucks = truck_weights.slice(); 
    
    while (bridge.length > 0) {
        // 1초가 지나고 다리에서 한 칸씩 이동
        time++;
        // 다리에서 트럭을 뺀다
        currentWeight -= bridge.shift();
        
        if (trucks.length > 0) {
            // 다음 트럭이 다리에 올라갈 수 있는지 확인
            if (currentWeight + trucks[0] <= weight) {
                // 다음 트럭이 다리에 올라간다
                let nextTruck = trucks.shift();
                bridge.push(nextTruck);
                currentWeight += nextTruck;
            } else {
                // 다음 트럭이 다리에 올라갈 수 없으면 빈 공간을 추가한다
                bridge.push(0);
            }
        }
    }
    
    return time;
}


```


- 다리와 트럭 대기열을 큐로 생각한다.
- 다리의 초기값은 길이가 bridge_length 이고 0으로 구성되어 있다.
- 시간이 하나 흐를 때 마다 다리에서 dequeue 작업한다.
    - 무게 지탱 o -> 트럭을 트럭 대기열에서 dequene하고, 다리에다가 push한다.
    - 무제 지탱 x -> 0을 push한다. (이렇게해야 다리의 길이가 유지된다)
- 트럭의 대기열의 길이가 0이 되었다.
- 남은 다리의 길이만큼 time++..






## 문제 6. 주식 가격 

내코드
```js
function solution(prices) {
    var answer = [];
    for (let i=0; i<prices.length; i++){
        // prices[i] 첫번쨰
        let count = 0;
        for (let j=prices.length-1;j >i; j--){
            if (prices[j]>=prices[i]){
                count++;
            }
        }
        answer.push(count);
    }
    return answer;
}
```
-> 효율성에서 문제있었음.. 
-> 반복문 두 번 돌지 말고. stack을 이용해보자.


by GPT...
```js
function solution(prices) {
    // 결과를 저장할 배열을 prices와 같은 길이로 생성, 초기값은 0
    const answer = Array(prices.length).fill(0);
    // 인덱스를 저장할 스택 초기화
    const stack = [];

    // prices 배열을 순회
    for (let i = 0; i < prices.length; i++) {
        // 스택이 비어 있지 않고, 현재 가격이 스택의 top 가격보다 작다면
        while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
            // 스택에서 인덱스를 하나 뺀다
            const j = stack.pop();
            // 떨어지지 않은 기간을 계산하여 결과 배열에 저장
            answer[j] = i - j;
        }
        // 현재 인덱스를 스택에 추가
        stack.push(i);
    }

    // 스택에 남아 있는 인덱스들에 대해 처리
    while (stack.length > 0) {
        const j = stack.pop();
        // 끝까지 가격이 떨어지지 않았으므로 남은 시간 계산
        answer[j] = prices.length - 1 - j;
    }

    return answer;
}

```