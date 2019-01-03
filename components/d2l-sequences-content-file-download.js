import '../mixins/d2l-sequences-automatic-completion-tracking-mixin.js';
import '@d2l/content-icons/d2l-content-icons.js';
import 'd2l-button/d2l-button.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
	@extends D2L.PolymerBehaviors.Sequences.LocalizeBehavior
*/
class D2LSequencesContentFileDownload extends D2L.Polymer.Mixins.Sequences.AutomaticCompletionTrackingMixin() {
  static get template() {
	return html`
		<style>
			.content-file-download-container {
				padding-top: 100px;
				text-align: center;
			}

			.content-file-download-container h3 {
				color: var(--d2l-color-celestine-plus-1);
			}

			.content-file-download-container > * {
				margin: 25px 0;
			}

			.content-file-download-container-file-icon {
				 width: 90px;
				 height: 120px;
				 margin: auto;
			 }

			.content-file-download-container button {
				border: none;
				background: transparent;
			}
		</style>
		<div class="content-file-download-container">
			<h3>
				[[localize('invalidFile')]]
			</h3>
			<p>
				[[localize('downloadInvalidFile')]]
			</p>
			<div class="content-file-download-container-file-icon">
				<d2l-content-icons icon="file"></d2l-content-icons>
			</div>
			<p>
				[[localize('fileSize','size',_fileSize)]]
			</p>
			<template is="dom-if" if="[[_fileLocation]]">
				<form method="get" action$="[[_fileLocation]]">
					<button type="submit">
						<d2l-button primary="">
							[[localize('download')]]
						</d2l-button>
					</button>
				</form>
			</template>
		</div>
`;
  }

  static get is() {
	  return 'd2l-sequences-content-file-download';
  }
  static get properties() {
	  return {
		  href: {
			  type: String,
			  reflectToAttribute: true,
			  notify: true,
			  observer: '_scrollToTop'
		  },
		  _fileLocation: {
			  type: String,
			  computed: '_getFileLocation(entity)',
			  observer: '_setRawFileSize'
		  },
		  _language: {
			  type: String
		  },
		  _rawFileSize: {
			  type: Number
		  },
		  _fileSize: {
			  type: String,
			  computed: '_getHumanFileSize(_rawFileSize)'
		  }
	  };
  }

  _scrollToTop() {
	  window.top.scrollTo(0, 0);
  }

  _getFileLocation(entity) {
	  try {
		  const fileActivity = entity.getSubEntityByClass('file-activity');
		  const file = fileActivity.getSubEntityByClass('file');
		  const link = file.getLinkByRel('alternate');
		  return link.href;
	  } catch (e) {
		  return '';
	  }
  }

  _getHumanFileSize(bytes) {
	  const thresh = 1000;
	  const units = ['B', 'kB', 'MB', 'GB', 'TB'];

	  let i;
	  for (i = 0; Math.abs(bytes) >= thresh && i < units.length - 1; i++) {
		  bytes /= thresh;
	  }

	  const size = parseFloat(bytes.toFixed(1)).toLocaleString(this._language);
	  return `${size} ${units[i]}`;
  }

  _setRawFileSize() {
	  if (!this._fileLocation) {
		  return;
	  }

	  fetch(this._fileLocation, {
		  method: 'HEAD',
		  headers: new Headers({
			  'Authorization': `Bearer ${this.token}`
		  })
	  }).then(({headers}) => {
		  const length = parseFloat(headers.get('content-length'));

		  this._rawFileSize = isNaN(length)
			  ? 0
			  : length;
	  }).catch(() => {
		  this._rawFileSize = 0;
	  });
  }
}
customElements.define(D2LSequencesContentFileDownload.is, D2LSequencesContentFileDownload);
