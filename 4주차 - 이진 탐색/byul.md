> # 1. 입국심사

```
- 막혔던 부분
    이분 탐색을 어떤 곳에 써야 하는지 ?
    -> 아직 알고리즘 문제를 많이 안 풀어봐서 그런 것 같다.
```

```
- 사고 방식

  1. 예상되는 최소 시간과 최대 시간을 먼저 생각하자

     - 최소 시간 : 1로 설정
     - 최대 시간 : times의 최댓값\*n

  2. 최소,최대의 중간값으로 시간을 설정하고 그 시간안에 모든 사람이 검사를 받을 수 있는지 확인한다.

  3. - 시간이 남으면 -> 최대를 중간값으로 설정
     - 시간이 부족하면 -> 최소를 중간값으로 설정

  4. 가장 적절한 값을 구한다.
```

```javascript
function solution(n, times) {
  times.sort((a, b) => a - b);
  let min = 1;
  let max = times[times.length - 1] * n;
  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    let total = 0;
    for (var time of times) {
      total += Math.floor(mid / time);
    }
    total >= n ? (max = mid - 1) : (min = mid + 1);
  }
  return min;
}
```

> # 2. 징검다리

https://school.programmers.co.kr/questions/31861

이 링크의 해설을 읽고 논리 과정을 정리해 보았습니다

```
1. distance의 범위가 1,000,000,000 이므로 이분탐색이 가장 효율적이다.
2. 이분탐색을 어떤 값으로 할 것인가?
3. distance가 적합하다. min은 0, max는 distance
4. 이분탐색을 진행하면서,돌을 몇개를 빼야 지금 mid 값이 되는 지를 확인하자.
5. - 만약 주어진 n 보다 적게 필요하면, 더 큰 최솟값이 나올 수 있으니 mid를 min에 맞춘다.
   - n보다 많이 필요하면 mid를 max에 맞춘다.
```
