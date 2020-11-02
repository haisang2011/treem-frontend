export const rename = (value) => {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(rename);
    return Object.fromEntries(Object
        .entries(value)
        .map(([k, v]) => [keys[k] || k, rename(v)])
    );
}

var keys = { value: 'key'};