#include <Arduino.h>

// Comment/uncomment the appropriate lines for which interface board and probe
// you are using. Only one BLE instance can be used at a time.

// for ISE Interface with pH probe
#include "uFire_ISE_BLE-pH.h"
uFire_ISE_BLE_pH ufire_obj;

// for EC_Salinity Interface
// #include "uFire_EC_BLE.h"
// uFire_EC_BLE ufire_obj;

void setup() {
  ufire_obj.startBLE();
}

void loop() {
  // pH
  ufire_obj.measurepH();

  // mS
  // ufire_obj.measureEC();

  ufire_obj.measureTemp();
}
