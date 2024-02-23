import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const DateRangePicker = () => {
    const [dates, setDates] = useState([]);
    console.log(dates);
    
    return (
        <div style={{ margin: 20 }}>
            <RangePicker
                onChange={(values) => {
                    setDates(values.map(item => {
                        return moment(item).format("DD-MM-YYYY");
                    }));
                }}
                format="DD-MM-YYYY"
            />
        </div>
    );
}

export default DateRangePicker;