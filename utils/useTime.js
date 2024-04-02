import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// 設定時區
dayjs.tz.setDefault('Asia/Taipei');

export default function () {
    const toLocal = (utcTimeString) => {
        const localTime = dayjs.utc(utcTimeString).local();
        const result = localTime.format('YYYY-MM-DD HH:mm:ss');
        return result;
    };
    const live3 = (data) => {
        const result = [];
        const currentTime = dayjs();
        let closestIndex = 0;
        for (let i = 0; i < data.length; i++) {
            const time = dayjs.utc(data[i].startTime).local();
            if (time.isAfter(currentTime)) {
                closestIndex = i;
                break;
            }
        }
        if (closestIndex !== data.length) {
            const prevIndex = closestIndex > 0 ? closestIndex - 1 : null;
            const nextIndex = closestIndex < data.length - 1 ? closestIndex + 1 : null;
            if (prevIndex !== null) {
                result.push(data[prevIndex]);
            }
            result.push(data[closestIndex]);
            if (nextIndex !== null) {
                result.push(data[nextIndex]);
            }
        }
        return result;
    }
    return {
        toLocal, live3
    }
};