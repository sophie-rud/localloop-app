export function durationStringToMinutes(str) {
    if (!str) return 0;

    const [hoursStr, minutesStr] = str.split(":");
    const hours = Number(hoursStr) || 0;
    const minutes = Number(minutesStr) || 0;

    return hours * 60 + minutes;
}

export function minutesToDurationString(total) {
    if (total == null) return "";

    const hours = Math.floor(total / 60);
    const minutes = total % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
