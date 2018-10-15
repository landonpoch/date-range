/**
 * Returns a DateRange containing the range of overlap of ranges passed in
 * Or returns undefined if there's no overlap
 */
function findOverlap(dateRange1, dateRange2) {
    // TODO: Implement
}

function DateRange(begin, end) {
    return {
        begin: begin,
        end: end
    }
}

module.exports = { DateRange, findOverlap };