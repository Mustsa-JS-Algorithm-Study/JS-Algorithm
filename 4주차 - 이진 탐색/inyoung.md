# 4주차 정리- 이진 탐색

### 이진 탐색(Binary Search) 알고리즘이란?


`이진 탐색 알고리즘`은 정렬된 배열을 타겟값과 중간값의 비교를 통해 씩 나누면서 탐색하여 특정 값을 효율적으로 찾는 방법입니다.


### 이진 탐색 알고리즘의 작동 원리


**초기 설정**

시작 인덱스 (left)와 끝 인덱스(right)를 설정합니다.
시작 인덱스는 0, 끝 인덱스는 배열의 마지막 인덱스입니다.


**중간값 계산**

중간값 인덱스의 값이 타겟값과 같으면 중간값 인덱스를 반환하고 알고리즘을 종료하고,
그게 아니면 탐색값 조정을 거칩니다.

**탐색값 조정**
중간값이 인덱스의 값이 타겟 값보다 작다면, left 인덱스를 mid+1로 설정합니다.
크면 right 인덱스를 mid-1로 설정합니다.

**반복**
중간값 계산 - 탐색값 조정을 반복합니다.
left인덱스가 right 인덱스보다 커지면, -1(실패)을 반환합니다.

**💡주의**

정렬되어 있는 배열에서만 이분탐색을 적용할 수 있습니다.


**Javascript 구현**

```js
function binarySearch(sortedArray, target) {
    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let midValue = sortedArray[mid];

        if (midValue === target) {
            return mid; // 값을 찾음
        } else if (midValue < target) {
            left = mid + 1; // 오른쪽 절반을 계속 탐색
        } else {
            right = mid - 1; // 왼쪽 절반을 계속 탐색
        }
    }

    return -1; // 값을 찾지 못함
}
```

