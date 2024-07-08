function solution(s1, s2) {
  var answer = 0;
  for (elS1 in s1) {
    for (elS2 in s2) {
      if (elS1 === elS2) {
        answer += 1;
      }
    }
  }
  return answer;
}

for (a in [1, 2, 3]) {
  console.log(a);
}

