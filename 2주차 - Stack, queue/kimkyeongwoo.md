# 김경우

---

## 1. 같은 숫자는 싫어

- 나의풀이

```javascript
function solution(arr) {
  var answer = [];
  var len = arr.length;

  answer[0] = arr[0];

  for (let i = 1; i < len; i++) {
    if (arr[i - 1] === arr[i]) continue;
    else {
      answer.push(arr[i]);
    }
  }
  return answer;
}
```

- 다른 풀이

```javascript
function solution(arr) {
  return arr.filter((val, idx) => val != arr[idx + 1]);
}
```

- 학습내용

```
1. stack/queue로 분류된 문제다 보니
   자연스럽게 해당 자료구조를 사용하려는 시도를 했다.
2. 다른 풀이에서는 Array.filter를
   이용하여 val의 다음 값에 index를 이용하여 접근하였고,
   서로 값이 같지 않으면 val를 취하는 식으로 작성하였다.
```

---

## 2. 기능 개발

- 나의 풀이

```javascript
function solution(progresses, speeds) {
  var answer = [];
  var needDays = [];
  var count = 0;

  needDays = progresses.map((v, index) => Math.ceil((100 - v) / speeds[index]));
  //각 진전도와 속도에 따른 필요한 날짜 계산

  var max = needDays[0];

  for (let i = 0; i < progresses.length; i++) {
    if (needDays[i] <= max) {
      count++;
      //앞에 있는 기능이 먼저 완료되어야 배포가 되니까
      //완료될 때까지 대기하는 곳
    } else {
      answer.push(count);
      max = needDays[i];
      count = 1;
      //배포하는 곳, 배포하고 나서 max를 갱신하여 다시 복
    }
  }
  answer.push(count);
  //마지막에 쌓인 count를 answer에 push

  return answer;
}
```

- 다른 풀이

```javascript
function solution(progresses, speeds) {
  let answer = [0];
  let days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );
  let maxDay = days[0];

  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      answer[j] += 1;
    } else {
      maxDay = days[i];
      answer[++j] = 1;
    }
  }
  return answer;
}
```

- 학습 내용

```
1. 전체적으로 다른 풀이와 나의 풀이가 흐름이 같았다.
2. needDays를 먼저 계산하여서 2중 반복문을 피할 수 있었다.
```

---

## 3. 올바른 괄호

- 나의 풀이

```javascript
function solution(s) {
  var answer = true;
  var stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
    } else if (s[i] === ")") {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0 ? true : false;
}
```

- 다른 풀이

```javascript
function solution(s) {
  let cum = 0;
  for (let paren of s) {
    cum += paren === "(" ? 1 : -1;
    if (cum < 0) {
      return false;
    }
  }
  return cum === 0 ? true : false;
}
```

- 학습 내용

```
1. 스택을 이용한 대표적인 예시
2. 다른 풀이와 메커니즘은 비슷하지만
   나의 풀이는 배열을 사용한 것에 반해 다른 풀이에서는 변수 하나를 사용하여
   스택을 관리하였다. 여기서는 다른 풀이가 공간을 덜 차지하는 방법이었다.

```

---

## 4. 프로세스

- 나의 풀이

```javascript
function solution(priorities, location) {
  var answer = 0;

  while (priorities.length) {
    var temp = priorities.shift(); //맨 앞에 하나 꺼내
    if (priorities.filter((v) => temp < v).length) {
      //꺼낸 것보다 우선순위 높은게 있는지 검사
      priorities.push(temp);
      location = (location - 1) % priorities.length;
      if (location < 0) location += priorities.length;
      //있으면 temp다시 집어넣음 그리고 location이 바뀌었으니까 갱신
    } else {
      answer++;
      location--;
      if (location < 0) break;
      //없으면 탈출 => answer 1증가
      //만약 내가 원하는 값이 탈출하면 location은 음수가 될거임.
    }
  }

  return answer;
}
```

- 다른 풀이

```javascript
function solution(priorities, location) {
  var list = priorities.map((t, i) => ({
    my: i === location,
    val: t,
  }));
  var count = 0;
  while (true) {
    var cur = list.splice(0, 1)[0];
    if (list.some((t) => t.val > cur.val)) {
      list.push(cur);
    } else {
      count++;
      if (cur.my) return count;
    }
  }
}
```

- 학습 내용

```
1. Array.some() : 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도
 하나라도 통과하는지 테스트합니다.
 만약 배열에서 주어진 함수가 true을 반환하면 true를 반환합니다.
 그렇지 않으면 false를 반환합니다. 이 메서드는 배열을 변경하지 않습니다.
 여기서 나는 some()함수를 몰라서 filter()를 이용하여 길이를 구하는 방식으로
 코드를 작성하였다. some()으로 바꾸면 더 효율적일 것이다.
2. Array.splice() : 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를
 추가하여 배열의 내용을 변경합니다.

 (ex)
 var removed = myFish.splice(2, 0, "drum");
 myFish의 2번째 인덱스에 "drum" 추가, 원래 2번째 인덱스는 뒤로 밀림

 var removed = myFish.splice(3, 1);
 myFish의 3번째 인덱스부터 1개 제거, 빈자리는 땡겨짐

 var removed = myFish.splice(2);
 myFish의 2번째 인덱스부터 뒤로는 다 제거
3. 다른 풀이에서는 location을 추적하는 방법으로 객체에 정보를 담아 관리했다.
나는 매 순간 반복마다 다시 계싼하는 방법을 했는데 객체로 관리하면 연산을
줄일 수 있었을 것이다.
4. 다른 풀이에서 list의 맨 앞에 객체를 가져오는 과정에서 splice()를 사용했는데
그냥 shift()해도 상관없다.
```

---

## 5. 다리를 지나는 트럭

- 나의 풀이

```javascript
function solution(bridge_length, weight, truck_weights) {
  var answer = 0;
  var sum = 0;
  var queue = new Array(bridge_length).fill(0);

  while (queue.length) {
    queue.shift();
    if (truck_weights.length) {
      sum = queue.reduce((a, b) => a + b, 0);
      if (sum + truck_weights[0] <= weight) {
        queue.push(truck_weights.shift());
      } else {
        queue.push(0);
      }
    }
    answer++;
  }
  return answer;
}
```

- 다른 풀이

```javascript
function solution(bridge_length, weight, truck_weights) {
  // '다리'를 모방한 큐에 간단한 배열로 정리 : [트럭무게, 얘가 나갈 시간].
  let time = 0,
    qu = [[0, 0]],
    weightOnBridge = 0;

  // 대기 트럭, 다리를 건너는 트럭이 모두 0일 때 까지 다음 루프 반복
  while (qu.length > 0 || truck_weights.length > 0) {
    // 1. 현재 시간이, 큐 맨 앞의 차의 '나갈 시간'과 같다면 내보내주고,
    //    다리 위 트럭 무게 합에서 빼준다.
    if (qu[0][1] === time) weightOnBridge -= qu.shift()[0];

    if (weightOnBridge + truck_weights[0] <= weight) {
      // 2. 다리 위 트럭 무게 합 + 대기중인 트럭의 첫 무게가 감당 무게 이하면
      //    다리 위 트럭 무게 업데이트, 큐 뒤에 [트럭무게, 이 트럭이 나갈 시간] 추가.
      weightOnBridge += truck_weights[0];
      qu.push([truck_weights.shift(), time + bridge_length]);
    } else {
      // 3. 다음 트럭이 못올라오는 상황이면 얼른 큐의
      //    첫번째 트럭이 빠지도록 그 시간으로 점프한다.
      //    참고: if 밖에서 1 더하기 때문에 -1 해줌
      if (qu[0]) time = qu[0][1] - 1;
    }
    // 시간 업데이트 해준다.
    time++;
  }
  return time;
}
```

- 학습 내용

```
1. 시간 점프를 구현하고 싶었지만 잘 안되어서
 다리 길이 만큼의 배열을 선언하고 꽤 많은 반복을 하도록 작성하였다.
2. 다른 풀이를 보면 시간 점프를 구현한 방법을 알 수 있었다.
```

---

## 6. 주식가격

- 나의 풀이

```javascript
function solution(prices) {
  var answer = [];
  var stack = 0;

  for (let i = 0; i < prices.length; i++) {
    stack = 0;
    for (let j = i + 1; j < prices.length; j++) {
      stack++;
      if (prices[i] > prices[j]) break;
    }
    answer.push(stack);
  }
  return answer;
}
```

- 학습 내용

```
1. 문제를 이해하는데 어려움을 겪었다. 그래서 문제도 어렵게 생각했다.
2. 그래서 처음에는 날 것의 스택을 만들어서 관리했더니 효율성에서 빵점을 받았다.
3. 그래서 질문하기에서 힌트를 참고해서 단순하게 생각하고 다시 코드를 작성하였다.
```
