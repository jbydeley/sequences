import 'd2l-loading-spinner/d2l-loading-spinner.js';
import '../mixins/d2l-sequences-automatic-completion-tracking-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

export class D2LSequencesContentLink extends D2L.Polymer.Mixins.Sequences.AutomaticCompletionTrackingMixin() {
	static get template() {
		return html`
		<style>
			iframe {
				width: 100%;
				height: calc(100% - 12px);
				overflow: hidden;
			}
			.hide {
				visibility: hidden;
			}
			d2l-loading-spinner {
				position: fixed;
				top: 33%;
				left: 50%;
				background-color: rgba(255, 255, 255, 0.4);
				z-index: 9999;
				--d2l-loading-spinner-size: 75px;
			}
		</style>
		<d2l-loading-spinner id="spinner"></d2l-loading-spinner>
		<iframe id="content" class="hide" frameborder="0" scrolling="auto" src$="[[_linkLocation]]"></iframe>
`;
	}

	static get is() {
		return 'd2l-sequences-content-link';
	}
	static get contentClass() {
		return 'link-activity';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true,
				observer: '_scrollToTop'
			},
			previousHref: {
				type: String
			},
			_linkLocation: {
				type: String,
				computed: '_getLinkLocation(entity)'
			}
		};
	}
	static get observers() {
		return ['_render(entity)'];
	}
	_scrollToTop() {
		window.top.scrollTo(0, 0);
	}

	_getLinkLocation(entity) {
		try {
			const linkActivity = entity.getSubEntityByClass(D2LSequencesContentLink.contentClass);
			// if embed link exists, use that link
			const embedLink = linkActivity.getLinkByClass('embed');
			if (embedLink !== undefined) {
				return embedLink.href;
			} else {
				const link = linkActivity.getLinkByRel('about');
				return link.href;
			}

		} catch (e) {
			return '';
		}
	}

	/* eslint no-unused-vars: 0 */
	_render(entity) {
		// iframe won't reload if the href doesn't change
		// so this prevents the spinner from covering it
		// forever
		if (this.href === this.previousHref) {
			return;
		}

		this.previousHref = this.href;

		const content = this.shadowRoot.getElementById('content');
		const spinner = this.shadowRoot.getElementById('spinner');

		// initially hide the content, show the spinner
		content.classList.add('hide');
		spinner.classList.remove('hide');

		content.onload = function() {
			content.classList.remove('hide');
			spinner.classList.add('hide');
		};
	}
}
customElements.define(D2LSequencesContentLink.is, D2LSequencesContentLink);
