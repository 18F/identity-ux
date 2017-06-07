(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var modalSelector = '#personal-key-confirm';
var modal = new window.LoginGov.Modal({ el: modalSelector });

var personalKeyContainer = document.getElementById('personal-key');
var personalKeyWords = [].slice.call(document.querySelectorAll('[data-personal-key]'));
var formEl = document.getElementById('confirm-key');
var input = formEl.querySelector('input[type="text"]');
var modalTrigger = document.querySelector('[data-toggle="modal"]');
var modalDismiss = document.querySelector('[data-dismiss="personal-key-confirm"]');

var isInvalidForm = false;

function scrapePersonalKey() {
  var keywords = [];

  personalKeyWords.forEach(function (keyword) {
    keywords.push(keyword.innerHTML);
  });

  return keywords.join('-').toUpperCase();
}

var personalKey = scrapePersonalKey();

// The following methods are strictly fallbacks for IE < 11. There is limited
// support for HTML5 validation attributes in those browsers
// TODO: Potentially investigate readding client-side JS errors in a robust way
function setInvalidHTML() {
  if (isInvalidForm) return;

  document.getElementById('personal-key-alert').classList.remove('display-none');

  isInvalidForm = true;
}

function unsetInvalidHTML() {
  document.getElementById('personal-key-alert').classList.add('display-none');

  isInvalidForm = false;
}

function resetForm() {
  formEl.reset();
  unsetInvalidHTML();
}

function handleSubmit(event) {
  event.preventDefault();

  var value = input.value;

  if (value.toUpperCase() === personalKey) {
    unsetInvalidHTML();
    // Recovery code page, without js enabled, has a form submission that posts
    // to the server with no body.
    // Mimic that here.
    formEl.removeEventListener('submit', handleSubmit);
    formEl.submit();
  } else {
    setInvalidHTML();
  }
}

function show(event) {
  event.preventDefault();

  modal.on('show', function () {
    input.focus();
    personalKeyContainer.classList.add('invisible');
  });

  modal.show();
}

function hide() {
  modal.on('hide', function () {
    resetForm();
    personalKeyContainer.classList.remove('invisible');
  });

  modal.hide();
}

modalTrigger.addEventListener('click', show);
modalDismiss.addEventListener('click', hide);
formEl.addEventListener('submit', handleSubmit);

},{}]},{},[1]);
