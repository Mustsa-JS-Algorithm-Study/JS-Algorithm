# 보현 8주차 - 투포인터, 누적합

## 1. 투 포인터 알고리즘 (Two Pointer Algorithm)
투 포인터 알고리즘은 배열이나 리스트에서 **특정 조건을 만족**하는 부분 배열이나 요소 쌍을 찾기 위해 사용하는 기법. 두 개의 포인터(인덱스)를 사용해 문제를 효율적으로 해결하므로, 주로 **정렬된 배열**에서 많이 사용되는 편

<br>


### 사용 예시:
- 두 수의 합: 정렬된 배열에서 두 수의 합이 특정 값이 되는 쌍을 찾는 문제
- 부분 배열의 합: 주어진 배열에서 특정 합을 가지는 연속된 부분 배열 찾기


## psudocode
```JavaScript
function twoPointer(nums, target) {

    // 두 포인터를 설정. 하나는 배열의 시작점, 하나는 배열의 끝점
    let left = 0;
    let right = nums.length - 1;

    // 포인터가 서로 만날 때까지 반복 -> 만나면 더이상 탐색할 게 없다는 의미
    while (left < right) {
        const sum = nums[left] + nums[right];

        // 두 수의 합이 목표값과 같은 경우
        if (sum === target) {
            return [left, right]; 
        } else if (sum < target) {
            left++;  // 합이 목표보다 작으면 왼쪽 포인터를 오른쪽으로 이동
        } else {
            right--;  // 합이 목표보다 크면 오른쪽 포인터를 왼쪽으로 이동
        }
    }

    return null;  
}
```

<br>

## 2. 누적합 알고리즘 (Prefix Sum Algorithm)

누적합 알고리즘은 배열의 **특정 구간의 합**을 빠르게 계산하기 위해 사용되는 방법. 배열의 각 요소까지의 누적된 합을 미리 계산해두고, 이를 활용하여 구간합을 구함


<br>


### 사용 예시:
- 구간 합 계산: 여러 구간 합 쿼리를 효율적으로 처리해야 하는 경우
- 부분 배열의 합: 특정 합을 가지는 부분 배열을 찾는 문제


## psudocode
```JavaScript
function prefixSum(arr) {
    //누적합 초기화
    const prefix = new Array(arr.length + 1).fill(0);

    for (let i = 1; i <= arr.length; i++) {
        prefix[i] = prefix[i - 1] + arr[i - 1];
    }

    return prefix;
}

// 특정 구간의 합 계산
function rangeSum(prefix, left, right) {
    return prefix[right + 1] - prefix[left];
}
```


