import { expect } from 'chai';
import { findOverlap } from './dates';

describe('findOverlap', () => {
    const now = new Date();
    const sevenDaysAgo = addDays(now, -7);
    const sevenDaysFuture = addDays(now, 7);
    const fourteenDaysFuture = addDays(now, 14);

    it('should return overlap when range one extends into range two', () => {
        const dateRange1 = { begin: sevenDaysAgo, end: sevenDaysFuture };
        const dateRange2 = { begin: now, end: fourteenDaysFuture };
        const expected = { begin: now, end: sevenDaysFuture };
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin.valueOf()).to.equal(result.begin.valueOf());
        expect(expected.end.valueOf()).to.equal(result.end.valueOf());
    });

    it('should return overlap when range two extends into range one', () => {
        const dateRange2 = { begin: sevenDaysAgo, end: sevenDaysFuture };
        const dateRange1 = { begin: now, end: fourteenDaysFuture };
        const expected = { begin: now, end: sevenDaysFuture };
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin.valueOf()).to.equal(result.begin.valueOf());
        expect(expected.end.valueOf()).to.equal(result.end.valueOf());
    });

    it('should throw exception when range one ends at instant range two begins', () => {
        const dateRange1 = { begin: sevenDaysAgo, end: now };
        const dateRange2 = { begin: now, end: fourteenDaysFuture };
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should throw exception when range two ends at instant range one begins', () => {
        const dateRange2 = { begin: sevenDaysAgo, end: now };
        const dateRange1 = { begin: now, end: fourteenDaysFuture };
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should return overlap when range one completely contains range two', () => {
        const dateRange1 = { begin: sevenDaysAgo, end: fourteenDaysFuture };
        const dateRange2 = { begin: now, end: sevenDaysFuture };
        const expected = { begin: now, end: sevenDaysFuture };
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin.valueOf()).to.equal(result.begin.valueOf());
        expect(expected.end.valueOf()).to.equal(result.end.valueOf());
    });

    it('should return overlap when range two completely contains range one', () => {
        const dateRange2 = { begin: sevenDaysAgo, end: fourteenDaysFuture };
        const dateRange1 = { begin: now, end: sevenDaysFuture };
        const expected = { begin: now, end: sevenDaysFuture };
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin.valueOf()).to.equal(result.begin.valueOf());
        expect(expected.end.valueOf()).to.equal(result.end.valueOf());
    });

    it('should throw exception when range one does not overlap with range two', () => {
        const dateRange1 = { begin: sevenDaysAgo, end: now };
        const dateRange2 = { begin: sevenDaysFuture, end: fourteenDaysFuture };
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should throw exception when range two does not overlap range one', () => {
        const dateRange2 = { begin: sevenDaysAgo, end: now };
        const dateRange1 = { begin: sevenDaysFuture, end: fourteenDaysFuture };
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should return overlap when range one equals range two', () => {
        const dateRange1 = { begin: sevenDaysAgo, end: fourteenDaysFuture };
        const dateRange2 = { begin: sevenDaysAgo, end: fourteenDaysFuture };
        const expected = { begin: sevenDaysAgo, end: fourteenDaysFuture };
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin.valueOf()).to.equal(result.begin.valueOf());
        expect(expected.end.valueOf()).to.equal(result.end.valueOf());
    });
});

function addDays(date: Date, days: number) {
    var result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
}