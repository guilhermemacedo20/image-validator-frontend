export const getColor = (valid: boolean) =>
  valid ? "text-green-600" : "text-gray-400";

export const getInputBorder = (valid: boolean, value: string) => {
  if (!value) return "border-gray-300";
  return valid ? "border-green-500" : "border-red-500";
};
