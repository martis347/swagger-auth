
# Swagger Authentication

## Functionality
This plugins enables quick and easy way to authenticate in Swagger using a customizable set of credentials.
This can be installed in Chromium based browsers (Chrome, new Microsoft Edge, Brave) and also Mozilla Firefox.

## How to install extension in Google Chrome (~3 minutes)
1. [Download Chrome extension from here](https://raw.githubusercontent.com/martis347/swagger-auth/master/Google%20Chrome%20Extension%201.0.1.zip?token=ACN3YR342SPHBIFSKHILZSS7JTPGK)
2. Extract contents and remember where it's stored. You will need the folder that's inside the zip.
3. Open extensions in Google Chrome by navigating to chrome://extensions
4. **Enable** _Developer mode_
5. Select option to "Load unpacked" and select folder **"Swagger Authentication"** that you downloaded in step 1
6. Great success!

## How to install extension in Mozilla Firefox (~3 minutes)
1. [Download Firefox extension from here](https://raw.githubusercontent.com/martis347/swagger-auth/master/Firefox%20Extension%201.0.1.xpi?token=ACN3YR2K2CXA6PMN2GTANT27JTPI2)
2. Open extensions in Mozilla Firefox by navigating to `about:addons`
3. Drag & Drop downloaded extension file `Firefox Extension.xpi` to the window
4. Agree that you want to add the extension
5. Great success!

## How to update extension to latest version in Google Chrome
1. [Download Chrome extension from here](https://raw.githubusercontent.com/martis347/swagger-auth/master/Google%20Chrome%20Extension.zip?token=ACN3YR342SPHBIFSKHILZSS7JTPGK)
2. Delete old plugin data which you extracted when installing it last time.
3. Extract contents to the same folder as last time. That is important if you want to **keep your previously saved data**.
4. Open extensions in Google Chrome by navigating to chrome://extensions
5. Click **Reload** button for the Hyarchis Auth extension
6. Great success!

## How to update extension to latest version in Mozilla Firefox
1. Steps are identical as when installing a new plugin in Mozilla Firefox

## How to use the extension
1. Expand the list of extensions you have in Google Chrome and select "Swagger Auth"
2. Add as many users as you want
  - **Name** - That's how this request template will be named. Names must be unique.
  - **Request endpoint** - Authorization request endpoint
  - **Request body** - Authorization request body 
  - **Authorization header schema** - Authorization request header schema (Hyarchis, Bearer, ...)
  - **Authorization session accessor** - Path to access authorization response value that should be used for further requests in Swagger. Examples: `sessionId`, `authrorizationData.sessionId`, `access_token`, `some.object[0].sessionId`
  - [Optional] **Effective Urls** - Optional comma-separated field indicating at what Urls in Swagger this template should be included. If left empty - it will be included everywhere.
3. Navigate to any swagger and you will notice additional "Authorize" buttons at the bottom right corner
4. Click **Authorize** and you will be automatically authenticated using the provided details of the button.
