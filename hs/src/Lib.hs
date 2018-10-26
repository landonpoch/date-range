module Lib
    ( DateRange(..)
    , findOverlap
    ) where

import           Data.Time.Clock

data DateRange = DateRange { begin :: UTCTime
                           , end   :: UTCTime
                           } deriving (Show)

{-
findOverlap takes in two date ranges.  Depending on the inputs provided
findOverlap either returns a string that says "No Overlap" if the inputs do not
overlap, or it returns a new date range of the overlap of the input parameters.
-}
findOverlap :: DateRange -> DateRange -> Either String DateRange
findOverlap dateRange1 dateRange2 = Left "Not implemented"
