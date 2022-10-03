/**
 * check if it's empty
 * @param {*} arr
 * @returns {boolean}
 */
export const isEmpty = (arr) => {
  return Array.isArray(arr) && arr.length;
};

/**
 * parse argv params 
 * @param {string[]} args
 */
export const getOptions = (args) => {
  const newArgs = args.slice(2)
  
  const options = newArgs.map((option) => {
    const [opt, val] = option.split('=');

    return {
      option: opt,
      value: val
    };
  });

  return options;
};
