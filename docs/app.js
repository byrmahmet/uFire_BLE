var device = 0;
ko_value = ko.observable(0);
let decoder = new TextDecoder('utf-8');

var app = {
  value: 0,
  characteristic: 0,
  ko_value: ko.observable('-'),
  ko_description: ko.observable('-'),
  ko_temp: ko.observable('-'),
  ko_temp_unit: ko.observable('-'),
  ko_name: ko.observable('click to connect / disconnect ->'),
  connected: ko.observable(false),
  initialize: async function() {

  },
  btn_click: async function() {
    let serviceUuid = '4805d2d0-af9f-42c1-b950-eae78304c408';
    let characteristicUuid = 'ca0331f9-e237-4f81-b9d4-6b2facabfceb';
    let tempUuid = 'aee115cf-26f0-4096-8914-686b32f123fd';

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

        const service = await server.getPrimaryService(serviceUuid);
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

      } catch (error) {
        console.log('Argh! ' + error);
      }
    } else {
      device.gatt.disconnect();
      device = 0;
      app.connected(false);
      app.ko_name('click to connect / disconnect ->');
      app.ko_value('-');
      app.ko_description('-');
      app.ko_temp('-');
      app.ko_temp_unit('-');
    }
  },
  value_update: async function(event) {
    let value = event.target.value;
    app.ko_value(decoder.decode(value));
  },
  temp_update: async function(event) {
    let value = event.target.value;
    app.ko_temp(decoder.decode(value));
  }
};