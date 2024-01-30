export function capitalizeFirstLetter(inputString: string) {
  return inputString.trim().charAt(0).toUpperCase() + inputString.slice(2);
}
