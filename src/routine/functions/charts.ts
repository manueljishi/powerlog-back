import { ChartsDataDto, ChartsDataInfo } from '../dto/charts-data.dto';

export function initializeChartsData(data: any): ChartsDataInfo[] {
  //initializes the constraint, max weight and the day
  let res: ChartsDataInfo[] = [];
  data.forEach((day) => {
    let obj: ChartsDataInfo = {};
    obj['day'] = day.day;
    day.exercises.forEach((exercise) => {
      console.log(exercise);
      let maxWeight = Math.max(...exercise.real_weight);
      obj['real_weight'] = maxWeight;
      let maxWeightIndex = exercise.real_weight.indexOf(maxWeight);
      console.log(maxWeightIndex);
      obj['constraint'] = exercise.constraints[maxWeightIndex];
    });
    res.push(obj);
  });
  return res;
}
