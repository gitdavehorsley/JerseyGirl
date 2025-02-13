import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { uploadFile, getSubscribers, scheduleNotification } from "@/lib/api";

const AdminPanel = () => {
    const [pdf, setPdf] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [scheduleTime, setScheduleTime] = useState("");

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        const data = await getSubscribers();
        setSubscribers(data);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setPdf(file);
    };

    const handleUpload = async () => {
        if (pdf) {
            await uploadFile(pdf);
            alert("PDF uploaded successfully");
        }
    };

    const handleScheduleNotification = async () => {
        if (scheduleTime) {
            await scheduleNotification(scheduleTime);
            alert("Notification scheduled successfully");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
            
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Upload Weekly Special</h2>
                <Input type="file" accept="application/pdf" onChange={handleFileUpload} />
                <Button onClick={handleUpload} className="mt-2">Upload</Button>
            </div>
            
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Schedule Notification</h2>
                <Input type="datetime-local" onChange={(e) => setScheduleTime(e.target.value)} />
                <Button onClick={handleScheduleNotification} className="mt-2">Schedule</Button>
            </div>
            
            <div>
                <h2 className="text-xl font-semibold">Subscribers</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map((subscriber, index) => (
                            <tr key={index}>
                                <td>{subscriber.email}</td>
                                <td>{subscriber.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AdminPanel;
