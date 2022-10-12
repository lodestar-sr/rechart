import {useEffect, useMemo, useState} from "react";
import {Chart} from "./Chart";
import {Table} from "./Table";
import "./style.css";

export const Home = () => {
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/twiiter_response_with entities.json')
      .then((res) => res.json())
      .then((res) => {
        const data = [];
        const tweets = res.stats.twitter.timelineStats.timeline[0].externalTweets;
        tweets.forEach((item) => {
          const date = item.created_at.substr(0, 10);
          if (!data[date]) {
            data[date] = {
              POSITIVE: 0,
              NEGATIVE: 0,
              NEUTRAL: 0,
              tweets: [],
            };
          }

          data[date][item.sentimentPolarityLabel] ++;
          data[date].tweets.push({
            comment: item.tweet,
            sentiment: item.sentimentPolarityLabel,
            createdAt: item.created_at,
          });
        });
        setData(data);
      }).finally(() => {
      setLoading(false);
    });
  }, []);

  const tableData = useMemo(() => {
    if (selectedDate) {
      return data[selectedDate];
    }

    return Object.values(data || {}).reduce((res, item) => ({
      POSITIVE: res.POSITIVE + item.POSITIVE,
      NEGATIVE: res.NEGATIVE + item.NEGATIVE,
      NEUTRAL: res.NEUTRAL + item.NEUTRAL,
      tweets: res.tweets.concat(item.tweets),
    }), {
      POSITIVE: 0,
      NEGATIVE: 0,
      NEUTRAL: 0,
      tweets: [],
    });
  }, [data, selectedDate]);

  if (loading) {
    return (
      <div className="w-screen h-screen d-flex-center">
        Loading ...
      </div>
    );
  }

  return (
    <div className="homepage text-center">
      <Chart data={data} onSelectDate={setSelectedDate} />
      <Table data={tableData} />
    </div>
  );
};
