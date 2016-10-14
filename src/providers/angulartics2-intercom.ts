import { Injectable } from '@angular/core';

import { Angulartics2 } from '../core/angulartics2';

declare var Intercom: any;

@Injectable()
export class Angulartics2Intercom {

	constructor(private angulartics2: Angulartics2) {
		if (typeof (Intercom) === 'undefined') {
			Intercom = {};
		}

		this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

		this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

		this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

		this.angulartics2.setSuperProperties.subscribe((x: any) => this.setSuperProperties(x));
	}

	pageTrack(path: string, location: any) {
		//no-Op
	}

	eventTrack(action: string, properties: any) {
		try {
			Intercom('trackEvent', action, properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setUserProperties(properties: any) {
		try {
			Intercom('update', properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setSuperProperties(properties: any) {
		try {
			Intercom('boot', properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	shutdown() {
		try {
			Intercom('shutdown');
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}
}
