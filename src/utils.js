const getDayStatus = (localTime) => {
    const [date, time] = localTime.split(' ');
    const [hh, mm] = time.split(':');
    if (hh > 5 && hh < 22) {
        return true;
    }
    return false;
};

export default getDayStatus;
