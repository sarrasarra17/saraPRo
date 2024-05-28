// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HandymanContract {
    struct Booking {
        string name;
        string email;
        string service;
        string date;
        string time;
        address customer;
        bool completed;
    }

    Booking[] public bookings;
    address public owner;

    event NewBooking(uint bookingId, string name, string email, string service, string date, string time, address customer);

    constructor() {
        owner = msg.sender;
    }

    function bookService(string memory _name, string memory _email, string memory _service, string memory _date, string memory _time) public {
        bookings.push(Booking({
            name: _name,
            email: _email,
            service: _service,
            date: _date,
            time: _time,
            customer: msg.sender,
            completed: false
        }));
        emit NewBooking(bookings.length - 1, _name, _email, _service, _date, _time, msg.sender);
    }

    function completeBooking(uint _bookingId) public {
        require(_bookingId < bookings.length, "Booking does not exist");
        require(bookings[_bookingId].customer == msg.sender, "Only the customer can complete the booking");
        bookings[_bookingId].completed = true;
    }

    function getBookings() public view returns (Booking[] memory) {
        return bookings;
    }
}
