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

# API Specifications: Users

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


# API Specifications: Sleep Data

## **GET: /api/sleepdata/profile**

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


## **PUT: /api/sleepdata/profile**

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
|401|Error|Current password not specified.|"Password incorrect. Could not update profile".|```{message: "Password incorrect. Could not update profile."}```
|400|Error|Email address already used by another user.|"Email address already in use".|```{message: "Email address already in use."}```
500|Error|Server error.|"Server error in validating credentials."|```{message: "Server error in validating credentials.", (error)}```
500|Error|Server error.|"Server error in updating profile."|```{message: "Server error in updating profile.", (error)}```


> ### Input

#### `currentPassword` is required, but  all other properties are optional.

```
{
    currentPassword: (string),
    newPassword: (string),
    newEmail: (string),
    newFirstName: (string),
    newLastName: (string)
}
```

## **DELETE: /api/sleepdata/profile**

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
404|Error|Server error.|"Could not get users."|```{message: "Could not find a user with ID (id)."}```


> ### User info Format

```
{
  "id": 2,
  "email": "sleep@tracker.com",
  "first_name": "sleep",
  "last_name": "tracker"
}
```


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

### Returns all the sleep entries from a user, specified by ID

> ### Auth Required to Access:
```
none
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|2000|Success|Fetched user data.|none|```{sleep entry}```
404|Error|Server error.|"Could not get users."|```{message: "Could not find a user with ID (id)."}```

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
    "notes_wakeup": "",
    "notes_day": "",
    "notes_bedtime": ""
  }
```




# API Specifications: Sleep Data

## **POST: TBD**

> ### Auth Required to Access:
```
{ token: (string) }
```


> ### Input

```
TBD
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|------|----|-----------|-------|------------|


## **GET: TBD**

> ### Auth Required to Access:
```
{ token: (string) }
```


> ### Input

```
TBD
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|------|----|-----------|-------|------------|

## **PUT: TBD**

> ### Auth Required to Access:
```
{ token: (string) }
```


> ### Input

```
TBD
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|------|----|-----------|-------|------------|

## **DELETE: TBD**

> ### Auth Required to Access:
```
{ token: (string) }
```


> ### Input

```
TBD
```

> ### Status Codes and Messages

|Status|Type|Description|Message|Return Value
|------|----|-----------|-------|------------|
|------|----|-----------|-------|------------|

