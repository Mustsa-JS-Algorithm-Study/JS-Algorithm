# 보현 5주차 - BFS DFS

`BFS(Breadth-First Search)`

루트 노드에서(혹은 랜덤노드) 선택한 지점으로부터 가장 인접한 노드들부터 방문하는 방법
인접한 게 없으면 저장해놨던 다음 노드에서 다시 조사한다.
-> 이 경우 **Queue**를 사용하여 해결

`DFS(Depth-First Search)`

루트 노드에서(혹은 랜덤노드) 선택한 지점에서 갈 수 있는 노드들로 전부 이동
-> 갈 수 있는 게 없다면 그 이전으로 다시 돌아와서 확인

## 1. 타겟 넘버

> 문제)
>
> n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.
> 사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

일단 생각을 정리해보면,

1. 모든 노드를 +로 설정한다
2. 다녀간 노드를 -로 설정한다
3. 해당 단계까지 진행했을 때, 노드들의 합이
   1. 타겟넘버보다 크면 -> 현재 노드를 음수로 바꾸고(뺄셈) 다음 노드로 이동
   2. 타겟넘버보다 작으면 -> 불가능.
   3. 타켓넘버와 같으면 count 추가, 남아있는

```JavaScript
let count = 0;

function solution(numbers, target) {

    numbers.sort((a,b) => b-a); //오름차순 정렬

    const sum = numbers.reduce((acc, curr) => {return acc + curr},0);
    let testSum = sum;

    check(numbers,target,count,sum);

    return count;
}

function check(numbers,target,count,sum) {
    var testSum = sum;

    for (let i=0;i<numbers.length;i++) {
        testSum = testSum - numbers[i]*2;

        if (testSum>target) continue;
        else if (testSum===target) {
            count++;
            check(numbers.slice(i,numbers.length),0,count,testSum);
            testSum = sum;
        }
        else if (testSum<target){
            testSum=sum;
        }
    }

}
```

그런데 이렇게 하니 문제는, maximum 문제가 발생...
아마 재귀함수에서 reduce 함수를 구하는 게 문제였던 걸로 생각함.

```JavaScript

function solution(numbers, target) {
    let answer = 0;
    getAnswer(0,0);
    function getAnswer(x,value) {
        if(x<numbers.length){
            getAnswer(x+1,value + numbers[x]);
            getAnswer(x+1,value - numbers[x]);
        } else{
            if(value === target){
                answer++
            }
        }
    }
    return answer;
}

```

DFS와 BFS의 이론적 내용만 알았지, 실제 코드 구현은 잊어버린 상태인 것 같아 다시 코드 복습하는 과정을 가졌다!


