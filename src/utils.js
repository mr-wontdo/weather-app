const formatMilitaryLocalTime = (localTime) => {
    let [date, time] = localTime.split(' ');
    date = formatDate(date);
    return `${date} | ${time}`;
};

const formatStandardLocalTime = (localTime) => {
    let [date, time] = localTime.split(' ');
    date = formatDate(date);
    time = formatStandardTime(time);
    return `${date} | ${time}`;
};

const formatStandardTime = (time) => {
    let [hh, mm] = time.split(':');
    const amPm = hh > 11 ? 'p.m.' : 'a.m.';
    if (hh > 12) {
        hh -= 12;
    } else if (hh === '00') {
        hh = 12;
    }
    return `${hh}:${mm} ${amPm}`;
};

const formatDate = (date) => {
    const [yyyy, mm, dd] = date.split('-');
    const processedDate = `${mm}/${dd}/${yyyy}`;
    console.log(new Date(processedDate)); // Need to remove after testing
    const month = new Date(processedDate).toLocaleString('default', { month: 'long' });
    const day = new Date(processedDate).toLocaleString('default', { weekday: 'long' });
    const suffix = getDaySuffix(dd);

    return `${day}, ${dd}${suffix} ${month} ${yyyy}`;
};

const getDaySuffix = (dd) => {
    const suffixes = [
    //   0     1     2     3     4     5     6     7     8     9
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th',
    //   10    11    12    13    14    15    16    17    18    19
        'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th',
    //   20    21    22    23    24    25    26    27    28    29
        'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th',
    //   30    31
        'th', 'st'];
    return suffixes[+dd];
};

const getDayStatus = (localTime) => {
    const [date, time] = localTime.split(' ');
    const [hh, mm] = time.split(':');
    if (hh > 5 && hh < 22) {
        return true;
    }
    return false;
};

export default getDayStatus;
