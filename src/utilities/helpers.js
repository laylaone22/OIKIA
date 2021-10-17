import moment from 'moment';

// this helper function calculates the age in days based on todays date
// simply call the function using the date in the past you want to compare
export const calculateAge = (date) => {
    const today = moment();
    const createdAt = moment(date);
    const age = today.diff(createdAt, 'days');
    return age;
};
