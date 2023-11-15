export const modifyData = (obj) => {
  const arrOfData = [];

  for (const objKey in obj) {
    arrOfData.push({
      id: objKey,
      isDone: obj[objKey].isDone,
      isImportant: obj[objKey].isImportant,
      title: obj[objKey].title,
    });
  }

  return arrOfData;
};
