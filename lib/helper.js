/* jshint -W097 */
/* jshint -W117 */
/* jshint -W119 */
/* jshint -W083 */
/* jslint esversion: 6 */
'use strict';

function createDeviceEntry(adapter, parent, name) {
	let id = name;
	if(parent != null && parent !== '') {
		id = parent+'.'+name;
	}

	adapter.setObjectNotExists(id, {
		type: 'device',
		common: {
			name: name
		},
		native: {}
	});

    return id;
}

function createChannelEntry(adapter, parent, name) {
    const id = parent+'.'+name;
	adapter.setObjectNotExists(id, {
		type: 'channel',
		common: {
			name: name
		},
		native: {}
    });
    return id;
}

function createStateEntry(adapter, parent, newName, newType, newRole) {
	let id;
	if(parent != null && parent !== '')
		id = parent+'.'+newName;
	else 
		id = newName;

	adapter.setObjectNotExists(id, {
		type: 'state',
		common: {
			name: newName,
			type: newType,
			role: newRole
		},
		native: {}
    });
    return id;
}

/**
 * Creates all entries needed for the inverter_info.
 */
module.exports.createInverterEntries = (adapter, base) => {
    const device = createDeviceEntry(adapter, adapter.namespace, base.inverter);
    createStateEntry(adapter, device, 'has_alert', 'boolean', 'indicator');
    createStateEntry(adapter, device, 'hw_version', 'number', 'value');
    createStateEntry(adapter, device, 'sw_version_pri', 'number', 'value');
    createStateEntry(adapter, device, 'sw_version_sec', 'number', 'value');
    createStateEntry(adapter, device, 'max_power', 'number', 'value');
    createStateEntry(adapter, device, 'protocol_ver', 'number', 'value');
    createStateEntry(adapter, device, 'status', 'boolean', 'indicator');
    let channel = createChannelEntry(adapter, device, 'measurement');
    createStateEntry(adapter, channel, 'energy', 'number', 'value');
    createStateEntry(adapter, channel, 'power', 'number', 'value');
    channel = createChannelEntry(adapter, device, 'details');
    createStateEntry(adapter, channel, 'max_power_soft', 'number', 'value');
    createStateEntry(adapter, channel, 'cos_phi', 'number', 'value');
    createStateEntry(adapter, channel, 'power_status', 'boolean', 'indicator');
    createStateEntry(adapter, channel, 'grid_freq', 'number', 'value');
    createStateEntry(adapter, channel, 'dcdc_temp', 'number', 'value');
    createStateEntry(adapter, channel, 'dcac_temp', 'number', 'value');
    createStateEntry(adapter, channel, 'sec_dc_voltage', 'number', 'value');
    createStateEntry(adapter, channel, 'alarm', 'number', 'value');
	adapter.setStateChanged(base.inverter + '.has_alerts', {val: false, ack: true});
};


/**
 * handles settings.
 */
module.exports.handleSettings = (adapter, data) => {
	createStateEntry(adapter, adapter.namespace, 'has_alert', 'boolean', 'indicator');
    const device = createDeviceEntry(adapter, adapter.namespace, 'settings');
	createStateEntry(adapter, device, 'language', 'string', 'text');
	createStateEntry(adapter, device, 'harvest_measurements_interval', 'number', 'value');
	createStateEntry(adapter, device, 'harvest_status_interval', 'number', 'value');
	createStateEntry(adapter, device, 'plant_id', 'string', 'text');
	createStateEntry(adapter, device, 'username', 'string', 'text');
	createStateEntry(adapter, device, 'system_configured', 'boolean', 'indicator');
    let channel = createChannelEntry(adapter, device, 'export');
	createStateEntry(adapter, channel, 'type', 'string', 'text');
	createStateEntry(adapter, channel, 'interval', 'number', 'value');
	createStateEntry(adapter, channel, 'host', 'string', 'text');
	createStateEntry(adapter, channel, 'url', 'string', 'text');
	createStateEntry(adapter, channel, 'moidom_id', 'string', 'text');
	adapter.setStateChanged('has_alert', {val: false, ack: true});
	adapter.setStateChanged('settings.language', {val: data.language, ack: true});
	adapter.setStateChanged('settings.harvest_measurements_interval', {val: data.harvest_measurements_interval, ack: true});
	adapter.setStateChanged('settings.harvest_status_interval', {val: data.harvest_status_interval, ack: true});
	adapter.setStateChanged('settings.plant_id', {val: data.plant_id, ack: true});
	adapter.setStateChanged('settings.username', {val: data.username, ack: true});
	adapter.setStateChanged('settings.system_configured', {val: data.system_configured, ack: true});
	adapter.setStateChanged('settings.export.type', {val: data.export_type, ack: true});
	adapter.setStateChanged('settings.export.interval', {val: data.export_interval, ack: true});
	adapter.setStateChanged('settings.export.host', {val: data.export_host, ack: true});
	adapter.setStateChanged('settings.export.url', {val: data.export_url, ack: true});
	adapter.setStateChanged('settings.export.moidom_id', {val: data.export_moidom_id, ack: true});
};

/**
 * handles time_settings.
 */
module.exports.handleTimeSettings = (adapter, data) => {
	const device = createDeviceEntry(adapter, adapter.namespace, 'settings');
	createStateEntry(adapter, device, 'location', 'string', 'text');
	createStateEntry(adapter, device, 'timezone', 'string', 'text');
	adapter.setStateChanged('has_alert', {val: false, ack: true});
	adapter.setStateChanged('settings.location', {val: data.location, ack: true});
	adapter.setStateChanged('settings.timezone', {val: data.timezone, ack: true});
};

/**
 * handles network_settings.
 */
module.exports.handleNetworkSettings = (adapter, data) => {
    const device = createDeviceEntry(adapter, adapter.namespace, 'settings');
    let channel = createChannelEntry(adapter, device, 'network');
	createStateEntry(adapter, channel, 'lan_mode', 'string', 'text');
	createStateEntry(adapter, channel, 'lan_ip', 'string', 'text');
	createStateEntry(adapter, channel, 'lan_mask', 'string', 'text');
	createStateEntry(adapter, channel, 'lan_gateway', 'string', 'text');
	createStateEntry(adapter, channel, 'lan_dns', 'string', 'text');
	createStateEntry(adapter, channel, 'wlan_mode', 'string', 'text');
	createStateEntry(adapter, channel, 'wlan_auth', 'string', 'text');
	createStateEntry(adapter, channel, 'wlan_ssid', 'string', 'text');
	createStateEntry(adapter, channel, 'wlan_ip', 'string', 'text');
	createStateEntry(adapter, channel, 'wlan_mask', 'string', 'text');
	createStateEntry(adapter, channel, 'wlan_gateway', 'string', 'text');
	adapter.setStateChanged('settings.network.lan_mode', {val: data.lan_mode, ack: true});
	adapter.setStateChanged('settings.network.lan_ip', {val: data.lan_ip, ack: true});
	adapter.setStateChanged('settings.network.lan_mask', {val: data.lan_mask, ack: true});
	adapter.setStateChanged('settings.network.lan_gateway', {val: data.lan_gateway, ack: true});
	adapter.setStateChanged('settings.network.lan_dns', {val: data.lan_dns, ack: true});
	adapter.setStateChanged('settings.network.wlan_mode', {val: data.wlan_mode, ack: true});
	adapter.setStateChanged('settings.network.wlan_auth', {val: data.wlan_auth, ack: true});
	adapter.setStateChanged('settings.network.wlan_ssid', {val: data.wlan_ssid, ack: true});
	adapter.setStateChanged('settings.network.wlan_ip', {val: data.wlan_ip, ack: true});
	adapter.setStateChanged('settings.network.wlan_mask', {val: data.wlan_mask, ack: true});
	adapter.setStateChanged('settings.network.wlan_gateway', {val: data.wlan_gateway, ack: true});
};

/**
 * handles cloud_settings.
 */
module.exports.handleCloudSettings = (adapter, data) => {
    const device = createDeviceEntry(adapter, adapter.namespace, 'settings');
    let channel = createChannelEntry(adapter, device, 'cloud');
	createStateEntry(adapter, channel, 'url', 'string', 'text');
	createStateEntry(adapter, channel, 'username', 'string', 'text');
	createStateEntry(adapter, channel, 'password', 'string', 'text');
	adapter.setStateChanged('settings.cloud.url', {val: data.cloud_url, ack: true});
	adapter.setStateChanged('settings.cloud.username', {val: data.cloud_username, ack: true});
	adapter.setStateChanged('settings.cloud.password', {val: data.cloud_password, ack: true});
};

/**
 * create entries for system_info.
 */
module.exports.createSystemInfoEntries = (adapter) => {
    const device = createDeviceEntry(adapter, adapter.namespace, 'info');
    let channel = createChannelEntry(adapter, device, 'system');
	createStateEntry(adapter, channel, 'sw_version', 'string', 'text');
	createStateEntry(adapter, channel, 'sys_version', 'string', 'text');
	createStateEntry(adapter, channel, 'storage_status', 'string', 'text');
	createStateEntry(adapter, channel, 'storage_used', 'number', 'value');
	createStateEntry(adapter, channel, 'storage_size', 'number', 'value');
};

/**
 * create entries for plant_info.
 */
module.exports.createPlantInfoEntries = (adapter) => {
    const device = createDeviceEntry(adapter, adapter.namespace, 'info');
    let channel = createChannelEntry(adapter, device, 'plant');
	createStateEntry(adapter, channel, 'id', 'string', 'text');
	createStateEntry(adapter, channel, 'country', 'string', 'text');
	createStateEntry(adapter, channel, 'total_energy', 'number', 'value');
	createStateEntry(adapter, channel, 'today_energy', 'number', 'value');
	createStateEntry(adapter, channel, 'power', 'number', 'value');
	createStateEntry(adapter, channel, 'cos_phi', 'number', 'value');
	createStateEntry(adapter, channel, 'cos_phi_mode', 'number', 'value');
	createStateEntry(adapter, channel, 'max_power', 'number', 'value');
	createStateEntry(adapter, channel, 'status', 'string', 'text');
	createStateEntry(adapter, channel, 'price_per_kw', 'number', 'value');
};