import React from 'react';
import SettingsCard from './SettingsCard';

export default function SettingsLayout() {
  return (
    <div className="my-6 mx-8 gap-4 grid grid-flow-row-dense grid-cols-4 ...">
      <div className="col-span-2">
        <SettingsCard
          title="Personal Information"
          items={[{ title: 'Contact Email', type: 'textbox', attr: 'contactEmail' },
            { title: 'Default Delivery Location', type: 'textbox', attr: 'defaultDeliveryLocation' },
            { title: 'Contact Number', type: 'textbox', attr: 'phoneNumber' },
            { title: 'Default Delivery Room', type: 'textbox', attr: 'defaultDeliveryRoom' }]}
        />
      </div>

      <div className="col-span-2">
        <SettingsCard
          title="Notifications"
          items={[{ title: 'Notifications', type: 'toggle', attr: 'notificationOn' },
            { title: 'Email Notifications', type: 'toggle', attr: 'emailNotification' },
            { title: 'Phone Notifications', type: 'toggle', attr: 'phoneNotification' },
            { title: 'App Notifications', type: 'toggle', attr: 'appNotification' },
            { title: 'Do Not Disturb', type: 'toggle', attr: 'doNotDisturb' }]}
        />
      </div>
    </div>
  );
}
