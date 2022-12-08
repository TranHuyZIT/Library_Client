export function performIntersection(arr1, arr2) {
  const intersectionResult = arr1.filter((x) => arr2.indexOf(x) !== -1);

  return intersectionResult;
}
