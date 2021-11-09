// utility to check if an object has the required properties
// e.g., inputCheck(object, 'prop1', 'prop2', 'etc')

module.exports = function(obj, ...props) {
  const errors = [];

  props.forEach(prop => {
    // if property is blank or doesn't exist, add to errors array
    if (obj[prop] === undefined || obj[prop] === '') {
      errors.push(`No ${prop} specified.`);
    }
  });

  if (errors.length) {
    return {
      error: errors.join(' ')
    };
  }

  return null;
};


// const validator = require('validator');

// const validate = {
//   validateString(str) {
//     return str !== '' || 'Please enter a valid response!';
//   },
//   validateSalary(num) {
//     if (validator.isDecimal(num)) return true;
//     return 'Please enter a valid salary!';
//   },
//   isSame(str1, str2) {
//     if (str1 === str2) return true;
//   }
// };

// module.exports = validate;
