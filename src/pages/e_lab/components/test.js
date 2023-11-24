
//need a form to get the data of the login page with functional components

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/index';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


