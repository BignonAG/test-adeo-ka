import data from '../data.js';
import {isEmpty } from '../utils.js'


class DataService {
  #data;

  /**
   * @param {data} data
   */
  constructor(data) {
    this.#data = data;
  }

  get data() {
    return !isEmpty(this.#data) ? 'Nothing found' : JSON.stringify(this.#data);
  }

  /**
   * get data by animal, the result contains only the relevant data, i.e only the matched animals
   * and people that have a related animals
   * @param {string} searchedStr
   * @returns
   */
  filterByAnimal = (searchedStr) => {
    const lowCaseSearchStr = searchedStr.toLowerCase();
    this.#data = this.#data.filter((q) => {
      const newCountry = q;
      newCountry.people = q.people.filter((p) => {
        const newPerson = p;
        newPerson.animals = this.#removeNonMatching(lowCaseSearchStr, p);
        // The 'animals' entry will be removed if there is nothing left inside
        return isEmpty(newPerson.animals);
      });

      // The 'people' entry will be removed if there is nothing left inside
      return isEmpty(newCountry.people);
    });

    // prints out the filtered list if there is any match
    return this;
  };

  /**
   *  It adds a suffix to countries and people by counting their respective direct children
   */ 
  count = () => {
    const newData = this.#data.map((country) => {
      country.people.map((person) => {
        person.name = `${person.name} [${person.animals.length}]`;
        return person;
      });
      country.name = `${country.name} [${country.people.length}]`;
      return country;
    });
    this.#data = [...newData];
    return this;
  };

  /**
   * This function filters out every animal that does not match the string pattern
   * @param {string} searchedStr
   * @param {data[0]['people'][0]} person
   * @returns
   */
  #removeNonMatching = (searchedStr, person) => {
    const { animals } = person;
    return animals.filter(({ name }) =>
      name.toLowerCase().includes(searchedStr)
    );
  };
}

const dataService = new DataService(data);

export default dataService;
