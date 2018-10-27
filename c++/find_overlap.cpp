#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"

class DateRange {
    std::time_t begin, end;
  public:
    DateRange (std::time_t,std::time_t);
    std::time_t getBegin() { return begin; }
    std::time_t getEnd() { return end; }
};
DateRange::DateRange (std::time_t b, std::time_t e) {
  begin = b;
  end = e;
}

/**
 * Returns a DateRange containing the range of overlap of ranges passed in
 * Or throws an exception if there's no overlap
 */
std::unique_ptr<DateRange> findOverlap(std::shared_ptr<DateRange> dateRange1, std::shared_ptr<DateRange> dateRange2) {
    // TODO: Implement
    return nullptr;
}

std::time_t addDays(std::time_t in, int days) {
    auto instruct = localtime(&in);
    instruct->tm_mday = instruct->tm_mday + days;
    return mktime(instruct);
}
auto now = std::chrono::system_clock::to_time_t(std::chrono::system_clock::now());
auto sevenDaysAgo = addDays(now, -7);
auto sevenDaysFuture = addDays(now, 7);
auto fourteenDaysFuture = addDays(now, 14);

TEST_CASE( "findOverlap should return overlap when range one extends into range two" ) {
    auto dateRange1 = std::make_shared<DateRange>(sevenDaysAgo, sevenDaysFuture);
    auto dateRange2 = std::make_shared<DateRange>(now, fourteenDaysFuture);
    auto expected = std::make_unique<DateRange>(now, sevenDaysFuture);
    auto result = findOverlap(dateRange1, dateRange2);
    REQUIRE(expected->getBegin() == result->getBegin());
    REQUIRE(expected->getEnd() == result->getEnd());
}

TEST_CASE( "findOverlap should return overlap when range two extends into range one" ) {
    auto dateRange2 = std::make_shared<DateRange>(sevenDaysAgo, sevenDaysFuture);
    auto dateRange1 = std::make_shared<DateRange>(now, fourteenDaysFuture);
    auto expected = std::make_unique<DateRange>(now, sevenDaysFuture);
    auto result = findOverlap(dateRange1, dateRange2);
    REQUIRE(expected->getBegin() == result->getBegin());
    REQUIRE(expected->getEnd() == result->getEnd());
}

TEST_CASE( "findOverlap should throw exception when range one ends at instant range two begins" ) {
    auto dateRange1 = std::make_shared<DateRange>(sevenDaysAgo, now);
    auto dateRange2 = std::make_shared<DateRange>(now, sevenDaysFuture);
    REQUIRE_THROWS(findOverlap(dateRange1, dateRange2));
}

TEST_CASE( "findOverlap should throw exception when range two ends at instant range one begins" ) {
    auto dateRange2 = std::make_shared<DateRange>(sevenDaysAgo, now);
    auto dateRange1 = std::make_shared<DateRange>(now, sevenDaysFuture);
    REQUIRE_THROWS(findOverlap(dateRange1, dateRange2));
}

TEST_CASE( "findOverlap should return overlap when range one completely contains range two" ) {
    auto dateRange1 = std::make_shared<DateRange>(sevenDaysAgo, fourteenDaysFuture);
    auto dateRange2 = std::make_shared<DateRange>(now, sevenDaysFuture);
    auto expected = std::make_unique<DateRange>(now, sevenDaysFuture);
    auto result = findOverlap(dateRange1, dateRange2);
    REQUIRE(expected->getBegin() == result->getBegin());
    REQUIRE(expected->getEnd() == result->getEnd());
}

TEST_CASE( "findOverlap should return overlap when range two completely contains range one" ) {
    auto dateRange2 = std::make_shared<DateRange>(sevenDaysAgo, fourteenDaysFuture);
    auto dateRange1 = std::make_shared<DateRange>(now, sevenDaysFuture);
    auto expected = std::make_unique<DateRange>(now, sevenDaysFuture);
    auto result = findOverlap(dateRange1, dateRange2);
    REQUIRE(expected->getBegin() == result->getBegin());
    REQUIRE(expected->getEnd() == result->getEnd());
}

TEST_CASE( "findOverlap should throw exception when range one does not overlap with range two" ) {
    auto dateRange1 = std::make_shared<DateRange>(sevenDaysAgo, now);
    auto dateRange2 = std::make_shared<DateRange>(sevenDaysFuture, fourteenDaysFuture);
    REQUIRE_THROWS(findOverlap(dateRange1, dateRange2));
}

TEST_CASE( "findOverlap should throw exception when range two does not overlap with range one" ) {
    auto dateRange2 = std::make_shared<DateRange>(sevenDaysAgo, now);
    auto dateRange1 = std::make_shared<DateRange>(sevenDaysFuture, fourteenDaysFuture);
    REQUIRE_THROWS(findOverlap(dateRange1, dateRange2));
}

TEST_CASE( "findOverlap should return overlap when range one equals range two" ) {
    auto dateRange1 = std::make_shared<DateRange>(sevenDaysAgo, fourteenDaysFuture);
    auto dateRange2 = std::make_shared<DateRange>(sevenDaysAgo, fourteenDaysFuture);
    auto expected = std::make_unique<DateRange>(sevenDaysAgo, fourteenDaysFuture);
    auto result = findOverlap(dateRange1, dateRange2);
    REQUIRE(expected->getBegin() == result->getBegin());
    REQUIRE(expected->getEnd() == result->getEnd());
}
