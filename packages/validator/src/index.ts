import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidPhonenumber = (phoneNumber: string): boolean => {
    try {
        const parsedPhonenumber = phoneUtil.parse(phoneNumber, 'DE');
        const isValidPhonenumber = phoneUtil.isValidNumber(parsedPhonenumber);
        const isPossibleNumber = phoneUtil.isPossibleNumber(parsedPhonenumber);
        return isValidPhonenumber && isPossibleNumber;
    } catch {
        return false;
    }
};