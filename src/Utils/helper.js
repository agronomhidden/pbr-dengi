/**
 * удаляет префикс для eRip
 * @param phone string
 * @param prefix string
 */
export function prepareOriginFieldPhone(phone, prefix) {
    return phone.substr(prefix.length).replace(new RegExp('[^0-9]', 'g'), '')
}


