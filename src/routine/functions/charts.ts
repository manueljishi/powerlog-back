import e from 'express';
import { ChartsDataDto, ChartsDataInfo } from '../dto/charts-data.dto';
import { IConstraint } from '../dto/create.routine.dto';
import { rmCalc } from './rmCalc';

export function createCharts(data: any, endingDays: Date[]) {
  ////initializes the constraint, max weight and the day
  let resp: ChartsDataInfo[] = initializeChartsData(data);
  //estimate the max weight
  resp = estimateMaxWeight(resp);
  resp = getBlock(resp, endingDays);
  return resp;
}

export function initializeChartsData(data: any): ChartsDataInfo[] {
  let res: ChartsDataInfo[] = [];
  data.forEach((day) => {
    let obj: ChartsDataInfo = {};
    obj['day'] = day.day;
    day.exercises.forEach((exercise) => {
      let maxWeight = Math.max(...exercise.real_weight);
      obj['real_weight'] = maxWeight;
      let maxWeightIndex = exercise.real_weight.indexOf(maxWeight);
      obj['constraint'] = exercise.constraints[maxWeightIndex];
      obj['reps'] = exercise.reps[maxWeightIndex];
    });
    res.push(obj);
  });
  return res;
}

export function estimateMaxWeight(data: ChartsDataInfo[]): ChartsDataInfo[] {
  data.forEach((day) => {
    //falta mirar si las reps son AMRAP o tienen letras
    let maxWeight = day.real_weight;
    let constraint = day.constraint;
    let reps = day.reps;
    if (constraint['fixedWeight'] != '' || constraint['percentage'] != '') {
      day.estimated_weight = day.real_weight;
    } else {
      day.estimated_weight = get1Rm(maxWeight, reps, constraint);
    }
  });
  return data;
}

let i = 0;
function get1Rm(weight: number, reps: number, constraint: IConstraint) {
  let constraintValue;
  if (constraint['rpe'] != '') {
    constraintValue = roundHalf(Number(constraint['rpe']));
  } else {
    constraintValue = 10 - roundHalf(Number(constraint['rir']));
  }

  return +(weight / rmCalc[constraintValue.toString()][reps - 1]).toFixed(2);
}

function roundHalf(num: number): number {
  return Math.round(num * 2) / 2;
}

function getBlock(data: ChartsDataInfo[], endingDays: Date[]) {
  let block = 0;
  let currDayIdx = 0;
  data.forEach((day) => {
    if (currDayIdx === endingDays.length) {
      day.block = block;
    } else {
      if (day.day <= endingDays[currDayIdx]['day']) {
        day.block = block;
      } else {
        block++;
        currDayIdx++;
        day.block = block;
      }
    }
  });
  return data;
}
