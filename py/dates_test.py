import unittest
import datetime

import dates

class TestStringMethods(unittest.TestCase):
    def setUp(self):
        self.now = datetime.datetime.now()
        self.seven_days_ago = self.now - datetime.timedelta(days=7)
        self.seven_days_future = self.now + datetime.timedelta(days=7)
        self.fourteen_days_future = self.now + datetime.timedelta(days=14)

    def test_range_one_extends_into_range_two(self):
        dateRange1 = dates.DateRange(self.seven_days_ago, self.seven_days_future)
        dateRange2 = dates.DateRange(self.now, self.fourteen_days_future)
        expected = dates.DateRange(self.now, self.seven_days_future)
        actual = dates.find_overlap(dateRange1, dateRange2)
        
        self.assertEqual(expected.begin, actual.begin)
        self.assertEqual(expected.end, actual.end)

    def test_range_two_extends_into_range_one(self):
        dateRange2 = dates.DateRange(self.seven_days_ago, self.seven_days_future)
        dateRange1 = dates.DateRange(self.now, self.fourteen_days_future)
        expected = dates.DateRange(self.now, self.seven_days_future)
        actual = dates.find_overlap(dateRange1, dateRange2)
        
        self.assertEqual(expected.begin, actual.begin)
        self.assertEqual(expected.end, actual.end)

    def test_range_one_ends_at_range_two_begin(self):
        dateRange1 = dates.DateRange(self.seven_days_ago, self.now)
        dateRange2 = dates.DateRange(self.now, self.fourteen_days_future)
        self.assertRaises(Exception, dates.find_overlap, dateRange1, dateRange2)

    def test_range_two_ends_at_range_one_begin(self):
        dateRange2 = dates.DateRange(self.seven_days_ago, self.now)
        dateRange1 = dates.DateRange(self.now, self.fourteen_days_future)
        self.assertRaises(Exception, dates.find_overlap, dateRange1, dateRange2)

    def test_range_one_contains_range_two(self):
        dateRange1 = dates.DateRange(self.seven_days_ago, self.fourteen_days_future)
        dateRange2 = dates.DateRange(self.now, self.seven_days_future)
        expected = dates.DateRange(self.now, self.seven_days_future)
        actual = dates.find_overlap(dateRange1, dateRange2)
        
        self.assertEqual(expected.begin, actual.begin)
        self.assertEqual(expected.end, actual.end)

    def test_range_two_contains_range_one(self):
        dateRange2 = dates.DateRange(self.seven_days_ago, self.fourteen_days_future)
        dateRange1 = dates.DateRange(self.now, self.seven_days_future)
        expected = dates.DateRange(self.now, self.seven_days_future)
        actual = dates.find_overlap(dateRange1, dateRange2)
        
        self.assertEqual(expected.begin, actual.begin)
        self.assertEqual(expected.end, actual.end)

    def test_range_one_does_not_overlap_with_range_two(self):
        dateRange1 = dates.DateRange(self.seven_days_ago, self.now)
        dateRange2 = dates.DateRange(self.seven_days_future, self.fourteen_days_future)
        self.assertRaises(Exception, dates.find_overlap, dateRange1, dateRange2)

    def test_range_two_does_not_overlap_with_range_one(self):
        dateRange2 = dates.DateRange(self.seven_days_ago, self.now)
        dateRange1 = dates.DateRange(self.seven_days_future, self.fourteen_days_future)
        self.assertRaises(Exception, dates.find_overlap, dateRange1, dateRange2)

    def test_range_one_equals_range_two(self):
        dateRange2 = dates.DateRange(self.now, self.seven_days_future)
        dateRange1 = dates.DateRange(self.now, self.seven_days_future)
        expected = dates.DateRange(self.now, self.seven_days_future)
        actual = dates.find_overlap(dateRange1, dateRange2)
        
        self.assertEqual(expected.begin, actual.begin)
        self.assertEqual(expected.end, actual.end)

if __name__ == '__main__':
    unittest.main()