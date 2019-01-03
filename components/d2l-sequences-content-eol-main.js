import 'd2l-button/d2l-button.js';
import 'd2l-link/d2l-link.js';
import './d2l-sequences-content-eol-missed.js';
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import '../localize-behavior.js';
import './d2l-end-of-lesson-image.js';
import '../mixins/d2l-sequences-return-mixin.js';
import 's-html/s-html.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
	@extends D2L.PolymerBehaviors.Sequences.LocalizeBehavior
*/
class D2LSequencesContentEoLMain extends D2L.Polymer.Mixins.Sequences.ReturnMixin([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Sequences.LocalizeBehavior
]) {
  static get template() {
	return html`
		<style>
			:host {
				color: var(--d2l-color-ferrite);
			}
			.content-eol-main-container {
				text-align: center;
				margin:  68px auto;
			}

			.content-eol-main-container > * {
				margin: 25px 0;
			}

			.missed-count-text {
				color: var(--d2l-color-celestine);
			}
		</style>
		<div class="content-eol-main-container">
			 <template is="dom-if" if="[[!hasMissed]]">
				<d2l-end-of-lesson-image completed=""></d2l-end-of-lesson-image>
				<h2>
					[[localize('congratulations')]]
				</h2>
				<p>
					[[localize('activitiesFinishedGreatJob')]]
				</p>
				<d2l-button primary="" on-click="_onClickBack">
					[[localize('imDone')]]
				</d2l-button>
			</template>
			 <template is="dom-if" if="[[hasMissed]]">
				<template is="dom-if" if="[[!showMissed]]">
					<d2l-end-of-lesson-image></d2l-end-of-lesson-image>
					<h2>
						[[localize('niceWork')]]
					</h2>
					<p>
						<s-html on-click="_setShowMissed" html="[[localize('missedActivities','count',missedCount)]]"></s-html>
						<br>
						[[localize('noNeedToFinish', 'count', missedCount)]]
					</p>
					<d2l-button on-click="_setShowMissed">
						[[localize('showMissed')]]
					</d2l-button>
					<d2l-button primary="" on-click="_onClickBack">
						[[localize('imDone')]]
					</d2l-button>
				</template>
				<template is="dom-if" if="[[showMissed]]">
					<d2l-sequences-content-eol-missed href="{{href}}" token="[[token]]">
					</d2l-sequences-content-eol-missed>
				</template>
			</template>	
		</div>
`;
  }

  static get is() {
	  return 'd2l-sequences-content-eol-main';
  }
  static get properties() {
	  return {
		  href: {
			  type: String,
			  reflectToAttribute: true,
			  notify: true,
			  observer: '_scrollToTop'
		  },
		  token: {
			  type: String
		  },
		  missedCount: {
			  type: Number,
			  computed: '_getMissedCount(entity)'
		  },
		  hasMissed: {
			  type: Boolean,
			  computed: '_getHasMissed(missedCount)'
		  },
		  showMissed: {
			  type: Boolean,
			  value: false
		  }
	  };
  }

  static get eolClass() {
	  return 'end-of-sequence';
  }

  static get observers() {
	  return ['_onActivitySelected(entity)'];
  }

  _scrollToTop() {
	  window.top.scrollTo(0, 0);
  }

  _onActivitySelected(entity) {
	  if (entity && entity.hasClass('sequenced-activity')) {
		  this.showMissed = false;
	  }
  }
  _getHasMissed(missedCount) {
	  return missedCount !== 0;
  }
  _getMissedCount(entity) {
	  if (!entity) return 0;
	  return entity.entities.length;
  }
  _setShowMissed() {
	  this.showMissed = true;
  }
}
customElements.define(D2LSequencesContentEoLMain.is, D2LSequencesContentEoLMain);
