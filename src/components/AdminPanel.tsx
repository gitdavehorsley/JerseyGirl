// src/components/AdminPanel.tsx
import React, { useEffect, useState } from 'react';

// If you have your own UI components, import them:
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from './ui/table';

// Replace this with the actual API Gateway endpoint from your CloudFormation output
const API_ENDPOINT = 'https://08nvdwe763.execute-api.us-east-1.amazonaws.com/prod/subscribers';

// Placeholder functions for uploading a PDF and scheduling notifications.
// In production, you'd call your own API endpoints or AWS services.
async function uploadFile(file: File) {
  console.log('Uploading file...', file);
  // Example: POST to a custom API that handles S3 uploads or pre-signed URLs
}

async function scheduleNotification(time: string) {
  console.log('Scheduling notification at:', time);
  // Example: POST to an API that sets up EventBridge rules or calls SNS
}

interface Subscriber {
  email?: string;
  phone?: string;
  [key: string]: any; // fallback for other attributes
}

function AdminPanel() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [pdf, setPdf] = useState<File | null>(null);
  const [scheduleTime, setScheduleTime] = useState('');

  // Fetch subscribers on mount
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setSubscribers(data);
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      }
    })();
  }, []);

  // Handle PDF file selection
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPdf(e.target.files[0]);
    }
  };

  // Upload PDF to your backend (placeholder logic)
  const handleUpload = async () => {
    if (pdf) {
      await uploadFile(pdf);
      alert('PDF uploaded successfully');
      setPdf(null);
    }
  };

  // Schedule a notification (placeholder logic)
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload Weekly Special</h2>
        <Input type="file" accept="application/pdf" onChange={handleFileUpload} />
        <Button onClick={handleUpload} className="mt-2">
          Upload
        </Button>
      </div>

      {/* Schedule Notification */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Schedule Notification</h2>
        <Input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />
        <Button onClick={handleScheduleNotification} className="mt-2">
          Schedule
        </Button>
      </div>

      {/* Subscribers Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Subscribers</h2>
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
                <TableCell>{subscriber.email || '—'}</TableCell>
                <TableCell>{subscriber.phone || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminPanel;
