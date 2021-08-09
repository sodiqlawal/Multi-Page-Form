/**
 * A typesafe helper function that mimic switch statement
 *
 * e.g
 *
 *    switchValue('buy',{
 *      buy: "I am buying",
 *      sell: "I am selling",
 *      default: "I am not available"
 *    })
 *
 * which returns `I am buying`.
 *
 * if a match is not found, it returns default value
 */
export default function switchValue<T>(
  caseValue: string, conditions: {default: T, [key:string]: T},
) {
  return (caseValue in conditions) ? conditions[caseValue] : conditions.default;
}
