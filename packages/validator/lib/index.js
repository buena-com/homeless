import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();
export const isValidPhonenumber = (phoneNumber) => {
    try {
        const parsedPhonenumber = phoneUtil.parse(phoneNumber, 'DE');
        const isValidPhonenumber = phoneUtil.isValidNumber(parsedPhonenumber);
        const isPossibleNumber = phoneUtil.isPossibleNumber(parsedPhonenumber);
        return isValidPhonenumber && isPossibleNumber;
    }
    catch (_a) {
        return false;
    }
};
//# sourceMappingURL=index.js.map