var device = 0;
let decoder = new TextDecoder('utf-8');
let encoder = new TextEncoder('utf-8');

var app = {
  service: 0,
  characteristic: 0,
  ko_value: ko.observable('-'),
  ko_description: ko.observable('-'),
  ko_temp: ko.observable('-'),
  ko_temp_unit: ko.observable('-'),
  ko_name: ko.observable(''),
  ko_bools: ko.observableArray(),
  ko_low_ref: ko.observable(''),
  ko_high_ref: ko.observable(''),
  connected: ko.observable(false),
  btn_click: async function() {
    let serviceUuid = '4805d2d0-af9f-42c1-b950-eae78304c408';
    let characteristicUuid = 'ca0331f9-e237-4f81-b9d4-6b2facabfceb';
    let tempUuid = 'aee115cf-26f0-4096-8914-686b32f123fd';
    let dpUuid = '374dc054-299c-44a6-8d6f-66e6dd412567';
    let tempComp = 'eb245c07-da24-45bd-9d88-5f6e3cc76a23';

    if (!device) {
      try {
        device = await navigator.bluetooth.requestDevice({
          filters: [{
            namePrefix: 'uFire'
          }],
          optionalServices: [serviceUuid]
        });
        app.ko_name(device.name);

        const server = await device.gatt.connect();
        app.connected(true);

        service = await server.getPrimaryService(serviceUuid);
        characteristic = await service.getCharacteristic(characteristicUuid);

        value = await characteristic.readValue().then(value => {
          app.ko_value(decoder.decode(value));
        });

        var descriptor = await characteristic.getDescriptor(0x2901);
        await descriptor.readValue().then(value => {
          app.ko_description(decoder.decode(value));
        });

        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', app.value_update);

        characteristic = await service.getCharacteristic(tempUuid);
        value = await characteristic.readValue().then(value => {
          app.ko_temp(decoder.decode(value));
        });

        descriptor = await characteristic.getDescriptor(0x2901);
        await descriptor.readValue().then(value => {
          app.ko_temp_unit(decoder.decode(value));
        });

        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', app.temp_update);

        var init_prop_bool = async function(service, uuid) {
          var property = {
            value: ko.observable(''),
            description: ko.observable('')
          };

          var characteristic = await service.getCharacteristic(uuid);
          var value = await characteristic.readValue().then(value => {
            property.value(decoder.decode(value) == '1');
          });

          var descriptor = await characteristic.getDescriptor(0x2901);
          await descriptor.readValue().then(value => {
            property.description(decoder.decode(value));
          });

          property.value.subscribe(function(value) {
            console.log("Property " + uuid + " changed: " + value);
            characteristic.writeValue(encoder.encode(value ? '1' : '0'));
          });

          return property;
        };

        await init_prop_bool(service, dpUuid).then(value => {
          app.ko_bools.push(value);
        });

        await init_prop_bool(service, tempComp).then(value => {
          app.ko_bools.push(value);
        });

      } catch (error) {
        console.log('Argh! ' + error);
      }
    } else {
      device.gatt.disconnect();
      device = 0;
      app.connected(false);
      app.ko_name('');
      app.ko_value('-');
      app.ko_description('-');
      app.ko_temp('-');
      app.ko_temp_unit('-');
      app.ko_bools([]);
    }
  },
  value_update: async function(event) {
    let value = event.target.value;
    app.ko_value(decoder.decode(value));
  },
  temp_update: async function(event) {
    let value = event.target.value;
    app.ko_temp(decoder.decode(value));
  },
  calibrateHighRef: async function() {
    let highRef = '1dadca6b-3ecc-41bd-a116-f77248975310';
    console.log("Calibrating high ref: " + app.ko_high_ref());
    var characteristic = await service.getCharacteristic(highRef);
    characteristic.writeValue(encoder.encode(app.ko_high_ref()));
  },
  calibrateLowRef: async function() {
    let lowRef = '1baa566e-4657-4080-a580-d236af1c6bd9';
    console.log("Calibrating low ref: " + app.ko_low_ref());
    var characteristic = await service.getCharacteristic(lowRef);
    characteristic.writeValue(encoder.encode(app.ko_low_ref())); <<
    << << < HEAD
  },
  config_alert: async function() {
    alert("Enter the low and high reference calibration solutions (eg. 4.0 for low pH, 7.0 for high pH). \nCalibrate one at a time, waiting for the readings to stabilize before clicking 'Calibrate'."); ===
    === = >>>
    >>> > 158 af31641e7287a03241297c954fe7fa939ee92
  }
};