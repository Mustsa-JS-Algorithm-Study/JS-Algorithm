# 김경우
---
## 1. 입국심사
- 나의 풀이
````javascript
function solution(n, times) {
    var answer = 0;
    // 구하는 것이 무엇인지 파악하는 것이 중요 여기서는 '시간'
    // 만약 n = 6, times가 [7,10]이면 
    // 적어도 1분 이상인 것은 당연, 최대는 확실히 60분
    // 60분이 걸렸으면 7분짜리 검사관은 8명, 10분짜리 검사관은 6명을 보내서 
    // 총 14명을 보냈을 거임.
    
    // @만약에 30(round((1+60)/2))분이 걸렸다! 라고하면??
    // 7분짜리 검사관은 4명, 10분짜리 검사관은 3명을 보냈음
    // 어라? 30분동안 7명 보냈네?
    // 그럼 정답은 30분보다 작겠네??
    
    // @그럼 15(round((1+30)/2))분이 걸렸다! 라고하면??
    // 7분짜리 검사관은 2명, 10분짜리 검사관은 1명을 보냈음
    // 어라? 15분동안 꼴랑 3명 보냈네?
    // 그러면 정답은 15분보다 크겠네??
    
    // @그럼 22(round((15+30)/2))분이 걸렸다! 라고하면??
    // 7분짜리 검사관은 3명, 10분짜리 검사관은 2명 보냈음
    // 어라? 22분동안 꼴랑 5명 보냈네?
    // 그러면 정답은 22분보다 크겠네?
    
    // @그럼 26(round((22+30)/2))분이 걸렸다! 라고하면??
    // 7분짜리 검사관은 3명, 10분짜리 검사관은 2명 보냈음
    // 어라? 26분동안 아직도 5명??
    // 그러면 정답은 26분 이상!!
    
    // @그럼 28(round((26+30)/2))분이 걸렸다! 라고하면??
    // 7분짜리 검사관은 4명, 10분짜리 검사관은 2명 보냈음
    // 오!! 정답은 28분!!!
    // 라고 끝내면 안된다.
    // 왜냐면 26이 아닌걸 알았고, 28이 맞는건 알았지만
    // 프로그램 요 녀석은 28이 최소인지는 모르기 때문이다.
    // 다시 말해 27분이 정답이 되는지 안되는지 모른다는 말이다.
    // 그래서 반복을 계속 해야 한다.
    
    // @그럼 27(round((28+26)/2))분이 걸렸다! 라고하면??
    // 7분짜리 검사관은 3명, 10분짜리 검사관은 2명 보냈음
    // 아직도 5명?
    // 이제 진짜 끝, 28분이 답.
    
    
    var arr = times.sort((a,b) => a-b);
    var low = arr[0];
    var high = arr[arr.length-1]*n;
    
    while(high >= low) {
        var temp1 = 0;
        var mid = Math.floor((low+high)/2);
        for(let i = 0; i < arr.length; i++) {
            temp1 += Math.floor(mid/arr[i])
        }
        if(temp1 >= n) {
            high = mid - 1
        }
        else if(temp1 < n) {
            low = mid + 1;
        }
    }

    return low;
}
````
- 다른 풀이
````javascript
var floor = n => Math.floor(n);

function solution(n, times) {
    var answer = 0;

    return s(n,times);
}
function s(n, times ) {
    var min =0 , max = n * Math.max.apply(null, times);
    while (min <= max) {
        var mid = floor((min + max) / 2);
        var maxInMid = times.reduce((acc,cur)=>acc += floor(mid/cur) , 0);
        if( n <= maxInMid) {
            max = mid -1;
        } else {
            min = mid + 1;
        }
    }
    return min;
}
// 알고리즘 자체가 이분 탐색을 이용하는 문제라 풀이의 기조는 같다.
// 하지만 이 사람과 나의 차이점은 초기 최대값과 최솟값을 정할때이다.
// 이 사람은 Math.max 함수를 사용했는데 이 함수는 시간이 생각보다 걸려서 크기가 작은 곳에서는 사용하는게 좋은 방법은 아니다. (다행이 여기서는 10이라 충분히 컸음, 2억만 되도 max 값을 그냥 2억으로 때려 밖는게 좋음)
// 그리고 나는 검사관들이 통과시킨 승객의 수를 for문으로 돌렸는데 이 사람은 똑똑하게 reduce 함수를 적용했음. 나도 쓰려고 했는데 적용을 어떻게 시킬까 하다가 잘 안되서 그냥 for문을 사용했음.
````

- 학습 내용
```
1. reduce 함수의 사용법을 공부했다.
Array.reduce() : 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환.

ex) 
const array1 = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

reduce 함수의 인자들을 알아보자.
먼저 reduce 함수는 이렇게 생겼다. arr.reduce(callback[, initialValue])
콜백 함수는 인자가 4개까지 들어가고 1,2번째 인자는 필수, 3,4,번째 인자는 선택이다.
1번째 인자로는 accumulator로 누산기이다.(누적합)
2번째 인자로는 currentValue로 배열에서 보고 있는 현재의 값이다.
3번째 인자로는 currentIndex로 현재 배열에서 currentValue의 Index이다.
4번째 인자로는 reduce()를 호출한 배열이다.

initialValue는 callback 함수를 최초 호출에서 callback함수의 1번째 인자인 accumulator에 제공하는 값이다. 초기값을 사용하지 않으면 accumulator는 배열의 첫번째 값을 사용한다.

초기값이 제공되면 맨 처음에 currentValue는 배열의 첫번째 값을 가지고, 초기값이 제공되지 않닸아면 accumulator가 배열의 첫번째 값을 가지고, currentValue가 배열의 두번째 값을 가진다.

return 값은 누적합이다.
```
---
## 2. 징검다리 건너기 
기존의 '징검다리' 문제는 너무 어려워서 포기하고 비슷한 이진 탐색 문제를 찾아서 풀었습니다.
https://school.programmers.co.kr/learn/courses/30/lessons/64062
- 나의 풀이
````javascript
function solution(stones, k) {
    var answer = 0;
    
    var left = 1;
    var right = 200000000
    var mid;
    var max;
    var count;
    
    while(right >= left) {
        mid = Math.floor((right+left)/2);
        max = 0;
        count = 0;
        
        //연속된 0의 개수 구하기
        for(const element of stones) {
            if(element - mid <= 0){ 
                max++;
                if(max > count) count = max;
                // 0이 k개면 못건너는 상황이니까 더 볼 필요도 없이 CUT
                if(count === k) break;
            }
            else max = 0;
        }

        // 0이 k 개면 건너는 니니즈 친구들을 줄어야되니까 right을 감소
        if(count ==== k) { right = mid - 1; } 

        // 그게 아니면 더 많은 니니즈 친구들이 건널 수 있으니까 left 증가
        else { left = mid + 1 }

        answer = left
    }
    return answer;
}
````

- 다른 풀이
````javascript
function solution(stones, k) {
    stones.push(Infinity);
    let stack = [{count: Infinity, idx: -1}];
    let answer = Infinity;
    for (let i = 0; i < stones.length; i++) {
        const right = { count: stones[i], idx: i };
        while (stack[stack.length - 1].count < right.count) {
            const mid = stack.pop();
            const left = stack[stack.length - 1];
            if (right.idx - left.idx > k) {
                answer = Math.min(answer, mid.count);
            }
        }
        stack.push(right);
    }
    return answer;

    // 스택을 이용한 풀이, 여기선 이진탐색이 거의 O(nlogn) 인데 이건 거의 O(n)인 기발한 풀이
    // right, mid, left 3개씩 보는 이유는 3개씩 보면서 mid 가 right 보다 작고(적어도 right보다 0이 빨리되고), right과 left의 위치의 차이를 보면 right까지 갔을때의 니니즈 친구들이 몇명이나 건널 수 있는지 알 수 있게 됨
}

````
- 학습 내용
````
1. 솔직히 스택을 이용한 풀이는 너무 어나더 레벨이라 벽이 느껴짐.
2. 이진 탐색 문제인지 알아보고, 내가 구해야 하는 값을 명확하게 할 수록 풀기가 수월하다고 느꼈다.
3. 이진 탐색 문제인지 판단하는 방법은 내가 구해야 하는 값의 범위를 생각했을 때 매우 크고(대충 몇 억), 범위가 유한하게 정해져있을 때 하면 되겠다고 생각이 들었다. 
4. 그리고 내가 구해야 하는 값은 문제에서 알 수 있고, 구해야 하는 값이 주어진 문제의 입력 자체에서 찾는 것인지, 아니면 '~~하는 데 최소(최대) 시간(비용, 거리, ...)이 얼마냐' 같은 문제인지에 따라서도 다르게 생각할 수 있었다. 이때는 시간(비용, 거리, ...)을 내가 fix 하였을 때 그 시간 동안 얼마나 수행했는지에 따라서도 이진 탐색이 가능하겠다. ~했다면 더 많은 시간이 들고, ~~~ 했다면 더 적은 시간이 들어야 할 것이다.
````
