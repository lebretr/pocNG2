'use strict';

module.exports = {
    customValidators:{
        //ADD isSTRING for test NoSqlInjection
        isString: function(value) {
            return typeof(value) === 'string';
        },

        //ADD isSTRING for test NoSqlInjection
        isStringOrNull: function(value) {
            return value === null || value === undefined || typeof(value) === 'string';
        }
    }
};
