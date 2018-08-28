const emailTemplates = {
    welcomeLetter: {
        name: 'Welcome Letter - {{property_name}}',
        summary: 'Welcome {{guest_name}}',
        body: `
        <p>Hi {{guest_name}}</p>
<p><br></p>
<p>We're excited to host you for your upcoming stay in {{city}}. Check-in is after {{check_in_from}} and check-out is no later than {{check_out_until}}. The address to your stay is:</p>
<p><br></p>
<p><ins>DIRECTIONS</ins></p>
<p><br></p>
<p><strong>Address</strong></p>
<p>{{property_address}}</p>
<p><br></p>
<p><strong>Special Directions</strong></p>
<p>{{listing.special_directions}}</p>
<p><br></p>
<p><strong>Directions from Airport</strong></p>
<p>(Insert directions from nearest Airport to property)</p>
<p><br></p>
<p><ins>HOUSE RULES</ins></p>
<p><br></p>
<p>{{listing.house_rules}}</p>
<p><br></p>
<p><ins>THINGS TO DO</ins></p>
<p><br></p>
<p>{{listing.things_to_do}}</p>
<p>`
    },
    checkoutReminder: {
        name: 'Checkout Reminder - {{property_name}}',
        summary: 'Checkout Reminder',
        body: `
        <p>Hi {{guest_name}}<br>
 <br>
Just as a friendly reminder, you checkout is tomorrow at around {{check_out_until}}! Here are several instructions you should follow:
 <p><ol>
 <li>Put used towels and linens in laundry basket or on the bed.</li>
 <li>Be sure to put the keys back where they originally were when you checked in.</li>
 <li>Place all trash together in trash bags in the kitchen.</li>
 <li>Don't forget to let us know when you checkout!</li>
</ol></p>
<p><br></p>
<p>Thanks,</p>
<p>{{agent_name}}</p>
</p>`
    },
    cancellation: {
        name: '',
        summary: '',
        body: ''
    }

};

export default emailTemplates;
