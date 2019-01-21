import 'd2l-button/d2l-button.js';
import '../mixins/d2l-sequences-completion-tracking-mixin.js';
import './d2l-sequences-content-link.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
	@extends D2L.PolymerBehaviors.Sequences.LocalizeBehavior
*/
export class D2LSequencesContentLinkMixed extends D2L.Polymer.Mixins.Sequences.CompletionTrackingMixin() {
	static get template() {
		return html`
		<style>
			.content-link-mixed-container {
				padding-top: 100px;
				text-align: center;
				width: 550px;
				margin: auto;
			}

			.content-link-mixed-container > * {
				margin: 25px 0;
			}

			.content-link-mixed-container h3 {
				color: var(--d2l-color-celestine-plus-1);
			}
		</style>
		<div class="content-link-mixed-container">
			<h3>
				[[localize('undisplayableContent')]]
			</h3>
			<p>
				[[localize('openUnsecureContent')]]
			</p>
			<d2l-button primary="" on-click="_onclick">
				[[localize('openNew')]]
			</d2l-button>
		</div>
`;
	}

	static get is() {
		return 'd2l-sequences-content-link-mixed';
	}

	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true,
				observer: '_scrollToTop'
			}
		};
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.finishCompletion();
	}

	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}

	_getLinkLocation(entity) {
		try {
			const linkActivity = entity.getSubEntityByClass(D2LSequencesContentLink.contentClass);
			const link = linkActivity.getLinkByRel('about');
			return link.href;
		} catch (e) {
			return '';
		}
	}
	_onclick() {
		const location = this._getLinkLocation(this.entity);
		if (!location) {
			return;
		}

		this.startCompletion();
		this.topicSetDashboardViewState();
		return window.open(location);
	}
}
customElements.define(D2LSequencesContentLinkMixed.is, D2LSequencesContentLinkMixed);
