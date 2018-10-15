package com.sling.daterange;

import java.lang.Exception;
import java.util.Date;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class OverlapFinderTest {
    Date now = new Date();
    Date sevenDaysAgo = addDays(now, -7);
    Date sevenDaysFuture = addDays(now, 7);
    Date fourteenDaysFuture = addDays(now, 14);

    @Test
    public void testRangeOneExtendsIntoRangeTwo() throws Exception {
        DateRange range1 = new DateRange(sevenDaysAgo, sevenDaysFuture);
        DateRange range2 = new DateRange(now, fourteenDaysFuture);
        DateRange expected = new DateRange(now, sevenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        DateRange actual = finder.findOverlap(range1, range2);

        assertEquals(expected.getBegin(), actual.getBegin());
        assertEquals(expected.getEnd(), actual.getEnd());
    }

    @Test
    public void testRangeTwoExtendsIntoRangeOne() throws Exception {
        DateRange range2 = new DateRange(sevenDaysAgo, sevenDaysFuture);
        DateRange range1 = new DateRange(now, fourteenDaysFuture);
        DateRange expected = new DateRange(now, sevenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        DateRange actual = finder.findOverlap(range1, range2);

        assertEquals(expected.getBegin(), actual.getBegin());
        assertEquals(expected.getEnd(), actual.getEnd());
    }

    @Test(expected = Exception.class)
    public void testRangeOneEndsAtInstantRangeTwoBegins() throws Exception {
        DateRange range1 = new DateRange(sevenDaysAgo, now);
        DateRange range2 = new DateRange(now, fourteenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        finder.findOverlap(range1, range2);
    }

    @Test(expected = Exception.class)
    public void testRangeTwoEndsAtInstantRangeOneBegins() throws Exception {
        DateRange range2 = new DateRange(sevenDaysAgo, now);
        DateRange range1 = new DateRange(now, fourteenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        finder.findOverlap(range1, range2);
    }

    @Test
    public void testRangeOneCompletelyContainsRangeTwo() throws Exception {
        DateRange range1 = new DateRange(sevenDaysAgo, fourteenDaysFuture);
        DateRange range2 = new DateRange(now, sevenDaysFuture);
        DateRange expected = new DateRange(now, sevenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        DateRange actual = finder.findOverlap(range1, range2);

        assertEquals(expected.getBegin(), actual.getBegin());
        assertEquals(expected.getEnd(), actual.getEnd());
    }

    @Test
    public void testRangeTwoCompletelyContainsRangeOne() throws Exception {
        DateRange range2 = new DateRange(sevenDaysAgo, sevenDaysFuture);
        DateRange range1 = new DateRange(now, fourteenDaysFuture);
        DateRange expected = new DateRange(now, sevenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        DateRange actual = finder.findOverlap(range1, range2);

        assertEquals(expected.getBegin(), actual.getBegin());
        assertEquals(expected.getEnd(), actual.getEnd());
    }

    @Test(expected = Exception.class)
    public void testRangeOneDoesNotOverlapWithRangeTwo() throws Exception {
        DateRange range1 = new DateRange(sevenDaysAgo, now);
        DateRange range2 = new DateRange(sevenDaysFuture, fourteenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        finder.findOverlap(range1, range2);
    }

    @Test(expected = Exception.class)
    public void testRangeTwoDoesNotOverlapWithRangeOne() throws Exception {
        DateRange range2 = new DateRange(sevenDaysAgo, now);
        DateRange range1 = new DateRange(sevenDaysFuture, fourteenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        finder.findOverlap(range1, range2);
    }

    @Test
    public void testRangeOneEqualsRangeTwo() throws Exception {
        DateRange range1 = new DateRange(sevenDaysAgo, fourteenDaysFuture);
        DateRange range2 = new DateRange(sevenDaysAgo, fourteenDaysFuture);
        DateRange expected = new DateRange(sevenDaysAgo, fourteenDaysFuture);
        OverlapFinder finder = new OverlapFinder();
        DateRange actual = finder.findOverlap(range1, range2);

        assertEquals(expected.getBegin(), actual.getBegin());
        assertEquals(expected.getEnd(), actual.getEnd());
    }

    private Date addDays(Date date, int days) {
        long DAY_IN_MS = 1000 * 60 * 60 * 24;
        return new Date(date.getTime() + (days * DAY_IN_MS));
    }
}
