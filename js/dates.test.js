var expect = require('chai').expect;
var {DateRange, findOverlap} = require('./dates');

describe('Date range', () => {

    const now = new Date();
    const sevenDaysAgo = addDays(now, -7);
    const sevenDaysFuture = addDays(now, 7);
    const fourteenDaysFuture = addDays(now, 14);

    it('one extends into range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, sevenDaysFuture);
        const dateRange2 = DateRange(now, fourteenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('two extends into range one', () => {
        const dateRange2 = DateRange(sevenDaysAgo, sevenDaysFuture);
        const dateRange1 = DateRange(now, fourteenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('one ends at instant range two begins', () => {
        const dateRange1 = DateRange(sevenDaysAgo, now);
        const dateRange2 = DateRange(now, fourteenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(result).to.be.undefined;
    });

    it('two ends at instant range one begins', () => {
        const dateRange2 = DateRange(sevenDaysAgo, now);
        const dateRange1 = DateRange(now, fourteenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(result).to.be.undefined;
    });

    it('one contains date range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const dateRange2 = DateRange(now, sevenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('two contains date range one', () => {
        const dateRange2 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const dateRange1 = DateRange(now, sevenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('one does not overlap range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, now);
        const dateRange2 = DateRange(sevenDaysFuture, fourteenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(result).to.be.undefined;
    });

    it('two does not overlap range one', () => {
        const dateRange2 = DateRange(sevenDaysAgo, now);
        const dateRange1 = DateRange(sevenDaysFuture, fourteenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(result).to.be.undefined;
    });

    it('one equals range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const dateRange2 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const expected = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    })
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}