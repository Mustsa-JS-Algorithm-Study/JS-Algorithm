# 보현 2주차

7/27
개인적인 사정으로 2주차 때 참여가 어려웠어서 지금에서야 작성합니다...

## 1. 같은 숫자는 싫어

```JavaScript
function solution(arr)
{
    var answer = [];
    answer.push(arr[0]);
    for (var i=1;i<arr.length;i++) {
        if (arr[i] == arr[i-1]) continue;
        else answer.push(arr[i]);
    }
    return answer;
}
```

Personal note)
단순히 생각해보면 그냥 순서대로 체크하고 다음 인덱스에 존재하는 것과 동일한지만 체크하면 됨. (근데 이 방법은 반복문을 사용하고, if-else를 사용하고 계속 비교한다는 점에서 아쉬움을 가짐)

### 좋은 풀이

```JavaScript
function solution(arr)
{
    return arr.filter((val,index) => val != arr[index+1]);
}
```

- .filter 메소드 :() 내부 조건에 해당하는 것만 필터링
- **콜백 함수** : 주어진 값에 해당되는 부분을 가지고 새로운 함수를 간단히 만들도록 시도해보기

### 나아가야 할 점

계속 콜백함수라던지, JavaScript 내부의 함수를 적절히 활용하지 못하는 듯. 익숙해질 필요가 있을 것 같다.

## 2. 기능개발

배포일 및 총 배포작업 수를 계산하려는 알고리즘은 다음과 같다.

1. 각 요소별 소요 시간 계산하기
2. 소요 시간 리스트를 만들어 비교하기
3. 이전 인덱스와 비교했을 때 더 작은 것까지 세아리기
4. 출력

```JavaScript
function solution(progresses, speeds) {
    const time = [];
    for (var i=0;i<progresses.length;i++) {
        var takenTime = Math.ceil((100-progresses[i])/speeds[i]);
        time.push(takenTime);
    }


    const answer = [];
    var i = 0;

    while (i < time.length) {
        var currentDeployTime = time[i];
        var count = 0;

        while (i < time.length && time[i] <= currentDeployTime) {
            count++;
            i++;
        }

        answer.push(count);
    }
    return answer;
}
```

personal note) 원래는 processes.map(x=>)를 활용하려고 했지만 그럼 speed에 어떻게 접근해야 하는지 몰랐음. 근데 어차피 progress와 speeds의 index가 동일하므로 콜백함수에서 바로 사용하면 된다.

### 좋은 풀이

```JavaScript
function solution(progresses, speeds) {
    let answer = [0];
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
    let maxDay = days[0];

    for(let i = 0, j = 0; i< days.length; i++){
        if(days[i] <= maxDay) {
            answer[j] += 1;
        } else {
            maxDay = days[i];
            answer[++j] = 1;
        }
    }

    return answer;
}
```

while문을 쓰는 게 편할까 아니면 For문으로 (i,j) 두개를 쓰는게 편할지는 메모리에 따라 다를듯

## 3. 올바른 괄호

괄호가 올바르게 열림/닫힘인지 확인하는 조건

1. 첫 문자는 반드시 (, 끝 문자는 반드시 )
2. ( 개수와 ) 개수가 동일한지 확인

이라고 생각해서 아래와 같이 코드를 짰는데 테스트 케이스 중 두 개를 통과하지 못함

```JavaScript
function solution(s){
    var answer = true;

    if (s[0] == '(' && s[s.length-1]==')') {
        if (count(s,'(') != count(s,')')) answer = false;
    } else answer = false;

    return answer;
}

function count(s,findChar) {
    var counting = 0;
    for (var i=0;i<s.length;i++) {
        if (s[i] == findChar) counting++;
    }
    console.log(counting);
    return counting;
}
```

이유 -> ())(()의 경우를 해결하지 못함. 따라서 (와 )의 매칭이 반드시 필요해보임.

이는 stack의 기능을 잘 활용해보자! (**짝 맞는 걸 판단할 경우 stack이 유리**)

'('가 들어오면 count 증가, ')'가 들어오면 count 감소. count는 반드시 0 이상이어야 하므로 음수가 되는 순간 false로 판단하기, 마지막에 count가 0이 아니면 false

```JavaScript
function solution(s){

    var count = 0;
    for (var i=0;i<s.length;i++)
        {
            if (s[i] == '(') count++;
            else if (s[i] == ')') count--;

            if (count<0) return false;
        }
    if (count != 0) return false;
    return true;
}

```

### 좋은 풀이

```JavaScript
function solution(s){
    let cum = 0
    for (let paren of s) {
        cum += paren === '('? 1: -1
        if(cum < 0) {
            return false
        }
    }
    return cum === 0? true: false;
}
```

- 논리는 동일하지만 사용한 함수와 연산자에 차이가 있음
- paren **of** s : 문자열/리스트 원소 하나씩 가져오기
- ? 연산자 와 덧셈을 한번에 사용한 것, return 때도 사용한 것.

물론 이해하기 쉬운 건 위의 코드겠지만 간단히 표현하는 법도 익숙해져보기

## 4. 프로세스

우선순위를 고려한 프로세스 진행 상황 판단 알고리즘의 전개는 다음과 같다 (Queue)

1. 맨 앞에 있는 요소 꺼낸 뒤 더 큰 수 있는지 판단
2. 있으면 뒤에 push, 없으면 실행 -> count 1 추가
3. 순서대로 반복

(이때, 실행되면 index가 -1이 된다고 생각하면 -1이 될 때가 수행될 때!)

```JavaScript
function solution(priorities, location) {
    var currentLocation = location;
    var count = 0;

    while (currentLocation >= 0) //음수면 종료
    {
        for (var i=1;i<priorities.length;i++)//맨 앞에 거보다 큰 게 있는지 찾기
        {
            if (priorities[0] < priorities[i]) //큰 게 있다!
            {
                if (currentLocation == 0) currentLocation+=priorities.length-1;
                else currentLocation--;
                priorities.push(priorities[0]);
                priorities.shift();
                break;
            }
        }

        if (i==priorities.length) // 큰 게 없다 -> 실행!
        {
            if (currentLocation != 0) priorities.shift() ;
                count++;
                currentLocation--;
        }
    }
    return count;
}
```

### 좋은 풀이

```JavaScript
function solution(priorities, location) {
    var list = priorities.map((t,i)=>({
        my : i === location,
        val : t
    }));
    var count = 0;
    while(true){
        var cur = list.splice(0,1)[0];
        if(list.some(t=> t.val > cur.val )){
            list.push(cur);
        }
        else{
            count++;
            if(cur.my) return count;
        }
    }
}

```

다시 잘 이해해보자... 아직 객체 자료형에도 익숙하지 않은듯

## 5. 다리를 지나는 트럭

무슨소리인지 모르겠어서 알고리즘 논리 구조는 gpt의 힘을 이용함...

다리를 건너는 트럭의 모습은 Queue라 생각하면 됨.

1. 다리를 오르는 트럭을 Queue에 추가
2. 다리를 다 건너면 Queue에서 제거
3. 조건 
   1. 다리 길이보다 트럭의 수가 작을 것
   2. 트럭 무게의 총합이 하중보다 작을 것

```JavaScript
function solution(bridge_length, weight, truck_weights) {
    let time = 0;  // 경과 시간
    let bridge = [];  // 다리 위 트럭들
    let totalWeightOnBridge = 0;  // 현재 다리 위 트럭들의 총 무게

    // 다리의 초기 상태를 설정
    for (let i = 0; i < bridge_length; i++) {
        bridge.push(0);
    }

    while (truck_weights.length > 0 || totalWeightOnBridge > 0) {
        time += 1;
        // 다리에서 트럭이 내려감
        let truckLeaving = bridge.shift();
        totalWeightOnBridge -= truckLeaving;

        if (truck_weights.length > 0) {
            // 다음 트럭이 다리에 올라갈 수 있는지 검사
            if (totalWeightOnBridge + truck_weights[0] <= weight) {
                let truckEntering = truck_weights.shift();
                bridge.push(truckEntering);
                totalWeightOnBridge += truckEntering;
            } else {
                // 트럭이 다리에 올라갈 수 없으면 시간을 보내기 위해 0을 추가
                bridge.push(0);
            }
        } else {
            // 대기 중인 트럭이 없으면 시간을 보내기 위해 0을 추가
            bridge.push(0);
        }
    }

    return time;
}

```

다시 보면서 이해해볼 것... 아직 잘 이해가 되지 않음


## 6. 주식 가격

초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

에 대한 알고리즘 논리 구조는 다음과 같다.

1. 자기보다 작은 게 있는지 차례대로 찾기
2. 있다면 -> 작은 수의 인덱스 - 현 인덱스
3. 없다면 -> 끝 인덱스 - 현 인덱스

```JavaScript
function solution(prices) {
    var answer = [];
    for (var i=0;i<prices.length;i++)
    {
        for(var j=i+1;j<prices.length;j++)
        {
            if (prices[i] > prices[j])
            {
                j++;
                break;
            }
        }
        answer.push(j-i-1);
    }
    return answer;
}
```
