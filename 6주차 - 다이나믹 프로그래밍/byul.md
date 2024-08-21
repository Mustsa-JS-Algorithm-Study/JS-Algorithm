# 1. N으로 표현

```
주어지는 N으로 만들 수 있는 모든 경우의 수를 DP를 이용해서 찾는다.
```

https://school.programmers.co.kr/questions/71263

이 질문을 보면 힌트를 얻을 수 있다.

N = 5일때

1개<br>
dp[1] = {5}

2개<br>
dp[2] = {55, 5+5, 5-5, 5/5, 5\*5}

3개<br>
dp[3] = <br>
555<br>
5+55, 5-55, 5\*55, 5/55 : `dp[1][0] @ dp[2][0]` <br>
5+(5+5), 5-(5+5), 5(5+5), 5/(5+5) : `dp[1][0] @ dp[2][1]`<br>
5+(5-5), 5-(5-5), 5(5-5), 5/(5-5) : `dp[1][0] @ dp[2][2]`<br>
5+(5/5), 5-(5/5), 5(5/5), 5/(5/5) : `dp[1][0] @ dp[2][3]`<br>
5+(5\*5), 5-(5\*5), 5(5\*5), 5(5\*\*5) : `dp[1][0] @ dp[2][4]`<br>
55+5, 55-5, 555, 55/5 : `dp[2][0] @ dp[1][0]`<br>
(5+5)+5, (5+5)-5, (5+5)5, (5+5)/5: `dp[2][1] @ dp[1][0]`<br>
(5-5)+5, (5-5)-5, (5-5)5, (5-5)/5: `dp[2][2] @ dp[1][0]`<br>
(5/5)+5, (5/5)-5, (5/5)5, (5/5)/5: `dp[2][3] @ dp[1][0]`<br>
(5\*5)+5, (5\*5)-5, (5\*5)5, (5\*5)/5: `dp[2][4] @ dp[1][0]`<br>

- N을 3개 사용할 때의 경우들은 N을 1개 사용할때와 2개 사용할때를 순서만 바꿔 사칙연산 조합한 것이다.
- dp[3]은 dp[1]과 dp[2]의 조합 !
- 여기서 주의할 점은 나눗셈, 나눗셈할때 분모에 0이 포함이 안되도록 하기
- 하지만 겹치는 것이 있는 건 어떻게 처리할까 ---> set을 사용하자.

---

- 나의 풀이
  ```javascript
  function solution(N, number) {
    //dp를 9개 길이 배열로 만들고, 각 원소를 Set으로 초기화 한다.
    //왜 9개 나면 나는 dp[1] ~ dp[8]을 사용할 것이기 때문.
    const dp = new Array(9).fill(0).map((el) => new Set());
    //따라서 1부터 시작
    for (let i = 1; i < 9; i++) {
      //연산기호 없이 N만 i개 사용한 숫자를 제일 먼저 집어넣음.
      dp[i].add("1".repeat(i) * N);
      //j와 i-j 사용 ~ i=4이면 (1,3), (2,2), (3,1)
      for (let j = 1; j < i; j++) {
        for (var fromj of dp[j]) {
          for (var fromij of dp[i - j]) {
            //from j 와 from i-j를 사칙연산으로 해서 dp에 추가!
            dp[i].add(fromj + fromij);
            dp[i].add(fromj - fromij);
            dp[i].add(fromj * fromij);
            if (fromij > 0) {
              dp[i].add(fromj / fromij);
            }
          }
        }
      }
      //추어진 number가 dp배열에 있는지 찾는다..
      //set은 include말고 has를 해야 한다.
      if (dp[i].has(number)) return i;
    }
    return -1;
  }
  ```
  const dp = Array.from({ length: 9 }, () => new Set());
  <br>이렇게도 배열을 만들 수 있다.

# 2. 정수 삼각형

- 나의 풀이

  ```javascript
  function solution(triangle) {
    // 마지막 층의 값을 기준으로 합계를 시작
    var cur_floor = triangle.length - 1;
    var sum_arr = triangle[cur_floor];

    while (cur_floor > 0) {
      cur_floor--; // 한 층씩 위로 올라감
      for (var i = 0; i <= cur_floor; i++) {
        // 현재 층의 각 요소에 대해 가능한 두 경로의 합 중 큰 값을 선택
        sum_arr[i] =
          triangle[cur_floor][i] + Math.max(sum_arr[i], sum_arr[i + 1]);
      }
    }
    // 최종적으로 남은 최상단 값이 최대 경로 합
    return sum_arr[0];
  }
  ```

  - 밑에서 위로 올라가는 건 어떨까 생각해 봤다.
  - cur_floor를 움직이게 하고
  - sum_arr 배열을 통해 최종 가장 큰 합을 구할 수 있다.

# 3. 등굣길

![initial](../6주차%20-%20다이나믹%20프로그래밍/images.png)
<br>이 수학문제랑 똑같다.

```
dp를 2차원 지도 크기만큼 배열로 만들어서 최단경로를 찾는다.
```

만약 [2,2] 까지 가려면 `[2,1] 까지 경우의 수 + [1,2]까지 경우의 수` 이다.
<br>-> DP를 활용하기에 최적이다.

```javascript
function solution(m, n, puddles) {
  //각 dp의 원소는 좌표까지의 경로수
  const dp = Array(n + 1)
    .fill()
    .map((e) => new Array(m + 1).fill(0));

  //좌표는 [열, 행] 인데 2차원 배열은 [행, 열] 이라서 바꿔줘야 함
  for (const [x, y] of puddles) {
    dp[y][x] = -1;
  }

  //맵 크기만큼 이중 루프...
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      //puddle의 경로수는 0으로 한다.
      if (dp[i][j] === -1) {
        dp[i][j] = 0;
        continue;
      }
      //dp 배열에 0열, 0행은 없으니까 조건문으로 처리.
      if (i > 1) dp[i][j] += dp[i - 1][j] % 1000000007;
      if (j > 1) dp[i][j] += dp[i][j - 1] % 1000000007;
      dp[i][j] %= 1000000007;
    }
  }
  return dp[n][m];
}
```
