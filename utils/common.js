// This function removes all HTML tags from a string
export const stripHtml = str => {
  if (typeof str !== 'string') {
    return '';
  }
  return str.replace(/<(?:.|\n)*?>/gm, '').replace(/^\s+|\s+$/gm, '');
};
