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



## 문제1. 입국심사

### 접근방식
worst case : 가장 심사시간이 긴 사람이 계속해서 심사를 하니까 times 배열에서 최댓값을 추출한 후 n이랑 곱하기

이 1~worstcase의 totalTime범위 내에서 times배열의 원소들로 나눈 시간을 합했을 때 people의 수가 target number인 n이 나오는가.. 를 check해보면 됩니다.

이제 어떻게 이 범위 안에서 돌아가면서 check할것인지가 관건인데.

1)  n이랑 times의 원소의 range 자체가 엄청나게 크다.

2) 1~wortcase까지.. totalTime마다 최소로 걸릴 수 있는 people이 있을 거고, 이건 당연히 totalTime이 커짐에 따라 커질 것이다. (정렬된 리스트..)

  
이 두가지 단서 '경우의 수가 ㅈㄴ 크다', '정렬된 값의 배열들'에서 착안에서 binary search로 풀어봅시다.

``` js
function solution(n, times) {
    let start = 1;
    let end = Math.max(...times) * n;
    let answer;
    while(start <= end){
        let middle = Math.floor((start + end)/2);
        let 모든사람최솟값=0;
        for (인당걸리는시간 of times){
            모든사람최솟값+= Math.floor(middle / 인당걸리는시간);
        }
        if (모든사람최솟값 >= n){
            answer= middle;
            end = middle -1;
        }
        else {
            start = middle +1;
        }
            
    }
    return answer;
}
```