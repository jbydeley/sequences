import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
/* eslint-disable */
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Sequences = window.D2L.PolymerBehaviors.Sequences || {};
/**
 * THIS FILE IS GENERATED. RUN `npm run locales` TO REGENERATE.
 * Localizes the sequences component.
 * @polymerBehavior D2L.PolymerBehaviors.Sequences.LocalizeBehavior
 */
D2L.PolymerBehaviors.Sequences.LocalizeBehaviorImpl = {
	properties: {
		/**
		 * Localization resources.
		 */
		resources: {
			value: function() {
				return {"ar":{},"de":{},"en":{"invalidFile":"This kind of file can't be opened in this viewer","downloadInvalidFile":"Download and view the file in another application instead.","fileSize":"File size: {size}","download":"Download","iterateToNext":"Next activity","iterateToPrevious":"Previous activity","iterateToParent":"Go to parent activity","undisplayableContent":"This content can't be displayed in this viewer","openUnsecureContent":"Your browser thinks this content is published in a less secure location. Don't worry, just open the content in a new window.","viewThisActivity":"View this Activity.","goToActivity":"Go to Activity","openNew":"Open in a new window","cannotBeRendered":"This content item cannot be rendered.","congratulations":"Congratulations!","activitiesFinishedGreatJob":"You have completed all of the activities in this unit. Great job!","imDone":"I'm Done","niceWork":"Nice work so far!","missedActivities":"You <d2l-link href=\"javascript:void(0)\">missed {count, plural, one {# activity} other {# activities}}</d2l-link>.","noNeedToFinish":"If you don't need to finish {count, plural, one {it} other {them}}, no problem.","showMissed":"Show Me What I Missed","youMissedThese":"You missed these activities:","openOnedriveFile":"Open OneDrive file in a new browser tab.","gotoOnedrive":"Go to OneDrive"},"es":{},"fr":{},"ja":{},"ko":{},"nb":{},"nl":{},"pt":{},"sv":{},"tr":{},"zh-TW":{},"zh":{}};
			}
		}
	}
};
/** @polymerBehavior D2L.PolymerBehaviors.Sequences.LocalizeBehavior */
D2L.PolymerBehaviors.Sequences.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.Sequences.LocalizeBehaviorImpl
];
