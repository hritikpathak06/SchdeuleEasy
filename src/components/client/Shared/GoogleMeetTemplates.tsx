// emailTemplate.tsx

import React from 'react';

type EmailProps = {
  name: string;
  eventTitle: string;
  meetLink: string;
  startTime: string;
  endTime: string;
};

const EmailTemplate = ({ name, eventTitle, meetLink, startTime, endTime }: EmailProps) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h2>Hi {name},</h2>
      <p>
        Your booking for the event "<strong>{eventTitle}</strong>" has been confirmed.
      </p>
      <p>
        Here are the details:
      </p>
      <ul>
        <li><strong>Start Time:</strong> {startTime}</li>
        <li><strong>End Time:</strong> {endTime}</li>
        <li><strong>Google Meet Link:</strong> <a href={meetLink}>{meetLink}</a></li>
      </ul>
      <p>
        Please click the link to join the meeting at the scheduled time.
      </p>
      <p>
        Best regards,<br />
        The Team
      </p>
    </div>
  );
};

export default EmailTemplate;
