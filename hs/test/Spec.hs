import           Data.Time.Clock (UTCTime, addUTCTime, getCurrentTime)
import           Lib
import           Test.HUnit

main = do
  now <- getCurrentTime
  let sevenDaysPast = addUTCTime (60 * 60 * 24 * 7 * (-1)) now
  let sevenDaysFuture = addUTCTime (60 * 60 * 24 * 7) now
  let fourteenDaysFuture = addUTCTime (60 * 60 * 24 * 14) now

  let test1 = TestCase
              (do
                let dateRange1 = DateRange sevenDaysPast sevenDaysFuture
                let dateRange2 = DateRange now fourteenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertFailure "Should have received overlap"
                  Right val -> do
                    assertEqual "Valid Begin" now (begin val)
                    assertEqual "Valid End" sevenDaysFuture (end val))

  let test2 = TestCase
              (do
                let dateRange2 = DateRange sevenDaysPast sevenDaysFuture
                let dateRange1 = DateRange now fourteenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertFailure "Should have received overlap"
                  Right val -> do
                    assertEqual "Valid Begin" now (begin val)
                    assertEqual "Valid End" sevenDaysFuture (end val))

  let test3 = TestCase
              (do
                let dateRange1 = DateRange sevenDaysPast now
                let dateRange2 = DateRange now sevenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertEqual "No Overlap" "No Overlap" err
                  Right val -> assertFailure "Should not have recieved overlap")

  let test4 = TestCase
              (do
                let dateRange2 = DateRange sevenDaysPast now
                let dateRange1 = DateRange now sevenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertEqual "No Overlap" "No Overlap" err
                  Right val -> assertFailure "Should not have recieved overlap")

  let test5 = TestCase
              (do
                let dateRange1 = DateRange sevenDaysPast fourteenDaysFuture
                let dateRange2 = DateRange now sevenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertFailure "Should have received overlap"
                  Right val -> do
                    assertEqual "Valid Begin" now (begin val)
                    assertEqual "Valid End" sevenDaysFuture (end val))

  let test6 = TestCase
              (do
                let dateRange2 = DateRange sevenDaysPast fourteenDaysFuture
                let dateRange1 = DateRange now sevenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertFailure "Should have received overlap"
                  Right val -> do
                    assertEqual "Valid Begin" now (begin val)
                    assertEqual "Valid End" sevenDaysFuture (end val))

  let test7 = TestCase
              (do
                let dateRange1 = DateRange sevenDaysPast now
                let dateRange2 = DateRange sevenDaysFuture fourteenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertEqual "No Overlap" "No Overlap" err
                  Right val -> assertFailure "Should not have recieved overlap")

  let test8 = TestCase
              (do
                let dateRange2 = DateRange sevenDaysPast now
                let dateRange1 = DateRange sevenDaysFuture fourteenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertEqual "No Overlap" "No Overlap" err
                  Right val -> assertFailure "Should not have recieved overlap")

  let test9 = TestCase
              (do
                let dateRange1 = DateRange now sevenDaysFuture
                let dateRange2 = DateRange now sevenDaysFuture
                let overlap = findOverlap dateRange1 dateRange2
                case overlap of
                  Left err -> assertFailure "Should have received overlap"
                  Right val -> do
                    assertEqual "Valid Begin" now (begin val)
                    assertEqual "Valid End" sevenDaysFuture (end val))

  runTestTT $ TestList [ TestLabel "Overlap when range one extends into two" test1
                       , TestLabel "Overlap when range two extends into one" test2
                       , TestLabel "No overlap if range one ends when two begins" test3
                       , TestLabel "No overlap if range two ends when one begins" test4
                       , TestLabel "Overlap when range one contains two" test5
                       , TestLabel "Overlap when range two contains one" test6
                       , TestLabel "No overlap if range one ends before two begins" test7
                       , TestLabel "No overlap if range two ends before one begins" test8
                       , TestLabel "Overlap when range one equals two" test9
                       ]
