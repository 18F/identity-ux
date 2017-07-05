(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.LoginGov = window.LoginGov || {};

window.LoginGov.I18n = {
  strings: {},
  t: function t(key) {
    return this.strings[key];
  },
  key: function key(_key) {
    return _key.replace(/[ -]/g, '_').replace(/\W/g, '').toLowerCase();
  }
};

window.LoginGov.I18n.strings['errors.messages.format_mismatch'] = 'Please match the requested format.';
window.LoginGov.I18n.strings['errors.messages.missing_field'] = 'Please fill in this field.';
window.LoginGov.I18n.strings['forms.passwords.show'] = 'Show password';
window.LoginGov.I18n.strings['idv.errors.pattern_mismatch.dob'] = 'Your date of birth must be entered in as mm/dd/yyyy';
window.LoginGov.I18n.strings['idv.errors.pattern_mismatch.personal_key'] = 'Please enter your personal key for this account. Example: ABC1-DEF2-G3HI-J456\n';
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
window.LoginGov.I18n.strings['zxcvbn.feedback.a_word_by_itself_is_easy_to_guess'] = 'A word by itself is easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.add_another_word_or_two_uncommon_words_are_better'] = 'Add another word or two. Uncommon words are better';
window.LoginGov.I18n.strings['zxcvbn.feedback.all_uppercase_is_almost_as_easy_to_guess_as_all_lowercase'] = 'All-uppercase is almost as easy to guess as all-lowercase';
window.LoginGov.I18n.strings['zxcvbn.feedback.avoid_dates_and_years_that_are_associated_with_you'] = 'Avoid dates and years that are associated with you';
window.LoginGov.I18n.strings['zxcvbn.feedback.avoid_recent_years'] = 'Avoid recent years';
window.LoginGov.I18n.strings['zxcvbn.feedback.avoid_repeated_words_and_characters'] = 'Avoid repeated words and characters';
window.LoginGov.I18n.strings['zxcvbn.feedback.avoid_sequences'] = 'Avoid sequences';
window.LoginGov.I18n.strings['zxcvbn.feedback.avoid_years_that_are_associated_with_you'] = 'Avoid years that are associated with you';
window.LoginGov.I18n.strings['zxcvbn.feedback.capitalization_doesnt_help_very_much'] = 'Capitalization doesn’t help very much';
window.LoginGov.I18n.strings['zxcvbn.feedback.common_names_and_surnames_are_easy_to_guess'] = 'Common names and surnames are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.dates_are_often_easy_to_guess'] = 'Dates are often easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.names_and_surnames_by_themselves_are_easy_to_guess'] = 'Names and surnames by themselves are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.there_is_no_need_for_symbols_digits_or_uppercase_letters'] = 'There is no need for symbols, digits, or uppercase letters';
window.LoginGov.I18n.strings['zxcvbn.feedback.predictable_substitutions_like__instead_of_a_dont_help_very_much'] = 'Predictable substitutions like \'@\' instead of \'a\' don’t help very much';
window.LoginGov.I18n.strings['zxcvbn.feedback.recent_years_are_easy_to_guess'] = 'Recent years are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.repeats_like_aaa_are_easy_to_guess'] = 'Repeats like \"aaa\" are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.repeats_like_abcabcabc_are_only_slightly_harder_to_guess_than_abc'] = 'Repeats like \"abcabcabc\" are only slightly harder to guess than \"abc\"';
window.LoginGov.I18n.strings['zxcvbn.feedback.reversed_words_arent_much_harder_to_guess'] = 'Reversed words aren’t much harder to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.sequences_like_abc_or_6543_are_easy_to_guess'] = 'Sequences like abc or 6543 are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.short_keyboard_patterns_are_easy_to_guess'] = 'Short keyboard patterns are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.straight_rows_of_keys_are_easy_to_guess'] = 'Straight rows of keys are easy to guess';
window.LoginGov.I18n.strings['zxcvbn.feedback.this_is_a_top_10_common_password'] = 'This is a top-10 common password';
window.LoginGov.I18n.strings['zxcvbn.feedback.this_is_a_top_100_common_password'] = 'This is a top-100 common password';
window.LoginGov.I18n.strings['zxcvbn.feedback.this_is_a_very_common_password'] = 'This is a very common password';
window.LoginGov.I18n.strings['zxcvbn.feedback.this_is_similar_to_a_commonly_used_password'] = 'This is similar to a commonly used password';
window.LoginGov.I18n.strings['zxcvbn.feedback.for_a_stronger_password_use_a_few_words_separated_by_spaces_but_avoid_common_phrases'] = 'For a stronger password, use a few words separated by spaces, but avoid common phrases';
window.LoginGov.I18n.strings['zxcvbn.feedback.use_a_longer_keyboard_pattern_with_more_turns'] = 'Use a longer keyboard pattern with more turns';

},{}]},{},[1]);
