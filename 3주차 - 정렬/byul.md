> # K번째 수

- 나의 풀이

  ```javascript
  function solution(array, commands) {
    return commands.map(
      (el) => array.slice(el[0] - 1, el[1]).sort((a, b) => a - b)[el[2] - 1]
    );
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(array, commands) {
    return commands.map((command) => {
      const [sPosition, ePosition, position] = command;
      const newArray = array
        .filter(
          (value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1
        )
        .sort((a, b) => a - b);

      return newArray[position - 1];
    });
  }
  ```

  - 나보다 코드는 길지만 가독성이 좋았던 것 같다.
  - 실제 코딩테스트에서는 읽기 쉬운 코드가 더 점수가 높지 않을까?

> # 가장 큰 수

```
머리로는 쉬운것 같은데 코드로 구현하는 것이 어려웠다.
30 과 3 중에 3 이 더 앞으로 가야 되는 것을 어떻게 구현할까?
-> 303과 330 중에 330이 더 크니까 3이 더 앞으로 간다.
```

- 좋은 풀이
  ```javascript
  function solution(numbers) {
    var answer = numbers
      .map((el) => el.toString())
      .sort((a, b) => b + a - (a + b))
      .join("");
    return answer[0] === "0" ? "0" : answer;
  }
  ```

> # H-Index

- 나의 풀이

  ```javascript
  function solution(citations) {
    var if_returned = false;
    for (i = citations.length; i >= 1; i--) {
      if (citations.filter((item) => item >= i).length >= i) {
        return i;
      }
    }
    if (!if_returned) return 0;
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(citations) {
    let i = 0;

    while (i + 1 <= citations.sort((a, b) => b - a)[i]) i++;

    return i;
  }
  ```

  1. 내림차순 정렬 // [6,5,3,1,0]
  2. i=0 -> i+1인 1개가 1이상이면 ok
  3. i=1 -> 2개가 2 이상이면 ok
  4. ...

- 놓쳤던 부분

  ```
  최댓값을 구할때 나는 for loop을 거꾸로 돌려서 생각했다.
  반복문을 통해 조건을 만족하지 않을때까지 돌리는 것도 괜찮은 방법 같다.

  인덱스와 개수를 같이 생각해보는 것을 놓쳤다.
  내림차순으로 정렬했을 때
  인덱스의 원소가 인덱스+1 이상이면 그 앞의 인덱스의 원소도 당연히 만족, 이 문제의 조건을 만족한다...
  ```
