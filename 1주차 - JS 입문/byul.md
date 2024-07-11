> ## 1. 제곱수 판별하기

- 나의 풀이

  ```javascript
  function solution(n) {
    for (i = 1; i < n; i++) {
      if (i * i === n) {
        return 1;
      }
    }
    return 2;
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(n) {
    return Number.isInteger(Math.sqrt(n)) ? 1 : 2;
  }
  ```

  - `Number.isInteger()` 함수를 사용했다. true false 반환

  - `삼항연산자`를 사용했다.

> ## 2. 피자 나눠먹기 (3)

- 나의 풀이

  ```javascript
  function solution(slice, n) {
    return Math.ceil(n / slice);
  }
  ```

  - `Math.ceil()` : 올림

  - `Math.floor()` : 내림

  - `Math.round()` : 반올림

  - `.toFixed(digit)` : 고정 소수점 만들기

> ## 3. 특정 문자 제거하기 🔥

- 나의 풀이

  ```javascript
  function solution(my_string, letter) {
    var new_string = "";
    for (i = 0; i < my_string.length; i++) {
      if (my_string[i] === letter) continue;
      else new_string += my_string[i];
    }
    return new_string;
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(my_string, letter) {
    const answer = my_string.split(letter).join("");
    return answer;
  }
  ```

  - letter로 `split`하고 `join` 했다.

  ```javascript
  function solution(my_string, letter) {
    return my_string.replaceAll(letter, "");
  }
  ```

  - `replaceAll(letter, "")` : letter를 ""로 바꾼다.

  ```javascript
  function solution(my_string, letter) {
    return Array.from(my_string)
      .filter((t) => t !== letter)
      .join("");
  }
  ```

  - `Array.from(문자열)`으로 배열로 만들었다.

> ## 4. 최댓값 만들기 (1)

- 나의 풀이

  ```javascript
  function solution(numbers) {
    for (i = 0; i < numbers.length; i++) {
      for (j = 0; j < numbers.length - 1; j++) {
        if (numbers[i] > numbers[j]) {
          var temp = numbers[j];
          numbers[j] = numbers[i];
          numbers[i] = temp;
        }
      }
    }
    return numbers[0] * numbers[1];
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(numbers) {
    numbers.sort((a, b) => b - a);
    return numbers[0] * numbers[1];
  }
  ```

  - `배열.sort` 를 몰랐다.

  - `sort()`는 오름차순
  - `sort((a,b)=>b-a)`는 내림차순

> ## 5. 배열 원소의 길이

- 나의 풀이

  ```javascript
  function solution(strlist) {
    return strlist.map((el) => el.length);
  }
  ```

> ## 6. 피자 나눠 먹기 (2)

- 나의 풀이

  ```javascript
  function solution(n) {
    var big = n > 6 ? n : 6;
    var small = n < 6 ? n : 6;
    for (i = big; i <= n * 6; i++) {
      if (i % n === 0 && i % 6 === 0) {
        return i / 6;
      }
    }
  }
  ```

  - 최소공배수를 구하려고 했다.

- 좋은 풀이

  ```javascript
  const solution = (n) => {
    let piece = 6;

    while (true) {
      if (piece % n === 0) {
        break;
      }
      piece += 6;
    }

    return piece / 6;
  };
  ```

> ## 7. 배열 회전시키기 🔥

- 나의 풀이

  ```javascript
  function solution(numbers, direction) {
    if (direction === "right") {
      var last = numbers[numbers.length - 1];
      for (i = numbers.length - 2; i >= 0; i--) {
        numbers[i + 1] = numbers[i];
      }
      numbers[0] = last;
    } else {
      var first = numbers[0];
      for (i = 1; i < numbers.length; i++) {
        numbers[i - 1] = numbers[i];
      }
      numbers[numbers.length - 1] = first;
    }
    return numbers;
  }
  ```

- 좋은 풀이

  ```javascript
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

  - `배열.pop()` : 가장 마지막 원소를 반환, 배열에서 제거

  - `배열.shift()` : 가장 첫 원소를 반환, 배열에서 제거

  - `배열.unshift(a)` : 가장 처음 원소로 a를 넣음

  - `배열.push(a)` : 가장 마지막 원소로 a를 넣음

> ## 8. 주사위의 개수

- 나의 풀이

  ```javascript
  function solution(box, n) {
    return (
      Math.floor(box[0] / n) * Math.floor(box[1] / n) * Math.floor(box[2] / n)
    );
  }
  ```

- 좋은 풀이
  ```javascript
  function solution(box, n) {
    return box.reduce((acc, v) => acc * Math.floor(v / n), 1);
  }
  ```
  - `.reduce((acc, v)=>{},initial)` : initial=acc, 콜백함수를 실행하며 acc에 모은다.

> ## 9. 369게임 🔥

- 나의 풀이

  ```javascript
  function solution(order) {
    var arr = [];
    while (true) {
      var remain = order % 10;
      arr.push(remain);
      order = Math.floor((order /= 10));
      if (order < 1) break;
    }
    var count = 0;
    arr.forEach((el) => {
      if (el % 3 === 0 && el !== 0) count++;
    });
    return count;
  }
  ```

  - 숫자 그대로 풀려고 했다.

- 좋은 풀이

  ```javascript
  function solution(order) {
    var answer = [...order.toString().matchAll(/[3|6|9]/g)].length;
    return answer;
  }
  ```

  - `정규표현식`과 `matchAll()`

  ```javascript
  function solution(order) {
    return ("" + order).split(/[369]/).length - 1;
  }
  ```

  - `""+order` 하면 다 string이 된다

  - `정규표현식`과 `split()`

  ```javascript
  function solution(order) {
    const mySet = new Set([3, 6, 9]);
    return String(order)
      .split("")
      .filter((num) => mySet.has(Number(num))).length;
  }
  ```

  - `set`만들려면 `new Set`

  - `set.has()`로 set에 있는지 여부를 판단할 수 있다.

  ```javascript
  function solution(order) {
    return (order + "").replace(/[0,1,2,4,5,7,8]/g, "").length;
  }
  ```

> ## 10. 문자열 정렬하기 (1)

- 나의 풀이

  ```javascript
  function solution(my_string) {
    var arr = [...my_string].filter((el) => Number.isInteger(parseInt(el)));
    return arr.sort().map((el) => parseInt(el));
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(my_string) {
    return my_string
      .match(/\d/g)
      .sort((a, b) => a - b)
      .map((n) => Number(n));
  }
  ```

  - `정규표현식`과 `match()`

> ## 11. 문자열 정렬하기 (2)

- 나의 풀이

  ```javascript
  function solution(my_string) {
    return my_string.toLowerCase().split("").sort().join("");
  }
  ```

> ## 12. 숫자 찾기

- 나의 풀이

  ```javascript
  function solution(num, k) {
    var arr = [...num.toString()].map((el) => parseInt(el));
    var index = arr.findIndex((el) => el === k);
    return index < 0 ? index : index + 1;
  }
  ```

- 좋은 풀이
  ```javascript
  function solution(num, k) {
    return ("❤" + num).indexOf(k);
  }
  ```
  - 맨 앞에 문자를 하나 더 추가한다.

> ## 13. 외계행성의 나이

- 나의 풀이

  ```javascript
  function solution(age) {
    var chars = "abcdefghij".split("");
    var digits = age.toString().split("");
    return digits.map((el) => chars[el]).join("");
  }
  ```

  - 문자열도 그 자체로 배열이니까 split("") 안 해도 된다.

> ## 14. 합성수 찾기

```javascript
function solution(n) {
  var total = 0;
  for (i = 1; i <= n; i++) {
    var count = 0;
    for (j = 1; j <= i; j++) {
      if (i % j === 0) {
        count++;
      }
    }
    if (count >= 3) {
      total++;
    }
  }
  return total;
}
```

> ## 15. 2차원으로 만들기

- 나의 풀이

  ```javascript
  function solution(num_list, n) {
    var answer = [];
    for (i = 0; i < num_list.length / n; i++) {
      var temp = [];
      for (j = 0; j < n; j++) {
        temp.push(num_list[n * i + j]);
      }
      answer.push(temp);
    }
    return answer;
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(num_list, n) {
    var answer = [];

    while (num_list.length) {
      answer.push(num_list.splice(0, n));
    }

    return answer;
  }
  ```

  - `splice(n,m)` : n에서 m-1까지 잘라서 반환

  ```javascript
  function solution(num_list, n) {
    return Array(num_list.length / n)
      .fill([])
      .map(() => num_list.splice(0, n));
  }
  ```

  - `Array(4).fill([])` : 길이 4의 배열을 []로 채움

> ## 16. 배열의 유사도

- 나의 풀이
  ```javascript
  function solution(s1, s2) {
    return s1.filter((el) => s2.indexOf(el) !== -1).length;
  }
  ```
- 좋은 풀이

  ```javascript
  function solution(s1, s2) {
    const intersection = s1.filter((x) => s2.includes(x));
    return intersection.length;
  }
  ```

  - `includes()`를 사용.

  ```javascript
  function solution(s1, s2) {
    const concat = [...s1, ...s2];
    const setConcat = Array.from(new Set(concat));

    return concat.length - setConcat.length;
  }
  ```

  - `new Set(배열)`을 이용해서 중복되는 것을 제거했다.

> ## 17. 약수 구하기

- 나의 풀이
  ```javascript
  function solution(n) {
    var answer = [];
    for (i = 1; i <= n / 2; i++) {
      if (n % i === 0) answer.push(i);
    }
    answer.push(n);
    return answer;
  }
  ```

> ## 18. 짝수 홀수 개수

- 나의 풀이
  ```javascript
  function solution(num_list) {
    var even = num_list.filter((el) => el % 2 === 0).length;
    return [even, num_list.length - even];
  }
  ```
- 좋은 풀이

  ```javascript
  function solution(num_list) {
    var answer = [0, 0];

    for (let a of num_list) {
      answer[a % 2] += 1;
    }

    return answer;
  }
  ```

  - 짝수와 홀수의 나머지를 인덱스에 활용했다.

> ## 19. 문자 반복 출력하기

- 나의 풀이
  ```javascript
  function solution(my_string, n) {
    return my_string
      .split("")
      .map((el) => Array(n).fill(el).join(""))
      .join("");
  }
  ```
- 좋은 풀이
  ```javascript
  function solution(my_string, n) {
    var answer = [...my_string].map((v) => v.repeat(n)).join("");
    console.log(answer);
    return answer;
  }
  ```
  - `string.repeat(n)` : string을 n번 반복한 걸 반환.

> ## 20. 세균 증식

- 나의 풀이
  ```javascript
  function solution(n, t) {
    return Array(t)
      .fill(n)
      .reduce((acc, cur) => acc * 2, n);
  }
  ```
- 좋은 풀이

  ```javascript
  function solution(n, t) {
    return n << t;
  }
  ```

  - `비트연산자`

  ```javascript
  function solution(n, t) {
    return n * Math.pow(2, t);
  }
  ```
