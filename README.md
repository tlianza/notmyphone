## Not My Phone
This is the React UI served at [notmyphone.com](https://notmyphone.com/).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage
1. Install the [Pushbullet App](https://www.pushbullet.com/apps) on your phone, and create an account there.
2. Go to [notmyphone.com](https://notmyphone.com/) and click 'login' to give it access to Pushbullet.
3. Send yourself a test notification via the Pushbullet App, under the 'mirroring' section.

#### On a Raspberry Pi
To get your Raspberry Pi to boot up into this app in full screen, you can try the following steps:
1. Edit `/home/pi/.config/lxsession/LXDE-pi/autostart` and add the line `@chromium-browser --kiosk --app=https://notmyphone.com/`.
2. Edit `/etc/lightdm/lightdm.conf` and add this line to prevent the screen from sleeping: `xserver-command=X -s 0 dpms`

Note that if you don't want to actually do the login via that tiny screen, you can instead get your auth token by
inspecting the cookie that's set when you log into notmyphone.com via the desktop. There will be a cookie set that
looks like `auth=o.SECRETWORDS`. You can copy that secret and put it in the querystring of your raspberry pi startup
script, like this:

```@chromium-browser --kiosk --app=https://notmyphone.com/?auth=o.SECRETWORDS```

This way your authentication can survive reboots. Notmyphone does not have a running server that maintains any
state about your connection.

## Developing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run deploy`

Deploy the built, static assets to github
