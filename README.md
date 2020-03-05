# Project Description

## Pitch
Not everyone needs 8 hours of sleep, but how do you know if you’re someone lucky enough to need only 6? Or an unlucky one that needs 10?! Enter Sleep Tracker.

## MVP
***This Product consists of a little more than your average CRUD application. Please choose only if you're willing to get a little extra creative to meet MVP.

1. Onboarding process for a user.
2. Homepage view shows a graph of your nightly hours of sleep over time .
3. Ability to create a night’s sleep entry. For each date set (1/1/19-1/2/19), user can scroll through a digital clock image (like when you set your alarm on your phone, or just type in) to enter what time they got in bed and what time they woke up. 
4. From this data, app will calculate their total time in bed.
5. Ability to edit or delete a sleep entry.
6. Ability to click one of four emoji buttons to rate how they felt right when they woke up, how they felt during the day, and how tired they felt when they went to bed. 
7. Behind the scenes, a score 1-4 is given for each emoji. The app will calculate an average mood score for 1/2/19, and compare it to the time spent in bed. The app will then recommend after using for >1 month how much sleep you need.  “Your mood score tends to be highest when you sleep 7.5 hours”

## Stretch
1. Connect the app to a movement tracking device to automatically track when user is asleep.
2. Have mattress and other sleep paraphernalia sugesstions based on sleep score. Think pop-up modal.

# Database URL

## Heroku link
> ### <https://sleep-tracker-1.herokuapp.com>

# API Specifications: Summary of All Routes

## Login and registration routes

|Method|Route|Description|Authorization|
|------|-----|-----------|-------------|
|POST|/api/auth/register|Receives data for registration|none
|POST|/api/auth/login|Receives data for login|none

## User profile routes
|Method|Route|Description|Authorization|
|------|-----|-----------|-------------|
|GET|/api/profile|Retrieves the profile of the user who is logged in|token|
|PUT|/api/profile|Updates the profile of the user who is logged in|token|
|DELETE|/api/profile|Deletes the account of the user who is logged in|token|

## Sleep data routes
|Method|Route|Description|Authorization|
|------|-----|-----------|-------------|
|GET|/api/sleepdata|Retrieves all sleep entries of the user who is logged in|token|
|GET|/api/sleepdata/:id|Retrieves the sleep entry with the given ID. The entry must belong to the user who is logged in.|token|
|POST|/api/sleepdata|Creates a new entry for the user who is logged in|token|
|PUT|/api/sleepdata/:id|Edits the sleep entry with the given ID for the user who is logged in|token|
|DELETE|/api/sleepdata/:id|Deletes the sleep entry with the given ID for the user who is logged in|token|

## Admin routes (for debugging use only)
|Method|Route|Description|Authorization|
|------|-----|-----------|-------------|
|GET|/api/admin/users|Retrieves all user profiles in the database|none|
|GET|/api/admin/users/:id|Retrieves the profile of the user with specified ID|none|
|GET|/api/admin/users/:id/sleepdata|Retrieves all sleep data records of the user with specified ID|none|
|GET|/api/admin/sleepdata|Retrieves all sleep data records in the database|none|
|GET|/api/admin/sleepdata/:id|Retrieves sleep data entry with specified ID|none|
|GET|/api/admin/sleepdata/generate?entries=x&user_id=y|Generates `x` days of sleep entries (dummy data) for user with ID `y`|none|


# API Specifications: Login and Registration

## **POST: /api/auth/register**

> ### Auth Required to Access:
```
none
```

> ### Input

```
{
    email: (string),
    password: (string)
}
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
201|Success|Account created.|"Created account for (email)"|```{message: "Created account for (email)", token: string (token)}```
400|Error|Missing info.|"Email and password are both required."|```{message: "Email and password are both required."}```
400|Error|email in use.|"Email already taken."|```{message: "Email already taken."}```
500|Error|Server error.|"Server error in retrieving email"|```{message: "Server error in retrieving email", error: (error)}```
500|Error|Server error.|"Could not add user"|```{error: (error)}```

## **POST: /api/auth/login**

> ### Auth Required to Access:
```
none
```

> ### Input

```
{
    email: (string),
    password: (string)
}
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
200|Success|Logged in.|"Logged in (email)"|```{message: "Logged in (email)", token: string (token)}```
400|Error|Missing info.|"Email and password are both required."|```{message: "Email and password are both required."}```
401|Error|Invalid credentials.|"Invalid credentials"|```{message: "Invalid credentials"}```


# API Specifications: Profiles

## **GET: /api/profile**

### Returns the profile of the currently-logged in user.

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Profile found.|none|```{user profile}```
404|Error|Server error.|"Could not find a user with id (id)."|```{message: "Could not find a user with id (id).", (error)}```


## **PUT: /api/profile**

### Updates the profile of the currently-logged in user.

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Profile updated.|"Profile updated.|```{message: "Profile updated..}```
|200|Success|No new info added.|"No changes were made to your profile".|```{message: "No changes were made to your profile".}```
|400|Error|Current password not specified.|"You must enter your old password to make any changes to your profile".|```{message: "You must enter your old password to make any changes to your profile."}```
|401|Error|Current password incorrect.|"Password incorrect. Could not update profile".|```{message: "Password incorrect. Could not update profile."}```
|403|Error|Email address already used by another user.|"Email address already in use".|```{message: "Email address already in use."}```
500|Error|Server error.|"Server error in validating credentials."|```{message: "Server error in validating credentials.", (error)}```
500|Error|Server error.|"Server error in updating profile."|```{message: "Server error in updating profile.", (error)}```


> ### Input

```
{
    currentPassword: (string),  // required
    newPassword: (string),
    newEmail: (string),
    newFirstName: (string),
    newLastName: (string)
}
```

## **DELETE: /api/profile**

### Deletes the account of the currently-logged in user.

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Profile found.|none|```{user profile}```
404|Error|Server error.|"Could not find a user with id (id)."|```{message: "Could not find a user with id (id).", (error)}```


# API Specifications: Sleep Data


## **GET: /api/sleepdata**

### Retrieves all sleep entries of the user who is logged in

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```

> ### Sleep Entry Format

```
  {
    "id": 1,
    "user_id": 1,
    "log_date": 1582554540090,
    "time_bedtime": 1582526100090,
    "time_wakeup": 1582554540090,
    "rating_wakeup": 4,
    "rating_day": 3,
    "rating_bedtime": 2,
    "notes_wakeup": "stayed up late to study for exam",
    "notes_day": "",
    "notes_bedtime": "",
    "rating_average": 3,              // not stored in DB; calculated automatically upon retrieval
    "sleeptime_hours": 7,             // not stored in DB; calculated automatically upon retrieval
    "sleeptime_extra_minutes": 54,    // not stored in DB; calculated automatically upon retrieval
    "sleeptime_total_minutes": 474    // not stored in DB; calculated automatically upon retrieval

  }
```
> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Retrieved sleep entry.|none|```[{ sleep entry 1}, {sleep entry 2}, ... ] OR []```
500|Error|Server error.|"Could not get sleep data."|```{message: "Could not add new sleep data.", (error)}```

## **GET: /api/sleepdata/:id**

### Retrieves the sleep entry with the given ID. The entry must belong to the user who is logged in.

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```

> ### Sleep Entry Format

```
  {
    "id": 1,
    "user_id": 1,
    "log_date": 1582554540090,
    "time_bedtime": 1582526100090,
    "time_wakeup": 1582554540090,
    "rating_wakeup": 4,
    "rating_day": 3,
    "rating_bedtime": 2,
    "notes_wakeup": "stayed up late to study for exam",
    "notes_day": "",
    "notes_bedtime": "",
    "rating_average": 3,              // not stored in DB; calculated automatically upon retrieval
    "sleeptime_hours": 7,             // not stored in DB; calculated automatically upon retrieval
    "sleeptime_extra_minutes": 54,    // not stored in DB; calculated automatically upon retrieval
    "sleeptime_total_minutes": 474    // not stored in DB; calculated automatically upon retrieval

  }
```
> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Retrieved sleep entry.|none|```{ sleep entry } OR []```
500|Error|Server error.|"Could not get sleep data."|```{message: "Could not add new sleep data.", (error)}```

## **POST: /api/sleepdata**

### Creates a new entry for the user who is logged in

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```


> ### Input

```
  {
    "user_id": 1,                     // required
    "log_date": 1582554540090,        // required
    "time_bedtime": 1582526100090,
    "time_wakeup": 1582554540090,
    "rating_wakeup": 4,
    "rating_day": 3,
    "rating_bedtime": 2,
    "notes_wakeup": "stayed up late to study for exam",
    "notes_day": "",
    "notes_bedtime": ""
  }
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|201|Success|Added new sleep entry.|none|```(id of added sleep entry)```
|400|Error|Missing sleep entry data|Missing required sleep entry data.|```{message: "Missing required sleep entry data."}```
|400|Error|Missing log_date property|Missing required log_date property.|```{message: "Missing required log_date property."}```
500|Error|Server error.|"Could not add new sleep entry."|```{message: "Could not add new sleep entry.", (error)}```

## **PUT: /api/sleepdata/:id**

### Edits the sleep entry with the given ID for the user who is logged in

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```

> ### Status Codes and Messages
|Status|Type|Description|Message|Return Value|
|------|----|-----------|-------|------------|
|200|Success|Edited sleep entry.|Sleep entry #(id) updated|```{message: "Sleep entry #(id) updated."}```|none|
|400|Error|Missing sleep entry data|Missing required sleep entry data.|```{message: "Missing required sleep entry data."}```|
|400|Error|Missing log_date property|Missing required log_date property.|```{message: "Missing required log_date property."}```|
|403|Success|Could not edit sleep entry.|Sleep entry #(id) is not an entry you can edit.|```{message: "Sleep entry #(id) entry you can edit."}```|none|
500|Error|Server error.|"Could not edit sleep entry."|```{message: "Could not edit sleep entry.", (error)}```|

## **DELETE: /api/sleepdata**

### Deletes the sleep entry with the given ID for the user who is logged in

> ### Auth Required to Access:
```
{
    Authorization: { token: (token) }
}
```


> ### Input

```
none
```

> ### Status Codes and Messages
|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Edited sleep entry.|Sleep entry #(id) deleted.|```{message: "Sleep entry #(id) deleted."}```|none
|403|Success|Could not delete sleep entry.|Sleep entry #(id) is not an entry you can delete.|```{message: "Sleep entry #(id) entry you can delete."}```|none
500|Error|Server error.|"Could delete sleep entry."|```{message: "Could not delete sleep entry.", (error)}```


# API Specifications: Admin View (for debugging use only)

## **GET: /api/admin/users**

### Returns a list of all users in the database

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Fetched all users.|none|```[{user1}, {user2}, ...]```
500|Error|Server error.|"Could not get users."|```{message: "Could not get users.", (error)}```


## **GET: /api/admin/users/:id**

### Returns info about a user, specified by ID

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Fetched user data.|none|```{user}```
404|Error|Invalid user ID.|"Could not get users."|```{message: "Could not find a user with ID (id)."}```


> ### User info Format

```
{
  "id": 2,
  "email": "sleep@tracker.com",
  "first_name": "sleep",
  "last_name": "tracker"
}
```

## **GET: /api/admin/users/:id/sleepdata**

### Returns all the sleep entries from a user, specified by ID

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Fetched user data.|none|```[{sleep entry 1}, {sleep entry 2}, ...]```
404|Error|Invalid user ID.|"Could not get users."|```{message: "Could not find a user with ID (id)."}```


## **GET: /api/admin/sleepdata**

### Returns all the sleep data entries in the database

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Fetched all sleep data.|none|```[{sleep entry 1}, {sleep entry 2}, ...]```
500|Error|Server error.|"Could not get sleep data."|```{message: "Could not get sleep data.", (error)}```

## **GET: /api/admin/sleepdata/:id**

### Returns the sleep data entry with the specified ID

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Fetched all sleep data.|none|```{sleep entry}```
404|Error|Sleep entry not found.|"Could not find a sleep entry with id (id)."|```{message: "Could not find a sleep entry with id (id)."}```
500|Error|Server error.|"Could not get sleep data."|```{message: "Could not get sleep data.", (error)}```


## **GET: /api/admin/sleepdata/generate?entries=x&user_id=y**

### Generates `x` days of sleep entries (dummy data) for user with ID `y`.

If `entries` is not specified as a query, then one entry will be generated.

These entries **are not added to the database**. The purpose of this endpoint is to return dummy data so that the front-end developers can build a calendar view without needing to manually insert each entry.

> ### Examples:
```
/api/admin/sleepdata/generate?entries=5&user_id=3       // generates 5 entries for user #3
/api/admin/sleepdata/generate?user_id=10                // generates 1 entrie for user #10
/api/admin/sleepdata/generate?entries=1000&user_id=7    // generates 1000 entries for user #7
```

> ### Output format

Each sleep entry is dated for a different day. If 10 entries were requested, then the earliest entry will be 10 days before today (the day the URL is accessed). The last entry will be dated for yesterday.

```
  // GET /api/admin/sleepdata/generate?entries=10&user_id=4
  // generate 10 sleep entries for user #4

  [
    { ... } // sleep entry for 10 days before today
    { ... } // sleep entry for 9 days before today
    { ... } // sleep entry for 8 days before today
       ⋮
    { ... } // sleep entry for 2 days before today
    { ... } // sleep entry for 1 day before today
  ]
```

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|200|Success|Generated sleep data.|none|```[{sleep entry 1}, {sleep entry 2}, ...]```
400|Error|Missing user_id query in URL.|"Required user_id missing."|```{message: "Required user_id missing."}```
400|Error|`entries` value too big (more than 10,000).|"Too many sleep entries requested."|```{message: "Too many sleep entries requested."}```
500|Error|Server error.|"Could not get sleep data."|```{message: "Could not get sleep data.", (error)}```
