#include <Arduino.h>
#include "uFire_ISE_BLE-pH.h"

uFire_ISE_BLE_pH ph;

void setup() {
  Serial.begin(9600);
  pinMode(22, OUTPUT);

  ph.startBLE();
}

void loop() {
  ph.measurepH();
  ph.measureTemp();
  Serial.println(ph.pH);
  Serial.println(ph.tempC);
  if (ph.connected())
  {
    digitalWrite(22, LOW);
  }
  else
  {
    digitalWrite(22, HIGH);
  }
}
