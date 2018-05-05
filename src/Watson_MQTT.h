// #include <SPI.h>
#include <WiFi.h>
#include <PubSubClient.h>

// -------- Customise these values -----------
const char *ssid     = "Skynet";
const char *password = "justin04";

#define ORG "d3d0bo"        // your organization or "quickstart"
#define DEVICE_TYPE "ESP32" // use this default for quickstart or customize to your registered device type
#define DEVICE_ID "esp32-1" // use this default for quickstart or customize to your registered device id
#define TOKEN "Justin04!"   // your device token or not used with "quickstart"
// -------- Customise the above values --------

char server[]     = ORG ".messaging.internetofthings.ibmcloud.com";
char topic[]      = "iot-2/evt/status/fmt/json";
char authMethod[] = "use-token-auth";
char token[]      = TOKEN;
char clientId[]   = "d:" ORG ":" DEVICE_TYPE ":" DEVICE_ID;

WiFiClient   wifiClient;
PubSubClient client(wifiClient);

bool WatsonMQTT_Publish(String data) {
  if (!client.connected()) {
    Serial.print("Reconnecting client to "); Serial.println(server);

    while (!client.connect(clientId, authMethod, token)) {
      Serial.println(client.state());
      delay(500);
    }

    Serial.println();
  }

  String payload = "{ \"d\" :";
  payload += data;
  payload += "}";

  Serial.print("Sending payload: "); Serial.println(payload);

  if (client.publish(topic, (char *)payload.c_str())) {
    Serial.println("Publish ok");
  } else {
    Serial.println("Publish failed");
  }
}

void WatsonMQTT_Init() {
  Serial.print("Connecting to "); Serial.print(ssid);
  if (strcmp(WiFi.SSID().c_str(), ssid) != 0) {
    WiFi.begin(ssid, password);
  }

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(""); Serial.print("WiFi connected, IP address: "); Serial.println(WiFi.localIP());
  client.setServer(server, 1883);
}

String WatsonMQTT_JSON(String key, String value) {
  return "\"" + key + "\":" + value;
}
