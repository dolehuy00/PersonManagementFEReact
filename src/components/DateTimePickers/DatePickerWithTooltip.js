import React, { useState, useRef } from 'react';
import Datetime from "react-datetime";
import { Tooltip } from 'reactstrap';
import moment from "moment";

const DatePickerWithTooltip = ({ value, dateFormat = "YYYY-MM-DD", className, name, required, placeholder, disabled, id }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    
    const handleDateChange = (date, name) => {
        if (moment(date, "YYYY-MM-DD", true).isValid()) {
            setIsDateInvalid(false);
        } else {
            setIsDateInvalid(true);
            setTooltipOpen(true)
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
                onChange={(date) => handleDateChange(date, name)}
            />
            <Tooltip
                placement="right"
                isOpen={tooltipOpen && isDateInvalid}
                target={id}
                toggle={toggleTooltip}
                delay={{ show: 0, hide: 2000 }}
                autohide={true}
            >
                Ngày không hợp lệ. Vui lòng nhập ngày hợp lệ.
            </Tooltip>
        </>
    )
}


export default DatePickerWithTooltip;