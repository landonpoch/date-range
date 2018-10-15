package com.sling.daterange;

import java.util.Date;

public class DateRange {

    private Date begin;
    private Date end;

    public DateRange(Date begin, Date end) {
        this.begin = begin;
        this.end = end;
    }

    public Date getBegin() {
        return this.begin;
    }
    public Date getEnd() {
        return this.end;
    }
}