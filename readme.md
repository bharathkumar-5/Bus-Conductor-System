## Bus Ticket Booking & Boarding Management System

### Project Summary

I built a **full-stack Bus Ticket Booking and Boarding Management System** focused on **operational efficiency, clean UX, and optimized passenger boarding**.

The system is designed for a **bus conductor’s real-time usage**, enabling fast booking, seat management, and smooth boarding with minimal manual effort.

---

## What I Implemented

### 1. End-to-End Booking Management

* Created a complete booking flow allowing:

  * New booking creation
  * Booking updates and edits
* Used **mobile number + travel date** to uniquely identify a booking
* Automatically detected existing bookings and switched the UI into **edit mode**
* Enforced a **maximum of 6 seats per mobile number per day**

---

### 2. Interactive Seat Layout

* Implemented a **2 × 2 seat layout with 15 rows**
* Built a visual seat map with clear states:

  * Available
  * Selected
  * Booked
* Prevented seat conflicts by locking seats already booked by other passengers
* Allowed previously booked seats to remain editable during booking updates

---

### 3. Booking Confirmation Experience

* Displayed a confirmation popup after successful booking or update
* Included:

  * System-generated Booking ID
  * Travel Date
  * Mobile Number
  * Selected Seats
* Designed the flow to provide **clear feedback and confidence** to the conductor

---

### 4. Boarding List & Tracking

* Built a date-wise booking list for boarding operations
* Displayed bookings in a structured table with:

  * Sequence number
  * Booking ID
  * Seat(s)
  * Click-to-call mobile action
  * Boarding status toggle
* Enabled conductors to mark passengers as boarded in real time

---

### 5. Boarding Optimization Logic

* Implemented an **intelligent boarding sequence generator**
* Determined boarding order **booking-wise** based on seat positions
* Used a **back-to-front seat strategy** to eliminate seat-level blocking
* Ensured all passengers under a booking board together
* Achieved minimum total boarding time through a greedy sorting approach

---

### 6. Clean Architecture & Code Quality

* Separated frontend and backend responsibilities clearly
* Used meaningful naming conventions
* Implemented validations and error handling at both UI and API levels
* Designed APIs with scalability and maintainability in mind

---

## Technology Stack

**Frontend**

* React + TypeScript
* Vite
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB with Mongoose

---

## Project Structure

```
/frontend   → Conductor-facing user interface
/backend    → Booking APIs and boarding logic
```

---

## What This Project Demonstrates

* Practical full-stack development
* Algorithmic thinking applied to real-world UX
* Thoughtful handling of constraints and edge cases
* Professional-grade coding and design practices

---

## Author

**Bharath Kumar**
Full Stack Developer

---