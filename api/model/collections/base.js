const _ = require('lodash');

/**
 * Instantiate Model
 * @param {any} model
 * @returns {BaseModel}
 */
function BaseModel(model) {
  /**
   * Get all Items
   * @param {MongooseModel} model
   * @returns {Model []} items
   */
  function getAll() {
    return new Promise((resolve, reject) => {
      model
        .find({})
        .exec((err, data) => {
          if (err) {
            reject(err);
          }

          resolve(data);
        });
    });
  }

  /**
   * Get Item by Id
   * @param {Number} id
   * @returns {Item} item
   */
  function getById(id) {
    return new Promise((resolve, reject) => {
      model
        .findOne({
          _id: id,
        })
        .exec((err, data) => {
          if (err) {
            reject(err);
          }

          resolve(data);
        });
    });
  }

  /**
   * Create Item
   * @param {Item} item
   * @returns {Item} createdItem
   */
  function create(item) {
    return new Promise((resolve, reject) => {
      const newItem = new model(item);
      newItem.save((err, savedItem) => {
        if (err) {
          reject(err);
        }

        resolve(savedItem);
      });
    });
  }

  /**
   * Edit Item
   * @param {Number} id
   * @param {Item} update
   * @returns {Item} updatedItem
   */
  function edit(id, update) {
    return new Promise((resolve, reject) => {
      getById(id)
        .then((oldItem) => {
          const mergedObject = _.merge(oldItem, update);
          mergedObject.lastModified = Date.now();
          mergedObject.save((err, updatedItem) => {
            if (err) {
              reject(err);
            }

            resolve(updatedItem);
          });
        })
        .catch((err) => {
          resolve(err, null);
        });
    });
  }

  /**
   * Disable Item
   * @param {Number} id
   * @returns {Item} disabledItem
   */
  function disable(id) {
    return edit(id, {
      active: false,
    });
  }

  return {
    getAll,
    getById,
    create,
    edit,
    disable,
  };
}

module.exports = BaseModel;
