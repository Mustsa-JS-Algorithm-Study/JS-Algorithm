# 김경우
## 투포인터
### (1) 요약
두 개의 포인터를 사용해서 배열이나 문자열같은 자료구조를 탐색하는 알고리즘.

특정 조건을 만족하는 요소를 찾거나 부분 배열이나 문자열을 처리할 때 사용.

특히 정렬된 배열에서 두 요소를 찾거나 배열의 양끝에서부터 탐색해야 하는 경우 효과가 좋음.

### (2) 예시
````javascript
// 배열 안의 두 수를 더해서 가장 빨리 target을 만드는 요소 찾기
function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

const arr = [1, 2, 3, 4, 6];
const target = 6;
console.log(twoSum(arr, target)); // Output: [1, 3]
````
---
## 누적합
### (1)요약
누적합 알고리즘은 특정 구간의 합을 빠르게 계산하는 알고리즘

반복적인 구간 합을 구해야할 때 쓸모 굿

누적합 배열은 원본 배열의 각 요소까지의 합을 저장하고 있는 배열


### (2)예시
````javascript
function prefixSum(arr) {
    const prefix = [];
    prefix[0] = arr[0];

    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    return prefix;
}

const arr = [1, 2, 3, 4, 5];
const prefix = prefixSum(arr);
console.log(prefix); // Output: [1, 3, 6, 10, 15]

````
