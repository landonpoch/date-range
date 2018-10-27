class DateRange
    def initialize(start, stop)
        @start = start
        @stop = stop
    end
    def start
        @start
    end
    def stop
        @stop
    end
end

# Returns a DateRange containing the range of overlap of ranges passed in
# Or raises "No overlap" if there's no overlap
def findOverlap(dateRange1, dateRange2)
    return nil
end