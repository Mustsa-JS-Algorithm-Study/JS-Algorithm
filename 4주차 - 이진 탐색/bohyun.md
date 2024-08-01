# 보현 4주차 이분탐색

## 01. 입국심사

더 빨리 끝나는 곳이 있는지 체크하는 과정이 필요함
-> 빈 심사대의 소요시간 vs 기다리는 시간 + 심사하는 데 걸리는 시간

예) 7분 기다림 + 7분 소요 > 10분 소요 -> 이 경우 10분 소요되는 심사대로 갈 것

이를 구현할 수 있는 논리구조는 다음과 같다.

1. 특정 심사대에 있는 사람 수 리스트를 생성, 줄 설 때마다 사람 원소 추가
2. 원소별로 시간 계산하기 (시간 비교)

였는데...이를 구현하는 데 어려움을 겪었다.

- 문제 1 : 객체처럼 써보려고 했는데 실패함.
- 문제 2 : 각각의 리스트를 만드려고 했는데 몇 개의 times가 들어올 지 모르기 때문에 변수 선언이 어려움(너무 많아짐)
- 문제 3 : dictionary를 써볼까 했지만... key-value 각각 할당하는게 좀 귀찮음

그래서 GPT의 도움을 빌렸다!
주제에 맞게 이분탐색을 활용했어야 하는데 그러지 못햇다..

```JavaScript
function solution(n, times) {
    // 최소 시간
    let left = 1;
    // 최대 시간: 가장 느린 심사관이 모두 처리하는 경우
    let right = Math.max(...times) * n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        // 중간 시간 내에 처리할 수 있는 사람의 수
        const peopleProcessed = times.reduce((sum, time) => sum + Math.floor(mid / time), 0);

        // 처리할 수 있는 사람의 수가 n보다 크거나 같으면 시간 줄이기
        if (peopleProcessed >= n) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}
```

### 분석

이분 탐색은 처음부터 하나하나 계산하는 게 아니라 중간 지점(mid)을 사용한다는 점에서 강점을 가진다.
그렇기 때문에 중간 지점이 있다는 건 -> 최대/최소도 있다는 것. 그 둘의 중간점이 mid 값일 것이다

위 코드에서 사용한 논리구조다

- 각 심사대에서 최종 걸리는 최소시간과 최대시간을 구한다
  - 1. 최소 : 1분(혹은 0분)
  - 2. 최대 : 가장 오래 걸리는 심사대에서 n명 모두 받을 경우
- 중간값을 구하여 이 시간 내에 모든 사람들이 심사를 받을 수 있는지 확인한다
  (이때, 중간값을 구하는 이유는 그냥 처음부터 하면 많으니까... 임의로 설정한 것)
  - 모두 심사가능 : 더 최소 시간이 있는지를 확인하기 위해 최대시간 = mid로 설정
  - 심사 불가 : 시간이 충분하지 않다는 의미이므로 최소 = mid로 설정
- 최대>최소가 아니면 종료 (값을 찾았다는 의미)

### 내가 놓친 부분

이분탐색이라는 정말 쉬운 계산방법을 생각지 못하고 처음부터 차근차근 하려 한 것!
_무엇보다 **임의의 값**을 사용했어도 됐었다는 점을 캐치하지 못했다._

중간값이라고 해서 정확한 값이 아니어도 된다! 최소 시간에 1씩 더한 것처럼...
아무튼 쉽게 생각해보자

## 02. 징검다리

문제 이해가 너무 어려워서 뭔 소린지 한참을 이해해봤는데...
일단 이해한 바를 정리해서 작성한 논리구조는 다음과 같음

1. 바위의 위치를 오름차순으로 정렬함 (첫번째 바위-마지막 바위 떨어진 거리를 구하기 위함)
2. 이분탐색의 방법을 활용하여 start,end를 정하고 mid를 점점 찾아나가기
   1. mid값보다 거리가 더 작은 바위가 있다면 제거 (왜냐면 ... 최솟값이니까)
   2. 제거한 바위가 n개 이상이면 오류 -> mid 1 감소

```JavaScript
function solution(distance, rocks, n) {
    rocks.sort((a, b) => a - b); //바위 오름차순 정렬
    var start = 0, end = distance;

    while (start <= end)
    {
      var mid = Math.floor((start + end) / 2);

      for (var eachRock of rocks) {
        var count = 0;

        if () //여기서 막힘 -> mid값보다 거리가 더 작은 바위 제거 부분을 rocks의 하나하나 판단해야하는지...
      }

    }
}
```

```JavaScript
function solution(distance, rocks, n) {
    rocks.sort((a, b) => a - b); //바위 오름차순 정렬
    var start = 0, end = distance;

    function isPossible(mid) {
        let removeCount = 0;
        let prevPosition = 0;

        for (let rock of rocks) {
            if (rock - prevPosition < mid) {
                removeCount++;
                if (removeCount > n) {
                    return false;
                }
            } else {
                prevPosition = rock;
            }
        }

        if (distance - prevPosition < mid) {
            removeCount++;
            if (removeCount > n) {
                return false;
            }
        }

        return true;
    }

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (isPossible(mid)) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return end;
}
```
