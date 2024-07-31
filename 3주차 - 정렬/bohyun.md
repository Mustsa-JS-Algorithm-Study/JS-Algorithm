# 보현 3주차

## 01. K번째 수

배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구한다.

이를 구현하는 알고리즘의 논리구조는 다음과 같다.

1. 배열의 i번째 숫자(index i-1)부터 j번째 숫자(index j-1)까지 자른다.
2. sorting한다. (sort 함수를 쓰든, 순서대로 계산하든...)
3. k번째에 있는 수를 출력한다.

```JavaScript
function solution(array, commands) {
    var answer = [];
    for (let i=0;i<commands.length;i++) {
        var temp = array.filter((val,index) => (commands[i][0]-1<=index)&&(index<=commands[i][1]-1));
        temp.sort((a,b)=>a-b);
        answer.push(temp[commands[i][2]-1]);
    }

    return answer;
}
```

### 좋은 풀이

```JavaScript
function solution(array, commands) {
    return commands.map(command => {
        const [sPosition, ePosition, position] = command
        const newArray = array
            .filter((value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1)
            .sort((a,b) => a - b)

        return newArray[position - 1]
    })
}

```

- 논리구조나 사용 함수는 비슷한데 **구조분해 할당**의 차이가 존재!

  - const [a,b,c] = command 이런 식으로 분해하는 게 가능하니까...

- .map 함수를 서서 새로운 배열을 만드는 것도 방법

## 02. 가장 큰 수

여러 개의 수가 주어졌을 때 조합해서 가장 큰 수를 만드려면...
앞자리의 수가 가장 큰 수여야 한다.
2자리 수면 십의 자리 수가 가장 큰 거, 3자리 수면 백의 자리 수가 가장 큰 거... 그런 식으로 비교해야 함

이를 단계적으로 구현하는 논리구조는 다음과 같음

1. 숫자끼리를 비교해서 가장 큰 수를 앞으로 sorting
   1. 십, 백의 자리 수인 경우에는 문자열로 만들어 맨 앞 자리를 비교
2. 만약 동일하다면 이후 자리를 비교

이렇게 하는 게 과연 베스트일까란 생각이 들긴 하지만 뭐...

오래걸리지만 가장 쉽게 하는 방법은
모든 경우의 수를 만든 다음에 sortring -> but 원소가 많을 수록 기하급수적으로 소요시간 증가

1. 일단 일의 자리 수로 이루어진 애들 내림차순 sorting해서 나열
2. 그 사이에 끼워넣기
   1. 맨 앞자리보다 뒷자리에 더 큰 숫자가 있으면 바로 넣기
   2. 같거나 작으면 그 자리의 맨 끝에 넣기
      1. 이 경우 맨 끝에 있는 index를 어떻게 찾는지? -> 오름차순으로 했을 때의 인덱스

이렇게 생각을 해봤지만 구현이 너무 복잡해서 GPT 참고....

```JavaScript
function solution(numbers) {
    // 숫자를 문자열로 변환한 후, 커스텀 정렬 기준에 따라 정렬합니다.
    numbers.sort((a, b) => {
        const strA = a.toString();
        const strB = b.toString();
        return (strB + strA) - (strA + strB);
    });

    // 정렬된 숫자들을 하나의 문자열로 합칩니다.
    const answer = numbers.join('');

    // 숫자가 모두 0인 경우, '0'을 반환합니다.
    return answer[0] === '0' ? '0' : answer;
}
```

### 분석

- 문자열 커스텀 정렬...
- 그냥 위에서 말한 가장 단순하지만 오래걸리는 작업에서 조금 더 라이트하게 가져가는 방식임. 위에서는 모든 경우의수라고 했지만, 이 경우는 모든 경우의 수가 아니라 한 번 하고 더 큰 수를 채택하는... 토너먼트식
- 가볍게 생각하는 습관을 들여보자.
- 콜백함수는 "함수"니까 좀 더 복잡하게 사용해도 될 것 같다.

## 03. H-Index

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 h의 최댓값이 이 과학자의 H-Index입니다.

이 문제를 푸는 알고리즘의 논리구조는 다음과 같다

1. 가장 큰 숫자부터 내림차순 정렬한다
2. 큰 숫자 번 이상 인용된 논문의 수를 구한다
3. 숫자와 논문의 수가 같거나 크면 종료. 그 숫자가 h-index

```JavaScript
function solution(citations) {

    citations.sort((a,b) => b-a);

    for (var i=citations[0];i>0;i--)
    {
        var count = citations.filter((num) => num>=i).length;
        if (i<=count) break;
    }

    return i;
}
```

문제 이해가 잘 안 돼서 시간이 좀 걸렸는데... 풀이과정은 다들 비슷한듯함
