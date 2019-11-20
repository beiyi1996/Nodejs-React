/*jshint esversion: 6 */

import { body } from "../node_modules/express-validator";
import Member from "../models/member";

const memberValidator = (method) => {
    switch (method){
      case 'createAccount': {
        return [
          body('email', 'Invalid email').isEmail().custom(value => {
            return Member.findOne({email: value}).then(member => {
              if(member) {
                return Promise.reject('E-mail already in use');
              }
            });
          }).withMessage('This email is already in use'),
          body('password', 'Invalid password').isLength({min: 8}),
          body('gender').optional({ checkFalsy: true }),
          body('phone').isLength({min: 10}),
          body('name').isLength({min: 1})
        ];
      }
      case 'login': {
        return [
          body('email', 'Invalid email').isEmail().custom(value => {
            return Member.findOne({email: value}).then(member => {
              if(!member) {
                return Promise.reject('Invalid email');
              }
            });
          })
        ];
      }
      case 'forgotPassword': {
        return [
          body('email', 'Invalid email').isEmail().custom(value => {
            return Member.findOne({email: value}).then(member => {
              if(!member) {
                return Promise.reject('Invalid email');
              }
            });
          })
        ];
      }
    }
  };

module.exports = { memberValidator };