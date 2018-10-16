package main

import (
	"time"
)

func main() {

}

/**
 * Returns a DateRange containing the range of overlap of ranges passed in
 * Or error if ranges do not overlap
 */
func findOverlap(dateRange1 DateRange, dateRange2 DateRange) (DateRange, error) {
	var overlap DateRange
	var err error

	return overlap, err
}

type DateRange struct {
	begin time.Time
	end   time.Time
}
