### 보현 6주차


# 다이나믹 프로그래밍(Dynamic Programming, DP)

문제를 여러 개의 하위 문제로 분해, 이 하위 문제들을 **재귀적**으로 해결하며 그 결과를 저장해 두었다가 동일한 하위 문제가 다시 나올 때 계산을 반복하지 않고 저장된 값을 사용하는 방식


### 탑다운(top-down)
큰 문제를 해결하기 위해 재귀적으로 작은 문제를 해결
이미 해결된 하위 문제의 결과를 저장 -> 같은 계산이 반복되지 않도록

### 바텀업(Bottom-Up)
작은 문제부터 해결해 나가면서 점차 큰 문제를 해결해 나가는 방식




# 문제
## 1. N으로 표현

문제설명 )

아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.

12 = 5 + 5 + (5 / 5) + (5 / 5)
12 = 55 / 5 + 5 / 5
12 = (55 + 5) / 5

5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.
이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.



> 이 문제에서 핵심 아이디어는 숫자 N을 **여러 번** 사용하여 다른 숫자들을 어떻게 표현할 수 있는지를 점진적으로 계산하는 것

최소 횟수를 찾아야 하므로 Bottom-up 방식으로 진행되어야 한다. 
check라는 array를 만든다면, 

이를 구현한 알고리즘 논리구조는 다음과 같다.

1. 입력으로 주어진 숫자 N이 number와 동일한 경우 -> 1개만으로 만들 수 있다는 거니까 1 return
2. check라는 집합을 생성 -> check[i]는 숫자 N을 i+1번 사용하여 만들 수 있는 모든 숫자들의 집합을 의미
   (계산 효울성을 위해 중복된 값을 피하기 위해 집합을 사용)


```JavaScript
function solution(N, number) {
    if (N === number) return 1;
    const check = new Array(8).fill().map(() => new Set());

    for (let i = 0; i < 8; i++) {
        check[i].add(Number(N.toString().repeat(i+1)));
        for (let j = 0; j < i; j++) {
            for (let item1 of set[j]) {
                for (let item2 of set[(i-j-1)]) {
                    check[i].add(item1 + item2);
                    check[i].add(item1 - item2);
                    check[i].add(item1 * item2);
                    check[i].add(item1 / item2);
                }
            }
        }

        if(check[i].has(number)) {
            answer = i+1;
            break;
        }
    }
    return answer;
}
```



