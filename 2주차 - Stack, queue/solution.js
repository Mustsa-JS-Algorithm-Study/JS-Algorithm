const progresses = [
  [93, 30, 55],
  [95, 90, 99, 99, 80, 99],
];
const speeds = [
  [1, 30, 5],
  [1, 1, 1, 1, 1, 1],
];
function solution(progresses, speeds) {
  var answer = [];
  var r_index = 0;
  // while(progresses){
  var durations = progresses.map((item, index) =>
    Math.ceil((100 - item) / speeds[index])
  );
  progresses.filter((progress, index) => {
    console.log(durations.slice(0, index));
    for (d of durations.slice(0, index)) {
      console.log(d);
      if (d > durations[index]) {
        return true;
      }
    }
    return false;
  });
}

console.log("solution", solution(progresses[0], speeds[0]));
console.log("-------------------------------------------------");
console.log("solution", solution(progresses[1], speeds[1]));
