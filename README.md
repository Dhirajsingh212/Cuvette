# Company Registration and Job Posting System


https://github.com/user-attachments/assets/d9fbc0a3-af14-4d75-ba79-ca891add608f


## User Registration (Company)
- Companies can register by providing basic details.
- Email and mobile verification have been implemented to activate accounts.
- Unverified users are restricted from posting jobs.

## Company Login
- An auto-login system has been implemented using JWT or session-based authentication.

## Job Posting
Authenticated companies can post jobs with the following details:
- **Job title**
- **Job description**
- **Experience Level**
- **Add candidate**
- **End date**

## Candidate Email Automation
- Functionality has been added for companies to send job alerts or updates to multiple candidates via email.
- **Nodemailer** is used to automate emails.
- Emails include:
  - **Job details**
  - **Sender information**

## Logout
- A logout option is available to clear tokens or sessions.
