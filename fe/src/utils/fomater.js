// utils/formatter.js

export const formatter = (amount, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};

export const formatDate = (date, locale = 'en-US', options = {}) => {
    if (!date) return '';
    const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(new Date(date));
};

export const formatNumber = (number, locale = 'en-US', options = {}) => {
    return new Intl.NumberFormat(locale, options).format(number);
};

export const formatPercentage = (value, decimalPlaces = 2) => {
    return `${(value * 100).toFixed(decimalPlaces)}%`;
};

export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
};
