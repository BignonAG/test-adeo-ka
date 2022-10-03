// import data from '../data.js';
// import {isEmpty } from '../utils.js'

const option = {
  name: '',
  alias: '',
  fn: () => { return a }
};

class Program {
  /**
   * it's used during options creation
   * @type {option[]}
   */
  #options;

  constructor() {
    this.#options = [];
  }

  /**
   *
   * @param {string} name
   * @param {string} alias
   * @param {function} fn
   * @returns
   */
  option = (name, alias, fn) => {
    const option = {
      name,
      alias,
      fn: (val) => fn(val)
    };
    this.#options = [...this.#options, option];
    // prints out the filtered list if there is any match
    return this;
  };

  /**
   * @param {string[]} args
   */
  parseArgs = () => {
    let i = 0;
    const args = process.argv;
    const parsedOptions = this.#getOptions(args);
    let res = ""
    if (!parsedOptions.length) {
      console.log('\x1b[33m', 'no options was provided');
    }

    const filterOption = parsedOptions.find((val) => val.option === "--filter" || val.option === "-f")
    const countOption = parsedOptions.find((val) => val.option === "--count" || val.option === "-c")

    // remove undefined value from array
    const options = [filterOption, countOption].filter((e) => e)
    options.forEach(({ option, value }) => {
      const executableOption = this.#options.find(
        (opt) => opt.name === option || opt.alias === option
      );

      if (executableOption) {
        res = executableOption.fn(value);
        i++;
      }
    });

    if (!i) console.log('\x1b[31m', 'option(s) not found');
    console.log(res);
  };

  /**
   * @param {string[]} args
   */
  #getOptions = (args) => {
    const newArgs = args.slice(2);
    const options = newArgs.map((option) => {
      const [opt, val] = option.split('=');

      return {
        option: opt,
        value: val
      };
    });

    return options;
  };
}

const program = new Program();

export default program;
