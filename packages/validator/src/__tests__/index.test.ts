import { isValidPhonenumber } from '../index';

describe('isValidPhonenumber', () => {
   it('should return true if the provided number is possibly a valid phonenumber', () => {
       const phoneNumbers = [
           '030 345 654',
           '+49 346 987 234',
           '0170 8765 4312',
           '+316 34 35 42 98'
       ];
       const validaPhoneNumbers = phoneNumbers
           .map(isValidPhonenumber)
           .filter(isPhoneNumber => isPhoneNumber);
       expect(validaPhoneNumbers).toHaveLength(phoneNumbers.length);
   });

   it('should return false if the provided number is possibly invalid', () => {
       const phoneNumbers = [
           '0000000000',
           '123456789',
           '123',
           '555',
           '000',
           '111111111',
           '0170 8765 4312 1234',
       ];
       const invalidPhonenumbers = phoneNumbers
           .map(isValidPhonenumber)
           .filter(isPhoneNumber => !isPhoneNumber);
       expect(invalidPhonenumbers).toHaveLength(phoneNumbers.length);
   });
});