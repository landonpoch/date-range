require "overlap_finder"

RSpec.describe "findOverlap" do
    now = Time.new
    sevenDaysPast = now + (60 * 60 * 24 * 7 * -1)
    sevenDaysFuture = now + (60 * 60 * 24 * 7)
    fourteenDaysFuture = now + (60 * 60 * 24 * 14)
    
    it "should return overlap when range one extends into range two" do
        dateRange1 = DateRange.new(sevenDaysPast, sevenDaysFuture)
        dateRange2 = DateRange.new(now, fourteenDaysFuture)
        expected = DateRange.new(now, sevenDaysFuture)
        result = findOverlap(dateRange1, dateRange2)
        expect(result.start).to eq expected.start
        expect(result.stop).to eq expected.stop
    end

    it "should return overlap when range two extends into range one" do
        dateRange2 = DateRange.new(sevenDaysPast, sevenDaysFuture)
        dateRange1 = DateRange.new(now, fourteenDaysFuture)
        expected = DateRange.new(now, sevenDaysFuture)
        result = findOverlap(dateRange1, dateRange2)
        expect(result.start).to eq expected.start
        expect(result.stop).to eq expected.stop
    end

    it "should throw exception when range one ends at instant range two begins" do
        dateRange1 = DateRange.new(sevenDaysPast, now)
        dateRange2 = DateRange.new(now, sevenDaysFuture)
        expect{findOverlap(dateRange1, dateRange2)}.to raise_error("No overlap")
    end

    it "should throw exception when range two ends at instant range one begins" do
        dateRange2 = DateRange.new(sevenDaysPast, now)
        dateRange1 = DateRange.new(now, sevenDaysFuture)
        expect{findOverlap(dateRange1, dateRange2)}.to raise_error("No overlap")
    end

    it "should return overlap when range one completely contains range two" do
        dateRange1 = DateRange.new(sevenDaysPast, fourteenDaysFuture)
        dateRange2 = DateRange.new(now, sevenDaysFuture)
        expected = DateRange.new(now, sevenDaysFuture)
        result = findOverlap(dateRange1, dateRange2)
        expect(result.start).to eq expected.start
        expect(result.stop).to eq expected.stop
    end

    it "should return overlap when range two completely contains range one" do
        dateRange2 = DateRange.new(sevenDaysPast, fourteenDaysFuture)
        dateRange1 = DateRange.new(now, sevenDaysFuture)
        expected = DateRange.new(now, sevenDaysFuture)
        result = findOverlap(dateRange1, dateRange2)
        expect(result.start).to eq expected.start
        expect(result.stop).to eq expected.stop
    end

    it "should throw exception when range one does not overlap with range two" do
        dateRange1 = DateRange.new(sevenDaysPast, now)
        dateRange2 = DateRange.new(sevenDaysFuture, fourteenDaysFuture)
        expect{findOverlap(dateRange1, dateRange2)}.to raise_error("No overlap")
    end

    it "should throw exception when range two does not overlap with range one" do
        dateRange2 = DateRange.new(sevenDaysPast, now)
        dateRange1 = DateRange.new(sevenDaysFuture, fourteenDaysFuture)
        expect{findOverlap(dateRange1, dateRange2)}.to raise_error("No overlap")
    end

    it "should return overlap when range one equals range two" do
        dateRange1 = DateRange.new(sevenDaysPast, fourteenDaysFuture)
        dateRange2 = DateRange.new(sevenDaysPast, fourteenDaysFuture)
        expected = DateRange.new(sevenDaysPast, fourteenDaysFuture)
        result = findOverlap(dateRange1, dateRange2)
        expect(result.start).to eq expected.start
        expect(result.stop).to eq expected.stop
    end
end