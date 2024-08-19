(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

const diacriticsMap = require('./mappings/diacritics-map'),
	greeklishToGreekMap = require('./mappings/greeklish-to-greek-map'),
	greekTogreeklishMap = require('./mappings/greek-to-greeklish-map'),
	greekToPhoneticLatinMap = require('./mappings/greek-to-phonetic-latin-map'),
	greekToTransliteratedLatinMap = require('./mappings/greek-to-transliterated-latin-map'),
	stopWordsMap = require('./mappings/stopwords-map');

/**
 * A collection of utilities for the Greek language such as replacement of accented and other diacritics characters,
 * conversion from Greek to phonetic, transliterated or greeklish Latin and more.
 *
 */
const greekUtils = {
	/**
	 * Convert a Latin/greeklish characters text to its modern Greek equivalent.
	 *
	 * @method toGreek
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toGreek: function (text, ignore) {
		return replaceText(text, greeklishToGreekMap, true, ignore);
	},

	/**
	 * Convert a modern Greek characters text to its greeklish equivalent.
	 *
	 * @method toGreeklish
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toGreeklish: function (text, ignore) {
		return replaceText(text, greekTogreeklishMap, true, ignore);
	},

	/**
	 * Convert a modern Greek characters text to its phonetically equivalent Latin (sound mapping).
	 *
	 * @method toPhoneticLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toPhoneticLatin: function (text, ignore) {
		return replaceText(text, greekToPhoneticLatinMap, true, ignore);
	},

	/**
	 * Convert a modern Greek characters text to its transliterated equivalent Latin (letter mapping).
	 *
	 * @method toTransliteratedLatin
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	toTransliteratedLatin: function (text, ignore) {
		return replaceText(text, greekToTransliteratedLatinMap, true, ignore);
	},

	/**
	 * Convert a modern/ancient Greek characters text containing diacritics to its simple equivalent without diacritics.
	 *
	 * @method sanitizeDiacritics
	 * @static
	 * @param {String} text
	 * @param {String} ignore
	 * @returns {String}
	 */
	sanitizeDiacritics: function (text, ignore) {
		return replaceText(text, diacriticsMap, false, ignore);
	},

	/**
	 * Removes all Greek stop words from a text.
	 *
	 * @method removeStopWords
	 * @static
	 * @param {String} text
	 * @param {Boolean} removeMultipleWhiteSpaces If true will remove all multiple white space characters from the returned text.
	 * @returns {String}
	 */
	removeStopWords: function (text, removeMultipleWhiteSpaces = false) {
		const cleanText = replaceText(text, stopWordsMap, true, '', 'gi').trim();

		if (removeMultipleWhiteSpaces === true) {
			return cleanText.replace(/\s{2,}/g, ' ');
		}

		return cleanText;
	}
};

// Private Functions
/**
 *
 * @param {String} text
 * @param {Array} characterMap
 * @param {Boolean} exactMatch
 * @param {String} ignore
 * @param {String} regExOptions
 * @returns {String}
 */
function replaceText(text, characterMap, exactMatch, ignore, regExOptions = 'g') {
	let regexString,
		regex;

	exactMatch = exactMatch || false;

	if (typeof text === 'string' && text.length > 0) {
		characterMap.forEach(function (characters) {
			regexString = exactMatch ? characters.find : '[' + characters.find + ']';
			if (ignore) { regexString = '(?![' + ignore + '])' + regexString; }
			regex = new RegExp(regexString, regExOptions);
			text = text.replace(regex, characters.replace);
		});
	}

	return text;
}

module.exports = greekUtils;

},{"./mappings/diacritics-map":2,"./mappings/greek-to-greeklish-map":3,"./mappings/greek-to-phonetic-latin-map":4,"./mappings/greek-to-transliterated-latin-map":5,"./mappings/greeklish-to-greek-map":6,"./mappings/stopwords-map":7}],2:[function(require,module,exports){
'use strict';

const diacriticsMap = [
	{ find: 'άἀἁἂἃἄἅἆἇὰάᾀᾁᾂᾃᾄᾅᾆᾇᾰᾱᾲᾳᾴᾶᾷ', replace: 'α' },
	{ find: 'ΆἈἉἊἋἌἍἎἏᾈᾉᾊᾋᾌᾍᾎᾏᾸᾹᾺΆᾼ', replace: 'Α' },
	{ find: 'έἐἑἒἓἔἕὲέ', replace: 'ε' },
	{ find: 'ΈἘἙἚἛἜἝ', replace: 'Ε' },
	{ find: 'ήἠἡἢἣἤἥἦἧῆὴῇ', replace: 'η' },
	{ find: 'ΉἨἩἪἫἬἭἮἯ', replace: 'Η' },
	{ find: 'ίἰἱἲἳἴἵὶῖ', replace: 'ι' },
	{ find: 'ΊἶἷἸἹἺἻἼἽἾἿ', replace: 'Ι' },
	{ find: 'όὀὁὂὃὄὅὸ', replace: 'ο' },
	{ find: 'ΌὈὉὊὋὌὍ', replace: 'Ο' },
	{ find: 'ύὐὑὒὓὔὕὖὗ', replace: 'υ' },
	{ find: 'ΎὙὛὝὟ', replace: 'Υ' },
	{ find: 'ώὠὡὢὣὤὥὦὧῶ', replace: 'ω' },
	{ find: 'ΏὨὩὪὫὬὭὮὯ', replace: 'Ω' }
];

module.exports = diacriticsMap;

},{}],3:[function(require,module,exports){
'use strict';

const greekToGreeklishMap = [
	{ find: 'ΓΧ', replace: 'GX' },
	{ find: 'γχ', replace: 'gx' },
	{ find: 'ΤΘ', replace: 'T8' },
	{ find: 'τθ', replace: 't8' },
	{ find: '(θη|Θη)', replace: '8h' },
	{ find: 'ΘΗ', replace: '8H' },
	{ find: 'αυ', replace: 'au' },
	{ find: 'Αυ', replace: 'Au' },
	{ find: 'ΑΥ', replace: 'AY' },
	{ find: 'ευ', replace: 'eu' },
	{ find: 'εύ', replace: 'eu' },
	{ find: 'εϋ', replace: 'ey' },
	{ find: 'εΰ', replace: 'ey' },
	{ find: 'Ευ', replace: 'Eu' },
	{ find: 'Εύ', replace: 'Eu' },
	{ find: 'Εϋ', replace: 'Ey' },
	{ find: 'Εΰ', replace: 'Ey' },
	{ find: 'ΕΥ', replace: 'EY' },
	{ find: 'ου', replace: 'ou' },
	{ find: 'ού', replace: 'ou' },
	{ find: 'οϋ', replace: 'oy' },
	{ find: 'οΰ', replace: 'oy' },
	{ find: 'Ου', replace: 'Ou' },
	{ find: 'Ού', replace: 'Ou' },
	{ find: 'Οϋ', replace: 'Oy' },
	{ find: 'Οΰ', replace: 'Oy' },
	{ find: 'ΟΥ', replace: 'OY' },
	{ find: 'Α', replace: 'A' },
	{ find: 'α', replace: 'a' },
	{ find: 'ά', replace: 'a' },
	{ find: 'Ά', replace: 'A' },
	{ find: 'Β', replace: 'B' },
	{ find: 'β', replace: 'b' },
	{ find: 'Γ', replace: 'G' },
	{ find: 'γ', replace: 'g' },
	{ find: 'Δ', replace: 'D' },
	{ find: 'δ', replace: 'd' },
	{ find: 'Ε', replace: 'E' },
	{ find: 'ε', replace: 'e' },
	{ find: 'έ', replace: 'e' },
	{ find: 'Έ', replace: 'E' },
	{ find: 'Ζ', replace: 'Z' },
	{ find: 'ζ', replace: 'z' },
	{ find: 'Η', replace: 'H' },
	{ find: 'η', replace: 'h' },
	{ find: 'ή', replace: 'h' },
	{ find: 'Ή', replace: 'H' },
	{ find: 'Θ', replace: 'TH' },
	{ find: 'θ', replace: 'th' },
	{ find: 'Ι', replace: 'I' },
	{ find: 'Ϊ', replace: 'I' },
	{ find: 'ι', replace: 'i' },
	{ find: 'ί', replace: 'i' },
	{ find: 'ΐ', replace: 'i' },
	{ find: 'ϊ', replace: 'i' },
	{ find: 'Ί', replace: 'I' },
	{ find: 'Κ', replace: 'K' },
	{ find: 'κ', replace: 'k' },
	{ find: 'Λ', replace: 'L' },
	{ find: 'λ', replace: 'l' },
	{ find: 'Μ', replace: 'M' },
	{ find: 'μ', replace: 'm' },
	{ find: 'Ν', replace: 'N' },
	{ find: 'ν', replace: 'n' },
	{ find: 'Ξ', replace: 'KS' },
	{ find: 'ξ', replace: 'ks' },
	{ find: 'Ο', replace: 'O' },
	{ find: 'ο', replace: 'o' },
	{ find: 'Ό', replace: 'O' },
	{ find: 'ό', replace: 'o' },
	{ find: 'Π', replace: 'P' },
	{ find: 'π', replace: 'p' },
	{ find: 'Ρ', replace: 'R' },
	{ find: 'ρ', replace: 'r' },
	{ find: 'Σ', replace: 'S' },
	{ find: 'σ', replace: 's' },
	{ find: 'Τ', replace: 'T' },
	{ find: 'τ', replace: 't' },
	{ find: 'Υ', replace: 'Y' },
	{ find: 'Ύ', replace: 'Y' },
	{ find: 'Ϋ', replace: 'Y' },
	{ find: 'ΰ', replace: 'y' },
	{ find: 'ύ', replace: 'y' },
	{ find: 'ϋ', replace: 'y' },
	{ find: 'υ', replace: 'y' },
	{ find: 'Φ', replace: 'F' },
	{ find: 'φ', replace: 'f' },
	{ find: 'Χ', replace: 'X' },
	{ find: 'χ', replace: 'x' },
	{ find: 'Ψ', replace: 'Ps' },
	{ find: 'ψ', replace: 'ps' },
	{ find: 'Ω', replace: 'w' },
	{ find: 'ω', replace: 'w' },
	{ find: 'Ώ', replace: 'w' },
	{ find: 'ώ', replace: 'w' },
	{ find: 'ς', replace: 's' },
	{ find: ';', replace: '?' }
];

module.exports = greekToGreeklishMap;

},{}],4:[function(require,module,exports){
'use strict';

const greekVowels = 'αεηιουω',
	greekConsonants = 'βγδζθκλμνξπρςστφχψ',
	greekToPhoneticLatinMap = [
		{ find: 'ηυ', replace: 'if' },
		{ find: '(αυ)(?=[' + greekConsonants + '])', replace: 'af' },
		{ find: '(αυ)(?=[' + greekVowels + '])', replace: 'av' },
		{ find: '(ευ)(?=[' + greekConsonants + '])', replace: 'ef' },
		{ find: '(ευ)(?=[' + greekVowels + '])', replace: 'ev' },
		{ find: 'ου', replace: 'ou' },

		{ find: '(Αυ)(?=[' + greekConsonants + '])', replace: 'Af' },
		{ find: '(Αυ)(?=[' + greekVowels + '])', replace: 'Av' },
		{ find: '(Ευ)(?=[' + greekConsonants + '])', replace: 'Ef' },
		{ find: '(Ευ)(?=[' + greekVowels + '])', replace: 'Ev' },
		{ find: 'Ηυ', replace: 'If' },
		{ find: 'Ου', replace: 'Ou' },

		{ find: 'ηύ', replace: 'íf' },
		{ find: '(αύ)(?=[' + greekConsonants + '])', replace: 'áf' },
		{ find: '(αύ)(?=[' + greekVowels + '])', replace: 'áv' },
		{ find: '(εύ)(?=[' + greekConsonants + '])', replace: 'éf' },
		{ find: '(εύ)(?=[' + greekVowels + '])', replace: 'éf' },
		{ find: 'ού', replace: 'oú' },

		{ find: '(Αύ)(?=[' + greekConsonants + '])', replace: 'Áf' },
		{ find: '(Αύ)(?=[' + greekVowels + '])', replace: 'Áv' },
		{ find: '(Εύ)(?=[' + greekConsonants + '])', replace: 'Éf' },
		{ find: '(Εύ)(?=[' + greekVowels + '])', replace: 'Év' },
		{ find: 'Ηύ', replace: 'Íf' },
		{ find: 'Ού', replace: 'Oú' },

		{ find: 'αι', replace: 'e' },
		{ find: 'ει', replace: 'i' },
		{ find: 'οι', replace: 'i' },

		{ find: 'αί', replace: 'é' },
		{ find: 'εί', replace: 'í' },
		{ find: 'οί', replace: 'í' },

		{ find: 'Αι|ΑΙ', replace: 'E' },
		{ find: 'Ει|ΕΙ', replace: 'I' },
		{ find: 'Οι|ΟΙ', replace: 'I' },

		{ find: 'Αί', replace: 'É' },
		{ find: 'Εί', replace: 'Í' },
		{ find: 'Οί', replace: 'Í' },

		{ find: 'γε', replace: 'ye' },
		{ find: 'γι', replace: 'yi' },
		{ find: 'γυ', replace: 'yi' },

		{ find: 'Γε', replace: 'Ye' },
		{ find: 'Γι', replace: 'Yi' },
		{ find: 'Γυ', replace: 'Yi' },

		{ find: 'μπ', replace: 'b' },
		{ find: 'ντ', replace: 'd' },
		{ find: 'γκ', replace: 'g' },

		{ find: 'Μπ|ΜΠ', replace: 'B' },
		{ find: 'Ντ|ΝΤ', replace: 'D' },
		{ find: 'Γκ|ΓΚ', replace: 'G' },

		{ find: 'α', replace: 'a' },
		{ find: 'β', replace: 'v' },
		{ find: 'γ', replace: 'g' },
		{ find: 'δ', replace: 'd' },
		{ find: 'ε', replace: 'e' },
		{ find: 'ζ', replace: 'z' },
		{ find: 'η', replace: 'i' },
		{ find: 'θ', replace: 'th' },
		{ find: 'ι', replace: 'i' },
		{ find: 'κ', replace: 'k' },
		{ find: 'λ', replace: 'l' },
		{ find: 'μ', replace: 'm' },
		{ find: 'ν', replace: 'n' },
		{ find: 'ξ', replace: 'x' },
		{ find: 'ο', replace: 'o' },
		{ find: 'π', replace: 'p' },
		{ find: 'ρ', replace: 'r' },
		{ find: 'ς', replace: 's' },
		{ find: 'σ', replace: 's' },
		{ find: 'τ', replace: 't' },
		{ find: 'υ', replace: 'i' },
		{ find: 'φ', replace: 'ph' },
		{ find: 'χ', replace: 'kh' },
		{ find: 'ψ', replace: 'ps' },
		{ find: 'ω', replace: 'o' },

		{ find: 'ά', replace: 'á' },
		{ find: 'έ', replace: 'é' },
		{ find: 'ή', replace: 'í' },
		{ find: 'ί', replace: 'í' },
		{ find: 'ό', replace: 'ó' },
		{ find: 'ύ', replace: 'í' },
		{ find: 'ώ', replace: 'ó' },
		{ find: 'ΰ', replace: 'ï' },
		{ find: 'ΐ', replace: 'ï' },
		{ find: 'ϊ', replace: 'ï' },
		{ find: 'ϋ', replace: 'ï' },

		{ find: 'Α', replace: 'A' },
		{ find: 'Β', replace: 'V' },
		{ find: 'Γ', replace: 'G' },
		{ find: 'Δ', replace: 'D' },
		{ find: 'Ε', replace: 'E' },
		{ find: 'Ζ', replace: 'Z' },
		{ find: 'Η', replace: 'I' },
		{ find: 'Θ', replace: 'Th' },
		{ find: 'Ι', replace: 'I' },
		{ find: 'Κ', replace: 'K' },
		{ find: 'Λ', replace: 'L' },
		{ find: 'Μ', replace: 'M' },
		{ find: 'Ν', replace: 'N' },
		{ find: 'Ξ', replace: 'X' },
		{ find: 'Ο', replace: 'O' },
		{ find: 'Π', replace: 'P' },
		{ find: 'Ρ', replace: 'R' },
		{ find: 'Σ', replace: 'S' },
		{ find: 'Τ', replace: 'T' },
		{ find: 'Υ', replace: 'I' },
		{ find: 'Φ', replace: 'Ph' },
		{ find: 'Χ', replace: 'Kh' },
		{ find: 'Ψ', replace: 'Ps' },
		{ find: 'Ω', replace: 'O' },

		{ find: 'Ά', replace: 'Á' },
		{ find: 'Έ', replace: 'É' },
		{ find: 'Ή', replace: 'Í' },
		{ find: 'Ί', replace: 'Í' },
		{ find: 'Ό', replace: 'Ó' },
		{ find: 'Ύ', replace: 'Í' },
		{ find: 'Ώ', replace: 'Ó' },
		{ find: 'ΰ', replace: 'Ï' },
		{ find: 'ΐ', replace: 'Ï' },
		{ find: 'Ϊ', replace: 'Ï' },
		{ find: 'Ϋ', replace: 'Ï' }
	];

module.exports = greekToPhoneticLatinMap;

},{}],5:[function(require,module,exports){
'use strict';

const greekToTransliteratedLatinMap = [
	{ find: 'α', replace: 'a' },
	{ find: 'β', replace: 'v' },
	{ find: 'γ', replace: 'g' },
	{ find: 'δ', replace: 'd' },
	{ find: 'ε', replace: 'e' },
	{ find: 'ζ', replace: 'z' },
	{ find: 'η', replace: 'ē' },
	{ find: 'θ', replace: 'th' },
	{ find: 'ι', replace: 'i' },
	{ find: 'κ', replace: 'k' },
	{ find: 'λ', replace: 'l' },
	{ find: 'μ', replace: 'm' },
	{ find: 'ν', replace: 'n' },
	{ find: 'ξ', replace: 'x' },
	{ find: 'ο', replace: 'o' },
	{ find: 'π', replace: 'p' },
	{ find: 'ρ', replace: 'r' },
	{ find: 'σ', replace: 's' },
	{ find: 'ς', replace: 's' },
	{ find: 'τ', replace: 't' },
	{ find: 'υ', replace: 'u' },
	{ find: 'φ', replace: 'ph' },
	{ find: 'χ', replace: 'kh' },
	{ find: 'ψ', replace: 'ps' },
	{ find: 'ω', replace: 'ō' },

	{ find: 'ά', replace: 'á' },
	{ find: 'έ', replace: 'é' },
	{ find: 'ί', replace: 'í' },
	{ find: 'ό', replace: 'ó' },
	{ find: 'ύ', replace: 'ú' },
	{ find: 'ή', replace: 'ḗ' },
	{ find: 'ώ', replace: 'ṓ' },
	{ find: 'ϊ', replace: 'ï' },
	{ find: 'ϋ', replace: 'ü' },
	{ find: 'ΰ', replace: 'ǘ' },
	{ find: 'ΐ', replace: 'ḯ' },

	{ find: 'Α', replace: 'A' },
	{ find: 'Β', replace: 'V' },
	{ find: 'Γ', replace: 'G' },
	{ find: 'Δ', replace: 'D' },
	{ find: 'Ε', replace: 'E' },
	{ find: 'Ζ', replace: 'Z' },
	{ find: 'Η', replace: 'Ē' },
	{ find: 'Θ', replace: 'Th' },
	{ find: 'Ι', replace: 'I' },
	{ find: 'Κ', replace: 'K' },
	{ find: 'Λ', replace: 'L' },
	{ find: 'Μ', replace: 'M' },
	{ find: 'Ν', replace: 'N' },
	{ find: 'Ξ', replace: 'X' },
	{ find: 'Ο', replace: 'O' },
	{ find: 'Π', replace: 'P' },
	{ find: 'Ρ', replace: 'R' },
	{ find: 'Σ', replace: 'S' },
	{ find: 'Τ', replace: 'T' },
	{ find: 'Υ', replace: 'U' },
	{ find: 'Φ', replace: 'Ph' },
	{ find: 'Χ', replace: 'Kh' },
	{ find: 'Ψ', replace: 'Ps' },
	{ find: 'Ω', replace: 'Ō' },

	{ find: 'Ά', replace: 'Á' },
	{ find: 'Έ', replace: 'É' },
	{ find: 'Ί', replace: 'Í' },
	{ find: 'Ό', replace: 'Ó' },
	{ find: 'Ύ', replace: 'Ú' },
	{ find: 'Ή', replace: 'Ḗ' },
	{ find: 'Ώ', replace: 'Ṓ' },
	{ find: 'Ϊ', replace: 'Ï' },
	{ find: 'Ϋ', replace: 'Ü' },

	{ find: ';', replace: '?' }
];

module.exports = greekToTransliteratedLatinMap;

},{}],6:[function(require,module,exports){
'use strict';

const greeklishToGreekMap = [
	{ find: 'tha', replace: 'θα' },
	{ find: 'the', replace: 'θε' },
	{ find: 'thi', replace: 'θι' },
	{ find: 'thh', replace: 'θη' },
	{ find: 'tho', replace: 'θο' },
	{ find: '(thy|thu)', replace: 'θυ' },
	{ find: '(thw|thv)', replace: 'θω' },
	{ find: 'tH', replace: 'τΗ' },
	{ find: 'TH', replace: 'ΤΗ' },
	{ find: 'Th', replace: 'Τη' },
	{ find: 'th', replace: 'τη' },
	{ find: '(cH|ch)', replace: 'χ' },
	{ find: '(CH|Ch)', replace: 'Χ' },
	{ find: '(PS|Ps)', replace: 'Ψ' },
	{ find: '(ps|pS)', replace: 'ψ' },
	{ find: '(Ks|KS)', replace: 'Ξ' },
	{ find: '(ks|kS)', replace: 'ξ' },
	{ find: '(VR)', replace: 'ΒΡ' },
	{ find: '(vr|vR)', replace: 'βρ' },
	{ find: '(Vr)', replace: 'Βρ' },
	{ find: '8a', replace: 'θα' },
	{ find: '8e', replace: 'θε' },
	{ find: '8h', replace: 'θη' },
	{ find: '8i', replace: 'θι' },
	{ find: '8o', replace: 'θο' },
	{ find: '8y', replace: 'θυ' },
	{ find: '8u', replace: 'θυ' },
	{ find: '(8v|8w)', replace: 'θω' },
	{ find: '8A', replace: 'ΘΑ' },
	{ find: '8E', replace: 'ΘΕ' },
	{ find: '8H', replace: 'ΘΗ' },
	{ find: '8I', replace: 'ΘΙ' },
	{ find: '8O', replace: 'ΘΟ' },
	{ find: '(8Y|8U)', replace: 'ΘΥ' },
	{ find: '8V', replace: 'ΘΩ' },
	{ find: '8W', replace: 'ΘΩ' },
	{ find: '9a', replace: 'θα' },
	{ find: '9e', replace: 'θε' },
	{ find: '9h', replace: 'θη' },
	{ find: '9i', replace: 'θι' },
	{ find: '9o', replace: 'θο' },
	{ find: '9y', replace: 'θυ' },
	{ find: '9u', replace: 'θυ' },
	{ find: '(9v|9w)', replace: 'θω' },
	{ find: '9A', replace: 'ΘΑ' },
	{ find: '9E', replace: 'ΘΕ' },
	{ find: '9H', replace: 'ΘΗ' },
	{ find: '9I', replace: 'ΘΙ' },
	{ find: '9O', replace: 'ΘΟ' },
	{ find: '(9Y|9U)', replace: 'ΘΥ' },
	{ find: '9V', replace: 'ΘΩ' },
	{ find: '9W', replace: 'ΘΩ' },
	{ find: 's[\\n]', replace: 'ς\n' },
	{ find: 's[\\!]', replace: 'ς!' },
	{ find: 's[\\.]', replace: 'ς.' },
	{ find: 's[\\ ]', replace: 'ς ' },
	{ find: 's[\\,]', replace: 'ς,' },
	{ find: 's[\\+]', replace: 'ς+' },
	{ find: 's[\\-]', replace: 'ς-' },
	{ find: 's[\\(]', replace: 'ς(' },
	{ find: 's[\\)]', replace: 'ς)' },
	{ find: 's[\\[]', replace: 'ς[' },
	{ find: 's[\\]]', replace: 'ς]' },
	{ find: 's[\\{]', replace: 'ς{' },
	{ find: 's[\\}]', replace: 'ς}' },
	{ find: 's[\\<]', replace: 'ς<' },
	{ find: 's[\\>]', replace: 'ς>' },
	{ find: 's[\\?]', replace: 'ς;' },
	{ find: 's[\\/]', replace: 'ς/' },
	{ find: 's[\\:]', replace: 'ς:' },
	{ find: 's[\\;]', replace: 'ς;' },
	{ find: 's[\\"]', replace: 'ς"' },
	{ find: 's[\\\']', replace: 'ς\'' },
	{ find: 's[\\f]', replace: 'ς\f' },
	{ find: 's[\\r]', replace: 'ς\r' },
	{ find: 's[\\t]', replace: 'ς\t' },
	{ find: 's[\\v]', replace: 'ς\v' },
	{ find: 'rx', replace: 'ρχ' },
	{ find: 'sx', replace: 'σχ' },
	{ find: 'Sx', replace: 'Σχ' },
	{ find: 'SX', replace: 'ΣΧ' },
	{ find: 'ux', replace: 'υχ' },
	{ find: 'Ux', replace: 'Υχ' },
	{ find: 'UX', replace: 'ΥΧ' },
	{ find: 'yx', replace: 'υχ' },
	{ find: 'Yx', replace: 'Υχ' },
	{ find: 'YX', replace: 'ΥΧ' },
	{ find: '3a', replace: 'ξα' },
	{ find: '3e', replace: 'ξε' },
	{ find: '3h', replace: 'ξη' },
	{ find: '3i', replace: 'ξι' },
	{ find: '3ο', replace: 'ξο' },
	{ find: '3u', replace: 'ξυ' },
	{ find: '3y', replace: 'ξυ' },
	{ find: '3v', replace: 'ξω' },
	{ find: '3w', replace: 'ξω' },
	{ find: 'a3', replace: 'αξ' },
	{ find: 'e3', replace: 'εξ' },
	{ find: 'h3', replace: 'ηξ' },
	{ find: 'i3', replace: 'ιξ' },
	{ find: 'ο3', replace: 'οξ' },
	{ find: 'u3', replace: 'υξ' },
	{ find: 'y3', replace: 'υξ' },
	{ find: 'v3', replace: 'ωξ' },
	{ find: 'w3', replace: 'ωξ' },
	{ find: '3A', replace: 'ξΑ' },
	{ find: '3E', replace: 'ξΕ' },
	{ find: '3H', replace: 'ξΗ' },
	{ find: '3I', replace: 'ξΙ' },
	{ find: '3O', replace: 'ξΟ' },
	{ find: '3U', replace: 'ξΥ' },
	{ find: '3Y', replace: 'ξΥ' },
	{ find: '3V', replace: 'ξΩ' },
	{ find: '3W', replace: 'ξΩ' },
	{ find: 'A3', replace: 'Αξ' },
	{ find: 'E3', replace: 'Εξ' },
	{ find: 'H3', replace: 'Ηξ' },
	{ find: 'I3', replace: 'Ιξ' },
	{ find: 'O3', replace: 'Οξ' },
	{ find: 'U3', replace: 'Υξ' },
	{ find: 'Y3', replace: 'Υξ' },
	{ find: 'V3', replace: 'Ωξ' },
	{ find: 'W3', replace: 'Ωξ' },
	{ find: 'A', replace: 'Α' },
	{ find: 'a', replace: 'α' },
	{ find: 'B', replace: 'Β' },
	{ find: 'b', replace: 'β' },
	{ find: 'V', replace: 'Β' },
	{ find: 'v', replace: 'β' },
	{ find: 'c', replace: 'ψ' },
	{ find: 'C', replace: 'Ψ' },
	{ find: 'G', replace: 'Γ' },
	{ find: 'g', replace: 'γ' },
	{ find: 'D', replace: 'Δ' },
	{ find: 'd', replace: 'δ' },
	{ find: 'E', replace: 'Ε' },
	{ find: 'e', replace: 'ε' },
	{ find: 'Z', replace: 'Ζ' },
	{ find: 'z', replace: 'ζ' },
	{ find: 'H', replace: 'Η' },
	{ find: 'h', replace: 'η' },
	{ find: 'U', replace: 'Θ' },
	{ find: 'u', replace: 'υ' },
	{ find: 'I', replace: 'Ι' },
	{ find: 'i', replace: 'ι' },
	{ find: 'j', replace: 'ξ' },
	{ find: 'J', replace: 'Ξ' },
	{ find: 'K', replace: 'Κ' },
	{ find: 'k', replace: 'κ' },
	{ find: 'L', replace: 'Λ' },
	{ find: 'l', replace: 'λ' },
	{ find: 'M', replace: 'Μ' },
	{ find: 'm', replace: 'μ' },
	{ find: 'N', replace: 'Ν' },
	{ find: 'n', replace: 'ν' },
	{ find: 'X', replace: 'Χ' },
	{ find: 'x', replace: 'χ' },
	{ find: 'O', replace: 'Ο' },
	{ find: 'o', replace: 'ο' },
	{ find: 'P', replace: 'Π' },
	{ find: 'p', replace: 'π' },
	{ find: 'R', replace: 'Ρ' },
	{ find: 'r', replace: 'ρ' },
	{ find: 'S', replace: 'Σ' },
	{ find: 's', replace: 'σ' },
	{ find: 'T', replace: 'Τ' },
	{ find: 't', replace: 'τ' },
	{ find: 'Y', replace: 'Υ' },
	{ find: 'y', replace: 'υ' },
	{ find: 'F', replace: 'Φ' },
	{ find: 'f', replace: 'φ' },
	{ find: 'W', replace: 'Ω' },
	{ find: 'w', replace: 'ω' },
	{ find: '\\?', replace: ';' }
];

module.exports = greeklishToGreekMap;

},{}],7:[function(require,module,exports){
'use strict';

const stopwords = ['αλλ(α|ά)',
	'αν',
	'αντ(ι|ί)',
	'απ(ο|ό)',
	'αυτ(α|ά)',
	'αυτ(ε|έ)ς',
	'αυτ(η|ή)',
	'αυτ(ο|ό)',
	'αυτο(ι|ί)',
	'αυτ(ο|ό)ς',
	'αυτο(υ|ύ)ς',
	'αυτ(ω|ώ)ν',
	'αἱ',
	'αἳ',
	'αἵ',
	'αὐτός',
	'αὐτὸς',
	'αὖ',
	'γάρ',
	'γα',
	'γα^',
	'γε',
	'για',
	'γοῦν',
	'γὰρ',
	'"δ"',
	'δέ',
	'δή',
	'δαί',
	'δαίς',
	'δαὶ',
	'δαὶς',
	'δε',
	'δεν',
	'"δι"',
	'διά',
	'διὰ',
	'δὲ',
	'δὴ',
	'δ’',
	'ε(α|ά)ν',
	'ε(ι|ί)μαι',
	'ε(ι|ί)μαστε',
	'ε(ι|ί)ναι',
	'ε(ι|ί)σαι',
	'ε(ι|ί)στε',
	'εκε(ι|ί)να',
	'εκε(ι|ί)νες',
	'εκε(ι|ί)νη',
	'εκε(ι|ί)νο',
	'εκε(ι|ί)νοι',
	'εκε(ι|ί)νος',
	'εκε(ι|ί)νους',
	'εκε(ι|ί)νων',
	'εν(ω|ώ)',
	'επ',
	'επ(ι|ί)',
	'εἰ',
	'εἰμί',
	'εἰμὶ',
	'εἰς',
	'εἰς',
	'εἴ',
	'εἴμι',
	'εἴτε',
	'η',
	'θα',
	'(ι|ί)σως',
	'κ',
	'καί',
	'καίτοι',
	'καθ',
	'και',
	'κατ',
	'κατά',
	'κατα',
	'κατὰ',
	'καὶ',
	'κι',
	'κἀν',
	'κἂν',
	'μέν',
	'μή',
	'μήτε',
	'μα',
	'με',
	'μεθ',
	'μετ',
	'μετά',
	'μετα',
	'μετὰ',
	'μη',
	'μην',
	'μἐν',
	'μὲν',
	'μὴ',
	'μὴν',
	'να',
	'ο',
	'οι',
	'(ο|ό)μως',
	'(ο|ό)πως',
	'(ο|ό)σο',
	'(ο|ό)τι',
	'οἱ',
	'οἳ',
	'οἷς',
	'οὐ',
	'οὐδ',
	'οὐδέ',
	'οὐδείς',
	'οὐδεὶς',
	'οὐδὲ',
	'οὐδὲν',
	'οὐκ',
	'οὐχ',
	'οὐχὶ',
	'οὓς',
	'οὔτε',
	'οὕτω',
	'οὕτως',
	'οὕτως',
	'οὖν',
	'οὗ',
	'οὗτος',
	'οὗτος',
	'παρ',
	'παρά',
	'παρα',
	'παρὰ',
	'περί',
	'περὶ',
	'ποι(α|ά)',
	'ποι(ε|έ)ς',
	'ποι(ο|ό)',
	'ποιο(ι|ί)',
	'ποι(ο|ό)ς',
	'ποιο(υ|ύ)ς',
	'ποι(ω|ώ)ν',
	'π(ο|ό)τε',
	'που',
	'ποῦ',
	'προ',
	'προς',
	'πρός',
	'πρὸ',
	'πρὸς',
	'πως',
	'πως',
	'σε',
	'στη',
	'στην',
	'στο',
	'στον',
	'σός',
	'σύ',
	'σύν',
	'σὸς',
	'σὺ',
	'σὺν',
	'τά',
	'τήν',
	'τί',
	'τίς',
	'τίς',
	'τα',
	'ταῖς',
	'τε',
	'την',
	'της',
	'τι',
	'τινα',
	'τις',
	'τις',
	'το',
	'τοί',
	'τοι',
	'τοιοῦτος',
	'τοιοῦτος',
	'τον',
	'τοτε',
	'του',
	'τούς',
	'τοὺς',
	'τοῖς',
	'τοῦ',
	'των',
	'τό',
	'τόν',
	'τότε',
	'τὰ',
	'τὰς',
	'τὴν',
	'τὸ',
	'τὸν',
	'τῆς',
	'τῆς',
	'τῇ',
	'τῶν',
	'τῷ',
	'ως',
	'"ἀλλ"',
	'ἀλλά',
	'ἀλλὰ',
	'ἀλλ’',
	'ἀπ',
	'ἀπό',
	'ἀπὸ',
	'ἀφ',
	'ἂν',
	'ἃ',
	'ἄλλος',
	'ἄλλος',
	'ἄν',
	'ἄρα',
	'ἅμα',
	'ἐάν',
	'ἐγώ',
	'ἐγὼ',
	'ἐκ',
	'ἐμός',
	'ἐμὸς',
	'ἐν',
	'ἐξ',
	'ἐπί',
	'ἐπεὶ',
	'ἐπὶ',
	'ἐστι',
	'ἐφ',
	'ἐὰν',
	'ἑαυτοῦ',
	'ἔτι',
	'ἡ',
	'ἢ',
	'ἣ',
	'ἤ',
	'ἥ',
	'ἧς',
	'ἵνα',
	'ὁ',
	'ὃ',
	'ὃν',
	'ὃς',
	'ὅ',
	'ὅδε',
	'ὅθεν',
	'ὅπερ',
	'ὅς',
	'ὅς',
	'ὅστις',
	'ὅστις',
	'ὅτε',
	'ὅτι',
	'ὑμός',
	'ὑπ',
	'ὑπέρ',
	'ὑπό',
	'ὑπὲρ',
	'ὑπὸ',
	'ὡς',
	'ὡς',
	'ὥς',
	'ὥστε',
	'ὦ',
	'ᾧ'
];

const stopWordsMap = [
	{
		find: '(?:^|(?<=\\s))(' + stopwords.join('|') + ')(?:(?=\\s)|$)',
		replace: ''
	}
];

module.exports = stopWordsMap;

},{}],8:[function(require,module,exports){
// script.js
window.toggleSelect = toggleSelect;
window.toggleAdd = toggleAdd;
window.updateFood = updateFood;

// Sample data to simulate a database of food items
const foodData = [
    { 'name': 'Ψωμί Λευκό', 'grams': 25, 'carbs': 12.0, 'protein': 2.5, 'fat': 0.8333333333333334, 'calories': 66.66666666666667 },
    { 'name': 'Ψωμί Ολικής', 'grams': 30, 'carbs': 12.0, 'protein': 3.0, 'fat': 1.0, 'calories': 80.0 },
    { 'name': 'Λευκό ρύζι', 'grams': 50, 'carbs': 12.0, 'protein': 1.35, 'fat': 0.15, 'calories': 65.0 },
    { 'name': 'Καστανό ρύζι', 'grams': 100, 'carbs': 17.142857142857142, 'protein': 2.6, 'fat': 0.9, 'calories': 111.0 },
    { 'name': 'Κριθαράκι', 'grams': 60, 'carbs': 12.0, 'protein': 7.199999999999999, 'fat': 0.8999999999999999, 'calories': 212.4 },
    { 'name': 'Κριθαράκι ολικής', 'grams': 70, 'carbs': 12.0, 'protein': 8.399999999999999, 'fat': 1.0499999999999998, 'calories': 247.79999999999998 },
    { 'name': 'Μακαρόνια λευκά', 'grams': 70, 'carbs': 12.0, 'protein': 3.5, 'fat': 0.13999999999999999, 'calories': 98.0 },
    { 'name': 'Μακαρόνια ολικής', 'grams': 80, 'carbs': 12.0, 'protein': 4.0, 'fat': 0.16, 'calories': 112.0 },
    { 'name': 'Πατάτες Φούρνου', 'grams': 80, 'carbs': 12.0, 'protein': 1.536, 'fat': 5.152, 'calories': 97.60000000000001 },
    { 'name': 'Πατάτες τηγανητές', 'grams': 40, 'carbs': 12.0, 'protein': 1.32, 'fat': 6.2, 'calories': 112.0 },
    { 'name': 'Αρακάς γιαχνί', 'grams': 110, 'carbs': 12.0, 'protein': 4.8839999999999995, 'fat': 6.204, 'calories': 127.16 },
    { 'name': 'Φασολάκια γιαχνί', 'grams': 100, 'carbs': 5.0, 'protein': 1.3666666666666665, 'fat': 3.6333333333333333, 'calories': 58.33333333333333 },
    { 'name': 'Φακές', 'grams': 250, 'carbs': 35.0, 'protein': 16.2, 'fat': 6.6, 'calories': 253.0 },
    { 'name': 'Φασολάδα', 'grams': 250, 'carbs': 25.0, 'protein': 11.4, 'fat': 5.8, 'calories': 224.0 },
    { 'name': 'Ρεβίθια', 'grams': 250, 'carbs': 50.0, 'protein': 12.3, 'fat': 9.9, 'calories': 285.0 },
    { 'name': 'Γεμιστά ', 'grams': 100, 'carbs': 12.0, 'protein': 2.3600000000000003, 'fat': 4.88, 'calories': 120.4 },
    { 'name': 'Σπανακόρυζο', 'grams': 100, 'carbs': 12.0, 'protein': 2.68, 'fat': 4.5200000000000005, 'calories': 78.0 },
    { 'name': 'Γιαούρτι', 'grams': 200, 'carbs': 8.0, 'protein': 13.2, 'fat': 20.0, 'calories': 264.0 },
    { 'name': 'Κοτόσουπα ', 'grams': 300, 'carbs': 25.0, 'protein': 22.9, 'fat': 10.8, 'calories': 254.0 },
    { 'name': 'Γιουβαρλάκια', 'grams': 100, 'carbs': 10.0, 'protein': 7.6, 'fat': 3.1999999999999997, 'calories': 94.0 },
    { 'name': 'Μοσχοράκι κοκκινιστό', 'grams': 200, 'carbs': 4.1, 'protein': 27.8, 'fat': 12.0, 'calories': 240.6 },
    { 'name': 'Μπιφτέκι', 'grams': 150, 'carbs': 6.6, 'protein': 22.8, 'fat': 14.8, 'calories': 253.0 },
    { 'name': 'Κοτόπουλο λεμονάτο', 'grams': 150, 'carbs': 0.2, 'protein': 32.4, 'fat': 8.8, 'calories': 217.0 },
    { 'name': 'Κοτόπουλο  κοκκινιστό', 'grams': 200, 'carbs': 3.1, 'protein': 32.4, 'fat': 8.8, 'calories': 227.0 },
    { 'name': 'Μπανάνα με φλούδα', 'grams': 90, 'carbs': 12.0, 'protein': 0.9, 'fat': 0.27, 'calories': 55.800000000000004 },
    { 'name': 'Μήλο', 'grams': 100, 'carbs': 12.0, 'protein': 0.3, 'fat': 0.17, 'calories': 52.0 },
    { 'name': 'Μανταρίνια', 'grams': 120, 'carbs': 12.0, 'protein': 0.6, 'fat': 0.2, 'calories': 40.0 },
    { 'name': 'Πορτοκάλι ', 'grams': 150, 'carbs': 12.0, 'protein': 0.5, 'fat': 0.2, 'calories': 70.0 },
    { 'name': 'Καρύδια', 'grams': 100, 'carbs': 12.0, 'protein': 15.0, 'fat': 65.0, 'calories': 654.0 },
    { 'name': 'Αμύγδαλα', 'grams': 100, 'carbs': 9.6, 'protein': 21.0, 'fat': 49.0, 'calories': 575.0 },
    { 'name': 'Αυγό', 'grams': 100, 'carbs': 1.1, 'protein': 13.0, 'fat': 11.0, 'calories': 165.0 },
    { 'name': 'Σαλάτα μαρούλι', 'grams': 250, 'carbs': 13.2, 'protein': 4.1, 'fat': 9.7, 'calories': 140.0 },
    { 'name': 'Γαρίδες ψητές', 'grams': 150, 'carbs': 0.0, 'protein': 31.4, 'fat': 1.6, 'calories': 149.0 },
    { 'name': 'Γλώσσες ψητές', 'grams': 150, 'carbs': 0.0, 'protein': 36.2, 'fat': 2.3, 'calories': 176.0 },
    { 'name': 'Λαβράκι ψητό', 'grams': 150, 'carbs': 0.0, 'protein': 35.5, 'fat': 3.8, 'calories': 186.0 },
    { 'name': 'Σολομός ψητός', 'grams': 150, 'carbs': 0.0, 'protein': 41.0, 'fat': 11.3, 'calories': 276.0 },
    { 'name': 'Nut BAR Chocolate', 'grams': 35, 'carbs': 10.0, 'protein': 5.2, 'fat': 13.0, 'calories': 186.0 },
    { 'name': 'Corny Big Chocolate ', 'grams': 50, 'carbs': 66.1, 'protein': 6.2, 'fat': 16.3, 'calories': 443.0 },
    { 'name': 'Παυλίδου 70% κακάο', 'grams': 22, 'carbs': 7.1, 'protein': 1.9, 'fat': 8.3, 'calories': 118.0 },
    { 'name': 'High Protein ακτινίδιο,μήλο,σπόροι,δημητριακά', 'grams': 170, 'carbs': 19.0, 'protein': 15.0, 'fat': 0.0, 'calories': 136.0 },
    { 'name': 'High Protein μύρτιλο,βατόμουρο,φραγκοστάφυλο,cranberry', 'grams': 170, 'carbs': 19.0, 'protein': 15.0, 'fat': 0.0, 'calories': 136.0 },
    { 'name': 'High Protein μπανάνα,μάνγκο,λιναρόσπορος,δημητριακά', 'grams': 170, 'carbs': 17.0, 'protein': 15.0, 'fat': 0.0, 'calories': 129.0 },
    { 'name': 'Life καρότο', 'grams': 400, 'carbs': 44.8, 'protein': 2.8, 'fat': 0.0, 'calories': 192.0 },
    { 'name': 'παξιμάδια "Μάνα"', 'grams': 100, 'carbs': 62.8, 'protein': 10.1, 'fat': 19.5, 'calories': 475.0 },
    { 'name': 'Σαλάτα λευκό λάχανο καρότο', 'grams': 200, 'carbs': 14.8, 'protein': 2.4, 'fat': 10.0, 'calories': 149.0 },
    { 'name': 'Φράουλα', 'grams': 220, 'carbs': 12.0, 'protein': 0.9, 'fat': 0.3, 'calories': 50.0 },
    { 'name': 'Βlueberry αποξηραμένα', 'grams': 160, 'carbs': 128.0, 'protein': 4.0, 'fat': 4.0, 'calories': 507.0 },
    { 'name': 'Cranberries αποξηραμένα', 'grams': 100, 'carbs': 82.36, 'protein': 0.17, 'fat': 1.09, 'calories': 308.0 },
    { 'name': 'Τσουρέκι ', 'grams': 100, 'carbs': 63.2, 'protein': 7.4, 'fat': 12.4, 'calories': 386.0 },
    { 'name': 'Αχλάδι', 'grams': 120, 'carbs': 12.0, 'protein': 0.456, 'fat': 0.192, 'calories': 70.0 },
    { 'name': 'Γάλα αμύγδαλο Delta ', 'grams': 250, 'carbs': 11.0, 'protein': 1.8, 'fat': 4.3, 'calories': 386.0 },
    { 'name': 'Ανανάς ', 'grams': 90, 'carbs': 12.0, 'protein': 0.414, 'fat': 0.189, 'calories': 54.0 },
    { 'name': 'Βατόμουρο', 'grams': 200, 'carbs': 12.0, 'protein': 2.78, 'fat': 0.98, 'calories': 86.0 },
    { 'name': 'Βερίκοκο', 'grams': 120, 'carbs': 12.0, 'protein': 0.168, 'fat': 0.468, 'calories': 57.6 },
    { 'name': 'Δαμάσκηνο', 'grams': 110, 'carbs': 12.0, 'protein': 0.7058333333333333, 'fat': 0.3, 'calories': 50.0 },
    { 'name': 'Καρπούζι ', 'grams': 150, 'carbs': 12.0, 'protein': 0.915, 'fat': 0.225, 'calories': 45.0 },
    { 'name': 'Κεράσια', 'grams': 100, 'carbs': 12.0, 'protein': 1.06, 'fat': 0.2, 'calories': 63.0 },
    { 'name': 'Μάνγκο', 'grams': 90, 'carbs': 12.0, 'protein': 0.738, 'fat': 0.342, 'calories': 54.0 },
    { 'name': 'Νεκταρίνια', 'grams': 120, 'carbs': 12.0, 'protein': 1.272, 'fat': 0.384, 'calories': 52.8 },
    { 'name': 'Πεπόνι', 'grams': 100, 'carbs': 12.0, 'protein': 0.84, 'fat': 0.19, 'calories': 34.0 },
    { 'name': 'Ροδάκινο', 'grams': 130, 'carbs': 12.0, 'protein': 1.183, 'fat': 0.325, 'calories': 44.2 },
    { 'name': 'Καλαμπόκι', 'grams': 200, 'carbs': 40.0, 'protein': 6.0, 'fat': 2.0, 'calories': 83.0 },
    { 'name': 'Γιαούρτι Νουνού 5% στραγγιστό', 'grams': 200, 'carbs': 8.2, 'protein': 18.8, 'fat': 10.0, 'calories': 198.0 },
    { 'name': 'Αυγά  6XL πολύ μεγάλα', 'grams': 73, 'carbs': 0.7, 'protein': 9.1, 'fat': 6.9, 'calories': 101.0 },
    { 'name': 'Παστίτσιο', 'grams': 250, 'carbs': 36.8, 'protein': 21.2, 'fat': 20.8, 'calories': 423.0 },
    { 'name': 'Σταφύλια', 'grams': 100, 'carbs': 14.4, 'protein': 0.7, 'fat': 0.0, 'calories': 476.0 },
    { 'name': 'Ογκρατέν', 'grams': 100, 'carbs': 18.6, 'protein': 14.4, 'fat': 15.4, 'calories': 266.0 },
    { 'name': 'Λωτός', 'grams': 90, 'carbs': 12.0, 'protein': 1.0, 'fat': 0.05, 'calories': 250.0 }
    // Add more food items here as needed
];

document.addEventListener('DOMContentLoaded', function () {
    renderFoodList();
    loadData();
});

// State to keep track of selected foods
let selectedFoods = {};
let carbsCounter = 0;
let greekUtils = require("greek-utils");

// Function to render the list of food items based on the search input
function renderFoodList() {
    const searchInput = document.getElementById('search-input').value;
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';

    // Always load the saved state from localStorage
    const savedFoods = JSON.parse(localStorage.getItem('selectedFoods')) || {};


    foodData.forEach(food => {
        let foodNameL = food.name.toLowerCase();
        let searchInputL = searchInput.toLowerCase();
        var foodNamesanitized = greekUtils.sanitizeDiacritics(foodNameL);
        var searchInputsanitized = greekUtils.sanitizeDiacritics(searchInputL);
        var foodNametogreek = greekUtils.toGreek(foodNamesanitized);
        var searchInputtogreek = greekUtils.toGreek(searchInputsanitized);

        if (
            searchInput === '' ||
            foodNameL.includes(searchInputL) ||
            foodNamesanitized.includes(searchInputsanitized) ||
            foodNametogreek.includes(searchInputtogreek)
        ) {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';

            const baseIdName = food.name.replace(/\s+/g, '-').toLowerCase();
            const gramsId = `grams-${baseIdName}`;
            const selectCheckboxId = `select-${baseIdName}`;
            const addCheckboxId = `add-${baseIdName}`;

            // Use saved values if available
            const savedFood = savedFoods[food.name] || {};
            const gramsValue = savedFood.grams || food.grams;
            const isSelected = savedFood.isSelected || false;
            const isAdded = savedFood.isAdded || false;

            const foodDetails = `
            <div>
                <strong>${food.name}</strong><br>
                Υδατάνθρακες: <span class="carbs-value">${(savedFood.carbs || food.carbs).toFixed(0)}</span>g, 
                Πρωτείνη: <span class="protein-value">${(savedFood.protein || food.protein).toFixed(0)}</span>g, 
                Λίπος: <span class="fat-value">${(savedFood.fat || food.fat).toFixed(0)}</span>g, 
                Θερμίδες: <span class="calories-value">${(savedFood.calories || food.calories).toFixed(0)}</span>
            </div>
            <div>
                Γραμμάρια: <input type="number" value="${gramsValue}" 
                              class="grams-input" 
                              data-name="${food.name}" 
                              id="${gramsId}" 
                              name="${gramsId}" 
                              min="1" 
                              onchange="updateFood('${food.name}')">
                <br>
                <label>
                    Επιλογή: <input type="checkbox" 
                                   class="select-checkbox" 
                                   data-name="${food.name}" 
                                   id="${selectCheckboxId}" 
                                   name="${selectCheckboxId}" 
                                   onchange="toggleSelect('${food.name}')" 
                                   ${isSelected ? 'checked' : ''}>
                </label>
                <br>
                <label>
                    Πρόσθεσε στους υδατάνθρακες: <input type="checkbox" 
                                         class="add-checkbox" 
                                         data-name="${food.name}" 
                                         id="${addCheckboxId}" 
                                         name="${addCheckboxId}" 
                                         onchange="toggleAdd('${food.name}')" 
                                         ${isAdded ? 'checked' : ''}>
                </label>
            </div>
        `;

            foodItem.innerHTML = foodDetails;
            foodList.appendChild(foodItem);
        }
    });

    // Load the entire food data from localStorage each time the list is rendered
    loadData();  // This ensures saved states are loaded every time
}

// Event listener for the search bar
document.getElementById('search-input').addEventListener('input', renderFoodList);


// Function to update the food nutritional values based on the grams input
function updateFood(foodName) {
    // const gramsInput = document.querySelector(`input[data-name="${foodName}"].grams-input`).value;
    const gramsInput = parseFloat(document.querySelector(`input[data-name="${foodName}"].grams-input`).value);

    const food = foodData.find(f => f.name === foodName);

    const updatedCarbs = (food.carbs / food.grams) * gramsInput;
    const updatedProtein = (food.protein / food.grams) * gramsInput;
    const updatedFat = (food.fat / food.grams) * gramsInput;
    const updatedCalories = (food.calories / food.grams) * gramsInput;

    selectedFoods[foodName] = {
        ...food,
        grams: gramsInput,
        carbs: updatedCarbs,
        protein: updatedProtein,
        fat: updatedFat,
        calories: updatedCalories
    };

    const foodItem = document.querySelector(`input[data-name="${foodName}"].grams-input`).closest('.food-item');
    foodItem.querySelector('.carbs-value').textContent = updatedCarbs.toFixed(0);
    foodItem.querySelector('.protein-value').textContent = updatedProtein.toFixed(0);
    foodItem.querySelector('.fat-value').textContent = updatedFat.toFixed(0);
    foodItem.querySelector('.calories-value').textContent = updatedCalories.toFixed(0);

    if (document.querySelector(`input[data-name="${foodName}"].select-checkbox`).checked) {
        updateNutritionTarget();
    }

    if (document.querySelector(`input[data-name="${foodName}"].add-checkbox`).checked) {
        updateCarbsCounter();
    }
    saveFoodData(foodName);
}

// Function to update the nutrition target based on selected foods
function updateNutritionTarget() {
    let totalCarbs = 0, totalProtein = 0, totalFat = 0, totalCalories = 0;

    for (let food in selectedFoods) {
        totalCarbs += selectedFoods[food].carbs;
        totalProtein += selectedFoods[food].protein;
        totalFat += selectedFoods[food].fat;
        totalCalories += selectedFoods[food].calories;
    }

    const remainingCarbs = document.getElementById('remaining-carbs');
    const remainingProtein = document.getElementById('remaining-protein');
    const remainingFat = document.getElementById('remaining-fat');
    const remainingCalories = document.getElementById('remaining-calories');

    const targetCarbs = parseFloat(document.getElementById('target-carbs').textContent);
    const targetProtein = parseFloat(document.getElementById('target-protein').textContent);
    const targetFat = parseFloat(document.getElementById('target-fat').textContent);
    const targetCalories = parseFloat(document.getElementById('target-calories').textContent);

    remainingCarbs.textContent = (targetCarbs - totalCarbs).toFixed(0);
    remainingProtein.textContent = (targetProtein - totalProtein).toFixed(0);
    remainingFat.textContent = (targetFat - totalFat).toFixed(0);
    remainingCalories.textContent = (targetCalories - totalCalories).toFixed(0);

    // saveData();  // Save data after updating nutrition target
}

// Function to update the carbs counter based on selected foods
function updateCarbsCounter() {
    let totalCarbs = 0;

    for (let food in selectedFoods) {
        // Find the checkbox element for the food item
        const checkbox = document.querySelector(`input[data-name="${food}"].add-checkbox`);

        // Only add carbs if the checkbox exists and is checked
        if (checkbox && checkbox.checked) {
            totalCarbs += selectedFoods[food].carbs;
        }
    }

    document.getElementById('carbs-counter').textContent = totalCarbs;
}

// Function to toggle food selection in the nutrition target
function toggleSelect(foodName) {
    const isChecked = document.querySelector(`input[data-name="${foodName}"].select-checkbox`).checked;

    if (isChecked) {
        updateFood(foodName);  // Ensure the food data is up-to-date
        updateNutritionTarget();
    } else {
        // Uncheck the "Add to Carbs" checkbox if the item is deselected
        const addCheckbox = document.querySelector(`input[data-name="${foodName}"].add-checkbox`);
        addCheckbox.checked = false; // Uncheck the "Add to Carbs" checkbox
        delete selectedFoods[foodName];
        updateCarbsCounter();
        updateNutritionTarget();
    }
    saveFoodData(foodName);
}

// Function to toggle the addition of carbs to the carbs counter
function toggleAdd(foodName) {
    const selectCheckbox = document.querySelector(`input[data-name="${foodName}"].select-checkbox`);

    // If the "Select" checkbox is not checked, check it
    if (!selectCheckbox.checked) {
        selectCheckbox.checked = true;
        updateFood(foodName);  // Ensure the food data is up-to-date
        updateNutritionTarget();  // Update the nutrition target
    }
    updateCarbsCounter();
    saveFoodData(foodName);  // Save data for this specific food item
}


function saveFoodData(foodName) {
    const gramsInput = document.querySelector(`input[data-name="${foodName}"].grams-input`);
    const selectCheckbox = document.querySelector(`input[data-name="${foodName}"].select-checkbox`);
    const addCheckbox = document.querySelector(`input[data-name="${foodName}"].add-checkbox`);
    // If the food is not selected, remove it from localStorage
    if (!selectCheckbox.checked) {
        localStorage.removeItem(`food-${foodName}`);
        return;
    }

    const foodDataToSave = {
        ...selectedFoods[foodName],
        isSelected: selectCheckbox.checked,
        isAdded: addCheckbox.checked
    };

    localStorage.setItem(`food-${foodName}`, JSON.stringify(foodDataToSave));
}

function loadData() {
    foodData.forEach(food => {
        const savedFoodData = JSON.parse(localStorage.getItem(`food-${food.name}`));
        if (savedFoodData) {
            selectedFoods[food.name] = savedFoodData;

            const gramsInput = document.querySelector(`input[data-name="${food.name}"].grams-input`);
            const selectCheckbox = document.querySelector(`input[data-name="${food.name}"].select-checkbox`);
            const addCheckbox = document.querySelector(`input[data-name="${food.name}"].add-checkbox`);

            if (gramsInput && selectCheckbox && addCheckbox) {
                gramsInput.value = savedFoodData.grams;

                const foodItem = gramsInput.closest('.food-item');
                foodItem.querySelector('.carbs-value').textContent = savedFoodData.carbs.toFixed(0);
                foodItem.querySelector('.protein-value').textContent = savedFoodData.protein.toFixed(0);
                foodItem.querySelector('.fat-value').textContent = savedFoodData.fat.toFixed(0);
                foodItem.querySelector('.calories-value').textContent = savedFoodData.calories.toFixed(0);

                selectCheckbox.checked = savedFoodData.isSelected;
                addCheckbox.checked = savedFoodData.isAdded;

                if (savedFoodData.isSelected) {
                    updateNutritionTarget();
                }

                if (savedFoodData.isAdded) {
                    updateCarbsCounter();
                }
            }
        }
    });
}

},{"greek-utils":1}]},{},[8]);
