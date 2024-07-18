const bridge_length = [2, 100, 100];
const weight = [10, 100, 100];
const truck_weights = [
  [7, 4, 5, 6],
  [10],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
];

function solution(bridge_length, weight, truck_weights) {
  var passed = []; //지난 트럭
  var passing = []; // 지나는 트럭

  for (time; ; time++) {
    //경과 시간
    if (passing.reduce((acc, cur) => acc + cur, 0) < weight)
      passing.push(truck_weights[0]);
    for (el of truck_weights) {
    }
  }
}

for (el in bridge_length) {
  console.log(solution(bridge_length, weight, truck_weights));
  console.log("--------------");
}
