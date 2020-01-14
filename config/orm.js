const connection = require("../config/connections");

function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  let arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  selectAll: function(tableInput) {
    return new Promise ((resolve, reject) => {
      const queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  },
  insertOne: function(table, cols, vals) {
    return new Promise ((resolve, reject) => {
      const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`

      console.log(queryString);

      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }

        resolve(result);
      });
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(table, objColVals, condition) {
    return new Promise ((resolve, reject) => {
      const queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        resolve(result);
      });
    });
  },
  deleteOne: function(table, condition) {
    return new Promise ((resolve, reject) => {
      const queryString = `DELETE FROM ${table} WHERE ${condition}`;
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
