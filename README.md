### uFire BLE Interface

> Use Bluetooth Low Energy (BLE) to use any uFire device
* connect to any uFire device
* characteristics exposed to receive measurement changes and configuration
* implement isolation from probe interfaces through BLE

#### What it is
An ESP32-compatible library to expose all the measurement values and configuration registers through BLE characteristics.

#### Using it
 * get some ESP32s. Any development board should work. If you want isolation, be sure the board includes a battery supply of some sort.
 * this project uses software I2C and requires slightly modified library files to use the uFire interfaces. Determine the I2C pins you will use, and edit EC_Salinity.h, uFire_ISE.h, ISE_pH, ISE_ORP.h as follows.
 * search for the `Wire.begin` statements and replace the line with the I2C pins you are using. `Wire.begin(19, 23, 100000);` will use pin 19 as SDA, and 23 as SCL. Leave the 100000 as is.
 * program the ESP32 with the example program
 * goto https://ufire.co/uFire_BLE in the Chrome browser to see the device working.

You will see there are characteristics that expose all the measurments and configuration registers. If you look at the characteristics, you will see that some can be read, some written, and some have notify flags. Calibration is done by writing to the appropriate characteristic. See the source for details.

This project is left intentionally incomplete. There is a lot of room on the ESP32 for additional features and functionality. The website demo is minimal and used as an easy to implement, cross-platform way to show what is possible.

#### Compiling
This is a [PlatformIO](http://platformio.org/) project. Download and install it, import this repo, and it should download all the required tools for you.
