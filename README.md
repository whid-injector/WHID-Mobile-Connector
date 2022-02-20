# ⚠ IMPORTANT ⚠
Playstore decided to remove it (Google is the person to blame). 
The sources are still available here and you can still find latest APK on https://apkpure.com/whid-mobile-connector/whid.usb.injector

# WHID Mobile connector

![Build Android app](https://github.com/whid-injector/WHID-Mobile-Connector/workflows/Build%20Android%20app/badge.svg)
WHID Mobile Connector is designed to be a user-friendly mobile app allowing you to easily control your WHID gadget(s). 
Please, refer to [WHID](https://github.com/whid-injector/WHID) if you want more information about HID attacks and/or the concept behind this "USB-key".

WHID Mobile Connector can be download on Nethunter store (Not updated yet, maybe soon) and on APKPURE wich is latest version https://apkpure.com/whid-mobile-connector/whid.usb.injector

# Technical overview

The WHID Mobile Connector is an ionic mobile app (aka Hybrid application) - (~ should work on any devices) So far, only Android builds are released.
Fresh builds can be retrieved here: [https://github.com/whid-injector/WHID](https://github.com/whid-injector/WHID/releases)
The UI is Angular-based and "native" functions are done using Cordova framework, seamlessly for the end-users.

# I want to build the environment

### 1. Set up your environment

Sure. Few steps to make the magic happen: 

- First, install node and npm (depends on your OS)

For Mac users, ```brew``` will make it: 
```bash
brew install node
```

- Then, install ```npm```:

```bash
brew install npm
```

Finally, install ```ionic```: 

```bash
npm install -g ionic
```
### 2. Clone the repo

- Clone the repo using Git: 

```bash
git clone https://github.com/whid-injector/WHID-Mobile-Connector/
```

- Go in the folder

```bash
cd WHID-Mobile-Connector
```

- Add Android platform to the project

```bash
ionic cordova platform add android
```

### 3. Build it

Then, you're ready to build a resulting APK that can be deployed wherever you want. 

```bash
ionic cordova build android
```

If everything goes well, APK should be at:
```bash
/path/to/my/folder/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

# Contributing

If you're still reading until here, you rock! *We're also eager to receive/get/integrate your contributions!* :)

Code has been released under GPLv3. If you want to contribute, feel free to: 
1. Fork/clone the repo
2. Apply your changes
3. Open a pull-request.

Other than that, we also accept filing issues but give as many details as you can (!), this helps us a lot for troubleshooting issues. 
