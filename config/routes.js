/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'AuthController.login',

  //auth routes

  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register/:code': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action/:code?': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',
  'get /auth/:provider/:action': 'AuthController.callback',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'get /api/skillsets/:setId/skills/:skillId/ranks/:rankId' : "SkillsetsController.setrank",


  // users

  'get /user' : 'UserController.all',
  'get /user/:id' : 'UserController.profile',
  'get /user/:id/edit' : 'UserController.edit',
  'get /user/:id/bio' : 'UserController.editbio',
  'post /user/:id' : 'UserController.update',

  // skills

  'get /skills' : 'SkillsController.all',
  'get /skills/new' : 'SkillsController.make',
  // 'get /skills/:id?/edit' : 'SkillsController.edit',
  'get /skills/:id' : 'SkillsController.one',

  // skillsets

  'get /skillsets' : 'SkillsetsController.all',
  'get /skillsets/:id' : 'SkillsetsController.one',

  // invites

  'get /invites' : "InvitesController.all",
  'get /invites/request' : "InvitesController.request",
  'post /invites/request' : "InvitesController.registerRequest",
  'get /invites/:id' : "InvitesController.one",
  'get /invites/:id/send' : "InvitesController.send",
  'get /invites/:id/cancel' : "InvitesController.cancel",

  // '/api/*' : {policy: 'isAdmin' }

};
