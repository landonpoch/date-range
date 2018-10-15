/**
 * Returns a DateRange containing the range of overlap of ranges passed in
 * Or throws an exception if there's no overlap
 */
function findOverlap(dateRange1, dateRange2) {
    // TODO: Implement
}

function DateRange(begin, end) {
    return {
        begin: begin,
        end: end
    };
}

const base64Solution = `Y29uc3QgRGF0ZVJhbmdlID0gKGJlZ2luLCBlbmQpID0+IHsKICAgIHJldHVybiB7CiAgICAgICAgYmVnaW46IGJlZ2luLAogICAgICAgIGVuZDogZW5kCiAgICB9Owp9OwoKbGV0IGJlZ2luID0gZGF0ZVJhbmdlMS5iZWdpbiA8IGRhdGVSYW5nZTIuYmVnaW4gPyBkYXRlUmFuZ2UyLmJlZ2luIDogZGF0ZVJhbmdlMS5iZWdpbjsKbGV0IGVuZCA9IGRhdGVSYW5nZTEuZW5kID4gZGF0ZVJhbmdlMi5lbmQgPyBkYXRlUmFuZ2UyLmVuZCA6IGRhdGVSYW5nZTEuZW5kOwppZiAoYmVnaW4gPj0gZW5kKSB0aHJvdyBFcnJvcignTm8gb3ZlcmxhcCcpOwoKcmV0dXJuIERhdGVSYW5nZShiZWdpbiwgZW5kKTs=`;
const solutionFunc = new Function('dateRange1', 'dateRange2', new Buffer(base64Solution, 'base64').toString('utf8'));
module.exports = { DateRange, findOverlap };