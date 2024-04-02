export default function () {
    const deepCopy = (obj) => {
        // 判斷傳入為何
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            // 判斷是否有属性
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // 判斷屬性是否為物件
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    // 遞迴
                    result[key] = deepCopy(obj[key]);   // 遞迴複製
                }
                // 如果是 null，保持 null
                else if (obj[key] === null) {
                    result[key] = null;
                }
                // 不是的話直接賦值 copy
                else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    };
    return {
        deepCopy
    }
};