import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsChartProps {
  link: Link;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ link }) => {
  const [timeData, setTimeData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });
  const [deviceData, setDeviceData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    // Process time-based data
    const timeMap = new Map<string, number>();
    link.analytics.forEach((entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      timeMap.set(date, (timeMap.get(date) || 0) + 1);
    });

    setTimeData({
      labels: Array.from(timeMap.keys()),
      data: Array.from(timeMap.values()),
    });

    // Process device data
    const deviceMap = new Map<string, number>();
    link.analytics.forEach((entry) => {
      const device = entry.device.split(' ')[0]; // Get the first word of the device string
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });

    setDeviceData({
      labels: Array.from(deviceMap.keys()),
      data: Array.from(deviceMap.values()),
    });
  }, [link]);

  const timeChartData = {
    labels: timeData.labels,
    datasets: [
      {
        label: 'Clicks',
        data: timeData.data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const deviceChartData = {
    labels: deviceData.labels,
    datasets: [
      {
        label: 'Device Usage',
        data: deviceData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Analytics for {link.shortUrl}</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Clicks Over Time</h3>
        <Line
          data={timeChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Device Distribution</h3>
        <Bar
          data={deviceChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
          }}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-2xl font-semibold">{link.clicks}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-2xl font-semibold">
              {link.expirationDate && new Date(link.expirationDate) < new Date()
                ? 'Expired'
                : 'Active'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart; 