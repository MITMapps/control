# MITMapps Control
github: https://github.com/MITMapps/control

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
- 1x Computer ... Mac, Windows, Linux, should all be able to get the job done as long as it has a USB.

which should end up being around 100 USD. All of this is general purpose so you can use it for other projects.
# Setting up the  Host
Once you have all the hardware it's time to set it up. We will need to perform the following:

### Install The Operating System
Let's get an operating system running on the raspberry pi.
##### Install Raspberry Pi Imager
from: https://www.raspberrypi.com/software/
##### Raspberry Pi Imager - CHOOSE OS
- Download [Raspberry Pi OS Lite 64 bit](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-64-bit)
> :warning: Make sure to download the 64 bit version
- Select the downloaded zip `2022-01-28-raspios-bullseye-arm64-lite.zip`
##### Raspberry Pi Imager - CHOOSE STORAGE
- Plug in the USB -> SD card reader
- Insert SD card into reader
- Select the SD card in CHOOSE STORAGE
##### Raspberry Pi Imager - WRITE
- Click the WRITE button.
- Read the prompt and make sure this is the correct storage device.
- Click the YES button for the prompt.
##### Modify Wifi Settings
- Open your terminal
- Navigate to the boot drive `cd /Volumes/boot`
- create an empty file called ssh in the root director of the drive `nano ssh`
- create a text file `nano wpa_supplicant.conf`
```bash
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
scan_ssid=1
ssid="your_wifi_ssid"     # MAKE SURE YOU KEEP THE QUOTES
psk="your_wifi_password"
}
```

- disconnect the sd card
- insert it into the pi (I have forgotten this)
- now when you boot it up it should show up on the wifi.
- use your router to find the pi's address.
- `ssh pi@192.168.IP.ADDRESS`


- set the password `passwd`
- find the STATIC_IP `hostname -I`
- find the ROUTER_IP `ip r | grep default`
- set a static IP `sudo nano /etc/dhcpd.conf`
```
interface wlan0
static ip_address=STATIC_IP/24
static routers=ROUTER_IP
static domain_name_servers=ROUTER_IP
```

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
