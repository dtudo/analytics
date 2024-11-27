import { addWeeks, endOfWeek, startOfWeek } from "date-fns";
import { DateRange } from "../types/DateRange";
import { createStaticRanges } from "react-date-range";
import { enGB } from "date-fns/locale";

export const DEFINEDS = {
    startOfLastWeek: startOfWeek(addWeeks(new Date(), -1), { locale: enGB }),
    startOfLast2Weeks: startOfWeek(addWeeks(new Date(), -2), { locale: enGB }),
    startOfLast4Weeks: startOfWeek(addWeeks(new Date(), -4), { locale: enGB }),
    startOfLast12Weeks: startOfWeek(addWeeks(new Date(), -12), { locale: enGB }),
    startOfLast24Weeks: startOfWeek(addWeeks(new Date(), -24), { locale: enGB }),
    startOfLast48Weeks: startOfWeek(addWeeks(new Date(), -48), { locale: enGB }),
    startOfLast96Weeks: startOfWeek(addWeeks(new Date(), -96), { locale: enGB }),

    endOfLastWeek: endOfWeek(addWeeks(new Date(), -1), { locale: enGB }),
};

export const DATE_RANGE_DEFAULT_VALUE: DateRange = {
    startDate: DEFINEDS.startOfLast4Weeks,
    endDate: DEFINEDS.endOfLastWeek
};

export const DEFAULT_STATIC_RANGES = createStaticRanges([
    {
        label: 'Last week',
        range: () => ({
            startDate: DEFINEDS.startOfLastWeek,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
    {
        label: 'Last 2 weeks',
        range: () => ({
            startDate: DEFINEDS.startOfLast2Weeks,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
    {
        label: 'Last 4 weeks',
        range: () => ({
            startDate: DEFINEDS.startOfLast4Weeks,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
    {
        label: 'Last 3 months',
        range: () => ({
            startDate: DEFINEDS.startOfLast12Weeks,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
    {
        label: 'Last 6 months',
        range: () => ({
            startDate: DEFINEDS.startOfLast24Weeks,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
    {
        label: 'Last year',
        range: () => ({
            startDate: DEFINEDS.startOfLast48Weeks,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
    {
        label: 'Last 2 years',
        range: () => ({
            startDate: DEFINEDS.startOfLast96Weeks,
            endDate: DEFINEDS.endOfLastWeek,
        }),
    },
]);
