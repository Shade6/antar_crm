exports.checkNullValues = (body) => {
    for (const key in body) {
        if (body[key] === null || body[key] === undefined) {
            return { isValid: false, field: key.replace(/_/g, ' ') .replace(/\b\w/g, (char) => char.toUpperCase()) ?? 'can get the field' }; // Return false with the field name
        }
    }
    return { isValid: true }; // Return true if all fields are valid
};
