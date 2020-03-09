import _ from 'lodash';

export const requiredMessage = (value) => {
    let compiled = _.template(' <%= value %> can\'t be blank');
    return compiled({ 'value': value });
};

export const invalidMessage = (value) => {
    let compiled = _.template('Invalid <%= value %>');
    return compiled({ 'value': value });
};


export const duplicateMessage = (value) => {
    let compiled = _.template('<%= value %>  already exists');
    return compiled({ 'value': value });
};

