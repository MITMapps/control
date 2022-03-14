# MITMapps Control
Man In The Middle Application Control. This runs as a docker stack of three services on a host.
The services are:
- MITMapps Control Backend: a gunicorn flask api which modifies a file directory of MITMapps. 
- MITMapps Control Frontend: a react app which allows the user to pull apps from [MITMapps Community](https://mitmapps.ca)
and send them to the Control Backend. 
- MITMproxy: [mitmproxy](https://mitmproxy.org) is a free and open source interactive HTTPS proxy (external to MITMapps) 

# Host Hardware
For development the recommended host is a raspberry PI 4 Model B 4 GB. As of present testing this system is using
7524MB of disk so it's advisable to have at **least** a 16 GB SSD card. If you are looking at purchasing the kit your 
grocery list is:
- 1x [Raspberry Pi 4 Model B 4 GB](https://www.sparkfun.com/products/15446?src=raspberrypi),
- 1x [15 Watt USB-C PSU](https://www.sparkfun.com/products/15448),
- 1x [64 GB microSD card](https://www.amazon.com/SAMSUNG-Adapter-microSDXC-MB-ME64KA-AM/dp/B09B1F9L52/ref=sr_1_5?keywords=micro+sd&qid=1647272215&sr=8-5),
- 1x [USB microSD card reader](https://www.amazon.com/SanDisk-MobileMate-microSD-Card-Reader/dp/B07G5JV2B5/ref=sr_1_3?keywords=micro+sd+reader+usb&qid=1647272249&sprefix=micro+sd+read%2Caps%2C127&sr=8-3),

which should end up being around 100 USD. All of this is general purpose so you can use it for other projects. 

# Setting up the  Host
Once you have all the hardware it's time to set it up. We will need to perform the following:

### Install The Operating System
Let's get an operating system running on the raspberry pi.
##### Install Raspberry Pi Imager
from: https://www.raspberrypi.com/software/
##### Raspberry Pi Imager - CHOOSE OS

##### Raspberry Pi Imager - CHOOSE STORAGE

##### Raspberry Pi Imager - WRITE

##### Modify Wifi Settings

- Load the operating system onto the SD card
- Modify the files to boot with WIFI
- Plug in the SD card
- Plug power into the Raspberry Pi
- SSH (connect) into the Raspberry Pi
- Run the setup script

# build 
```bash
git pull

cd backend 
docker build -t mitmapps/control-backend:latest .
docker push mitmapps/control-backend:latest
cd ..

cd frontend 
docker build -t mitmapps/control-frontend:latest .
docker push mitmapps/control-frontend:latest
cd ..

cd mitmproxy_mods
docker build -t mitmapps/mitmproxy:latest .
docker push mitmapps/mitmproxy:latest
cd..
```

# run
```bash
docker stack deploy -c control.yml control
docker service logs -f control_mitmproxy
```

# redeploy
```bash
docker stack rm control
docker stack deploy -c control.yml control
```
