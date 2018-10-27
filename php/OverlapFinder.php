<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class DateRange
{
    public function __construct($begin, $end)
    {
        $this->begin = $begin;
        $this->end = $end;
    }
    public function getBegin() { return $this->begin; }
    public function getEnd() { return $this->end; }
}

/**
 * Returns a DateRange containing the range of overlap of ranges passed in
 * Or throws an exception if there's no overlap
 */
function findOverlap(DateRange $dateRange1, DateRange $dateRange2): DateRange
{
    // TODO: Implement
    return null;
}

final class FindOverlapTest extends TestCase
{
    public function setUp(): void
    {
        $this->now = time();
        $this->sevenDaysAgo = $this->now + (60 * 60 * 24 * 7 * -1);
        $this->sevenDaysFuture = $this->now + (60 * 60 * 24 * 7);
        $this->fourteenDaysFuture = $this->now + (60 * 60 * 24 * 14);
    }

    public function testShouldReturnOverlapWhenRangeOneExtendsIntoTwo(): void
    {
        $dateRange1 = new DateRange($this->sevenDaysAgo, $this->sevenDaysFuture);
        $dateRange2 = new DateRange($this->now, $this->fourteenDaysFuture);
        $expected = new DateRange($this->now, $this->sevenDaysFuture);
        $result = findOverlap($dateRange1, $dateRange2);
        $this->assertEquals($result->getBegin(), $expected->getBegin());
        $this->assertEquals($result->getEnd(), $expected->getEnd());
    }

    public function testShouldReturnOverlapWhenRangeTwoExtendsIntoOne(): void
    {
        $dateRange2 = new DateRange($this->sevenDaysAgo, $this->sevenDaysFuture);
        $dateRange1 = new DateRange($this->now, $this->fourteenDaysFuture);
        $expected = new DateRange($this->now, $this->sevenDaysFuture);
        $result = findOverlap($dateRange1, $dateRange2);
        $this->assertEquals($result->getBegin(), $expected->getBegin());
        $this->assertEquals($result->getEnd(), $expected->getEnd());
    }

    public function testShouldThrowExceptionIfRangeOneEndsAtRangeTwoBegins(): void
    {
        $this->expectException(Exception::class);
        $dateRange1 = new DateRange($this->sevenDaysAgo, $this->now);
        $dateRange2 = new DateRange($this->now, $this->fourteenDaysFuture);
        findOverlap($dateRange1, $dateRange2);
    }

    public function testShouldThrowExceptionIfRangeTwoEndsAtRangeOneBegins(): void
    {
        $this->expectException(Exception::class);
        $dateRange2 = new DateRange($this->sevenDaysAgo, $this->now);
        $dateRange1 = new DateRange($this->now, $this->fourteenDaysFuture);
        findOverlap($dateRange1, $dateRange2);
    }

    public function testShouldReturnOverlapWhenRangeOneCompletelyContainsRangeTwo(): void
    {
        $dateRange1 = new DateRange($this->sevenDaysAgo, $this->fourteenDaysFuture);
        $dateRange2 = new DateRange($this->now, $this->sevenDaysFuture);
        $expected = new DateRange($this->now, $this->sevenDaysFuture);
        $result = findOverlap($dateRange1, $dateRange2);
        $this->assertEquals($result->getBegin(), $expected->getBegin());
        $this->assertEquals($result->getEnd(), $expected->getEnd());
    }

    public function testShouldReturnOverlapWhenRangeTwoCompletelyContainsRangeOne(): void
    {
        $dateRange2 = new DateRange($this->sevenDaysAgo, $this->fourteenDaysFuture);
        $dateRange1 = new DateRange($this->now, $this->sevenDaysFuture);
        $expected = new DateRange($this->now, $this->sevenDaysFuture);
        $result = findOverlap($dateRange1, $dateRange2);
        $this->assertEquals($result->getBegin(), $expected->getBegin());
        $this->assertEquals($result->getEnd(), $expected->getEnd());
    }

    public function testShouldThrowExceptionWhenRangeOneDoesNotOverlapWithRangeTwo(): void
    {
        $this->expectException(Exception::class);
        $dateRange1 = new DateRange($this->sevenDaysAgo, $this->now);
        $dateRange2 = new DateRange($this->sevenDaysFuture, $this->fourteenDaysFuture);
        findOverlap($dateRange1, $dateRange2);
    }
    
    public function testShouldThrowExceptionWhenRangeTwoDoesNotOverlapWithRangeOne(): void
    {
        $this->expectException(Exception::class);
        $dateRange2 = new DateRange($this->sevenDaysAgo, $this->now);
        $dateRange1 = new DateRange($this->sevenDaysFuture, $this->fourteenDaysFuture);
        findOverlap($dateRange1, $dateRange2);
    }

    public function testShouldReturnOverlapWhenRangeOneEqualsRangeTwo(): void
    {
        $dateRange1 = new DateRange($this->sevenDaysAgo, $this->fourteenDaysFuture);
        $dateRange2 = new DateRange($this->sevenDaysAgo, $this->fourteenDaysFuture);
        $expected = new DateRange($this->sevenDaysAgo, $this->fourteenDaysFuture);
        $result = findOverlap($dateRange1, $dateRange2);
        $this->assertEquals($result->getBegin(), $expected->getBegin());
        $this->assertEquals($result->getEnd(), $expected->getEnd());
    }
}
