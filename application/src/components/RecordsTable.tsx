import React, { useEffect, useState } from 'react';
import { Record } from '../types';
import * as echarts from 'echarts';

interface Props {
  records: Record[];
}

interface GroupRecord {
  name: string;
  gender: string;
  count: number;
  pastSevenDays: number[];
}

const groupRecords = (records: Record[]): GroupRecord[] => {
  const grouped: {
    [key: string]: {
      name: string;
      gender: string;
      count: number;
      pastSevenDays: number[];
    };
  } = {};

  // initialise records array
  records.forEach((record) => {
    const key = `${record.name}-${record.gender}`;
    if (!grouped[key]) {
      grouped[key] = {
        name: record.name,
        gender: record.gender,
        count: 0,
        pastSevenDays: new Array(7).fill(0),
      };
    }
  });

  // populate past seven day data
  records.forEach((record) => {
    const key = `${record.name}-${record.gender}`;
    const date = new Date(record.timestamp * 1000);
    const today = new Date();
    const dayDiff = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 3600 * 24),
    );

    if (dayDiff >= 0 && dayDiff < 7) {
      grouped[key].pastSevenDays[6 - dayDiff] += record.duration;
    }
    grouped[key].count++;
  });

  return Object.values(grouped);
};

const RecordsTable: React.FC<Props> = ({ records }) => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [chartInitialized, setChartInitialized] = useState(false);
  const [groupedRecords, setGroupedRecords] = useState<GroupRecord[]>([]);

  useEffect(() => {
    const grouped = groupRecords(records);
    setGroupedRecords(grouped);
  }, [records]);

  const handleRowClick = (record: GroupRecord) => {
    if (
      selectedRecord &&
      selectedRecord.name === record.name &&
      selectedRecord.gender === record.gender &&
      chartInitialized
    ) {
      setSelectedRecord(null);
      const chartDom = document.getElementById('echarts-container');
      echarts.dispose(chartDom as HTMLElement);
      setChartInitialized(false);
    } else {
      setSelectedRecord(
        records.find((rec) => rec.name === record.name) || null,
      );
      renderBarChart(record.pastSevenDays);
    }
  };

  const renderBarChart = (sleepData: number[]) => {
    const chartDom = document.getElementById('echarts-container');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: ['-6', '-5', '-4', '-3', '-2', '-1', 'Today'],
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 24,
          interval: 2,
          axisLabel: {
            formatter: '{value}h',
          },
        },
        series: [
          {
            data: sleepData,
            type: 'bar',
          },
        ],
      };
      myChart.setOption(option);
      setChartInitialized(true);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {groupedRecords.map((record, index) => (
            <tr key={index} onClick={() => handleRowClick(record)}>
              <td>{record.name}</td>
              <td>{record.gender}</td>
              <td>{record.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        id="echarts-container"
        style={{ width: '600px', height: '400px' }}
      ></div>
    </div>
  );
};

export default RecordsTable;
