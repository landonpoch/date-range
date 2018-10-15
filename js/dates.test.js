var expect = require('chai').expect;
var {DateRange, findOverlap} = require('./dates');

describe('findOverlap', () => {

    const now = new Date();
    const sevenDaysAgo = addDays(now, -7);
    const sevenDaysFuture = addDays(now, 7);
    const fourteenDaysFuture = addDays(now, 14);

    it('should return overlap when range one extends into range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, sevenDaysFuture);
        const dateRange2 = DateRange(now, fourteenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('should return overlap when range two extends into range one', () => {
        const dateRange2 = DateRange(sevenDaysAgo, sevenDaysFuture);
        const dateRange1 = DateRange(now, fourteenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('should throw exception when range one ends at instant range two begins', () => {
        const dateRange1 = DateRange(sevenDaysAgo, now);
        const dateRange2 = DateRange(now, fourteenDaysFuture);
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should throw exception when range two ends at instant range one begins', () => {
        const dateRange2 = DateRange(sevenDaysAgo, now);
        const dateRange1 = DateRange(now, fourteenDaysFuture);
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should return overlap when range one completely contains range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const dateRange2 = DateRange(now, sevenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });
    
    it('should return overlap when range two completely contains range one', () => {
        const dateRange2 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const dateRange1 = DateRange(now, sevenDaysFuture);
        const expected = DateRange(now, sevenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });

    it('should throw exception when range one does not overlap with range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, now);
        const dateRange2 = DateRange(sevenDaysFuture, fourteenDaysFuture);
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should throw exception when range two does not overlap range one', () => {
        const dateRange2 = DateRange(sevenDaysAgo, now);
        const dateRange1 = DateRange(sevenDaysFuture, fourteenDaysFuture);
        const func = () => findOverlap(dateRange1, dateRange2);

        expect(func).to.throw();
    });

    it('should return overlap when range one equals range two', () => {
        const dateRange1 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const dateRange2 = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const expected = DateRange(sevenDaysAgo, fourteenDaysFuture);
        const result = findOverlap(dateRange1, dateRange2);

        expect(expected.begin).to.equal(result.begin);
        expect(expected.end).to.equal(result.end);
    });
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}