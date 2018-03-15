/**
 * удаляет префикс для eRip
 * @param phone string
 * @param prefix string
 */
export function prepareOriginFieldPhone(phone, prefix) {
    return phone.substr(prefix.length).replace(new RegExp('[^0-9]', 'g'), '')
}


/**
 * Вынести в  библиотеку
 * Удаляет пустые символы из строки
 * @param str
 * @return {string}
 */
export function trim(str) {
    if(str instanceof String) {
        return str.replace(/\s*/g, '');
    }
    throw  TypeError('Value is not a string');
}


