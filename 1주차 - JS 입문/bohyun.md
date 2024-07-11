### 1. 제곱수 판별하기

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

차근차근 살피기 위해 for문을 사용했는데 sqrt()함수를 쓰면 두 줄만에 정리됨... 반복문 안 써도 됨

isInteger -> 정수 판별메소드

- 좋은 풀이

```JavaScript
function solution(n) {
    return Number.isInteger(Math.sqrt(n)) ? 1 : 2;
}
```

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

- 좋은 풀이

```JavaScript
function solution(numbers) {
    numbers.sort((a,b)=>b-a);
    return numbers[0]*numbers[1];
}
```

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

map함수랑 콜백함수 다시보자...

- 좋은 풀이

```JavaScript
function solution(strlist) {
    return strlist.map((el) => el.length)
}
```

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

자료형을 넘나드는 것에 두려워 하지말자 ㅎㅎ

```JavaScript
function solution(my_string) {
    var answer = [...my_string].reverse().join("");
    return answer;
}
```

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

### 8. 각도기 계산

```JavaScript
function solution(angle) {
    return angle==180?4:angle>90?3:angle==90?2:1;
}
```

array.filter을 사용해서 걸러내는 방식도 생각해보자. 어쨌거나 시간이 소요되는 걸 막기 위해선...

```JavaScript
function solution(angle) {
    return [0, 90, 91, 180].filter(x => angle>=x).length;
}
```

### 9. 배열 뒤집기

```JavaScript
function solution(num_list) {
    return num_list.reverse();
}
```

### 10. 배열의 평균값

```JavaScript
function solution(numbers) {
    var sum = numbers.reduce((cur,acc) => cur+acc,0);
    return sum/numbers.length;
}
```

콜백함수 연습해보기! 프언때 했으니까 이해하기 쉬울 것
c언어와 다르게 mean을 바로 구하는 방법이 없는 것 같다.

### 11. 숫자 비교하기

```JavaScript
function solution(num1, num2) {
    return num1==num2?1:-1;
}
```

같으면 1, 다르면 -1을 반환

### 12. 나이 계산하기

```JavaScript
function solution(age)
{
    return 2022-age+1;
}
```

역시나 이 방법이 아님. 2022 기준이라고 명시되어 있긴 하지만 현재 시간이 기준일 경우 풀이가 달라짐

```JavaScript
function solution(age)
{
    return new Date().getFullYear() - age + 1;
}
```

Date.getFullYear() 함수를 써보기.

### 13. 가위바위보

```JavaScript

function solution(rsp)
{
    var give = ['2','0','5'];
    var ans = ['0','5','2'];
    var answer = '';
    for (var num of rsp.split(''))
        {
            answer += ans[give.indexOf(num)];
        }
    return answer;
}
```

객체 변수를 사용해보자! 각각 대응되는 경우...

```JavaScript

/*
 가위는 2 바위는 0 보는 5
*/
function solution(rsp)
{
    let arr = {
        2: 0,
        0: 5,
        5: 2
    };
    var answer = [...rsp].map(v => arr[v]).join("");
    return answer;
}
```

### 14~17. 콜백함수 연습(합,차,몫,나머지)

```JavaScript

const solution = (num1, num2) => num1+num2;

const solution = (num1, num2) => num1-num2;

const solution = (num1, num2) => num1*num2;

const solution = (num1, num2) => Math.floor(num1/num2)
```

### 18. 피자나눠먹기(3)

```JavaScript

function solution(slice, n) {
    var i = 1;
    while (slice*i <n) i++;
    return i;
}
```

그냥 올림하면 됨...

```JavaScript

function solution(slice, n) {
    return Math.ceil(n / slice)
}
```

### 19. 피자나눠먹기(2)

```JavaScript
function solution(n) {
    var i=1;
    while ((6*i)%n != 0) i++;
    return i;
}
```

고민해봐야 할 점 : 길더라도 착한 풀이? 아니면 깔끔하게?

### 20. 두 수의 나눗셈

```JavaScript
const solution = (num1,num2) => Math.floor((num1/num2)*1000);
```

Math.floor을 쓰면 음수의 경우에는 적용할 수 없다.
Math.trunc를 사용해보자 (소숫점 이하는 다 버린다)

- 응용

```JavaScript
function solution(num1, num2) {
    return Math.trunc(num1 / num2 * 1000);
}
```
