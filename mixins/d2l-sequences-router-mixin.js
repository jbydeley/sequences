import '@polymer/polymer/polymer-legacy.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module.js';
import { TemplateStamp } from '@polymer/polymer/lib/mixins/template-stamp.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
function RouterMixin(getEntityType) {
	return class extends TemplateStamp(
		mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior],	PolymerElement)
	) {
		static get properties() {
			return {
				href: {
					type: String,
					reflectToAttribute: true,
					notify: true
				},
				_contentType: {
					type: String
				},
				_contentElement: {
					type: Object
				},
				_debouncer: {
					type: Object
				},
				_hrefUpdated: {
					type: Function
				}
			};
		}

		static get observers() {
			return ['_render(entity)'];
		}

		connectedCallback() {
			super.connectedCallback();
			this._hrefUpdated = this.addEventListener('hrefUpdated', ({detail}) => {
				this.href = detail.href;
			});
		}

		disconnectedCallback() {
			super.disconnectedCallback();
			this.removeEventListener('hrefUpdated', this._hrefUpdated);
		}

		_render(entity) {
			getEntityType = getEntityType.bind(this);
			this._debouncer = Debouncer.debounce(
				this._debouncer,
				timeOut.after(20),
				() => {
					const entityType = getEntityType(entity);
					if (entity &&
						(!this._contentElement || this._contentElement.href !== this.href)
					) {
						const nodeTemplate = entityType.template.cloneNode(true);
						const contentElement = document.createElement(entityType.is);
						contentElement.appendChild(this._stampTemplate(nodeTemplate));

						if (this._contentElement) {
							this.shadowRoot.removeChild(this._contentElement);
						}

						this._contentElement = contentElement;
						this._contentType = entityType;

						this.shadowRoot.appendChild(this._contentElement);
						this._contentElement.href = this.href;
						this._contentElement.token = this.token;
					}
				}
			);
		}
	};
}

window.D2L = window.D2L || {};
window.D2L.Polymer = window.D2L.Polymer || {};
window.D2L.Polymer.Mixins = window.D2L.Polymer.Mixins || {};
window.D2L.Polymer.Mixins.Sequences = window.D2L.Polymer.Mixins.Sequences || {};
window.D2L.Polymer.Mixins.Sequences.RouterMixin = RouterMixin;
