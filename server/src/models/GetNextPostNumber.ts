import sequenceGenerator from "./SequenceGenerator";

interface IGetNextPostNumberParams {
  boardName: string;
}

const generators = Object.create(null);
const getNextPostNumber = async (boardName: string) => {
  if (generators[boardName]) {
    return generators[boardName].next();
  }
  generators[boardName] = sequenceGenerator(boardName);
  return generators[boardName].next();
};

export default getNextPostNumber;
