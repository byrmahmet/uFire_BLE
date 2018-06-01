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
  Serial.begin(9600);
  ufire_obj.startBLE();
}

void loop() {
  // pH
  ufire_obj.measurepH();
  Serial.print("pH: "); Serial.println(ufire_obj.pH);

  // mS
  // ufire_obj.measureEC();
  // Serial.print("mS: "); Serial.println(ufire_obj.mS);

  ufire_obj.measureTemp();
  Serial.print(" C: "); Serial.println(ufire_obj.tempC);
  Serial.println();
}
