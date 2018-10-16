using System;

namespace csharp
{
    public class Overlapper
    {
        public DateRange FindOverlap(DateRange dateRange1, DateRange dateRange2)
        {
            // TODO: Implement
            return null;
        }
    }

    public class DateRange : IEquatable<DateRange>
    {
        public DateTime Begin { get; private set; }
        public DateTime End { get; private set; }

        public DateRange(DateTime begin, DateTime end)
        {
            Begin = begin;
            End = end;
        }

        public bool Equals(DateRange other)
        {
            if (other == null) throw new ArgumentNullException(nameof(other));

            return Begin == other.Begin && End == other.End;
        }
    }
}
