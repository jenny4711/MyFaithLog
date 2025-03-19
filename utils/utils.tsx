export const getTodayDate = () => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    const dateS = date < 10 ? `0${date}` : date;
    const monthS = month < 10 ? `0${month}` : month;
    const currentDate = `${year}-${monthS}-${dateS}`;

    return currentDate;
  } catch (error) {
    console.log(error);
  }
};