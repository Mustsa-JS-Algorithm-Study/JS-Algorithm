### 1. 제곱근 구하기

```JavaScript
function solution(n) {
    var answer = 2;
    for (var i=1;i<n/2;i++) {
        if ((i*i)==n) {
            answer=1;
            break;
        }
    }
    return answer;
}
```

최대한 메소드를 안쓰려고 for문을 사용했는데 sqrt()함수를 쓰면 두 줄만에 정리됨... 반복문 안 써도 됨

### 2. 양꼬치

```JavaScript
int solution(int n, int k) {
    int answer = 12000*n + 2000*(k-n/10);
    return answer;
}
```

personal note) n/10에서 혹시 실수로 나눠지면 어떡하나 했는데 생각해보니 n자체가 정수형이라 어차피 결과도 정수임 (바보)

### 3. 최댓값 구하기

```JavaScript
function solution(numbers) {
    var answer = 0;
    var listlen = numbers.length;
    for (var i=0;i<listlen;i++) {
        for (var j=i+1;j<numbers.length;j++)
            {
                if (numbers[i]*numbers[j] >=answer) answer= numbers[i]*numbers[j];
            }
    }
    return answer;
}
```

이 방법 말고 sort를 활용하여 큰 수부터 하는 방법이 있음.
sort의 원리랑 콜백함수 다시 공부하기

### 4. 배열원소의 길이

```JavaScript
function solution(strlist) {
    var answer = [];
    for (var i=0; i<strlist.length;i++)
        {
            answer.push(strlist[i].length);
        }
    return answer;
}
```

map함수랑 콜백 다시보자...

### 5. 문자열 뒤집기

```JavaScript
function solution(my_string) {
    var answer = '';
    for (var i= my_string.length-1;i>=0;i--) answer += my_string[i];
    return answer;
}
```

for문을 최대한 지양하고, 간단명료하게 표현할 수 있도록 노력해보기.

Problem : 거꾸로 뒤집으려 했는데 문자열이라 안됐다
Solution : 그럼 문자열이 아닌 배열로 바꾸어 reverse 해보자!

+) 문자열을 배열로 바꾸는 방법

1. Split 함수 사용
2. JavaScript의 **spread** 함수를 사용해보자.

### 6. 피자 나눠먹기

```JavaScript
function solution(slice, n) {
    var i = 1;
    while (slice*i <n) i++;
    return i;
}
```

Math.ceil 함수 생각해보기. 주어진 수보다 더 크거나 같은 최소의 정수를 반환함.

### 7. 배열 뒤집기

```JavaScript
function solution(num_list) {
    return num_list.reverse();
}
```
