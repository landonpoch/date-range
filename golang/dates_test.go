package main

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

var (
	now                = time.Now()
	sevenDaysAgo       = now.AddDate(0, 0, -7)
	sevenDaysFuture    = now.AddDate(0, 0, 7)
	fourteenDaysFuture = now.AddDate(0, 0, 14)
)

func TestRange1ExtendsIntoRange2(t *testing.T) {
	var dateRange1 = DateRange{sevenDaysAgo, sevenDaysFuture}
	var dateRange2 = DateRange{now, fourteenDaysFuture}
	var expected = DateRange{now, sevenDaysFuture}
	result, _ := findOverlap(dateRange1, dateRange2)

	assert.Equal(t, expected, result, "Unexpected DateRange")
}

func TestRange2ExtendsIntoRange1(t *testing.T) {
	var dateRange2 = DateRange{sevenDaysAgo, sevenDaysFuture}
	var dateRange1 = DateRange{now, fourteenDaysFuture}
	var expected = DateRange{now, sevenDaysFuture}
	result, _ := findOverlap(dateRange1, dateRange2)

	assert.Equal(t, expected, result, "Unexpected DateRange")
}

func TestRange1EndsAtInstantRange2Begins(t *testing.T) {
	var dateRange1 = DateRange{sevenDaysAgo, now}
	var dateRange2 = DateRange{now, fourteenDaysFuture}
	_, err := findOverlap(dateRange1, dateRange2)

	assert.NotNil(t, err, "Expected an error")
}

func TestRange2EndsAtInstantRange1Begins(t *testing.T) {
	var dateRange2 = DateRange{sevenDaysAgo, now}
	var dateRange1 = DateRange{now, fourteenDaysFuture}
	_, err := findOverlap(dateRange1, dateRange2)

	assert.NotNil(t, err, "Expected an error")
}

func TestRange1ContainsRange2(t *testing.T) {
	var dateRange1 = DateRange{sevenDaysAgo, fourteenDaysFuture}
	var dateRange2 = DateRange{now, sevenDaysFuture}
	var expected = DateRange{now, sevenDaysFuture}
	result, _ := findOverlap(dateRange1, dateRange2)

	assert.Equal(t, expected, result, "Unexpected DateRange")
}

func TestRange2ContainsRange1(t *testing.T) {
	var dateRange2 = DateRange{sevenDaysAgo, fourteenDaysFuture}
	var dateRange1 = DateRange{now, sevenDaysFuture}
	var expected = DateRange{now, sevenDaysFuture}
	result, _ := findOverlap(dateRange1, dateRange2)

	assert.Equal(t, expected, result, "Unexpected DateRange")
}

func TestRange1DoesNotOverlapRange2(t *testing.T) {
	var dateRange1 = DateRange{sevenDaysAgo, now}
	var dateRange2 = DateRange{sevenDaysFuture, fourteenDaysFuture}
	_, err := findOverlap(dateRange1, dateRange2)

	assert.NotNil(t, err, "Expected an error")
}

func TestRange2DoesNotOverlapRange1(t *testing.T) {
	var dateRange2 = DateRange{sevenDaysAgo, now}
	var dateRange1 = DateRange{sevenDaysFuture, fourteenDaysFuture}
	_, err := findOverlap(dateRange1, dateRange2)

	assert.NotNil(t, err, "Expected an error")
}

func TestRangesIdentical(t *testing.T) {
	var dateRange2 = DateRange{sevenDaysAgo, fourteenDaysFuture}
	var dateRange1 = DateRange{sevenDaysAgo, fourteenDaysFuture}
	var expected = DateRange{sevenDaysAgo, fourteenDaysFuture}
	result, _ := findOverlap(dateRange1, dateRange2)

	assert.Equal(t, expected, result, "Unexpected DateRange")
}
