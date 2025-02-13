// src/components/AdminPanel.tsx

import React, { useState, useEffect } from 'react';
// Use relative imports to reference UI components
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from './ui/table';

// If you have an API layer, uncomment and adjust these imports:
// import { uploadFile, getSubscribers, scheduleNotification } from '../lib/api';
// For now, we’ll mock them:
const uploadFile = async (file: File) => {
  console.log('Uploading file...', file);
  // Placeholder code
};

const getSubscribers = async () => {
  console.log('Fetching subscribers...');
  // Return mock data
  return [
    { email: 'test@example.com', phone: '123-456-7890' },
    { email: 'hello@world.com', phone: '098-765-4321' },
  ];
};

const scheduleNotification = async (time: string) => {
  console.log('Scheduling notification at:', time);
  // Placeholder code
};

function AdminPanel() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [subscribers, setSubscribers] = useState<
    { email: string; phone: string }[]
  >([]);

  // Load subscribers on component mount
  useEffect(() => {
    (async () => {
      const data = await getSubscribers();
      setSubscribers(data);
    })();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdf(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (pdf) {
      await uploadFile(pdf);
      alert('PDF uploaded successfully');
      setPdf(null);
    }
  };

  const handleScheduleNotification = async () => {
    if (scheduleTime) {
      await scheduleNotification(scheduleTime);
      alert('Notification scheduled successfully');
      setScheduleTime('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Upload PDF */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Upload Weekly Special</h2>
        <Input type="file" accept="application/pdf" onChange={handleFileUpload} />
        <Button onClick={handleUpload} className="mt-2">
          Upload
        </Button>
      </div>

      {/* Schedule Notification */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Schedule Notification</h2>
        <Input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />
        <Button onClick={handleScheduleNotification} className="mt-2">
          Schedule
        </Button>
      </div>

      {/* Subscribers List */}
      <div>
        <h2 className="text-xl font-semibold">Subscribers</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header>Email</TableCell>
              <TableCell header>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((subscriber, index) => (
              <TableRow key={index}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminPanel;
