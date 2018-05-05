#include <Arduino.h>

// #include "uFire_EC_BLE.h"
#include "uFire_ISE_BLE-pH.h"

uFire_ISE_BLE_pH ec;

void setup() {
  Serial.begin(9600);
  pinMode(22, OUTPUT);

  ec.startBLE();
  Serial.println("started BLE");
}

void loop() {
  ec.measurepH();
  ec.measureTemp();
  Serial.println(ec.pH);
  Serial.println(ec.tempC);
  if (ec.connected())
  {
    digitalWrite(22, LOW);
  }
  else
  {
    digitalWrite(22, HIGH);
  }
}
