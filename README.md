# kudobuzz-autoshare
Forwards messages to social media networks

# Requirements
- A valid Facebook token for the page or account.
- A MongoDB instance `2.6` or above.

# Build/Run instructions
## Set up

- Clone the repository

```bash
git clone <repo-url>
```

- Get all dependencies

```bash
cd kudobuzz-autoshare
npm install
```


## Run
- Start the application

```bash
npm start
```
- Hit [`localhost:3000/documentation`](http://localhost:3000/documentation)
- Use the `/profile/create` path to register a social profile
  - Find a facebook example below

    ```json
    {
      "name": "FB-1",
      "type": "fb-post",
      "token": "<some-token>",
      "page_id": "304752622977052",
      "cron": "* * * * * *"
    }
    ```

    Default cron is `0 0 0 * * *`
- Use the `message/schedule` path to schedule messages to be sent.  
  - Example

  ```json
  {
    "profile": "599c3aecbe1c4038918f967c",
    "content": "This is a test"
  }
  ```

  where `profile` is the above profile id.
