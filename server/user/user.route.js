const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
 /**
 * @api {get} /api/v1/users Retrieve all users
 * @apiName GetAll
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiParam {Number} id Users unique ID.
 * @apiPermission authenticated user
 *
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} firstName  FirstName of the User.
 * @apiSuccess {String} lastName  Lastname of the User.
 * @apiSuccess {String} enrolmentNumber  EnrolmentNumber of the User.
 *
 * @apiExample {js} Example usage:
 * $http.defaults.headers.common["authorization"] = token;
 * $http.get(url)
 *    .sucess((res,status) => handlerSuccess())
 *    .error((res,status) => handlerErrro());
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTPS 200 OK
 *     [{
 *       "_id": "57e8e94ea06a0c473bac50cc"
 *       "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 *      },
 *      {
 *       "_id": "57e8e94ea06a0c47123asda"
 *       "email": "frededison@dot.com",
 *       "firstName": "Dr Fred",
 *       "lastName": "Edison",
 *       "enrolmentNumber": "69727979"
 *      }]
 *
 */
  .get(expressJwt({ secret: config.jwtSecret }), userCtrl.list)

 /**
 * @api {post} /api/v1/users Create a user
 * @apiVersion 0.1.0
 * @apiName Create
 * @apiGroup User
 * @apiPermission authenticated user
 *
 * @apiParam (Request body) {String} name The user email
 *
 * @apiExample {js} Example usage:
 * const data = {
 *        "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {String} message User saved successfully!
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "message": "User saved successfully!",
 *      "id": "57e903941ca43a5f0805ba5a"
 *    }
 *
 */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
 /**
 * @api {get} /api/users/:id Retrieve one user
 * @apiName Get
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiParam {Number} id Users unique ID.
 * @apiPermission authenticated user
 *
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} firstName  FirstName of the User.
 * @apiSuccess {String} lastName  Lastname of the User.
 * @apiSuccess {String} enrolmentNumber EnrolmentNumber of the User.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTPS 200 OK
 *     {
 *       "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 *
 *     }
 *
 */
  .get(userCtrl.get)

 /**
 * @api {put} /api/v1/users/:id Update a user
 * @apiName Put
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiPermission authenticated user
 *
 * @apiParam {String} id User unique ID.
 * @apiParam (Request Body) {String} email The user email
 * @apiParam (Request Body) {String} firstName The user firstName
 * @apiParam (Request Body) {String} lastName The user lastName
 * @apiParam (Request Body) {String} enrolmentNumber The user enrolmentNumber
 *
 * @apiExample {js} Example usage:
 * const data = {
 *       "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 * }
 *
 *
 * $http.default.headers.common["Authorization"] = token;
 * $http.put(url,data)
 *    .success((res,status)) => handleSuccess())
 *    .error((err,status)) => handleError());
 *
 * @apiSuccess (Success 201) {String} message User saved successfully!
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "User update successfully!"
 *     }
 */
  .put(validate(paramValidation.updateUser), userCtrl.update)

 /**
 * @api {delete} /api/v1/users/:id Delete a user
 * @apiName Delete
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiPermission authenticated user
 *
 * @apiParam {String} id User unique ID.
 *
 * @apiExample {js} Example usage:
 * $http.default.headers.common["Authorization"] = token;
 * $http.delete(url)
 *    .success((res,status)) => handleSuccess())
 *    .error((err,status)) => handleError());
 *
 * @apiSucess {String} message User deleted successfully!
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "User deleted successfully!"
 *     }
 */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
