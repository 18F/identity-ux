(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.LoginGov = window.LoginGov || {};

window.LoginGov.I18n = {
  strings: {},
  t: function t(key) {
    return this.strings[key];
  }
};

window.LoginGov.I18n.strings['errors.messages.format_mismatch'] = 'Please match the requested format.';
window.LoginGov.I18n.strings['errors.messages.missing_field'] = 'Please fill in this field.';
window.LoginGov.I18n.strings['forms.passwords.show'] = 'Show password';
window.LoginGov.I18n.strings['idv.errors.pattern_mismatch.dob'] = 'Your date of birth must be entered in as mm/dd/yyyy';
window.LoginGov.I18n.strings['idv.errors.pattern_mismatch.personal-key'] = 'Please enter your personal key for this account. Example: ABC1-DEF2-G3HI-J456\n';
window.LoginGov.I18n.strings['idv.errors.pattern_mismatch.ssn'] = 'Your Social Security Number must be entered in as ###-##-####';
window.LoginGov.I18n.strings['idv.errors.pattern_mismatch.zipcode'] = 'Your zipcode must be entered in as #####-####';
window.LoginGov.I18n.strings['idv.modal.button.warning'] = 'Try again';
window.LoginGov.I18n.strings['instructions.password.strength.i'] = 'Very weak';
window.LoginGov.I18n.strings['instructions.password.strength.ii'] = 'Weak';
window.LoginGov.I18n.strings['instructions.password.strength.iii'] = 'So-so';
window.LoginGov.I18n.strings['instructions.password.strength.iv'] = 'Good';
window.LoginGov.I18n.strings['instructions.password.strength.v'] = 'Great!';
window.LoginGov.I18n.strings['links.remove'] = 'Remove';
window.LoginGov.I18n.strings['valid_email.validations.email.invalid'] = 'Invalid email address format or domain entered. Correct the address and re-enter it.';
window.LoginGov.I18n.strings['zxcvbn.feedback.Use a few words, avoid common phrases'] = 'For a stronger password, use a few words separated by spaces, but avoid common phrases';
window.LoginGov.I18n.strings['zxcvbn.feedback.No need for symbols, digits, or uppercase letters'] = 'There is no need for symbols, digits, or uppercase letters';
window.LoginGov.I18n.strings['zxcvbn.feedback.Add another word or two_ Uncommon words are better_'] = 'Add another word or two. Uncommon words are better';
window.LoginGov.I18n.strings['zxcvbn.feedback.Straight rows of keys are easy to guess'] = 'Straight rows of keys are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Short keyboard patterns are easy to guess'] = 'Short keyboard patterns are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Use a longer keyboard pattern with more turns'] = 'Use a longer keyboard pattern with more turns';
window.LoginGov.I18n.strings['zxcvbn.feedback.Repeats like \"aaa\" are easy to guess'] = 'Repeats like \"aaa\" are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"'] = 'Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"';
window.LoginGov.I18n.strings['zxcvbn.feedback.Avoid repeated words and characters'] = 'Avoid repeated words and characters';
window.LoginGov.I18n.strings['zxcvbn.feedback.Sequences like abc or 6543 are easy to guess'] = 'Sequences like abc or 6543 are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Avoid sequences'] = 'Avoid sequences';
window.LoginGov.I18n.strings['zxcvbn.feedback.Recent years are easy to guess'] = 'Recent years are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Avoid recent years'] = 'Avoid recent years';
window.LoginGov.I18n.strings['zxcvbn.feedback.Avoid years that are associated with you'] = 'Avoid years that are associated with you';
window.LoginGov.I18n.strings['zxcvbn.feedback.Dates are often easy to guess'] = 'Dates are often easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Avoid dates and years that are associated with you'] = 'Avoid dates and years that are associated with you';
window.LoginGov.I18n.strings['zxcvbn.feedback.This is a top-10 common password'] = 'This is a top-10 common password';
window.LoginGov.I18n.strings['zxcvbn.feedback.This is a top-100 common password'] = 'This is a top-100 common password';
window.LoginGov.I18n.strings['zxcvbn.feedback.This is a very common password'] = 'This is a very common password';
window.LoginGov.I18n.strings['zxcvbn.feedback.This is similar to a commonly used password'] = 'This is similar to a commonly used password';
window.LoginGov.I18n.strings['zxcvbn.feedback.A word by itself is easy to guess'] = 'A word by itself is easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Names and surnames by themselves are easy to guess'] = 'Names and surnames by themselves are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Common names and surnames are easy to guess'] = 'Common names and surnames are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Capitalization doesn\'t help very much'] = 'Capitalization doesn’t help very much';
window.LoginGov.I18n.strings['zxcvbn.feedback.All-uppercase is almost as easy to guess as all-lowercase'] = 'All-uppercase is almost as easy to guess as all-lowercase';
window.LoginGov.I18n.strings['zxcvbn.feedback.Reversed words aren\'t much harder to guess'] = 'Reversed words aren’t much harder to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.Predictable substitutions like \'@\' instead of \'a\' don\'t help very much'] = 'Predictable substitutions like \'@\' instead of \'a\' don’t help very much';

},{}]},{},[1]);
