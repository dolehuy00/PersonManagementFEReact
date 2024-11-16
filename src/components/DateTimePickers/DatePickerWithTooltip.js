import React, { useState } from 'react';
import Datetime from "react-datetime";
import { Tooltip } from 'reactstrap';
import moment from "moment";

const DatePickerWithTooltip = ({ value, dateFormat = "YYYY-MM-DD", className, name, required, placeholder, disabled, id, onChange }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    
    const handleDateChange = (date) => {
        if (moment(date, dateFormat , true).isValid()) {
            setIsDateInvalid(false); 
            onChange(date, true);
        } else {
            setIsDateInvalid(true);
            setTooltipOpen(true)
            onChange(date, false);
        }
    };

    return (
        <>
            <Datetime
                inputProps={{
                    className: className,
                    name: name,
                    id: id,
                    required: required,
                    placeholder: placeholder,
                    disabled: disabled
                }}
                value={value || ""}
                timeFormat={false}
                dateFormat={dateFormat}
                onChange={handleDateChange}
            />
            <Tooltip
                placement="bottom"
                isOpen={isDateInvalid}
                target={id}
                toggle={toggleTooltip}
                autohide={true}
            >
                Invalid date.
                <br/>
                Format <b>{dateFormat}</b>
            </Tooltip>
        </>
    )
}


export default DatePickerWithTooltip;