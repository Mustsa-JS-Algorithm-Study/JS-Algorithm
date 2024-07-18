> ## 1. 같은 숫자는 싫어

- 나의 풀이
  ```javascript
  function solution(arr) {
    var prev = null;
    return arr.filter((el) => {
      if (el === prev) {
        prev = el;
        return;
      }
      prev = el;
      return true;
    });
  }
  ```
  - filter는 얕은 복사본을 반환한다.
  - 그 점을 생각하면 prev를 따로 저장하지 않았어도 된다.
- 수정한 풀이
  ```javascript
  function solution(arr) {
    return arr.filter((el, index) => arr[index - 1] !== el);
  }
  ```
  - arr을 그냥 바로 사용하고, 코드를 줄였다.
  - 스택, 큐를 사용한 풀이는 아닌 것 같다.
- 스택, 큐
  - Last In First Out의 스택을 활용할 수 있다.

> ## 2. 기능개발

```
function solution(progresses, speeds) {
  var answer = [];
  var r_index = 0;
  // while(progresses){
  var durations = progresses.map((item, index) =>
    Math.ceil((100 - item) / speeds[index])
  );
  progresses.filter((progress, index) => {
    console.log(durations.slice(0, index));
    for (d of durations.slice(0, index)) {
      console.log(d);
      if (d > durations[index]) {
        return true;
      }
    }
    return false;
  });
}
```

> ## 3. 올바른 괄호

- 나의 풀이

  ```javascript
  function solution(s) {
    var newArr = [];
    var s2Arr = [...s];
    s2Arr.map((el) => {
      if (el === "(") newArr.push(el);
      else if (el === ")") {
        if (newArr.length > 0) newArr.pop();
        else newArr.push(el);
      }
    });
    if (newArr.length === 0) return true;
    else return false;
  }
  ```

  - "("이면 newArr에 push하고
  - ")"이면 newArr에 "("가 있으면 "("을 pop, "("가 없으면 false를 return.
  - 주어지는 문자열이 ")"일때를 대비했어야 했다.

- 좋은 풀이

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

  - 좋은 풀이와 로직은 거의 비슷한데 좋은 풀이는 배열에 push하고 pop하는 대신 +1-1로 구현.
  - 좋은 풀이는 if,else대신 삼항연산자로 코드 길이를 줄였다.

  - for문, forEach, map 의 비교
    1. for문 : break 사용 가능, 기존 배열을 바꾼다.
    2. forEach : break 사용 불가, 기존 배열을 바꾼다.
    3. map : break 사용 불가, 얕은 복사를 활용한다. (기존 배열은 바꾸지 않는다.)

> ## 4. 프로세스

- 나의 풀이

  ```javascript
  function solution(priorities, location) {
    var new_arr = [];
    var order = [...new Set(priorities)].sort((a, b) => b - a); // 큰 순서 정렬
    while (new_arr.length !== priorities.length) {
      for ([index, el] of priorities.entries()) {
        if (el === order[0]) {
          //현재 우선순위가 가장 크면 푸시
          new_arr.push(index);
          priorities[index] = 0;
        } else continue;
        if (priorities.filter((el) => el === order[0]).length === 0)
          order.shift(); //더이상 이 우선순위를 가진 것이 없으면 우선순위 바꾸기
      }
    }
    return new_arr.indexOf(location) + 1;
  }
  ```

  - for loop를 사용하면서 index와 원소 모두 사용하고 싶으면 for ([index, el] of priorities.entries()) 이렇게 `entries`를 사용하면 된다.
  - python의 enumerate랑 비슷!

> ## 5. 다리를 지나는 트럭

```
  function solution(bridge_length, weight, truck_weights) {
  var passed = []; //지난 트럭
  var passing = []; // 지나는 트럭

  for (time; ; time++) {
    //경과 시간
    if (passing.reduce((acc, cur) => acc + cur, 0) < weight)
      passing.push(truck_weights[0]);
    for (el of truck_weights) {
    }
  }
}
```

> ## 6. 주식가격

- 나의 풀이

  ```javascript
  function solution(prices) {
    const index_arr = prices.map((_, i) => i);
    var new_arr = [];
    for (index1 in prices) {
      var is_finished = false;
      for (index2 of index_arr.slice(index1)) {
        if (prices[index2] < prices[index1]) {
          new_arr.push(index2 - index1);
          is_finished = true;
          break;
        }
      }
      if (!is_finished) {
        new_arr.push(prices.length - 1 - index1);
      }
    }
    return new_arr;
  }
  ```

  - 정확성은 통과, 효율성에서 탈락
  - 이중 루프를 사용한 것이 원인인 듯..

- 좋은 풀이.. chat gpt

  ```javascript
  function solution(prices) {
    let result = new Array(prices.length).fill(0);
    let stack = [];

    for (let i = 0; i < prices.length; i++) {
      // 가격이 떨어지는 시점을 찾는다.
      while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]) {
        let j = stack.pop();
        result[j] = i - j;
      }
      stack.push(i);
      console.log(stack, result);
    }

    // 스택에 남아있는 인덱스들은 끝까지 가격이 떨어지지 않은 경우이다.
    while (stack.length > 0) {
      let j = stack.pop();
      result[j] = prices.length - j - 1;
    }

    return result;
  }
  ```

```

```
