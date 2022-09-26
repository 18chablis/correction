export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

// export const yesAndNo = (number) => {
//   switch (number) {
//     case (number = "Paid"):
//       return "Paid";
//     case (number = "Not Paid"):
//       return "Not Paid";
//     default:
//       return "";
//   }
// };
// export const yardAndNotYard = (number) => {
//   switch (number) {
//     case (number = "In Yard"):
//       return "In The Yard";
//     case (number = "Not In Yard"):
//       return "Not In The Yard";
//     default:
//       return "";
//   }
// };

export const addDays = (date, days) => {
  date = new Date(date);
  date.setDate(date.getDate() + days);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var result = year + "/" + month + "/" + day;
  // console.log(result);
  return result;
};

export const addMonths = (date, num) => {
  date = new Date(date);
  if (date.getMonth() !==11) {
    var month = date.getMonth() + num + 1;
    var year = date.getFullYear();
    var day = date.getDate();
    var result = year + "/" + month + "/" + day;
    // console.log(result);
    return result;
  } else {
    month = date.getMonth()-10;
    year = date.getFullYear() + 1;
    day = date.getDate();
    result = year + "/" + month + "/" + day;
    // console.log(month);
    return result;
  }
};
