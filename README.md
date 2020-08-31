
# Swagger Authentication

## Functionality
This plugins enables quick and easy way to authenticate in Swagger using a customizable set of credentials.
This can be installed in Chromium based browsers (Chrome, new Microsoft Edge, Brave) and also Mozilla Firefox.

## How to install extension in Google Chrome (~3 minutes)
1. [Download Chrome extension from here](https://raw.githubusercontent.com/martis347/swagger-auth/master/Google%20Chrome%20Extension%201.0.1.zip?token=ACN3YR342SPHBIFSKHILZSS7JTPGK)
2. Extract contents and remember where it's stored. You will need the folder that's inside the zip.
3. Open extensions in Google Chrome by navigating to chrome://extensions
![image.png](/.attachments/image-8cce3fdb-0836-45dd-9d16-d39b2534be2a.png)
4. **Enable** _Developer mode_
![image.png](/.attachments/image-39e0aee5-e709-4aaa-8b2f-2f6b390b9335.png)
5. Select option to "Load unpacked" and select folder **"Swagger Authentication"** that you downloaded in step 1
![image.png](/.attachments/image-e97e30da-983e-4550-b000-5d7df84e5806.png)
6. Great success!

## How to install extension in Mozilla Firefox (~3 minutes)
1. [Download Firefox extension from here](https://raw.githubusercontent.com/martis347/swagger-auth/master/Firefox%20Extension%201.0.1.xpi?token=ACN3YR2K2CXA6PMN2GTANT27JTPI2)
2. Extract contents and remember where it's stored. You will need the folder that's inside the zip.
3. Open extensions in Mozilla Firefox by navigating to `about:addons`
4. Drag & Drop downloaded extension file `Firefox Extension.xpi` to the window
5. Agree that you want to add the extension
![image.png](/.attachments/image-d382c223-dc04-4eac-9940-dd3dce9ce0c2.png)
6. Great success!


## How to use the extension
1. Expand the list of extensions you have in Google Chrome and select "Swagger Auth"
![image.png](/.attachments/image-2e5d7a3d-0c72-4eb7-9ff9-1e7b6a9931bd.png)
2. Add as many users as you want
2.1 **Name** - That's how this request template will be named. Names must be unique.
2.2 **Request endpoint** - Authorization request endpoint
2.3 **Request body** - Authorization request body 
2.4 **Authorization header schema** - Authorization request header schema (Hyarchis, Bearer, ...)
2.5 **Authorization session accessor** - Path to access authorization response value that should be used for further requests in Swagger. Examples: `sessionId`, `authrorizationData.sessionId`, `access_token`, `some.object[0].sessionId`
2.6 [Optional] **Effective Urls** - Optional comma-separated field indicating at what Urls in Swagger this template should be included. If left empty - it will be included everywhere.
![image.png](/.attachments/image-053889cc-79ea-477c-8922-2294390a005f.png)
3. Navigate to any swagger and you will notice additional "Authorize" buttons at the bottom right corner
![image.png](/.attachments/image-4f7ecfdb-84a9-48d3-a39b-0c886cfc8b4e.png)
4. Click **Authorize** and you will be automatically authenticated using the provided details of the button.
