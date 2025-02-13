import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from './ui/table';
import { Loader2 } from 'lucide-react';

const API_ENDPOINT = 'https://08nvdwe763.execute-api.us-east-1.amazonaws.com/prod/subscribers';

interface Subscriber {
  email?: string;
  phone?: string;
  subscriptionDate?: string;
  id: string;
  [key: string]: any;
}

interface ApiError {
  message: string;
  code?: string;
}

async function uploadFile(file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_ENDPOINT}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
}

async function scheduleNotification(time: string): Promise<void> {
  const response = await fetch(`${API_ENDPOINT}/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ scheduledTime: time }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to schedule notification');
  }
}

function AdminPanel() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [pdf, setPdf] = useState<File | null>(null);
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      setError({ message: 'Failed to fetch subscribers' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError({ message: 'Please upload a PDF file' });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError({ message: 'File size must be less than 10MB' });
        return;
      }
      setPdf(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!pdf) return;
    setLoading(true);
    setError(null);
    try {
      await uploadFile(pdf);
      setPdf(null);
      setUploadProgress(0);
      setError({ message: 'PDF uploaded successfully', code: 'success' });
    } catch (error) {
      setError({ message: 'Failed to upload PDF' });
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleNotification = async () => {
    if (!scheduleTime) return;
    setLoading(true);
    setError(null);
    try {
      await scheduleNotification(scheduleTime);
      setScheduleTime('');
      setError({ message: 'Notification scheduled successfully', code: 'success' });
    } catch (error) {
      setError({ message: 'Failed to schedule notification' });
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.phone?.includes(searchTerm)
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      
      {error && (
        <Alert className={`mb-4 ${error.code === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {/* Upload PDF Section */}
      <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Upload Weekly Special</h2>
        <div className="flex gap-2 items-center">
          <Input 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileUpload}
            disabled={loading}
          />
          <Button 
            onClick={handleUpload} 
            disabled={!pdf || loading}
            className="min-w-[100px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Upload'}
          </Button>
        </div>
        {uploadProgress > 0 && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Schedule Notification Section */}
      <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Schedule Notification</h2>
        <div className="flex gap-2 items-center">
          <Input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            disabled={loading}
            min={new Date().toISOString().slice(0, 16)}
          />
          <Button 
            onClick={handleScheduleNotification} 
            disabled={!scheduleTime || loading}
            className="min-w-[100px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Schedule'}
          </Button>
        </div>
      </div>

      {/* Subscribers Table Section */}
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subscribers</h2>
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={fetchSubscribers}>
              Refresh
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Email</TableCell>
                <TableCell header>Phone</TableCell>
                <TableCell header>Subscription Date</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>{subscriber.email || '—'}</TableCell>
                  <TableCell>{subscriber.phone || '—'}</TableCell>
                  <TableCell>
                    {subscriber.subscriptionDate 
                      ? new Date(subscriber.subscriptionDate).toLocaleDateString()
                      : '—'
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {/* TODO: Implement edit */}}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {/* TODO: Implement delete */}}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        {!loading && filteredSubscribers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No subscribers found
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
