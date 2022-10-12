import React, {useMemo, useState} from "react";
import moment from "moment";
import {formatTimezoneOffset} from "../../../utils/helpers";
import "./style.css";

export const Table = ({
  data,
}) => {
  const [sort, setSort] = useState();

  const columns = useMemo(() => [
    { label: 'Comment', field: 'comment' },
    {
      label: 'Date & Time',
      field: 'createdAt',
      formatter(row) {
        return (
          <div className="text-nowrap">
            <div>{moment(row.createdAt).utc().format('llll')}</div>
            <div>{formatTimezoneOffset(moment(row.createdAt).utcOffset())}</div>
          </div>
        );
      }
    },
    {
      label: 'Sentiment',
      field: 'sentiment',
      formatter(row) {
        if (row.sentiment === 'POSITIVE') {
          return <i className="far fa-smile text-md text-success" />
        }
        if (row.sentiment === 'NEGATIVE') {
          return <i className="far fa-frown text-md text-danger" />
        }
        if (row.sentiment === 'NEUTRAL') {
          return <i className="far fa-meh text-md text-warning" />
        }
      }
    },
  ], []);

  const onSortColumn = (field) => {
    if (sort?.field !== field) {
      setSort({
        field,
        dir: 'ASC',
      });
    } else if (sort.dir === 'ASC') {
      setSort({
        field,
        dir: 'DESC',
      });
    } else {
      setSort(undefined);
    }
  };

  const tableData = useMemo(() => {
    if (!sort) {
      return data.tweets;
    }
    return [...data.tweets].sort((a, b) => {
      let result = a[sort.field].localeCompare(b[sort.field]);
      if (sort.field !== 'comment') {
        result = result * -1;
      }
      if (sort.dir === 'DESC') {
        result = result * -1;
      }
      return result;
    });
  }, [data, sort]);

  return (
    <div className="table-container mt-5">
      <div className="title">
        <b className="mr-auto">Comments</b>
        <span className="ml-4">Positive: <b>{data.POSITIVE}</b></span>
        <span className="ml-4">Negative: <b>{data.NEGATIVE}</b></span>
        <span className="ml-4">Neutral: <b>{data.NEUTRAL}</b></span>
      </div>

      <table>
        <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} onClick={() => onSortColumn(col.field)}>
              {col.label}
              {col.field === sort?.field && (
                sort.dir === 'ASC' ? <i className="fa fa-arrow-down" /> : <i className="fa fa-arrow-up" />
              )}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {tableData.map((row, i) => (
          <React.Fragment key={i}>
            <tr>
              {columns.map((col, j) => (
                <td key={j}>{col.formatter ? col.formatter(row, i) : row[col.field]}</td>
              ))}
            </tr>
            <tr>
              <td colSpan={columns.length} />
            </tr>
          </React.Fragment>
        ))}
        </tbody>
      </table>
    </div>
  );
};
