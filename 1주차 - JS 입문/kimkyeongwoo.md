# 김경우

## 1. 최댓값 만들기(1)

- 나의 풀이

```
function solution(numbers) {
    var answer = 0;

    var max1 = 0;
    var max2 = 0;

    let len = numbers.length;
    var index = -1;

    for(let i = 0; i < len; i++) {
        if(max1 < numbers[i]) {
            max1 = numbers[i];
            index = i;
        }
    }

    for(let i = 0; i < len; i++) {
        if(max2 < numbers[i] && (max1 !== numbers[i] || index !== i))
           max2 = numbers[i];
    }

    answer = max1 * max2;

    return answer;
}

//배열이 [0,0,0,0,0,1,1] 과 같을 수도 있다는 점 간과.
//배열이 위와 같다면 1 * 1해서 1이 최대임.
```

- 다른 풀이

```
function solution(numbers) {
    numbers.sort((a,b)=>b-a);
    return numbers[0]*numbers[1];
}
```

- 학습 내용
  - sort() 함수는 시간 복잡도가 O(nlogn)이다. <br/>나는 2개의 for문을 사용하였기에 시간복잡도가 O(n)이다. <br/>만약 크기가 상당한 배열에 대해서 이 프로그램을 실행한다면 내가 작성한 코드가 더욱 효율적일 수 있을 것이다.

---

## 2. 문자열 뒤집기

- 나의 풀이

```
function solution(my_string) {
    var answer = '';

    for(let i = my_string.length-1; i >= 0; i--) {
        answer = answer.concat(my_string[i]);
    }

    return answer;
}
```

- 다른 풀이

```
function solution(my_string) {
    var answer = [...my_string].reverse().join("");
    return answer;
}
```

- 학습 내용

  - 나는 my_string의 문자열의 길이만큼 반복문으로 뒤에서부터 문자열을 읽어서 answer에 concat()을 하였다.<br/> reverse()함수가 있는 줄 몰랐다.

  - concat() 함수 : 두 개 이상의 배열을 병합할 때 사용, 원본 배열 변경 X
  - reverse() 함수 : 배열의 순서를 반전시키는 함수. 원본 배열 변경 O
  - split() 함수 : string을 지정한 구분자로 여러개의 문자열로 나누는 함.<br/> 구분자는 괄호 안에 문자 형태로 들어감.
  - 여기서는 string인 my_string을 array로 바꿔주어야 함. <br/>따라서 split()으로 문자열을 모두 쪼개 버리거나, 스프레드 문법을 사용하여 문자열을 펼친 후 배열 안에 넣어 주어야 함.

---

## 3. 점의 위치 구하기

- 나의 풀이

```
function solution(dot) {
    var answer = 0;

    if(dot[0] > 0) {
        if(dot[1] > 0) answer = 1;
        else answer = 4
    } else {
        if(dot[1] > 0) answer = 2;
        else answer = 3
    }

    return answer;
}
```

- 다른 풀이

```
function solution(dot) {
    const [num,num2] = dot;
    const check = num * num2 > 0;
    return num > 0 ? (check ? 1 : 4) : (check ? 3 : 2);
}
```

- 학습 내용
  - 구조 분해 할당 : 매개변수로 주어진 dot배열은 x좌표와 y좌표를 가지고 있다. <br/> 따라서 구조 분해 할당을 통해서 값을 이용할 수 있었다. <br/> 또한 좌표계의 특성을 이용해서 두 값의 곱과 x좌표를 이용해서 좌표계를 구할 수 있었다.

---

## 4. 특정 문자 제거하기

- 나의 풀이

```
function solution(my_string, letter) {
    var answer = '';
    answer = my_string.replaceAll(letter, '');
    return answer;
}
```

- 다른 풀이

```
function solution(my_string, letter) {
    const answer = my_string.split(letter).join('')
    return answer;
}
```

- 학습 내용
  - replaceAll(a:string, b:string) 함수 : a라는 모든 문자열을 b라는 문자열로 바꿔주는 함
  - replace(a: string, b: string) 함수 : 제일 먼저 찾은 a라는 문자열을 b라는 문자열로 바꿔주는 함수
  - join(a: string) 함수 : 주어진 배열을 a라는 문자열로 모두 연결해주는 함수. <br/> 기본값은 콤마.

---

## 5. 문자 반복 출력하기

- 나의 풀이

```
function solution(my_string, n) {
    var answer = '';
    var i = 0;
    var j = 0;
    let len = my_string.length;

    for(i = 0;i < len; i++) {
        for(j = 0; j < n; j++) {
            answer = answer + my_string[i];
        }
    }
    return answer;
}
```

- 다른 풀이

```
function solution(my_string, n) {
    var answer = [...my_string].map(v => v.repeat(n)).join("");
    console.log(answer);
    return answer;
}
```

- 학습 내용
  - map() 함수: 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환하는 함수.
  - repeat() 함수: 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환하는 함수
  - map이랑 repeat을 떠올리지 못했다. 많이 자주 사용하지 않아서 그런 것 같다. 주어진 배열을 이용한 새로운 배열을 만들고자 할때(?) map을 생각해보는 노력을 해보자!

---

## 6. 짝수 홀수 개수

- 나의 풀이

```
function solution(num_list) {
    var answer = [0,0];
    for(const element of num_list) {
        answer[element%2]+=1;
    }
    return answer;
}
```

- 다른 풀이

```
function solution(num_list) {
    var answer = [0,0];

    for(let a of num_list){
        answer[a%2] += 1
    }

    return answer;
}
```

- 학습 내용
  - 반복문 for(const element of ARRAY) : 배열 요소를 반복한다.

---

## 7. 제곱수 판별하기

- 나의 풀이

```
function solution(n) {
    var answer = 2;
    if(Math.sqrt(n) % 1 === 0) answer = 1
    return answer;
}
```

- 다른 풀이

```
function solution(n) {
  return Number.isInteger(Math.sqrt(n)) ? 1 : 2;
}
```

- 학습 내용
  - isInteger() 함수: 주어진 요소가 정수인지 판별하여 boolean을 반환하는 함수
  - Math.sqrt() 함수: 주어진 값의 제곱근을 구하여 반환하는 함수

---

## 8. 편지

- 나의 풀이

```
function solution(message) {
    return 2 * message.length;
}
```

---

## 9. 피자 나눠 먹기(3)

- 나의 풀이

```
function solution(slice, n) {
    var answer = n/ slice;
    return (answer%1 !== 0) ? parseInt(++answer): answer
}
```

- 다른 풀이

```
function solution(slice, n) {
    return Math.ceil(n / slice)
}
```

- 학습 내용
  - 어떤 number를 1로 나눈 나머지를 이용하여 해당 number가 실수인지 정수인지 알 수 있다.
  - Math.ceil() 함수 : 해당 수를 올림하여 반환하는 함수.
  - parseInt() 함수 : 해당 수를 정수만 추출하여 반환하는 함수

---

## 10. 외계행성의 나이

- 나의 풀이

```
function solution(age) {
    var answer = '';
    var old = age;
    while(old !== 0) {
        answer = answer.concat(String.fromCharCode((old % 10) + 97));
        old = parseInt(old / 10);
    }
    return answer.split('').reverse().join('');
}
```

- 다른 풀이

```
function solution(age) {
  return age
    .toString()
    .split("")
    .map((v) => "abcdefghij"[v])
    .join("");
}
```

- 학습 내용
  - fromCharCode() 함수: 해당 숫자의 아스키코드에 해당하는 문자를 반환하는 함수
  - 문자열 자체로도 배열에 접근할 수 있기 때문에 ""abcdefghij"[v]로 배열에 직접 접근하여 값을 가져올 수 있음. 따라서 여기에 map함수를 이용하면 적재적소

---

## 11. 문자열 정렬하기(1)

- 나의 풀이

```
function solution(my_string) {
    var answer = [];
    var now;
    for(const element of my_string) {
        now = parseInt(element)
        if(0 <= now && now <= 9){
            answer = answer.concat(now);
        }
    }
    return answer.sort();
}
```

- 다른 풀이

```
function solution(my_string) {
    return my_string.split("")
    .filter((v) => !isNaN(v))
    .map((v) => v*1)
    .sort((a,b) => a-b)
}
```

- 학습 내용
  - filter() 함수 : 주어진 배열의 일부에 대한 얕은 복사본을 생성하고, 주어진 배열에서 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링한다.<br/>ex) filter((v) => !isNaN(v))
  - isNan() 함수: 해당 숫자가 숫자이면 false, 숫자가 아니면 true를 반환하는 함수
  - sort() 함수
    - 오름차순 정렬: sort((a,b)=>(a-b);
    - 내림차순 정렬: sort((a,b)=>(b-a);

---

## 12. 배열 원소의 길이

- 나의 풀이

```
function solution(strlist) {
    return [...strlist].map((element)=> element.length);
}
```

---

## 13. 양꼬치

```
function solution(n, k) {
    return n * 12000 + (k - parseInt(n / 10)) * 2000;
}
```

---

## 14. 피자 나눠 먹기(2)

```
function solution(n) {
     var answer = n;
    //n이 6의 배수인지 판별
    if(n%6 === 0) {
        answer = n/6;
        return answer;
    }
    //n이 소수인지 판별
    let prime_count = 0;
    let loop = parseInt(Math.sqrt(n));
    for(let i = n; i >= loop; i--) {
        if(n%i === 0) prime_count++;
        if(prime_count === 2) {
            answer = i;
            break;
        }
    }
    return answer;
}
```

- 다른 풀이

```
const solution = (n) => {
    let piece = 6
    while(true) {
        if (piece % n === 0) {
            break
        }
        piece += 6
    }
    return piece / 6
}
```

---

## 15. 배열 회전 시키기

```
function solution(numbers, direction) {
    var answer = [];
    var temp;
    for(let i = 0; i < numbers.length - 1; i++) {
        if(direction === "left") {
            temp = numbers[i];
            numbers[i] = numbers[i+1];
            numbers[i+1] = temp;
        } else {
            temp = numbers[numbers.length-i-1];
            numbers[numbers.length-i-1] = numbers[numbers.length-i-1-1];
            numbers[numbers.length-i-1-1] = temp;
        }
        answer = numbers;
    }
    return answer;
}
```

- 다른 풀이

```
function solution(numbers, direction) {
    var answer = [];
    if ("right" == direction) {
        numbers.unshift(numbers.pop());
    } else {
        numbers.push(numbers.shift());
    }
    answer = numbers;
    return answer;
}
```

- 학습 내용
  - unshift(), shift(), push(), pop()함수가 있는지 몰랐다.
  - unshift() 함수: 배열의 맨 앞에 요소를 추가하고 새로운 배열의 길이를 반환하는 함수
  - shift() 함수 : 배열의 맨 앞 요소를 제거하고 해당 요소를 반환하는 함수
  - push() 함수 : 배열의 맨 뒤에 요소를 추가하고 새로운 배열의 길이 반환하는 함수
  - pop() 함수 : 배열의 맨 뒤 요소를 제거하고 해당 요소 반환하는 함수

---

## 16. 주사위의 개수

- 나의 풀이

```
function solution(box, n) {
    let [a,b,c] = [...box].map((element)=> parseInt(element/n))
    return a*b*c
}
```

- 다른 풀이

```
function solution(box, n) {
    let [width, length, height] = box;
    return Math.floor(width / n) *
    Math.floor(length / n) *
    Math.floor(height / n);
}
```

- 학습 내용
  - 나는 box 배열을 스프레드 연산자로 펼치고 map함수를 사용하여 a,b,c를 정의했다.
  - 다른 풀이로는 구조 분해 할당을 이용하였고, Math.floor() 함수를 사용하여 숫자를 내림하였다.
  - 나의 코드에서는 실수의 소수 자릿수를 없애기 위해서 parseInt를 사용하였고, 다른 풀이에서는 Math.floor를 사용하였다.<br/> 두 함수의 차이점은 들어가는 값이 음수일때 발생한다.<br/> 만약 -22.4가 parseInt된다면 -22지만 Math.floor가 되면 -23이 된다.

---

## 17. 369 게임

- 나의 풀이

```
function solution(order) {
    var answer = 0;
    while(order !== 0) {
    var temp = order % 10;
        if(temp === 3 || temp === 6 || temp === 9) answer++;
        order = parseInt(order/ 10);
    }
    return answer;
}
```

- 다른 풀이

```
function solution(order) {
    const mySet = new Set([3,6,9]);
    return String(order).split('')
                        .filter(num => mySet.has(Number(num)))
                        .length;
}
```

- 학습 내용
  - new Set() : value값 만을 저장하며 중복을 허용하지 않는 Collection.
  - set.has() 함수 : 해당 셋이 어떠한 값을 가지고 있는지 확인하여 boolean을 반환하는 함수

---

## 18. 약수 구하기

- 나의 풀이

```
function solution(n) {
    var answer = [];
    for(let i = 1; i <= n; i++) {
        if(n%i === 0) {
            answer.push(i)
        }
    }
    return answer;
}
```

- 다른 풀이

```
function solution(n) {
    return Array(n).fill(0).
    map((v, index) => v+index+1).filter((v) => n%v===0);
}
```

- 학습 내용
  - fill(value, start, end) 함수 : 배열의 인덱스 범위 내에 있는 모든 요소를 정적 값으로 변경하고 수정된 배열을 반환하는 함수.
  - 다른 풀이에서는 크기가 n인 배열을 생성하고, fill(0)을 통해 모든 요소를 0으로 할당했다. <br/> 그 다음 map함수를 이용하여 배열을 1부터 n까지의 숫자로 채웠다. <br/>index 인자는 배열의 인덱스를 의미하는 map 함수가 가진 인자이다. <br/> 이후 filter함수를 통해서 n을 나누었을 때 나머지가 없는, 소수들만 골라냈다.

---

## 19. 숫자 찾기

- 나의 풀이

```
function solution(num, k) {
    return [...('A'+String(num))].
    findIndex((element) => element === String(k))
}
```

- 다른 풀이

```
function solution(num, k) {
    return num.toString().
    split("").map((el) => Number(el)).indexOf(k) + 1 || -1
}
```

- 학습 내용
  - findIndex() 함수 : 주어진 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다. 만족하는 요소가 없으면 -1을 반환한다.
  - toString() 함수 : 지정된 배열 및 그 요소를 나타내는 문자열을 반환한다.
  - indexOf() 함수 : 배열에서 주어진 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고, 찾을 수 없는 경우 -1을 반환한다.
  - findIndex와 indexOf의 차이점은 배열 안의 요소가 어떤 타입이냐에 따라 다르다.<br/> findIndex는 배열 안의 객체의 인덱스를 알려주고, indexOf는 배열 안의 특정 값의 인덱스를 알려주는 함수이다.<br/> 여기서는 indexOf를 사용하는 것이 더 적절해 보인다.<br/> 코드가 문제없이 돌아간 이유는 문자열 또한 객체로 생각할 수 있었기 때문이다. <br/>indexOf는 객체를 검색할 수 없다.

---

## 20. 합성수 찾기

- 나의 풀이

```
function solution(n) {
    var answer = 0;
    for(let i = 4; i <= n; i++) {
        for(let j = 2; j < i; j++) {
            if(i % j === 0) {
                answer++; break;
            }
        }
    }
    return answer;
}
```

- 다른 풀이

```
function solution(n) {
    let dp = new Array(n+1).fill(1)
    for(let i = 2 ; i <= n ; i++){
        if(dp[i]){
            for(let j = 2 ; i*j <= n ; j++){
                dp[i*j] = 0
            }
        }
    }
    return dp.filter(el => el === 0).length
}
```

- 학습 내용
  - 에라토스테네스의 체: https://namu.wiki/w/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98%20%EC%B2%B4
  - 빈 배열을 만들어 놓고 반복문을 순회하며 해당 반복 번째 숫자의 배수를 모두 제거하는 방법

---

## 21. 문자열 정렬하기(2)

- 나의 풀이

```
function solution(my_string) {
    var answer = [];
    var now;

    for(const element of my_string) {
        now = element.charCodeAt();
        if(now <= 90) now = now + 32;
        answer.push(String.fromCharCode(now));
    }
    return answer.sort().join('');
}
```

- 다른 풀이

```
function solution(s) {
    return [...s.toLowerCase()].sort().join('')
}
```

- 학습 내용
  - toLowercase() 함수 : 문자열을 소문자로 변환해 반환하는 함수.
  - toLowercase()를 까먹고 있었다. 아직 낯설어서 그런 것 같다.
