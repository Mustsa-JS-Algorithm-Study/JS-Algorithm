const prices = [[1, 2, 3, 2, 3]];

function solution(prices) {
  let result = new Array(prices.length).fill(0);
  let stack = [];

  for (let i = 0; i < prices.length; i++) {
    // 가격이 떨어지는 시점을 찾는다.
    while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]) {
      let j = stack.pop();
      result[j] = i - j;
    }
    stack.push(i);
    console.log(stack, result);
  }

  // 스택에 남아있는 인덱스들은 끝까지 가격이 떨어지지 않은 경우이다.
  while (stack.length > 0) {
    let j = stack.pop();
    result[j] = prices.length - j - 1;
  }

  return result;
}

for (el in prices) {
  console.log("--------------");
  console.log(solution(prices[el]));
  console.log("--------------");
}
