export const getFormattedDate = (date: Date) => {
  const yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1) as unknown as string; // Months start at 0!
  let dd = date.getDate() as unknown as string;

  if (dd < '10') dd = '0' + dd;
  if (mm < '10') mm = '0' + mm;

  const formattedDate = dd + '/' + mm + '/' + yyyy;
  return formattedDate;
};
